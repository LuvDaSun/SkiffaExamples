#!/usr/bin/env node

import cp from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(dirname, "..");

const options = { shell: true, stdio: "inherit", env: process.env };

const names = ["reverse-api", "todo-api", "noop-api"];

for (const name of names) {
  cp.execFileSync(
    "npx",
    [
      "--yes",
      "--package",
      "@skiffa/generator@0.13.20",
      "--",
      "skiffa-generator",
      "package",
      path.resolve(workspaceRoot, "specifications", `${name}.yaml`),
      "--package-directory",
      path.resolve(workspaceRoot, "generated", "npm", name),
      "--package-name",
      name,
      "--package-version",
      "0.1.0",
    ],
    options,
  );
}
