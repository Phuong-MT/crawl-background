import fs from "fs/promises";
import path from "path";
import { downloadFile } from "../utils/index.js";

const ROOT_PATH = process.cwd();
const JSON_DIR = path.join(ROOT_PATH, "data", "json");
const STATIC_DIR = path.join(ROOT_PATH, "data", "static");

async function downloadAllImages() {
  console.log("🚀 Start download images");

  const files = await fs.readdir(JSON_DIR);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    // freepik-homecoming.json → homecoming
    const key = file
      .replace("freepik-", "")
      .replace(".json", "");

    const jsonPath = path.join(JSON_DIR, file);
    const outputDir = path.join(STATIC_DIR, key);

    await fs.mkdir(outputDir, { recursive: true });

    console.log(`📂 Topic: ${key}`);

    const raw = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(raw);
    const images = data?.data || [];

    if (images.length === 0) {
      console.warn(`⚠️ No images in ${file}`);
      continue;
    }

    for (const image of images) {
      const url = image?.image?.url;
      if (!url) {
        console.warn(`⚠️ Missing url for image ${image.id}`);
        continue;
      }

      const imageName = `${image.id}.png`;
      const outputPath = path.join(outputDir, imageName);

      try {
        await downloadFile(url, outputPath);
        console.log("✅ Download:", imageName);
      } catch (err) {
        console.error("❌ Download failed:", imageName, err.message);
      }
    }

    console.log(`🎉 Done topic ${key} (${images.length} images)`);
  }

  console.log("🏁 All downloads finished");
}

downloadAllImages().catch(console.error);
