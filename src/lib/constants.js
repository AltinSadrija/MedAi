// ============ THEME ============
export const T = {
  bg: "#0A0F1C",
  surface: "#111827",
  card: "#1A2236",
  cardHover: "#1E2A42",
  border: "#2A3550",
  borderLight: "#374262",
  primary: "#3B82F6",
  primaryDark: "#2563EB",
  primaryGlow: "rgba(59,130,246,0.15)",
  accent: "#10B981",
  accentGlow: "rgba(16,185,129,0.15)",
  warning: "#F59E0B",
  danger: "#EF4444",
  dangerGlow: "rgba(239,68,68,0.12)",
  text: "#F1F5F9",
  textMuted: "#94A3B8",
  textDim: "#64748B",
  gradient1: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
  gradient2: "linear-gradient(135deg, #10B981, #3B82F6)",
  gradient3: "linear-gradient(135deg, #F59E0B, #EF4444)",
};

export const fontDisplay = "'Outfit', sans-serif";
export const fontMono = "'JetBrains Mono', monospace";
export const font = "'DM Sans', sans-serif";

// ============ DATA ============
export const symptoms = [
  { id: 1, name: "Headache", icon: "🤕" },
  { id: 2, name: "Fever", icon: "🌡️" },
  { id: 3, name: "Cough", icon: "😷" },
  { id: 4, name: "Fatigue", icon: "😴" },
  { id: 5, name: "Chest Pain", icon: "💔" },
  { id: 6, name: "Nausea", icon: "🤢" },
  { id: 7, name: "Shortness of Breath", icon: "😮‍💨" },
  { id: 8, name: "Dizziness", icon: "😵" },
  { id: 9, name: "Back Pain", icon: "🦴" },
  { id: 10, name: "Sore Throat", icon: "🗣️" },
];

export const initialChatMessages = [
  { role: "assistant", text: "Hello! I'm your Medical AI Assistant. I'll help assess your symptoms. Please describe what you're experiencing, or select from common symptoms below." },
];

export const patients = [
  { id: 1, name: "Sarah Chen", age: 34, condition: "Type 2 Diabetes", risk: "medium", lastVisit: "Feb 12, 2026", vitals: { bp: "128/82", hr: 76, temp: "98.4°F", spo2: "98%" }, nextAppt: "Feb 20, 2026", meds: ["Metformin 500mg", "Lisinopril 10mg"], color: "#3B82F6" },
  { id: 2, name: "James Wilson", age: 67, condition: "Hypertension + COPD", risk: "high", lastVisit: "Feb 10, 2026", vitals: { bp: "152/94", hr: 88, temp: "99.1°F", spo2: "93%" }, nextAppt: "Feb 16, 2026", meds: ["Amlodipine 5mg", "Tiotropium 18mcg", "Albuterol PRN"], color: "#EF4444" },
  { id: 3, name: "Maria Garcia", age: 28, condition: "Prenatal Care", risk: "low", lastVisit: "Feb 14, 2026", vitals: { bp: "118/72", hr: 82, temp: "98.6°F", spo2: "99%" }, nextAppt: "Feb 28, 2026", meds: ["Prenatal Vitamins", "Iron Supplement"], color: "#10B981" },
  { id: 4, name: "Robert Kim", age: 55, condition: "Post-MI Recovery", risk: "high", lastVisit: "Feb 8, 2026", vitals: { bp: "136/88", hr: 72, temp: "98.2°F", spo2: "96%" }, nextAppt: "Feb 17, 2026", meds: ["Aspirin 81mg", "Metoprolol 50mg", "Atorvastatin 40mg", "Clopidogrel 75mg"], color: "#F59E0B" },
  { id: 5, name: "Emily Brooks", age: 42, condition: "Anxiety + Insomnia", risk: "low", lastVisit: "Feb 11, 2026", vitals: { bp: "122/78", hr: 68, temp: "98.5°F", spo2: "99%" }, nextAppt: "Mar 5, 2026", meds: ["Sertraline 50mg", "Melatonin 3mg"], color: "#8B5CF6" },
];

export const alerts = [
  { id: 1, type: "critical", msg: "James Wilson — SpO2 dropped to 91%. Immediate review recommended.", time: "12 min ago" },
  { id: 2, type: "warning", msg: "Robert Kim — Missed medication check-in for 2 consecutive days.", time: "1 hr ago" },
  { id: 3, type: "info", msg: "Sarah Chen — HbA1c results available: 7.2% (improved from 7.8%).", time: "3 hrs ago" },
  { id: 4, type: "warning", msg: "Drug interaction alert: Amlodipine + Simvastatin flagged for James Wilson.", time: "5 hrs ago" },
];

export const appointments = [
  { time: "9:00 AM", patient: "James Wilson", type: "Follow-up", status: "confirmed" },
  { time: "10:30 AM", patient: "New Patient", type: "Initial Consult", status: "confirmed" },
  { time: "11:15 AM", patient: "Sarah Chen", type: "Lab Review", status: "pending" },
  { time: "1:00 PM", patient: "Robert Kim", type: "Cardiac Rehab", status: "confirmed" },
  { time: "2:30 PM", patient: "Emily Brooks", type: "Telehealth", status: "confirmed" },
  { time: "3:45 PM", patient: "Maria Garcia", type: "Prenatal Check", status: "pending" },
];

export const patientRecords = {
  labs: [
    { test: "Complete Blood Count", date: "Feb 10, 2026", status: "normal", value: "Within range" },
    { test: "HbA1c", date: "Feb 8, 2026", status: "attention", value: "6.8% (Pre-diabetic)" },
    { test: "Lipid Panel", date: "Feb 5, 2026", status: "normal", value: "LDL 118 mg/dL" },
    { test: "Thyroid (TSH)", date: "Jan 28, 2026", status: "normal", value: "2.1 mIU/L" },
  ],
  vitalsHistory: [
    { date: "Feb 15", bp: 122, hr: 72 },
    { date: "Feb 8", bp: 128, hr: 75 },
    { date: "Feb 1", bp: 130, hr: 78 },
    { date: "Jan 25", bp: 126, hr: 74 },
    { date: "Jan 18", bp: 132, hr: 80 },
    { date: "Jan 11", bp: 124, hr: 71 },
  ],
  medications: [
    { name: "Metformin 500mg", schedule: "Twice daily", refillDate: "Mar 1, 2026", status: "active" },
    { name: "Vitamin D 2000IU", schedule: "Once daily", refillDate: "Feb 28, 2026", status: "active" },
    { name: "Ibuprofen 200mg", schedule: "As needed", refillDate: "N/A", status: "prn" },
  ],
  upcomingAppts: [
    { date: "Feb 20, 2026", time: "10:00 AM", provider: "Dr. Martinez", type: "Annual Physical" },
    { date: "Mar 5, 2026", time: "2:30 PM", provider: "Dr. Lee", type: "Dermatology" },
  ],
};
