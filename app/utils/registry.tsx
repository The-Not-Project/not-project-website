'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useServerInsertedHTML } from 'next/navigation';
import { StyleSheetManager, ServerStyleSheet } from 'styled-components';

/**
 * StyledComponentsRegistry
 * * This component ensures that styled-components are properly rendered and hydrated 
 * in Next.js App Router. It solves the "Flash of Unstyled Content" (FOUC) by 
 * collecting styles during server-side rendering and injecting them into the HTML.
 * * Additionally, it handles scroll restoration logic on client-side navigation.
 */
export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Initialize the ServerStyleSheet once to collect styles during the render lifecycle.
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const pathname = usePathname();

  /**
   * Server-Side Style Injection
   * * useServerInsertedHTML is a Next.js hook that allows us to inject the 
   * collected styles into the <head> of the document during SSR.
   */
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // Clear the tag to prevent duplicate style accumulation in memory.
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  /**
   * Scroll-to-Top Logic
   * * Triggers an immediate (instant) scroll to the top of the page whenever 
   * the URL pathname changes, ensuring a fresh view for the user.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // On the client-side (browser), we simply return the children 
  // as the registry logic is only required during the initial server render.
  if (typeof window !== 'undefined') return <>{children}</>;

  // During SSR, wrap the application in StyleSheetManager to capture all component styles.
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}