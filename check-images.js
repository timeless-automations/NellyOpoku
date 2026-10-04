const puppeteer = require('puppeteer');

async function checkImages() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for all images in the hero section
    const images = await page.evaluate(() => {
      const allImages = Array.from(document.querySelectorAll('img'));
      return allImages.map(img => ({
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        className: img.className
      }));
    });
    
    console.log('All images found on page:');
    images.forEach((img, i) => {
      console.log(`${i + 1}. ${img.src}`);
      console.log(`   Alt: ${img.alt}, Size: ${img.width}x${img.height}, Class: ${img.className}`);
    });
    
    await page.close();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

checkImages();
