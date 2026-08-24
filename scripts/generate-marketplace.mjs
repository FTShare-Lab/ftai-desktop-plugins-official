import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// 将本地 monorepo 插件各自的 skills（plugin.json）与 mcpServers（.mcp.json）
// 聚合进市场主清单，使桌面端详情页能展示扩展能力，而无需逐插件拉取 manifest。
const marketplacePath = path.join(rootDir, ".ftai-plugin/marketplace.json");
const data = JSON.parse(fs.readFileSync(marketplacePath, "utf-8"));

let updated = 0;

for (const plugin of data.plugins ?? []) {
  const source = plugin.source;
  let pluginDir;

  if (typeof source === "string" && source.startsWith("./")) {
    pluginDir = path.join(rootDir, source);
  } else if (
    source &&
    typeof source === "object" &&
    typeof source.path === "string" &&
    source.path.startsWith("./")
  ) {
    pluginDir = path.join(rootDir, source.path);
  } else {
    // 外链 Git 仓库插件的 manifest 不在本仓库内，无法离线聚合，跳过
    continue;
  }

  const manifestPath = path.join(pluginDir, ".ftai-plugin/plugin.json");
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    if (Array.isArray(manifest.skills)) {
      plugin.skills = manifest.skills;
    }
  }

  const mcpPath = path.join(pluginDir, ".mcp.json");
  if (fs.existsSync(mcpPath)) {
    const mcp = JSON.parse(fs.readFileSync(mcpPath, "utf-8"));
    if (mcp.mcpServers && typeof mcp.mcpServers === "object") {
      plugin.mcpServers = mcp.mcpServers;
    }
  }

  updated += 1;
}

fs.writeFileSync(marketplacePath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`✅ 已聚合 ${updated} 个本地插件的 skills / mcpServers 到市场主清单。`);
