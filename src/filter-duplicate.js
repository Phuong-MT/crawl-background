import {findDuplicateImagesV2} from "../utils/index.js"
import fs from "fs/promises"
import path from "path"

const ROOT = process.cwd();
const DIR = path.join(ROOT, "data", "static")

async function main(){
    const OUTPUT_FILE = path.join(ROOT, "utils", "duplicate-image-v2.json");
    const FOLDER_IMAGE = (await fs.readdir(DIR)).map(e=> path.join(DIR, e))
    
  await findDuplicateImagesV2(OUTPUT_FILE, FOLDER_IMAGE)
}
main()