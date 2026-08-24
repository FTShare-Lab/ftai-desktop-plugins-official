# FtAi 官方插件市场 (FtAi Official Plugin Registry)

本仓库是面向 **FtAi Desktop** 与 **Claude Code** 生态的官方插件市场（Marketplace Registry），集中收录、管理并分发高品质的 AI 插件、MCP（Model Context Protocol）服务与 Agent Skills。

---

## 目录结构

```text
ftai-plugins-official/
├── .ftai-plugin/
│   └── marketplace.json      # 官方市场主清单（FtAi 格式）
├── .claude-plugin/
│   └── marketplace.json      # 兼容 Claude Code 的市场清单
├── schemas/
│   ├── marketplace.schema.json # 市场清单 JSON Schema
│   └── plugin.schema.json      # 单个插件清单 JSON Schema
├── scripts/
│   └── validate.mjs          # 市场清单与本地插件完整性校验脚本
├── plugins/                  # 内置官方精选插件目录
│   ├── notion/               # Notion 知识库与文档集成
│   ├── github/               # GitHub 仓库与研发协同
│   ├── google-drive/         # Google Drive 云端网盘与在线文档
│   ├── gitlab/               # GitLab 仓库与 CI/CD 流水线
│   ├── linear/               # Linear 敏捷项目与任务管理
│   ├── figma/                # Figma 设计系统与 Token 提取
│   ├── postgres/             # PostgreSQL 数据库管理与只读查询
│   ├── redis/                # Redis 缓存与键值调试
│   ├── docker/               # Docker 容器查看与日志排查
│   ├── playwright/           # Playwright 浏览器自动化与 E2E 验证
│   ├── context7/             # Context7 官方技术文档实时检索
│   ├── code-review/          # Code Review 自动化多维度代码审查
│   ├── frontend-design/      # Frontend Design Pro 高质感前端设计
│   ├── tavily/               # Tavily AI 实时网络搜索
│   └── exa/                  # Exa 神经网络语义搜索引擎
├── package.json
└── README.md
```

---

## 精选插件一览

### 1. 协同办公与知识库
| 插件名称 | 标识符 | 说明 | 环境变量要求 |
| :--- | :--- | :--- | :--- |
| **Notion** | `notion` | 搜索文档页面、创建与编辑笔记、查询与更新数据库结构化记录 | `NOTION_API_KEY` |
| **Google Drive** | `google-drive` | 搜索 Google Drive 云盘文件、提取 Google Docs/Sheets/Slides 内容 | `GDRIVE_CLIENT_ID`, `GDRIVE_CLIENT_SECRET` |
| **Slack** | `slack` | 团队工作区消息检索、频道历史查询与自动化通知 | `SLACK_BOT_TOKEN` |
| **Linear** | `linear` | 敏捷任务看板、Sprint Cycle 迭代管理与 Issue 跟踪 | `LINEAR_API_KEY` |

### 2. 代码协同与 DevOps
| 插件名称 | 标识符 | 说明 | 环境变量要求 |
| :--- | :--- | :--- | :--- |
| **GitHub** | `github` | 仓库管理、Issue/PR 协作、代码提交检索与审查 | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| **GitLab** | `gitlab` | 自建或官方 GitLab 仓库管理、MR 协作与 CI/CD 流水线诊断 | `GITLAB_PERSONAL_ACCESS_TOKEN`, `GITLAB_API_URL` |
| **Docker** | `docker` | 容器生命周期查看、服务日志拉取、Compose 配置生成 | 本地 Docker 运行环境 |
| **Vercel** | `vercel` | 前端云部署状态检查、构建日志分析与域名路由管理 | `VERCEL_TOKEN` |

### 3. 数据存储与缓存
| 插件名称 | 标识符 | 说明 | 环境变量要求 |
| :--- | :--- | :--- | :--- |
| **PostgreSQL** | `postgres` | 表结构检查、执行计划分析与安全分析查询 | `DATABASE_URL` |
| **Redis** | `redis` | 内存占用分析、键值类型与 TTL 调试、缓存排错 | `REDIS_URL` |
| **Supabase** | `supabase` | BaaS 数据库、身份鉴权与 Storage 存储管理 | `SUPABASE_ACCESS_TOKEN` |

### 4. 前端开发与测试
| 插件名称 | 标识符 | 说明 | 环境变量要求 |
| :--- | :--- | :--- | :--- |
| **Figma** | `figma` | 设计稿图层解析、设计 Token 提取与高保真代码还原 | `FIGMA_ACCESS_TOKEN` |
| **Playwright** | `playwright` | 端到端浏览器控制、页面点击输入、截图与错误日志捕获 | Node.js 运行环境 |
| **Frontend Design** | `frontend-design` | 语义化 Token 体系、响应式布局、严谨字阶与高质感组件 | 无 |

### 5. 搜索、文档与开发方法论
| 插件名称 | 标识符 | 说明 | 环境变量要求 |
| :--- | :--- | :--- | :--- |
| **Context7** | `context7` | 实时检索 React, Vue, Tailwind, Next.js 等数百个库最新官方文档 | `CONTEXT7_API_KEY` (可选) |
| **Tavily** | `tavily` | 专为大模型优化的高性能实时网络搜索与内容提取 | `TAVILY_API_KEY` |
| **Exa** | `exa` | 基于神经网络语义的学术文献、竞品分析与深度调研搜索 | `EXA_API_KEY` |
| **Code Review** | `code-review` | 针对 Git Diff 的系统化代码审查与架构安全审计 | 无 |
| **Superpowers** | `superpowers` | 包含 TDD、头脑风暴、子代理驱动开发与系统化调试的方法论套件 | 无 |

---

## 插件规范与结构

每个插件采用标准化目录结构：

```text
plugin-name/
├── .ftai-plugin/
│   └── plugin.json      # 插件核心元数据（必需）
├── .mcp.json            # MCP Server 配置声明（可选）
├── skills/              # Agent Skill 技能提示词文件（可选）
│   └── <skill-name>/
│       └── SKILL.md
└── README.md            # 插件使用与配置文档（必需）
```

---

## 本地校验

在提交新插件或修改市场清单前，可执行自动化校验脚本：

```bash
pnpm test
# 或
npm test
# 或
node scripts/validate.mjs
```

---

## 开源协议

本项目基于 [MIT 协议](LICENSE) 开源。各第三方插件及 MCP 服务的具体版权由原作者保留。
