'use client';

import { useState } from 'react';
import {
  Activity, Heart, Home, Calendar, FileText, Plus,
  Thermometer, Pill, Zap, CheckCircle, AlertTriangle, MessageCircle, ClipboardList,
} from 'lucide-react';
import { T, fontDisplay, fontMono, font, patientRecords } from '@/lib/constants';
import { Badge, StatCard } from '@/components/ui';

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "labs", label: "Lab Results", icon: ClipboardList },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "appointments", label: "Appointments", icon: Calendar },
  ];

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fontDisplay, fontSize: 28, fontWeight: 700 }}>
          Welcome back, Alex
        </h1>
        <p style={{ color: T.textMuted, fontSize: 14, marginTop: 4 }}>
          Here&apos;s your health summary for today
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 28,
          background: T.surface,
          borderRadius: 14,
          padding: 4,
          border: `1px solid ${T.border}`,
          width: "fit-content",
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              background: activeTab === t.id ? T.card : "transparent",
              color: activeTab === t.id ? T.text : T.textDim,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <StatCard icon={Heart} label="Blood Pressure" value="122/78" trend="Normal range" color={T.accent} delay={0} />
            <StatCard icon={Activity} label="Heart Rate" value="72 bpm" trend="Resting" color={T.primary} delay={100} />
            <StatCard icon={Thermometer} label="Temperature" value="98.5°F" trend="Normal" color={T.warning} delay={200} />
            <StatCard icon={Zap} label="SpO2" value="99%" trend="Excellent" color="#8B5CF6" delay={300} />
          </div>

          {/* Chart */}
          <div
            className="animate-in"
            style={{
              animationDelay: "200ms",
              background: T.card,
              borderRadius: 20,
              border: `1px solid ${T.border}`,
              padding: 24,
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              Blood Pressure Trend
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 20,
                height: 160,
                paddingBottom: 30,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 30,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {[140, 130, 120, 110].map((v) => (
                  <span
                    key={v}
                    style={{
                      fontSize: 10,
                      color: T.textDim,
                      fontFamily: fontMono,
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  marginLeft: 36,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 12,
                  height: "100%",
                  position: "relative",
                }}
              >
                {[0.25, 0.5, 0.75, 1].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: `${p * 100}%`,
                      borderBottom: `1px dashed ${T.border}40`,
                      height: 0,
                    }}
                  />
                ))}
                {patientRecords.vitalsHistory.map((v, i) => {
                  const h = ((v.bp - 110) / 30) * 130;
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        zIndex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: fontMono,
                          color: v.bp > 130 ? T.warning : T.accent,
                        }}
                      >
                        {v.bp}
                      </span>
                      <div
                        style={{
                          width: "70%",
                          height: Math.max(h, 20),
                          borderRadius: "8px 8px 4px 4px",
                          background:
                            v.bp > 130
                              ? `linear-gradient(to top, ${T.warning}, ${T.warning}80)`
                              : `linear-gradient(to top, ${T.accent}, ${T.accent}80)`,
                          transition: "height 0.5s",
                        }}
                      />
                      <span style={{ fontSize: 10, color: T.textDim }}>
                        {v.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {[
              {
                icon: MessageCircle,
                label: "AI Symptom Check",
                desc: "Get an AI-powered assessment",
                gradient: T.gradient1,
              },
              {
                icon: Calendar,
                label: "Book Appointment",
                desc: "Schedule with your provider",
                gradient: T.gradient2,
              },
              {
                icon: FileText,
                label: "Request Records",
                desc: "Download your health data",
                gradient: "linear-gradient(135deg, #8B5CF6, #A855F7)",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="animate-in"
                style={{
                  animationDelay: `${300 + i * 100}ms`,
                  background: T.card,
                  borderRadius: 18,
                  padding: 22,
                  border: `1px solid ${T.border}`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: a.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                  }}
                >
                  <a.icon size={22} color="#fff" />
                </div>
                <h4
                  style={{
                    fontFamily: fontDisplay,
                    fontWeight: 600,
                    fontSize: 15,
                    marginBottom: 4,
                  }}
                >
                  {a.label}
                </h4>
                <p style={{ fontSize: 12, color: T.textDim }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Lab Results */}
      {activeTab === "labs" && (
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
            }}
          >
            <h3 style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 16 }}>
              Recent Lab Results
            </h3>
            <p style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}>
              AI-generated plain-language explanations included
            </p>
          </div>
          {patientRecords.labs.map((l, i) => (
            <div
              key={i}
              style={{
                padding: "18px 22px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background:
                    l.status === "normal"
                      ? `${T.accent}15`
                      : `${T.warning}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {l.status === "normal" ? (
                  <CheckCircle size={18} color={T.accent} />
                ) : (
                  <AlertTriangle size={18} color={T.warning} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{l.test}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>{l.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: l.status === "normal" ? T.accent : T.warning,
                  }}
                >
                  {l.value}
                </div>
                <Badge color={l.status === "normal" ? T.accent : T.warning}>
                  {l.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Medications */}
      {activeTab === "medications" && (
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
            <div>
              <h3
                style={{
                  fontFamily: fontDisplay,
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                My Medications
              </h3>
              <p style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}>
                AI monitors interactions and reminds refills
              </p>
            </div>
            <Badge color={T.accent}>No Interactions Found</Badge>
          </div>
          {patientRecords.medications.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "18px 22px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${T.primary}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pill size={18} color={T.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>
                  {m.schedule}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: T.textMuted }}>
                  Refill: {m.refillDate}
                </div>
                <Badge color={m.status === "active" ? T.accent : T.primary}>
                  {m.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Appointments */}
      {activeTab === "appointments" && (
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
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Upcoming Appointments
            </h3>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                border: "none",
                background: T.gradient1,
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Plus size={14} /> New Appointment
            </button>
          </div>
          {patientRecords.upcomingAppts.map((a, i) => (
            <div
              key={i}
              style={{
                padding: "18px 22px",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${T.accent}12`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: fontMono,
                    color: T.accent,
                  }}
                >
                  {a.date.split(" ")[1]}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: T.textDim,
                    textTransform: "uppercase",
                  }}
                >
                  {a.date.split(" ")[0]}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{a.type}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>
                  {a.provider} · {a.time}
                </div>
              </div>
              <button
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: `1px solid ${T.border}`,
                  background: "transparent",
                  color: T.textMuted,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Reschedule
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
