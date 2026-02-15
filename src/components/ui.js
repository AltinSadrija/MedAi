'use client';
import { useState } from 'react';
import { T, fd, fm, useApp, CONSENT_TYPES, DRUG_INTERACTIONS, AUDIT_LOG, COMPLIANCE_STATUS, KPIS, PHASES, RISKS, SECURITY } from '@/lib/constants';
import { X, Check, Bell, Clock, AlertTriangle, CheckCircle, Info, User, LogOut, Shield, Stethoscope, Activity, FileText, Database, Lock, BarChart2, GitBranch } from 'lucide-react';
import { useIsMobile } from '@/lib/hooks';

export function Badge({children,color=T.primary,small}){return <span style={{display:"inline-flex",alignItems:"center",padding:small?"2px 7px":"3px 10px",borderRadius:20,fontSize:small?10:11,fontWeight:600,letterSpacing:.5,background:`${color}22`,color,textTransform:"uppercase",whiteSpace:"nowrap"}}>{children}</span>}
export function RiskBadge({risk}){return <Badge color={{low:T.accent,medium:T.warning,high:T.danger}[risk]}>{risk}</Badge>}
export function StatCard({icon:I,label,value,trend,color=T.primary,delay=0,compact}){
  return <div className="animate-in" style={{animationDelay:`${delay}ms`,background:T.card,borderRadius:compact?12:16,padding:compact?"14px 16px":"20px 22px",border:`1px solid ${T.border}`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,right:0,width:60,height:60,background:`${color}08`,borderRadius:"0 0 0 60px"}}/>
    <div style={{display:"flex",alignItems:"center",gap:compact?8:12,marginBottom:compact?8:12}}>
      <div style={{width:compact?32:40,height:compact?32:40,borderRadius:compact?8:12,background:`${color}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={compact?16:20} color={color}/></div>
      <span style={{fontSize:compact?11:13,color:T.textMuted,fontWeight:500}}>{label}</span>
    </div>
    <div style={{fontSize:compact?22:28,fontWeight:700,fontFamily:fd,color:T.text}}>{value}</div>
    {trend&&<div style={{fontSize:compact?11:12,color:trend.startsWith("+")?T.accent:T.textMuted,marginTop:4,fontWeight:500}}>{trend}</div>}
  </div>
}
export function NavItem({icon:I,label,active,onClick,badge}){
  return <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 16px",borderRadius:12,border:"none",cursor:"pointer",background:active?`${T.primary}15`:"transparent",color:active?T.primary:T.textMuted,fontSize:14,fontWeight:active?600:400}}>
    <I size={19}/><span>{label}</span>{badge>0&&<span style={{marginLeft:"auto",background:T.danger,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10}}>{badge}</span>}
  </button>
}
export function MobileNavItem({icon:I,label,active,onClick,badge}){
  return <button onClick={onClick} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 4px",borderRadius:10,border:"none",cursor:"pointer",background:active?`${T.primary}12`:"transparent",color:active?T.primary:T.textDim,position:"relative"}}>
    <I size={20}/><span style={{fontSize:10,fontWeight:active?600:400}}>{label}</span>
    {badge>0&&<span style={{position:"absolute",top:4,right:"calc(50% - 16px)",width:8,height:8,borderRadius:"50%",background:T.danger}}/>}
  </button>
}
export function CardSection({title,icon:I,iconColor,rightContent,children,noPadBody}){
  return <div className="animate-in" style={{background:T.card,borderRadius:16,border:`1px solid ${T.border}`,overflow:"hidden"}}>
    <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>{I&&<I size={18} color={iconColor||T.primary} style={{flexShrink:0}}/>}<span style={{fontFamily:fd,fontWeight:600,fontSize:15,whiteSpace:"nowrap"}}>{title}</span></div>
      {rightContent}
    </div>
    {noPadBody?children:<div style={{padding:"14px 18px"}}>{children}</div>}
  </div>
}
export function Btn({children,onClick,variant="primary",full,small,style:s={}}){
  const b={padding:small?"8px 14px":"12px 20px",borderRadius:small?10:12,border:"none",cursor:"pointer",fontWeight:600,fontSize:small?12:14,display:"flex",alignItems:"center",justifyContent:"center",gap:6,width:full?"100%":undefined,...s};
  const v={primary:{background:T.g1,color:"#fff"},secondary:{background:"transparent",border:`1px solid ${T.border}`,color:T.text},danger:{background:`${T.danger}15`,color:T.danger,border:`1px solid ${T.danger}30`},accent:{background:T.g2,color:"#fff"}};
  return <button onClick={onClick} style={{...b,...(v[variant]||{})}}>{children}</button>
}
export function Toast(){const{toastMsg}=useApp();if(!toastMsg)return null;return <div className="animate-in" style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:T.accent,color:"#fff",padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,zIndex:100,display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 32px rgba(0,0,0,.4)"}}><Check size={16}/>{toastMsg}</div>}

// ===== NOTIFICATION PANEL =====
export function NotificationPanel(){
  const{notifs,showNotif,setShowNotif,markRead,markAllRead}=useApp();const mob=useIsMobile();
  if(!showNotif)return null;
  const icons={critical:AlertTriangle,warning:AlertTriangle,info:Info};const colors={critical:T.danger,warning:T.warning,info:T.primary};
  return <>
    <div onClick={()=>setShowNotif(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:60}}/>
    <div className="animate-in" style={{position:"fixed",top:mob?56:0,right:0,width:mob?"100%":400,maxHeight:mob?"calc(100vh - 56px)":"100vh",background:T.surface,borderLeft:mob?"none":`1px solid ${T.border}`,zIndex:65,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><Bell size={18} color={T.warning}/><span style={{fontFamily:fd,fontWeight:600,fontSize:16}}>Notifications</span></div>
        <div style={{display:"flex",gap:8}}><button onClick={markAllRead} style={{background:"none",border:"none",color:T.primary,fontSize:12,fontWeight:600,cursor:"pointer"}}>Mark all read</button><button onClick={()=>setShowNotif(false)} style={{background:"none",border:"none",color:T.textDim,cursor:"pointer"}}><X size={20}/></button></div>
      </div>
      <div style={{flex:1,overflowY:"auto"}}>{notifs.map(n=>{const Ic=icons[n.type];return <div key={n.id} onClick={()=>markRead(n.id)} style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:n.read?"transparent":`${colors[n.type]}06`}}>
        <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
          <div style={{width:32,height:32,borderRadius:8,background:`${colors[n.type]}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic size={16} color={colors[n.type]}/></div>
          <div style={{flex:1}}>
            <p style={{fontSize:13,lineHeight:1.5,fontWeight:n.read?400:500,color:T.text}}>{n.msg}</p>
            <div style={{display:"flex",gap:12,marginTop:4,flexWrap:"wrap"}}>
              <span style={{fontSize:11,color:T.textDim}}><Clock size={11} style={{verticalAlign:-1,marginRight:3}}/>{n.time}</span>
              <Badge small color={colors[n.type]}>{n.severity}</Badge>
              <span style={{fontSize:11,color:T.textDim}}>via {n.service}</span>
            </div>
            {n.action&&<p style={{fontSize:12,color:T.primary,marginTop:6,fontWeight:500}}>→ {n.action}</p>}
          </div>
          {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:colors[n.type],flexShrink:0,marginTop:6}}/>}
        </div>
      </div>})}</div>
    </div>
  </>
}

