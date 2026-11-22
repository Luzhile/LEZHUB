# LEZHUB — 片尾之后 DVD 小店

一个复古独立音像店风格的交互式电影片单网站。

## 本地开发与迭代

```bash
npm install
npm run dev
```

常用命令：
- `npm run dev`：启动本地开发服务器
- `npm run build`：打包生产版本到 `dist/`
- `npm run preview`：本地预览打包后的生产版本
- `npm run lint`：运行代码检查

## 部署到 GitHub Pages

项目已内置 `.github/workflows/deploy.yml` 与相对路径配置（`vite.config.js` 中 `base: './'`）：

1. 在 GitHub 新建一个仓库，将本文件夹内容推送到 `main` 分支：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
2. 打开仓库的 **Settings → Pages**，将 **Build and deployment → Source** 设为 **GitHub Actions**。
3. 之后每次推送到 `main` 分支，GitHub Actions 都会自动构建并发布到 GitHub Pages。
