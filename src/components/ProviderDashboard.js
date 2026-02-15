'use client';

import { useState } from 'react';
import { Activity, Heart, Brain, User, AlertTriangle, ChevronRight, ChevronDown, Search, Calendar, Bell, TrendingUp, Thermometer, Pill, Users, Zap, X } from 'lucide-react';
import { T, fontDisplay, fontMono, patients, alerts, appointments } from '@/lib/constants';
import { useIsMobile, useIsTablet } from '@/lib/hooks';
import { Badge, RiskBadge, StatCard, CardSection } from '@/components/ui';

export default function ProviderDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [alertFilter, setAlertFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const filteredAlerts = alertFilter === "all" ? alerts : alerts.filter(a => a.type === alertFilter);
  const filteredPatients = searchQuery
    ? patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.condition.toLowerCase().includes(searchQuery.toLowerCase()))
    : patients;

  const compact = isMobile;

  return (
    <div style={{ padding: isMobile ? 16 : 28, overflowY: "auto", height: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: isMobile ? 18 : 28 }}>
        <h1 style={{ fontFamily: fontDisplay, fontSize: isMobile ? 22 : 28, fontWeight: 700 }}>Provider Dashboard</h1>
        <p style={{ color: T.textMuted, fontSize: isMobile ? 12 : 14, marginTop: 4 }}>Good morning, Dr. Martinez — Feb 15, 2026</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 10 : 16, marginBottom: isMobile ? 18 : 28 }}>
        <StatCard icon={Users} label="Active Patients" value="247" trend="+12 this month" color={T.primary} delay={0} compact={compact} />
        <StatCard icon={Calendar} label="Appointments" value="6" trend="2 pending" color={T.accent} delay={100} compact={compact} />
        <StatCard icon={AlertTriangle} label="Critical Alerts" value="2" trend="Action required" color={T.danger} delay={200} compact={compact} />
        <StatCard icon={TrendingUp} label="AI Accuracy" value="96.3%" trend="+1.2% this quarter" color="#8B5CF6" delay={300} compact={compact} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: (isMobile || isTablet) ? "1fr" : "1fr 380px", gap: isMobile ? 14 : 20 }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 20, minWidth: 0 }}>
          {/* Alerts */}
          <CardSection title="AI Alerts" icon={Bell} iconColor={T.warning} noPadBody
            rightContent={
              <div style={{ display: "flex", gap: 4, overflowX: "auto", flexShrink: 0 }}>
                {["all", "critical", "warning", "info"].map(f => (
                  <button key={f} onClick={() => setAlertFilter(f)} style={{
                    padding: "4px 10px", borderRadius: 8, border: "none", whiteSpace: "nowrap",
                    background: alertFilter === f ? `${T.primary}20` : "transparent",
                    color: alertFilter === f ? T.primary : T.textDim,
                    fontSize: 11, fontWeight: 500, cursor: "pointer", textTransform: "capitalize",
                  }}>{f}</button>
                ))}
              </div>
            }
          >
            <div style={{ maxHeight: isMobile ? 200 : 260, overflowY: "auto" }}>
              {filteredAlerts.map((a, i) => (
                <div key={a.id} className="animate-in" style={{ animationDelay: `${i * 80}ms`, padding: isMobile ? "10px 14px" : "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: a.type === "critical" ? T.danger : a.type === "warning" ? T.warning : T.primary, boxShadow: a.type === "critical" ? `0 0 8px ${T.danger}` : "none" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.5, color: T.text }}>{a.msg}</p>
                    <span style={{ fontSize: 11, color: T.textDim }}>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardSection>

          {/* Patient List */}
          <CardSection title="Patient Panel" icon={Users} iconColor={T.primary} noPadBody
            rightContent={
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.surface, borderRadius: 8, padding: "5px 10px", border: `1px solid ${T.border}`, maxWidth: isMobile ? 160 : 200 }}>
                <Search size={14} color={T.textDim} style={{ flexShrink: 0 }} />
                <input placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ border: "none", background: "transparent", color: T.text, fontSize: 12, outline: "none", width: "100%", minWidth: 0 }} />
              </div>
            }
          >
            {filteredPatients.map(p => (
              <div key={p.id} onClick={() => setSelectedPatient(selectedPatient?.id === p.id ? null : p)}
                style={{ padding: isMobile ? "10px 14px" : "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: isMobile ? 10 : 14, cursor: "pointer", background: selectedPatient?.id === p.id ? `${T.primary}08` : "transparent", transition: "background 0.15s" }}>
                <div style={{ width: isMobile ? 34 : 40, height: isMobile ? 34 : 40, borderRadius: 10, background: `${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <User size={isMobile ? 16 : 18} color={p.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, whiteSpace: "nowrap" }}>{p.name}</span>
                    <RiskBadge risk={p.risk} />
                  </div>
                  <span style={{ fontSize: isMobile ? 11 : 12, color: T.textDim }}>{p.condition} · Age {p.age}</span>
                </div>
                {!isMobile && <div style={{ textAlign: "right", flexShrink: 0 }}><div style={{ fontSize: 12, color: T.textMuted }}>Next: {p.nextAppt}</div></div>}
                {selectedPatient?.id === p.id ? <ChevronDown size={16} color={T.textDim} /> : <ChevronRight size={16} color={T.textDim} />}
              </div>
            ))}
            {filteredPatients.length === 0 && (
              <div style={{ padding: 24, textAlign: "center", color: T.textDim, fontSize: 13 }}>No patients found</div>
            )}
          </CardSection>

          {/* Patient Detail */}
          {selectedPatient && (
            <div className="animate-scale" style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.primary}30`, padding: isMobile ? 16 : 24 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 10 }}>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontFamily: fontDisplay, fontSize: isMobile ? 16 : 18, fontWeight: 700 }}>{selectedPatient.name}</h3>
                  <p style={{ fontSize: 13, color: T.textMuted }}>Age {selectedPatient.age} · {selectedPatient.condition}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <RiskBadge risk={selectedPatient.risk} />
                  <button onClick={() => setSelectedPatient(null)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textDim, padding: 4 }}>
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 8 : 12, marginBottom: 16 }}>
                {[
                  { label: "BP", value: selectedPatient.vitals.bp, icon: Heart, color: T.danger },
                  { label: "Heart Rate", value: `${selectedPatient.vitals.hr} bpm`, icon: Activity, color: T.primary },
                  { label: "Temp", value: selectedPatient.vitals.temp, icon: Thermometer, color: T.warning },
                  { label: "SpO2", value: selectedPatient.vitals.spo2, icon: Zap, color: T.accent },
                ].map((v, i) => (
                  <div key={i} style={{ background: T.surface, borderRadius: 12, padding: isMobile ? 10 : 14, border: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                      <v.icon size={13} color={v.color} />
                      <span style={{ fontSize: 10, color: T.textDim }}>{v.label}</span>
                    </div>
                    <span style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, fontFamily: fontDisplay }}>{v.value}</span>
                  </div>
                ))}
              </div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Active Medications</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {selectedPatient.meds.map((m, i) => (
                  <span key={i} style={{ padding: "5px 10px", borderRadius: 8, background: `${T.accent}12`, border: `1px solid ${T.accent}25`, fontSize: 11, color: T.accent, fontWeight: 500 }}>
                    <Pill size={11} style={{ marginRight: 3, verticalAlign: -1 }} />{m}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, flexDirection: isMobile ? "column" : "row" }}>
                <button style={{ flex: 1, padding: "10px 16px", borderRadius: 12, border: "none", background: T.gradient1, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Open CDS Panel</button>
                <button style={{ flex: 1, padding: "10px 16px", borderRadius: 12, border: `1px solid ${T.border}`, background: "transparent", color: T.text, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View Full Record</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column — Schedule & Insights */}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 20, minWidth: 0 }}>
          {/* Schedule */}
          <CardSection title="Today's Schedule" icon={Calendar} iconColor={T.accent} noPadBody>
            {appointments.map((a, i) => (
              <div key={i} style={{ padding: isMobile ? "10px 14px" : "12px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
                <div style={{ minWidth: isMobile ? 52 : 64 }}>
                  <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 600, fontFamily: fontMono, color: T.primary }}>{a.time}</span>
                </div>
                <div style={{ width: 3, height: 32, borderRadius: 2, background: a.status === "confirmed" ? T.accent : T.warning, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.patient}</div>
                  <div style={{ fontSize: 12, color: T.textDim }}>{a.type}</div>
                </div>
                <Badge color={a.status === "confirmed" ? T.accent : T.warning} small={isMobile}>{a.status}</Badge>
              </div>
            ))}
          </CardSection>

          {/* AI Insights */}
          <div className="animate-in" style={{ animationDelay: "300ms", background: `linear-gradient(135deg, ${T.card}, #1a2744)`, borderRadius: 16, border: `1px solid ${T.primary}30`, padding: isMobile ? 16 : 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: T.gradient1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Brain size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14 }}>AI Clinical Insights</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { text: "James Wilson's COPD exacerbation risk increased 34% based on recent SpO2 trends. Consider adjusting bronchodilator therapy.", color: T.danger },
                { text: "Sarah Chen's HbA1c shows positive trend (7.8% → 7.2%). Current Metformin regimen is effective.", color: T.accent },
                { text: "Robert Kim is overdue for cardiac rehab progress evaluation. ECG recommended.", color: T.warning },
              ].map((insight, i) => (
                <div key={i} style={{ padding: "10px 12px", borderRadius: 10, background: `${insight.color}08`, border: `1px solid ${insight.color}20`, fontSize: 12, lineHeight: 1.6, color: T.textMuted }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: insight.color, display: "inline-block", marginRight: 8, verticalAlign: "middle" }} />
                  {insight.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
