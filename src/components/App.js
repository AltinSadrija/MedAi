'use client';
import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import {
  Heart, User, Stethoscope, Settings, LogOut, LayoutDashboard, Menu, X, Bell, Shield,
  Lock, Pill, Activity, AlertTriangle, CheckCircle, ChevronRight, ChevronDown,
  Search, Calendar, TrendingUp, Thermometer, Users, Zap, Phone, Mail, FileText,
  Brain, Send, Eye, RotateCcw, Home as HomeIcon, ClipboardList, Plus, Download,
  MessageCircle, BarChart2, GitBranch, Info, Clock
} from 'lucide-react';

// ===== THEME =====
const T={bg:"#0A0F1C",sf:"#111827",cd:"#1A2236",bd:"#2A3550",pr:"#3B82F6",ac:"#10B981",wn:"#F59E0B",dg:"#EF4444",tx:"#F1F5F9",tm:"#94A3B8",td:"#64748B",g1:"linear-gradient(135deg,#3B82F6,#8B5CF6)",g2:"linear-gradient(135deg,#10B981,#3B82F6)"};
const fd="'Outfit',sans-serif";
const fm="'JetBrains Mono',monospace";

// ===== DATA =====
const SYMPTOMS=[{id:1,name:"Headache",icon:"🤕"},{id:2,name:"Fever",icon:"🌡️"},{id:3,name:"Cough",icon:"😷"},{id:4,name:"Fatigue",icon:"😴"},{id:5,name:"Chest Pain",icon:"💔"},{id:6,name:"Nausea",icon:"🤢"},{id:7,name:"Shortness of Breath",icon:"😮‍💨"},{id:8,name:"Dizziness",icon:"😵"},{id:9,name:"Back Pain",icon:"🦴"},{id:10,name:"Sore Throat",icon:"🗣️"}];

const PATIENTS=[
  {id:1,name:"Sarah Chen",age:34,dob:"1991-08-15",sex:"F",condition:"Type 2 Diabetes",risk:"medium",vitals:{bp:"128/82",hr:76,temp:"98.4°F",spo2:"98%"},meds:[{name:"Metformin 500mg",dose:"Twice daily",refill:"Mar 1"},{name:"Lisinopril 10mg",dose:"Once daily",refill:"Mar 5"}],allergies:["Penicillin","Sulfa"],insurance:"BlueCross PPO",phone:"(555) 123-4567",email:"sarah.chen@email.com",color:"#3B82F6",careTeam:[{name:"Dr. Martinez",role:"PCP"},{name:"Dr. Patel",role:"Endocrinologist"}],carePlan:["HbA1c target <7%","Daily glucose monitoring","Low-carb diet","30 min exercise 5x/week"],consents:{treatment:true,dataSharing:true,research:false,communication:true,device:true},labs:[{test:"HbA1c",date:"Feb 8",value:"7.2%",status:"attention",ref:"<5.7%",prev:"7.8%"},{test:"Fasting Glucose",date:"Feb 8",value:"138 mg/dL",status:"attention",ref:"70-100"},{test:"Lipid Panel",date:"Feb 5",value:"LDL 118",status:"normal",ref:"<130"},{test:"Creatinine",date:"Feb 5",value:"0.9 mg/dL",status:"normal",ref:"0.6-1.2"}]},
  {id:2,name:"James Wilson",age:67,dob:"1958-03-22",sex:"M",condition:"Hypertension + COPD",risk:"high",vitals:{bp:"152/94",hr:88,temp:"99.1°F",spo2:"93%"},meds:[{name:"Amlodipine 5mg",dose:"Once daily",refill:"Feb 28"},{name:"Tiotropium 18mcg",dose:"Inhaler daily",refill:"Mar 1"},{name:"Albuterol",dose:"PRN",refill:"N/A"}],allergies:["Aspirin"],insurance:"Medicare",phone:"(555) 234-5678",email:"j.wilson@email.com",color:"#EF4444",careTeam:[{name:"Dr. Martinez",role:"PCP"},{name:"Dr. Lung",role:"Pulmonologist"}],carePlan:["BP target <140/90","Daily SpO2 monitoring","Pulmonary rehab 3x/week"],consents:{treatment:true,dataSharing:true,research:true,communication:true,device:true},labs:[{test:"BMP",date:"Feb 10",value:"Within range",status:"normal",ref:"Normal"},{test:"SpO2 Trend",date:"Feb 15",value:"91-93%",status:"critical",ref:">95%"},{test:"Spirometry",date:"Jan 28",value:"FEV1 62%",status:"attention",ref:">80%"}]},
  {id:3,name:"Maria Garcia",age:28,dob:"1997-11-10",sex:"F",condition:"Prenatal Care (28 wks)",risk:"low",vitals:{bp:"118/72",hr:82,temp:"98.6°F",spo2:"99%"},meds:[{name:"Prenatal Vitamins",dose:"Once daily",refill:"Mar 10"},{name:"Iron 325mg",dose:"Once daily",refill:"Mar 10"}],allergies:[],insurance:"Aetna HMO",phone:"(555) 345-6789",email:"maria.g@email.com",color:"#10B981",careTeam:[{name:"Dr. Martinez",role:"OB/GYN"}],carePlan:["Biweekly prenatal visits","Glucose monitoring","Daily fetal kick counts"],consents:{treatment:true,dataSharing:true,research:false,communication:true,device:false},labs:[{test:"CBC",date:"Feb 14",value:"Hgb 11.8",status:"normal",ref:"11-15"},{test:"Glucose Screen",date:"Feb 14",value:"118 mg/dL",status:"normal",ref:"<140"}]},
  {id:4,name:"Robert Kim",age:55,dob:"1970-06-05",sex:"M",condition:"Post-MI Recovery",risk:"high",vitals:{bp:"136/88",hr:72,temp:"98.2°F",spo2:"96%"},meds:[{name:"Aspirin 81mg",dose:"Once daily",refill:"Mar 5"},{name:"Metoprolol 50mg",dose:"Twice daily",refill:"Feb 28"},{name:"Atorvastatin 40mg",dose:"Bedtime",refill:"Mar 1"},{name:"Clopidogrel 75mg",dose:"Once daily",refill:"Mar 1"}],allergies:["Latex","Codeine"],insurance:"UnitedHealth",phone:"(555) 456-7890",email:"r.kim@email.com",color:"#F59E0B",careTeam:[{name:"Dr. Martinez",role:"PCP"},{name:"Dr. Heart",role:"Cardiologist"}],carePlan:["Cardiac rehab 3x/week","LDL target <70","Daily BP/HR monitoring"],consents:{treatment:true,dataSharing:true,research:true,communication:true,device:true},labs:[{test:"Troponin",date:"Feb 8",value:"0.04 ng/mL",status:"normal",ref:"<0.04"},{test:"LDL",date:"Feb 8",value:"82 mg/dL",status:"attention",ref:"<70 post-MI"},{test:"ECG",date:"Feb 8",value:"NSR, old Q-waves",status:"attention",ref:"—"}]},
  {id:5,name:"Emily Brooks",age:42,dob:"1983-12-20",sex:"F",condition:"Anxiety + Insomnia",risk:"low",vitals:{bp:"122/78",hr:68,temp:"98.5°F",spo2:"99%"},meds:[{name:"Sertraline 50mg",dose:"Morning",refill:"Mar 15"},{name:"Melatonin 3mg",dose:"Bedtime PRN",refill:"N/A"}],allergies:["Codeine"],insurance:"Cigna PPO",phone:"(555) 567-8901",email:"emily.b@email.com",color:"#8B5CF6",careTeam:[{name:"Dr. Martinez",role:"PCP"},{name:"Dr. Mind",role:"Psychiatrist"}],carePlan:["CBT biweekly","Sleep hygiene protocol","GAD-7 monthly"],consents:{treatment:true,dataSharing:false,research:false,communication:true,device:false},labs:[{test:"TSH",date:"Feb 11",value:"2.3 mIU/L",status:"normal",ref:"0.4-4.0"},{test:"Vitamin D",date:"Feb 11",value:"28 ng/mL",status:"attention",ref:"30-100"}]},
];

const INIT_ALERTS=[
  {id:1,type:"critical",msg:"James Wilson — SpO2 dropped to 91%. Immediate review recommended.",time:"12 min ago",pid:2,action:"Review vitals, consider O2 supplementation",service:"Chronic Disease Coach"},
  {id:2,type:"warning",msg:"Robert Kim — Missed medication check-in for 2 days. Clopidogrel adherence critical.",time:"1 hr ago",pid:4,action:"Contact patient, verify adherence",service:"Medication Manager"},
  {id:3,type:"info",msg:"Sarah Chen — HbA1c improved 7.8% → 7.2%. Current regimen effective.",time:"3 hrs ago",pid:1,action:"Review results, update care plan",service:"Clinical Decision Support"},
  {id:4,type:"warning",msg:"Drug interaction: Amlodipine + Simvastatin — myopathy risk for James Wilson.",time:"5 hrs ago",pid:2,action:"Evaluate interaction, consider statin switch",service:"Drug Interaction Alerts"},
  {id:5,type:"info",msg:"Maria Garcia — 28-week labs complete. All within normal limits.",time:"6 hrs ago",pid:3,action:"Review at next visit",service:"Post-Visit Follow-Up"},
  {id:6,type:"warning",msg:"Emily Brooks — PHQ-9 score increased from 8 to 12. Monitor closely.",time:"8 hrs ago",pid:5,action:"Consider therapy adjustment",service:"Mental Health Companion"},
];

