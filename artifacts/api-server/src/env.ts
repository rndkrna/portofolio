import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
let envPath = path.resolve(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  envPath = path.resolve(process.cwd(), "../../.env");
}
if (!fs.existsSync(envPath)) {
  try {
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    envPath = path.resolve(currentDir, "../../../.env");
  } catch (e) {}
}

try {
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    envConfig.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  }
} catch (e) {}
