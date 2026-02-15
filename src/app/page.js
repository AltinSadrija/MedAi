'use client';
import dynamic from 'next/dynamic';
const App = dynamic(() => import('@/components/App'), { ssr: false,
  loading: () => <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0A0F1C',color:'#F1F5F9',fontFamily:'sans-serif'}}>Loading MedAI...</div>
});
export default function Home() { return <App />; }
