# 企业合规门户网 - 需求拆解文档

## 产品概述

- **产品类型**: 企业合规知识库/文档门户
- **场景类型**: <scene_type>prototype-app</scene_type>
- **目标用户**: 企业员工、合规管理人员、创业者、法务/财务/数据团队
- **核心价值**: 提供结构化、易检索的三大核心业务合规指南，降低企业合规风险，提升员工查阅效率
- **界面语言**: 中文
- **主题偏好**: 浅色
- **导航模式**: 路径导航
- **导航布局**: Topbar（顶部全局导航）

---

## 页面结构总览

| 页面名称 | 文件名 | 路由 | 页面类型 | 入口来源 |
|---------|-------|------|---------|---------|
| 门户首页 | `HomePage.tsx` | `/` | 一级 | 导航 |
| 合规文档中心 | `DocCenterPage.tsx` | `/docs` | 一级 | 导航 |

> **页面类型说明**：
> - **一级页面**：出现在导航中，用户可直接访问
> - **二级页面**：不在导航中，从一级页面跳转进入（本需求内容切换通过左侧组件状态/路由参数实现，无需拆分二级页面）

---

## 导航配置

- **导航布局**: Topbar（顶部固定）
- **导航项**（仅一级页面）:
  | 导航文字 | 路由 | 图标(可选) |
  |---------|------|-----------|
  | 首页 | `/` | Home |
  | 合规文档 | `/docs` | BookOpen |

---

## 功能列表

- **页面/区块**: 门户首页 (`HomePage.tsx`)
  - **页面目标**: 展示门户定位，提供三大合规业务的快速入口与全局检索
  - **功能点**:
    - **门户 Hero 区**: 展示平台名称、核心价值主张、全局搜索框（支持按关键词检索合规条款）
    - **业务入口卡片**: 展示三大业务模块（OPC一人公司、企业数字员工、数据分析业务），点击跳转至 `/docs` 并自动选中对应业务
    - **快速指引区**: 展示高频合规问题/常用自查清单链接（如年度日历、补贴申请指南、合规打分表）
    - **页脚信息**: 版本信息、免责声明、联系方式

- **页面/区块**: 合规文档中心 (`DocCenterPage.tsx`)
  - **页面目标**: 提供沉浸式文档阅读体验，支持多业务切换与章节快速定位
  - **功能点**:
    - **左侧业务切换栏**: 位于左侧导航顶部，提供三个选项（OPC一人公司 | 企业数字员工 | 数据分析业务），点击切换当前手册并刷新下方目录树
    - **左侧章节导航树**: 根据当前选中业务动态渲染章节目录（支持一级/二级折叠展开、当前章节高亮、点击平滑滚动至对应内容）
    - **右侧 Markdown 内容区**: 渲染完整合规手册内容，支持表格、列表、代码块、加粗等富文本样式，保持专业排版
    - **章节锚点与定位**: 右侧内容区滚动时，左侧导航树自动高亮对应章节；支持点击目录项快速定位
    - **上一篇/下一篇导航**: 内容区底部提供当前章节的上下篇跳转按钮，支持连续阅读
    - **返回顶部**: 固定悬浮按钮，点击快速回到内容区顶部

---

## 数据共享配置

| 存储键名 | 数据说明 | 使用页面 |
|---------|---------|---------|
| `__global_compliance_currentBiz` | 当前选中的业务类型标识，类型为 `TBizType` | 门户首页、合规文档中心 |
| `__global_compliance_toc` | 当前业务对应的目录树数据，类型为 `ITocItem[]` | 合规文档中心 |

