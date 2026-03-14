/**
 * Rehype plugin to convert {漢字|かんじ} syntax to <ruby> elements.
 * Runs AFTER markdown parsing so it doesn't break emphasis, headings, etc.
 */
import { visit } from "unist-util-visit";
import type { Root, Text, Element } from "hast";

const RUBY_PATTERN = /\{([^|{}]+)\|([^}]+)\}/g;

export function rehypeRuby() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;
      if (!RUBY_PATTERN.test(node.value)) return;

      // Reset regex lastIndex
      RUBY_PATTERN.lastIndex = 0;

      const children: (Text | Element)[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = RUBY_PATTERN.exec(node.value)) !== null) {
        // Text before the match
        if (match.index > lastIndex) {
          children.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        // Ruby element
        children.push({
          type: "element",
          tagName: "ruby",
          properties: {},
          children: [
            { type: "text", value: match[1] },
            {
              type: "element",
              tagName: "rt",
              properties: {},
              children: [{ type: "text", value: match[2] }],
            },
          ],
        });

        lastIndex = match.index + match[0].length;
      }

      // Remaining text after last match
      if (lastIndex < node.value.length) {
        children.push({
          type: "text",
          value: node.value.slice(lastIndex),
        });
      }

      // Replace the text node with the new children
      parent.children.splice(index, 1, ...children);
    });
  };
}
