/*
 * End-to-end enquiry form test against a running server.
 * Verifies: validation, POST /api/enquiry 200, success UI with RFQ ref,
 * and the generate_lead dataLayer event after a real submit.
 *
 * Usage: node scripts/form-e2e.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const apiResponses = [];
page.on("response", (res) => {
  if (res.url().includes("/api/enquiry")) {
    apiResponses.push({ status: res.status(), body: res.json() });
  }
});

await page.goto(BASE, { waitUntil: "networkidle" });

// 1. invalid submit shows field errors and does NOT hit the API
await page.click("button[type=submit]");
await page.waitForTimeout(300);
const errorCount = await page.locator("p[id$='-error'], #product-error").count();
console.log("client validation errors shown:", errorCount);
if (errorCount < 4) throw new Error("expected 4 validation errors");

// 2. valid submit
await page.fill("#name", "QA Test");
await page.fill("#email", "qa-test@example.com");
await page.fill("#phone", "+91 98200 12345");
await page.selectOption("#productInterest", "Weld Neck Flanges");
await page.click("button[type=submit]");

await page.waitForSelector("[role=status]", { timeout: 10000 });
const successText = await page.locator("[role=status]").innerText();
console.log("success UI:", successText.replace(/\n/g, " | "));

const res = apiResponses[0];
console.log("API status:", res.status, "body:", JSON.stringify(await res.body));

const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
const lead = dataLayer.find((e) => e.event === "generate_lead");
console.log("dataLayer generate_lead:", JSON.stringify(lead));

if (!res || res.status !== 200) throw new Error("API did not return 200");
if (!successText.includes("RFQ-")) throw new Error("no RFQ reference shown");
if (!lead || lead.form_name !== "flange_enquiry") {
  throw new Error("generate_lead not pushed to dataLayer");
}
console.log("\nE2E FORM TEST: PASS");
await browser.close();
