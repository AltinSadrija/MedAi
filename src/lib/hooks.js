'use client';
import { useState, useEffect } from 'react';
export function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth <= bp); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, [bp]);
  return m;
}
