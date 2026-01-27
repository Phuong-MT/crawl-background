import express from "express";
import path from "path";
import fs from "fs/promises";
import fsSync from "fs";

const ROOT = process.cwd();
const RESOURCE_DIR = path.join(ROOT, "data", "docs", "detected");
const ResourceRouter = express.Router();

ResourceRouter.get("/resource", async (req, res) => {
    try {
        const limit = 20;
        const type = req.query["type"] as string;
        const page = Number(req.query["page"]);
        let status = req.query["status"] as string;
        const ofset = ((page || 1) - 1) * limit;

        if (!type) return res.status(400).json("Miss type");

        const resourceFile = path.join(RESOURCE_DIR, type.toString());

        if (!fsSync.existsSync(resourceFile)) return res.status(400).json("Not type");

        const raw = await fs.readFile(resourceFile, "utf8");
        const data = JSON.parse(raw);
        console.log(status);
        const resource: any[] = status === "faild" ? data.result_fail : data.result_pass;
        return res.status(200).json({
            data: resource.slice(ofset, ofset + limit - 1),
            limit,
            total: resource.length,
            totalPages: Math.ceil(resource.length / limit),
            page: page || 1,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json("Error");
    }
});

export default ResourceRouter;
