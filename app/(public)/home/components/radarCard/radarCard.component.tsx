import { getRadarStory } from "@/app/database/repositories/radar.repository";
import RadarCardClient from "./components/radarCardClient.component"

export default async function RadarCard() {
  const radarStory = await getRadarStory();

  if (!radarStory) return null;

  return <RadarCardClient radarStory={radarStory} />;
}