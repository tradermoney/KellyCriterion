const puppeteer = require('puppeteer');

async function testI18nTitle() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('🚀 测试网页标题国际化功能...');

    // 访问应用
    await page.goto('http://localhost:4173/KellyCriterion/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 获取初始标题
    const initialTitle = await page.title();
    console.log('📋 初始标题:', initialTitle);

    // 通过JavaScript直接切换语言
    console.log('🔄 通过JavaScript切换语言...');

    // 切换到英文
    await page.evaluate(() => {
      // 查找语言切换相关的元素并触发切换
      const languageElements = document.querySelectorAll('*');
      for (let el of languageElements) {
        if (el.textContent === '🇺🇸 English' || el.getAttribute('data-value') === 'en') {
          el.click();
          break;
        }
      }
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    const englishTitle = await page.title();
    console.log('🇺🇸 英文标题:', englishTitle);

    // 验证结果
    console.log('\n📊 === 测试结果 ===');

    let passCount = 0;
    let totalTests = 2;

    // 测试1：初始标题
    if (initialTitle.includes('凯利公式优势演示器')) {
      console.log('✅ 初始中文标题测试通过');
      passCount++;
    } else {
      console.log('❌ 初始中文标题测试失败');
      console.log('   期望包含: 凯利公式优势演示器');
      console.log('   实际标题:', initialTitle);
    }

    // 测试2：英文标题
    if (englishTitle.includes('Kelly Criterion Advantage Demonstrator')) {
      console.log('✅ 英文标题测试通过');
      passCount++;
    } else {
      console.log('❌ 英文标题测试失败');
      console.log('   期望包含: Kelly Criterion Advantage Demonstrator');
      console.log('   实际标题:', englishTitle);
    }

    console.log(`\n🏆 === 测试总结 ===`);
    console.log(`✅ 通过测试: ${passCount}/${totalTests}`);

    if (passCount === totalTests) {
      console.log('🎉 网页标题国际化功能测试通过！');
      console.log('✨ 功能实现成功，标题可以根据语言设置动态更新。');
      return true;
    } else {
      console.log('⚠️  部分测试失败，需要进一步检查。');
      return false;
    }

  } catch (error) {
    console.error('❌ 测试失败:', error);
    return false;
  } finally {
    await browser.close();
  }
}

// 运行测试
testI18nTitle().then(success => {
  console.log('\n' + '='.repeat(50));
  if (success) {
    console.log('✅ 任务完成：网页标题国际化功能已实现并验证成功！');
  } else {
    console.log('❌ 任务失败：需要进一步调试。');
  }
  process.exit(success ? 0 : 1);
});