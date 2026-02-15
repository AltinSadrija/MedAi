'use client';
import { useState } from 'react';
import { T, fd, fm, useApp } from '@/lib/constants';
import { X, Check, Bell, Clock, AlertTriangle, CheckCircle, Info, Calendar, User, LogOut, Shield, Stethoscope } from 'lucide-react';
import { useIsMobile } from '@/lib/hooks';

// ===== BASIC UI =====
export function Badge({ children, color = T.primary, small }) {
  return <span style={{ display:"inline-flex",alignItems:"center",padding:small?"2px 7px":"3px 10px",borderRadius:20,fontSize:small?10:11,fontWeight:600,letterSpacing:.5,background:`${color}22`,color,textTransform:"uppercase",whiteSpace:"nowrap" }}>{children}</span>;
}
export function RiskBadge({ risk }) {
  return <Badge color={{low:T.accent,medium:T.warning,high:T.danger}[risk]}>{risk}</Badge>;
}
export function StatCard({ icon:Icon, label, value, trend, color=T.primary, delay=0, compact }) {
  return (
    <div className="animate-in" style={{ animationDelay:`${delay}ms`,background:T.card,borderRadius:compact?12:16,padding:compact?"14px 16px":"20px 22px",border:`1px solid ${T.border}`,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:0,right:0,width:60,height:60,background:`${color}08`,borderRadius:"0 0 0 60px" }}/>
      <div style={{ display:"flex",alignItems:"center",gap:compact?8:12,marginBottom:compact?8:12 }}>
        <div style={{ width:compact?32:40,height:compact?32:40,borderRadius:compact?8:12,background:`${color}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <Icon size={compact?16:20} color={color}/>
        </div>
        <span style={{ fontSize:compact?11:13,color:T.textMuted,fontWeight:500 }}>{label}</span>
      </div>
      <div style={{ fontSize:compact?22:28,fontWeight:700,fontFamily:fd,color:T.text }}>{value}</div>
      {trend && <div style={{ fontSize:compact?11:12,color:trend.startsWith("+")?T.accent:T.textMuted,marginTop:4,fontWeight:500 }}>{trend}</div>}
    </div>
  );
}
export function NavItem({ icon:Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{ display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 16px",borderRadius:12,border:"none",cursor:"pointer",background:active?`${T.primary}15`:"transparent",color:active?T.primary:T.textMuted,transition:"all .2s",fontSize:14,fontWeight:active?600:400 }}>
      <Icon size={19}/><span>{label}</span>
      {badge && <span style={{ marginLeft:"auto",background:T.danger,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10,minWidth:18,textAlign:"center" }}>{badge}</span>}
    </button>
  );
}
export function MobileNavItem({ icon:Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 4px",borderRadius:10,border:"none",cursor:"pointer",background:active?`${T.primary}12`:"transparent",color:active?T.primary:T.textDim,position:"relative" }}>
      <Icon size={20}/>
      <span style={{ fontSize:10,fontWeight:active?600:400 }}>{label}</span>
      {badge>0 && <span style={{ position:"absolute",top:4,right:"calc(50% - 16px)",width:8,height:8,borderRadius:"50%",background:T.danger }}/>}
    </button>
  );
}
export function CardSection({ title, icon:Icon, iconColor, rightContent, children, noPadBody }) {
  return (
    <div className="animate-in" style={{ background:T.card,borderRadius:16,border:`1px solid ${T.border}`,overflow:"hidden" }}>
      <div style={{ padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,minWidth:0 }}>
          {Icon && <Icon size={18} color={iconColor||T.primary} style={{ flexShrink:0 }}/>}
          <span style={{ fontFamily:fd,fontWeight:600,fontSize:15,whiteSpace:"nowrap" }}>{title}</span>
        </div>
        {rightContent}
      </div>
      {noPadBody ? children : <div style={{ padding:"14px 18px" }}>{children}</div>}
    </div>
  );
}
export function Btn({ children, onClick, variant="primary", full, small, style:s={} }) {
  const base = { padding:small?"8px 14px":"12px 20px",borderRadius:small?10:12,border:"none",cursor:"pointer",fontWeight:600,fontSize:small?12:14,display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .15s",width:full?"100%":undefined,...s };
  if (variant==="primary") return <button onClick={onClick} style={{ ...base,background:T.g1,color:"#fff" }}>{children}</button>;
  if (variant==="secondary") return <button onClick={onClick} style={{ ...base,background:"transparent",border:`1px solid ${T.border}`,color:T.text }}>{children}</button>;
  if (variant==="danger") return <button onClick={onClick} style={{ ...base,background:`${T.danger}15`,color:T.danger,border:`1px solid ${T.danger}30` }}>{children}</button>;
  if (variant==="accent") return <button onClick={onClick} style={{ ...base,background:T.g2,color:"#fff" }}>{children}</button>;
  return <button onClick={onClick} style={base}>{children}</button>;
}

// ===== TOAST =====
export function Toast() {
  const { toastMsg } = useApp();
  if (!toastMsg) return null;
  return (
    <div className="animate-in" style={{ position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:T.accent,color:"#fff",padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,zIndex:100,display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 32px rgba(0,0,0,.4)" }}>
      <Check size={16}/>{toastMsg}
    </div>
  );
}

// ===== NOTIFICATION PANEL =====
export function NotificationPanel() {
  const { notifications, showNotif, setShowNotif, markNotifRead, markAllRead } = useApp();
  const isMobile = useIsMobile();
  if (!showNotif) return null;
  const icons = { critical: AlertTriangle, warning: AlertTriangle, info: Info };
  const colors = { critical: T.danger, warning: T.warning, info: T.primary };
  return (
    <>
      <div onClick={() => setShowNotif(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:60 }}/>
      <div className="animate-in" style={{ position:"fixed",top:isMobile?56:0,right:0,width:isMobile?"100%":380,maxHeight:isMobile?"calc(100vh - 56px)":"100vh",background:T.surface,borderLeft:isMobile?"none":`1px solid ${T.border}`,zIndex:65,display:"flex",flexDirection:"column",boxShadow:"-4px 0 24px rgba(0,0,0,.3)" }}>
        <div style={{ padding:"16px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <Bell size={18} color={T.warning}/>
            <span style={{ fontFamily:fd,fontWeight:600,fontSize:16 }}>Notifications</span>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            <button onClick={markAllRead} style={{ background:"none",border:"none",color:T.primary,fontSize:12,fontWeight:600,cursor:"pointer" }}>Mark all read</button>
            <button onClick={() => setShowNotif(false)} style={{ background:"none",border:"none",color:T.textDim,cursor:"pointer" }}><X size={20}/></button>
          </div>
        </div>
        <div style={{ flex:1,overflowY:"auto" }}>
          {notifications.map(n => {
            const Ic = icons[n.type];
            return (
              <div key={n.id} onClick={() => markNotifRead(n.id)} style={{ padding:"14px 20px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:n.read?"transparent":`${colors[n.type]}06`,transition:"background .15s" }}>
                <div style={{ display:"flex",gap:10,alignItems:"flex-start" }}>
                  <div style={{ width:32,height:32,borderRadius:8,background:`${colors[n.type]}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
                    <Ic size={16} color={colors[n.type]}/>
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <p style={{ fontSize:13,lineHeight:1.5,color:T.text,fontWeight:n.read?400:500 }}>{n.msg}</p>
                    <p style={{ fontSize:12,color:T.textDim,marginTop:4 }}>
                      <Clock size={11} style={{ verticalAlign:-1,marginRight:4 }}/>{n.time}
                    </p>
                    {n.action && <p style={{ fontSize:12,color:T.primary,marginTop:6,fontWeight:500 }}>→ {n.action}</p>}
                  </div>
                  {!n.read && <div style={{ width:8,height:8,borderRadius:"50%",background:colors[n.type],flexShrink:0,marginTop:6 }}/>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ===== MODAL =====
export function Modal() {
  const { modal, setModal, reschedulePatientAppt, addPatientAppt, cancelAppt, confirmAppt } = useApp();
  const isMobile = useIsMobile();
  if (!modal) return null;
  const close = () => setModal(null);
  return (
    <>
      <div onClick={close} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:70 }}/>
      <div className="animate-scale" style={{ position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:isMobile?"calc(100% - 32px)":480,maxHeight:"80vh",overflowY:"auto",background:T.card,borderRadius:20,border:`1px solid ${T.border}`,zIndex:75,boxShadow:"0 20px 60px rgba(0,0,0,.5)" }}>
        <div style={{ padding:"18px 22px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <span style={{ fontFamily:fd,fontWeight:600,fontSize:16 }}>{modal.title}</span>
          <button onClick={close} style={{ background:"none",border:"none",color:T.textDim,cursor:"pointer" }}><X size={20}/></button>
        </div>
        <div style={{ padding:"20px 22px" }}>
          {/* Patient Detail Modal */}
          {modal.type === "patientDetail" && modal.data && (
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                {[["Email",modal.data.email],["Phone",modal.data.phone],["Insurance",modal.data.insurance],["Allergies",modal.data.allergies?.join(", ")||"None"]].map(([l,v],i) => (
                  <div key={i} style={{ background:T.surface,borderRadius:10,padding:12,border:`1px solid ${T.border}` }}>
                    <div style={{ fontSize:11,color:T.textDim,marginBottom:4 }}>{l}</div>
                    <div style={{ fontSize:13,fontWeight:500 }}>{v}</div>
                  </div>
                ))}
              </div>
              <Btn onClick={close} full>Close</Btn>
            </div>
          )}
          {/* Appointment Detail Modal */}
          {modal.type === "apptDetail" && modal.data && (
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div style={{ background:T.surface,borderRadius:12,padding:16,border:`1px solid ${T.border}` }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                  {[["Patient",modal.data.patient],["Time",modal.data.time],["Type",modal.data.type],["Duration",modal.data.duration],["Status",modal.data.status]].map(([l,v],i) => (
                    <div key={i}><div style={{ fontSize:11,color:T.textDim }}>{l}</div><div style={{ fontSize:13,fontWeight:500,marginTop:2 }}>{v}</div></div>
                  ))}
                </div>
                {modal.data.notes && <div style={{ marginTop:12,padding:10,background:`${T.primary}08`,borderRadius:8,fontSize:12,color:T.textMuted }}><strong>Notes:</strong> {modal.data.notes}</div>}
              </div>
              <div style={{ display:"flex",gap:10 }}>
                {modal.data.status !== "cancelled" && <Btn variant="danger" full onClick={() => { cancelAppt(modal.data.id); close(); }}>Cancel</Btn>}
                {modal.data.status === "pending" && <Btn full onClick={() => { confirmAppt(modal.data.id); close(); }}>Confirm</Btn>}
                <Btn variant="secondary" full onClick={close}>Close</Btn>
              </div>
            </div>
          )}
          {/* Reschedule Modal */}
          {modal.type === "reschedule" && (
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <p style={{ fontSize:13,color:T.textMuted }}>Select a new date and time for your appointment with {modal.data?.provider}:</p>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                {[["Mar 15, 2026","9:00 AM"],["Mar 15, 2026","11:00 AM"],["Mar 18, 2026","2:00 PM"],["Mar 20, 2026","10:30 AM"]].map(([d,t],i) => (
                  <button key={i} onClick={() => { reschedulePatientAppt(modal.data.id); close(); }} style={{ padding:14,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,cursor:"pointer",textAlign:"left",transition:"all .15s" }}>
                    <div style={{ fontSize:13,fontWeight:600,color:T.text }}>{d}</div>
                    <div style={{ fontSize:12,color:T.textMuted }}>{t}</div>
                  </button>
                ))}
              </div>
              <Btn variant="secondary" full onClick={close}>Cancel</Btn>
            </div>
          )}
          {/* Book Appointment Modal */}
          {modal.type === "bookAppt" && (
            <BookApptForm onBook={(a) => { addPatientAppt(a); close(); }} onCancel={close}/>
          )}
          {/* Lab Detail Modal */}
          {modal.type === "labDetail" && modal.data && (
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                {modal.data.status==="normal" ? <CheckCircle size={20} color={T.accent}/> : <AlertTriangle size={20} color={T.warning}/>}
                <div>
                  <div style={{ fontSize:15,fontWeight:600 }}>{modal.data.test}</div>
                  <div style={{ fontSize:12,color:T.textDim }}>{modal.data.date}</div>
                </div>
              </div>
              <div style={{ background:T.surface,borderRadius:12,padding:16,border:`1px solid ${T.border}` }}>
                <div style={{ fontSize:12,color:T.textDim,marginBottom:4 }}>Result</div>
                <div style={{ fontSize:14,fontWeight:500,color:modal.data.status==="normal"?T.accent:T.warning }}>{modal.data.value}</div>
              </div>
              {modal.data.details && <div style={{ background:T.surface,borderRadius:12,padding:16,border:`1px solid ${T.border}` }}>
                <div style={{ fontSize:12,color:T.textDim,marginBottom:4 }}>Details</div>
                <div style={{ fontSize:13,lineHeight:1.6,color:T.textMuted }}>{modal.data.details}</div>
              </div>}
              <Btn variant="secondary" full onClick={close}>Close</Btn>
            </div>
          )}
          {/* Med Detail Modal */}
          {modal.type === "medDetail" && modal.data && (
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div style={{ background:T.surface,borderRadius:12,padding:16,border:`1px solid ${T.border}` }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                  {[["Schedule",modal.data.schedule],["Status",modal.data.status],["Prescriber",modal.data.prescriber],["Refill",modal.data.refillDate]].map(([l,v],i) => (
                    <div key={i}><div style={{ fontSize:11,color:T.textDim }}>{l}</div><div style={{ fontSize:13,fontWeight:500,marginTop:2,textTransform:"capitalize" }}>{v}</div></div>
                  ))}
                </div>
                {modal.data.sideEffects && <div style={{ marginTop:12,fontSize:12,color:T.textMuted }}><strong>Side effects:</strong> {modal.data.sideEffects}</div>}
              </div>
              <Btn variant="secondary" full onClick={close}>Close</Btn>
            </div>
          )}
          {/* Settings Modal */}
          {modal.type === "settings" && (
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {["Email Notifications","SMS Alerts","Dark Mode","AI Recommendations","Data Sharing with Care Team"].map((s,i) => (
                <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<4?`1px solid ${T.border}`:"none" }}>
                  <span style={{ fontSize:14 }}>{s}</span>
                  <ToggleSwitch defaultOn={i<3}/>
                </div>
              ))}
              <Btn variant="secondary" full onClick={close}>Close</Btn>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ToggleSwitch({ defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} style={{ width:44,height:24,borderRadius:12,border:"none",cursor:"pointer",background:on?T.accent:T.border,position:"relative",transition:"background .2s" }}>
      <div style={{ width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:2,left:on?22:2,transition:"left .2s" }}/>
    </button>
  );
}

function BookApptForm({ onBook, onCancel }) {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const types = ["General Checkup","Follow-up","Lab Work","Specialist Referral","Telehealth"];
  const times = ["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM"];
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
      <div>
        <label style={{ fontSize:12,color:T.textMuted,display:"block",marginBottom:6 }}>Appointment Type</label>
        <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
          {types.map(t => (
            <button key={t} onClick={() => setType(t)} style={{ padding:"7px 14px",borderRadius:10,border:`1px solid ${type===t?T.primary:T.border}`,background:type===t?`${T.primary}15`:"transparent",color:type===t?T.primary:T.textMuted,fontSize:12,cursor:"pointer" }}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <label style={{ fontSize:12,color:T.textMuted,display:"block",marginBottom:6 }}>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.surface,color:T.text,fontSize:14,outline:"none" }}/>
      </div>
      <div>
        <label style={{ fontSize:12,color:T.textMuted,display:"block",marginBottom:6 }}>Time</label>
        <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
          {times.map(t => (
            <button key={t} onClick={() => setTime(t)} style={{ padding:"7px 14px",borderRadius:10,border:`1px solid ${time===t?T.primary:T.border}`,background:time===t?`${T.primary}15`:"transparent",color:time===t?T.primary:T.textMuted,fontSize:12,cursor:"pointer" }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex",gap:10 }}>
        <Btn variant="secondary" full onClick={onCancel}>Cancel</Btn>
        <Btn full onClick={() => { if(type&&date&&time) onBook({ type, date, time, provider:"Dr. Martinez", location:"Main Clinic" }); }}>Book</Btn>
      </div>
    </div>
  );
}

// ===== LOGIN SCREEN =====
export function LoginScreen() {
  const { login } = useApp();
  const isMobile = useIsMobile();
  return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg,padding:16 }}>
      <div className="animate-scale" style={{ background:T.card,borderRadius:24,padding:isMobile?28:40,maxWidth:440,width:"100%",border:`1px solid ${T.border}`,textAlign:"center" }}>
        <div style={{ width:64,height:64,borderRadius:18,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
          <Shield size={30} color="#fff"/>
        </div>
        <h1 style={{ fontFamily:fd,fontSize:isMobile?24:28,fontWeight:700,marginBottom:6 }}>MedAI</h1>
        <p style={{ color:T.textMuted,fontSize:14,marginBottom:28 }}>Medical AI Assistant</p>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <button onClick={() => login("provider")} style={{ display:"flex",alignItems:"center",gap:14,width:"100%",padding:"16px 20px",borderRadius:14,border:`1px solid ${T.border}`,background:T.surface,cursor:"pointer",transition:"all .15s",textAlign:"left" }}>
            <div style={{ width:44,height:44,borderRadius:12,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Stethoscope size={22} color="#fff"/></div>
            <div><div style={{ fontSize:15,fontWeight:600,color:T.text }}>Provider Login</div><div style={{ fontSize:12,color:T.textDim }}>Dr. Martinez — Internal Medicine</div></div>
          </button>
          <button onClick={() => login("patient")} style={{ display:"flex",alignItems:"center",gap:14,width:"100%",padding:"16px 20px",borderRadius:14,border:`1px solid ${T.border}`,background:T.surface,cursor:"pointer",transition:"all .15s",textAlign:"left" }}>
            <div style={{ width:44,height:44,borderRadius:12,background:T.g2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><User size={22} color="#fff"/></div>
            <div><div style={{ fontSize:15,fontWeight:600,color:T.text }}>Patient Login</div><div style={{ fontSize:12,color:T.textDim }}>Alex Johnson — Patient Portal</div></div>
          </button>
        </div>
        <p style={{ fontSize:11,color:T.textDim,marginTop:20 }}>HIPAA-compliant · End-to-end encrypted · SOC 2 certified</p>
      </div>
    </div>
  );
}


