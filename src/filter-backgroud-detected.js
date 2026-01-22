import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, "data", "docs");
const OUTPUT_DIR = path.join(ROOT, "data", "docs", "detected");

async function filterBackgroundDetected() {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const files = await fs.readdir(INPUT_DIR);
    const jsonFiles = files.filter(f => f.endsWith(".json"));

    let counter = 0

    for (const file of jsonFiles) {
        const filePath = path.join(INPUT_DIR, file);

        let totalImages = 0;
        let passImages = 0;
        let failImages = 0;

        const resultPass= [];
        const resultFail = [];

        try {
            const raw = await fs.readFile(filePath, "utf-8");
            const data = JSON.parse(raw).results;

            if (!Array.isArray(data)) continue;

            for (const item of data) {
                const detection = item?.detection;
                if (!detection) continue;

                const { image_size, largest_blank_space, original_detection } = detection;
                if (!image_size || !largest_blank_space || !original_detection) continue;

                totalImages++;

                const imageArea =
                    image_size.width * image_size.height;

                const zone1Area = original_detection.area;
                const zone2Area = largest_blank_space.area;

                // Step 1: chọn zone lớn hơn
                const useZone1 = zone1Area >= zone2Area;
                const chosenZone = useZone1
                    ? original_detection
                    : largest_blank_space;

                const zoneName = useZone1 ? "zone1" : "zone2";

                // Step 2: check 50%
                const ratio = chosenZone.area / imageArea;

                const resultItem = {
                    input: item.input,
                    output: item.output,
                    ratio: Number(ratio.toFixed(4)),
                    zone: zoneName,
                };

                if (ratio >= 0.5) {
                    passImages++;
                    resultPass.push(resultItem);
                } else {
                    failImages++;
                    resultFail.push(resultItem);
                }
            }

            const output = {
                source_file: file,
                total_images: totalImages,
                pass_images: passImages,
                fail_images: failImages,
                result_pass: resultPass,
                result_fail: resultFail,
            };

            const outputFile = path.join(
                OUTPUT_DIR,
                file.replace(/\.json$/, ".json")
            );
            counter += passImages
            await fs.writeFile(
                outputFile,
                JSON.stringify(output, null, 2),
                "utf-8"
            );

            console.log(`✅ Written summary for ${file}`);
        } catch (err) {
            console.error("Error parsing:", file, err);
        }
    }
    console.log(counter)
}

filterBackgroundDetected().catch(console.error);
