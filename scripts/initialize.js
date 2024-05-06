#!/usr/bin/env node

import cp from "child_process";

const options = { shell: true, stdio: "inherit", env: process.env };

cp.execFileSync("npm", ["--no-workspaces", "ci"], options);
cp.execFileSync("npm", ["run", "generate"], options);
cp.execFileSync("npm", ["--workspaces", "ci"], options);
