import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const marketplacePath = path.join(rootDir, ".ftai-plugin/marketplace.json");

const INDENT = "      "; // 插件条目字段的缩进层级（6 空格）

/**
 * 以仓库既有风格序列化新增字段：简单数组写在一行，对象与复杂数组按 2 空格展开。
 * 仅用于插入的新字段，不复写文件其余部分，避免整文件重排。
 */
function stringifyValue(value, depth) {
  const pad = "  ".repeat(depth);
  if (Array.isArray(value)) {
    if (value.every((item) => item === null || typeof item !== "object")) {
      return `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
    }
    return (
      "[\n" +
      value.map((item) => `${pad}  ${stringifyValue(item, depth + 1)}`).join(",\n") +
      `\n${pad}]`
    );
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).map(
      ([key, item]) => `${pad}  ${JSON.stringify(key)}: ${stringifyValue(item, depth + 1)}`,
    );
    return `{\n${entries.join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

function resolveLocalPluginDir(plugin) {
  const source = plugin.source;
  if (typeof source === "string" && source.startsWith("./")) {
    return path.join(rootDir, source);
  }
  if (
    source &&
    typeof source === "object" &&
    typeof source.path === "string" &&
    source.path.startsWith("./")
  ) {
    return path.join(rootDir, source.path);
  }
  return undefined;
}

const data = JSON.parse(fs.readFileSync(marketplacePath, "utf-8"));

// 计算每个本地插件尚缺的 skills / mcpServers，按插件在 plugins 数组中的顺序索引
const additions = new Map();
for (const plugin of data.plugins ?? []) {
  const pluginDir = resolveLocalPluginDir(plugin);
  if (!pluginDir) continue;

  const fields = {};
  if (plugin.skills === undefined) {
    const manifestPath = path.join(pluginDir, ".ftai-plugin/plugin.json");
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      if (Array.isArray(manifest.skills)) {
        fields.skills = manifest.skills;
      }
    }
  }

  if (plugin.mcpServers === undefined) {
    const mcpPath = path.join(pluginDir, ".mcp.json");
    if (fs.existsSync(mcpPath)) {
      const mcp = JSON.parse(fs.readFileSync(mcpPath, "utf-8"));
      if (mcp.mcpServers && typeof mcp.mcpServers === "object") {
        fields.mcpServers = mcp.mcpServers;
      }
    }
  }

  if (Object.keys(fields).length > 0) {
    additions.set(plugin.name, fields);
  }
}

// 逐行扫描：插件对象以 4 空格独立 `{` 开始、以 4 空格 `}` 结束，
// 在结束行之前插入新增字段，其余文本原样保留。
const lines = fs.readFileSync(marketplacePath, "utf-8").split("\n");
const output = [];
let pluginIndex = 0;
let pluginName = null;
let inserted = 0;

for (const line of lines) {
  if (/^    \{/.test(line)) {
    pluginName = data.plugins[pluginIndex]?.name ?? null;
    pluginIndex += 1;
  }

  if (/^    \},?$/.test(line) && pluginName && additions.has(pluginName)) {
    // 前一行是插件对象的最后一个字段（如 homepage），补上逗号后再追加新字段；
    // 新增字段之间用逗号分隔，最后一个字段末尾不加逗号（其后紧跟插件对象的结束括号）。
    const prev = output.pop();
    output.push(prev.endsWith(",") ? prev : `${prev},`);
    const fields = Object.entries(additions.get(pluginName));
    const lastKey = fields[fields.length - 1][0];
    for (const [key, value] of fields) {
      const comma = key === lastKey ? "" : ",";
      output.push(`${INDENT}${JSON.stringify(key)}: ${stringifyValue(value, 3)}${comma}`);
    }
    inserted += 1;
    pluginName = null;
  }

  output.push(line);
}

fs.writeFileSync(marketplacePath, output.join("\n"));
console.log(`✅ 已聚合 ${inserted} 个本地插件的 skills / mcpServers 到市场主清单。`);
