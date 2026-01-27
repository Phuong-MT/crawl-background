import express from "express";
import cors from "cors";
import path from "path";
import ResourceRouter from "./src/router/resource.router";

const ROOT = process.cwd();
const app = express();

app.use(
    cors({
        origin: (origin: any, callback: any) => {
            if (!origin) return callback(null, true);
            if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
                return callback(null, true);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);
try {
    // app.use("/static/resource", express.static(path.join(ROOT, "data", "docs", "detected")));
    app.use("/static", ResourceRouter);
    app.use("/static/image", express.static(path.join(ROOT, "data", "static")));
    app.use("/api", (req, res) => {
        return res.status(200).json("hello");
    });
} catch (error) {
    console.log("error: ", error);
}

const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server listening on port: ", PORT);
});
