# 拾幕工作室 · GitHub Pages

拾幕工作室的公开网站发布文件。二次元女抱女短视频工作室，《抱抱日常》筹备中。

网站目标地址：<https://shimustudio.github.io/>

本仓库默认分支为 `main`，仅包含网页发布文件、品牌来源清单和手动部署配置。网站的构建工具与内部源码资料保留在私有项目中。

Logo 原件作为 [branding-v1 Release](https://github.com/ShiMuStudio/ShiMuStudio.github.io/releases/tag/branding-v1) 附件保存：[下载 PNG 原图](https://github.com/ShiMuStudio/ShiMuStudio.github.io/releases/download/branding-v1/studio-logo-v1.png)。工作流验证 SHA256 后加入网站；图片原件不进入 Git。

<img src="https://github.com/ShiMuStudio/ShiMuStudio.github.io/releases/download/branding-v1/studio-logo-v1.png" width="180" alt="拾幕工作室二次元女抱女 Logo">

Pages 已设置为 GitHub Actions。2026-10-10 的 [首次工作流](https://github.com/ShiMuStudio/ShiMuStudio.github.io/actions/runs/38052772795) 已成功下载并校验 logo，因当时 Pages 尚未启用而停止。现有集成重新触发 Actions 返回403，因此需要项目负责人打开 [部署工作流](https://github.com/ShiMuStudio/ShiMuStudio.github.io/actions/workflows/pages.yml)，点击 **Run workflow**，选择 `main` 分支启动部署。目标地址须经过成功部署验证后才算上线。

需要更新网站时，更新 `site/` 文件并同步品牌版本，再由项目负责人手动触发 `Deploy website to GitHub Pages`。Push 不会自动发布。
