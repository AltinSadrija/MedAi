'use client';
import { createContext, useContext, useState, useCallback } from 'react';

// ===== THEME =====
export const T={bg:"#0A0F1C",surface:"#111827",card:"#1A2236",border:"#2A3550",primary:"#3B82F6",accent:"#10B981",warning:"#F59E0B",danger:"#EF4444",text:"#F1F5F9",textMuted:"#94A3B8",textDim:"#64748B",g1:"linear-gradient(135deg,#3B82F6,#8B5CF6)",g2:"linear-gradient(135deg,#10B981,#3B82F6)",g3:"linear-gradient(135deg,#F59E0B,#EF4444)"};
export const fd="'Outfit',sans-serif";
export const fm="'JetBrains Mono',monospace";

// ===== SYMPTOMS (Section 3.1 - Symptom Checker & Triage) =====
export const SYMPTOMS=[
  {id:1,name:"Headache",icon:"🤕",category:"neurological"},
  {id:2,name:"Fever",icon:"🌡️",category:"systemic"},
  {id:3,name:"Cough",icon:"😷",category:"respiratory"},
  {id:4,name:"Fatigue",icon:"😴",category:"systemic"},
  {id:5,name:"Chest Pain",icon:"💔",category:"cardiac",urgent:true},
  {id:6,name:"Nausea",icon:"🤢",category:"gi"},
  {id:7,name:"Shortness of Breath",icon:"😮‍💨",category:"respiratory",urgent:true},
  {id:8,name:"Dizziness",icon:"😵",category:"neurological"},
  {id:9,name:"Back Pain",icon:"🦴",category:"musculoskeletal"},
  {id:10,name:"Sore Throat",icon:"🗣️",category:"ent"},
  {id:11,name:"Abdominal Pain",icon:"🤕",category:"gi"},
  {id:12,name:"Joint Pain",icon:"🦵",category:"musculoskeletal"},
];

// ===== TRIAGE LEVELS (Section 5.1 Step 5) =====
export const TRIAGE_LEVELS={
  emergency:{label:"Emergency",color:T.danger,action:"Call 911 or go to nearest ER immediately",icon:"🚨"},
  urgent:{label:"Urgent",color:"#F97316",action:"Visit urgent care within 2-4 hours",icon:"⚠️"},
  semiUrgent:{label:"Semi-Urgent",color:T.warning,action:"Schedule appointment within 24-48 hours",icon:"📋"},
  nonUrgent:{label:"Non-Urgent",color:T.primary,action:"Schedule routine appointment within 1-2 weeks",icon:"📅"},
  selfCare:{label:"Self-Care",color:T.accent,action:"Monitor at home with recommended self-care measures",icon:"🏠"},
};

