---
name: webfetch-md
version: 1.0.1
description: 抓取网页并转换为 Markdown，保留图片链接
author: weng
metadata:
  openclaw:
    requires:
      bins: ["node"]
    tools:
      - name: webfetch-md
        description: 抓取任意网页并转换为 Markdown 格式，自动保留图片链接
        command: "node ~/.openclaw/workspace/webfetch-md/webfetch-md-tool.js --url {{url}}"
        parameters:
          url:
            type: string
            description: 要抓取的网页 URL
            required: true
---

# WebFetch MD - 网页转 Markdown

抓取任意网页，转换为干净的 Markdown 格式，保留图片链接。

## 使用方法

### 作为 OpenClaw 工具调用

```yaml
webfetch-md url="https://example.com"
```

### CLI 使用

```bash
# 基本使用
node ~/.openclaw/workspace/webfetch-md/cli.js https://example.com

# 保存到文件
node ~/.openclaw/workspace/webfetch-md/cli.js https://example.com -o output.md
```

### 作为模块使用

```javascript
const { fetchAsMarkdown } = require('./index');
const result = await fetchAsMarkdown('https://example.com');
console.log(result.markdown);
```

## 功能特点

- ✅ 抓取任意网页 HTML
- ✅ 智能提取正文内容（过滤导航、广告等）
- ✅ 保留图片链接（转换为 `![alt](url)` 格式）
- ✅ 自动转换相对路径为绝对路径
- ✅ 输出干净的 Markdown

## 依赖

- turndown: HTML to Markdown 转换
- cheerio: HTML 解析和提取
