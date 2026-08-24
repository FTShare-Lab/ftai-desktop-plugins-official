# Notion 插件

Notion 官方知识库与结构化数据库集成插件，支持在 FtAi Desktop 和 Claude Code 环境中直接读写 Notion 工作区。

## 功能特性
- 🔍 **智能搜索**：快速检索 Notion 中的页面、笔记与 Database 记录。
- 📝 **文档读写**：一键生成/追加 Markdown 格式的 Notion 页面。
- 📊 **数据库操作**：查询、过滤和更新结构化项目看板与待办清单。

## 环境变量配置
使用前请在环境变量或系统设置中配置 Notion API Key：

```bash
export NOTION_API_KEY="secret_xxxxxxxxxxxxxxxxxxxxxxxx"
```

> **获取方式**：访问 [Notion My Integrations](https://www.notion.so/my-integrations) 创建 Internal Integration，并在目标 Notion 页面中点击 `... -> Connect to -> 你的 Integration` 进行授权。
