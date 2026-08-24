---
name: redis-cache
description: Redis 缓存分析与数据结构检查指南。
---

# Redis 缓存技能

本技能指导 AI 智能体通过 Redis MCP 服务调试和查看 Redis 缓存状态。

## 适用场景
1. 检查特定 Key 的存在性、类型（string, hash, list, set, zset）与剩余过期时间 TTL。
2. 安全抽样键名（避免在生产全量执行 KEYS *，采用 SCAN）。
3. 检查 Redis INFO 概况与内存占用。
