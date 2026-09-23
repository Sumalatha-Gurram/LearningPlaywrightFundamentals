import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const VWO_USER = process.env.VWO_USER;
const VWO_PASS = process.env.VWO_PASS;

test('Save VWO session state', async ({ browser }) => {
  test.skip(!VWO_USER || !VWO_PASS, 'VWO_USER and VWO_PASS must be set in .env');

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://app.wingify.com/#/login');
  await page.fill('#login-username', VWO_USER!);
  await page.fill('#login-password', VWO_PASS!);
  await page.click('#js-login-btn');
  await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });

  await context.storageState({ path: './user-session.json' });
  console.log('Session saved to user-session.json ✅');
});