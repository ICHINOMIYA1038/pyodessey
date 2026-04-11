import type { Metadata } from "next";
import { PyodideProvider } from "@/contexts/PyodideContext";
import { AppConfigProvider, AppConfig } from "@/contexts/AppConfigContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

const BASE_URL =
  process.env.SITE_URL ?? "https://nullstead.com";

const siteName = "PyOdessey";
const defaultDescription =
  "ブラウザだけでPythonを学べる無料の学習アプリ。冒険しながら33のレッスンでプログラミングの基礎から応用まで身につけよう！";

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}/pyodessey`),
  title: {
    default: `${siteName} - 冒険しながら学ぶPythonプログラミング`,
    template: `%s - ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    siteName,
    locale: "ja_JP",
    title: `${siteName} - 冒険しながら学ぶPythonプログラミング`,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - 冒険しながら学ぶPythonプログラミング`,
    description: defaultDescription,
  },
};

const pyodesseyConfig: AppConfig = {
  prefix: "/pyodessey",
  name: "PyOdessey",
  emoji: "🐍",
  headerTitle: "パイソンのぼうけん",
  language: "Python",
  storageKeyPrefix: "pyodessey",
};

export default function PyOdesseyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js"
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <ErrorBoundary>
        <AppConfigProvider config={pyodesseyConfig}>
          <PyodideProvider>{children}</PyodideProvider>
        </AppConfigProvider>
      </ErrorBoundary>
    </>
  );
}
