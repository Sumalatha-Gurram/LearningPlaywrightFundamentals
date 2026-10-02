import { test, expect } from '@playwright/test';
test('Verify Hover Menus', async ({ page }) => {
await page.goto('https://app.thetestingacademy.com/playwright/widgets/hover-menu');
await page.getByTestId('nav-add-ons').hover();
await expect(page.getByTestId('test-id-Wifi')).toBeVisible();
await page.getByTestId('test-id-Wifi').click();
const finaloutput = JSON.parse(await page.getByTestId('hover-output').innerText());
console.log('Clicked Data', finaloutput);
});