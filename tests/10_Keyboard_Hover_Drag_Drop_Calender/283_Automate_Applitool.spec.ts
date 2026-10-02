import { test, expect } from '@playwright/test';
import { parseTransactionTotals } from '../utils/transaction-utils';

test('Verify monthly spending and earnings', async ({ page }) => {
  await page.goto('https://demo.applitools.com/');
  await page.locator('#username').fill('Admin');
  await page.locator('#password').fill('Password@123');
  await page.locator('#log-in').click();
  await expect(page).toHaveURL('https://demo.applitools.com/app.html');

  const amountCells = page.getByRole('table').locator('tbody tr td:last-child');
  const amounts: string[] = [];

  for (let index = 0; index < await amountCells.count(); index++) {
    amounts.push(await amountCells.nth(index).innerText());
  }

  const totals = parseTransactionTotals(amounts);
  const totalAfterSpending = Math.round((totals.earned - totals.spent) * 100) / 100;

  expect(totals.spent).toBe(564);
  expect(totals.earned).toBe(2560.22);
  expect(totalAfterSpending).toBe(1996.22);
});