'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useServerInsertedHTML } from 'next/navigation';
import { StyleSheetManager, ServerStyleSheet } from 'styled-components';

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const pathname = usePathname()


  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname])

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}