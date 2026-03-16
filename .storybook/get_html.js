import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:6009');
  
  // Wait for sidebar to load
  await page.waitForSelector('#storybook-explorer-tree');

  // Click to expand 3. UX-writing
  await page.click('button.sidebar-item:has-text("3. UX-writing")');
  await page.waitForTimeout(500);

  // Click to expand 3.1 문장 작성 원칙
  await page.click('button.sidebar-item:has-text("3.1 문장 작성 원칙")');
  await page.waitForTimeout(500);

  // Find the exact HTML of 3.1.1
  const html = await page.evaluate(() => {
    const el = document.querySelector('a.sidebar-item:has-text("3.1.1 명확성")');
    if (!el) return 'Not found';
    return el.outerHTML;
  });

  console.log('HTML for 3.1.1 명확성:');
  console.log(html);

  await browser.close();
})();