// ===== PATIENTS (Section 4.1 - multiple roles + full records) =====
export const PATIENTS=[
  {id:1,name:"Sarah Chen",age:34,dob:"1991-08-15",sex:"F",condition:"Type 2 Diabetes",risk:"medium",lastVisit:"Feb 12, 2026",vitals:{bp:"128/82",hr:76,temp:"98.4°F",spo2:"98%",weight:"142 lbs",height:"5'4\""},nextAppt:"Feb 20, 2026",meds:[{name:"Metformin 500mg",dose:"Twice daily",refill:"Mar 1"},{name:"Lisinopril 10mg",dose:"Once daily",refill:"Mar 5"}],allergies:["Penicillin","Sulfa"],insurance:"BlueCross PPO",phone:"(555) 123-4567",email:"sarah.chen@email.com",color:"#3B82F6",
    labs:[{test:"HbA1c",date:"Feb 8",value:"7.2%",status:"attention",prev:"7.8%",ref:"<5.7%"},{test:"Fasting Glucose",date:"Feb 8",value:"138 mg/dL",status:"attention",ref:"70-100"},{test:"Lipid Panel",date:"Feb 5",value:"LDL 118",status:"normal",ref:"<130"},{test:"Creatinine",date:"Feb 5",value:"0.9 mg/dL",status:"normal",ref:"0.6-1.2"}],
    careTeam:[{name:"Dr. Martinez",role:"PCP"},{name:"Dr. Patel",role:"Endocrinologist"}],
    carePlan:["HbA1c target <7%","Daily glucose monitoring","Low-carb diet plan","30 min exercise 5x/week","Quarterly lab work"],
    consents:{treatment:true,dataSharing:true,research:false,communication:true,deviceIntegration:true}},
  {id:2,name:"James Wilson",age:67,dob:"1958-03-22",sex:"M",condition:"Hypertension + COPD",risk:"high",lastVisit:"Feb 10, 2026",vitals:{bp:"152/94",hr:88,temp:"99.1°F",spo2:"93%",weight:"198 lbs",height:"5'10\""},nextAppt:"Feb 16, 2026",meds:[{name:"Amlodipine 5mg",dose:"Once daily",refill:"Feb 28"},{name:"Tiotropium 18mcg",dose:"Once daily inhaler",refill:"Mar 1"},{name:"Albuterol",dose:"PRN",refill:"N/A"}],allergies:["Aspirin","ACE Inhibitors"],insurance:"Medicare",phone:"(555) 234-5678",email:"j.wilson@email.com",color:"#EF4444",
    labs:[{test:"BMP",date:"Feb 10",value:"Within range",status:"normal",ref:"Normal"},{test:"SpO2 Trend",date:"Feb 15",value:"91-93%",status:"critical",ref:">95%"},{test:"Spirometry",date:"Jan 28",value:"FEV1 62%",status:"attention",ref:">80%"},{test:"BNP",date:"Feb 10",value:"180 pg/mL",status:"attention",ref:"<100"}],
    careTeam:[{name:"Dr. Martinez",role:"PCP"},{name:"Dr. Lung",role:"Pulmonologist"}],
    carePlan:["BP target <140/90","Daily SpO2 monitoring","Pulmonary rehab 3x/week","Smoking cessation support","Flu/pneumonia vaccines current"],
    consents:{treatment:true,dataSharing:true,research:true,communication:true,deviceIntegration:true}},
  {id:3,name:"Maria Garcia",age:28,dob:"1997-11-10",sex:"F",condition:"Prenatal Care (28 wks)",risk:"low",lastVisit:"Feb 14, 2026",vitals:{bp:"118/72",hr:82,temp:"98.6°F",spo2:"99%",weight:"156 lbs",height:"5'6\""},nextAppt:"Feb 28, 2026",meds:[{name:"Prenatal Vitamins",dose:"Once daily",refill:"Mar 10"},{name:"Iron 325mg",dose:"Once daily",refill:"Mar 10"}],allergies:[],insurance:"Aetna HMO",phone:"(555) 345-6789",email:"maria.g@email.com",color:"#10B981",
    labs:[{test:"CBC",date:"Feb 14",value:"Hgb 11.8",status:"normal",ref:"11-15"},{test:"Glucose Screen",date:"Feb 14",value:"118 mg/dL",status:"normal",ref:"<140"},{test:"Urinalysis",date:"Feb 14",value:"Normal",status:"normal",ref:"Normal"},{test:"Group B Strep",date:"Pending",value:"Pending",status:"pending",ref:"--"}],
    careTeam:[{name:"Dr. Martinez",role:"OB/GYN"}],
    carePlan:["Biweekly prenatal visits","Glucose monitoring","Daily fetal kick counts","Birth plan discussion at 32 wks","GBS screening at 36 wks"],
    consents:{treatment:true,dataSharing:true,research:false,communication:true,deviceIntegration:false}},
  {id:4,name:"Robert Kim",age:55,dob:"1970-06-05",sex:"M",condition:"Post-MI Recovery",risk:"high",lastVisit:"Feb 8, 2026",vitals:{bp:"136/88",hr:72,temp:"98.2°F",spo2:"96%",weight:"185 lbs",height:"5'9\""},nextAppt:"Feb 17, 2026",meds:[{name:"Aspirin 81mg",dose:"Once daily",refill:"Mar 5"},{name:"Metoprolol 50mg",dose:"Twice daily",refill:"Feb 28"},{name:"Atorvastatin 40mg",dose:"Once daily at bedtime",refill:"Mar 1"},{name:"Clopidogrel 75mg",dose:"Once daily",refill:"Mar 1"}],allergies:["Latex","Codeine"],insurance:"UnitedHealth",phone:"(555) 456-7890",email:"r.kim@email.com",color:"#F59E0B",
    labs:[{test:"Troponin",date:"Feb 8",value:"0.04 ng/mL",status:"normal",ref:"<0.04"},{test:"LDL",date:"Feb 8",value:"82 mg/dL",status:"normal",ref:"<70 (post-MI)"},{test:"ECG",date:"Feb 8",value:"NSR, old Q-waves",status:"attention",ref:"--"},{test:"BNP",date:"Feb 8",value:"95 pg/mL",status:"normal",ref:"<100"}],
    careTeam:[{name:"Dr. Martinez",role:"PCP"},{name:"Dr. Heart",role:"Cardiologist"}],
    carePlan:["Cardiac rehab 3x/week","LDL target <70","Daily BP/HR monitoring","Stress test at 6 months","Dietary sodium <2g/day"],
    consents:{treatment:true,dataSharing:true,research:true,communication:true,deviceIntegration:true}},
  {id:5,name:"Emily Brooks",age:42,dob:"1983-12-20",sex:"F",condition:"Anxiety + Insomnia",risk:"low",lastVisit:"Feb 11, 2026",vitals:{bp:"122/78",hr:68,temp:"98.5°F",spo2:"99%",weight:"135 lbs",height:"5'5\""},nextAppt:"Mar 5, 2026",meds:[{name:"Sertraline 50mg",dose:"Once daily morning",refill:"Mar 15"},{name:"Melatonin 3mg",dose:"At bedtime PRN",refill:"N/A"}],allergies:["Codeine"],insurance:"Cigna PPO",phone:"(555) 567-8901",email:"emily.b@email.com",color:"#8B5CF6",
    labs:[{test:"TSH",date:"Feb 11",value:"2.3 mIU/L",status:"normal",ref:"0.4-4.0"},{test:"CBC",date:"Feb 11",value:"Within range",status:"normal",ref:"Normal"},{test:"Vitamin D",date:"Feb 11",value:"28 ng/mL",status:"attention",ref:"30-100"},{test:"B12",date:"Feb 11",value:"450 pg/mL",status:"normal",ref:"200-900"}],
    careTeam:[{name:"Dr. Martinez",role:"PCP"},{name:"Dr. Mind",role:"Psychiatrist"}],
    carePlan:["CBT sessions biweekly","Sleep hygiene protocol","GAD-7 monthly assessment","Sertraline efficacy review at 12 weeks","Mindfulness practice daily"],
    consents:{treatment:true,dataSharing:false,research:false,communication:true,deviceIntegration:false}},
];

