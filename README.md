# 拾幕工作室 · GitHub Pages

拾幕工作室的公开网站发布文件。二次元女抱女短视频工作室，《抱抱日常》筹备中。

网站已上线：<https://shimustudio.github.io/>

本仓库默认分支为 `main`，包含网页发布文件、logo 与生成 prompt、品牌清单和手动部署配置。网站的构建工具与内部源码资料保留在私有项目中。

Logo 和原始生成 prompt 都直接保存在本项目的 `branding/` 目录：

- [studio-logo-v1.png](branding/studio-logo-v1.png)
- [studio-logo-v1.prompt.txt](branding/studio-logo-v1.prompt.txt)

品牌清单记录图片与 prompt 的路径和 SHA256。[branding-v1 Release](https://github.com/ShiMuStudio/ShiMuStudio.github.io/releases/tag/branding-v1) 也保留图片附件；当前工作流从 Release 取图并验证哈希。

<img src="branding/studio-logo-v1.png" width="180" alt="拾幕工作室二次元女抱女 Logo">

2026-10-10 的 [Pages 部署记录](https://github.com/ShiMuStudio/ShiMuStudio.github.io/actions/runs/38055776955) 为 Success，部署版本为 `beaeeb87145477a726534237cb69315f10864276`。已验证首页、CSS 和 logo 返回 HTTP 200，内容与该版本一致。

需要更新网站时，更新 `site/` 文件并同步品牌版本，再由项目负责人手动触发 `Deploy website to GitHub Pages`。Push 不会自动发布。
