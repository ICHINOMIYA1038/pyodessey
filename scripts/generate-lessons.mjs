import fs from "fs";
import path from "path";
import matter from "gray-matter";

const LESSONS_DIR = path.join(process.cwd(), "content/lessons");
const OUTPUT_PATH = path.join(process.cwd(), "src/lib/lessons-data.json");

const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith(".md"));

const lessons = files.map((f) => {
  const raw = fs.readFileSync(path.join(LESSONS_DIR, f), "utf-8");
  const { data, content } = matter(raw);
  return { meta: data, content };
});

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(lessons, null, 2));
console.log(`Generated ${lessons.length} lessons to ${OUTPUT_PATH}`);
