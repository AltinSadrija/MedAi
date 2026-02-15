'use client';
import{createContext,useContext,useState,useCallback}from'react';

// ===== THEME =====
export const T={bg:"#0A0F1C",sf:"#111827",cd:"#1A2236",bd:"#2A3550",bl:"#374262",p:"#3B82F6",pd:"#2563EB",a:"#10B981",w:"#F59E0B",d:"#EF4444",tx:"#F1F5F9",tm:"#94A3B8",td:"#64748B",g1:"linear-gradient(135deg,#3B82F6,#8B5CF6)",g2:"linear-gradient(135deg,#10B981,#3B82F6)",g3:"linear-gradient(135deg,#F59E0B,#EF4444)",pp:"#8B5CF6"};
export const fd="'Outfit',sans-serif";
export const fm="'JetBrains Mono',monospace";

// ===== ARCHITECTURE (Section 2) =====
export const ARCH_LAYERS=[
  {name:"Presentation Layer",components:"Web App, Mobile App (iOS/Android), Provider Portal, Patient Portal, API Gateway",color:T.p},
  {name:"API & Orchestration",components:"RESTful APIs, GraphQL, WebSocket (real-time), Event Bus, Rate Limiter",color:T.a},
  {name:"AI/ML Services",components:"NLP Engine, Clinical Reasoning Engine, Symptom Analyzer, Drug Interaction Checker, Triage Module",color:T.pp},
  {name:"Integration Layer",components:"EHR/EMR Adapters (HL7 FHIR), Lab Systems, Pharmacy Systems, Insurance/Payer APIs, Telehealth Bridge",color:T.w},
  {name:"Data Layer",components:"Patient Data Store (encrypted), Clinical Knowledge Base, Audit Log DB, Analytics Warehouse, Model Registry",color:"#EC4899"},
  {name:"Infrastructure",components:"HIPAA-compliant Cloud (AWS GovCloud/Azure), Kubernetes, WAF, HSM Key Management",color:T.d},
];

// ===== SERVICES CATALOG (Section 3) =====
export const PATIENT_SERVICES=[
  {id:"symptom",name:"Symptom Checker & Triage",desc:"Conversational AI collecting symptoms, history, and contextual factors for risk assessment and triage (Emergency/Urgent/Semi-Urgent/Non-Urgent/Self-Care).",perms:"Patient consent, age verification, disclaimers acknowledgment",icon:"🩺"},
  {id:"medmgr",name:"Medication Manager",desc:"Tracks prescriptions, checks drug-drug and drug-food interactions, sends refill reminders, flags contraindications.",perms:"Pharmacy data consent, medication list access",icon:"💊"},
  {id:"appt",name:"Appointment Scheduler",desc:"AI-assisted scheduling considering provider availability, preferences, urgency, insurance network, and travel distance.",perms:"Calendar access, provider directory, insurance verification",icon:"📅"},
  {id:"records",name:"Health Records Viewer",desc:"Secure portal for lab results, visit summaries, immunizations, and care plans with AI-generated plain-language explanations.",perms:"PHI access authorization, identity verification (MFA)",icon:"📋"},
  {id:"chronic",name:"Chronic Disease Coach",desc:"Personalized coaching for diabetes, hypertension, asthma. Goal setting, daily check-ins, trend analysis, escalation alerts.",perms:"Health data sharing consent, device integration consent",icon:"🫀"},
  {id:"mental",name:"Mental Health Companion",desc:"Guided CBT exercises, mood tracking, journaling, crisis detection with automatic escalation to human counselors.",perms:"Mental health data consent, emergency contact authorization, crisis protocol",icon:"🧠"},
  {id:"followup",name:"Post-Visit Follow-Up",desc:"Automated check-ins after appointments/procedures to monitor recovery, medication adherence, and flag complications.",perms:"Visit data access, communication preference consent",icon:"📞"},
];
export const PROVIDER_SERVICES=[
  {id:"cds",name:"Clinical Decision Support",desc:"Real-time evidence-based suggestions: differential diagnoses, recommended tests, treatment protocols, guideline adherence alerts.",perms:"EHR read access, clinical data scope, CDS module license",icon:"🔬"},
  {id:"aidoc",name:"AI-Assisted Documentation",desc:"Ambient listening for SOAP notes, ICD-10/CPT codes, referral letters. Provider reviews before finalization.",perms:"Audio consent (patient+provider), EHR write access, NLP consent",icon:"📝"},
  {id:"imaging",name:"Diagnostic Image Analysis",desc:"AI analysis of X-ray, CT, MRI and pathology slides highlighting areas of concern with probability scores.",perms:"DICOM access, radiology integration, FDA 510(k) clearance",icon:"🔍"},
  {id:"pophealth",name:"Population Health Dashboard",desc:"Risk stratification, care gaps, quality measures, predictive risk models across patient panels.",perms:"De-identified data access, analytics role, HIPAA minimum necessary",icon:"📊"},
  {id:"priorauth",name:"Prior Authorization Automation",desc:"AI extraction of clinical criteria from payer policies, auto-population of PA forms, real-time status.",perms:"Insurance data access, claims integration, provider delegation",icon:"📄"},
  {id:"drugalert",name:"Drug Interaction & Allergy Alerts",desc:"Cross-references medications against allergies, active meds, genomic data, and evidence databases.",perms:"Medication list access, allergy data, pharmacogenomic consent",icon:"⚠️"},
];
export const ADMIN_SERVICES=[
  {id:"revenue",name:"Revenue Cycle Optimization",desc:"AI coding accuracy checks, denial prediction, automated appeal generation.",perms:"Billing data, claims history, admin role",icon:"💰"},
  {id:"staffsched",name:"Staff Scheduling Optimizer",desc:"Predicts patient volume and optimizes provider/staff schedules for utilization.",perms:"Scheduling system, HR availability, analytics role",icon:"👥"},
  {id:"compliance",name:"Compliance Monitor",desc:"Continuous scanning against HIPAA, Stark Law, Anti-Kickback regulations.",perms:"Full audit logs, compliance officer role, cross-dept read",icon:"🛡️"},
  {id:"comhub",name:"Patient Communication Hub",desc:"Outbound communications: reminders, test results, wellness campaigns via SMS, email, portal, mail.",perms:"Contact info, communication preferences, marketing consent",icon:"📨"},
];

