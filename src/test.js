import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, "data", "docs", "detected");

async function getFileName() {
    const files = await fs.readdir(INPUT_DIR);
    const jsonFiles = files.filter(f => f.endsWith(".json"));
    console.log(jsonFiles)
}
getFileName()