/**
 * Preprocesses markdown content before react-markdown processes it.
 *
 * NOTE: Ruby conversion is handled by rehype-ruby plugin (post-parse).
 * NOTE: :::sensei/:::student/:::hint are handled by remark-directive plugin.
 * Only runnable code block syntax conversion remains here.
 */

const RUBY_PATTERN = /\{([^|{}]+)\|([^}]+)\}/g;

function convertRunnableBlocks(content: string): string {
  // ```python runnable → ```python-runnable
  // ```javascript runnable → ```javascript-runnable
  return content
    .replace(/```python\s+runnable/g, "```python-runnable")
    .replace(/```javascript\s+runnable/g, "```javascript-runnable");
}

/**
 * In table rows, the `|` inside ruby syntax `{漢字|かんじ}` is confused
 * with the table column separator. Pre-convert ruby to HTML in those lines.
 */
function fixRubyInTables(content: string): string {
  return content
    .split("\n")
    .map((line) => {
      // Only process lines that look like table rows (start with |)
      if (!line.trimStart().startsWith("|")) return line;
      // Skip separator rows like |---|---|
      if (/^\s*\|[\s\-:|]+\|\s*$/.test(line)) return line;
      // Replace {漢字|かんじ} → <ruby>漢字<rt>かんじ</rt></ruby>
      if (RUBY_PATTERN.test(line)) {
        RUBY_PATTERN.lastIndex = 0;
        return line.replace(
          RUBY_PATTERN,
          "<ruby>$1<rt>$2</rt></ruby>"
        );
      }
      return line;
    })
    .join("\n");
}

export function preprocessMarkdown(content: string): string {
  let result = content;
  result = fixRubyInTables(result);
  result = convertRunnableBlocks(result);
  return result;
}
