const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Capturing AI Resume Screening...');
  await page.goto('https://ai-resume-screening-6thleneth-avinkumars-projects.vercel.app', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/ai-resume.jpg' });

  console.log('Capturing Meera Interiors...');
  await page.goto('https://meera-upvc.vercel.app/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/meera-interiors.jpg' });

  console.log('Capturing Beauty Parlour...');
  await page.goto('https://beauty-parlour-landing-page-two.vercel.app/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/beauty-parlour.jpg' });

  await browser.close();
  console.log('Done capturing screenshots!');
})();
