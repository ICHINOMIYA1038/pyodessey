/**
 * Remark plugin that transforms container directives (:::sensei, :::student, :::hint)
 * into hast-compatible nodes. Works with remark-directive.
 *
 * :::sensei → <div data-character="sensei">
 * :::student → <div data-character="student">
 * :::hint → <div data-hint="true">
 */
import { visit } from "unist-util-visit";
import type { Root } from "mdast";

interface DirectiveNode {
  type: "containerDirective";
  name: string;
  children: unknown[];
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
}

export function remarkContainers() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: unknown) => {
      const directive = node as DirectiveNode;

      if (
        directive.name === "sensei" ||
        directive.name === "student"
      ) {
        directive.data = {
          hName: "div",
          hProperties: { dataCharacter: directive.name },
        };
      } else if (directive.name === "hint") {
        directive.data = {
          hName: "div",
          hProperties: { dataHint: "true" },
        };
      }
    });
  };
}
