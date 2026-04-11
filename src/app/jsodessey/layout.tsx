import type { Metadata } from "next";
import { JsRunnerProvider } from "@/contexts/JsRunnerContext";
import { AppConfigProvider, AppConfig } from "@/contexts/AppConfigContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

const BASE_URL =
  process.env.SITE_URL ?? "https://nullstead.com";

const siteName = "JSOdessey";
const defaultDescription =
  "ブラウザだけでJavaScriptを学べる無料の学習アプリ。冒険しながらプログラミングの基礎から応用まで身につけよう！";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/jsodessey`),
  title: {
    default: `${siteName} - 冒険しながら学ぶJavaScriptプログラミング`,
    template: `%s - ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    siteName,
    locale: "ja_JP",
    title: `${siteName} - 冒険しながら学ぶJavaScriptプログラミング`,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - 冒険しながら学ぶJavaScriptプログラミング`,
    description: defaultDescription,
  },
};

const jsodesseyConfig: AppConfig = {
  prefix: "/jsodessey",
  name: "JSOdessey",
  emoji: "⚡",
  headerTitle: "ジャバスクリプトのぼうけん",
  language: "JavaScript",
  storageKeyPrefix: "jsodessey",
};

export default function JSOdesseyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <AppConfigProvider config={jsodesseyConfig}>
        <JsRunnerProvider>{children}</JsRunnerProvider>
      </AppConfigProvider>
    </ErrorBoundary>
  );
}