const INIT_APPTS=[
  {id:1,time:"9:00 AM",patient:"James Wilson",pid:2,type:"COPD Follow-up",status:"confirmed",dur:"30 min",notes:"Review SpO2 trends"},
  {id:2,time:"10:30 AM",patient:"New Patient",pid:null,type:"Initial Consult",status:"confirmed",dur:"45 min",notes:"Full intake"},
  {id:3,time:"11:15 AM",patient:"Sarah Chen",pid:1,type:"Lab Review",status:"pending",dur:"20 min",notes:"HbA1c results review"},
  {id:4,time:"1:00 PM",patient:"Robert Kim",pid:4,type:"Cardiac Rehab",status:"confirmed",dur:"30 min",notes:"Post-MI progress eval"},
  {id:5,time:"2:30 PM",patient:"Emily Brooks",pid:5,type:"Telehealth",status:"confirmed",dur:"25 min",notes:"Anxiety follow-up"},
  {id:6,time:"3:45 PM",patient:"Maria Garcia",pid:3,type:"Prenatal Check",status:"pending",dur:"30 min",notes:"28-week visit"},
];

const CONSENT_TYPES=[{id:"treatment",label:"Treatment Consent",desc:"AI clinical decision support during active care",icon:"🏥"},{id:"dataSharing",label:"Data Sharing",desc:"Share data with labs, pharmacies, specialists",icon:"🔗"},{id:"research",label:"Research Consent",desc:"De-identified data for AI training",icon:"🔬"},{id:"communication",label:"Communication",desc:"SMS, email, phone for reminders",icon:"📱"},{id:"device",label:"Device Integration",desc:"Wearables and connected devices",icon:"⌚"}];

const DRUG_IX=[{d1:"Amlodipine",d2:"Simvastatin",sev:"serious",eff:"Myopathy/rhabdomyolysis risk",rec:"Limit simvastatin to 20mg or switch"},{d1:"Metformin",d2:"Contrast Dye",sev:"serious",eff:"Lactic acidosis risk",rec:"Hold 48hrs before/after contrast"},{d1:"Sertraline",d2:"Tramadol",sev:"contraindicated",eff:"Serotonin syndrome",rec:"Use alternative analgesic"},{d1:"Clopidogrel",d2:"Omeprazole",sev:"moderate",eff:"Reduced antiplatelet effect",rec:"Switch to pantoprazole if PPI needed"}];

const AUDIT=[{ts:"2026-02-15 14:23:01",actor:"Dr. Martinez",act:"Viewed patient record",tgt:"James Wilson",svc:"EHR"},{ts:"2026-02-15 14:20:15",actor:"System",act:"AI alert generated",tgt:"James Wilson — SpO2 < 92%",svc:"Chronic Disease Coach"},{ts:"2026-02-15 13:45:00",actor:"Sarah Chen",act:"Consent updated",tgt:"Research consent revoked",svc:"Consent Management"},{ts:"2026-02-15 12:30:22",actor:"Dr. Martinez",act:"CDS recommendation viewed",tgt:"Robert Kim",svc:"CDS Engine"},{ts:"2026-02-15 11:15:00",actor:"System",act:"Drug interaction flagged",tgt:"Amlodipine+Simvastatin",svc:"Drug Interaction Checker"}];

const COMPLIANCE=[{reg:"HIPAA",st:"compliant",last:"Jan 15, 2026"},{reg:"HITECH",st:"compliant",last:"Jan 15, 2026"},{reg:"FDA CDS",st:"under review",last:"Dec 10, 2025"},{reg:"GDPR",st:"compliant",last:"Nov 20, 2025"},{reg:"42 CFR Part 2",st:"compliant",last:"Jan 5, 2026"},{reg:"TEFCA",st:"in progress",last:"N/A"}];

const KPIS=[{n:"Clinical Accuracy",v:"96.3%",tgt:">95%",tr:"+1.2%",ok:true},{n:"Triage Accuracy",v:"93.8%",tgt:">92%",tr:"+0.5%",ok:true},{n:"Provider Adoption",v:"78%",tgt:">80%",tr:"+6%",ok:false},{n:"Patient Satisfaction",v:"74 NPS",tgt:">70",tr:"+4",ok:true},{n:"Doc Time Savings",v:"42%",tgt:">40%",tr:"+3%",ok:true},{n:"Consent Compliance",v:"100%",tgt:"100%",tr:"—",ok:true},{n:"System Uptime",v:"99.997%",tgt:">99.99%",tr:"—",ok:true},{n:"Bias Variance",v:"2.1%",tgt:"<3%",tr:"-0.4%",ok:true}];

const PHASES=[{p:1,nm:"Foundation",mo:"1–4",st:"complete",pct:100,items:["HIPAA infrastructure","RBAC + IAM","Consent management","Audit logging","EHR/FHIR integration","Patient portal"]},{p:2,nm:"Core AI",mo:"5–8",st:"in-progress",pct:72,items:["Symptom checker","Medication manager","Basic CDS","Communication hub","Appointment scheduler","Mobile app"]},{p:3,nm:"Advanced Clinical",mo:"9–12",st:"planned",pct:0,items:["Ambient documentation","Diagnostic imaging AI","Prior auth automation","Chronic disease coaching","Population health","Advanced CDS"]},{p:4,nm:"Optimization",mo:"13–16",st:"planned",pct:0,items:["Mental health companion","Pharmacogenomics","Revenue cycle","Staff scheduling","Analytics","Telehealth"]},{p:5,nm:"Scale & Governance",mo:"17–20",st:"planned",pct:0,items:["Multi-site deployment","Developer API","AI governance","FDA submission","Continuous learning","Training program"]}];

const RISKS=[{r:"AI Misdiagnosis",sv:"Critical",mit:"Human review mandatory, confidence thresholds",own:"Clinical Director"},{r:"Data Breach",sv:"Critical",mit:"Defense-in-depth, encryption, DLP, incident response",own:"CISO"},{r:"Algorithmic Bias",sv:"High",mit:"Diverse training data, quarterly bias audits",own:"AI Ethics Lead"},{r:"Regulatory Non-Compliance",sv:"High",mit:"Dedicated compliance team, automated monitoring",own:"Compliance Officer"},{r:"System Downtime",sv:"High",mit:"99.99% SLA, multi-region, automated failover",own:"VP Engineering"}];

const VITALS_HIST=[{d:"Feb 15",bp:122,hr:72},{d:"Feb 8",bp:128,hr:75},{d:"Feb 1",bp:130,hr:78},{d:"Jan 25",bp:126,hr:74},{d:"Jan 18",bp:132,hr:80},{d:"Jan 11",bp:124,hr:71}];

// ===== CONTEXT =====
const Ctx=createContext(null);
function useApp(){return useContext(Ctx)}
function AppProvider({children}){
  const[view,setView]=useState("login");
  const[usr,setUsr]=useState(null);
  const[notifs,setNotifs]=useState(INIT_ALERTS.map(a=>({...a,read:false})));
  const[showNotif,setShowNotif]=useState(false);
  const[modal,setModal]=useState(null);
  const[appts,setAppts]=useState(INIT_APPTS);
  const[patAppts,setPatAppts]=useState([{id:1,date:"Feb 20, 2026",time:"10:00 AM",prov:"Dr. Martinez",type:"Annual Physical",loc:"Main Clinic"},{id:2,date:"Mar 5, 2026",time:"2:30 PM",prov:"Dr. Lee",type:"Dermatology",loc:"Specialty Clinic"}]);
  const[toastMsg,setToast]=useState(null);
  const toast=useCallback(m=>{setToast(m);setTimeout(()=>setToast(null),3000)},[]);
  const login=useCallback(role=>{setUsr(role==="provider"?{name:"Dr. Martinez",role:"provider",spec:"Internal Medicine",ini:"DM"}:{name:"Alex Johnson",role:"patient",ini:"AJ"});setView(role==="provider"?"dashboard":"portal")},[]);
  const logout=useCallback(()=>{setUsr(null);setView("login")},[]);
  const markRead=useCallback(id=>setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n)),[]);
  const markAllRead=useCallback(()=>setNotifs(p=>p.map(n=>({...n,read:true}))),[]);
  const cancelAppt=useCallback(id=>{setAppts(p=>p.map(a=>a.id===id?{...a,status:"cancelled"}:a));toast("Appointment cancelled")},[toast]);
  const confirmAppt=useCallback(id=>{setAppts(p=>p.map(a=>a.id===id?{...a,status:"confirmed"}:a));toast("Appointment confirmed")},[toast]);
  const rescheduleAppt=useCallback(id=>{setPatAppts(p=>p.map(a=>a.id===id?{...a,date:"Mar 15, 2026",time:"11:00 AM"}:a));toast("Rescheduled to Mar 15 at 11:00 AM")},[toast]);
  const addAppt=useCallback(a=>{setPatAppts(p=>[...p,{id:Date.now(),...a}]);toast("Appointment booked")},[toast]);
  const unread=notifs.filter(n=>!n.read).length;
  return <Ctx.Provider value={{view,setView,usr,login,logout,notifs,showNotif,setShowNotif,markRead,markAllRead,unread,modal,setModal,toast,toastMsg,appts,cancelAppt,confirmAppt,patAppts,rescheduleAppt,addAppt}}>{children}</Ctx.Provider>;
}

