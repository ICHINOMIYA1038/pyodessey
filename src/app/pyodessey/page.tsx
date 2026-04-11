import { getAllLessons } from "@/lib/lessons";
import { HomeClient } from "./HomeClient";

const BASE_URL =
  (process.env.SITE_URL ?? "https://nullstead.com") + "/pyodessey";

export default function Home() {
  const lessons = getAllLessons();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "PyOdessey",
        url: BASE_URL,
        description:
          "ブラウザだけでPythonを学べる無料の学習アプリ。冒険しながら33のレッスンでプログラミングの基礎から応用まで身につけよう！",
        inLanguage: "ja",
      },
      {
        "@type": "Course",
        name: "PyOdessey - Pythonプログラミング入門",
        description:
          "冒険形式で学ぶPythonプログラミングコース。変数・条件分岐から再帰・動的計画法まで全33レッスン。",
        provider: {
          "@type": "Organization",
          name: "PyOdessey",
        },
        educationalLevel: "Beginner",
        programmingLanguage: "Python",
        inLanguage: "ja",
        isAccessibleForFree: true,
        numberOfLessons: lessons.length,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient lessons={lessons} />
    </>
  );
}
