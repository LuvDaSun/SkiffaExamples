import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "path";
import { defineConfig } from "rollup";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dirname);

export default defineConfig([
  {
    input: path.resolve(projectRoot, "transpiled", "client.js"),
    output: { file: path.resolve("bundled", "client.js"), format: "iife", sourcemap: true },
    context: "window",
    plugins: [nodeResolve()],
  },
]);