// ===== RBAC ROLES (Section 4.1) =====
export const ROLES=[
  {id:"patient",name:"Patient",perms:"View own records, use patient AI services, manage consent, communicate with care team, export data",scope:"Own data only",color:T.a},
  {id:"caregiver",name:"Caregiver / Proxy",perms:"All Patient permissions for designated dependents, manage appointments, receive alerts",scope:"Designated patient data; requires legal authorization",color:"#06B6D4"},
  {id:"nurse",name:"Nurse / Medical Assistant",perms:"View assigned patients, document vitals, use triage AI, escalate to provider, care coordination",scope:"Assigned patients; department-scoped",color:T.w},
  {id:"physician",name:"Physician / Provider",perms:"Full CDS access, order entry, prescribing, AI documentation, diagnostic imaging, full patient history",scope:"Care-team patients; break-glass for emergencies",color:T.p},
  {id:"specialist",name:"Specialist",perms:"Provider scope within specialty, cross-referral access, AI consultation tools",scope:"Referred patients; specialty-scoped",color:T.pp},
  {id:"pharmacist",name:"Pharmacist",perms:"Medication management, drug interaction AI, dispensing workflow, patient counseling",scope:"Medication data; pharmacy-scoped",color:"#EC4899"},
  {id:"admin",name:"Administrator",perms:"Scheduling, billing, reporting, compliance tools, patient communication, user management",scope:"De-identified for analytics; identified for billing with justification",color:T.w},
  {id:"compliance_officer",name:"Compliance Officer",perms:"Full audit logs, compliance monitoring AI, policy management, breach investigation",scope:"Read-only cross-department; cannot modify clinical data",color:T.d},
  {id:"sysadmin",name:"System Administrator",perms:"Platform configuration, integration management, model deployment, security settings",scope:"Infrastructure only; no patient data without explicit grant",color:T.td},
  {id:"mleng",name:"AI/ML Engineer",perms:"Model training pipeline, performance monitoring, bias detection, model registry",scope:"De-identified/synthetic data only; no production PHI",color:"#14B8A6"},
];

