# Cooling Archive — GitHub Pages deployment package (v5)

这是为 GitHub Pages 整理后的完整静态站点。

## 目录结构

```text
CoolingArchive/
├── index.html
├── .nojekyll
├── README.md
└── assets/
    ├── css/style.css
    ├── js/app.js
    ├── data/archive.json
    └── images/
        ├── components/
        │   ├── compressor.png
        │   ├── condenser.png
        │   ├── expansion-valve.png
        │   └── evaporator.png
        └── ui/cooling-lab-concept.png
```

## GitHub Pages 部署

1. 将本压缩包解压。
2. 把 **CoolingArchive-v5-GitHub 文件夹里面的所有内容** 上传到 GitHub 仓库 `CoolingArchive` 的根目录。不要把外层文件夹再套一层。
3. GitHub 仓库进入 `Settings → Pages`。
4. `Source` 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/(root)`，保存。
6. 站点地址应为 `https://<username>.github.io/CoolingArchive/`。

## 路径规则

所有站内静态资源都使用 `./assets/...` 相对路径，因此兼容 GitHub Pages 的项目站点路径 `/CoolingArchive/`。不要把路径改成 `/assets/...`。

## 图片管理

- `assets/images/components/`：设备/部件技术示意图
- `assets/images/ui/`：界面概念图
- 后续建议新增 `history/`、`people/`、`patents/`、`diagrams/`、`generated/` 等目录。
- 当前组件图属于项目视觉/技术示意素材；历史档案图片应另外记录来源、版权状态与出处，不要与示意图混放。

## 本地预览

直接双击 `index.html` 即可预览主要功能。也可以在该目录启动任意静态 HTTP server。