// ===== HOOKS =====
function useMob(bp=768){const[m,s]=useState(false);useEffect(()=>{const c=()=>s(window.innerWidth<=bp);c();window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[bp]);return m}

// ===== SMALL COMPONENTS =====
function Badge({children,color=T.pr,small}){return <span style={{display:"inline-flex",alignItems:"center",padding:small?"2px 7px":"3px 10px",borderRadius:20,fontSize:small?10:11,fontWeight:600,letterSpacing:.5,background:`${color}22`,color,textTransform:"uppercase",whiteSpace:"nowrap"}}>{children}</span>}
function RiskBadge({risk}){return <Badge color={{low:T.ac,medium:T.wn,high:T.dg}[risk]}>{risk}</Badge>}

function Btn({children,onClick,v="primary",full,small}){
  const b={padding:small?"8px 14px":"12px 20px",borderRadius:small?10:12,border:"none",cursor:"pointer",fontWeight:600,fontSize:small?12:14,display:"flex",alignItems:"center",justifyContent:"center",gap:6,width:full?"100%":undefined};
  const vs={primary:{background:T.g1,color:"#fff"},secondary:{background:"transparent",border:`1px solid ${T.bd}`,color:T.tx},danger:{background:`${T.dg}15`,color:T.dg,border:`1px solid ${T.dg}30`},accent:{background:T.g2,color:"#fff"}};
  return <button onClick={onClick} style={{...b,...(vs[v]||{})}}>{children}</button>
}

function StatCard({icon:I,label,value,trend,color=T.pr,delay=0,compact}){
  return <div className="animate-in" style={{animationDelay:`${delay}ms`,background:T.cd,borderRadius:compact?12:16,padding:compact?"14px 16px":"20px 22px",border:`1px solid ${T.bd}`}}>
    <div style={{display:"flex",alignItems:"center",gap:compact?8:12,marginBottom:compact?8:12}}>
      <div style={{width:compact?32:40,height:compact?32:40,borderRadius:compact?8:12,background:`${color}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={compact?16:20} color={color}/></div>
      <span style={{fontSize:compact?11:13,color:T.tm,fontWeight:500}}>{label}</span>
    </div>
    <div style={{fontSize:compact?22:28,fontWeight:700,fontFamily:fd}}>{value}</div>
    {trend&&<div style={{fontSize:compact?11:12,color:trend.startsWith?.("+")?T.ac:T.tm,marginTop:4,fontWeight:500}}>{trend}</div>}
  </div>
}

function CardSection({title,icon:I,iconColor,right,children,noPad}){
  return <div className="animate-in" style={{background:T.cd,borderRadius:16,border:`1px solid ${T.bd}`,overflow:"hidden"}}>
    <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>{I&&<I size={18} color={iconColor||T.pr} style={{flexShrink:0}}/>}<span style={{fontFamily:fd,fontWeight:600,fontSize:15}}>{title}</span></div>
      {right}
    </div>
    {noPad?children:<div style={{padding:"14px 18px"}}>{children}</div>}
  </div>
}

function NavItem({icon:I,label,active,onClick,badge}){
  return <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 16px",borderRadius:12,border:"none",cursor:"pointer",background:active?`${T.pr}15`:"transparent",color:active?T.pr:T.tm,fontSize:14,fontWeight:active?600:400}}>
    <I size={19}/><span>{label}</span>{badge>0&&<span style={{marginLeft:"auto",background:T.dg,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10}}>{badge}</span>}
  </button>
}

function MobNavItem({icon:I,label,active,onClick,badge}){
  return <button onClick={onClick} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 4px",borderRadius:10,border:"none",cursor:"pointer",background:active?`${T.pr}12`:"transparent",color:active?T.pr:T.td,position:"relative"}}>
    <I size={20}/><span style={{fontSize:10,fontWeight:active?600:400}}>{label}</span>
    {badge>0&&<span style={{position:"absolute",top:4,right:"calc(50% - 16px)",width:8,height:8,borderRadius:"50%",background:T.dg}}/>}
  </button>
}

function Toggle({on:init,onChange}){const[on,s]=useState(init??false);return <button onClick={()=>{const v=!on;s(v);onChange?.(v)}} style={{width:44,height:24,borderRadius:12,border:"none",cursor:"pointer",background:on?T.ac:T.bd,position:"relative",transition:"background .2s"}}><div style={{width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:2,left:on?22:2,transition:"left .2s"}}/></button>}

function InfoGrid({items}){return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{items.map(([l,v],i)=><div key={i} style={{background:T.sf,borderRadius:10,padding:12,border:`1px solid ${T.bd}`}}><div style={{fontSize:11,color:T.td,marginBottom:3}}>{l}</div><div style={{fontSize:13,fontWeight:500}}>{v||"—"}</div></div>)}</div>}

// ===== TOAST =====
function Toast(){const{toastMsg}=useApp();if(!toastMsg)return null;return <div className="animate-in" style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:T.ac,color:"#fff",padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,zIndex:100,display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 32px rgba(0,0,0,.4)"}}><CheckCircle size={16}/>{toastMsg}</div>}

// ===== NOTIFICATION PANEL =====
function NotifPanel(){
  const{notifs,showNotif,setShowNotif,markRead,markAllRead}=useApp();const mob=useMob();
  if(!showNotif)return null;
  const ic={critical:AlertTriangle,warning:AlertTriangle,info:Info};const co={critical:T.dg,warning:T.wn,info:T.pr};
  return <><div onClick={()=>setShowNotif(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:60}}/>
    <div className="animate-in" style={{position:"fixed",top:mob?56:0,right:0,width:mob?"100%":400,maxHeight:mob?"calc(100vh - 56px)":"100vh",background:T.sf,borderLeft:`1px solid ${T.bd}`,zIndex:65,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><Bell size={18} color={T.wn}/><span style={{fontFamily:fd,fontWeight:600,fontSize:16}}>Notifications</span></div><div style={{display:"flex",gap:8}}><button onClick={markAllRead} style={{background:"none",border:"none",color:T.pr,fontSize:12,fontWeight:600,cursor:"pointer"}}>Mark all read</button><button onClick={()=>setShowNotif(false)} style={{background:"none",border:"none",color:T.td,cursor:"pointer"}}><X size={20}/></button></div></div>
      <div style={{flex:1,overflowY:"auto"}}>{notifs.map(n=>{const Ic=ic[n.type];return <div key={n.id} onClick={()=>markRead(n.id)} style={{padding:"14px 20px",borderBottom:`1px solid ${T.bd}`,cursor:"pointer",background:n.read?"transparent":`${co[n.type]}06`}}>
        <div style={{display:"flex",gap:10}}><div style={{width:32,height:32,borderRadius:8,background:`${co[n.type]}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic size={16} color={co[n.type]}/></div>
        <div style={{flex:1}}><p style={{fontSize:13,lineHeight:1.5,fontWeight:n.read?400:500}}>{n.msg}</p><div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap"}}><span style={{fontSize:11,color:T.td}}><Clock size={11} style={{verticalAlign:-1,marginRight:3}}/>{n.time}</span><span style={{fontSize:11,color:T.td}}>via {n.service}</span></div>{n.action&&<p style={{fontSize:12,color:T.pr,marginTop:6,fontWeight:500}}>→ {n.action}</p>}</div>
        {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:co[n.type],flexShrink:0,marginTop:6}}/>}</div>
      </div>})}</div>
    </div></>
}

