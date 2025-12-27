import HomePage from "./home/page";
import "../../public/fonts/georgia/style.css";
import { preload } from "react-dom";

const BOROUGHS = ["manhattan", "brooklyn", "queens", "bronx", "statenisland"];

export default function PublicPage() {
  BOROUGHS.forEach((name) => {
    const optimizedUrl = `/_next/image?url=%2Fmedia%2FboroughBackdrops%2F${name}.jpg&w=3840&q=75`;
    preload(optimizedUrl, { as: "image" });
  });
  return <HomePage />;
}
