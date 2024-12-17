import path from "node:path";
import fs from "node:fs";

const findAndDeleteNodeModules = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      if (file === "node_modules") {
        fs.rmSync(fullPath, { recursive: true });
        console.log(`Deleted: ${fullPath}`);
      } else {
        // Recurse into subdirectories
        findAndDeleteNodeModules(fullPath);
      }
    }

    if (file === "package-lock.json") {
      fs.rmSync(fullPath);
      console.log(`Deleted: ${fullPath}`);
    }
  }
};

const targetDir = process.argv[2] || process.cwd();

console.log(`Scanning for node_modules in: ${targetDir}`);
findAndDeleteNodeModules(targetDir);
console.log("All node_modules folders have been deleted.");
