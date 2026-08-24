# GitHub 插件

GitHub 官方 API 与研发工作流协同插件，支持直接在 AI 环境中完成 Issue 跟踪、PR 创建、分支文件查看与代码审查。

## 功能特性
- 🐙 **Issue 管理**：搜索、读取、创建与评论 GitHub Issues。
- 🔀 **Pull Request 协作**：查看 PR Diff、提交审查意见、获取 CI/CD 检查结果。
- 📁 **仓库浏览**：无需 clone 即可查看远程仓库文件、commit 记录与 release 说明。

## 环境变量配置
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxx"
```

> **获取方式**：访问 [GitHub Settings -> Personal access tokens (classic)](https://github.com/settings/tokens) 或 Fine-grained tokens，勾选 `repo` 权限并生成 Token。