// ===== CONSENT TYPES (Section 4.2) =====
export const CONSENT_TYPES=[
  {id:"treatment",name:"Treatment Consent",desc:"Permits AI for clinical decision support during active care. Required for symptom checking, CDS, triage.",init:"Per-encounter or standing; provider-initiated",duration:"Active care episode",color:T.p},
  {id:"datashare",name:"Data Sharing Consent",desc:"Authorizes sharing health data with specific entities (labs, pharmacies, specialists, insurance). Granular per data type.",init:"Per-recipient and per-data-type; patient-initiated",duration:"Until revoked or expiry date",color:T.a},
  {id:"research",name:"Research Consent",desc:"Allows de-identified data for AI model training, clinical research, and quality improvement studies.",init:"Opt-in with IRB approval; patient-initiated",duration:"Per-study or blanket with annual renewal",color:T.pp},
  {id:"communication",name:"Communication Consent",desc:"Authorizes contact via specific channels (SMS, email, phone, push) for reminders, results, and wellness.",init:"Per-channel; patient-initiated",duration:"Until revoked",color:T.w},
  {id:"device",name:"Device Integration Consent",desc:"Permits receiving and processing data from wearables, glucometers, BP monitors, and connected devices.",init:"Per-device; patient-initiated",duration:"Until device disconnected or revoked",color:"#EC4899"},
  {id:"emergency",name:"Emergency Override",desc:"Pre-authorized/implied consent for life-threatening situations. Strictly time-limited and fully audited.",init:"Automatic; provider-triggered with justification",duration:"Emergency duration (max 72 hours)",color:T.d},
  {id:"minor",name:"Minor/Guardian Consent",desc:"Parental/guardian authorization for patients under 18, with age-appropriate carve-outs for sensitive services.",init:"Guardian-initiated; verified against legal docs",duration:"Until age of majority or emancipation",color:"#06B6D4"},
];

// ===== KPIs (Section 11) =====
export const KPIS=[
  {name:"Clinical Accuracy",desc:"AI recommendation concordance with specialist review",target:">95%",current:"96.3%",measurement:"Monthly",color:T.a,pct:96.3},
  {name:"Triage Accuracy",desc:"Correct urgency classification vs. clinical outcome",target:">92%",current:"94.1%",measurement:"Weekly",color:T.p,pct:94.1},
  {name:"Provider Adoption",desc:"% of eligible providers actively using CDS tools",target:">80%",current:"78%",measurement:"Monthly",color:T.w,pct:78},
  {name:"Patient Satisfaction",desc:"NPS score for AI-assisted interactions",target:">70",current:"74",measurement:"Quarterly",color:T.pp,pct:74},
  {name:"Documentation Savings",desc:"Reduction in provider documentation time per encounter",target:">40%",current:"43%",measurement:"Monthly",color:T.a,pct:43},
  {name:"Consent Compliance",desc:"% of data access events with valid consent",target:"100%",current:"100%",measurement:"Real-time",color:T.a,pct:100},
  {name:"System Uptime",desc:"Platform availability excluding scheduled maintenance",target:">99.99%",current:"99.98%",measurement:"Real-time",color:T.p,pct:99.98},
  {name:"Bias Variance",desc:"Max performance differential across demographic groups",target:"<3%",current:"2.1%",measurement:"Quarterly",color:T.w,pct:97.9},
  {name:"Breach Incidents",desc:"Number of confirmed PHI breach events",target:"Zero",current:"0",measurement:"Continuous",color:T.a,pct:100},
  {name:"Mean Time to Detection",desc:"Average time to detect security anomalies",target:"<15 min",current:"11 min",measurement:"Monthly",color:T.p,pct:73},
];