// ===== MODAL =====
function ModalWrap(){
  const{modal,setModal,rescheduleAppt,addAppt,cancelAppt,confirmAppt,toast}=useApp();const mob=useMob();
  if(!modal)return null;const close=()=>setModal(null);
  return <><div onClick={close} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:70}}/>
    <div className="animate-scale" style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:mob?"calc(100% - 32px)":520,maxHeight:"85vh",overflowY:"auto",background:T.cd,borderRadius:20,border:`1px solid ${T.bd}`,zIndex:75}}>
      <div style={{padding:"16px 22px",borderBottom:`1px solid ${T.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:T.cd,zIndex:1}}><span style={{fontFamily:fd,fontWeight:600,fontSize:16}}>{modal.title}</span><button onClick={close} style={{background:"none",border:"none",color:T.td,cursor:"pointer"}}><X size={20}/></button></div>
      <div style={{padding:"18px 22px"}}>
        {modal.type==="patientDetail"&&<PatientDetailM p={modal.data} close={close}/>}
        {modal.type==="apptDetail"&&<ApptDetailM a={modal.data} close={close} cancel={cancelAppt} confirm={confirmAppt}/>}
        {modal.type==="reschedule"&&<RescheduleM data={modal.data} close={close} resc={rescheduleAppt}/>}
        {modal.type==="bookAppt"&&<BookApptM close={close} add={addAppt}/>}
        {modal.type==="labDetail"&&<LabDetailM l={modal.data} close={close}/>}
        {modal.type==="consent"&&<ConsentM p={modal.data} close={close} toast={toast}/>}
        {modal.type==="drugIx"&&<DrugIxM close={close}/>}
        {modal.type==="audit"&&<AuditM close={close}/>}
        {modal.type==="compliance"&&<ComplianceM close={close}/>}
        {modal.type==="kpis"&&<KPIM close={close}/>}
        {modal.type==="roadmap"&&<RoadmapM close={close}/>}
        {modal.type==="risks"&&<RiskM close={close}/>}
        {modal.type==="security"&&<SecurityM close={close}/>}
        {modal.type==="settings"&&<SettingsM close={close}/>}
      </div>
    </div></>
}

function PatientDetailM({p,close}){return <div style={{display:"flex",flexDirection:"column",gap:14}}><InfoGrid items={[["DOB",p.dob],["Sex",p.sex],["Phone",p.phone],["Email",p.email],["Insurance",p.insurance],["Allergies",p.allergies?.join(", ")||"None"]]}/><div><div style={{fontSize:12,fontWeight:600,color:T.tm,marginBottom:8,textTransform:"uppercase"}}>Care Team</div>{p.careTeam?.map((c,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span style={{fontSize:13}}>{c.name}</span><Badge small>{c.role}</Badge></div>)}</div><div><div style={{fontSize:12,fontWeight:600,color:T.tm,marginBottom:8,textTransform:"uppercase"}}>Care Plan</div>{p.carePlan?.map((c,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:6}}><CheckCircle size={14} color={T.ac} style={{marginTop:2,flexShrink:0}}/><span style={{fontSize:13,color:T.tm}}>{c}</span></div>)}</div><Btn v="secondary" full onClick={close}>Close</Btn></div>}

function ApptDetailM({a,close,cancel,confirm}){return <div style={{display:"flex",flexDirection:"column",gap:14}}><InfoGrid items={[["Patient",a.patient],["Time",a.time],["Type",a.type],["Duration",a.dur],["Status",a.status]]}/>{a.notes&&<div style={{background:T.sf,borderRadius:10,padding:12,border:`1px solid ${T.bd}`,fontSize:13,color:T.tm}}><strong>Notes:</strong> {a.notes}</div>}<div style={{display:"flex",gap:10}}>{a.status!=="cancelled"&&<Btn v="danger" full onClick={()=>{cancel(a.id);close()}}>Cancel</Btn>}{a.status==="pending"&&<Btn full onClick={()=>{confirm(a.id);close()}}>Confirm</Btn>}<Btn v="secondary" full onClick={close}>Close</Btn></div></div>}

function RescheduleM({data,close,resc}){return <div style={{display:"flex",flexDirection:"column",gap:14}}><p style={{fontSize:13,color:T.tm}}>Select a new time for your appointment with {data?.prov}:</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[["Mar 15","9:00 AM"],["Mar 15","11:00 AM"],["Mar 18","2:00 PM"],["Mar 20","10:30 AM"]].map(([d,t],i)=><button key={i} onClick={()=>{resc(data.id);close()}} style={{padding:14,borderRadius:12,border:`1px solid ${T.bd}`,background:T.sf,cursor:"pointer",textAlign:"left"}}><div style={{fontSize:13,fontWeight:600}}>{d}, 2026</div><div style={{fontSize:12,color:T.tm}}>{t}</div></button>)}</div><Btn v="secondary" full onClick={close}>Cancel</Btn></div>}

function BookApptM({close,add}){const[tp,stp]=useState("");const[dt,sdt]=useState("");const[tm,stm]=useState("");const tps=["General Checkup","Follow-up","Lab Work","Specialist","Telehealth"];const tms=["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM"];
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div><label style={{fontSize:12,color:T.tm,display:"block",marginBottom:6}}>Type</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{tps.map(t=><button key={t} onClick={()=>stp(t)} style={{padding:"7px 14px",borderRadius:10,border:`1px solid ${tp===t?T.pr:T.bd}`,background:tp===t?`${T.pr}15`:"transparent",color:tp===t?T.pr:T.tm,fontSize:12,cursor:"pointer"}}>{t}</button>)}</div></div>
    <div><label style={{fontSize:12,color:T.tm,display:"block",marginBottom:6}}>Date</label><input type="date" value={dt} onChange={e=>sdt(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${T.bd}`,background:T.sf,color:T.tx,fontSize:14,outline:"none"}}/></div>
    <div><label style={{fontSize:12,color:T.tm,display:"block",marginBottom:6}}>Time</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{tms.map(t=><button key={t} onClick={()=>stm(t)} style={{padding:"7px 14px",borderRadius:10,border:`1px solid ${tm===t?T.pr:T.bd}`,background:tm===t?`${T.pr}15`:"transparent",color:tm===t?T.pr:T.tm,fontSize:12,cursor:"pointer"}}>{t}</button>)}</div></div>
    <div style={{display:"flex",gap:10}}><Btn v="secondary" full onClick={close}>Cancel</Btn><Btn full onClick={()=>{if(tp&&dt&&tm)add({type:tp,date:dt,time:tm,prov:"Dr. Martinez",loc:"Main Clinic"})}}>Book</Btn></div>
  </div>}

function LabDetailM({l,close}){return <div style={{display:"flex",flexDirection:"column",gap:14}}><div style={{display:"flex",alignItems:"center",gap:10}}>{l.status==="normal"?<CheckCircle size={20} color={T.ac}/>:<AlertTriangle size={20} color={l.status==="critical"?T.dg:T.wn}/>}<div><div style={{fontSize:15,fontWeight:600}}>{l.test}</div><div style={{fontSize:12,color:T.td}}>{l.date}</div></div></div><InfoGrid items={[["Result",l.value],["Reference",l.ref||"—"],["Status",l.status],["Previous",l.prev||"N/A"]]}/><Btn v="secondary" full onClick={close}>Close</Btn></div>}

function ConsentM({p,close,toast}){const[c,sc]=useState({...p.consents});return <div style={{display:"flex",flexDirection:"column",gap:12}}><p style={{fontSize:13,color:T.tm}}>Manage consent for {p.name}. Changes propagate within 60 seconds.</p>{CONSENT_TYPES.map(ct=><div key={ct.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,background:T.sf,borderRadius:12,border:`1px solid ${T.bd}`}}><div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:18}}>{ct.icon}</span><div><div style={{fontSize:13,fontWeight:600}}>{ct.label}</div><div style={{fontSize:11,color:T.td}}>{ct.desc}</div></div></div><Toggle on={c[ct.id]} onChange={v=>sc(p=>({...p,[ct.id]:v}))}/></div>)}<Btn full onClick={()=>{toast("Consent preferences updated");close()}}>Save Changes</Btn></div>}

