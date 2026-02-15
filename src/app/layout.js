import './globals.css';
export const metadata={title:'MedAI — Medical AI Assistant',description:'AI-powered healthcare platform'};
export const viewport={width:'device-width',initialScale:1,maximumScale:1,viewportFit:'cover',themeColor:'#0A0F1C'};
export default function L({children}){return(<html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/></head><body>{children}</body></html>);}