// ===== MODAL =====
export function Modal(){
  const{modal,setModal,rescheduleAppt,addAppt,cancelAppt,confirmAppt,toast}=useApp();const mob=useIsMobile();
  if(!modal)return null;const close=()=>setModal(null);
  return <>
    <div onClick={close} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:70}}/>
    <div className="animate-scale" style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:mob?"calc(100% - 32px)":520,maxHeight:"85vh",overflowY:"auto",background:T.card,borderRadius:20,border:`1px solid ${T.border}`,zIndex:75}}>
      <div style={{padding:"16px 22px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:T.card,zIndex:1}}>
        <span style={{fontFamily:fd,fontWeight:600,fontSize:16}}>{modal.title}</span>
        <button onClick={close} style={{background:"none",border:"none",color:T.textDim,cursor:"pointer"}}><X size={20}/></button>
      </div>
      <div style={{padding:"18px 22px"}}>
        {modal.type==="patientDetail"&&modal.data&&<PatientDetailModal p={modal.data} close={close}/>}
        {modal.type==="apptDetail"&&modal.data&&<ApptDetailModal a={modal.data} close={close} cancel={cancelAppt} confirm={confirmAppt}/>}
        {modal.type==="reschedule"&&<RescheduleModal data={modal.data} close={close} reschedule={rescheduleAppt}/>}
        {modal.type==="bookAppt"&&<BookApptModal close={close} add={addAppt}/>}
        {modal.type==="labDetail"&&modal.data&&<LabDetailModal l={modal.data} close={close}/>}
        {modal.type==="medDetail"&&modal.data&&<MedDetailModal m={modal.data} close={close}/>}
        {modal.type==="consent"&&modal.data&&<ConsentModal p={modal.data} close={close} toast={toast}/>}
        {modal.type==="drugInteractions"&&<DrugInteractionModal close={close}/>}
        {modal.type==="auditLog"&&<AuditLogModal close={close}/>}
        {modal.type==="compliance"&&<ComplianceModal close={close}/>}
        {modal.type==="kpis"&&<KPIModal close={close}/>}
        {modal.type==="roadmap"&&<RoadmapModal close={close}/>}
        {modal.type==="risks"&&<RiskModal close={close}/>}
        {modal.type==="security"&&<SecurityModal close={close}/>}
        {modal.type==="settings"&&<SettingsModal close={close}/>}
      </div>
    </div>
  </>
}

function InfoGrid({items}){return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{items.map(([l,v],i)=><div key={i} style={{background:T.surface,borderRadius:10,padding:12,border:`1px solid ${T.border}`}}><div style={{fontSize:11,color:T.textDim,marginBottom:3}}>{l}</div><div style={{fontSize:13,fontWeight:500}}>{v}</div></div>)}</div>}

function PatientDetailModal({p,close}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <InfoGrid items={[["DOB",p.dob],["Sex",p.sex],["Phone",p.phone],["Email",p.email],["Insurance",p.insurance],["Allergies",p.allergies?.join(", ")||"None"]]}/>
    <div><div style={{fontSize:12,fontWeight:600,color:T.textMuted,marginBottom:8,textTransform:"uppercase"}}>Care Team</div>
      {p.careTeam?.map((c,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<p.careTeam.length-1?`1px solid ${T.border}`:"none"}}><span style={{fontSize:13}}>{c.name}</span><Badge small color={T.primary}>{c.role}</Badge></div>)}
    </div>
    <div><div style={{fontSize:12,fontWeight:600,color:T.textMuted,marginBottom:8,textTransform:"uppercase"}}>Care Plan</div>
      {p.carePlan?.map((c,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}><CheckCircle size={14} color={T.accent} style={{marginTop:2,flexShrink:0}}/><span style={{fontSize:13,color:T.textMuted}}>{c}</span></div>)}
    </div>
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function ApptDetailModal({a,close,cancel,confirm}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <InfoGrid items={[["Patient",a.patient],["Time",`${a.time} — ${a.endTime}`],["Type",a.type],["Duration",a.duration],["Urgency",a.urgency],["Status",a.status]]}/>
    {a.notes&&<div style={{background:T.surface,borderRadius:10,padding:12,border:`1px solid ${T.border}`,fontSize:13,color:T.textMuted}}><strong>Notes:</strong> {a.notes}</div>}
    <div style={{display:"flex",gap:10}}>
      {a.status!=="cancelled"&&<Btn variant="danger" full onClick={()=>{cancel(a.id);close()}}>Cancel Appt</Btn>}
      {a.status==="pending"&&<Btn full onClick={()=>{confirm(a.id);close()}}>Confirm</Btn>}
      <Btn variant="secondary" full onClick={close}>Close</Btn>
    </div>
  </div>
}
function RescheduleModal({data,close,reschedule}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <p style={{fontSize:13,color:T.textMuted}}>Select a new time for your appointment with {data?.provider}:</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[["Mar 15","9:00 AM"],["Mar 15","11:00 AM"],["Mar 18","2:00 PM"],["Mar 20","10:30 AM"]].map(([d,t],i)=>
      <button key={i} onClick={()=>{reschedule(data.id);close()}} style={{padding:14,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,cursor:"pointer",textAlign:"left"}}><div style={{fontSize:13,fontWeight:600,color:T.text}}>{d}, 2026</div><div style={{fontSize:12,color:T.textMuted}}>{t}</div></button>
    )}</div>
    <Btn variant="secondary" full onClick={close}>Cancel</Btn>
  </div>
}
function BookApptModal({close,add}){
  const[type,setType]=useState("");const[date,setDate]=useState("");const[time,setTime]=useState("");
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div><label style={{fontSize:12,color:T.textMuted,display:"block",marginBottom:6}}>Appointment Type</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["General Checkup","Follow-up","Lab Work","Specialist Referral","Telehealth"].map(t=><button key={t} onClick={()=>setType(t)} style={{padding:"7px 14px",borderRadius:10,border:`1px solid ${type===t?T.primary:T.border}`,background:type===t?`${T.primary}15`:"transparent",color:type===t?T.primary:T.textMuted,fontSize:12,cursor:"pointer"}}>{t}</button>)}</div>
    </div>
    <div><label style={{fontSize:12,color:T.textMuted,display:"block",marginBottom:6}}>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.surface,color:T.text,fontSize:14,outline:"none"}}/></div>
    <div><label style={{fontSize:12,color:T.textMuted,display:"block",marginBottom:6}}>Time</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM"].map(t=><button key={t} onClick={()=>setTime(t)} style={{padding:"7px 14px",borderRadius:10,border:`1px solid ${time===t?T.primary:T.border}`,background:time===t?`${T.primary}15`:"transparent",color:time===t?T.primary:T.textMuted,fontSize:12,cursor:"pointer"}}>{t}</button>)}</div>
    </div>
    <div style={{display:"flex",gap:10}}><Btn variant="secondary" full onClick={close}>Cancel</Btn><Btn full onClick={()=>{if(type&&date&&time)add({type,date,time,provider:"Dr. Martinez",location:"Main Clinic"})}}>Book</Btn></div>
  </div>
}
function LabDetailModal({l,close}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>{l.status==="normal"?<CheckCircle size={20} color={T.accent}/>:l.status==="critical"?<AlertTriangle size={20} color={T.danger}/>:<AlertTriangle size={20} color={T.warning}/>}<div><div style={{fontSize:15,fontWeight:600}}>{l.test}</div><div style={{fontSize:12,color:T.textDim}}>{l.date}</div></div></div>
    <InfoGrid items={[["Result",l.value],["Reference Range",l.ref||"—"],["Status",l.status],["Previous",l.prev||"N/A"]]}/>
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function MedDetailModal({m,close}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <InfoGrid items={[["Dosage",m.dose],["Refill Date",m.refill||"N/A"]]}/>
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function ConsentModal({p,close,toast}){
  const[consents,setConsents]=useState({...p.consents});
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <p style={{fontSize:13,color:T.textMuted}}>Manage consent preferences for {p.name}. Changes take effect within 60 seconds across all services.</p>
    {CONSENT_TYPES.map(c=><div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,background:T.surface,borderRadius:12,border:`1px solid ${T.border}`}}>
      <div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:18}}>{c.icon}</span><div><div style={{fontSize:13,fontWeight:600}}>{c.label}</div><div style={{fontSize:11,color:T.textDim}}>{c.desc}</div></div></div>
      <ToggleSwitch on={consents[c.id]} onChange={v=>setConsents(p=>({...p,[c.id]:v}))}/>
    </div>)}
    <Btn full onClick={()=>{toast("Consent preferences updated");close()}}>Save Changes</Btn>
  </div>
}
function DrugInteractionModal({close}){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    {DRUG_INTERACTIONS.map((d,i)=><div key={i} style={{background:T.surface,borderRadius:12,padding:14,border:`1px solid ${T.border}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:14,fontWeight:600}}>{d.drug1} + {d.drug2}</span><Badge small color={d.severity==="contraindicated"?T.danger:d.severity==="serious"?"#F97316":T.warning}>{d.severity}</Badge></div>
      <p style={{fontSize:12,color:T.textMuted,marginBottom:4}}>{d.effect}</p>
      <p style={{fontSize:12,color:T.accent}}>→ {d.recommendation}</p>
    </div>)}
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function AuditLogModal({close}){
  return <div style={{display:"flex",flexDirection:"column",gap:8}}>
    <p style={{fontSize:12,color:T.textDim,marginBottom:4}}>Immutable audit trail — 7-year retention per HIPAA §164.312(b)</p>
    {AUDIT_LOG.map(a=><div key={a.id} style={{background:T.surface,borderRadius:10,padding:12,border:`1px solid ${T.border}`,fontSize:12}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontWeight:600,color:T.text}}>{a.action}</span><span style={{fontFamily:fm,color:T.textDim,fontSize:10}}>{a.timestamp}</span></div>
      <div style={{color:T.textMuted}}>Actor: {a.actor} · Target: {a.target} · Service: {a.service}</div>
    </div>)}
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function ComplianceModal({close}){
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {COMPLIANCE_STATUS.map((c,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,background:T.surface,borderRadius:10,border:`1px solid ${T.border}`}}>
      <div><div style={{fontSize:14,fontWeight:600}}>{c.reg}</div><div style={{fontSize:11,color:T.textDim}}>Last: {c.lastAudit} · Next: {c.next}</div></div>
      <Badge small color={c.status==="compliant"?T.accent:c.status==="under review"?T.warning:T.primary}>{c.status}</Badge>
    </div>)}
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function KPIModal({close}){
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {KPIS.map((k,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,background:T.surface,borderRadius:10,border:`1px solid ${T.border}`}}>
      <div><div style={{fontSize:13,fontWeight:600}}>{k.name}</div><div style={{fontSize:11,color:T.textDim}}>Target: {k.target} · Freq: {k.freq}</div></div>
      <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,fontFamily:fd,color:k.status==="met"?T.accent:T.warning}}>{k.value}</div><div style={{fontSize:11,color:T.accent}}>{k.trend}</div></div>
    </div>)}
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function RoadmapModal({close}){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    {PHASES.map(p=><div key={p.phase} style={{background:T.surface,borderRadius:12,padding:14,border:`1px solid ${T.border}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div><span style={{fontSize:14,fontWeight:600}}>Phase {p.phase}: {p.name}</span><span style={{fontSize:12,color:T.textDim,marginLeft:8}}>Months {p.months}</span></div><Badge small color={p.status==="complete"?T.accent:p.status==="in-progress"?T.primary:T.textDim}>{p.status}</Badge></div>
      <div style={{background:T.card,borderRadius:6,height:6,marginBottom:10}}><div style={{background:p.progress===100?T.accent:T.primary,height:6,borderRadius:6,width:`${p.progress}%`,transition:"width .5s"}}/></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{p.items.map((it,i)=><span key={i} style={{padding:"4px 10px",borderRadius:8,background:`${T.primary}10`,fontSize:11,color:T.textMuted}}>{it}</span>)}</div>
    </div>)}
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function RiskModal({close}){
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {RISKS.map((r,i)=><div key={i} style={{background:T.surface,borderRadius:10,padding:12,border:`1px solid ${T.border}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:14,fontWeight:600}}>{r.risk}</span><Badge small color={r.severity==="Critical"?T.danger:T.warning}>{r.severity}</Badge></div>
      <p style={{fontSize:12,color:T.textMuted,marginBottom:4}}>{r.mitigation}</p>
      <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:T.textDim}}>Owner: {r.owner}</span><Badge small color={r.status==="mitigated"?T.accent:T.warning}>{r.status}</Badge></div>
    </div>)}
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function SecurityModal({close}){
  const s=SECURITY;
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <InfoGrid items={[["MFA",s.mfaEnforced?"Enforced ✓":"Disabled"],["Encryption (Rest)",s.encryptionAtRest],["Encryption (Transit)",s.encryptionTransit],["Key Rotation",s.keyRotation],["Session (Clinical)",s.sessionTimeout.clinical],["Session (Patient)",s.sessionTimeout.patient],["Last Pen Test",s.lastPenTest],["Active Threats",`${s.activeThreats}`],["Blocked Attempts",`${s.blockedAttempts}`]]}/>
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function SettingsModal({close}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    {["Email Notifications","SMS Alerts","Dark Mode","AI Recommendations","Data Sharing with Care Team","Biometric Login"].map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<5?`1px solid ${T.border}`:"none"}}><span style={{fontSize:14}}>{s}</span><ToggleSwitch on={i<4}/></div>)}
    <Btn variant="secondary" full onClick={close}>Close</Btn>
  </div>
}
function ToggleSwitch({on:init,onChange}){
  const[on,setOn]=useState(init??false);
  return <button onClick={()=>{const v=!on;setOn(v);onChange?.(v)}} style={{width:44,height:24,borderRadius:12,border:"none",cursor:"pointer",background:on?T.accent:T.border,position:"relative",transition:"background .2s"}}><div style={{width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:2,left:on?22:2,transition:"left .2s"}}/></button>
}

// ===== LOGIN =====
export function LoginScreen(){
  const{login}=useApp();const mob=useIsMobile();
  return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg,padding:16}}>
    <div className="animate-scale" style={{background:T.card,borderRadius:24,padding:mob?28:40,maxWidth:480,width:"100%",border:`1px solid ${T.border}`,textAlign:"center"}}>
      <div style={{width:64,height:64,borderRadius:18,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><Shield size={30} color="#fff"/></div>
      <h1 style={{fontFamily:fd,fontSize:mob?24:28,fontWeight:700,marginBottom:4}}>MedAI</h1>
      <p style={{color:T.textDim,fontSize:12,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Medical AI Assistant Platform</p>
      <p style={{color:T.textMuted,fontSize:13,marginBottom:28}}>Intelligent clinical decision support · Patient engagement · HIPAA compliant</p>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <button onClick={()=>login("provider")} style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"16px 20px",borderRadius:14,border:`1px solid ${T.border}`,background:T.surface,cursor:"pointer",textAlign:"left"}}>
          <div style={{width:44,height:44,borderRadius:12,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Stethoscope size={22} color="#fff"/></div>
          <div><div style={{fontSize:15,fontWeight:600,color:T.text}}>Provider Login</div><div style={{fontSize:12,color:T.textDim}}>Dr. Martinez — Internal Medicine</div></div>
        </button>
        <button onClick={()=>login("patient")} style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"16px 20px",borderRadius:14,border:`1px solid ${T.border}`,background:T.surface,cursor:"pointer",textAlign:"left"}}>
          <div style={{width:44,height:44,borderRadius:12,background:T.g2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={22} color="#fff"/></div>
          <div><div style={{fontSize:15,fontWeight:600,color:T.text}}>Patient Login</div><div style={{fontSize:12,color:T.textDim}}>Alex Johnson — Patient Portal</div></div>
        </button>
      </div>
      <div style={{marginTop:24,display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
        {["HIPAA","HITECH","SOC 2","FHIR R4","AES-256"].map(t=><Badge key={t} small color={T.accent}>{t}</Badge>)}
      </div>
    </div>
  </div>
}