// ===== ALERTS (Section 5.2 Step 4 - CDS Alerts) =====
export const ALERTS=[
  {id:1,type:"critical",severity:"contraindicated",msg:"James Wilson — SpO2 dropped to 91%. Below 92% threshold for COPD patients. Immediate review recommended.",time:"12 min ago",pid:2,action:"Review vitals, consider O2 supplementation, evaluate for exacerbation",service:"Chronic Disease Coach"},
  {id:2,type:"warning",severity:"serious",msg:"Robert Kim — Missed medication check-in for 2 consecutive days. Clopidogrel adherence critical post-MI.",time:"1 hr ago",pid:4,action:"Contact patient, verify adherence, assess for side effects",service:"Medication Manager"},
  {id:3,type:"info",severity:"moderate",msg:"Sarah Chen — HbA1c improved from 7.8% to 7.2%. Current regimen effective. Consider goal adjustment.",time:"3 hrs ago",pid:1,action:"Review results, update care plan, positive reinforcement",service:"Clinical Decision Support"},
  {id:4,type:"warning",severity:"serious",msg:"Drug interaction: Amlodipine + Simvastatin risk of myopathy at high statin doses for James Wilson.",time:"5 hrs ago",pid:2,action:"Evaluate interaction severity, consider statin alternative",service:"Drug Interaction Alerts"},
  {id:5,type:"info",severity:"minor",msg:"Maria Garcia — 28-week prenatal labs complete. All within normal limits. GBS pending at 36 weeks.",time:"6 hrs ago",pid:3,action:"Review results at next visit, schedule 32-week ultrasound",service:"Post-Visit Follow-Up"},
  {id:6,type:"warning",severity:"moderate",msg:"Emily Brooks — PHQ-9 score increased from 8 to 12. Monitor closely for treatment response.",time:"8 hrs ago",pid:5,action:"Consider therapy adjustment, schedule follow-up within 2 weeks",service:"Mental Health Companion"},
];

