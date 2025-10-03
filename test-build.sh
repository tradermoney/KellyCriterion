#!/bin/bash

# 测试构建脚本
echo "🧪 测试GitHub Pages构建过程..."

# 检查Node.js版本
echo "📦 Node.js版本:"
node --version

# 检查npm版本
echo "📦 npm版本:"
npm --version

# 安装依赖
echo "📦 安装依赖..."
npm ci

# 运行代码检查
echo "🔍 运行代码检查..."
npm run lint

# 构建项目
echo "🏗️ 构建项目..."
npm run build:github

# 检查构建产物
echo "📁 检查构建产物:"
ls -la dist/

# 检查关键文件
if [ -f "dist/index.html" ]; then
    echo "✅ index.html 存在"
else
    echo "❌ index.html 不存在"
    exit 1
fi

if [ -d "dist/assets" ]; then
    echo "✅ assets 目录存在"
    echo "📁 assets 内容:"
    ls -la dist/assets/
else
    echo "❌ assets 目录不存在"
    exit 1
fi

echo "🎉 构建测试完成！"
