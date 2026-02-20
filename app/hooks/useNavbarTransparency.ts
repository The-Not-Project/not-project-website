import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useNavbarTransparency() {
  const pathname = usePathname();
  const transparentPaths = ["/", "/contact", "/about"];
  const isSpecialPage = transparentPaths.includes(pathname);

  useEffect(() => {
    const body = document.body;

    const handleScroll = () => {
      const isTransparent = isSpecialPage && window.scrollY < 150;
      
      if (body.dataset.transparent !== String(isTransparent)) {
        body.dataset.transparent = String(isTransparent);
      }
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isSpecialPage]);
}