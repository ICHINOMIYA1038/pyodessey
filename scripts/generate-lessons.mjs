import fs from "fs";
import path from "path";
import matter from "gray-matter";

function generateLessons(lessonsDir, outputMeta, outputContentDir, label) {
  if (!fs.existsSync(outputContentDir)) {
    fs.mkdirSync(outputContentDir, { recursive: true });
  }

  if (!fs.existsSync(lessonsDir)) {
    console.log(`No ${label} lessons directory found at ${lessonsDir}, skipping.`);
    fs.writeFileSync(outputMeta, JSON.stringify([], null, 2));
    return [];
  }

  const files = fs.readdirSync(lessonsDir).filter((f) => f.endsWith(".md"));
  const metaList = [];

  for (const f of files) {
    const raw = fs.readFileSync(path.join(lessonsDir, f), "utf-8");
    const { data, content } = matter(raw);
    metaList.push(data);
    const slug = data.slug;
    fs.writeFileSync(
      path.join(outputContentDir, `${slug}.json`),
      JSON.stringify({ meta: data, content })
    );
  }

  fs.writeFileSync(outputMeta, JSON.stringify(metaList, null, 2));
  console.log(
    `Generated ${metaList.length} ${label} lessons: meta → ${outputMeta}, content → ${outputContentDir}/`
  );
  return metaList;
}

// Python lessons
const pyMeta = generateLessons(
  path.join(process.cwd(), "content/lessons"),
  path.join(process.cwd(), "src/lib/lessons-meta.json"),
  path.join(process.cwd(), "src/lib/lessons-content"),
  "Python"
);

// JavaScript lessons
const jsMeta = generateLessons(
  path.join(process.cwd(), "content/js-lessons"),
  path.join(process.cwd(), "src/lib/js-lessons-meta.json"),
  path.join(process.cwd(), "src/lib/js-lessons-content"),
  "JavaScript"
);

// Generate robots.txt and sitemap.xml into public/
const SITE_URL = process.env.SITE_URL ?? "https://nullstead.com";
const PUBLIC_DIR = path.join(process.cwd(), "public");

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/pyodessey/sitemap.xml
Sitemap: ${SITE_URL}/jsodessey/sitemap.xml
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), robotsTxt);

const sortedPyMeta = [...pyMeta].sort((a, b) => a.order - b.order);
const pySitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/pyodessey</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/pyodessey/sandbox</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
${sortedPyMeta.map((l) => `  <url><loc>${SITE_URL}/pyodessey/lesson/${l.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), pySitemapXml);

const sortedJsMeta = [...jsMeta].sort((a, b) => a.order - b.order);
const jsSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/jsodessey</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/jsodessey/sandbox</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
${sortedJsMeta.map((l) => `  <url><loc>${SITE_URL}/jsodessey/lesson/${l.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "js-sitemap.xml"), jsSitemapXml);

console.log("Generated robots.txt and sitemaps → public/");
