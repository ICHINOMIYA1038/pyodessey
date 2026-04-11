import type { Metadata } from "next";
import { SandboxClient } from "./SandboxClient";

export const metadata: Metadata = {
  title: "サンドボックス",
  description: "自由にPythonコードを書いて実行しよう",
  openGraph: {
    title: "サンドボックス - PyOdessey",
    description: "自由にPythonコードを書いて実行しよう",
  },
};

export default function SandboxPage() {
  return <SandboxClient />;
}
