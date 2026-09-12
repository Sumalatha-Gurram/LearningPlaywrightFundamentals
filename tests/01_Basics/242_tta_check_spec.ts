import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('sumalatha');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('12');
  await page.locator('[data-test="password"]').press('Tab');
  await page.locator('[data-test="login-button"]').click();
});