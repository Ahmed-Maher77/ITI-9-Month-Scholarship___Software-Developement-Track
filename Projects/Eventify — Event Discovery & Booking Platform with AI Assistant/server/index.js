import path from "node:path";
import { fileURLToPath } from "node:url";
import { startServer } from "./src/startServer.js";

const isMainModule =
    process.argv[1] &&
    path.resolve(fileURLToPath(import.meta.url)) ===
        path.resolve(process.argv[1]);

if (isMainModule) {
    await startServer();
}
