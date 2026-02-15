'use client';

import { useState } from 'react';
import {
  Heart, User, Stethoscope, FileText, BarChart2, Settings, LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { T, fontDisplay, font } from '@/lib/constants';
import { NavItem } from '@/components/ui';
import ProviderDashboard from '@/components/ProviderDashboard';
import SymptomChecker from '@/components/SymptomChecker';
import PatientPortal from '@/components/PatientPortal';

export default function MedicalAIApp() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: "dashboard", label: "Provider Dashboard", icon: LayoutDashboard },
    { id: "symptom", label: "Symptom Checker", icon: Stethoscope },
    { id: "portal", label: "Patient Portal", icon: User },
  ];

  const secondaryNav = [
    { id: "records", label: "Health Records", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: T.bg,
        fontFamily: font,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? 260 : 72,
          minWidth: sidebarOpen ? 260 : 72,
          background: T.surface,
          borderRight: `1px solid ${T.border}`,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s, min-width 0.25s",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: sidebarOpen ? "20px 20px 16px" : "20px 14px 16px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              background: T.gradient1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Heart size={20} color="#fff" />
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                MedAI
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: T.textDim,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Medical Assistant
              </div>
            </div>
          )}
        </div>

        {/* Main Nav */}
        <div
          style={{
            padding: sidebarOpen ? "16px 12px" : "16px 10px",
            flex: 1,
          }}
        >
          {sidebarOpen && (
            <div
              style={{
                fontSize: 10,
                color: T.textDim,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                padding: "0 8px 10px",
                fontWeight: 600,
              }}
            >
              Main
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {navItems.map((n) =>
              sidebarOpen ? (
                <NavItem
                  key={n.id}
                  icon={n.icon}
                  label={n.label}
                  active={activeView === n.id}
                  onClick={() => setActiveView(n.id)}
                  badge={n.id === "dashboard" ? "2" : undefined}
                />
              ) : (
                <button
                  key={n.id}
                  onClick={() => setActiveView(n.id)}
                  title={n.label}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    background:
                      activeView === n.id ? `${T.primary}15` : "transparent",
                    color: activeView === n.id ? T.primary : T.textDim,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "2px auto",
                  }}
                >
                  <n.icon size={20} />
                </button>
              )
            )}
          </div>

          {sidebarOpen && (
            <>
              <div
                style={{
                  fontSize: 10,
                  color: T.textDim,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  padding: "20px 8px 10px",
                  fontWeight: 600,
                }}
              >
                Tools
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {secondaryNav.map((n) => (
                  <NavItem
                    key={n.id}
                    icon={n.icon}
                    label={n.label}
                    active={false}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div
            style={{
              padding: "12px 14px",
              borderTop: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: T.gradient2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}
              >
                DM
              </span>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Dr. Martinez
              </div>
              <div style={{ fontSize: 11, color: T.textDim }}>
                Internal Medicine
              </div>
            </div>
            <LogOut
              size={16}
              color={T.textDim}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activeView === "dashboard" && <ProviderDashboard />}
        {activeView === "symptom" && <SymptomChecker />}
        {activeView === "portal" && <PatientPortal />}
      </div>
    </div>
  );
}
