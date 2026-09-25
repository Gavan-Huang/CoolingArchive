# Cooling Archive / 冷却档案馆 v2

这一版把网站从“历史介绍页”升级为“知识档案馆”原型。

## 新增
- Ask the Archive：本地问题→档案节点匹配原型；正式版可接 RAG。
- Knowledge Architecture：History / Engineering / Source / Claim Graph 四层数据结构。
- archive.json：初始知识节点与证据等级模型。
- ai-archive.js：本地原型检索逻辑。
- 证据链思路：结论应回溯到来源，而不是只保留 AI 生成文本。

## 下一阶段
1. 建立真实来源表：原始专利、论文、标准、博物馆档案。
2. 为每个 Claim 建立 source_id 与 confidence。
3. 将专题拆成独立 URL 页面，加入 sitemap / robots / canonical。
4. 接入向量检索或全文检索，再接 RAG。
5. 为图像加入版权状态、来源和馆藏编号。

## v3｜Cooling Lab
- 新增 Vapor Compression Lab：回路动态示意 + P-h 图 + 参数滑块 + 阶段动画。
- 灵感来自 MechSimulator 的公开交互结构；未复制其代码、界面或文字内容。
- 目前为无外部依赖的教学演示模型，参数用于展示趋势，不替代 CoolProp/REFPROP 等物性库。
- 后续建议：接入真实物性计算；增加 R-134a/R-290/R-717/R-744 的真实饱和状态数据；支持 P-h/T-s 双图；保存实验工况；导出 CSV；把每个实验与历史节点、来源和工程笔记关联。
