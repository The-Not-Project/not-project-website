import { useEffect } from "react";

export default function useHeaderScroll(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const handleScroll = () => {
      video.style.transform = `translate3d(0, ${window.scrollY * 0.5}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);
}