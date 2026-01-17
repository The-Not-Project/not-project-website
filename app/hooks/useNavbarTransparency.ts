import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useNavbarTransparency() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const body = document.body;

    const handleScroll = () => {
      const isTransparent = isHomePage && window.scrollY < 150;
      
      if (body.dataset.transparent !== String(isTransparent)) {
        body.dataset.transparent = String(isTransparent);
      }
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isHomePage]);
}