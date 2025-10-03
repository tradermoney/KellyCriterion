const puppeteer = require('puppeteer');

async function testDevTitle() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('🚀 开发环境测试网页标题国际化...');

    await page.goto('http://localhost:55289/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 获取初始标题
    const title1 = await page.title();
    console.log('📋 初始标题:', title1);

    // 通过JavaScript直接测试语言切换
    await page.evaluate(() => {
      console.log('测试直接调用语言切换...');

      // 尝试通过点击语言选项切换
      const languageElements = document.querySelectorAll('*');
      for (let el of languageElements) {
        if (el.textContent === '🇺🇸 English' || el.getAttribute('data-value') === 'en') {
          console.log('找到英文选项:', el);
          el.click();
          break;
        }
      }
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    const title2 = await page.title();
    console.log('🇺🇸 切换英文后标题:', title2);

    console.log('');
    console.log('📊 测试结果:');
    console.log('初始标题:', title1);
    console.log('英文标题:', title2);
    const success = title1 !== title2;
    console.log('是否成功切换:', success ? '✅ 是' : '❌ 否');

    return success;

  } catch (error) {
    console.error('❌ 测试失败:', error);
    return false;
  } finally {
    await browser.close();
  }
}

testDevTitle().then(success => {
  process.exit(success ? 0 : 1);
});