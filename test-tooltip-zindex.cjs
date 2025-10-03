const puppeteer = require('puppeteer');

async function testTooltipZIndex() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    devtools: false
  });
  const page = await browser.newPage();

  try {
    console.log('🚀 测试HelpTooltip与图表工具提示的层级关系...');

    // 访问应用
    await page.goto('http://localhost:55289/', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('📊 第一步：执行仿真生成图表数据...');

    // 查找开始仿真按钮
    const buttons = await page.$$('button');
    let startButton = null;
    for (let button of buttons) {
      const text = await button.evaluate(el => el.textContent);
      if (text && text.includes('开始仿真')) {
        startButton = button;
        break;
      }
    }

    if (startButton) {
      await startButton.click();
      console.log('⏳ 等待仿真完成...');
      await new Promise(resolve => setTimeout(resolve, 8000));
    } else {
      console.log('⚠️ 未找到开始仿真按钮，继续测试...');
    }

    console.log('🔍 第二步：测试图表工具提示与HelpTooltip层级...');

    // 测试1：检查HelpTooltip的z-index值
    const helpTooltipZIndex = await page.evaluate(() => {
      const tooltip = document.querySelector('.z-50');
      const computedStyle = tooltip ? window.getComputedStyle(tooltip) : null;
      return {
        found: !!tooltip,
        zIndex: computedStyle ? computedStyle.zIndex : '未找到',
        className: tooltip ? tooltip.className : '无'
      };
    });
    console.log('📋 HelpTooltip z-index检测:', helpTooltipZIndex);

    // 测试2：检查图表工具提示的z-index值
    const chartTooltipZIndex = await page.evaluate(() => {
      const chartTooltips = document.querySelectorAll('[style*="z-index: 1000"], .chartTooltip');
      const results = [];
      chartTooltips.forEach((tooltip, index) => {
        const style = window.getComputedStyle(tooltip);
        results.push({
          index,
          zIndex: style.zIndex,
          className: tooltip.className,
          tagName: tooltip.tagName
        });
      });
      return results;
    });
    console.log('📊 图表工具提示 z-index检测:', chartTooltipZIndex);

    // 测试3：模拟鼠标悬停在图表上
    console.log('🖱️ 第三步：模拟图表交互...');

    // 查找图表区域
    const charts = await page.$$('.chartContainer');
    console.log(`📈 找到 ${charts.length} 个图表容器`);

    if (charts.length > 0) {
      // 悬停在第一个图表上
      const firstChart = charts[0];
      const chartBox = await firstChart.boundingBox();

      if (chartBox) {
        console.log('🎯 悬停在图表上...');
        await page.mouse.move(
          chartBox.x + chartBox.width / 2,
          chartBox.y + chartBox.height / 2
        );
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 同时显示HelpTooltip
        console.log('❓ 显示HelpTooltip...');

        // 查找问号按钮
        const helpButtons = await page.$$('button:has-text("?")');
        console.log(`❓ 找到 ${helpButtons.length} 个帮助按钮`);

        if (helpButtons.length > 0) {
          // 悬停在第一个帮助按钮上
          await helpButtons[0].hover();
          await new Promise(resolve => setTimeout(resolve, 2000));

          // 截图记录当前状态
          await page.screenshot({
            path: 'tooltip-zindex-test.png',
            fullPage: true
          });
          console.log('📸 已截图保存为 tooltip-zindex-test.png');

          // 测试4：检查层级关系
          console.log('🔍 第四步：分析层级关系...');

          const layerAnalysis = await page.evaluate(() => {
            const helpTooltip = document.querySelector('.z-50');
            const chartTooltips = document.querySelectorAll('[style*="z-index: 1000"], .chartTooltip');

            return {
              helpTooltip: {
                found: !!helpTooltip,
                zIndex: helpTooltip ? window.getComputedStyle(helpTooltip).zIndex : 'none'
              },
              chartTooltips: Array.from(chartTooltips).map(t => ({
                zIndex: window.getComputedStyle(t).zIndex,
                className: t.className
              }))
            };
          });

          console.log('📊 层级分析结果:', layerAnalysis);

          // 测试5：验证是否存在遮挡
          const hasOverlap = await page.evaluate(() => {
            const helpTooltip = document.querySelector('.z-50');
            const chartTooltips = document.querySelectorAll('[style*="z-index: 1000"], .chartTooltip');

            if (!helpTooltip || chartTooltips.length === 0) return false;

            const helpRect = helpTooltip.getBoundingClientRect();

            for (let chartTooltip of chartTooltips) {
              const chartRect = chartTooltip.getBoundingClientRect();

              // 检查是否重叠
              const overlap = !(helpRect.right < chartRect.left ||
                               helpRect.left > chartRect.right ||
                               helpRect.bottom < chartRect.top ||
                               helpRect.top > chartRect.bottom);

              if (overlap) {
                return {
                  overlap: true,
                  helpZIndex: window.getComputedStyle(helpTooltip).zIndex,
                  chartZIndex: window.getComputedStyle(chartTooltip).zIndex,
                  helpPosition: { top: helpRect.top, left: helpRect.left },
                  chartPosition: { top: chartRect.top, left: chartRect.left }
                };
              }
            }

            return { overlap: false };
          });

          console.log('🔄 重叠检测结果:', hasOverlap);

          if (hasOverlap.overlap) {
            console.log('❌ 发现遮挡问题！');
            console.log('HelpTooltip z-index:', hasOverlap.helpZIndex);
            console.log('ChartTooltip z-index:', hasOverlap.chartZIndex);
            return false;
          } else {
            console.log('✅ 未发现遮挡问题');
            return true;
          }
        }
      }
    }

    console.log('⚠️ 测试条件不足，无法完成完整检测');
    return false;

  } catch (error) {
    console.error('❌ 测试失败:', error);
    return false;
  } finally {
    await browser.close();
  }
}

// 运行测试
testTooltipZIndex().then(success => {
  console.log('\n' + '='.repeat(50));
  if (success) {
    console.log('✅ 测试通过：未发现HelpTooltip遮挡问题');
  } else {
    console.log('❌ 测试失败：发现HelpTooltip被遮挡或测试异常');
  }
  process.exit(success ? 0 : 1);
});