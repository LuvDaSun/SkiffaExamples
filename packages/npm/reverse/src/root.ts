import path from "path";
import { fileURLToPath } from "url";

/**
 * the absolute path to this projects root directory
 */
export const projectRoot = makeProjectRoot();

function makeProjectRoot() {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(dirname, "..");
}
