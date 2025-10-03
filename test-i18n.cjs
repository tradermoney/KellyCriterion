const puppeteer = require('puppeteer');

async function testI18nTitle() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // 访问应用
    await page.goto('http://localhost:4173/KellyCriterion/', { waitUntil: 'networkidle2' });

    // 等待页面加载
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 获取初始标题
    const initialTitle = await page.title();
    console.log('初始标题:', initialTitle);

    // 查找语言切换按钮
    await page.waitForSelector('select');

    // 切换到英文
    await page.select('select', 'en');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 获取英文标题
    const englishTitle = await page.title();
    console.log('英文标题:', englishTitle);

    // 切换回中文
    await page.select('select', 'zh');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 获取中文标题
    const chineseTitle = await page.title();
    console.log('中文标题:', chineseTitle);

    // 验证结果
    console.log('\n=== 测试结果 ===');
    console.log('期望的中文标题: 凯利公式优势演示器 - 专业投资策略仿真工具');
    console.log('实际的初始标题:', initialTitle);
    console.log('实际的英文标题:', englishTitle);
    console.log('实际的中文标题:', chineseTitle);

    if (englishTitle.includes('Kelly Criterion')) {
      console.log('✅ 英文标题测试通过');
    } else {
      console.log('❌ 英文标题测试失败');
    }

    if (chineseTitle.includes('凯利公式')) {
      console.log('✅ 中文标题测试通过');
    } else {
      console.log('❌ 中文标题测试失败');
    }

  } catch (error) {
    console.error('测试失败:', error);
  } finally {
    await browser.close();
  }
}

testI18nTitle();