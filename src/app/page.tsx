import { getAllLessons } from "@/lib/lessons";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const lessons = getAllLessons();
  return <HomeClient lessons={lessons} />;
}
