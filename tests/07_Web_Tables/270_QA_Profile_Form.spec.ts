import{test} from '@playwright/test';
test('QA Profile Form', async ({page})=>{
await page.goto("https://app.thetestingacademy.com/playwright/tables/practice#page");
await page.locator('#first-name').fill('Sumalatha');
await page.locator('#last-name').fill('Gurram');
await page.getByLabel('Female').click();
await page.locator('#years-experience').click();
await page.selectOption('#years-experience' , '7');
await page.locator('#profile-date').fill('2026-09-29');
await page.getByLabel('Manual Tester').click();
await page.getByRole('checkbox', {name:'Selenium Webdriver'}).check();
await page.getByRole('checkbox', {name:'Asia'}).check();
await page.locator('#profile-submit').click();
await page.waitForTimeout(2000);
const submissionOutput = JSON.parse(await page.locator('#submission-output').innerText());
console.log('Saved profile data:', submissionOutput);

});