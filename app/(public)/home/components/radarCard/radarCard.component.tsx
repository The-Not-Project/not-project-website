import { getRadarStoryAction } from "@/lib/core-api/actions/radar.actions";
import RadarCardClient from "./components/radarCardClient.component"

export default async function RadarCard() {
  const { story, success } = await getRadarStoryAction();

  if (!story || !success) return null;

  return <RadarCardClient radarStory={story} />;
}