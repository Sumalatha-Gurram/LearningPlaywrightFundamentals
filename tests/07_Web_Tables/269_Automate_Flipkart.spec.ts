import{test, expect} from '@playwright/test';

async function searchAndNavigate(page, query) {
    await page.goto('https://www.flipkart.com/search?q=' + encodeURIComponent(query));

    const closeButton = page.locator('button._2KpZ6l._2doB4z').first();
    if (await closeButton.isVisible().catch(() => false)) {
        await closeButton.click();
    }

    const searchInput = page.locator('input[placeholder*="Search for products"]').first();
    await expect(searchInput).toBeVisible({ timeout: 20000 });
    await searchInput.fill(query);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    while (true) {
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        const cards = page.locator('div._1AtVbE');
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            const name = await card.locator('div._4rR01T').first().innerText().catch(() => '');
            const price = await card.locator('div._30jeq3').first().innerText().catch(() => '');

            if (name && price) {
                console.log(`Name: ${name} | Price: ${price}`);
            }
        }

        const nextButton = page.locator('a[aria-label="Next"]').first();
        const hasNext = await nextButton.isVisible().catch(() => false);

        if (!hasNext) {
            break;
        }

        await nextButton.click();
        await page.waitForTimeout(3000);
    }
}

test('Switch to Next', async({page})=>{
    await searchAndNavigate(page, 'DSLR Camera');
});