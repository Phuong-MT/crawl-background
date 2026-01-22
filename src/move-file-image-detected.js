import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();

const DETECTED_DIR = path.join(ROOT, "data","docs","detected");
const STATIC_DIR = path.join(ROOT, "data", "static");
const OUTPUT_DIR = path.join(ROOT, "data", "static_detected");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function getCategoryFromSource(sourceFile) {
  // summary_back_to_school.json -> back_to_school
  return sourceFile
    .replace("summary_", "")
    .replace(".json", "");
}

async function copyImages(category, items, type) {
  const targetDir = path.join(OUTPUT_DIR, category, type);
  await ensureDir(targetDir);

  for (const item of items) {
    const fileName = path.basename(item.input);

    const src = path.join(STATIC_DIR, category, fileName);
    const dest = path.join(targetDir, fileName);

    try {
      await fs.copyFile(src, dest);
    } catch (err) {
      console.warn(`❌ Missing file: ${src}`);
    }
  }
}

async function main() {
  const files = await fs.readdir(DETECTED_DIR);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const jsonPath = path.join(DETECTED_DIR, file);
    const content = JSON.parse(await fs.readFile(jsonPath, "utf-8"));

    const category = getCategoryFromSource(content.source_file);

    console.log(`📦 Processing: ${category}`);

    await copyImages(category, content.result_pass || [], "pass");
    await copyImages(category, content.result_fail || [], "fail");
  }

  console.log("✅ Done!");
}

main().catch(console.error);
