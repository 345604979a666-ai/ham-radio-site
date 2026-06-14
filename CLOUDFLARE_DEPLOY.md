# Cloudflare Pages 部署指南

## 方法一：Git 自动部署（推荐）

每次 push 代码自动构建部署，适合长期维护。

### 步骤

#### 1. 创建 GitHub 仓库

```bash
# 在项目目录执行
git init
git add .
git commit -m "Initial commit"
git branch -M main

# 在 GitHub 创建仓库后，连接并推送
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

#### 2. 在 Cloudflare Dashboard 配置

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单 → **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Pages** 标签 → **Connect to Git**
5. 选择你的 GitHub 仓库 → **Begin setup**

#### 3. 构建设置

| 配置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Framework preset | 选择 **VitePress** 或留空 |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Node Version | `20` |

> ⚠️ **注意**：构建命令必须是 `npm run docs:build`（不是 `npm run build`），输出目录是 `docs/.vitepress/dist`（不是 `.vitepress/dist`）。citeweb_search:21#5

4. 点击 **Save and Deploy**
5. 等待构建完成，获得 `xxx.pages.dev` 域名

#### 4. 绑定自定义域名（可选）

1. 在 Pages 项目 → **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入你的域名（如 `hamradio.yourdomain.com`）
4. 按提示添加 DNS 记录
5. Cloudflare 自动提供 SSL 证书

---

## 方法二：CLI 手动部署（快速测试）

不需要 Git 仓库，直接上传构建产物。

### 步骤

#### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

#### 2. 登录 Cloudflare

```bash
wrangler login
# 浏览器会打开授权页面，点击允许
```

#### 3. 本地构建

```bash
cd ham-radio-site
npm install
npm run docs:build
```

#### 4. 部署到 Pages

```bash
# 直接部署（创建新项目或更新现有项目）
npx wrangler pages deploy docs/.vitepress/dist --project-name=ham-radio-site

# 或使用 package.json 中的脚本
npm run deploy
```

5. 获得部署 URL：`https://ham-radio-site.pages.dev`

---

## 方法三：GitHub Actions 自动部署

在 GitHub 仓库添加自动部署工作流。

### 创建 `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run docs:build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: ham-radio-site
          directory: docs/.vitepress/dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### 配置 Secrets

1. 在 Cloudflare Dashboard → **My Profile** → **API Tokens**
2. 创建 Token：模板选择 **Cloudflare Pages**
3. 复制 Token
4. 在 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
5. 添加：`CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`

---

## 常见问题

### Q: 构建失败，提示 "Missing script: build"

**原因**：Cloudflare Pages 默认使用 `npm run build`，但 VitePress 的构建命令是 `npm run docs:build`。citeweb_search:21#5

**解决**：在构建设置中手动改为 `npm run docs:build`。

### Q: 部署后页面空白或 404

**原因**：输出目录配置错误。

**解决**：确保 Build output directory 是 `docs/.vitepress/dist`。

### Q: 如何启用中文搜索？

VitePress 内置搜索支持中文，无需额外配置。

### Q: 如何加速国内访问？

Cloudflare Pages 自带全球 CDN，国内访问速度一般。如需优化：
- 绑定自定义域名并开启 Cloudflare 中国网络（企业版）
- 或使用 Vercel + 国内 CDN 回源

### Q: 免费额度限制？

| 项目 | 免费额度 |
|------|---------|
| 构建次数 | 500次/月 |
| 构建时间 | 20分钟/次 |
| 带宽 | 无限 |
| 请求数 | 无限 |
| 自定义域名 | 支持 |

---

## 参考文档

- [Cloudflare Pages 官方文档](https://developers.cloudflare.com/pages/)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)citeweb_search:21#2
- [Cloudflare Pages + VitePress 官方教程](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/)citeweb_search:21#0