// ===== APPOINTMENTS (Section 3.1 - Appointment Scheduler) =====
export const APPOINTMENTS=[
  {id:1,time:"9:00 AM",endTime:"9:30 AM",patient:"James Wilson",pid:2,type:"COPD Follow-up",status:"confirmed",duration:"30 min",notes:"Review SpO2 trends, adjust bronchodilator, check medication adherence",urgency:"urgent"},
  {id:2,time:"10:30 AM",endTime:"11:15 AM",patient:"New Patient Intake",pid:null,type:"Initial Consult",status:"confirmed",duration:"45 min",notes:"Full intake — demographics, history, insurance verification, consent collection",urgency:"routine"},
  {id:3,time:"11:15 AM",endTime:"11:35 AM",patient:"Sarah Chen",pid:1,type:"Lab Review",status:"pending",duration:"20 min",notes:"HbA1c results review, care plan update, Metformin efficacy assessment",urgency:"routine"},
  {id:4,time:"1:00 PM",endTime:"1:30 PM",patient:"Robert Kim",pid:4,type:"Cardiac Rehab",status:"confirmed",duration:"30 min",notes:"Post-MI progress evaluation, medication review, exercise tolerance",urgency:"semi-urgent"},
  {id:5,time:"2:30 PM",endTime:"2:55 PM",patient:"Emily Brooks",pid:5,type:"Telehealth",status:"confirmed",duration:"25 min",notes:"Anxiety follow-up, sleep quality review, PHQ-9 assessment",urgency:"routine"},
  {id:6,time:"3:45 PM",endTime:"4:15 PM",patient:"Maria Garcia",pid:3,type:"Prenatal Check",status:"pending",duration:"30 min",notes:"28-week prenatal visit, glucose screen review, birth plan discussion",urgency:"routine"},
];

// ===== CONSENT TYPES (Section 4.2) =====
export const CONSENT_TYPES=[
  {id:"treatment",label:"Treatment Consent",desc:"AI clinical decision support during active care",icon:"🏥"},
  {id:"dataSharing",label:"Data Sharing Consent",desc:"Share health data with labs, pharmacies, specialists",icon:"🔗"},
  {id:"research",label:"Research Consent",desc:"De-identified data for AI training and clinical research",icon:"🔬"},
  {id:"communication",label:"Communication Consent",desc:"Contact via SMS, email, phone for reminders and results",icon:"📱"},
  {id:"deviceIntegration",label:"Device Integration",desc:"Receive data from wearables and connected devices",icon:"⌚"},
];

// ===== COMPLIANCE (Section 7.1) =====
export const COMPLIANCE_STATUS=[
  {reg:"HIPAA",status:"compliant",lastAudit:"Jan 15, 2026",next:"Apr 15, 2026"},
  {reg:"HITECH",status:"compliant",lastAudit:"Jan 15, 2026",next:"Apr 15, 2026"},
  {reg:"FDA CDS Guidance",status:"under review",lastAudit:"Dec 10, 2025",next:"Mar 10, 2026"},
  {reg:"GDPR",status:"compliant",lastAudit:"Nov 20, 2025",next:"May 20, 2026"},
  {reg:"42 CFR Part 2",status:"compliant",lastAudit:"Jan 5, 2026",next:"Apr 5, 2026"},
  {reg:"TEFCA",status:"in progress",lastAudit:"N/A",next:"Jun 1, 2026"},
];

// ===== KPIs (Section 11) =====
export const KPIS=[
  {name:"Clinical Accuracy",value:"96.3%",target:">95%",trend:"+1.2%",status:"met",freq:"Monthly"},
  {name:"Triage Accuracy",value:"93.8%",target:">92%",trend:"+0.5%",status:"met",freq:"Weekly"},
  {name:"Provider Adoption",value:"78%",target:">80%",trend:"+6%",status:"near",freq:"Monthly"},
  {name:"Patient Satisfaction",value:"74 NPS",target:">70",trend:"+4",status:"met",freq:"Quarterly"},
  {name:"Documentation Time Savings",value:"42%",target:">40%",trend:"+3%",status:"met",freq:"Monthly"},
  {name:"Consent Compliance",value:"100%",target:"100%",trend:"—",status:"met",freq:"Real-time"},
  {name:"System Uptime",value:"99.997%",target:">99.99%",trend:"—",status:"met",freq:"Real-time"},
  {name:"Bias Variance",value:"2.1%",target:"<3%",trend:"-0.4%",status:"met",freq:"Quarterly"},
];

