# GitHub Pages 部署设置指南

## 自动部署配置

本项目已配置GitHub Action自动部署到GitHub Pages。每次推送到`main`或`master`分支时，会自动构建并部署项目。

## 设置步骤

### 1. 启用GitHub Pages

1. 进入你的GitHub仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

### 2. 配置仓库权限

1. 在仓库的 **Settings** 中
2. 点击 **Actions** → **General**
3. 在 **Workflow permissions** 部分选择 **Read and write permissions**
4. 勾选 **Allow GitHub Actions to create and approve pull requests**

### 3. 推送代码触发部署

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

## 部署流程

1. **构建阶段**：
   - 安装依赖 (`npm ci`)
   - 运行代码检查 (`npm run lint`)
   - 构建生产版本 (`npm run build:github`)

2. **部署阶段**：
   - 上传构建产物到GitHub Pages
   - 自动发布到 `https://yourusername.github.io/KellyCriterion/`

## 访问地址

部署成功后，你的应用将在以下地址可用：
- `https://yourusername.github.io/KellyCriterion/`

## 故障排除

### 常见问题

1. **部署失败**：
   - 检查GitHub Pages设置是否正确
   - 确保仓库权限配置正确
   - 查看Actions日志了解具体错误

2. **页面404错误**：
   - 确认base路径配置正确 (`/KellyCriterion/`)
   - 检查构建产物是否包含`index.html`

3. **资源加载失败**：
   - 检查Vite配置中的base路径
   - 确保所有静态资源路径正确

### 手动部署

如果需要手动部署：

```bash
npm run build:github
# 将 dist 目录内容上传到 GitHub Pages
```

## 环境变量

项目使用以下环境变量：
- `NODE_ENV=production`：生产环境构建
- `base=/KellyCriterion/`：GitHub Pages基础路径