// ===== RISKS (Section 10) =====
export const RISKS=[
  {risk:"AI Misdiagnosis",severity:"Critical",mitigation:"Mandatory human review, confidence thresholds, validation benchmarks, adverse event tracking",owner:"Clinical Director",color:T.d},
  {risk:"Data Breach / PHI Exposure",severity:"Critical",mitigation:"Defense-in-depth, encryption everywhere, DLP, incident response plan, penetration testing",owner:"CISO",color:T.d},
  {risk:"Algorithmic Bias",severity:"High",mitigation:"Diverse training data, fairness metrics, quarterly bias audits, diverse advisory board, model cards",owner:"AI Ethics Lead",color:T.w},
  {risk:"Regulatory Non-Compliance",severity:"High",mitigation:"Dedicated compliance team, automated monitoring, legal review, regulatory change tracking",owner:"Compliance Officer",color:T.w},
  {risk:"System Downtime",severity:"High",mitigation:"99.99% SLA, multi-region deployment, automated failover, graceful degradation, DR testing",owner:"VP Engineering",color:T.w},
  {risk:"Patient Trust / Adoption",severity:"Medium",mitigation:"Transparent AI disclosure, patient education, opt-out options, feedback channels, advisory council",owner:"Product Manager",color:T.p},
  {risk:"Integration Failures",severity:"Medium",mitigation:"Standardized FHIR protocols, fallback mechanisms, circuit breakers, health monitoring, vendor SLA",owner:"Integration Lead",color:T.p},
  {risk:"Model Drift / Degradation",severity:"Medium",mitigation:"Continuous monitoring, automated alerts, retraining pipeline, A/B testing, rollback capability",owner:"ML Ops Lead",color:T.p},
];

// ===== ROADMAP (Section 9) =====
export const ROADMAP=[
  {phase:"Phase 1: Foundation",months:"Months 1–4",items:["HIPAA-compliant infrastructure","Identity & access management (RBAC)","Consent management service","Audit logging framework","EHR integration (FHIR R4)","Patient portal with health records"],team:"Infrastructure, Security, Integration",color:T.p,pct:100},
  {phase:"Phase 2: Core AI",months:"Months 5–8",items:["Symptom checker & triage engine","Medication manager with drug interactions","Clinical decision support (basic)","Patient communication hub","Appointment scheduling AI","Mobile app (iOS + Android)"],team:"AI/ML, Clinical Advisory, Mobile",color:T.a,pct:75},
  {phase:"Phase 3: Advanced Clinical",months:"Months 9–12",items:["Ambient clinical documentation","Diagnostic image analysis (radiology)","Prior authorization automation","Chronic disease coaching","Population health dashboard","Advanced CDS with differential diagnosis"],team:"AI/ML, Radiology, Clinical Validation",color:T.pp,pct:40},
  {phase:"Phase 4: Optimization",months:"Months 13–16",items:["Mental health companion","Pharmacogenomic integration","Revenue cycle optimization","Staff scheduling optimizer","Advanced analytics & predictive models","Telehealth deep integration"],team:"Full cross-functional, External partners",color:T.w,pct:10},
  {phase:"Phase 5: Scale & Governance",months:"Months 17–20",items:["Multi-site deployment","Third-party developer API","Advanced bias monitoring & AI governance","FDA submission for CDS modules","Continuous learning pipeline","Comprehensive training program"],team:"Executive, Legal/Regulatory, Training",color:T.d,pct:0},
];

// ===== SECURITY CONTROLS (Section 8) =====
export const SECURITY=[
  {area:"Authentication",details:"MFA for all users. Biometric + password for providers. FIDO2/WebAuthn. Session timeout: 15 min (clinical), 30 min (patient).",status:"active"},
  {area:"Authorization",details:"RBAC + ABAC with real-time policy evaluation. SMART on FHIR scopes. Consent-gated data access. Least privilege enforced.",status:"active"},
  {area:"Encryption",details:"AES-256 at rest, TLS 1.3 in transit, field-level encryption for SSN/genomic. HSM-managed keys, 90-day rotation.",status:"active"},
  {area:"Network Security",details:"Zero-trust with microsegmentation. WAF, DDoS protection, IDS/IPS. No direct DB access from public networks.",status:"active"},
  {area:"Audit & Monitoring",details:"Immutable audit logs for all access/decisions. SIEM integration with real-time anomaly detection. 7-year retention.",status:"active"},
  {area:"Incident Response",details:"Automated breach detection, 1-hour containment SLA, 24-hour assessment, 60-day notification compliance.",status:"active"},
  {area:"Vulnerability Management",details:"Weekly automated scans, quarterly pentesting, annual third-party audit. Bug bounty program.",status:"active"},
  {area:"Data Loss Prevention",details:"DLP agents on all endpoints/egress. PHI pattern detection. USB and print controls in clinical environments.",status:"active"},
];

