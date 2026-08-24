---
name: postgres-db
description: PostgreSQL 数据库模式检查、只读数据查询与 SQL 迁移编写指南。
---

# PostgreSQL 数据库技能

本技能指导 AI 智能体通过 PostgreSQL MCP 服务与数据库进行安全交互。

## 适用场景
1. 查看 public / 自定义 schema 下的表结构、字段类型、约束与外键。
2. 编写并运行安全只读 SQL 查询，分析业务数据现状。
3. 检查索引命中率与查询执行计划（EXPLAIN ANALYZE）。
4. 辅助编写安全的 DDL / 迁移脚本。

## 安全准则
- 严禁执行未经用户明确授权的 `DROP`, `TRUNCATE`, `ALTER` 或非幂等 `UPDATE/DELETE`。
- 优先采用只读连接或限制操作的作用域。
