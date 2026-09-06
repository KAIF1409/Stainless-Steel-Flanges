/*
 * GTM integration test. Expects NEXT_PUBLIC_GTM_ID to be set at build time.
 * Verifies: gtm.js is requested from googletagmanager.com, the noscript
 * iframe is present, and generate_lead is pushed to window.dataLayer on a
 * real form submit. Usage: node scripts/gtm-check.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3100";
const gtmRequests = [];

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on("request", (req) => {
  if (req.url().includes("googletagmanager.com")) {
    gtmRequests.push(req.url());
  }
});

await page.goto(BASE, { waitUntil: "networkidle" });

const html = await page.content();
const hasNoscript = html.includes("googletagmanager.com/ns.html");
const hasDataLayer = await page.evaluate(() => Array.isArray(window.dataLayer));
const hasGtmStart = await page.evaluate(
  () => (window.dataLayer ?? []).some((e) => e && e["gtm.start"])
);

await page.fill("#name", "GTM Test");
await page.fill("#email", "gtm-test@example.com");
await page.fill("#phone", "+971 501234567");
await page.selectOption("#productInterest", "Blind Flanges");
await page.click("button[type=submit]");
await page.waitForSelector("[role=status]", { timeout: 10000 });

const lead = await page.evaluate(() =>
  (window.dataLayer ?? []).find((e) => e.event === "generate_lead")
);

console.log("gtm.js requested:", gtmRequests.length > 0 ? gtmRequests[0] : "NO");
console.log("noscript iframe present:", hasNoscript);
console.log("window.dataLayer present:", hasDataLayer);
console.log("gtm.start pushed:", hasGtmStart);
console.log("generate_lead after submit:", JSON.stringify(lead));

if (gtmRequests.length === 0) throw new Error("gtm.js was not requested");
if (!hasNoscript) throw new Error("noscript iframe missing");
if (!lead) throw new Error("generate_lead missing after submit");
console.log("\nGTM CHECK: PASS");
await browser.close();
