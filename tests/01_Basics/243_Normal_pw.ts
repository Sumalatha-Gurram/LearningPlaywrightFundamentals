import { chromium, type Browser, type BrowserContext, type Page } from "@playwright/test";

async function run() {
    let browser: Browser = await chromium.launch({ headless: false });
    let context: BrowserContext = await browser.newContext();
    let page: Page = await context.newPage();
    await page.goto("https://example.com");
    console.log(await page.title());
    await page.close();
    await context.close();
    await browser.close();
}
run();

// Browser launched
// Context created
// Page opened
// Title: Example Domain