// ===== COMPLIANCE (Section 7) =====
export const COMPLIANCE=[
  {reg:"HIPAA",desc:"Privacy Rule, Security Rule, Breach Notification Rule. BAAs with all vendors.",status:"Compliant"},
  {reg:"HITECH Act",desc:"Meaningful use, breach notification requirements, increased penalties.",status:"Compliant"},
  {reg:"FDA CDS Guidance",desc:"Software as Medical Device classification for applicable functions.",status:"Under Review"},
  {reg:"GDPR",desc:"EU patient data rights, DPO appointment, cross-border data transfer compliance.",status:"Compliant"},
  {reg:"42 CFR Part 2",desc:"Substance use disorder records — separate, more restrictive consent.",status:"Compliant"},
  {reg:"TEFCA",desc:"Support interoperability without unreasonable barriers.",status:"In Progress"},
  {reg:"AI Transparency",desc:"Algorithmic fairness, model cards, explainability, adverse event reporting.",status:"Active"},
];

// ===== MOCK CLINICAL DATA =====
export const PATIENTS=[
  {id:1,name:"Sarah Chen",age:34,condition:"Type 2 Diabetes",risk:"medium",vitals:{bp:"128/82",hr:76,temp:"98.4°F",spo2:"98%"},nextAppt:"Feb 20, 2026",meds:["Metformin 500mg","Lisinopril 10mg"],color:T.p,email:"sarah.chen@email.com",phone:"(555) 123-4567",insurance:"BlueCross PPO",allergies:["Penicillin","Sulfa"],consents:["treatment","datashare","communication"]},
  {id:2,name:"James Wilson",age:67,condition:"Hypertension + COPD",risk:"high",vitals:{bp:"152/94",hr:88,temp:"99.1°F",spo2:"93%"},nextAppt:"Feb 16, 2026",meds:["Amlodipine 5mg","Tiotropium 18mcg","Albuterol PRN"],color:T.d,email:"j.wilson@email.com",phone:"(555) 234-5678",insurance:"Medicare",allergies:["Aspirin"],consents:["treatment","datashare","communication","device"]},
  {id:3,name:"Maria Garcia",age:28,condition:"Prenatal Care",risk:"low",vitals:{bp:"118/72",hr:82,temp:"98.6°F",spo2:"99%"},nextAppt:"Feb 28, 2026",meds:["Prenatal Vitamins","Iron Supplement"],color:T.a,email:"maria.g@email.com",phone:"(555) 345-6789",insurance:"Aetna HMO",allergies:[],consents:["treatment","communication"]},
  {id:4,name:"Robert Kim",age:55,condition:"Post-MI Recovery",risk:"high",vitals:{bp:"136/88",hr:72,temp:"98.2°F",spo2:"96%"},nextAppt:"Feb 17, 2026",meds:["Aspirin 81mg","Metoprolol 50mg","Atorvastatin 40mg","Clopidogrel 75mg"],color:T.w,email:"r.kim@email.com",phone:"(555) 456-7890",insurance:"UnitedHealth",allergies:["Latex"],consents:["treatment","datashare","communication","device","research"]},
  {id:5,name:"Emily Brooks",age:42,condition:"Anxiety + Insomnia",risk:"low",vitals:{bp:"122/78",hr:68,temp:"98.5°F",spo2:"99%"},nextAppt:"Mar 5, 2026",meds:["Sertraline 50mg","Melatonin 3mg"],color:T.pp,email:"emily.b@email.com",phone:"(555) 567-8901",insurance:"Cigna PPO",allergies:["Codeine"],consents:["treatment","datashare","communication","research"]},
];

export const ALERTS=[
  {id:1,type:"critical",msg:"James Wilson — SpO2 dropped to 91%. Immediate review recommended.",time:"12 min ago",pid:2,action:"Review vitals, consider O2 supplementation",severity:"contraindicated"},
  {id:2,type:"warning",msg:"Robert Kim — Missed medication check-in for 2 consecutive days.",time:"1 hr ago",pid:4,action:"Contact patient, verify medication adherence"},
  {id:3,type:"info",msg:"Sarah Chen — HbA1c results: 7.2% (improved from 7.8%).",time:"3 hrs ago",pid:1,action:"Review labs, update care plan"},
  {id:4,type:"warning",msg:"Drug interaction: Amlodipine + Simvastatin flagged for James Wilson.",time:"5 hrs ago",pid:2,action:"Evaluate interaction, consider alternatives",severity:"serious"},
  {id:5,type:"info",msg:"Maria Garcia — 28-week prenatal labs complete. All within normal range.",time:"6 hrs ago",pid:3,action:"Review and confirm at next visit"},
  {id:6,type:"critical",msg:"Emily Brooks — PHQ-9 score increased to 18 (moderately severe). Crisis protocol evaluation needed.",time:"8 hrs ago",pid:5,action:"Schedule urgent follow-up, evaluate crisis protocol"},
];

