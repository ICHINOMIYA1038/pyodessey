import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL =
  process.env.SITE_URL ?? "https://nullstead.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Odessey - 冒険しながら学ぶプログラミング",
    template: "%s",
  },
  description:
    "ブラウザだけでプログラミングを学べる無料の学習アプリ。冒険しながらプログラミングの基礎から応用まで身につけよう！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
        {children}
      </body>
    </html>
  );
}
