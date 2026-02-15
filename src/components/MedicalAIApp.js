'use client';

import { useState } from 'react';
import { Heart, User, Stethoscope, FileText, BarChart2, Settings, LogOut, LayoutDashboard, Menu, X, Bell } from 'lucide-react';
import { T, fontDisplay, font } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks';
import { NavItem, MobileNavItem } from '@/components/ui';
import ProviderDashboard from '@/components/ProviderDashboard';
import SymptomChecker from '@/components/SymptomChecker';
import PatientPortal from '@/components/PatientPortal';

export default function MedicalAIApp() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: "2" },
    { id: "symptom", label: "Symptoms", icon: Stethoscope },
    { id: "portal", label: "Portal", icon: User },
  ];

  const secondaryNav = [
    { id: "records", label: "Health Records", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNav = (id) => {
    setActiveView(id);
    setMobileSidebarOpen(false);
  };

  // ===== MOBILE LAYOUT =====
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%", background: T.bg, fontFamily: font }}>
        {/* Mobile Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", borderBottom: `1px solid ${T.border}`,
          background: T.surface, flexShrink: 0, zIndex: 30,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setMobileSidebarOpen(true)} style={{ background: "none", border: "none", color: T.text, cursor: "pointer", padding: 4 }}>
              <Menu size={22} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.gradient1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Heart size={14} color="#fff" />
              </div>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 16 }}>MedAI</span>
            </div>
          </div>
          <button style={{ background: "none", border: "none", color: T.textMuted, cursor: "pointer", padding: 4, position: "relative" }}>
            <Bell size={20} />
            <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: T.danger }} />
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <>
            <div onClick={() => setMobileSidebarOpen(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 40, animation: "fadeOverlay 0.2s ease" }} />
            <div className="animate-slide-left" style={{
              position: "fixed", top: 0, left: 0, bottom: 0, width: 280, background: T.surface,
              borderRight: `1px solid ${T.border}`, zIndex: 50, display: "flex", flexDirection: "column",
            }}>
              <div style={{ padding: "16px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: T.gradient1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Heart size={18} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 15 }}>MedAI</div>
                    <div style={{ fontSize: 10, color: T.textDim, textTransform: "uppercase", letterSpacing: 0.5 }}>Medical Assistant</div>
                  </div>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} style={{ background: "none", border: "none", color: T.textDim, cursor: "pointer", padding: 4 }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: "14px 12px", flex: 1 }}>
                <div style={{ fontSize: 10, color: T.textDim, textTransform: "uppercase", letterSpacing: 1.5, padding: "0 8px 8px", fontWeight: 600 }}>Main</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {navItems.map(n => (
                    <NavItem key={n.id} icon={n.icon} label={n.label} active={activeView === n.id} onClick={() => handleNav(n.id)} badge={n.id === "dashboard" ? "2" : undefined} />
                  ))}
                </div>
                <div style={{ fontSize: 10, color: T.textDim, textTransform: "uppercase", letterSpacing: 1.5, padding: "18px 8px 8px", fontWeight: 600 }}>Tools</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {secondaryNav.map(n => (
                    <NavItem key={n.id} icon={n.icon} label={n.label} active={false} onClick={() => setMobileSidebarOpen(false)} />
                  ))}
                </div>
              </div>
              <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: T.gradient2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>DM</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Dr. Martinez</div>
                  <div style={{ fontSize: 11, color: T.textDim }}>Internal Medicine</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {activeView === "dashboard" && <ProviderDashboard />}
          {activeView === "symptom" && <SymptomChecker />}
          {activeView === "portal" && <PatientPortal />}
        </div>

        {/* Bottom Tab Bar */}
        <div style={{
          display: "flex", background: T.surface, borderTop: `1px solid ${T.border}`,
          padding: "4px 6px", paddingBottom: "max(4px, env(safe-area-inset-bottom))",
          flexShrink: 0, zIndex: 30,
        }}>
          {navItems.map(n => (
            <MobileNavItem key={n.id} icon={n.icon} label={n.label} active={activeView === n.id} onClick={() => setActiveView(n.id)} badge={n.badge} />
          ))}
          <MobileNavItem icon={Settings} label="Settings" active={false} onClick={() => {}} />
        </div>
      </div>
    );
  }

  // ===== DESKTOP LAYOUT =====
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden", background: T.bg, fontFamily: font }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 260 : 72, minWidth: sidebarOpen ? 260 : 72,
        background: T.surface, borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column",
        transition: "width 0.25s, min-width 0.25s", overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: sidebarOpen ? "18px 18px 14px" : "18px 14px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            width: 38, height: 38, borderRadius: 12, background: T.gradient1,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
          }}>
            <Heart size={18} color="#fff" />
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 16 }}>MedAI</div>
              <div style={{ fontSize: 10, color: T.textDim, letterSpacing: 0.5, textTransform: "uppercase" }}>Medical Assistant</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <div style={{ padding: sidebarOpen ? "14px 12px" : "14px 10px", flex: 1 }}>
          {sidebarOpen && <div style={{ fontSize: 10, color: T.textDim, textTransform: "uppercase", letterSpacing: 1.5, padding: "0 8px 8px", fontWeight: 600 }}>Main</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {navItems.map(n => (
              sidebarOpen ? (
                <NavItem key={n.id} icon={n.icon} label={n.label} active={activeView === n.id} onClick={() => setActiveView(n.id)} badge={n.id === "dashboard" ? "2" : undefined} />
              ) : (
                <button key={n.id} onClick={() => setActiveView(n.id)} title={n.label} style={{
                  width: 42, height: 42, borderRadius: 10, border: "none", cursor: "pointer",
                  background: activeView === n.id ? `${T.primary}15` : "transparent",
                  color: activeView === n.id ? T.primary : T.textDim,
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "2px auto",
                }}>
                  <n.icon size={20} />
                </button>
              )
            ))}
          </div>
          {sidebarOpen && (
            <>
              <div style={{ fontSize: 10, color: T.textDim, textTransform: "uppercase", letterSpacing: 1.5, padding: "18px 8px 8px", fontWeight: 600 }}>Tools</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {secondaryNav.map(n => <NavItem key={n.id} icon={n.icon} label={n.label} active={false} onClick={() => {}} />)}
              </div>
            </>
          )}
        </div>

        {/* User */}
        {sidebarOpen && (
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: T.gradient2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>DM</span>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dr. Martinez</div>
              <div style={{ fontSize: 11, color: T.textDim }}>Internal Medicine</div>
            </div>
            <LogOut size={16} color={T.textDim} style={{ cursor: "pointer" }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {activeView === "dashboard" && <ProviderDashboard />}
        {activeView === "symptom" && <SymptomChecker />}
        {activeView === "portal" && <PatientPortal />}
      </div>
    </div>
  );
}
