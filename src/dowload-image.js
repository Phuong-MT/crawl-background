import fs from "fs/promises"
import path from "path"
import { downloadFile } from "../utils/index.js";

const ROOT_PATH = process.cwd();
const folder_key = "home_coming";
const INPUT_DIR_JSON = path.join(ROOT_PATH, "data", "json")
const FILE_INPUT = path.join(INPUT_DIR_JSON, folder_key,"home_coming_1.json");

const OUPT_DIR_STATIC = path.join(ROOT_PATH, "data", "static");
const OUTPUT_DIR = path.join(OUPT_DIR_STATIC, folder_key);

async function dowloadImge(){
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    console.log("🚀 Start download images");
    
    const raw = await fs.readFile(FILE_INPUT, "utf-8");
    const data = JSON.parse(raw);
    const images = data?.data || [];
    
    if (!images || images.length === 0) {
        console.log("⚠️ File is empty");
        return;
    }
    
    for (const image of images) {
        const imageName = `${image.id}.png`;
        const url = image?.image?.url;

        if (!url) {
        console.warn(`⚠️ Missing url for image ${image.id}`);
        continue;
        }

        const outputPath = path.join(OUTPUT_DIR, imageName);
        await downloadFile(url, outputPath);

        console.log("✅ Download success:", imageName);
    }

    console.log("🎉 Download end. Total images:", images.length);
    return;
}
dowloadImge().catch(e => console.log(e))