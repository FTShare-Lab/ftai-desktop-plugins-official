---
name: google-drive-sync
description: Google Drive 文件检索与文档阅读指南。当用户需要搜索 Google Drive 中的文件、读取 Google Docs 内容、下载云盘资料或整理目录时激活。
---

# Google Drive 云盘集成技能

本技能指导 AI 智能体通过 Google Drive MCP 服务与 Google 云端硬盘交互。

## 适用场景
1. 关键词检索用户 Google Drive 中的文件与文件夹。
2. 提取 Google Docs / Google Sheets 中的纯文本或表格数据。
3. 读取保存在云端的 PDF、Markdown、JSON 等各类资料。
4. 整理云盘目录结构并获取文件元数据。

## 使用指引
- **精准过滤**：先通过文件名或类型（`mimeType`）执行精确搜索，获取文件 `file_id`。
- **内容解析**：针对 Google Docs 等在线文档类型，请求文本导出格式以便直接阅读。
- **安全边界**：不执行不可逆的云端批量删除操作，所有写/删操作需提示用户确认。
