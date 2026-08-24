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

## 开源协议与知识产权声明 (License & Disclaimers)

### 1. 开源协议 (License)
本仓库的架构代码、JSON Schema 及官方提示词模板基于 [MIT 许可证](LICENSE) 授权开源。

### 2. 第三方致谢与上游声明 (Acknowledgements)
- 本市场规范与 MCP 服务定义深度兼容并借鉴了 [Anthropic Claude Code Plugins](https://github.com/anthropics/claude-plugins-official)（遵循 Apache-2.0 许可证）及 [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/servers)（遵循 MIT 许可证）的开源生态设计。
- 目录中所列出的第三方插件、MCP 服务端及外部 Git 仓库的版权与开源协议均由各自的原作者或所属公司持有并管理。

### 3. 商标免责声明 (Trademark Disclaimer)
- 本仓库及插件清单中出现的第三方产品名称、商标、服务标志和品牌徽标（包括但不限于 **Notion**、**GitHub**、**Google Drive**、**GitLab**、**Linear**、**Figma**、**PostgreSQL**、**Redis**、**Docker**、**Microsoft Playwright**、**Slack**、**Sentry**、**Vercel**、**Supabase**、**Tavily**、**Exa** 等）均为其各自所有者的财产。
- 在本市场中使用这些名称和标识仅用于**兼容性说明、技术集成指引与索引展示**之目的，并不代表本仓库或 FtAi 与这些商标持有人存在任何形式的官方隶属、赞助、合作或背书关系。

### 4. 安全与使用免责 (Security Notice)
- 本插件市场仅分发配置文件、提示词指令及公开开源服务引用，**不托管或直接重新分发任何第三方的闭源二进制文件或可执行包**。
- 用户在本地安装第三方 MCP 服务或配置 API 密钥前，应自行审查对应的来源安全性及服务条款。
