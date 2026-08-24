import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

console.log("🔍 Validating FtAi Official Plugin Registry...\n");

let errorCount = 0;
let warnCount = 0;

function reportError(msg) {
  console.error(`❌ [ERROR] ${msg}`);
  errorCount++;
}

function reportWarn(msg) {
  console.warn(`⚠️  [WARN] ${msg}`);
  warnCount++;
}

function reportSuccess(msg) {
  console.log(`✅ [OK] ${msg}`);
}

const SUPPORTED_LOCALES = ["zh-CN", "en-US"];

// 1. 验证 .ftai-plugin/marketplace.json
const marketplacePath = path.join(rootDir, ".ftai-plugin/marketplace.json");
if (!fs.existsSync(marketplacePath)) {
  reportError("Missing .ftai-plugin/marketplace.json");
} else {
  try {
    const raw = fs.readFileSync(marketplacePath, "utf-8");
    const data = JSON.parse(raw);
    if (!data.name || !Array.isArray(data.plugins)) {
      reportError("Invalid marketplace.json format: missing name or plugins array");
    } else {
      reportSuccess(`Marketplace manifest parsed (${data.plugins.length} plugins registered)`);

      // 验证每个 plugin
      for (const plugin of data.plugins) {
        if (!plugin.name || !plugin.description) {
          reportError(`Plugin entry missing name or description: ${JSON.stringify(plugin)}`);
          continue;
        }

        // 验证 locales
        if (plugin.locales) {
          for (const [localeKey, localeData] of Object.entries(plugin.locales)) {
            if (!SUPPORTED_LOCALES.includes(localeKey)) {
              reportWarn(`Plugin ${plugin.name} has non-standard locale key: ${localeKey}`);
            }
            if (!localeData.description && !localeData.displayName) {
              reportError(`Plugin ${plugin.name} locale ${localeKey} is empty`);
            }
          }
        }

        // 如果是本地路径插件，校验本地目录
        if (typeof plugin.source === "string" && plugin.source.startsWith("./")) {
          const pluginDir = path.join(rootDir, plugin.source);
          if (!fs.existsSync(pluginDir)) {
            reportError(`Local plugin directory does not exist: ${plugin.source}`);
            continue;
          }

          const pluginManifest = path.join(pluginDir, ".ftai-plugin/plugin.json");
          if (!fs.existsSync(pluginManifest)) {
            reportError(`Plugin manifest missing in local plugin: ${plugin.name} (${pluginManifest})`);
          } else {
            try {
              const manifestContent = JSON.parse(fs.readFileSync(pluginManifest, "utf-8"));
              if (manifestContent.name !== plugin.name) {
                reportError(`Manifest name mismatch for ${plugin.name}: found ${manifestContent.name}`);
              }
              if (manifestContent.locales) {
                for (const [locKey, locVal] of Object.entries(manifestContent.locales)) {
                  if (!SUPPORTED_LOCALES.includes(locKey)) {
                    reportWarn(`Local plugin ${plugin.name} manifest has non-standard locale key: ${locKey}`);
                  }
                }
              }
            } catch (e) {
              reportError(`Failed to parse plugin manifest for ${plugin.name}: ${e.message}`);
            }
          }
        }
      }
    }
  } catch (err) {
    reportError(`Failed to parse .ftai-plugin/marketplace.json: ${err.message}`);
  }
}

// 2. 验证 .claude-plugin/marketplace.json
const claudeMarketplacePath = path.join(rootDir, ".claude-plugin/marketplace.json");
if (!fs.existsSync(claudeMarketplacePath)) {
  reportError("Missing .claude-plugin/marketplace.json");
} else {
  try {
    const data = JSON.parse(fs.readFileSync(claudeMarketplacePath, "utf-8"));
    if (data.plugins && Array.isArray(data.plugins)) {
      reportSuccess(`Claude Code marketplace compatibility verified (${data.plugins.length} plugins)`);
    }
  } catch (e) {
    reportError(`Invalid .claude-plugin/marketplace.json: ${e.message}`);
  }
}

console.log("\n==========================================");
if (errorCount === 0) {
  console.log(`🎉 All registry and plugin checks passed successfully! (${warnCount} warnings)`);
  process.exit(0);
} else {
  console.error(`💥 Validation finished with ${errorCount} error(s) and ${warnCount} warning(s).`);
  process.exit(1);
}
