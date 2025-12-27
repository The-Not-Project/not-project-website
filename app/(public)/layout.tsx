import { PublicServerActionsProvider } from "@/app/contexts/public-server-actions";
import NavBar from "./shared/components/navbar/navbar.component";
import Footer from "./shared/components/footer/footer.component";
import { getUser, UpdateUser } from "../database/repositories/user.repository";
import { getCategories } from "../database/repositories/category.repository";
import {
  getStories,
  getStory,
} from "../database/repositories/story.repository";
import { getRecommendations } from "../database/repositories/recommendation.repository";
import { getRadarStory } from "../database/repositories/radar.repository";
import {
  createStorySave,
  deleteStorySave,
  getSavedStories,
  isStorySaved,
} from "../database/repositories/storySaves.repository";
import { createSubscriber } from "../database/repositories/subscriber.repository";
import { preload } from "react-dom";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groupedActions = {
    getUser,
    UpdateUser,
    getStories,
    getStory,
    getRadarStory,
    getRecommendations,
    getCategories,
    getSavedStories,
    createStorySave,
    deleteStorySave,
    isStorySaved,
    createSubscriber,
  };

  preload("/media/output.webm", { as: "video", type: "video/webm" });

  return (
    <PublicServerActionsProvider {...groupedActions}>
      <NavBar />
      {children}
      <Footer />
    </PublicServerActionsProvider>
  );
}
