const puppeteer = require('puppeteer');

async function captureLightThemeScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // 1. Desktop NL - Overwrite existing
    console.log('Capturing desktop-nl.png (light theme)...');
    const pageNL = await browser.newPage();
    await pageNL.setViewport({ width: 1920, height: 1080 });
    await pageNL.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for any animations
    await pageNL.screenshot({ 
      path: '/workspace/screenshots/desktop-nl.png', 
      fullPage: true 
    });
    await pageNL.close();
    console.log('✓ desktop-nl.png saved (OVERWRITTEN)');

    // 2. Mobile NL - Overwrite existing
    console.log('Capturing mobile-nl.png (light theme)...');
    const pageMobileNL = await browser.newPage();
    await pageMobileNL.setViewport({ width: 375, height: 667 });
    await pageMobileNL.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for any animations
    await pageMobileNL.screenshot({ 
      path: '/workspace/screenshots/mobile-nl.png', 
      fullPage: true 
    });
    await pageMobileNL.close();
    console.log('✓ mobile-nl.png saved (OVERWRITTEN)');

    console.log('\n✅ Light theme screenshots captured successfully!');
    console.log('Both files have been OVERWRITTEN with the new light theme versions.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureLightThemeScreenshots();
