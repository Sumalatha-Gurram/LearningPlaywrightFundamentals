import { test, expect } from '@playwright/test';

test('Multiple Element Assertion', async ({ page }) => {

// 1.URL Assertions

const URL='https://app.thetestingacademy.com/playwright/multiple_element_filter';
await page.goto(URL);
await expect(page).toHaveURL(URL);

// 2.Heading Assertion

await expect(page.getByRole('heading', { name: 'Student Login' })).toBeVisible();

// 3.Visible Text Assertions

await expect(page.getByText('Practice page for Playwright selectors')).toBeVisible();
await expect(page.getByText('SECURE PRACTICE')).toBeVisible();

// 4.Email Assertions

const email = page.locator('#email');
await expect(email).toBeVisible();
await expect(email).toBeEnabled();
await expect(email).toBeEditable();
await expect(email).toHaveAttribute('type', 'email');

// 5.Password Assertions

await expect(page.getByText('Password', { exact: true })).toBeVisible();
const pswd=page.locator('#password');
await expect(pswd).toBeVisible();
await expect(pswd).toBeEnabled();
await expect(pswd).toBeEditable();
await expect(pswd).toHaveAttribute('type', 'password');

// 6. Checkbox Assertions

const rememberMe = page.getByRole('checkbox', {name: 'Remember me'});

await expect(rememberMe).toBeVisible();
await expect(rememberMe).toBeEnabled();
await expect(rememberMe).not.toBeChecked();

// 7.Forgot Password Link Assertion

await expect(page.getByRole('link', { name: 'Forget password?' })).toBeVisible();

// 8.Login Button Assertion

const loginButton = page.getByRole('button', {name: 'Login to Practice Account'});

await expect(loginButton).toBeVisible();
await expect(loginButton).toBeEnabled();
await expect(loginButton).toHaveText('Login to Practice Account');

// 9. GitHub Button

await expect(page.getByRole('button', { name: /Continue with GitHub/i })).toBeVisible();

// 10. Google Button

await expect(page.getByRole('button', { name: /Continue with Google/i })).toBeVisible();
});