// ===== IMPLEMENTATION PHASES (Section 9) =====
export const PHASES=[
  {phase:1,name:"Foundation",months:"1–4",status:"complete",progress:100,items:["HIPAA infrastructure","RBAC + IAM","Consent management","Audit logging","EHR/FHIR integration","Patient portal"]},
  {phase:2,name:"Core AI Services",months:"5–8",status:"in-progress",progress:72,items:["Symptom checker & triage","Medication manager","Basic CDS","Communication hub","Appointment scheduler","Mobile app"]},
  {phase:3,name:"Advanced Clinical",months:"9–12",status:"planned",progress:0,items:["Ambient documentation","Diagnostic imaging AI","Prior auth automation","Chronic disease coaching","Population health dashboard","Advanced CDS"]},
  {phase:4,name:"Optimization",months:"13–16",status:"planned",progress:0,items:["Mental health companion","Pharmacogenomics","Revenue cycle optimization","Staff scheduling","Advanced analytics","Telehealth integration"]},
  {phase:5,name:"Scale & Governance",months:"17–20",status:"planned",progress:0,items:["Multi-site deployment","Developer API","AI governance dashboard","FDA submission","Continuous learning pipeline","Training program"]},
];

// ===== DRUG INTERACTIONS (Section 3.2 - Drug Interaction Alerts) =====
export const DRUG_INTERACTIONS=[
  {drug1:"Amlodipine",drug2:"Simvastatin",severity:"serious",effect:"Increased risk of myopathy/rhabdomyolysis at high statin doses",recommendation:"Limit simvastatin to 20mg or switch to alternative statin"},
  {drug1:"Metformin",drug2:"Contrast Dye",severity:"serious",effect:"Risk of lactic acidosis",recommendation:"Hold metformin 48hrs before/after contrast procedures"},
  {drug1:"Sertraline",drug2:"Tramadol",severity:"contraindicated",effect:"Serotonin syndrome risk",recommendation:"Avoid combination — use alternative analgesic"},
  {drug1:"Clopidogrel",drug2:"Omeprazole",severity:"moderate",effect:"Reduced antiplatelet effect",recommendation:"Switch to pantoprazole if PPI needed"},
];

// ===== AUDIT LOG (Section 2.2 & 8.1) =====
export const AUDIT_LOG=[
  {id:1,timestamp:"2026-02-15 14:23:01",actor:"Dr. Martinez",action:"Viewed patient record",target:"James Wilson",justification:"Active care relationship",service:"EHR"},
  {id:2,timestamp:"2026-02-15 14:20:15",actor:"System",action:"AI alert generated",target:"James Wilson",justification:"SpO2 < 92% threshold",service:"Chronic Disease Coach"},
  {id:3,timestamp:"2026-02-15 13:45:00",actor:"Sarah Chen",action:"Consent updated",target:"Research consent revoked",justification:"Patient preference",service:"Consent Management"},
  {id:4,timestamp:"2026-02-15 12:30:22",actor:"Dr. Martinez",action:"CDS recommendation viewed",target:"Robert Kim",justification:"Encounter in progress",service:"CDS Engine"},
  {id:5,timestamp:"2026-02-15 11:15:00",actor:"System",action:"Drug interaction flagged",target:"James Wilson — Amlodipine+Simvastatin",justification:"Automated screening",service:"Drug Interaction Checker"},
];

// ===== SECURITY METRICS (Section 8) =====
export const SECURITY={
  mfaEnforced:true,encryptionAtRest:"AES-256",encryptionTransit:"TLS 1.3",
  sessionTimeout:{clinical:"15 min",patient:"30 min"},
  lastPenTest:"Jan 2026",nextPenTest:"Apr 2026",
  activeThreats:0,blockedAttempts:847,
  keyRotation:"90 days (auto)",lastRotation:"Jan 15, 2026",
};

