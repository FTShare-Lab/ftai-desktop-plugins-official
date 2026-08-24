# Google Drive 插件

Google Drive 云端网盘与 Google Docs 在线文档集成插件，支持在 AI 工作流中直接检索云盘文件、提取文档内容与协同整理。

## 功能特性
- 🔍 **云端全文检索**：快速搜索 Google Drive 中的文档、表格与多媒体文件。
- 📄 **文档内容提取**：直接读取 Google Docs、Sheets、Slides 并转换为 Markdown 格式供 AI 分析。
- 📁 **目录与元数据管理**：查询文件夹结构、文件修改时间与分享权限信息。

## 环境变量配置
```bash
export GDRIVE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
export GDRIVE_CLIENT_SECRET="your-client-secret"
```

> **配置方式**：在 [Google Cloud Console](https://console.cloud.google.com/) 中创建项目，启用 Google Drive API 并配置 OAuth 2.0 Client Credentials。
