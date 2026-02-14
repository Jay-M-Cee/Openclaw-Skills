#!/usr/bin/env node
/**
 * WebFetch MD CLI - 命令行工具
 */

const { fetchAsMarkdown } = require('./index');

async function main() {
  const url = process.argv[2];
  const outputFlag = process.argv.indexOf('-o');
  const outputPath = outputFlag > -1 ? process.argv[outputFlag + 1] : null;
  
  if (!url || url.startsWith('-')) {
    console.log('用法: npx webfetch-md <url> [-o output.md]');
    console.log('示例: npx webfetch-md https://example.com -o article.md');
    process.exit(1);
  }
  
  try {
    console.log(`🚀 正在抓取: ${url}`);
    const result = await fetchAsMarkdown(url);
    
    if (result.success) {
      console.log(`✅ 抓取成功！`);
      console.log(`📄 标题: ${result.title || '无标题'}`);
      console.log(`🖼️ 图片数: ${result.images.length}`);
      console.log(`📝 内容长度: ${result.markdown.length} 字符`);
      
      if (outputPath) {
        const fs = require('fs');
        fs.writeFileSync(outputPath, result.markdown, 'utf-8');
        console.log(`💾 已保存到: ${outputPath}`);
      } else {
        console.log('\n--- Markdown 内容 ---\n');
        console.log(result.markdown);
      }
    } else {
      console.error('❌ 抓取失败:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