```ts
// 业务类型枚举
type TBizType = 'opc' | 'digital-employee' | 'data-analysis';

// 目录树节点接口
interface ITocItem {
  /** 章节唯一标识 */
  id: string;
  /** 章节标题 */
  title: string;
  /** 子章节列表（支持二级嵌套） */
  children?: ITocItem[];
  /** 对应内容区的锚点 ID */
  anchor: string;
}

// 业务配置接口
interface IBizConfig {
  bizType: TBizType;
  name: string;
  description: string;
  toc: ITocItem[];
}

-------

# UI 设计指南

> **场景类型**: <scene_type>prototype-app</scene_type>（应用架构设计）
> **确认检查**: 本指南适用于可交互的企业合规门户/文档知识库。核心包含门户首页与沉浸式文档中心，采用 Topbar + Sidebar 导航架构。

> ℹ️ Section 1-2 为设计意图与决策上下文。Code agent 实现时以 Section 3 及之后的具体参数为准。

## 1. Design Archetype (设计原型)

### 1.1 内容理解
- **目标用户**: 企业员工、合规管理人员、创业者、法务/财务/数据团队
- **核心目的**: 提供结构化、易检索的三大核心业务合规指南，降低企业合规风险，提升查阅效率
- **期望情绪**: 信任、专注、清晰、专业权威
- **需避免的感受**: 混乱、不专业、廉价感、阅读疲劳、信息过载

### 1.2 设计语言
- **Aesthetic Direction**: 理性、克制、结构化。参考现代企业级文档站（如 Stripe/Linear Docs），但针对合规严肃场景进行降噪处理，强调信息层级与阅读舒适度。
- **Visual Signature**: 清晰的网格分割线、高对比度标题、充裕的阅读留白、左侧固定导航提供明确上下文锚点。
- **Emotional Tone**: 专业严谨（通过冷色调与严格排版建立信任） + 高效清晰（通过明确的视觉层级降低认知负荷）
- **Design Style**: **Editorial 经典排版（理性变体）** — 合规内容需要权威感与易读性，通过大字重对比、严格的层级划分和充裕留白，营造专业出版物的严谨氛围，辅以现代 SaaS 的交互反馈。
- **Application Type**: 企业级文档门户/知识库 (MPA/SPA 混合架构)

## 2. Design Principles (设计理念)
1. **信任优先**：色彩极度克制，避免过度装饰。用清晰的排版、严格的网格和稳定的结构传递专业与权威感。
2. **内容聚焦**：文档阅读区彻底去除干扰元素。行长严格控制在舒适范围（60-75字符），左侧导航提供永不迷失的上下文。
3. **结构可视化**：通过细边框、微背景色块和字重差异，清晰区分「业务切换」、「章节层级」与「正文内容」，让信息架构一目了然。
4. **高效检索**：全局搜索与左侧目录树并重。支持关键词快速定位与平滑锚点跳转，缩短用户寻找答案的路径。

## 3. Color System (色彩系统)

> 基于内容理解推导配色方案，确保整体协调。
> **⚠️ App 场景配色规则**：App 子场景**禁止使用**共用预设配色方案库中的 7 个方案。本方案根据产品定位、品牌特征和目标用户自主设计完整配色体系。

**配色设计理由**：合规门户需要建立高度的信任感与专业度。选择低饱和度的冷灰蓝作为基底，搭配沉稳的专业深蓝作为主交互色。整体色彩偏向冷静、理性，避免暖色或高饱和色带来的情绪干扰，确保长时间阅读的视觉舒适度。

### 3.1 主题颜色

> **App 场景约束**：`primary` 与 `accent` 严格遵循「主交互行动 vs 状态反馈」的语义映射。

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|-----|---------|----------------|--------|---------|
| bg | `--background` | `bg-background` | `hsl(215 20% 97%)` | 极浅冷灰，降低纯白刺眼感，作为页面底色 |
| surface | `--card` | `bg-card` | `hsl(0 0% 100%)` | 纯白，用于卡片、Topbar、内容容器 |
| text | `--foreground` | `text-foreground` | `hsl(215 25% 15%)` | 深灰蓝，正文主色，保证高可读性 |
| textMuted | `--muted-foreground` | `text-muted-foreground` | `hsl(215 15% 50%)` | 中灰，用于次要说明、占位符、元数据 |
| primary | `--primary` | `bg-primary` | `hsl(215 65% 45%)` | 专业深蓝，用于主按钮、链接、激活态 |
| primary-foreground | `--primary-foreground` | `text-primary-foreground` | `hsl(0 0% 100%)` | 纯白，主交互区域文字 |
| accent | `--accent` | `bg-accent` | `hsl(215 30% 94%)` | 浅蓝灰，用于 hover、侧边栏高亮、骨架屏 |
| accent-foreground | `--accent-foreground` | `text-accent-foreground` | `hsl(215 65% 45%)` | 同 primary 色，用于 accent 背景上的文字 |
| border | `--border` | `border-border` | `hsl(215 15% 88%)` | 浅灰蓝，用于分割线、卡片边框、输入框 |

> **Color Token 语义速查（供 code agent 参考）**:
> - `primary` → 主行动：按钮填充、激活态高亮、关键操作 CTA、链接色
> - `accent` → 状态反馈：Ghost/Outline 按钮 hover、DropdownMenu focus、Toggle 激活、Sidebar 项 hover/激活背景
> - `muted` → 静态非交互：禁用态、次级说明、辅助标签背景

### 3.2 Sidebar 颜色（仅当使用 Sidebar 导航时定义）

> **定义时机**：文档中心使用左侧固定导航，必须定义此章节

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|-----|---------|----------------|--------|---------|
| sidebar | `--sidebar` | `bg-sidebar` | `hsl(0 0% 100%)` | 纯白背景，与 Topbar 统一，保持干净 |
| sidebar-foreground | `--sidebar-foreground` | `text-sidebar-foreground` | `hsl(215 25% 15%)` | 同 foreground，保证对比度 |
| sidebar-primary | `--sidebar-primary` | `bg-sidebar-primary` | `hsl(215 30% 94%)` | 激活态背景（同 accent） |
| sidebar-primary-foreground | `--sidebar-primary-foreground` | `text-sidebar-primary-foreground` | `hsl(215 65% 45%)` | 激活态文字（同 primary） |
| sidebar-accent | `--sidebar-accent` | `bg-sidebar-accent` | `hsl(215 20% 90%)` | Hover 态背景，比激活态略深 |
| sidebar-accent-foreground | `--sidebar-accent-foreground` | `text-sidebar-accent-foreground` | `hsl(215 65% 45%)` | Hover 态文字 |
| sidebar-border | `--sidebar-border` | `border-sidebar-border` | `hsl(215 15% 88%)` | 右侧分割线，与 border 一致 |
| sidebar-ring | `--sidebar-ring` | `ring-sidebar-ring` | `hsl(215 65% 45%)` | 键盘导航聚焦环 |

### 3.2.1 Topbar 颜色（仅当使用 Topbar 导航时参考）

**正确做法**：
- Topbar 背景使用 `surface` 色 `hsl(0 0% 100%)`，底部添加 `border-b border-border` 区分内容区。
- 文字色使用 `foreground` 或 `muted-foreground`，激活态使用 `primary`。

### 3.3 语义颜色（可选）

> 仅在需要状态反馈时定义（如合规状态标签、风险等级提示）

| 用途 | HSL 值 | 衍生建议 |
|-----|--------|---------|
| 成功/合规通过 | `hsl(142 60% 40%)` | 边框中饱和、背景低饱和高明度、文字深色 |
| 警告/需关注 | `hsl(38 85% 45%)` | 限大字号或使用深色变体保证对比度 |
| 错误/违规风险 | `hsl(0 72% 51%)` | 用于风险提示、未达标项高亮 |

## 4. Typography (字体排版)
- **Heading**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif`
- **Body**: 同上（系统无衬线字体栈，确保跨终端一致性与渲染性能）
- **数字/代码**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`（用于表格数据、条款编号、代码块）
- **字体导入**: 使用系统字体栈，禁止引入 Google Fonts

## 5. Global Layout Structure (全局布局结构)

### 5.1 Page Content Zones (页面区块配置)

> ⚠️ **全局统一规则**：以下参数为所有页面共享的**唯一**内容区定义。

**Standard Content Zone（全页面统一）**:
- **Maximum Width**: `max-w-6xl` (1152px) — 首页与文档容器基准宽度
- **Padding**: `px-4 md:px-6 lg:px-8` — 响应式水平内边距
- **Alignment**: `mx-auto` — 居中对齐
- **Vertical Spacing**: `gap-6` (卡片网格) / `space-y-10` (章节区块) — 保持 8px 倍数一致性

**文档中心特殊布局**（Topbar 下方）:
- **左侧 Sidebar**: 固定宽度 `w-72` (288px)，高度 `calc(100vh - 64px)`，内部可滚动
- **右侧内容区**: `flex-1`，内部文档流限制为 `max-w-4xl mx-auto`，保证最佳阅读行长
- **分隔**: 右侧内容区左侧添加 `border-l border-sidebar-border`

**宽内容溢出策略**：当文档内包含宽表格或复杂图表时，外层包裹 `overflow-x-auto`，禁止放大容器 `max-w`。

**Hero/Banner 区块**（如适用）:
- **Width**: `w-full`（仅背景可全宽）
- **Padding**: `0`
- **Background**: `bg-gradient-to-b from-surface to-bg` (极浅渐变，打破纯平感)

## 6. Visual Effects & Motion (视觉效果与动效)

- **Header/Hero 视觉方案**: 首页 Hero 区使用 `bg-gradient-to-b from-surface to-bg` 向下延伸，内部内容 `max-w-6xl mx-auto`。文档中心 Topbar 为纯白+底部细边框。
- **装饰手法**: 无冗余装饰。依靠严格的网格线、字重对比和微背景色块构建视觉层次。
- **圆角**: `rounded-md` (6px) 全局统一（按钮、输入框、卡片）；业务切换 Tab 使用 `rounded-full` 胶囊样式。严谨克制，不宜过大。
- **阴影**: `shadow-sm` 仅用于首页业务入口卡片；文档区主要依靠 `border` 分割，避免阴影干扰阅读。
- **复杂背景文字处理**:
  - 渐变背景: 文字使用 `text-foreground`，对比度 ≥ 7:1
  - 有色背景: 明确指定 HSL 值，禁止模糊描述

### 6.1 动效意图

> 本节只声明动效意图（what / why），不提供实现细节（how）。

- **整体动效风格**: 克制、短促、以 opacity + 微位移为主。服务于信息切换，不抢夺内容注意力。
- **页面入场**: 首页卡片与文档内容区以微微上移淡入（约 200ms），营造平稳加载感。
- **滚动揭示**: 文档目录树点击后，右侧内容区平滑滚动至锚点（`scroll-behavior: smooth`）。
- **列表项动效 · 变更模式**: 切换业务类型时，左侧目录树采用「整批替换」模式，右侧内容区淡入刷新。
- **关键交互微动效**: 侧边栏目录项 hover 时背景色平滑过渡；按钮点击时轻微缩放反馈（`active:scale-[0.98]`）。

## 7. Components (组件指南)

> **必须引用 Color System 中的颜色角色**（如 `primary`、`accent`、`border`）

### Buttons
- **Primary**: 背景 `bg-primary` / 文字 `text-primary-foreground` / Hover `bg-primary/90` / Active `bg-primary/80` / Disabled `bg-primary/40 cursor-not-allowed`
- **Secondary**: 背景 `bg-card` / 边框 `border border-border` / 文字 `text-foreground` / Hover `bg-accent text-accent-foreground`
- **Ghost**: 背景 透明 / 文字 `text-foreground` / Hover `bg-accent text-accent-foreground`
- **Outline**: 背景 透明 / 边框 `border-border` / 文字 `text-foreground` / Hover `bg-accent`

### Form Elements (Search Input)
- **输入框**: 背景 `bg-card` / 边框 `border border-border` / Focus `ring-2 ring-primary/20 border-primary` / Placeholder `text-muted-foreground`
- **圆角**: `rounded-lg` (搜索框略大以突出)

### Cards (首页业务入口)
- 背景 `bg-card` / 边框 `border border-border` / 阴影 `shadow-sm` / 圆角 `rounded-lg` / 内边距 `p-6`
- Hover: 边框色变为 `border-primary/50`，卡片微上移 `translate-y-[-2px]`，阴影加深至 `shadow-md`
- 内容: 标题 `text-lg font-semibold`，描述 `text-muted-foreground text-sm mt-2`

### Sidebar Navigation (文档中心)
- **业务切换 Tab**: 顶部固定，Pill 样式 `rounded-full px-4 py-1.5 text-sm font-medium`。默认 `text-muted-foreground hover:bg-accent`，激活态 `bg-primary text-primary-foreground shadow-sm`
- **章节树节点**: 缩进列表 `pl-4`。默认 `text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50`，激活态 `text-primary bg-sidebar-primary border-l-2 border-primary` (左侧 2px 指示条)
- **折叠状态**: 二级章节默认展开，点击可折叠（箭头图标旋转 90°）

### Content Typography (文档正文)
- **H2**: `text-2xl font-bold text-foreground mt-12 mb-4 pb-2 border-b border-border`
- **H3**: `text-xl font-semibold text-foreground mt-8 mb-3`
- **P**: `text-base leading-relaxed text-foreground mb-4`
- **表格**: 全宽 `w-full`，表头 `bg-muted/30 text-sm font-medium`，单元格 `text-sm border-b border-border p-3`，斑马纹可选
- **引用/提示块**: 左侧 4px `border-l-4 border-accent` + 背景 `bg-accent/30` + 内边距 `p-4`

### Menu / Dropdown
- **菜单项 Focus/Hover**: `bg-accent text-accent-foreground rounded-md`

### Skeleton
- **加载占位**: `bg-muted animate-pulse rounded-md`

## 8. Flexibility Note (灵活性说明)

> **一致性优先原则**：多页应用中，所有页面必须使用相同的核心参数（最大宽度、容器边距、圆角、阴影等），确保整体设计语言统一。
>
> **允许的微调范围**（code agent 可自行判断）：
> - 响应式断点适配（移动端 Sidebar 折叠为 Drawer/Sheet，Topbar 保留搜索与 Logo）
> - 文档内部局部间距（如复杂表格上下可增加 `my-6`）
> - 单页组件（如 Modal 提示框）的独立样式微调
>
> **禁止的随意变更**：
> - ❌ 不同页面使用不同的最大宽度或圆角策略
> - ❌ 文档内容区取消左侧导航或改为顶部平铺导航
> - ❌ 使用高饱和度色彩或大圆角破坏专业严肃感
> - ❌ 首页与文档中心使用割裂的视觉语言

## 9. Signature & Constraints (设计签名与禁区)

### DO (视觉签名)
1. **严格的左侧锚点导航**：文档中心左侧固定 `w-72` 导航栏，业务切换 Tab + 章节树，当前章节通过左侧 2px 主色指示条高亮。
2. **克制的边框分割系统**：全局使用 `border-border` 细线划分区块，首页卡片 Hover 时边框微妙变色，营造精密感。
3. **专业深蓝主色 (`hsl(215 65% 45%)`)**：仅用于关键行动点（按钮、链接、激活态），面积 < 10%，其余空间保持低饱和冷灰。
4. **充裕的阅读留白**：文档正文限制在 `max-w-4xl`，段落间距 `mb-4`，标题上下留白充足，行长舒适。

### DON'T (禁止做法)
> 通用约束参见「通用约束」。以下为 Prototype 特有：
- ❌ 在文档内容区使用大圆角卡片包裹正文（破坏阅读连贯性）
- ❌ 使用紫色/霓虹渐变或高饱和度强调色（破坏合规场景的信任感）
- ❌ 隐藏左侧章节导航或将其改为顶部平铺（降低长文档检索效率）
- ❌ 首页 Hero 区使用全屏背景图或复杂动画（分散核心业务入口注意力）