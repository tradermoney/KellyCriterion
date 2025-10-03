const puppeteer = require('puppeteer');

async function testI18nTitle() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  try {
    console.log('正在访问应用...');
    await page.goto('http://localhost:4173/KellyCriterion/', { waitUntil: 'networkidle2' });

    console.log('等待页面加载...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 获取初始标题
    const initialTitle = await page.title();
    console.log('初始标题:', initialTitle);

    console.log('查找语言切换组件...');
    // 等待Select组件加载
    await page.waitForSelector('[aria-label="Select language"], [aria-label="选择语言"]', { timeout: 10000 });

    // 获取当前语言
    const currentLanguage = await page.$eval('[aria-label="Select language"], [aria-label="选择语言"]', el => el.textContent);
    console.log('当前语言:', currentLanguage);

    console.log('切换到英文...');
    // 点击打开下拉菜单
    await page.click('[aria-label="Select language"], [aria-label="选择语言"]');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 选择英文
    await page.click('[role="option"][data-value="en"]');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 获取英文标题
    const englishTitle = await page.title();
    console.log('英文标题:', englishTitle);

    console.log('切换回中文...');
    // 点击打开下拉菜单
    await page.click('[aria-label="Select language"], [aria-label="选择语言"]');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 选择中文
    await page.click('[role="option"][data-value="zh"]');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 获取中文标题
    const chineseTitle = await page.title();
    console.log('中文标题:', chineseTitle);

    // 验证结果
    console.log('\n=== 测试结果 ===');
    console.log('期望的中文标题: 凯利公式优势演示器 - 专业投资策略仿真工具');
    console.log('期望的英文标题: Kelly Criterion Advantage Demonstrator - Professional Investment Strategy Simulation Tool');
    console.log('实际的初始标题:', initialTitle);
    console.log('实际的英文标题:', englishTitle);
    console.log('实际的中文标题:', chineseTitle);

    let passCount = 0;
    let totalTests = 2;

    if (englishTitle.includes('Kelly Criterion')) {
      console.log('✅ 英文标题测试通过');
      passCount++;
    } else {
      console.log('❌ 英文标题测试失败');
    }

    if (chineseTitle.includes('凯利公式')) {
      console.log('✅ 中文标题测试通过');
      passCount++;
    } else {
      console.log('❌ 中文标题测试失败');
    }

    console.log(`\n=== 总结 ===`);
    console.log(`通过测试: ${passCount}/${totalTests}`);

    if (passCount === totalTests) {
      console.log('🎉 所有测试通过！网页标题国际化功能正常工作。');
    } else {
      console.log('⚠️  部分测试失败，需要检查实现。');
    }

  } catch (error) {
    console.error('测试失败:', error);
  } finally {
    await browser.close();
  }
}

testI18nTitle();