function DrugIxM({close}){return <div style={{display:"flex",flexDirection:"column",gap:12}}>{DRUG_IX.map((d,i)=><div key={i} style={{background:T.sf,borderRadius:12,padding:14,border:`1px solid ${T.bd}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:14,fontWeight:600}}>{d.d1} + {d.d2}</span><Badge small color={d.sev==="contraindicated"?T.dg:d.sev==="serious"?"#F97316":T.wn}>{d.sev}</Badge></div><p style={{fontSize:12,color:T.tm,marginBottom:4}}>{d.eff}</p><p style={{fontSize:12,color:T.ac}}>→ {d.rec}</p></div>)}<Btn v="secondary" full onClick={close}>Close</Btn></div>}

function AuditM({close}){return <div style={{display:"flex",flexDirection:"column",gap:8}}><p style={{fontSize:12,color:T.td,marginBottom:4}}>Immutable audit trail — 7-year retention per HIPAA §164.312(b)</p>{AUDIT.map((a,i)=><div key={i} style={{background:T.sf,borderRadius:10,padding:12,border:`1px solid ${T.bd}`,fontSize:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontWeight:600}}>{a.act}</span><span style={{fontFamily:fm,color:T.td,fontSize:10}}>{a.ts}</span></div><div style={{color:T.tm}}>Actor: {a.actor} · Target: {a.tgt} · Service: {a.svc}</div></div>)}<Btn v="secondary" full onClick={close}>Close</Btn></div>}

function ComplianceM({close}){return <div style={{display:"flex",flexDirection:"column",gap:10}}>{COMPLIANCE.map((c,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,background:T.sf,borderRadius:10,border:`1px solid ${T.bd}`}}><div><div style={{fontSize:14,fontWeight:600}}>{c.reg}</div><div style={{fontSize:11,color:T.td}}>Last audit: {c.last}</div></div><Badge small color={c.st==="compliant"?T.ac:c.st==="under review"?T.wn:T.pr}>{c.st}</Badge></div>)}<Btn v="secondary" full onClick={close}>Close</Btn></div>}

function KPIM({close}){return <div style={{display:"flex",flexDirection:"column",gap:10}}>{KPIS.map((k,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,background:T.sf,borderRadius:10,border:`1px solid ${T.bd}`}}><div><div style={{fontSize:13,fontWeight:600}}>{k.n}</div><div style={{fontSize:11,color:T.td}}>Target: {k.tgt}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,fontFamily:fd,color:k.ok?T.ac:T.wn}}>{k.v}</div><div style={{fontSize:11,color:T.ac}}>{k.tr}</div></div></div>)}<Btn v="secondary" full onClick={close}>Close</Btn></div>}

function RoadmapM({close}){return <div style={{display:"flex",flexDirection:"column",gap:12}}>{PHASES.map(p=><div key={p.p} style={{background:T.sf,borderRadius:12,padding:14,border:`1px solid ${T.bd}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div><span style={{fontSize:14,fontWeight:600}}>Phase {p.p}: {p.nm}</span><span style={{fontSize:12,color:T.td,marginLeft:8}}>Months {p.mo}</span></div><Badge small color={p.st==="complete"?T.ac:p.st==="in-progress"?T.pr:T.td}>{p.st}</Badge></div><div style={{background:T.cd,borderRadius:6,height:6,marginBottom:10}}><div style={{background:p.pct===100?T.ac:T.pr,height:6,borderRadius:6,width:`${p.pct}%`}}/></div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{p.items.map((it,i)=><span key={i} style={{padding:"4px 10px",borderRadius:8,background:`${T.pr}10`,fontSize:11,color:T.tm}}>{it}</span>)}</div></div>)}<Btn v="secondary" full onClick={close}>Close</Btn></div>}

function RiskM({close}){return <div style={{display:"flex",flexDirection:"column",gap:10}}>{RISKS.map((r,i)=><div key={i} style={{background:T.sf,borderRadius:10,padding:12,border:`1px solid ${T.bd}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:14,fontWeight:600}}>{r.r}</span><Badge small color={r.sv==="Critical"?T.dg:T.wn}>{r.sv}</Badge></div><p style={{fontSize:12,color:T.tm,marginBottom:4}}>{r.mit}</p><span style={{fontSize:11,color:T.td}}>Owner: {r.own}</span></div>)}<Btn v="secondary" full onClick={close}>Close</Btn></div>}

function SecurityM({close}){return <div style={{display:"flex",flexDirection:"column",gap:14}}><InfoGrid items={[["MFA","Enforced ✓"],["Encryption (Rest)","AES-256"],["Encryption (Transit)","TLS 1.3"],["Key Rotation","90 days (auto)"],["Session (Clinical)","15 min timeout"],["Session (Patient)","30 min timeout"],["Last Pen Test","Jan 2026"],["Active Threats","0"],["Blocked Attempts","847"]]}/><Btn v="secondary" full onClick={close}>Close</Btn></div>}

function SettingsM({close}){return <div style={{display:"flex",flexDirection:"column",gap:14}}>{["Email Notifications","SMS Alerts","Dark Mode","AI Recommendations","Data Sharing","Biometric Login"].map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<5?`1px solid ${T.bd}`:"none"}}><span style={{fontSize:14}}>{s}</span><Toggle on={i<4}/></div>)}<Btn v="secondary" full onClick={close}>Close</Btn></div>}

// ===== LOGIN =====
function LoginScreen(){
  const{login}=useApp();const mob=useMob();
  return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg,padding:16}}>
    <div className="animate-scale" style={{background:T.cd,borderRadius:24,padding:mob?28:40,maxWidth:480,width:"100%",border:`1px solid ${T.bd}`,textAlign:"center"}}>
      <div style={{width:64,height:64,borderRadius:18,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><Shield size={30} color="#fff"/></div>
      <h1 style={{fontFamily:fd,fontSize:mob?24:28,fontWeight:700,marginBottom:4}}>MedAI</h1>
      <p style={{color:T.td,fontSize:12,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Medical AI Assistant Platform</p>
      <p style={{color:T.tm,fontSize:13,marginBottom:28}}>Intelligent clinical decision support · HIPAA compliant</p>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <button onClick={()=>login("provider")} style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"16px 20px",borderRadius:14,border:`1px solid ${T.bd}`,background:T.sf,cursor:"pointer",textAlign:"left"}}>
          <div style={{width:44,height:44,borderRadius:12,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Stethoscope size={22} color="#fff"/></div>
          <div><div style={{fontSize:15,fontWeight:600,color:T.tx}}>Provider Login</div><div style={{fontSize:12,color:T.td}}>Dr. Martinez — Internal Medicine</div></div>
        </button>
        <button onClick={()=>login("patient")} style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"16px 20px",borderRadius:14,border:`1px solid ${T.bd}`,background:T.sf,cursor:"pointer",textAlign:"left"}}>
          <div style={{width:44,height:44,borderRadius:12,background:T.g2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={22} color="#fff"/></div>
          <div><div style={{fontSize:15,fontWeight:600,color:T.tx}}>Patient Login</div><div style={{fontSize:12,color:T.td}}>Alex Johnson — Patient Portal</div></div>
        </button>
      </div>
      <div style={{marginTop:24,display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>{["HIPAA","HITECH","SOC 2","FHIR R4","AES-256"].map(t=><Badge key={t} small color={T.ac}>{t}</Badge>)}</div>
    </div>
  </div>
}

// ===== SYMPTOM CHECKER (Sec 3.1 & 5.1) =====
function SymptomChecker(){
  const{setView,setModal,toast}=useApp();
  const[msgs,setMsgs]=useState([{r:"ai",t:"Hello! I'm your Medical AI Assistant. Describe your symptoms or select from common symptoms below."}]);
  const[inp,setInp]=useState("");const[sel,setSel]=useState([]);const[typing,setTyping]=useState(false);const[result,setResult]=useState(null);const[consent,setConsent]=useState(false);const[showP,setShowP]=useState(false);const[step,setStep]=useState(0);const end=useRef(null);const mob=useMob();
  useEffect(()=>{end.current?.scrollIntoView({behavior:"smooth"})},[msgs,typing]);

  const respond=useCallback(text=>{setTyping(true);const l=text.toLowerCase();setTimeout(()=>{let r="";
    if(step===0){if(l.includes("headache")||sel.includes(1))r="Headache noted. Follow-ups:\n\n• Duration?\n• Severity 1-10?\n• Localized or generalized?\n• Visual changes, nausea, or neck stiffness?";
    else if(l.includes("chest")||sel.includes(5))r="⚠️ Chest pain requires careful evaluation:\n\n• Sharp, dull, or pressure-like?\n• Radiating to arm, jaw, or back?\n• Shortness of breath or sweating?\n\n🚨 If severe with SOB, call 911 immediately.";
    else if(l.includes("fever")||sel.includes(2))r="Fever noted:\n\n• Current temperature?\n• When did it start?\n• Other symptoms (chills, aches, cough)?\n• Contact with sick individuals?";
    else if(l.includes("cough")||sel.includes(3))r="About your cough:\n\n• Dry or productive?\n• How long?\n• Any blood?\n• Fever or SOB as well?";
    else if(l.includes("fatigue")||sel.includes(4))r="Fatigue can have many causes:\n\n• How long?\n• Sleep quality and hours?\n• Appetite/weight changes?\n• Stress or mood changes?";
    else r="Thank you. Tell me:\n\n• When did symptoms start?\n• Severity 1-10?\n• Current medications?\n• Medical history?";setStep(1)}
    else if(step===1){r="Thanks for the details. A few more:\n\n• Known medical conditions?\n• Medication allergies?\n• Tried any treatment?\n• Affecting daily activities?";setStep(2)}
    else{const urg=sel.includes(5)||sel.includes(7)||l.includes("chest")||l.includes("breath");
    r=`Assessment complete:\n\n📊 Risk: ${urg?"EMERGENCY — Seek immediate care":"MODERATE — Schedule within 48hrs"}\n\n🔍 Considerations:\n${urg?"• Cardiac evaluation recommended\n• ECG and troponin testing\n• Do not delay":"• Primary care evaluation appropriate\n• Lab work may be helpful\n• Monitor symptoms"}\n\n⚕️ ${urg?"Go to nearest ER or call 911.":"Schedule with your provider."}\n\n⚠️ AI-assisted assessment — does not replace professional medical advice.`;setResult(urg?"urgent":"moderate")}
    setMsgs(p=>[...p,{r:"ai",t:r}]);setTyping(false)},1500)},[sel,step]);

  const send=()=>{if(!inp.trim())return;setMsgs(p=>[...p,{r:"user",t:inp}]);respond(inp);setInp("")};
  const analyze=()=>{if(!sel.length)return;const names=sel.map(id=>SYMPTOMS.find(s=>s.id===id)?.name).join(", ");setMsgs(p=>[...p,{r:"user",t:`I'm experiencing: ${names}`}]);if(mob)setShowP(false);respond(names)};
  const reset=()=>{setMsgs([{r:"ai",t:"Describe your new symptoms or select from the list."}]);setSel([]);setResult(null);setStep(0);toast("Chat reset")};

  if(!consent)return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",padding:mob?16:24,overflowY:"auto"}}><div className="animate-scale" style={{background:T.cd,borderRadius:mob?18:24,padding:mob?24:40,maxWidth:520,width:"100%",border:`1px solid ${T.bd}`,textAlign:"center"}}>
    <div style={{width:mob?52:64,height:mob?52:64,borderRadius:18,background:`${T.pr}15`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><Shield size={mob?26:32} color={T.pr}/></div>
    <h2 style={{fontFamily:fd,fontSize:mob?20:24,fontWeight:700,marginBottom:10}}>Consent Required</h2>
    <p style={{color:T.tm,lineHeight:1.7,fontSize:13,marginBottom:8}}>Before using the AI Symptom Checker:</p>
    <div style={{background:T.sf,borderRadius:14,padding:mob?14:20,textAlign:"left",margin:"16px 0",border:`1px solid ${T.bd}`}}>
      {[[Lock,"Data encrypted, HIPAA-compliant AI processing."],[Eye,"Guidance only — not a replacement for professional diagnosis."],[FileText,"Summary may be shared with care team. Revocable anytime."]].map(([Ic,t],i)=>
        <div key={i} style={{display:"flex",gap:10,marginBottom:i<2?12:0,alignItems:"flex-start"}}><Ic size={16} color={T.ac} style={{marginTop:2,flexShrink:0}}/><span style={{fontSize:13,color:T.tm,lineHeight:1.6}}>{t}</span></div>)}
    </div>
    <Btn full onClick={()=>setConsent(true)}>I Understand & Agree</Btn>
    <p style={{fontSize:11,color:T.td,marginTop:12}}>By proceeding, you consent to AI-assisted symptom analysis per Section 4.2.</p>
  </div></div>;

  const panel=<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <h3 style={{fontFamily:fd,fontSize:13,fontWeight:600,color:T.tm,textTransform:"uppercase",letterSpacing:1}}>Quick Select</h3>
    <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{SYMPTOMS.map(s=><button key={s.id} onClick={()=>setSel(p=>p.includes(s.id)?p.filter(x=>x!==s.id):[...p,s.id])} style={{padding:"7px 12px",borderRadius:10,border:`1px solid ${sel.includes(s.id)?T.pr:T.bd}`,background:sel.includes(s.id)?`${T.pr}20`:"transparent",color:sel.includes(s.id)?T.pr:T.tm,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:5}}><span>{s.icon}</span> {s.name}</button>)}</div>
    {sel.length>0&&<Btn v="accent" full onClick={analyze}>Analyze {sel.length} Symptom{sel.length>1?"s":""} →</Btn>}
    {result&&<div className="animate-in" style={{background:`${T.ac}10`,border:`1px solid ${T.ac}30`,borderRadius:12,padding:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><CheckCircle size={16} color={T.ac}/><span style={{fontSize:13,fontWeight:600,color:T.ac}}>Assessment Complete</span></div><p style={{fontSize:12,color:T.tm,lineHeight:1.6}}>Results ready.</p><div style={{display:"flex",gap:8,marginTop:10}}><Btn small full onClick={()=>setModal({type:"bookAppt",title:"Book Appointment"})}>Book Appointment</Btn><Btn small full v="secondary" onClick={reset}><RotateCcw size={14}/> New Check</Btn></div></div>}
  </div>;

  return <div style={{display:"flex",flexDirection:mob?"column":"row",height:"100%"}}>
    <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
      <div style={{padding:mob?"12px 16px":"16px 24px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:10,height:10,borderRadius:"50%",background:T.ac,boxShadow:`0 0 8px ${T.ac}`}}/><span style={{fontFamily:fd,fontWeight:600,fontSize:mob?14:16}}>AI Symptom Assessment</span></div>
        <div style={{display:"flex",gap:8}}>{result&&<button onClick={reset} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${T.bd}`,background:"transparent",color:T.tm,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><RotateCcw size={12}/>Reset</button>}
        {mob&&<button onClick={()=>setShowP(!showP)} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${T.bd}`,background:showP?`${T.pr}15`:"transparent",color:showP?T.pr:T.tm,fontSize:12,fontWeight:500,cursor:"pointer"}}>{showP?"Chat":`Symptoms${sel.length?` (${sel.length})`:""}`}</button>}</div>
      </div>
      {mob&&showP?<div style={{flex:1,overflowY:"auto",padding:16}}>{panel}</div>:<>
        <div style={{flex:1,overflowY:"auto",padding:mob?14:24,display:"flex",flexDirection:"column",gap:14}}>
          {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.r==="user"?"flex-end":"flex-start",maxWidth:mob?"92%":"85%",alignSelf:m.r==="user"?"flex-end":"flex-start"}}>
            {m.r==="ai"&&<div style={{width:28,height:28,borderRadius:8,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",marginRight:8,flexShrink:0,marginTop:4}}><Brain size={14} color="#fff"/></div>}
            <div style={{background:m.r==="user"?T.pr:T.cd,borderRadius:m.r==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:mob?"10px 14px":"14px 18px",border:m.r==="user"?"none":`1px solid ${T.bd}`,fontSize:mob?13:14,lineHeight:1.7,whiteSpace:"pre-line"}}>{m.t}</div>
          </div>)}
          {typing&&<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:8,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={14} color="#fff"/></div><div style={{background:T.cd,borderRadius:16,padding:"12px 18px",border:`1px solid ${T.bd}`}}><div className="typing-indicator"><span/><span/><span/></div></div></div>}
          <div ref={end}/>
        </div>
        <div style={{padding:mob?"10px 12px":"14px 24px",borderTop:`1px solid ${T.bd}`,background:T.sf,flexShrink:0}}>
          <div style={{display:"flex",gap:8}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Describe your symptoms..." style={{flex:1,padding:mob?"10px 14px":"12px 18px",borderRadius:12,border:`1px solid ${T.bd}`,background:T.cd,color:T.tx,fontSize:14,outline:"none"}}/><button onClick={send} style={{padding:mob?"10px 14px":"12px 18px",borderRadius:12,border:"none",background:T.g1,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontWeight:600,flexShrink:0}}><Send size={16}/>{!mob&&"Send"}</button></div>
        </div>
      </>}
    </div>
    {!mob&&<div style={{width:280,borderLeft:`1px solid ${T.bd}`,background:T.sf,overflowY:"auto",padding:20}}>{panel}</div>}
  </div>;
}

// ===== PROVIDER DASHBOARD (Sec 3.2 & 5.2) =====
function ProviderDash(){
  const{appts,notifs,setModal,toast}=useApp();const[selP,setSelP]=useState(null);const[af,setAf]=useState("all");const[search,setSrch]=useState("");const mob=useMob();
  const fAlerts=notifs.filter(a=>af==="all"||a.type===af);
  const fPats=search?PATIENTS.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.condition.toLowerCase().includes(search.toLowerCase())):PATIENTS;
  const actAppts=appts.filter(a=>a.status!=="cancelled");
  return <div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <div style={{marginBottom:mob?18:28}}><h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700}}>Provider Dashboard</h1><p style={{color:T.tm,fontSize:mob?12:14,marginTop:4}}>Good morning, Dr. Martinez — Feb 15, 2026</p></div>
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?10:16,marginBottom:mob?18:28}}>
      <StatCard icon={Users} label="Active Patients" value={`${PATIENTS.length}`} trend="+12 this month" color={T.pr} compact={mob}/>
      <StatCard icon={Calendar} label="Appointments" value={`${actAppts.length}`} trend={`${appts.filter(a=>a.status==="pending").length} pending`} color={T.ac} delay={100} compact={mob}/>
      <StatCard icon={AlertTriangle} label="Critical Alerts" value={`${notifs.filter(n=>n.type==="critical").length}`} trend="Action required" color={T.dg} delay={200} compact={mob}/>
      <StatCard icon={TrendingUp} label="AI Accuracy" value="96.3%" trend="+1.2% this quarter" color="#8B5CF6" delay={300} compact={mob}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 380px",gap:mob?14:20}}>
      <div style={{display:"flex",flexDirection:"column",gap:mob?14:20}}>
        {/* Alerts */}
        <CardSection title="AI Alerts" icon={Bell} iconColor={T.wn} noPad right={<div style={{display:"flex",gap:4}}>{["all","critical","warning","info"].map(f=><button key={f} onClick={()=>setAf(f)} style={{padding:"4px 10px",borderRadius:8,border:"none",background:af===f?`${T.pr}20`:"transparent",color:af===f?T.pr:T.td,fontSize:11,fontWeight:500,cursor:"pointer",textTransform:"capitalize"}}>{f}</button>)}</div>}>
          <div style={{maxHeight:mob?200:260,overflowY:"auto"}}>{fAlerts.map((a,i)=><div key={a.id} onClick={()=>{const p=PATIENTS.find(p=>p.id===a.pid);if(p)setSelP(selP?.id===p.id?null:p)}} style={{padding:mob?"10px 14px":"14px 18px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}}>
            <div style={{width:8,height:8,borderRadius:"50%",marginTop:5,flexShrink:0,background:a.type==="critical"?T.dg:a.type==="warning"?T.wn:T.pr}}/><div style={{flex:1}}><p style={{fontSize:mob?12:13,lineHeight:1.5}}>{a.msg}</p><span style={{fontSize:11,color:T.td}}>{a.time}</span>{a.action&&<p style={{fontSize:11,color:T.pr,marginTop:4}}>→ {a.action}</p>}</div>
          </div>)}</div>
        </CardSection>
        {/* Patients */}
        <CardSection title="Patient Panel" icon={Users} noPad right={<div style={{display:"flex",alignItems:"center",gap:6,background:T.sf,borderRadius:8,padding:"5px 10px",border:`1px solid ${T.bd}`,maxWidth:160}}><Search size={14} color={T.td} style={{flexShrink:0}}/><input placeholder="Search..." value={search} onChange={e=>setSrch(e.target.value)} style={{border:"none",background:"transparent",color:T.tx,fontSize:12,outline:"none",width:"100%"}}/>{search&&<button onClick={()=>setSrch("")} style={{background:"none",border:"none",cursor:"pointer",color:T.td}}><X size={14}/></button>}</div>}>
          {fPats.map(p=><div key={p.id} onClick={()=>setSelP(selP?.id===p.id?null:p)} style={{padding:mob?"10px 14px":"14px 18px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:mob?10:14,cursor:"pointer",background:selP?.id===p.id?`${T.pr}08`:"transparent"}}>
            <div style={{width:mob?34:40,height:mob?34:40,borderRadius:10,background:`${p.color}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={mob?16:18} color={p.color}/></div>
            <div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:mob?13:14,fontWeight:600}}>{p.name}</span><RiskBadge risk={p.risk}/></div><span style={{fontSize:mob?11:12,color:T.td}}>{p.condition} · Age {p.age}</span></div>
            {selP?.id===p.id?<ChevronDown size={16} color={T.td}/>:<ChevronRight size={16} color={T.td}/>}
          </div>)}
        </CardSection>
        {/* Selected Patient */}
        {selP&&<div className="animate-scale" style={{background:T.cd,borderRadius:16,border:`1px solid ${T.pr}30`,padding:mob?16:24}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div><h3 style={{fontFamily:fd,fontSize:mob?16:18,fontWeight:700}}>{selP.name}</h3><p style={{fontSize:13,color:T.tm}}>Age {selP.age} · {selP.condition}</p></div><div style={{display:"flex",alignItems:"center",gap:8}}><RiskBadge risk={selP.risk}/><button onClick={()=>setSelP(null)} style={{background:"none",border:"none",cursor:"pointer",color:T.td,padding:4}}><X size={18}/></button></div></div>
          <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?8:12,marginBottom:16}}>
            {[["BP",selP.vitals.bp,Heart,T.dg],["HR",`${selP.vitals.hr} bpm`,Activity,T.pr],["Temp",selP.vitals.temp,Thermometer,T.wn],["SpO2",selP.vitals.spo2,Zap,T.ac]].map(([l,v,Ic,c],i)=><div key={i} style={{background:T.sf,borderRadius:12,padding:mob?10:14,border:`1px solid ${T.bd}`}}><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><Ic size={13} color={c}/><span style={{fontSize:10,color:T.td}}>{l}</span></div><span style={{fontSize:mob?15:18,fontWeight:700,fontFamily:fd}}>{v}</span></div>)}
          </div>
          <div style={{marginBottom:16}}><div style={{fontSize:12,fontWeight:600,color:T.tm,marginBottom:8,textTransform:"uppercase"}}>Medications</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{selP.meds.map((m,i)=><span key={i} style={{padding:"5px 10px",borderRadius:8,background:`${T.ac}12`,border:`1px solid ${T.ac}25`,fontSize:11,color:T.ac,fontWeight:500}}><Pill size={11} style={{marginRight:3,verticalAlign:-1}}/>{m.name}</span>)}</div></div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Btn small onClick={()=>setModal({type:"patientDetail",title:`${selP.name} — Full Record`,data:selP})}><FileText size={14}/>Record</Btn>
            <Btn small v="secondary" onClick={()=>setModal({type:"consent",title:`${selP.name} — Consent`,data:selP})}>Consent</Btn>
            <Btn small v="secondary" onClick={()=>toast(`Calling ${selP.phone}...`)}><Phone size={14}/>Call</Btn>
            <Btn small v="secondary" onClick={()=>toast(`Message sent to ${selP.name}`)}><Mail size={14}/>Message</Btn>
          </div>
        </div>}
      </div>
      {/* Right Col */}
      <div style={{display:"flex",flexDirection:"column",gap:mob?14:20}}>
        <CardSection title="Today's Schedule" icon={Calendar} iconColor={T.ac} noPad>
          {appts.map(a=><div key={a.id} onClick={()=>setModal({type:"apptDetail",title:"Appointment Details",data:a})} style={{padding:mob?"10px 14px":"12px 18px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:mob?10:14,cursor:"pointer",opacity:a.status==="cancelled"?.5:1}}>
            <span style={{minWidth:mob?52:64,fontSize:mob?11:13,fontWeight:600,fontFamily:fm,color:T.pr}}>{a.time}</span>
            <div style={{width:3,height:32,borderRadius:2,background:a.status==="confirmed"?T.ac:a.status==="cancelled"?T.dg:T.wn,flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:mob?13:14,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.patient}</div><div style={{fontSize:12,color:T.td}}>{a.type}</div></div>
            <Badge color={a.status==="confirmed"?T.ac:a.status==="cancelled"?T.dg:T.wn} small>{a.status}</Badge>
          </div>)}
        </CardSection>
        <div className="animate-in" style={{background:`linear-gradient(135deg,${T.cd},#1a2744)`,borderRadius:16,border:`1px solid ${T.pr}30`,padding:mob?16:22}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><div style={{width:34,height:34,borderRadius:10,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={16} color="#fff"/></div><span style={{fontFamily:fd,fontWeight:600,fontSize:14}}>AI Clinical Insights</span></div>
          {[{t:"James Wilson COPD exacerbation risk +34% from SpO2 trends. Consider adjusting bronchodilator.",c:T.dg,pid:2},{t:"Sarah Chen HbA1c improved 7.8%→7.2%. Current Metformin effective.",c:T.ac,pid:1},{t:"Robert Kim overdue for cardiac rehab eval. ECG recommended.",c:T.wn,pid:4}].map((ins,i)=><div key={i} onClick={()=>setSelP(PATIENTS.find(p=>p.id===ins.pid))} style={{padding:"10px 12px",borderRadius:10,background:`${ins.c}08`,border:`1px solid ${ins.c}20`,fontSize:12,lineHeight:1.6,color:T.tm,cursor:"pointer",marginBottom:i<2?8:0}}><div style={{width:6,height:6,borderRadius:"50%",background:ins.c,display:"inline-block",marginRight:8,verticalAlign:"middle"}}/>{ins.t}</div>)}
        </div>
      </div>
    </div>
  </div>
}

// ===== PATIENT PORTAL (Sec 3.1) =====
function PatientPortal(){
  const{setView,setModal,toast,patAppts,rescheduleAppt}=useApp();const[tab,setTab]=useState("overview");const mob=useMob();
  const tabs=[{id:"overview",l:"Overview",ic:HomeIcon},{id:"labs",l:"Labs",ic:ClipboardList},{id:"meds",l:"Meds",ic:Pill},{id:"appts",l:"Appts",ic:Calendar}];
  const pLabs=PATIENTS[0].labs;const pMeds=PATIENTS[0].meds;
  return <div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <div style={{marginBottom:mob?16:24}}><h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700}}>Welcome back, Alex</h1><p style={{color:T.tm,fontSize:mob?12:14,marginTop:4}}>Your health summary</p></div>
    <div style={{display:"flex",gap:4,marginBottom:mob?18:28,background:T.sf,borderRadius:12,padding:4,border:`1px solid ${T.bd}`,overflowX:"auto"}}>{tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:6,padding:mob?"8px 12px":"10px 18px",borderRadius:8,border:"none",background:tab===t.id?T.cd:"transparent",color:tab===t.id?T.tx:T.td,cursor:"pointer",fontSize:mob?12:13,fontWeight:500,whiteSpace:"nowrap",flexShrink:0}}><t.ic size={14}/>{t.l}</button>)}</div>
    {tab==="overview"&&<>
      <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?10:16,marginBottom:mob?18:28}}>
        <StatCard icon={Heart} label="Blood Pressure" value="122/78" trend="Normal" color={T.ac} compact={mob}/>
        <StatCard icon={Activity} label="Heart Rate" value="72 bpm" trend="Resting" color={T.pr} delay={100} compact={mob}/>
        <StatCard icon={Thermometer} label="Temperature" value="98.5°F" trend="Normal" color={T.wn} delay={200} compact={mob}/>
        <StatCard icon={Zap} label="SpO2" value="99%" trend="Excellent" color="#8B5CF6" delay={300} compact={mob}/>
      </div>
      <div className="animate-in" style={{background:T.cd,borderRadius:16,border:`1px solid ${T.bd}`,padding:mob?16:24,marginBottom:mob?14:20}}>
        <h3 style={{fontFamily:fd,fontWeight:600,fontSize:mob?14:16,marginBottom:16}}>Blood Pressure Trend</h3>
        <div style={{display:"flex",alignItems:"flex-end",gap:mob?8:20,height:mob?120:160,paddingBottom:26,position:"relative"}}>
          <div style={{position:"absolute",left:0,top:0,bottom:26,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>{[140,130,120,110].map(v=><span key={v} style={{fontSize:mob?9:10,color:T.td,fontFamily:fm}}>{v}</span>)}</div>
          <div style={{flex:1,marginLeft:mob?28:36,display:"flex",alignItems:"flex-end",gap:mob?6:12,height:"100%"}}>
            {VITALS_HIST.map((v,i)=>{const h=((v.bp-110)/30)*(mob?90:130);return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <span style={{fontSize:mob?9:11,fontWeight:600,fontFamily:fm,color:v.bp>130?T.wn:T.ac}}>{v.bp}</span>
              <div style={{width:"70%",height:Math.max(h,16),borderRadius:"6px 6px 3px 3px",background:v.bp>130?`linear-gradient(to top,${T.wn},${T.wn}80)`:`linear-gradient(to top,${T.ac},${T.ac}80)`}}/>
              <span style={{fontSize:mob?8:10,color:T.td}}>{v.d}</span>
            </div>})}
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:mob?10:16}}>
        {[{ic:MessageCircle,l:"AI Symptom Check",d:"Get an AI-powered assessment",g:T.g1,fn:()=>setView("symptom")},{ic:Calendar,l:"Book Appointment",d:"Schedule with your provider",g:T.g2,fn:()=>setModal({type:"bookAppt",title:"Book Appointment"})},{ic:FileText,l:"Request Records",d:"Download your health data",g:"linear-gradient(135deg,#8B5CF6,#A855F7)",fn:()=>toast("Health records download started")}].map((a,i)=><div key={i} className="animate-in" onClick={a.fn} style={{animationDelay:`${300+i*100}ms`,background:T.cd,borderRadius:14,padding:mob?16:22,border:`1px solid ${T.bd}`,cursor:"pointer",display:"flex",gap:14,alignItems:mob?"center":"flex-start",flexDirection:mob?"row":"column"}}>
          <div style={{width:mob?40:44,height:mob?40:44,borderRadius:12,background:a.g,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><a.ic size={mob?18:22} color="#fff"/></div>
          <div><h4 style={{fontFamily:fd,fontWeight:600,fontSize:mob?14:15,marginBottom:2}}>{a.l}</h4><p style={{fontSize:12,color:T.td}}>{a.d}</p></div>
        </div>)}
      </div>
    </>}
    {tab==="labs"&&<CardSection title="Recent Lab Results" icon={ClipboardList} noPad right={<button onClick={()=>toast("Lab PDF downloaded")} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${T.bd}`,background:"transparent",color:T.tm,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Download size={12}/>Export</button>}>
      {pLabs.map((l,i)=><div key={i} onClick={()=>setModal({type:"labDetail",title:l.test,data:l})} style={{padding:mob?"12px 14px":"16px 18px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:mob?10:14,cursor:"pointer"}}>
        <div style={{width:mob?34:40,height:mob?34:40,borderRadius:10,background:l.status==="normal"?`${T.ac}15`:l.status==="critical"?`${T.dg}15`:`${T.wn}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{l.status==="normal"?<CheckCircle size={mob?16:18} color={T.ac}/>:<AlertTriangle size={mob?16:18} color={l.status==="critical"?T.dg:T.wn}/>}</div>
        <div style={{flex:1}}><div style={{fontSize:mob?13:14,fontWeight:600}}>{l.test}</div><div style={{fontSize:11,color:T.td}}>{l.date} · Tap for details</div></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:mob?12:14,fontWeight:500,color:l.status==="normal"?T.ac:l.status==="critical"?T.dg:T.wn}}>{l.value}</div><Badge color={l.status==="normal"?T.ac:l.status==="critical"?T.dg:T.wn} small>{l.status}</Badge></div>
      </div>)}
    </CardSection>}
    {tab==="meds"&&<CardSection title="My Medications" icon={Pill} noPad right={<Badge small color={T.ac}>No Interactions</Badge>}>
      {pMeds.map((m,i)=><div key={i} style={{padding:mob?"12px 14px":"16px 18px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:mob?10:14}}>
        <div style={{width:mob?34:40,height:mob?34:40,borderRadius:10,background:`${T.pr}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Pill size={mob?16:18} color={T.pr}/></div>
        <div style={{flex:1}}><div style={{fontSize:mob?13:14,fontWeight:600}}>{m.name}</div><div style={{fontSize:11,color:T.td}}>{m.dose}</div></div>
        <div style={{fontSize:11,color:T.tm}}>Refill: {m.refill}</div>
      </div>)}
    </CardSection>}
    {tab==="appts"&&<CardSection title="Upcoming" icon={Calendar} iconColor={T.ac} noPad right={<Btn small onClick={()=>setModal({type:"bookAppt",title:"Book Appointment"})}><Plus size={12}/>New</Btn>}>
      {patAppts.map(a=><div key={a.id} style={{padding:mob?"12px 14px":"16px 18px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:mob?10:14}}>
        <div style={{width:mob?42:48,height:mob?42:48,borderRadius:12,background:`${T.ac}12`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:mob?12:14,fontWeight:700,fontFamily:fm,color:T.ac}}>{a.date.split(" ")[1]}</span><span style={{fontSize:9,color:T.td,textTransform:"uppercase"}}>{a.date.split(" ")[0]}</span></div>
        <div style={{flex:1}}><div style={{fontSize:mob?13:14,fontWeight:600}}>{a.type}</div><div style={{fontSize:12,color:T.td}}>{a.prov} · {a.time}</div></div>
        <Btn small v="secondary" onClick={()=>setModal({type:"reschedule",title:"Reschedule",data:a})}>Reschedule</Btn>
      </div>)}
      {!patAppts.length&&<div style={{padding:24,textAlign:"center",color:T.td}}>No upcoming appointments</div>}
    </CardSection>}
  </div>
}

// ===== MAIN APP =====
function AppContent(){
  const{view,setView,usr,logout,showNotif,setShowNotif,unread,setModal}=useApp();
  const[mobSb,setMobSb]=useState(false);const[sbOpen,setSbOpen]=useState(true);const mob=useMob();

  if(view==="login"||!usr)return <LoginScreen/>;
  const isP=usr.role==="provider";
  const mainNav=isP?[{id:"dashboard",l:"Dashboard",ic:LayoutDashboard},{id:"symptom",l:"Symptom Checker",ic:Stethoscope},{id:"portal",l:"Patient Portal",ic:User}]:[{id:"portal",l:"My Health",ic:Heart},{id:"symptom",l:"Symptoms",ic:Stethoscope}];
  const toolsNav=isP?[{id:"drugIx",l:"Drug Interactions",ic:Pill},{id:"audit",l:"Audit Log",ic:ClipboardList},{id:"compliance",l:"Compliance",ic:Shield},{id:"kpis",l:"KPIs",ic:BarChart2},{id:"roadmap",l:"Roadmap",ic:GitBranch},{id:"risks",l:"Risk Management",ic:AlertTriangle},{id:"security",l:"Security",ic:Lock},{id:"settings",l:"Settings",ic:Settings}]:[{id:"settings",l:"Settings",ic:Settings}];
  const titles={drugIx:"Drug Interaction Database",audit:"Immutable Audit Log",compliance:"Regulatory Compliance",kpis:"Key Performance Indicators",roadmap:"Implementation Roadmap (20 Months)",risks:"Risk Management Matrix",security:"Security Architecture",settings:"Settings"};
  const nav=id=>{const item=[...mainNav,...toolsNav].find(n=>n.id===id);if(item&&titles[id]){setModal({type:id,title:titles[id]});setMobSb(false);return}setView(id);setMobSb(false)};

  const sbContent=(open)=><>
    <div style={{padding:"14px 12px",flex:1,overflowY:"auto"}}>
      {open&&<div style={{fontSize:10,color:T.td,textTransform:"uppercase",letterSpacing:1.5,padding:"0 8px 8px",fontWeight:600}}>Services</div>}
      <div style={{display:"flex",flexDirection:"column",gap:3}}>{mainNav.map(n=>open?<NavItem key={n.id} icon={n.ic} label={n.l} active={view===n.id} onClick={()=>nav(n.id)} badge={n.id==="dashboard"?unread:0}/>:<button key={n.id} onClick={()=>nav(n.id)} title={n.l} style={{width:42,height:42,borderRadius:10,border:"none",cursor:"pointer",background:view===n.id?`${T.pr}15`:"transparent",color:view===n.id?T.pr:T.td,display:"flex",alignItems:"center",justifyContent:"center",margin:"2px auto"}}><n.ic size={20}/></button>)}</div>
      {open&&<><div style={{fontSize:10,color:T.td,textTransform:"uppercase",letterSpacing:1.5,padding:"18px 8px 8px",fontWeight:600}}>{isP?"Architecture":"Tools"}</div><div style={{display:"flex",flexDirection:"column",gap:3}}>{toolsNav.map(n=><NavItem key={n.id} icon={n.ic} label={n.l} active={false} onClick={()=>nav(n.id)}/>)}</div></>}
    </div>
    {open&&<div style={{padding:"12px 14px",borderTop:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:34,height:34,borderRadius:8,background:isP?T.g1:T.g2,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{usr.ini}</span></div>
      <div style={{flex:1,overflow:"hidden"}}><div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{usr.name}</div><div style={{fontSize:11,color:T.td}}>{isP?usr.spec:"Patient"}</div></div>
      <button onClick={logout} style={{background:"none",border:"none",cursor:"pointer",color:T.td}}><LogOut size={16}/></button>
    </div>}
  </>;

  const content=<>{view==="dashboard"&&isP&&<ProviderDash/>}{view==="symptom"&&<SymptomChecker/>}{view==="portal"&&<PatientPortal/>}</>;

  if(mob)return <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100%",background:T.bg}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:`1px solid ${T.bd}`,background:T.sf,flexShrink:0,zIndex:30}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={()=>setMobSb(true)} style={{background:"none",border:"none",color:T.tx,cursor:"pointer",padding:4}}><Menu size={22}/></button><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:30,height:30,borderRadius:8,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={14} color="#fff"/></div><span style={{fontFamily:fd,fontWeight:700,fontSize:16}}>MedAI</span></div></div>
      <button onClick={()=>setShowNotif(true)} style={{background:"none",border:"none",color:T.tm,cursor:"pointer",padding:4,position:"relative"}}><Bell size={20}/>{unread>0&&<span style={{position:"absolute",top:2,right:2,width:8,height:8,borderRadius:"50%",background:T.dg}}/>}</button>
    </div>
    {mobSb&&<><div onClick={()=>setMobSb(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:40}}/><div className="animate-slide-left" style={{position:"fixed",top:0,left:0,bottom:0,width:280,background:T.sf,borderRight:`1px solid ${T.bd}`,zIndex:50,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"16px 18px",borderBottom:`1px solid ${T.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:36,height:36,borderRadius:10,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={18} color="#fff"/></div><div><div style={{fontFamily:fd,fontWeight:700,fontSize:15}}>MedAI</div><div style={{fontSize:10,color:T.td,textTransform:"uppercase"}}>v1.0 · Feb 2026</div></div></div><button onClick={()=>setMobSb(false)} style={{background:"none",border:"none",color:T.td,cursor:"pointer"}}><X size={20}/></button></div>
      {sbContent(true)}
    </div></>}
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>{content}</div>
    <div style={{display:"flex",background:T.sf,borderTop:`1px solid ${T.bd}`,padding:"4px 6px",paddingBottom:"max(4px,env(safe-area-inset-bottom))",flexShrink:0,zIndex:30}}>
      {mainNav.map(n=><MobNavItem key={n.id} icon={n.ic} label={n.l} active={view===n.id} onClick={()=>nav(n.id)} badge={n.id==="dashboard"?unread:0}/>)}
      <MobNavItem icon={Settings} label="More" active={false} onClick={()=>setMobSb(true)}/>
    </div>
    <NotifPanel/><ModalWrap/><Toast/>
  </div>;

  return <div style={{display:"flex",height:"100vh",width:"100%",overflow:"hidden",background:T.bg}}>
    <div style={{width:sbOpen?260:72,minWidth:sbOpen?260:72,background:T.sf,borderRight:`1px solid ${T.bd}`,display:"flex",flexDirection:"column",transition:"width .25s,min-width .25s",overflow:"hidden"}}>
      <div style={{padding:sbOpen?"18px 18px 14px":"18px 14px 14px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:10}}>
        <div onClick={()=>setSbOpen(!sbOpen)} style={{width:38,height:38,borderRadius:12,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}><Heart size={18} color="#fff"/></div>
        {sbOpen&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}><div style={{fontFamily:fd,fontWeight:700,fontSize:16}}>MedAI</div><div style={{fontSize:10,color:T.td,letterSpacing:.5,textTransform:"uppercase"}}>v1.0 · Feb 2026</div></div>}
      </div>
      {sbContent(sbOpen)}
    </div>
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"10px 24px",borderBottom:`1px solid ${T.bd}`,background:T.sf,flexShrink:0}}><button onClick={()=>setShowNotif(true)} style={{background:"none",border:"none",cursor:"pointer",color:T.tm,position:"relative",padding:4}}><Bell size={20}/>{unread>0&&<span style={{position:"absolute",top:2,right:2,width:8,height:8,borderRadius:"50%",background:T.dg}}/>}</button></div>
      <div style={{flex:1,overflow:"hidden"}}>{content}</div>
    </div>
    <NotifPanel/><ModalWrap/><Toast/>
  </div>;
}

export default function App(){return <AppProvider><AppContent/></AppProvider>}
