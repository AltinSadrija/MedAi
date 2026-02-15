'use client';
import { Heart, User, Stethoscope, FileText, BarChart2, Settings, LogOut, LayoutDashboard, Menu, X, Bell } from 'lucide-react';
import { T, fd, AppProvider, useApp } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks';
import { NavItem, MobileNavItem, NotificationPanel, Modal, Toast, LoginScreen } from '@/components/ui';
import ProviderDashboard from '@/components/ProviderDashboard';
import SymptomChecker from '@/components/SymptomChecker';
import PatientPortal from '@/components/PatientPortal';
import { useState } from 'react';

function AppContent() {
  const { view, setView, user, logout, showNotif, setShowNotif, unreadCount, setModal } = useApp();
  const [mobSidebar, setMobSidebar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mob = useIsMobile();

  if (view === "login" || !user) return <LoginScreen />;

  const isProvider = user.role === "provider";
  const navItems = isProvider
    ? [{ id:"dashboard",label:"Dashboard",icon:LayoutDashboard },{ id:"symptom",label:"Symptoms",icon:Stethoscope },{ id:"portal",label:"Portal",icon:User }]
    : [{ id:"portal",label:"My Health",icon:Heart },{ id:"symptom",label:"Symptoms",icon:Stethoscope },{ id:"appointments",label:"Appts",icon:LayoutDashboard }];

  const secNav = [
    { id:"settings",label:"Settings",icon:Settings,action:() => setModal({ type:"settings",title:"Settings" }) },
  ];

  const handleNav = (id) => { if(id==="appointments") setView("portal"); else setView(id); setMobSidebar(false); };

  // ===== MOBILE =====
  if (mob) return (
    <div style={{ display:"flex",flexDirection:"column",height:"100vh",width:"100%",background:T.bg }}>
      {/* Header */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:`1px solid ${T.border}`,background:T.surface,flexShrink:0,zIndex:30 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <button onClick={() => setMobSidebar(true)} style={{ background:"none",border:"none",color:T.text,cursor:"pointer",padding:4 }}><Menu size={22}/></button>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ width:30,height:30,borderRadius:8,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center" }}><Heart size={14} color="#fff"/></div>
            <span style={{ fontFamily:fd,fontWeight:700,fontSize:16 }}>MedAI</span>
          </div>
        </div>
        <button onClick={() => setShowNotif(true)} style={{ background:"none",border:"none",color:T.textMuted,cursor:"pointer",padding:4,position:"relative" }}>
          <Bell size={20}/>{unreadCount>0 && <span style={{ position:"absolute",top:2,right:2,width:8,height:8,borderRadius:"50%",background:T.danger }}/>}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {mobSidebar && <>
        <div onClick={() => setMobSidebar(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:40 }}/>
        <div className="animate-slide-left" style={{ position:"fixed",top:0,left:0,bottom:0,width:280,background:T.surface,borderRight:`1px solid ${T.border}`,zIndex:50,display:"flex",flexDirection:"column" }}>
          <div style={{ padding:"16px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center" }}><Heart size={18} color="#fff"/></div>
              <div><div style={{ fontFamily:fd,fontWeight:700,fontSize:15 }}>MedAI</div><div style={{ fontSize:10,color:T.textDim,textTransform:"uppercase",letterSpacing:.5 }}>Medical Assistant</div></div>
            </div>
            <button onClick={() => setMobSidebar(false)} style={{ background:"none",border:"none",color:T.textDim,cursor:"pointer" }}><X size={20}/></button>
          </div>
          <div style={{ padding:"14px 12px",flex:1 }}>
            <div style={{ fontSize:10,color:T.textDim,textTransform:"uppercase",letterSpacing:1.5,padding:"0 8px 8px",fontWeight:600 }}>Main</div>
            {navItems.map(n => <NavItem key={n.id} icon={n.icon} label={n.label} active={view===n.id} onClick={() => handleNav(n.id)} badge={n.id==="dashboard"&&unreadCount>0?unreadCount:undefined}/>)}
            <div style={{ fontSize:10,color:T.textDim,textTransform:"uppercase",letterSpacing:1.5,padding:"18px 8px 8px",fontWeight:600 }}>Tools</div>
            {secNav.map(n => <NavItem key={n.id} icon={n.icon} label={n.label} active={false} onClick={() => { n.action?.(); setMobSidebar(false); }}/>)}
          </div>
          <div style={{ padding:"12px 14px",borderTop:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:34,height:34,borderRadius:8,background:isProvider?T.g1:T.g2,display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ fontSize:13,fontWeight:700,color:"#fff" }}>{user.initials}</span></div>
            <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:600 }}>{user.name}</div><div style={{ fontSize:11,color:T.textDim }}>{isProvider?user.specialty:"Patient"}</div></div>
            <button onClick={logout} style={{ background:"none",border:"none",cursor:"pointer",color:T.textDim }}><LogOut size={16}/></button>
          </div>
        </div>
      </>}

      {/* Content */}
      <div style={{ flex:1,overflow:"hidden",display:"flex",flexDirection:"column" }}>
        {view==="dashboard" && isProvider && <ProviderDashboard/>}
        {view==="symptom" && <SymptomChecker/>}
        {(view==="portal"||view==="appointments") && <PatientPortal/>}
      </div>

      {/* Bottom Nav */}
      <div style={{ display:"flex",background:T.surface,borderTop:`1px solid ${T.border}`,padding:"4px 6px",paddingBottom:"max(4px,env(safe-area-inset-bottom))",flexShrink:0,zIndex:30 }}>
        {navItems.map(n => <MobileNavItem key={n.id} icon={n.icon} label={n.label} active={view===n.id||(n.id==="appointments"&&view==="portal")} onClick={() => handleNav(n.id)} badge={n.id==="dashboard"?unreadCount:0}/>)}
        <MobileNavItem icon={Settings} label="Settings" active={false} onClick={() => setModal({type:"settings",title:"Settings"})}/>
      </div>

      <NotificationPanel/>
      <Modal/>
      <Toast/>
    </div>
  );

  // ===== DESKTOP =====
  return (
    <div style={{ display:"flex",height:"100vh",width:"100%",overflow:"hidden",background:T.bg }}>
      {/* Sidebar */}
      <div style={{ width:sidebarOpen?260:72,minWidth:sidebarOpen?260:72,background:T.surface,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",transition:"width .25s,min-width .25s",overflow:"hidden" }}>
        <div style={{ padding:sidebarOpen?"18px 18px 14px":"18px 14px 14px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10 }}>
          <div onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width:38,height:38,borderRadius:12,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0 }}><Heart size={18} color="#fff"/></div>
          {sidebarOpen && <div style={{ overflow:"hidden",whiteSpace:"nowrap" }}><div style={{ fontFamily:fd,fontWeight:700,fontSize:16 }}>MedAI</div><div style={{ fontSize:10,color:T.textDim,letterSpacing:.5,textTransform:"uppercase" }}>Medical Assistant</div></div>}
        </div>
        <div style={{ padding:sidebarOpen?"14px 12px":"14px 10px",flex:1 }}>
          {sidebarOpen && <div style={{ fontSize:10,color:T.textDim,textTransform:"uppercase",letterSpacing:1.5,padding:"0 8px 8px",fontWeight:600 }}>Main</div>}
          <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
            {navItems.map(n => sidebarOpen
              ? <NavItem key={n.id} icon={n.icon} label={n.label} active={view===n.id} onClick={() => setView(n.id)} badge={n.id==="dashboard"&&unreadCount>0?unreadCount:undefined}/>
              : <button key={n.id} onClick={() => setView(n.id)} title={n.label} style={{ width:42,height:42,borderRadius:10,border:"none",cursor:"pointer",background:view===n.id?`${T.primary}15`:"transparent",color:view===n.id?T.primary:T.textDim,display:"flex",alignItems:"center",justifyContent:"center",margin:"2px auto" }}><n.icon size={20}/></button>
            )}
          </div>
          {sidebarOpen && <>
            <div style={{ fontSize:10,color:T.textDim,textTransform:"uppercase",letterSpacing:1.5,padding:"18px 8px 8px",fontWeight:600 }}>Tools</div>
            <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
              {secNav.map(n => <NavItem key={n.id} icon={n.icon} label={n.label} active={false} onClick={n.action}/>)}
            </div>
          </>}
        </div>
        {sidebarOpen && (
          <div style={{ padding:"12px 14px",borderTop:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:34,height:34,borderRadius:8,background:isProvider?T.g1:T.g2,display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ fontSize:13,fontWeight:700,color:"#fff" }}>{user.initials}</span></div>
            <div style={{ flex:1,overflow:"hidden" }}><div style={{ fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{user.name}</div><div style={{ fontSize:11,color:T.textDim }}>{isProvider?user.specialty:"Patient"}</div></div>
            <button onClick={logout} style={{ background:"none",border:"none",cursor:"pointer",color:T.textDim }}><LogOut size={16}/></button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex:1,overflow:"hidden",display:"flex",flexDirection:"column",position:"relative" }}>
        {/* Top Bar */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"10px 24px",borderBottom:`1px solid ${T.border}`,background:T.surface,flexShrink:0,gap:10 }}>
          <button onClick={() => setShowNotif(true)} style={{ background:"none",border:"none",cursor:"pointer",color:T.textMuted,position:"relative",padding:4 }}>
            <Bell size={20}/>{unreadCount>0 && <span style={{ position:"absolute",top:2,right:2,width:8,height:8,borderRadius:"50%",background:T.danger }}/>}
          </button>
        </div>
        <div style={{ flex:1,overflow:"hidden" }}>
          {view==="dashboard" && isProvider && <ProviderDashboard/>}
          {view==="symptom" && <SymptomChecker/>}
          {view==="portal" && <PatientPortal/>}
        </div>
      </div>

      <NotificationPanel/>
      <Modal/>
      <Toast/>
    </div>
  );
}

export default function MedicalAIApp() {
  return <AppProvider><AppContent/></AppProvider>;
}
