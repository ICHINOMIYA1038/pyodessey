import type { Metadata } from "next";
import { SandboxClient } from "./SandboxClient";

export const metadata: Metadata = {
  title: "サンドボックス",
  description: "自由にJavaScriptコードを書いて実行しよう",
  openGraph: {
    title: "サンドボックス - JSOdessey",
    description: "自由にJavaScriptコードを書いて実行しよう",
  },
};

export default function JsSandboxPage() {
  return <SandboxClient />;
}
