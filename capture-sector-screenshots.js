const puppeteer = require('puppeteer');

async function captureSectorScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const sectors = [
    { name: 'vastgoed', url: 'http://localhost:8080/vastgoed.html' },
    { name: 'verzekeringen', url: 'http://localhost:8080/verzekeringen.html' },
    { name: 'autodealers', url: 'http://localhost:8080/autodealers.html' }
  ];

  const results = [];

  try {
    for (const sector of sectors) {
      console.log(`\n📸 Capturing ${sector.name} screenshots...`);
      
      // Desktop NL (1920px)
      console.log(`  → ${sector.name}-desktop-nl.png (1920px)...`);
      const desktopPage = await browser.newPage();
      await desktopPage.setViewport({ width: 1920, height: 1080 });
      await desktopPage.goto(sector.url, { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const desktopPath = `/workspace/sector-screenshots/${sector.name}-desktop-nl.png`;
      await desktopPage.screenshot({ 
        path: desktopPath,
        fullPage: true 
      });
      await desktopPage.close();
      console.log(`     ✓ Saved`);
      
      // Mobile NL (375px)
      console.log(`  → ${sector.name}-mobile-nl.png (375px)...`);
      const mobilePage = await browser.newPage();
      await mobilePage.setViewport({ width: 375, height: 667 });
      await mobilePage.goto(sector.url, { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mobilePath = `/workspace/sector-screenshots/${sector.name}-mobile-nl.png`;
      await mobilePage.screenshot({ 
        path: mobilePath,
        fullPage: true 
      });
      await mobilePage.close();
      console.log(`     ✓ Saved`);
      
      results.push({
        sector: sector.name,
        desktop: desktopPath,
        mobile: mobilePath
      });
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ ALL SECTOR SCREENSHOTS CAPTURED SUCCESSFULLY!');
    console.log('='.repeat(70));
    console.log('\nTotal: 6 screenshots (3 sectors × 2 viewports)');
    console.log('Location: /workspace/sector-screenshots/');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureSectorScreenshots();
