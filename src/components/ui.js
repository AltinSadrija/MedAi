'use client';

import { T, fontDisplay } from '@/lib/constants';

export function Badge({ children, color = T.primary, bg }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.5,
        background: bg || `${color}22`,
        color,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

export function RiskBadge({ risk }) {
  const c = { low: T.accent, medium: T.warning, high: T.danger }[risk];
  return <Badge color={c}>{risk}</Badge>;
}

export function StatCard({ icon: Icon, label, value, trend, color = T.primary, delay = 0 }) {
  return (
    <div
      className="animate-in"
      style={{
        animationDelay: `${delay}ms`,
        background: T.card,
        borderRadius: 16,
        padding: "20px 22px",
        border: `1px solid ${T.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: `${color}08`,
          borderRadius: "0 0 0 80px",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color={color} />
        </div>
        <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: fontDisplay, color: T.text }}>
        {value}
      </div>
      {trend && (
        <div
          style={{
            fontSize: 12,
            color: trend.startsWith("+") ? T.accent : T.danger,
            marginTop: 4,
            fontWeight: 500,
          }}
        >
          {trend}
        </div>
      )}
    </div>
  );
}

export function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: "11px 16px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        background: active ? `${T.primary}15` : "transparent",
        color: active ? T.primary : T.textMuted,
        transition: "all 0.2s",
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        position: "relative",
      }}
    >
      <Icon size={19} />
      <span>{label}</span>
      {badge && (
        <span
          style={{
            marginLeft: "auto",
            background: T.danger,
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: 10,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
