import fs from "fs";
import path from "path";
import matter from "gray-matter";

const LESSONS_DIR = path.join(process.cwd(), "content/lessons");
const OUTPUT_META = path.join(process.cwd(), "src/lib/lessons-meta.json");
const OUTPUT_CONTENT_DIR = path.join(process.cwd(), "src/lib/lessons-content");

// Ensure content directory exists
if (!fs.existsSync(OUTPUT_CONTENT_DIR)) {
  fs.mkdirSync(OUTPUT_CONTENT_DIR, { recursive: true });
}

const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith(".md"));

const metaList = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(LESSONS_DIR, f), "utf-8");
  const { data, content } = matter(raw);

  // Save metadata (lightweight)
  metaList.push(data);

  // Save individual content file by slug
  const slug = data.slug;
  fs.writeFileSync(
    path.join(OUTPUT_CONTENT_DIR, `${slug}.json`),
    JSON.stringify({ meta: data, content })
  );
}

fs.writeFileSync(OUTPUT_META, JSON.stringify(metaList, null, 2));
console.log(
  `Generated ${metaList.length} lessons: meta → ${OUTPUT_META}, content → ${OUTPUT_CONTENT_DIR}/`
);
