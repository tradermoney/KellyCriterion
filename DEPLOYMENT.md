# GitHub Pages 部署指南

本项目已配置为支持 GitHub Pages 部署。以下是部署步骤和配置说明。

## 🚀 自动部署

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

### 2. 推送代码触发部署

```bash
git add .
git commit -m "配置 GitHub Pages 部署"
git push origin main
```

推送后，GitHub Actions 会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

### 3. 访问你的网站

部署完成后，你的网站将在以下地址可用：
```
https://你的用户名.github.io/KellyCriterion/
```

## 🔧 手动部署

如果需要手动部署，可以使用以下命令：

```bash
# 构建生产版本
npm run build:github

# 预览 GitHub Pages 版本
npm run preview:github
```

## 📁 项目结构

```
├── .github/workflows/deploy.yml  # GitHub Actions 工作流
├── public/404.html              # SPA 路由处理
├── vite.config.ts               # Vite 配置（包含 base 路径）
└── index.html                   # 主页面（包含 SPA 路由脚本）
```

## ⚙️ 配置说明

### Vite 配置

```typescript
export default defineConfig({
  // GitHub Pages 配置
  base: process.env.NODE_ENV === 'production' ? '/KellyCriterion/' : '/',
  // ... 其他配置
})
```

### 404.html 处理

GitHub Pages 不支持客户端路由，因此需要 `404.html` 文件来处理 SPA 路由：

- 当用户访问不存在的路径时，自动重定向到主页
- 保持 URL 结构，确保 SPA 路由正常工作

### 环境变量

- **开发环境**: `base: '/'` - 使用根路径
- **生产环境**: `base: '/KellyCriterion/'` - 使用仓库名作为子路径

## 🐛 常见问题

### 1. 资源加载失败

确保 `vite.config.ts` 中的 `base` 路径正确：
```typescript
base: process.env.NODE_ENV === 'production' ? '/KellyCriterion/' : '/'
```

### 2. 路由不工作

检查 `public/404.html` 文件是否存在，并且包含正确的重定向脚本。

### 3. 构建失败

确保所有依赖都已安装：
```bash
npm ci
```

## 🔄 更新部署

每次推送代码到 `main` 分支时，GitHub Actions 会自动重新部署。你也可以手动触发部署：

1. 进入 GitHub 仓库的 **Actions** 标签
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow**

## 📝 注意事项

- 确保仓库是公开的，或者你有 GitHub Pro 账户
- 首次部署可能需要几分钟时间
- 如果使用自定义域名，请在 `.github/workflows/deploy.yml` 中配置 `cname` 参数

