import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useNavbarTransparency() {
  const pathname = usePathname();
  const specialPages = ["/", "/about", "/contact"];
  const isSpecialPage = specialPages.includes(pathname);
  const cancelTransition = pathname.startsWith("/stories");

  useEffect(() => {
    const body = document.body;
    
    body.dataset.noTransition !== String(cancelTransition) &&
      (body.dataset.noTransition = String(cancelTransition));
      
    const handleScroll = () => {
      const isTransparent = isSpecialPage && window.scrollY < 150;

      body.dataset.transparent !== String(isTransparent) &&
        (body.dataset.transparent = String(isTransparent));
    };


    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isSpecialPage]);
}
