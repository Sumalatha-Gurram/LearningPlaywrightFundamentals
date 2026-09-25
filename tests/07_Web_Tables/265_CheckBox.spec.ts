import { test } from '@playwright/test';

test('Click Rohan.Mehta checkbox', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/webtable');

  const checkbox = page.locator(
    '//td[normalize-space()="Rohan.Mehta"]/preceding-sibling::td/input[@type="checkbox"]'
  );

  await checkbox.check();
});