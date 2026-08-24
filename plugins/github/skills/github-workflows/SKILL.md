---
name: github-workflows
description: GitHub 协同工作流指南。包含 Issue 创建与检索、Pull Request 创建与审查、Git Commit 与文件变更追踪。
---

# GitHub 研发协同技能

本技能指导 AI 智能体通过 GitHub MCP 服务与 GitHub 远程仓库进行互动。

## 适用场景
1. 搜索、创建、评论与关闭 GitHub Issue。
2. 创建 Pull Request、检查 CI 状态、查看 PR Diff 与审查评论。
3. 读取远程仓库文件树与特定分支代码。
4. 检索 GitHub 上的代码库、开源项目与代码片段。

## 操作规范
- **安全检查**：在创建 Pull Request 或提交 Issue 时，先向用户确认标题、描述与目标分支。
- **只读优先**：在未获明确指令前，优先执行只读查询（如获取 PR 状态、读取 Issue），写操作需获得确认。
- **Token 权限**：确保使用具备对应 `repo` 作用域的 Personal Access Token (PAT)。
