'use client';

import { useState } from 'react';
import {
  Activity, Heart, Brain, User, AlertTriangle, ChevronRight, Search,
  Calendar, Bell, TrendingUp, Thermometer, Pill, Users, Zap,
} from 'lucide-react';
import { T, fontDisplay, fontMono, font, patients, alerts, appointments } from '@/lib/constants';
import { Badge, RiskBadge, StatCard } from '@/components/ui';

export default function ProviderDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [alertFilter, setAlertFilter] = useState("all");

  const filteredAlerts =
    alertFilter === "all" ? alerts : alerts.filter((a) => a.type === alertFilter);

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: fontDisplay, fontSize: 28, fontWeight: 700 }}>
          Provider Dashboard
        </h1>
        <p style={{ color: T.textMuted, fontSize: 14, marginTop: 4 }}>
          Good morning, Dr. Martinez — Sunday, February 15, 2026
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <StatCard icon={Users} label="Active Patients" value="247" trend="+12 this month" color={T.primary} delay={0} />
        <StatCard icon={Calendar} label="Today's Appointments" value="6" trend="2 pending" color={T.accent} delay={100} />
        <StatCard icon={AlertTriangle} label="Critical Alerts" value="2" trend="Action required" color={T.danger} delay={200} />
        <StatCard icon={TrendingUp} label="AI Accuracy" value="96.3%" trend="+1.2% this quarter" color="#8B5CF6" delay={300} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Alerts */}
          <div
            className="animate-in"
            style={{
              background: T.card,
              borderRadius: 20,
              border: `1px solid ${T.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Bell size={18} color={T.warning} />
                <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15 }}>
                  AI Alerts & Notifications
                </span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["all", "critical", "warning", "info"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setAlertFilter(f)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 8,
                      border: "none",
                      background: alertFilter === f ? `${T.primary}20` : "transparent",
                      color: alertFilter === f ? T.primary : T.textDim,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ maxHeight: 260, overflowY: "auto" }}>
              {filteredAlerts.map((a, i) => (
                <div
                  key={a.id}
                  className="animate-in"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    padding: "14px 22px",
                    borderBottom: `1px solid ${T.border}`,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      marginTop: 6,
                      flexShrink: 0,
                      background:
                        a.type === "critical"
                          ? T.danger
                          : a.type === "warning"
                          ? T.warning
                          : T.primary,
                      boxShadow:
                        a.type === "critical" ? `0 0 8px ${T.danger}` : "none",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: T.text }}>
                      {a.msg}
                    </p>
                    <span style={{ fontSize: 11, color: T.textDim }}>
                      {a.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient List */}
          <div
            className="animate-in"
            style={{
              animationDelay: "150ms",
              background: T.card,
              borderRadius: 20,
              border: `1px solid ${T.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Users size={18} color={T.primary} />
                <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15 }}>
                  Patient Panel
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: T.surface,
                  borderRadius: 10,
                  padding: "6px 12px",
                  border: `1px solid ${T.border}`,
                }}
              >
                <Search size={14} color={T.textDim} />
                <input
                  placeholder="Search patients..."
                  style={{
                    border: "none",
                    background: "transparent",
                    color: T.text,
                    fontSize: 13,
                    outline: "none",
                    width: 140,
                  }}
                />
              </div>
            </div>
            {patients.map((p, i) => {
              const colors = [T.primary, T.danger, T.accent, T.warning, "#8B5CF6"];
              return (
                <div
                  key={p.id}
                  onClick={() =>
                    setSelectedPatient(
                      selectedPatient?.id === p.id ? null : p
                    )
                  }
                  style={{
                    padding: "14px 22px",
                    borderBottom: `1px solid ${T.border}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: "pointer",
                    background:
                      selectedPatient?.id === p.id
                        ? `${T.primary}08`
                        : "transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${colors[i]}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={18} color={colors[i]} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {p.name}
                      </span>
                      <RiskBadge risk={p.risk} />
                    </div>
                    <span style={{ fontSize: 12, color: T.textDim }}>
                      {p.condition} · Age {p.age}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: T.textMuted }}>
                      Next: {p.nextAppt}
                    </div>
                  </div>
                  <ChevronRight size={16} color={T.textDim} />
                </div>
              );
            })}
          </div>

          {/* Patient Detail */}
          {selectedPatient && (
            <div
              className="animate-scale"
              style={{
                background: T.card,
                borderRadius: 20,
                border: `1px solid ${T.primary}30`,
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {selectedPatient.name}
                  </h3>
                  <p style={{ fontSize: 13, color: T.textMuted }}>
                    Age {selectedPatient.age} · {selectedPatient.condition}
                  </p>
                </div>
                <RiskBadge risk={selectedPatient.risk} />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                {[
                  { label: "Blood Pressure", value: selectedPatient.vitals.bp, icon: Heart, color: T.danger },
                  { label: "Heart Rate", value: `${selectedPatient.vitals.hr} bpm`, icon: Activity, color: T.primary },
                  { label: "Temperature", value: selectedPatient.vitals.temp, icon: Thermometer, color: T.warning },
                  { label: "SpO2", value: selectedPatient.vitals.spo2, icon: Zap, color: T.accent },
                ].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      background: T.surface,
                      borderRadius: 14,
                      padding: 14,
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 6,
                      }}
                    >
                      <v.icon size={14} color={v.color} />
                      <span style={{ fontSize: 11, color: T.textDim }}>
                        {v.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        fontFamily: fontDisplay,
                      }}
                    >
                      {v.value}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.textMuted,
                    marginBottom: 10,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Active Medications
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selectedPatient.meds.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 10,
                        background: `${T.accent}12`,
                        border: `1px solid ${T.accent}25`,
                        fontSize: 12,
                        color: T.accent,
                        fontWeight: 500,
                      }}
                    >
                      <Pill
                        size={12}
                        style={{ marginRight: 4, verticalAlign: -1 }}
                      />
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: 12,
                    border: "none",
                    background: T.gradient1,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Open CDS Panel
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: 12,
                    border: `1px solid ${T.border}`,
                    background: "transparent",
                    color: T.text,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  View Full Record
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Schedule */}
          <div
            className="animate-in"
            style={{
              animationDelay: "200ms",
              background: T.card,
              borderRadius: 20,
              border: `1px solid ${T.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Calendar size={18} color={T.accent} />
              <span
                style={{
                  fontFamily: fontDisplay,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Today&apos;s Schedule
              </span>
            </div>
            {appointments.map((a, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 22px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div style={{ minWidth: 64 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: fontMono,
                      color: T.primary,
                    }}
                  >
                    {a.time}
                  </span>
                </div>
                <div
                  style={{
                    width: 3,
                    height: 36,
                    borderRadius: 2,
                    background:
                      a.status === "confirmed" ? T.accent : T.warning,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>
                    {a.patient}
                  </div>
                  <div style={{ fontSize: 12, color: T.textDim }}>
                    {a.type}
                  </div>
                </div>
                <Badge
                  color={a.status === "confirmed" ? T.accent : T.warning}
                >
                  {a.status}
                </Badge>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          <div
            className="animate-in"
            style={{
              animationDelay: "300ms",
              background: `linear-gradient(135deg, ${T.card}, #1a2744)`,
              borderRadius: 20,
              border: `1px solid ${T.primary}30`,
              padding: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: T.gradient1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Brain size={18} color="#fff" />
              </div>
              <span
                style={{
                  fontFamily: fontDisplay,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                AI Clinical Insights
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[
                {
                  text: "James Wilson's COPD exacerbation risk increased 34% based on recent SpO2 trends. Consider adjusting bronchodilator therapy.",
                  color: T.danger,
                },
                {
                  text: "Sarah Chen's HbA1c shows positive trend (7.8% → 7.2%). Current Metformin regimen is effective.",
                  color: T.accent,
                },
                {
                  text: "Robert Kim is overdue for cardiac rehab progress evaluation. ECG recommended.",
                  color: T.warning,
                },
              ].map((insight, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: `${insight.color}08`,
                    border: `1px solid ${insight.color}20`,
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: T.textMuted,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: insight.color,
                      display: "inline-block",
                      marginRight: 8,
                      verticalAlign: "middle",
                    }}
                  />
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
