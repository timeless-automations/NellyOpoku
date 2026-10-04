const puppeteer = require('puppeteer');

async function testHeroAtResolutions() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  try {
    // Test resolutions for hero verification
    const heroTests = [
      { width: 1440, height: 900, name: 'hero-1440x900.png' },
      { width: 1280, height: 800, name: 'hero-1280x800.png' },
      { width: 1024, height: 768, name: 'hero-1024x768.png' }
    ];

    // 1-3. Hero verification screenshots
    for (const test of heroTests) {
      console.log(`\n📸 Capturing ${test.name} (${test.width}x${test.height})...`);
      const page = await browser.newPage();
      await page.setViewport({ width: test.width, height: test.height });
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Capture just the hero section (top ~800px)
      const heroHeight = Math.min(800, test.height);
      await page.screenshot({ 
        path: `/workspace/site-review/${test.name}`,
        clip: { x: 0, y: 0, width: test.width, height: heroHeight }
      });
      
      // Analyze the hero layout
      const analysis = await page.evaluate(() => {
        const heroImage = document.querySelector('.hero-image, img[class*="hero"]');
        const dashboard = document.querySelector('.dashboard-mockup, [class*="dashboard"]');
        const nav = document.querySelector('nav, header');
        
        const result = {
          imageFound: !!heroImage,
          dashboardFound: !!dashboard,
          navHeight: nav ? nav.offsetHeight : 0
        };
        
        if (heroImage) {
          const imgRect = heroImage.getBoundingClientRect();
          result.imageWidth = Math.round(imgRect.width);
          result.imageHeight = Math.round(imgRect.height);
          result.imageVisible = imgRect.width > 0 && imgRect.height > 0;
          result.imageDominant = imgRect.width > 400; // Should be ~560px
        }
        
        if (dashboard) {
          const dashRect = dashboard.getBoundingClientRect();
          result.dashboardWidth = Math.round(dashRect.width);
          result.dashboardHeight = Math.round(dashRect.height);
          result.dashboardTop = Math.round(dashRect.top);
          result.dashboardLeft = Math.round(dashRect.left);
          result.dashboardSmall = dashRect.width < 400; // Should be ~300px
          result.dashboardNotCutOff = dashRect.top > result.navHeight;
        }
        
        return result;
      });
      
      analysis.resolution = `${test.width}x${test.height}`;
      results.push(analysis);
      
      console.log(`✓ ${test.name} saved`);
      console.log(`  Photo: ${analysis.imageWidth}x${analysis.imageHeight}px (dominant: ${analysis.imageDominant})`);
      console.log(`  Dashboard: ${analysis.dashboardWidth}x${analysis.dashboardHeight}px at (${analysis.dashboardLeft}, ${analysis.dashboardTop}) (small: ${analysis.dashboardSmall})`);
      console.log(`  Dashboard not cut off by nav (${analysis.navHeight}px): ${analysis.dashboardNotCutOff}`);
      
      await page.close();
    }

    // 4. Full desktop page in NL at 1920x1080 - OVERWRITE
    console.log(`\n📸 Capturing full desktop-nl.png (1920x1080)...`);
    const fullPage = await browser.newPage();
    await fullPage.setViewport({ width: 1920, height: 1080 });
    await fullPage.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 1500));
    await fullPage.screenshot({ 
      path: '/workspace/screenshots/desktop-nl.png', 
      fullPage: true 
    });
    console.log('✓ desktop-nl.png saved (OVERWRITTEN)');
    
    // Also analyze hero at 1920x1080
    const fullPageAnalysis = await fullPage.evaluate(() => {
      const heroImage = document.querySelector('.hero-image, img[class*="hero"]');
      const dashboard = document.querySelector('.dashboard-mockup, [class*="dashboard"]');
      const nav = document.querySelector('nav, header');
      
      const result = {
        imageFound: !!heroImage,
        dashboardFound: !!dashboard,
        navHeight: nav ? nav.offsetHeight : 0
      };
      
      if (heroImage) {
        const imgRect = heroImage.getBoundingClientRect();
        result.imageWidth = Math.round(imgRect.width);
        result.imageHeight = Math.round(imgRect.height);
        result.imageVisible = imgRect.width > 0 && imgRect.height > 0;
        result.imageDominant = imgRect.width > 400;
      }
      
      if (dashboard) {
        const dashRect = dashboard.getBoundingClientRect();
        result.dashboardWidth = Math.round(dashRect.width);
        result.dashboardHeight = Math.round(dashRect.height);
        result.dashboardTop = Math.round(dashRect.top);
        result.dashboardLeft = Math.round(dashRect.left);
        result.dashboardSmall = dashRect.width < 400;
        result.dashboardNotCutOff = dashRect.top > result.navHeight;
      }
      
      return result;
    });
    
    fullPageAnalysis.resolution = '1920x1080';
    results.push(fullPageAnalysis);
    
    console.log(`  Photo: ${fullPageAnalysis.imageWidth}x${fullPageAnalysis.imageHeight}px (dominant: ${fullPageAnalysis.imageDominant})`);
    console.log(`  Dashboard: ${fullPageAnalysis.dashboardWidth}x${fullPageAnalysis.dashboardHeight}px (small: ${fullPageAnalysis.dashboardSmall})`);
    
    await fullPage.close();

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('HERO LAYOUT VERIFICATION SUMMARY');
    console.log('='.repeat(70));
    
    results.forEach((r, i) => {
      const testNum = i + 1;
      console.log(`\n${testNum}. Resolution: ${r.resolution}`);
      console.log(`   ✓ Photo dominant and visible: ${r.imageDominant && r.imageVisible ? 'YES ✅' : 'NO ❌'} (${r.imageWidth}px wide)`);
      console.log(`   ✓ Dashboard is small floating card: ${r.dashboardSmall ? 'YES ✅' : 'NO ❌'} (~${r.dashboardWidth}px wide)`);
      console.log(`   ✓ Dashboard not cut off by nav: ${r.dashboardNotCutOff ? 'YES ✅' : 'NO ❌'} (top: ${r.dashboardTop}px, nav: ${r.navHeight}px)`);
    });
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ All screenshots captured successfully!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

testHeroAtResolutions();
