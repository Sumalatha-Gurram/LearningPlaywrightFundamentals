import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('Upload Profile Picture', async ({ page }) => {
  const email = process.env.TTA_EMAIL;
  const password = process.env.TTA_PASSWORD;
  const picturePath = process.env.TTA_PROFILE_PICTURE_PATH;

  if (!email || !password || !picturePath) {
    throw new Error(
      'Set TTA_EMAIL, TTA_PASSWORD, and TTA_PROFILE_PICTURE_PATH in your local .env file before running this test.',
    );
  }

  await page.goto('https://app.thetestingacademy.com/login', {
    waitUntil: 'domcontentloaded',
  });
  await page.getByPlaceholder('Enter your email address').fill(email);
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.locator('button.cl-formButtonPrimary').click();

  await expect(page).toHaveURL(/\/student\/my-process/);
  const settingsLink = page.getByRole('link', { name: 'Settings' });
  await expect(settingsLink).toBeVisible();
  await Promise.all([
    page.waitForURL('**/student/settings', { waitUntil: 'domcontentloaded' }),
    settingsLink.click(),
  ]);

  const closeButton = page.getByRole('button', { name: /close/i });
  if (await closeButton.isVisible()) {
    await closeButton.click();
  }

  const profilePictureInput = page.locator('input[type="file"]');
  await expect(profilePictureInput).toBeAttached();
  await profilePictureInput.setInputFiles(picturePath);
});
