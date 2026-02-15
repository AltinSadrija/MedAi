'use client';

import { useState } from 'react';
import { Activity, Heart, Home, Calendar, FileText, Plus, Thermometer, Pill, Zap, CheckCircle, AlertTriangle, MessageCircle, ClipboardList } from 'lucide-react';
import { T, fontDisplay, fontMono, patientRecords } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks';
import { Badge, StatCard, CardSection } from '@/components/ui';

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "labs", label: "Labs", icon: ClipboardList },
    { id: "medications", label: "Meds", icon: Pill },
    { id: "appointments", label: "Appts", icon: Calendar },
  ];

  return (
    <div style={{ padding: isMobile ? 16 : 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: isMobile ? 16 : 24 }}>
        <h1 style={{ fontFamily: fontDisplay, fontSize: isMobile ? 22 : 28, fontWeight: 700 }}>Welcome back, Alex</h1>
        <p style={{ color: T.textMuted, fontSize: isMobile ? 12 : 14, marginTop: 4 }}>Your health summary for today</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: isMobile ? 18 : 28, background: T.surface, borderRadius: 12, padding: 4, border: `1px solid ${T.border}`, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: isMobile ? "8px 12px" : "10px 18px",
            borderRadius: 8, border: "none",
            background: activeTab === t.id ? T.card : "transparent",
            color: activeTab === t.id ? T.text : T.textDim,
            cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 500, transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            <t.icon size={14} />{t.label}
          </button>
        ))}
      </div>

      {/* ===== OVERVIEW ===== */}
      {activeTab === "overview" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 10 : 16, marginBottom: isMobile ? 18 : 28 }}>
            <StatCard icon={Heart} label="Blood Pressure" value="122/78" trend="Normal range" color={T.accent} delay={0} compact={isMobile} />
            <StatCard icon={Activity} label="Heart Rate" value="72 bpm" trend="Resting" color={T.primary} delay={100} compact={isMobile} />
            <StatCard icon={Thermometer} label="Temperature" value="98.5°F" trend="Normal" color={T.warning} delay={200} compact={isMobile} />
            <StatCard icon={Zap} label="SpO2" value="99%" trend="Excellent" color="#8B5CF6" delay={300} compact={isMobile} />
          </div>

          {/* BP Chart */}
          <div className="animate-in" style={{ animationDelay: "200ms", background: T.card, borderRadius: 16, border: `1px solid ${T.border}`, padding: isMobile ? 16 : 24, marginBottom: isMobile ? 14 : 20 }}>
            <h3 style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: isMobile ? 14 : 16, marginBottom: 16 }}>Blood Pressure Trend</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: isMobile ? 8 : 20, height: isMobile ? 120 : 160, paddingBottom: 26, position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 26, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {[140, 130, 120, 110].map(v => (
                  <span key={v} style={{ fontSize: isMobile ? 9 : 10, color: T.textDim, fontFamily: fontMono }}>{v}</span>
                ))}
              </div>
              <div style={{ flex: 1, marginLeft: isMobile ? 28 : 36, display: "flex", alignItems: "flex-end", gap: isMobile ? 6 : 12, height: "100%", position: "relative" }}>
                {[0.25, 0.5, 0.75, 1].map((p, i) => (
                  <div key={i} style={{ position: "absolute", left: 0, right: 0, bottom: `${p * 100}%`, borderBottom: `1px dashed ${T.border}40`, height: 0 }} />
                ))}
                {patientRecords.vitalsHistory.map((v, i) => {
                  const maxH = isMobile ? 90 : 130;
                  const h = ((v.bp - 110) / 30) * maxH;
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, zIndex: 1 }}>
                      <span style={{ fontSize: isMobile ? 9 : 11, fontWeight: 600, fontFamily: fontMono, color: v.bp > 130 ? T.warning : T.accent }}>{v.bp}</span>
                      <div style={{ width: isMobile ? "80%" : "70%", height: Math.max(h, 16), borderRadius: "6px 6px 3px 3px", background: v.bp > 130 ? `linear-gradient(to top, ${T.warning}, ${T.warning}80)` : `linear-gradient(to top, ${T.accent}, ${T.accent}80)`, transition: "height 0.5s" }} />
                      <span style={{ fontSize: isMobile ? 8 : 10, color: T.textDim }}>{v.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 10 : 16 }}>
            {[
              { icon: MessageCircle, label: "AI Symptom Check", desc: "Get an AI-powered assessment", gradient: T.gradient1 },
              { icon: Calendar, label: "Book Appointment", desc: "Schedule with your provider", gradient: T.gradient2 },
              { icon: FileText, label: "Request Records", desc: "Download your health data", gradient: "linear-gradient(135deg, #8B5CF6, #A855F7)" },
            ].map((a, i) => (
              <div key={i} className="animate-in" style={{ animationDelay: `${300 + i * 100}ms`, background: T.card, borderRadius: 14, padding: isMobile ? 16 : 22, border: `1px solid ${T.border}`, cursor: "pointer", display: "flex", gap: isMobile ? 14 : 0, flexDirection: isMobile ? "row" : "column", alignItems: isMobile ? "center" : "flex-start" }}>
                <div style={{ width: isMobile ? 40 : 44, height: isMobile ? 40 : 44, borderRadius: 12, background: a.gradient, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: isMobile ? 0 : 14, flexShrink: 0 }}>
                  <a.icon size={isMobile ? 18 : 22} color="#fff" />
                </div>
                <div>
                  <h4 style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: isMobile ? 14 : 15, marginBottom: 2 }}>{a.label}</h4>
                  <p style={{ fontSize: 12, color: T.textDim }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===== LABS ===== */}
      {activeTab === "labs" && (
        <CardSection title="Recent Lab Results" icon={ClipboardList} iconColor={T.primary} noPadBody>
          {patientRecords.labs.map((l, i) => (
            <div key={i} style={{ padding: isMobile ? "12px 14px" : "16px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
              <div style={{ width: isMobile ? 34 : 40, height: isMobile ? 34 : 40, borderRadius: 10, background: l.status === "normal" ? `${T.accent}15` : `${T.warning}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {l.status === "normal" ? <CheckCircle size={isMobile ? 16 : 18} color={T.accent} /> : <AlertTriangle size={isMobile ? 16 : 18} color={T.warning} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.test}</div>
                <div style={{ fontSize: 11, color: T.textDim }}>{l.date}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 500, color: l.status === "normal" ? T.accent : T.warning, whiteSpace: "nowrap" }}>{l.value}</div>
                <Badge color={l.status === "normal" ? T.accent : T.warning} small>{l.status}</Badge>
              </div>
            </div>
          ))}
        </CardSection>
      )}

      {/* ===== MEDICATIONS ===== */}
      {activeTab === "medications" && (
        <CardSection title="My Medications" icon={Pill} iconColor={T.primary} noPadBody
          rightContent={<Badge color={T.accent} small>No Interactions</Badge>}
        >
          {patientRecords.medications.map((m, i) => (
            <div key={i} style={{ padding: isMobile ? "12px 14px" : "16px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
              <div style={{ width: isMobile ? 34 : 40, height: isMobile ? 34 : 40, borderRadius: 10, background: `${T.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Pill size={isMobile ? 16 : 18} color={T.primary} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: T.textDim }}>{m.schedule}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: T.textMuted }}>Refill: {m.refillDate}</div>
                <Badge color={m.status === "active" ? T.accent : T.primary} small>{m.status}</Badge>
              </div>
            </div>
          ))}
        </CardSection>
      )}

      {/* ===== APPOINTMENTS ===== */}
      {activeTab === "appointments" && (
        <CardSection title="Upcoming" icon={Calendar} iconColor={T.accent} noPadBody
          rightContent={
            <button style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: T.gradient1, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              <Plus size={12} /> New
            </button>
          }
        >
          {patientRecords.upcomingAppts.map((a, i) => (
            <div key={i} style={{ padding: isMobile ? "12px 14px" : "16px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
              <div style={{ width: isMobile ? 42 : 48, height: isMobile ? 42 : 48, borderRadius: 12, background: `${T.accent}12`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: isMobile ? 12 : 14, fontWeight: 700, fontFamily: fontMono, color: T.accent }}>{a.date.split(" ")[1]}</span>
                <span style={{ fontSize: 9, color: T.textDim, textTransform: "uppercase" }}>{a.date.split(" ")[0]}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600 }}>{a.type}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>{a.provider} · {a.time}</div>
              </div>
              <button style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontSize: 11, cursor: "pointer", flexShrink: 0 }}>Reschedule</button>
            </div>
          ))}
        </CardSection>
      )}
    </div>
  );
}