export const APPTS=[
  {id:1,time:"9:00 AM",patient:"James Wilson",pid:2,type:"Follow-up",status:"confirmed",duration:"30 min",notes:"Review COPD management, SpO2 trends"},
  {id:2,time:"10:30 AM",patient:"New Patient",pid:null,type:"Initial Consult",status:"confirmed",duration:"45 min",notes:"Full intake"},
  {id:3,time:"11:15 AM",patient:"Sarah Chen",pid:1,type:"Lab Review",status:"pending",duration:"20 min",notes:"Review HbA1c and lipid panel"},
  {id:4,time:"1:00 PM",patient:"Robert Kim",pid:4,type:"Cardiac Rehab",status:"confirmed",duration:"30 min",notes:"Progress eval, medication review"},
  {id:5,time:"2:30 PM",patient:"Emily Brooks",pid:5,type:"Telehealth",status:"confirmed",duration:"25 min",notes:"Anxiety management follow-up"},
  {id:6,time:"3:45 PM",patient:"Maria Garcia",pid:3,type:"Prenatal Check",status:"pending",duration:"30 min",notes:"28-week prenatal visit"},
];

export const LABS=[
  {id:1,test:"Complete Blood Count",date:"Feb 10, 2026",status:"normal",value:"Within range",details:"WBC:7.2 RBC:4.8 Hgb:14.2 Plt:245"},
  {id:2,test:"HbA1c",date:"Feb 8, 2026",status:"attention",value:"6.8% (Pre-diabetic)",details:"Target:<5.7% normal. Trending down from 7.1% in Oct."},
  {id:3,test:"Lipid Panel",date:"Feb 5, 2026",status:"normal",value:"LDL 118 mg/dL",details:"Total:195 HDL:52 LDL:118 Trig:125"},
  {id:4,test:"Thyroid (TSH)",date:"Jan 28, 2026",status:"normal",value:"2.1 mIU/L",details:"Ref:0.4-4.0 mIU/L. Normal."},
];

export const VITALS_HISTORY=[{date:"Feb 15",bp:122,hr:72},{date:"Feb 8",bp:128,hr:75},{date:"Feb 1",bp:130,hr:78},{date:"Jan 25",bp:126,hr:74},{date:"Jan 18",bp:132,hr:80},{date:"Jan 11",bp:124,hr:71}];

export const MEDS=[
  {id:1,name:"Metformin 500mg",schedule:"Twice daily with meals",refill:"Mar 1, 2026",status:"active",prescriber:"Dr. Martinez",side:"Nausea, diarrhea (common initially)"},
  {id:2,name:"Vitamin D 2000IU",schedule:"Once daily",refill:"Feb 28, 2026",status:"active",prescriber:"Dr. Martinez",side:"Rare at this dosage"},
  {id:3,name:"Ibuprofen 200mg",schedule:"As needed for pain",refill:"N/A",status:"prn",prescriber:"Self",side:"GI upset, avoid long-term use"},
];

export const SYMPTOMS=[
  {id:1,name:"Headache",icon:"🤕"},{id:2,name:"Fever",icon:"🌡️"},{id:3,name:"Cough",icon:"😷"},
  {id:4,name:"Fatigue",icon:"😴"},{id:5,name:"Chest Pain",icon:"💔"},{id:6,name:"Nausea",icon:"🤢"},
  {id:7,name:"Shortness of Breath",icon:"😮‍💨"},{id:8,name:"Dizziness",icon:"😵"},
  {id:9,name:"Back Pain",icon:"🦴"},{id:10,name:"Sore Throat",icon:"🗣️"},
];

