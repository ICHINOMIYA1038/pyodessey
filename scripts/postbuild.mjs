import fs from "fs";
import path from "path";

// Move out/* into out/pyodessey/ so that basePath routing works
// when served from the root of a Cloudflare Worker.
const OUT_DIR = path.join(process.cwd(), "out");
const BASE_PATH = "pyodessey";
const TARGET = path.join(OUT_DIR, BASE_PATH);

// Create a temp directory, move everything there, then move it back under basePath
const TMP = path.join(process.cwd(), "_out_tmp");

fs.renameSync(OUT_DIR, TMP);
fs.mkdirSync(path.join(OUT_DIR, BASE_PATH), { recursive: true });

for (const entry of fs.readdirSync(TMP)) {
  fs.renameSync(path.join(TMP, entry), path.join(TARGET, entry));
}

fs.rmSync(TMP, { recursive: true });
console.log(`Moved build output to out/${BASE_PATH}/`);
