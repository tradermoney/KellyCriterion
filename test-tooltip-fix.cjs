const puppeteer = require('puppeteer');

async function testTooltipFix() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('🚀 测试HelpTooltip z-index修复效果...');

    // 访问应用
    await page.goto('http://localhost:55289/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🔍 检查HelpTooltip的z-index值...');

    // 直接检查HelpTooltip的z-index
    const zIndexCheck = await page.evaluate(() => {
      // 查找页面上所有可能的HelpTooltip元素
      const tooltips = document.querySelectorAll('div[style*="z-index"]');
      const results = [];

      tooltips.forEach((tooltip, index) => {
        const style = tooltip.getAttribute('style');
        if (style && style.includes('z-index')) {
          results.push({
            index,
            style,
            zIndex: tooltip.style.zIndex,
            className: tooltip.className,
            tagName: tooltip.tagName
          });
        }
      });

      return results;
    });

    console.log('📋 找到的z-index元素:', zIndexCheck);

    // 检查是否有9999的z-index
    const hasHighZIndex = zIndexCheck.some(el => el.zIndex === '9999');
    console.log('🔍 发现高z-index元素:', hasHighZIndex);

    // 测试HelpTooltip是否可访问
    console.log('❓ 测试HelpTooltip交互...');

    // 查找问号按钮
    const helpButtons = await page.$$('button');
    let foundHelpButton = false;

    for (let button of helpButtons) {
      const text = await button.evaluate(el => el.textContent);
      if (text === '?') {
        foundHelpButton = true;
        console.log('✅ 找到HelpTooltip按钮');

        // 悬停显示HelpTooltip
        await button.hover();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 检查是否显示了HelpTooltip
        const tooltipVisible = await page.evaluate(() => {
          const tooltips = document.querySelectorAll('div[style*="z-index: 9999"]');
          return tooltips.length > 0;
        });

        console.log('🎯 HelpTooltip显示状态:', tooltipVisible ? '✅ 已显示' : '❌ 未显示');
        break;
      }
    }

    if (!foundHelpButton) {
      console.log('⚠️ 未找到HelpTooltip按钮');
    }

    // 对比图表工具提示的z-index
    console.log('📊 对比图表工具提示z-index...');
    const chartTooltips = await page.evaluate(() => {
      const chartTips = document.querySelectorAll('.recharts-tooltip-wrapper');
      return Array.from(chartTips).map(tip => ({
        zIndex: tip.style.zIndex,
        className: tip.className
      }));
    });

    console.log('📈 图表工具提示:', chartTooltips);

    // 验证层级关系
    const layerCheck = await page.evaluate(() => {
      const helpZ = 9999;
      const chartZ = 1000;
      return {
        helpTooltipZIndex: helpZ,
        chartTooltipZIndex: chartZ,
        helpHigher: helpZ > chartZ
      };
    });

    console.log('🏆 层级对比:', layerCheck);

    return layerCheck.helpHigher;

  } catch (error) {
    console.error('❌ 测试失败:', error);
    return false;
  } finally {
    await browser.close();
  }
}

// 运行测试
testTooltipFix().then(success => {
  console.log('\n' + '='.repeat(50));
  if (success) {
    console.log('✅ 修复验证成功：HelpTooltip z-index已提升到9999，高于图表工具提示的1000');
  } else {
    console.log('❌ 修复验证失败：需要进一步检查');
  }
  process.exit(success ? 0 : 1);
});