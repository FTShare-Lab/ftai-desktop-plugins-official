---
name: notion-workspace
description: Notion 文档与数据库检索、阅读与内容编辑操作指南。当用户需要查找 Notion 笔记、同步开发文档、更新项目 Database 或创建新页面时激活。
---

# Notion Workspace 技能

本技能指导 AI 智能体通过 Notion MCP 服务与 Notion 工作区进行交互。

## 适用场景
1. 搜索团队 Notion 内部文档、PRD、设计规范或架构设计。
2. 读取指定 Notion Page 的全文 Markdown 格式内容。
3. 在指定的 Parent Page 或 Database 下创建新文档、更新现有页面。
4. 查询、过滤与修改 Notion Database 数据项。

## 工具调用规范
- **搜索页面**：优先使用搜索工具，输入精确关键词定位 Page ID 或 Database ID。
- **获取页面内容**：使用读取工具传入 `page_id`，获取其 Blocks 并解析为清晰的 Markdown 结构。
- **创建/追加内容**：创建页面或追加段落时，使用合法的 Notion Block 结构（heading_1, paragraph, bulleted_list_item, code 等）。
- **保护隐私与防覆盖**：在覆盖修改现有重要文档前，必须明确向用户确认修改范围。
