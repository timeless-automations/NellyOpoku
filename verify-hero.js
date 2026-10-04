const puppeteer = require('puppeteer');

async function verifyHeroSection() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take a screenshot of just the hero section to verify
    await page.screenshot({ 
      path: '/tmp/hero-verification.png',
      clip: { x: 0, y: 0, width: 1920, height: 800 }
    });
    
    console.log('Hero section screenshot saved to /tmp/hero-verification.png');
    
    // Check if background image is present
    const hasHeroImage = await page.evaluate(() => {
      const heroSection = document.querySelector('.hero, section, [class*="hero"]');
      if (heroSection) {
        const style = window.getComputedStyle(heroSection);
        return {
          backgroundImage: style.backgroundImage,
          hasImage: style.backgroundImage !== 'none'
        };
      }
      return { hasImage: false };
    });
    
    console.log('Hero background check:', hasHeroImage);
    
    await page.close();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

verifyHeroSection();
