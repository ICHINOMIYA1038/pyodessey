import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PyodideProvider } from "@/contexts/PyodideContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL =
  process.env.SITE_URL ?? "https://ichinomiya1038.github.io/pyodessey";

const siteName = "PyOdessey";
const defaultDescription =
  "ブラウザだけでPythonを学べる無料の学習アプリ。冒険しながら33のレッスンでプログラミングの基礎から応用まで身につけよう！";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js"
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900 focus:shadow-lg"
        >
          メインコンテンツへスキップ
        </a>
        {/* Mobile blocker */}
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 px-8 text-center md:hidden"
          style={{ background: "var(--surface-0)", color: "var(--text-primary)" }}
        >
          <span className="text-5xl">🖥️</span>
          <h2 className="text-xl font-bold">PCでアクセスしてね！</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            このアプリはコードエディタを使うため、<br />
            パソコンの大きな画面での利用をおすすめします。
          </p>
        </div>
        <ErrorBoundary>
          <PyodideProvider>{children}</PyodideProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
