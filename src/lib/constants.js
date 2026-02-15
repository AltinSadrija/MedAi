'use client';
import { createContext, useContext, useState, useCallback } from 'react';

export const T = {
  bg:"#0A0F1C",surface:"#111827",card:"#1A2236",border:"#2A3550",borderLight:"#374262",
  primary:"#3B82F6",primaryDark:"#2563EB",accent:"#10B981",warning:"#F59E0B",danger:"#EF4444",
  text:"#F1F5F9",textMuted:"#94A3B8",textDim:"#64748B",
  g1:"linear-gradient(135deg,#3B82F6,#8B5CF6)",g2:"linear-gradient(135deg,#10B981,#3B82F6)",g3:"linear-gradient(135deg,#F59E0B,#EF4444)",
};
export const fd = "'Outfit',sans-serif";
export const fm = "'JetBrains Mono',monospace";

export const symptoms = [
  {id:1,name:"Headache",icon:"🤕"},{id:2,name:"Fever",icon:"🌡️"},{id:3,name:"Cough",icon:"😷"},
  {id:4,name:"Fatigue",icon:"😴"},{id:5,name:"Chest Pain",icon:"💔"},{id:6,name:"Nausea",icon:"🤢"},
  {id:7,name:"Shortness of Breath",icon:"😮‍💨"},{id:8,name:"Dizziness",icon:"😵"},
  {id:9,name:"Back Pain",icon:"🦴"},{id:10,name:"Sore Throat",icon:"🗣️"},
];

export const PATIENTS = [
  {id:1,name:"Sarah Chen",age:34,condition:"Type 2 Diabetes",risk:"medium",lastVisit:"Feb 12, 2026",vitals:{bp:"128/82",hr:76,temp:"98.4°F",spo2:"98%"},nextAppt:"Feb 20, 2026",meds:["Metformin 500mg","Lisinopril 10mg"],color:"#3B82F6",email:"sarah.chen@email.com",phone:"(555) 123-4567",insurance:"BlueCross PPO",allergies:["Penicillin","Sulfa"]},
  {id:2,name:"James Wilson",age:67,condition:"Hypertension + COPD",risk:"high",lastVisit:"Feb 10, 2026",vitals:{bp:"152/94",hr:88,temp:"99.1°F",spo2:"93%"},nextAppt:"Feb 16, 2026",meds:["Amlodipine 5mg","Tiotropium 18mcg","Albuterol PRN"],color:"#EF4444",email:"j.wilson@email.com",phone:"(555) 234-5678",insurance:"Medicare",allergies:["Aspirin"]},
  {id:3,name:"Maria Garcia",age:28,condition:"Prenatal Care",risk:"low",lastVisit:"Feb 14, 2026",vitals:{bp:"118/72",hr:82,temp:"98.6°F",spo2:"99%"},nextAppt:"Feb 28, 2026",meds:["Prenatal Vitamins","Iron Supplement"],color:"#10B981",email:"maria.g@email.com",phone:"(555) 345-6789",insurance:"Aetna HMO",allergies:[]},
  {id:4,name:"Robert Kim",age:55,condition:"Post-MI Recovery",risk:"high",lastVisit:"Feb 8, 2026",vitals:{bp:"136/88",hr:72,temp:"98.2°F",spo2:"96%"},nextAppt:"Feb 17, 2026",meds:["Aspirin 81mg","Metoprolol 50mg","Atorvastatin 40mg","Clopidogrel 75mg"],color:"#F59E0B",email:"r.kim@email.com",phone:"(555) 456-7890",insurance:"UnitedHealth",allergies:["Latex"]},
  {id:5,name:"Emily Brooks",age:42,condition:"Anxiety + Insomnia",risk:"low",lastVisit:"Feb 11, 2026",vitals:{bp:"122/78",hr:68,temp:"98.5°F",spo2:"99%"},nextAppt:"Mar 5, 2026",meds:["Sertraline 50mg","Melatonin 3mg"],color:"#8B5CF6",email:"emily.b@email.com",phone:"(555) 567-8901",insurance:"Cigna PPO",allergies:["Codeine"]},
];

export const ALERTS = [
  {id:1,type:"critical",msg:"James Wilson — SpO2 dropped to 91%. Immediate review recommended.",time:"12 min ago",patientId:2,action:"Review vitals and consider O2 supplementation"},
  {id:2,type:"warning",msg:"Robert Kim — Missed medication check-in for 2 consecutive days.",time:"1 hr ago",patientId:4,action:"Contact patient and verify medication adherence"},
  {id:3,type:"info",msg:"Sarah Chen — HbA1c results available: 7.2% (improved from 7.8%).",time:"3 hrs ago",patientId:1,action:"Review lab results and update care plan"},
  {id:4,type:"warning",msg:"Drug interaction alert: Amlodipine + Simvastatin flagged for James Wilson.",time:"5 hrs ago",patientId:2,action:"Evaluate interaction severity and consider alternatives"},
];

