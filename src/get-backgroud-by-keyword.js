import fs from "fs/promises";
import path from "path"
import { getBackgroudByKeyWord, keywordsByTopic } from "../utils/index.js";

const ROOT_PATH = process.cwd();
const OUTPUT_DIR = path.join(ROOT_PATH, "data", "json")

async function main() {
  const topics = Object.keys(keywordsByTopic);

  for (const topic of topics) {
    console.log("Fetching:", topic);

    const data = await getBackgroudByKeyWord(`page border ${topic}`);

    const filePath = path.join(
      OUTPUT_DIR,
      `freepik-${topic.replace(/\s+/g, "_").toLowerCase()}.json`
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  }
}

main().catch(console.error);