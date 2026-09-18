import { test, expect } from '@playwright/test';

test('Verify Login Validation', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');

  const email = page.locator('#email');
  await email.fill('grtyui@gmail.com');

  const password = page.locator('#password');
  await password.fill('seargt@34');

  await page.locator('input[name="remember"]').check();
  await page.locator('button.login-btn').click();

  await expect(page).toHaveURL(/#login-success|login-success/);
});