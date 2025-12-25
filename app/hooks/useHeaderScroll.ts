"use client";
import { useState, useEffect } from 'react';

export default function useHeaderScroll() {
  const [transparency, setTransparency] = useState(true);
  const [backgroundPosition, setBackgroundPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setTransparency(scrollY <= 150);
      
      setBackgroundPosition(scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { transparency, backgroundPosition };
}