// ===== RISK MANAGEMENT (Section 10) =====
export const RISKS=[
  {risk:"AI Misdiagnosis",severity:"Critical",mitigation:"Human review mandatory, confidence thresholds, clinical benchmarks",owner:"Clinical Director",status:"mitigated"},
  {risk:"Data Breach",severity:"Critical",mitigation:"Defense-in-depth, encryption everywhere, DLP, incident response plan",owner:"CISO",status:"mitigated"},
  {risk:"Algorithmic Bias",severity:"High",mitigation:"Diverse training data, quarterly bias audits, model cards",owner:"AI Ethics Lead",status:"monitoring"},
  {risk:"Regulatory Non-Compliance",severity:"High",mitigation:"Dedicated compliance team, automated monitoring, legal review",owner:"Compliance Officer",status:"mitigated"},
  {risk:"System Downtime",severity:"High",mitigation:"99.99% SLA, multi-region, automated failover, DR testing",owner:"VP Engineering",status:"mitigated"},
];

// ===== CONTEXT =====
const Ctx=createContext(null);
export function AppProvider({children}){
  const [view,setView]=useState("login");
  const [user,setUser]=useState(null);
  const [notifs,setNotifs]=useState(ALERTS.map(a=>({...a,read:false})));
  const [showNotif,setShowNotif]=useState(false);
  const [modal,setModal]=useState(null);
  const [appts,setAppts]=useState(APPOINTMENTS);
  const [patAppts,setPatAppts]=useState([
    {id:1,date:"Feb 20, 2026",time:"10:00 AM",provider:"Dr. Martinez",type:"Annual Physical",location:"Main Clinic, Room 204"},
    {id:2,date:"Mar 5, 2026",time:"2:30 PM",provider:"Dr. Lee",type:"Dermatology",location:"Specialty Clinic, Suite 301"},
  ]);
  const [toastMsg,setToast]=useState(null);
  const toast=useCallback(m=>{setToast(m);setTimeout(()=>setToast(null),3000)},[]);
  const login=useCallback(role=>{
    setUser(role==="provider"?{name:"Dr. Martinez",role:"provider",specialty:"Internal Medicine",initials:"DM"}
      :{name:"Alex Johnson",role:"patient",initials:"AJ"});
    setView(role==="provider"?"dashboard":"portal");
  },[]);
  const logout=useCallback(()=>{setUser(null);setView("login")},[]);
  const markRead=useCallback(id=>setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n)),[]);
  const markAllRead=useCallback(()=>setNotifs(p=>p.map(n=>({...n,read:true}))),[]);
  const cancelAppt=useCallback(id=>{setAppts(p=>p.map(a=>a.id===id?{...a,status:"cancelled"}:a));toast("Appointment cancelled")},[toast]);
  const confirmAppt=useCallback(id=>{setAppts(p=>p.map(a=>a.id===id?{...a,status:"confirmed"}:a));toast("Appointment confirmed")},[toast]);
  const rescheduleAppt=useCallback((id)=>{setPatAppts(p=>p.map(a=>a.id===id?{...a,date:"Mar 15, 2026",time:"11:00 AM"}:a));toast("Rescheduled to Mar 15 at 11:00 AM")},[toast]);
  const addAppt=useCallback(a=>{setPatAppts(p=>[...p,{id:Date.now(),...a}]);toast("Appointment booked")},[toast]);
  const unread=notifs.filter(n=>!n.read).length;
  return <Ctx.Provider value={{view,setView,user,login,logout,notifs,showNotif,setShowNotif,markRead,markAllRead,unread,modal,setModal,toast,toastMsg,appts,cancelAppt,confirmAppt,patAppts,rescheduleAppt,addAppt}}>{children}</Ctx.Provider>;
}
export function useApp(){return useContext(Ctx)}

// Patient portal records (compat)
export const PATIENT_RECORDS={
  labs:PATIENTS[0].labs,
  vitalsHistory:[{date:"Feb 15",bp:122,hr:72},{date:"Feb 8",bp:128,hr:75},{date:"Feb 1",bp:130,hr:78},{date:"Jan 25",bp:126,hr:74},{date:"Jan 18",bp:132,hr:80},{date:"Jan 11",bp:124,hr:71}],
  medications:PATIENTS[0].meds.map((m,i)=>({id:i+1,name:m.name,schedule:m.dose,refillDate:m.refill,status:i<2?"active":"prn"})),
  upcomingAppts:[{id:1,date:"Feb 20, 2026",time:"10:00 AM",provider:"Dr. Martinez",type:"Annual Physical",location:"Main Clinic, Room 204"},{id:2,date:"Mar 5, 2026",time:"2:30 PM",provider:"Dr. Lee",type:"Dermatology",location:"Specialty Clinic, Suite 301"}],
};
