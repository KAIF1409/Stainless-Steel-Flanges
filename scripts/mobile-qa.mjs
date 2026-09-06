/*
 * Mobile QA harness — drives the built site in a real browser (Edge/Chromium)
 * at each breakpoint and verifies:
 *   1. no horizontal scroll (and names offenders if any)
 *   2. sticky header contact row: single row, buttons >= 44px, no truncation
 *   3. tap targets >= 44px
 *   4. no overlapping text (pairwise text-leaf intersection heuristic)
 *   5. no truncated labels
 *   6. spec table: scrollable w/ visible affordance + sticky first column
 *   7. keyboard-open emulation: fields reachable/visible in a shrunken viewport
 * Results: qa/mobile-qa-results.json + screenshots qa/screens/<w>.png
 *
 * Usage: node scripts/mobile-qa.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3100";
const VIEWPORTS = [360, 390, 768, 1024, 1440];
const results = [];

const browser = await chromium.launch({ channel: "msedge" });
fs.mkdirSync("qa/screens", { recursive: true });

for (const width of VIEWPORTS) {
  const height = width < 768 ? 740 : width < 1024 ? 1024 : 800;
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: width < 768 ? 2 : 1,
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2300); // let the one-shot hero draw-in finish

  const r = { width };

  // 1 ─ horizontal scroll
  r.horizontalScroll = await page.evaluate(() => {
    const overflowX = document.documentElement.scrollWidth - window.innerWidth;
    const offenders = [];
    if (overflowX > 1) {
      for (const el of document.querySelectorAll("body *")) {
        const b = el.getBoundingClientRect();
        if ((b.right > window.innerWidth + 1 || b.left < -1) && b.width > 0 && b.height > 0) {
          offenders.push(
            `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)} right=${Math.round(b.right)}`
          );
          if (offenders.length >= 6) break;
        }
      }
    }
    return { overflowX, offenders };
  });

  // 2 ─ header contact row
  r.header = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="Direct contact"]');
    const header = document.querySelector("header");
    if (!nav || !header) return null;
    const buttons = [...nav.querySelectorAll("a")].map((a) => {
      const b = a.getBoundingClientRect();
      const label = a.querySelector("span");
      return {
        h: Math.round(b.height),
        w: Math.round(b.width),
        textShown: !label || getComputedStyle(label).display !== "none",
        truncated: label
          ? getComputedStyle(label).display !== "none" &&
            label.scrollWidth > label.clientWidth + 1
          : false,
      };
    });
    const navRect = nav.getBoundingClientRect();
    return {
      headerH: Math.round(header.getBoundingClientRect().height),
      navH: Math.round(navRect.height),
      navWraps: navRect.height > 56,
      buttons,
    };
  });

  // 3 ─ tap targets
  r.tapTargetsUnder44 = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll(
      "a, button, select, input, textarea, [role='tab']"
    )) {
      const b = el.getBoundingClientRect();
      if (b.width === 0 || b.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      if (Math.min(b.width, b.height) < 44) {
        bad.push({
          tag: el.tagName.toLowerCase(),
          label: (el.getAttribute("aria-label") ?? el.textContent ?? "")
            .trim()
            .slice(0, 28),
          w: Math.round(b.width),
          h: Math.round(b.height),
        });
      }
    }
    return bad;
  });

  // 4 ─ overlapping text heuristic
  r.overlaps = await page.evaluate(() => {
    const leaves = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walk.nextNode())) {
      const t = n.textContent.trim();
      if (!t) continue;
      const el = n.parentElement;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const b = el.getBoundingClientRect();
      if (b.width > 0 && b.height > 0) leaves.push({ el, t: t.slice(0, 18), b });
    }
    const hits = [];
    for (let i = 0; i < leaves.length && hits.length < 5; i++) {
      for (let j = i + 1; j < leaves.length && hits.length < 5; j++) {
        const a = leaves[i], c = leaves[j];
        if (a.el.contains(c.el) || c.el.contains(a.el)) continue;
        const x = Math.max(0, Math.min(a.b.right, c.b.right) - Math.max(a.b.left, c.b.left));
        const y = Math.max(0, Math.min(a.b.bottom, c.b.bottom) - Math.max(a.b.top, c.b.top));
        if (x > 4 && y > 4) {
          if (x * y > 0.35 * Math.min(a.b.width * a.b.height, c.b.width * c.b.height)) {
            hits.push(`"${a.t}" × "${c.t}"`);
          }
        }
      }
    }
    return hits;
  });

  // 5 ─ truncated labels (excluding the intentional table scroll container)
  r.truncated = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll("a span, a, button, th, dt, h1, h2, p, span")) {
      if (el.closest(".spec-scroll")) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "none") continue;
      if (el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2 && cs.overflowX === "hidden") {
        bad.push(`${el.tagName.toLowerCase()}:"${(el.textContent ?? "").trim().slice(0, 22)}"`);
      }
    }
    return bad.slice(0, 8);
  });

  // 6 ─ spec table affordances
  r.specTable = await page.evaluate(() => {
    const wrap = document.querySelector(".spec-scroll");
    if (!wrap) return null;
    const hint = document.querySelector("[data-spec-hint]");
    const th = wrap.querySelector("tbody th");
    return {
      scrollable: wrap.scrollWidth > wrap.clientWidth + 1,
      overflowX: getComputedStyle(wrap).overflowX,
      hintVisible: hint ? getComputedStyle(hint).display !== "none" : false,
      stickyFirstCol: th
        ? getComputedStyle(th).position === "sticky" &&
          getComputedStyle(th).left === "0px"
        : false,
    };
  });

  // 7 ─ keyboard-open emulation (shrunken viewport ≈ keyboard covering lower 45%)
  if (width < 768) {
    r.keyboard = [];
    await page.setViewportSize({ width, height: Math.round(height * 0.55) });
    for (const id of ["name", "email", "phone", "productInterest"]) {
      await page.focus(`#${id}`);
      await page.waitForTimeout(250);
      const vis = await page.evaluate((fid) => {
        const el = document.getElementById(fid);
        const b = el.getBoundingClientRect();
        const headerB = document.querySelector("header").getBoundingClientRect();
        return {
          bottom: Math.round(b.bottom),
          vh: window.innerHeight,
          hiddenBelow: b.bottom > window.innerHeight + 1,
          underHeader: b.top < headerB.bottom - 4 && b.bottom > headerB.top,
        };
      }, id);
      r.keyboard.push({ field: id, ...vis });
    }
    await page.setViewportSize({ width, height });
  }
  await page.screenshot({ path: `qa/screens/${width}.png`, fullPage: true });
  r.consoleErrors = errors;
  results.push(r);
  await context.close();
}

await browser.close();
fs.writeFileSync("qa/mobile-qa-results.json", JSON.stringify(results, null, 2));

for (const r of results) {
  console.log(`\n=== ${r.width}px ===`);
  console.log(
    `h-scroll : ${r.horizontalScroll.overflowX <= 1 ? "NONE" : `FAIL +${r.horizontalScroll.overflowX}px ${JSON.stringify(r.horizontalScroll.offenders)}`}`
  );
  console.log(
    `header   : h=${r.header.headerH} navH=${r.header.navH} wraps=${r.header.navWraps} buttons=${JSON.stringify(r.header.buttons)}`
  );
  console.log(
    `tap<44   : ${r.tapTargetsUnder44.length === 0 ? "NONE" : JSON.stringify(r.tapTargetsUnder44)}`
  );
  console.log(
    `overlaps : ${r.overlaps.length === 0 ? "NONE" : JSON.stringify(r.overlaps)}`
  );
  console.log(
    `truncated: ${r.truncated.length === 0 ? "NONE" : JSON.stringify(r.truncated)}`
  );
  console.log(`specTable: ${JSON.stringify(r.specTable)}`);
  if (r.keyboard) {
    const bad = r.keyboard.filter((k) => k.hiddenBelow || k.underHeader);
    console.log(
      `keyboard : ${bad.length === 0 ? "ALL VISIBLE" : JSON.stringify(bad)}`
    );
  }
  console.log(
    `console  : ${r.consoleErrors.length === 0 ? "clean" : JSON.stringify(r.consoleErrors)}`
  );
}
