'use client';

import { T, fontDisplay } from '@/lib/constants';

export function Badge({ children, color = T.primary, bg, small }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: small ? "2px 8px" : "3px 10px",
      borderRadius: 20,
      fontSize: small ? 10 : 11,
      fontWeight: 600, letterSpacing: 0.5,
      background: bg || `${color}22`, color,
      textTransform: "uppercase", whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

export function RiskBadge({ risk }) {
  const c = { low: T.accent, medium: T.warning, high: T.danger }[risk];
  return <Badge color={c}>{risk}</Badge>;
}

export function StatCard({ icon: Icon, label, value, trend, color = T.primary, delay = 0, compact }) {
  return (
    <div className="animate-in" style={{
      animationDelay: `${delay}ms`,
      background: T.card, borderRadius: compact ? 12 : 16,
      padding: compact ? "14px 16px" : "20px 22px",
      border: `1px solid ${T.border}`, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: `${color}08`, borderRadius: "0 0 0 60px" }} />
      <div style={{ display: "flex", alignItems: "center", gap: compact ? 8 : 12, marginBottom: compact ? 8 : 12 }}>
        <div style={{
          width: compact ? 32 : 40, height: compact ? 32 : 40, borderRadius: compact ? 8 : 12,
          background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={compact ? 16 : 20} color={color} />
        </div>
        <span style={{ fontSize: compact ? 11 : 13, color: T.textMuted, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: compact ? 22 : 28, fontWeight: 700, fontFamily: fontDisplay, color: T.text }}>{value}</div>
      {trend && <div style={{ fontSize: compact ? 11 : 12, color: trend.startsWith("+") ? T.accent : T.textMuted, marginTop: 4, fontWeight: 500 }}>{trend}</div>}
    </div>
  );
}

export function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 12, width: "100%",
      padding: "11px 16px", borderRadius: 12, border: "none", cursor: "pointer",
      background: active ? `${T.primary}15` : "transparent",
      color: active ? T.primary : T.textMuted,
      transition: "all 0.2s", fontSize: 14, fontWeight: active ? 600 : 400, position: "relative",
    }}>
      <Icon size={19} />
      <span>{label}</span>
      {badge && <span style={{ marginLeft: "auto", background: T.danger, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10 }}>{badge}</span>}
    </button>
  );
}

export function MobileNavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      padding: "8px 4px", borderRadius: 10, border: "none", cursor: "pointer",
      background: active ? `${T.primary}12` : "transparent",
      color: active ? T.primary : T.textDim, transition: "all 0.2s", position: "relative",
    }}>
      <Icon size={20} />
      <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{label}</span>
      {badge && <span style={{ position: "absolute", top: 4, right: "calc(50% - 16px)", width: 8, height: 8, borderRadius: "50%", background: T.danger }} />}
    </button>
  );
}

export function CardSection({ title, icon: Icon, iconColor, rightContent, children, noPadBody }) {
  return (
    <div className="animate-in" style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.border}`, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          {Icon && <Icon size={18} color={iconColor || T.primary} style={{ flexShrink: 0 }} />}
          <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, whiteSpace: "nowrap" }}>{title}</span>
        </div>
        {rightContent}
      </div>
      {noPadBody ? children : <div style={{ padding: "14px 18px" }}>{children}</div>}
    </div>
  );
}
