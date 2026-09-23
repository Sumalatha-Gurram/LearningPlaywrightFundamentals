import { test, expect } from "@playwright/test";

// Load the saved session

test.describe.configure({ mode: 'serial' });

test.use({
    storageState: './user-session.json'
});

test.describe('Wingify dashboard access with saved session', () => {
    test('go directly to dashboard — Test1', async ({ page }) => {
        await page.goto('https://app.wingify.com/#/dashboard?accountId=1281316');
        await expect(page).toHaveURL(/dashboard/);
        console.log('Dashboard loaded — no login needed ✅');
        await page.waitForTimeout(3000);
    });

    test('go directly to dashboard2 — Test2', async ({ page }) => {
        await page.goto('https://app.wingify.com/#/dashboard?accountId=1281316');
        await expect(page).toHaveURL(/dashboard/);
        console.log('Dashboard loaded — no login needed ✅');
        await page.waitForTimeout(3000);
    });

    test('go directly to dashboard3 — Test3', async ({ page }) => {
        await page.goto('https://app.wingify.com/#/dashboard?accountId=1281316');
        await expect(page).toHaveURL(/dashboard/);
        console.log('Dashboard loaded — no login needed ✅');
        await page.waitForTimeout(3000);
    });
});