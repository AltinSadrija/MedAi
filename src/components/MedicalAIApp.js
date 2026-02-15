'use client';
import { useState } from 'react';
import { Heart, User, Stethoscope, FileText, BarChart2, Settings, LogOut, LayoutDashboard, Menu, X, Bell, Shield, Database, Activity, AlertTriangle, GitBranch, Lock, Pill, ClipboardList } from 'lucide-react';
import { T, fd, AppProvider, useApp } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks';
import { NavItem, MobileNavItem, NotificationPanel, Modal, Toast, LoginScreen, Btn } from '@/components/ui';
import ProviderDashboard from '@/components/ProviderDashboard';
import SymptomChecker from '@/components/SymptomChecker';
import PatientPortal from '@/components/PatientPortal';

function AppContent(){
  const{view,setView,user,logout,showNotif,setShowNotif,unread,setModal}=useApp();
  const[mobSidebar,setMobSidebar]=useState(false);
  const[sidebarOpen,setSidebarOpen]=useState(true);
  const mob=useIsMobile();

  if(view==="login"||!user) return <LoginScreen/>;

  const isP=user.role==="provider";
  // Section 3 services mapped to nav
  const mainNav=isP?[
    {id:"dashboard",label:"Dashboard",icon:LayoutDashboard},
    {id:"symptom",label:"Symptom Checker",icon:Stethoscope},
    {id:"portal",label:"Patient Portal",icon:User},
  ]:[
    {id:"portal",label:"My Health",icon:Heart},
    {id:"symptom",label:"Symptoms",icon:Stethoscope},
  ];

  // Document sections: compliance, security, KPIs, roadmap, risks, audit, drug interactions
  const toolsNav=isP?[
    {id:"drugInteractions",label:"Drug Interactions",icon:Pill,modal:true},
    {id:"auditLog",label:"Audit Log",icon:ClipboardList,modal:true},
    {id:"compliance",label:"Compliance",icon:Shield,modal:true},
    {id:"kpis",label:"KPIs",icon:BarChart2,modal:true},
    {id:"roadmap",label:"Roadmap",icon:GitBranch,modal:true},
    {id:"risks",label:"Risk Management",icon:AlertTriangle,modal:true},
    {id:"security",label:"Security",icon:Lock,modal:true},
    {id:"settings",label:"Settings",icon:Settings,modal:true},
  ]:[
    {id:"settings",label:"Settings",icon:Settings,modal:true},
  ];

  const titles={drugInteractions:"Drug Interaction Database",auditLog:"Immutable Audit Log",compliance:"Regulatory Compliance",kpis:"Key Performance Indicators",roadmap:"Implementation Roadmap (20 Months)",risks:"Risk Management Matrix",security:"Security Architecture",settings:"Settings"};

  const handleNav=id=>{
    const item=[...mainNav,...toolsNav].find(n=>n.id===id);
    if(item?.modal){setModal({type:id,title:titles[id]||id});setMobSidebar(false);return}
    setView(id);setMobSidebar(false);
  };

  const sidebar=(open,closeFn)=><>
    <div style={{padding:open?"18px 18px 14px":"18px 14px 14px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
      <div onClick={closeFn||(() => setSidebarOpen(!sidebarOpen))} style={{width:38,height:38,borderRadius:12,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}><Heart size={18} color="#fff"/></div>
      {open&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}><div style={{fontFamily:fd,fontWeight:700,fontSize:16}}>MedAI</div><div style={{fontSize:10,color:T.textDim,letterSpacing:.5,textTransform:"uppercase"}}>v1.0 · Feb 2026</div></div>}
    </div>
    <div style={{padding:open?"14px 12px":"14px 10px",flex:1,overflowY:"auto"}}>
      {open&&<div style={{fontSize:10,color:T.textDim,textTransform:"uppercase",letterSpacing:1.5,padding:"0 8px 8px",fontWeight:600}}>Services</div>}
      <div style={{display:"flex",flexDirection:"column",gap:3}}>
        {mainNav.map(n=>open?<NavItem key={n.id} icon={n.icon} label={n.label} active={view===n.id} onClick={()=>handleNav(n.id)} badge={n.id==="dashboard"?unread:0}/>:
          <button key={n.id} onClick={()=>handleNav(n.id)} title={n.label} style={{width:42,height:42,borderRadius:10,border:"none",cursor:"pointer",background:view===n.id?`${T.primary}15`:"transparent",color:view===n.id?T.primary:T.textDim,display:"flex",alignItems:"center",justifyContent:"center",margin:"2px auto"}}><n.icon size={20}/></button>
        )}
      </div>
      {open&&<>
        <div style={{fontSize:10,color:T.textDim,textTransform:"uppercase",letterSpacing:1.5,padding:"18px 8px 8px",fontWeight:600}}>{isP?"Architecture":"Tools"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          {toolsNav.map(n=><NavItem key={n.id} icon={n.icon} label={n.label} active={false} onClick={()=>handleNav(n.id)}/>)}
        </div>
      </>}
    </div>
    {open&&<div style={{padding:"12px 14px",borderTop:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:34,height:34,borderRadius:8,background:isP?T.g1:T.g2,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{user.initials}</span></div>
      <div style={{flex:1,overflow:"hidden"}}><div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user.name}</div><div style={{fontSize:11,color:T.textDim}}>{isP?user.specialty:"Patient"}</div></div>
      <button onClick={logout} style={{background:"none",border:"none",cursor:"pointer",color:T.textDim}}><LogOut size={16}/></button>
    </div>}
  </>;

  if(mob) return <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100%",background:T.bg}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:`1px solid ${T.border}`,background:T.surface,flexShrink:0,zIndex:30}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setMobSidebar(true)} style={{background:"none",border:"none",color:T.text,cursor:"pointer",padding:4}}><Menu size={22}/></button>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:30,height:30,borderRadius:8,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={14} color="#fff"/></div><span style={{fontFamily:fd,fontWeight:700,fontSize:16}}>MedAI</span></div>
      </div>
      <button onClick={()=>setShowNotif(true)} style={{background:"none",border:"none",color:T.textMuted,cursor:"pointer",padding:4,position:"relative"}}><Bell size={20}/>{unread>0&&<span style={{position:"absolute",top:2,right:2,width:8,height:8,borderRadius:"50%",background:T.danger}}/>}</button>
    </div>
    {mobSidebar&&<><div onClick={()=>setMobSidebar(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:40}}/><div className="animate-slide-left" style={{position:"fixed",top:0,left:0,bottom:0,width:280,background:T.surface,borderRight:`1px solid ${T.border}`,zIndex:50,display:"flex",flexDirection:"column"}}>
      {sidebar(true,()=>setMobSidebar(false))}
    </div></>}
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      {view==="dashboard"&&isP&&<ProviderDashboard/>}
      {view==="symptom"&&<SymptomChecker/>}
      {(view==="portal")&&<PatientPortal/>}
    </div>
    <div style={{display:"flex",background:T.surface,borderTop:`1px solid ${T.border}`,padding:"4px 6px",paddingBottom:"max(4px,env(safe-area-inset-bottom))",flexShrink:0,zIndex:30}}>
      {mainNav.map(n=><MobileNavItem key={n.id} icon={n.icon} label={n.label} active={view===n.id} onClick={()=>handleNav(n.id)} badge={n.id==="dashboard"?unread:0}/>)}
      <MobileNavItem icon={Settings} label="More" active={false} onClick={()=>setMobSidebar(true)}/>
    </div>
    <NotificationPanel/><Modal/><Toast/>
  </div>;

  return <div style={{display:"flex",height:"100vh",width:"100%",overflow:"hidden",background:T.bg}}>
    <div style={{width:sidebarOpen?260:72,minWidth:sidebarOpen?260:72,background:T.surface,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",transition:"width .25s,min-width .25s",overflow:"hidden"}}>
      {sidebar(sidebarOpen)}
    </div>
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",position:"relative"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"10px 24px",borderBottom:`1px solid ${T.border}`,background:T.surface,flexShrink:0,gap:10}}>
        <button onClick={()=>setShowNotif(true)} style={{background:"none",border:"none",cursor:"pointer",color:T.textMuted,position:"relative",padding:4}}><Bell size={20}/>{unread>0&&<span style={{position:"absolute",top:2,right:2,width:8,height:8,borderRadius:"50%",background:T.danger}}/>}</button>
      </div>
      <div style={{flex:1,overflow:"hidden"}}>
        {view==="dashboard"&&isP&&<ProviderDashboard/>}
        {view==="symptom"&&<SymptomChecker/>}
        {view==="portal"&&<PatientPortal/>}
      </div>
    </div>
    <NotificationPanel/><Modal/><Toast/>
  </div>;
}

export default function MedicalAIApp(){return <AppProvider><AppContent/></AppProvider>}
