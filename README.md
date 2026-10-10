# 拾幕工作室 · GitHub Pages

拾幕工作室的公开网站。我们运营「抱抱日常 AIGC」账号，创作二次元女抱女短视频，分享温柔日常。

网站已上线：<https://shimustudio.github.io/>

本仓库默认分支为 `main`，包含网页源码、Vite 构建配置、Logo 与生成 prompt、品牌清单和手动部署配置。页面使用 HTML/CSS，Vite 负责开发预览与构建；最终部署 `dist/` 中的纯静态文件，运行时无需 Node.js 服务。工作室内部资料保留在私有项目中。

Logo 和原始生成 prompt 都直接保存在本项目的 `branding/` 目录：

- [studio-logo-v1.png](branding/studio-logo-v1.png)
- [studio-logo-v1.prompt.txt](branding/studio-logo-v1.prompt.txt)

品牌清单记录图片与 prompt 的路径和 SHA256。构建读取清单中的 `repository_path` 并校验 Logo 哈希；[branding-v1 Release](https://github.com/ShiMuStudio/ShiMuStudio.github.io/releases/tag/branding-v1) 也保留图片附件。

<img src="branding/studio-logo-v1.png" width="180" alt="拾幕工作室二次元女抱女 Logo">

2026-10-10 的 [Pages 部署记录](https://github.com/ShiMuStudio/ShiMuStudio.github.io/actions/runs/38055776955) 为 Success，部署版本为 `beaeeb87145477a726534237cb69315f10864276`。已验证首页、CSS 和 logo 返回 HTTP 200，内容与该版本一致。

## 本地开发与构建

使用 Node.js 24 和 npm，在仓库根目录执行：

```sh
npm ci
npm run dev
```

`npm run dev` 先校验仓库中的 Logo 并准备静态资源，再启动 Vite。

```sh
npm run build
npm run preview
```

`npm run build` 根据 `branding/manifest.json` 校验 Logo 的 SHA256，将其复制到 `site/public/assets/`，再把 `site/` 构建为 `dist/`。`npm run preview` 用于本地检查构建结果。源码位于 `site/index.html` 和 `site/styles.css`，原样复制的静态文件位于 `site/public/`。生成的资源副本、构建产物和依赖均不进入 Git；品牌原图与 prompt 保存在 `branding/` 中。

## 部署

需要更新网站时，更新 `site/` 文件并同步品牌版本，再由项目负责人手动触发 `Deploy website to GitHub Pages`。工作流执行 `npm ci` 和 `npm run build`，最后只上传 `dist/`。Push 不会自动发布。