export const APPOINTMENTS = [
  {id:1,time:"9:00 AM",patient:"James Wilson",patientId:2,type:"Follow-up",status:"confirmed",duration:"30 min",notes:"Review COPD management, check SpO2 trends"},
  {id:2,time:"10:30 AM",patient:"New Patient",patientId:null,type:"Initial Consult",status:"confirmed",duration:"45 min",notes:"First visit - full intake"},
  {id:3,time:"11:15 AM",patient:"Sarah Chen",patientId:1,type:"Lab Review",status:"pending",duration:"20 min",notes:"Review HbA1c and lipid panel results"},
  {id:4,time:"1:00 PM",patient:"Robert Kim",patientId:4,type:"Cardiac Rehab",status:"confirmed",duration:"30 min",notes:"Progress eval, medication review"},
  {id:5,time:"2:30 PM",patient:"Emily Brooks",patientId:5,type:"Telehealth",status:"confirmed",duration:"25 min",notes:"Follow-up on anxiety management"},
  {id:6,time:"3:45 PM",patient:"Maria Garcia",patientId:3,type:"Prenatal Check",status:"pending",duration:"30 min",notes:"28-week prenatal visit"},
];

export const PATIENT_RECORDS = {
  labs:[
    {id:1,test:"Complete Blood Count",date:"Feb 10, 2026",status:"normal",value:"Within range",details:"WBC: 7.2, RBC: 4.8, Hgb: 14.2, Plt: 245"},
    {id:2,test:"HbA1c",date:"Feb 8, 2026",status:"attention",value:"6.8% (Pre-diabetic)",details:"Target: <5.7% normal, 5.7-6.4% pre-diabetic. Trending down from 7.1% in October."},
    {id:3,test:"Lipid Panel",date:"Feb 5, 2026",status:"normal",value:"LDL 118 mg/dL",details:"Total: 195, HDL: 52, LDL: 118, Triglycerides: 125"},
    {id:4,test:"Thyroid (TSH)",date:"Jan 28, 2026",status:"normal",value:"2.1 mIU/L",details:"Reference range: 0.4-4.0 mIU/L. Within normal limits."},
  ],
  vitalsHistory:[
    {date:"Feb 15",bp:122,hr:72},{date:"Feb 8",bp:128,hr:75},{date:"Feb 1",bp:130,hr:78},
    {date:"Jan 25",bp:126,hr:74},{date:"Jan 18",bp:132,hr:80},{date:"Jan 11",bp:124,hr:71},
  ],
  medications:[
    {id:1,name:"Metformin 500mg",schedule:"Twice daily with meals",refillDate:"Mar 1, 2026",status:"active",prescriber:"Dr. Martinez",sideEffects:"Nausea, diarrhea (common initially)"},
    {id:2,name:"Vitamin D 2000IU",schedule:"Once daily",refillDate:"Feb 28, 2026",status:"active",prescriber:"Dr. Martinez",sideEffects:"Rare at this dosage"},
    {id:3,name:"Ibuprofen 200mg",schedule:"As needed for pain",refillDate:"N/A",status:"prn",prescriber:"Self",sideEffects:"GI upset, avoid long-term use"},
  ],
  upcomingAppts:[
    {id:1,date:"Feb 20, 2026",time:"10:00 AM",provider:"Dr. Martinez",type:"Annual Physical",location:"Main Clinic, Room 204"},
    {id:2,date:"Mar 5, 2026",time:"2:30 PM",provider:"Dr. Lee",type:"Dermatology",location:"Specialty Clinic, Suite 301"},
  ],
};

// ===== APP STATE CONTEXT =====
const AppCtx = createContext(null);

export function AppProvider({ children }) {
  const [view, setView] = useState("login");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(ALERTS.map(a => ({...a, read: false})));
  const [showNotif, setShowNotif] = useState(false);
  const [modal, setModal] = useState(null); // { type, data }
  const [appts, setAppts] = useState(APPOINTMENTS);
  const [patientAppts, setPatientAppts] = useState(PATIENT_RECORDS.upcomingAppts);
  const [toastMsg, setToastMsg] = useState(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  }, []);

  const login = useCallback((role) => {
    setUser(role === "provider" ? { name: "Dr. Martinez", role: "provider", specialty: "Internal Medicine", initials: "DM" }
      : { name: "Alex Johnson", role: "patient", initials: "AJ" });
    setView("dashboard");
  }, []);

  const logout = useCallback(() => { setUser(null); setView("login"); }, []);

  const markNotifRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
  }, []);

  const cancelAppt = useCallback((id) => {
    setAppts(prev => prev.map(a => a.id === id ? {...a, status: "cancelled"} : a));
    toast("Appointment cancelled");
  }, [toast]);

  const confirmAppt = useCallback((id) => {
    setAppts(prev => prev.map(a => a.id === id ? {...a, status: "confirmed"} : a));
    toast("Appointment confirmed");
  }, [toast]);

  const reschedulePatientAppt = useCallback((id) => {
    setPatientAppts(prev => prev.map(a => a.id === id ? {...a, date: "Mar 15, 2026", time: "11:00 AM"} : a));
    toast("Appointment rescheduled to Mar 15 at 11:00 AM");
  }, [toast]);

  const addPatientAppt = useCallback((appt) => {
    setPatientAppts(prev => [...prev, { id: Date.now(), ...appt }]);
    toast("Appointment booked successfully");
  }, [toast]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppCtx.Provider value={{
      view, setView, user, login, logout,
      notifications, showNotif, setShowNotif, markNotifRead, markAllRead, unreadCount,
      modal, setModal, toast, toastMsg,
      appts, cancelAppt, confirmAppt,
      patientAppts, reschedulePatientAppt, addPatientAppt,
    }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() { return useContext(AppCtx); }
