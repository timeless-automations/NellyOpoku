const puppeteer = require('puppeteer');

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // 1. Desktop NL
    console.log('Capturing desktop-nl.png...');
    const pageNL = await browser.newPage();
    await pageNL.setViewport({ width: 1920, height: 1080 });
    await pageNL.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await pageNL.screenshot({ 
      path: '/workspace/screenshots/desktop-nl.png', 
      fullPage: true 
    });
    await pageNL.close();
    console.log('✓ desktop-nl.png saved');

    // 2. Desktop EN
    console.log('Capturing desktop-en.png...');
    const pageEN = await browser.newPage();
    await pageEN.setViewport({ width: 1920, height: 1080 });
    await pageEN.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    // Click EN button
    await pageEN.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const enButton = buttons.find(b => b.textContent.trim() === 'EN');
      if (enButton) enButton.click();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await pageEN.screenshot({ 
      path: '/workspace/screenshots/desktop-en.png', 
      fullPage: true 
    });
    await pageEN.close();
    console.log('✓ desktop-en.png saved');

    // 3. Mobile NL
    console.log('Capturing mobile-nl.png...');
    const pageMobileNL = await browser.newPage();
    await pageMobileNL.setViewport({ width: 375, height: 667 });
    await pageMobileNL.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await pageMobileNL.screenshot({ 
      path: '/workspace/screenshots/mobile-nl.png', 
      fullPage: true 
    });
    await pageMobileNL.close();
    console.log('✓ mobile-nl.png saved');

    // 4. Mobile FR
    console.log('Capturing mobile-fr.png...');
    const pageMobileFR = await browser.newPage();
    await pageMobileFR.setViewport({ width: 375, height: 667 });
    await pageMobileFR.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    // Click FR button
    await pageMobileFR.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const frButton = buttons.find(b => b.textContent.trim() === 'FR');
      if (frButton) frButton.click();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await pageMobileFR.screenshot({ 
      path: '/workspace/screenshots/mobile-fr.png', 
      fullPage: true 
    });
    await pageMobileFR.close();
    console.log('✓ mobile-fr.png saved');

    console.log('\n✅ All screenshots captured successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
