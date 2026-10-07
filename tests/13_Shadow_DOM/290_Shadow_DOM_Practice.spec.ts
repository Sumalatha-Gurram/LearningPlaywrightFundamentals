import { test, expect } from '@playwright/test';

test('Handle Shadow DOM', async ({ page }) => {
  const URL = 'https://selectorshub.com/xpath-practice-page/';

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

await page.getByTitle('user name field').fill('Test');
await page.getByPlaceholder('Enter pizza name').fill('Chicken Tikka Pizza');
await page.keyboard.press('Tab');
await page.keyboard.type('need to practice');
await page.keyboard.press('Tab');
await page.getByPlaceholder('enter password').fill('PracticePass123!');
//await page.waitForTimeout(3000);
});