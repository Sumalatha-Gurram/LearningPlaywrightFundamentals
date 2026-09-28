import { test, expect, type Page } from '@playwright/test';

async function searchAndNavigate(page: Page, query: string) {
    const productDetails: Array<{ name: string; price: string }> = [];

    await page.goto('https://www.flipkart.com/search?q=' + encodeURIComponent(query));

    const closeButton = page.locator('button._2KpZ6l._2doB4z').first();
    if (await closeButton.isVisible().catch(() => false)) {
        await closeButton.click();
    }

    const searchInput = page.locator('input[placeholder*="Search for products"]').first();
    await expect(searchInput).toBeVisible({ timeout: 20000 });
    await searchInput.fill(query);
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    let pageNumber = 1;

    while (true) {
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        const cards = page.locator('a[href*="/p/"]');
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            const fullText = (await card.innerText().catch(() => '')).trim();

            if (!fullText) {
                continue;
            }

            const lines = fullText
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean);

            const name = lines[0] || '';
            const priceMatch = fullText.match(/₹\s*[,\d]+/);
            const price = priceMatch ? priceMatch[0].trim() : '';

            if (name && price) {
                productDetails.push({ name, price });
                console.log(`Page ${pageNumber} | Name: ${name} | Price: ${price}`);
            }
        }

        const nextButton = page.locator('a[aria-label="Next"]').first();
        const hasNext = await nextButton.isVisible().catch(() => false);

        if (!hasNext) {
            console.log('Reached the last page. No Next button visible.');
            break;
        }

        await nextButton.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        pageNumber++;
    }

    console.log('All product details:', productDetails);
    return productDetails;
}

test('Navigate all pages and print names with prices', async ({ page }) => {
    const products = await searchAndNavigate(page, 'DSLR Camera');
    console.log('Total products collected:', products.length);
});