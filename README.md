# 拾幕工作室

我们运营「抱抱日常 AIGC」账号，创作二次元女抱女短视频，分享温柔日常。

网站：<https://shimustudio.github.io/>

<img src="branding/studio-logo-v1.png" width="180" alt="拾幕工作室二次元女抱女 Logo">

## 本地开发

使用 Node.js 24 和 npm：

```sh
npm ci
npm run dev
```

## 构建与发布

```sh
npm run build
npm run preview
```

Vite 构建产物位于 `dist/`，可直接作为纯静态网站部署。发布时在 [部署工作流](https://github.com/ShiMuStudio/ShiMuStudio.github.io/actions/workflows/pages.yml) 中选择 `main`，手动运行。Push 不会自动发布。

## 品牌素材

[Logo 原图](branding/studio-logo-v1.png) · [生成 prompt](branding/studio-logo-v1.prompt.txt) · [品牌清单](branding/manifest.json)
