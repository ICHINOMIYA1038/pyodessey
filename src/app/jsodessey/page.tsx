import { getAllJsLessons } from "@/lib/js-lessons";
import { HomeClient } from "./HomeClient";

const BASE_URL =
  (process.env.SITE_URL ?? "https://nullstead.com") + "/jsodessey";

export default function JSOdesseyHome() {
  const lessons = getAllJsLessons();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "JSOdessey",
        url: BASE_URL,
        description:
          "ブラウザだけでJavaScriptを学べる無料の学習アプリ。冒険しながらプログラミングの基礎から応用まで身につけよう！",
        inLanguage: "ja",
      },
      {
        "@type": "Course",
        name: "JSOdessey - JavaScriptプログラミング入門",
        description:
          "冒険形式で学ぶJavaScriptプログラミングコース。変数・条件分岐から実践的なコードまで。",
        provider: {
          "@type": "Organization",
          name: "JSOdessey",
        },
        educationalLevel: "Beginner",
        programmingLanguage: "JavaScript",
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