// ===== AUDIT LOG =====
export const AUDIT_LOG=[
  {time:"14:32:01",user:"Dr. Martinez",action:"Accessed patient record","patient":"James Wilson",justification:"Active care relationship",status:"authorized"},
  {time:"14:28:15",user:"System",action:"Drug interaction alert generated","patient":"James Wilson",justification:"Amlodipine + Simvastatin",status:"alert"},
  {time:"14:15:42",user:"Nurse Thompson",action:"Documented vitals","patient":"Sarah Chen",justification:"Department-scoped access",status:"authorized"},
  {time:"13:58:20",user:"Alex Johnson",action:"Viewed lab results","patient":"Self",justification:"Patient own-data access",status:"authorized"},
  {time:"13:45:10",user:"Dr. Martinez",action:"AI CDS recommendation viewed","patient":"Robert Kim",justification:"Care team member",status:"authorized"},
  {time:"13:30:05",user:"System",action:"Consent renewal reminder sent","patient":"Emily Brooks",justification:"Annual renewal (30-day notice)",status:"system"},
];

// ===== CONTEXT =====
const Ctx=createContext(null);
export function AppProvider({children}){
  const[view,setView]=useState("login");
  const[user,setUser]=useState(null);
  const[notifs,setNotifs]=useState(ALERTS.map(a=>({...a,read:false})));
  const[showNotif,setShowNotif]=useState(false);
  const[modal,setModal]=useState(null);
  const[appts,setAppts]=useState(APPTS);
  const[patAppts,setPatAppts]=useState([{id:1,date:"Feb 20, 2026",time:"10:00 AM",provider:"Dr. Martinez",type:"Annual Physical",loc:"Main Clinic, Room 204"},{id:2,date:"Mar 5, 2026",time:"2:30 PM",provider:"Dr. Lee",type:"Dermatology",loc:"Specialty Clinic, Suite 301"}]);
  const[toast,setToast]=useState(null);
  const[consents,setConsents]=useState({treatment:true,datashare:true,communication:true,research:false,device:false,emergency:true,minor:false});

  const t=useCallback(m=>{setToast(m);setTimeout(()=>setToast(null),3000)},[]);
  const login=useCallback(role=>{
    setUser(role==="provider"?{name:"Dr. Martinez",role:"provider",spec:"Internal Medicine",ini:"DM"}
      :role==="admin"?{name:"Admin User",role:"admin",spec:"System Administration",ini:"AU"}
      :role==="compliance"?{name:"Compliance Officer",role:"compliance",spec:"Regulatory Compliance",ini:"CO"}
      :{name:"Alex Johnson",role:"patient",spec:"Patient Portal",ini:"AJ"});
    setView(role==="provider"?"dashboard":role==="admin"?"admin":role==="compliance"?"compliance":"portal");
  },[]);
  const logout=useCallback(()=>{setUser(null);setView("login")},[]);
  const markRead=useCallback(id=>{setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n))},[]);
  const markAllRead=useCallback(()=>{setNotifs(p=>p.map(n=>({...n,read:true})))},[]);
  const cancelAppt=useCallback(id=>{setAppts(p=>p.map(a=>a.id===id?{...a,status:"cancelled"}:a));t("Appointment cancelled")},[t]);
  const confirmAppt=useCallback(id=>{setAppts(p=>p.map(a=>a.id===id?{...a,status:"confirmed"}:a));t("Appointment confirmed")},[t]);
  const reschedAppt=useCallback(id=>{setPatAppts(p=>p.map(a=>a.id===id?{...a,date:"Mar 15, 2026",time:"11:00 AM"}:a));t("Rescheduled to Mar 15 at 11:00 AM")},[t]);
  const addAppt=useCallback(a=>{setPatAppts(p=>[...p,{id:Date.now(),...a}]);t("Appointment booked")},[t]);
  const toggleConsent=useCallback(id=>{setConsents(p=>({...p,[id]:!p[id]}));t(`Consent ${consents[id]?"revoked":"granted"}`)},[t,consents]);
  const unread=notifs.filter(n=>!n.read).length;

  return <Ctx.Provider value={{view,setView,user,login,logout,notifs,showNotif,setShowNotif,markRead,markAllRead,unread,modal,setModal,t,toast,appts,cancelAppt,confirmAppt,patAppts,reschedAppt,addAppt,consents,toggleConsent}}>{children}</Ctx.Provider>;
}
export function useApp(){return useContext(Ctx);}
