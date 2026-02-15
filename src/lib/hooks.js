'use client';
import { useState, useEffect } from 'react';
export function useIsMobile(bp=768) { const [m,s]=useState(false); useEffect(()=>{const c=()=>s(window.innerWidth<=bp);c();window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[bp]); return m; }
