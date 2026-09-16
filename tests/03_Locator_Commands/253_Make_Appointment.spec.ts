import { test, expect } from '@playwright/test';

test('Make Appointment', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await page.locator('#btn-make-appointment').click();
    await page.locator('#txt-username').fill('John Doe');
    await page.locator('#txt-password').fill('ThisIsNotAPassword');
    await page.locator('#btn-login').click();
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/#appointment');
});