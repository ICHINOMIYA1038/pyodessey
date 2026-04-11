"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import { rehypeRuby } from "@/lib/rehype-ruby";
import { remarkContainers } from "@/lib/remark-containers";
import { ExecutableCodeBlock } from "./ExecutableCodeBlock";
import { CharacterBubble } from "./CharacterBubble";
import { HintBlock } from "./HintBlock";
import { preprocessMarkdown } from "@/lib/markdown-preprocess";
import { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processed = preprocessMarkdown(content);

  const components: Components = useMemo(() => ({
    code({ className, children, ...props }) {
      const match = className?.match(/language-([\w-]+)/);
      const lang = match?.[1];
      const codeString = String(children).replace(/\n$/, "");

      // Runnable code block (python or javascript)
      if (lang === "python-runnable" || lang === "javascript-runnable") {
        return <ExecutableCodeBlock initialCode={codeString} />;
      }

      // Regular code block (with language)
      if (lang) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      // Inline code
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    // For runnable blocks, don't wrap in <pre> since ExecutableCodeBlock handles its own layout
    pre({ children }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const child = children as any;
      if (child?.props?.className?.includes("-runnable")) {
        return <>{children}</>;
      }
      return <pre>{children}</pre>;
    },
    div({ node, children, ...props }) {
      const character = node?.properties?.["dataCharacter"] as
        | string
        | undefined;
      if (character === "sensei" || character === "student") {
        return (
          <CharacterBubble character={character}>
            {children}
          </CharacterBubble>
        );
      }
      const isHint = node?.properties?.["dataHint"];
      if (isHint) {
        return <HintBlock>{children}</HintBlock>;
      }
      return <div {...props}>{children}</div>;
    },
  }), []);

  return (
    <div className="prose max-w-none prose-headings:text-slate-800 prose-h1:text-[var(--brand-purple)] prose-h2:border-l-4 prose-h2:border-[var(--brand-blue)] prose-h2:pl-3 prose-h2:text-[var(--brand-blue)] prose-h3:text-[var(--brand-teal)] prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-800 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-500 prose-code:text-orange-600 prose-code:bg-[var(--surface-2)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-[var(--surface-2)] prose-pre:border prose-pre:border-[var(--border-default)] prose-pre:rounded-lg prose-td:text-slate-700 prose-th:text-slate-800 prose-hr:border-[var(--border-default)]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkContainers]}
        rehypePlugins={[rehypeRaw, rehypeRuby]}
        components={components}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}
