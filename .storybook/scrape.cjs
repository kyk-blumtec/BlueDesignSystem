const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        console.log('Navigating to Storybook...');
        await page.goto('http://localhost:6009/', { waitUntil: 'networkidle2' });
        
        console.log('Waiting for sidebar...');
        await page.waitForSelector('#storybook-explorer-tree');
        
        // Wait a moment for dynamic rendering
        await new Promise(r => setTimeout(r, 1000));
        
        console.log('Expanding folders...');
        try {
            // Click 3. UX-writing
            await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('a.sidebar-item, button.sidebar-item'));
                const uxwriting = items.find(el => el.textContent.trim().startsWith('3. UX'));
                if (uxwriting) uxwriting.click();
            });
            await new Promise(r => setTimeout(r, 600));

            // Click 3.1 문장 작성 원칙
            await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('a.sidebar-item, button.sidebar-item'));
                const rules = items.find(el => el.textContent.trim().startsWith('3.1 문장'));
                if (rules) rules.click();
            });
            await new Promise(r => setTimeout(r, 600));
        } catch (e) {
            console.error('Clicking error:', e);
        }

        console.log('Extracting tree HTML...');
        const html = await page.evaluate(() => {
            const tree = document.getElementById('storybook-explorer-tree');
            return tree ? tree.outerHTML : 'Tree not found';
        });
        
        fs.writeFileSync('C:/Users/USER/BlueDesignSystem/.storybook/sidebar_html.txt', html);
        console.log('Done! Wrote sidebar_html.txt');
        
        await browser.close();
        process.exit(0);
    } catch (err) {
        console.error('Scraping error:', err);
        process.exit(1);
    }
})();
