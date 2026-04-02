import { useState, useEffect, useCallback } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  sage:       "#8a9e80",
  sageDark:   "#4a6050",
  sageMid:    "#6b8060",
  sageBg:     "#b8c8b0",
  sagePale:   "#e8ede4",
  sageLight:  "#c8d8c0",
  cream:      "#f6f5f0",
  card:       "#ffffff",
  dark:       "#1c2820",
  mid:        "#46584a",
  muted:      "#7a8e7e",
  border:     "rgba(74,96,80,0.14)",
  borderMid:  "rgba(74,96,80,0.28)",
  success:    "#4a8050",
  warn:       "#b07830",
  danger:     "#a84040",
  dangerBg:   "#faf0f0",
  warnBg:     "#fdf6ec",
  successBg:  "#f0f8f2",
  blue:       "#3a6080",
  blueBg:     "#eef4f8",
};

// ─── SVG Icon system (no emojis) ─────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor", strokeWidth = 1.6 }) => {
  const s = { width: size, height: size, flexShrink: 0 };
  const paths = {
    activity:      <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    alert:         <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    battery:       <><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><line x1="6" y1="12" x2="10" y2="12"/></>,
    car:           <><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    check:         <><polyline points="20 6 9 17 4 12"/></>,
    "check-circle":<><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    chevronDown:   <><polyline points="6 9 12 15 18 9"/></>,
    chevronRight:  <><polyline points="9 18 15 12 9 6"/></>,
    chevronLeft:   <><polyline points="15 18 9 12 15 6"/></>,
    clipboard:     <><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></>,
    cpu:           <><rect x="9" y="9" width="6" height="6"/><path d="M15 9V5h-4M9 9V5h4M15 15v4h-4M9 15v4h4M5 9H1v4M5 15H1v4M19 9h4v4M19 15h4v4"/></>,
    droplet:       <><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></>,
    download:      <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    edit:          <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    file:          <><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></>,
    gauge:         <><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6v2M12 16v2M6 12H4M20 12h-2M7.76 7.76l1.42 1.42M14.82 14.82l1.42 1.42M7.76 16.24l1.42-1.42M14.82 9.18l1.42-1.42"/><circle cx="12" cy="12" r="2"/></>,
    heart:         <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
    info:          <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    layers:        <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    link:          <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
    loader:        <><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></>,
    map:           <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    menu:          <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    minus:         <><line x1="5" y1="12" x2="19" y2="12"/></>,
    plus:          <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    plug:          <><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8H6l2 5h8l2-5z"/><path d="M12 17a5 5 0 005-5v-2H7v2a5 5 0 005 5z"/></>,
    refresh:       <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></>,
    settings:      <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    shield:        <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    thermometer:   <><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></>,
    trash:         <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
    truck:         <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    upload:        <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    user:          <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    video:         <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
    wifi:          <><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></>,
    "x":           <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    "x-circle":    <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    zap:           <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    list:          <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    grid:          <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    signal:        <><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55"/><path d="M5 12.55a10.94 10.94 0 015.17-2.39"/><path d="M10.71 5.05A16 16 0 0122.56 9"/><path d="M1.42 9a15.91 15.91 0 014.7-2.88"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></>,
    "bar-chart":   <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    key:           <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>,
    hash:          <><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></>,
    "cpu-chip":    <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></>,
    "hard-drive":  <><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/><circle cx="16" cy="16" r="1"/><circle cx="8" cy="16" r="1"/></>,
  };
  return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ─── Beacon Logo (SVG recreation from image) ──────────────────────────────────
const BeaconWordmark = ({ dark = false, size = 1 }) => {
  const fg = dark ? "#e8ede4" : "#4a5a40";
  const accent = dark ? "#8aae90" : "#6b8060";
  // Wifi arcs anchored at bottom-left of the icon group, radiating upper-right ~45deg
  // Origin point (ox, oy) sits just above the top-right of the "n"
  const ox = 117, oy = 18;
  return (
    <svg width={148 * size} height={38 * size} viewBox="0 0 148 38" fill="none">
      <text
        x="4" y="30"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="26"
        fill={fg}
        letterSpacing="-0.3"
      >Beacon</text>
      {/* Dot — the origin / innermost point */}
      <circle cx={ox} cy={oy} r="2" fill={accent}/>
      {/* Inner arc — small radius, sweeping upper-right */}
      <path
        d={`M${ox - 1} ${oy - 5.5} A6 6 0 0 1 ${ox + 5.5} ${oy + 1}`}
        stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"
      />
      {/* Outer arc — larger radius */}
      <path
        d={`M${ox - 2} ${oy - 10} A11 11 0 0 1 ${ox + 10} ${oy + 2}`}
        stroke={accent} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.65"
      />
    </svg>
  );
};

// ─── OBD Hardware ID fields spec ──────────────────────────────────────────────
const OBD_FIELDS = [
  {
    id: "vin",
    label: "VIN (Vehicle Identification Number)",
    technical: "ISO 3779 — 17-char chassis identifier broadcast on PID 0x02",
    placeholder: "e.g. MA3FJEB1S00123456",
    pattern: /^[A-HJ-NPR-Z0-9]{17}$/i,
    hint: "17 characters — stamped on your dashboard near the windshield or door jamb",
    maxLen: 17,
  },
  {
    id: "obdDeviceId",
    label: "OBD-II Adapter Serial / Device ID",
    technical: "Unique hardware serial printed on ELM327 / STN-series adapter",
    placeholder: "e.g. OBD-A3F2-9C11",
    pattern: /.{4,}/,
    hint: "Found on the sticker on your OBD-II dongle (plugs under the steering column)",
    maxLen: 32,
  },
  {
    id: "ecuId",
    label: "ECU Module ID (CAN Bus Address)",
    technical: "11-bit or 29-bit CAN arbitration ID — typically 0x7E8 for engine ECU",
    placeholder: "e.g. 0x7E8",
    pattern: /^(0x[0-9A-Fa-f]{1,4}|[0-9]{1,4})$/,
    hint: "The CAN address of your primary ECU — leave as default 0x7E8 if unsure",
    maxLen: 6,
  },
  {
    id: "iccid",
    label: "Beacon Device ICCID (SIM)",
    technical: "19–20 digit ICCID of the embedded SIM in the Beacon telematics unit",
    placeholder: "e.g. 89910000000000000000",
    pattern: /^[0-9]{19,20}$/,
    hint: "Printed on the Beacon hardware unit or found in the Beacon activation email",
    maxLen: 20,
  },
];

// ─── Mock fleet data ──────────────────────────────────────────────────────────
const INITIAL_VEHICLES = [
  {
    id: "v1",
    nickname: "Swift — Daily",
    make: "Maruti Suzuki", model: "Swift VXi", year: 2022, color: "#e8e0d0",
    registration: "RJ-15-AB-1234",
    status: "connected",
    vin: "MA3FJEB1S00123456",
    obdDeviceId: "OBD-A3F2-9C11",
    ecuId: "0x7E8",
    iccid: "89910000001234567890",
    vitals: { engineTemp: 87, oilPressure: 42, batteryV: 12.6, fuelLevel: 68, rpm: 2400, speed: 62 },
    dtcCodes: ["P0420", "P0171"],
    odometer: 48321,
    health: 74,
    trips: 127,
    fuelEff: 17.8,
  },
  {
    id: "v2",
    nickname: "Innova — Family",
    make: "Toyota", model: "Innova Crysta", year: 2021, color: "#c8d8c0",
    registration: "DL-3C-AB-5678",
    status: "idle",
    vin: "MBJFB8BJ3M2000001",
    obdDeviceId: "OBD-B8C1-2E40",
    ecuId: "0x7E8",
    iccid: "89910000009876543210",
    vitals: { engineTemp: 72, oilPressure: 48, batteryV: 12.9, fuelLevel: 91, rpm: 0, speed: 0 },
    dtcCodes: [],
    odometer: 32100,
    health: 96,
    trips: 89,
    fuelEff: 12.4,
  },
];

const NAV = [
  { id: "fleet",    label: "Fleet Overview",      icon: "grid" },
  { id: "dash",     label: "Dashboard",            icon: "gauge" },
  { id: "diag",     label: "Vehicle Diagnosis",    icon: "cpu" },
  { id: "driving",  label: "Driving Record",       icon: "map" },
  { id: "engine",   label: "Engine Health",        icon: "heart" },
  { id: "mfr",      label: "Manufacturer",         icon: "clipboard" },
  { id: "fuel",     label: "Fuel Efficiency",      icon: "droplet" },
  { id: "dashcam",  label: "Dashcam & Insurance",  icon: "video" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Badge = ({ children, color = T.sageDark, bg }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bg || color + "18", color, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 700, letterSpacing: 0.2, whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const Btn = ({ children, variant = "primary", onClick, disabled, style = {}, icon }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 9,
    padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
    border: "none", transition: "all 0.15s", opacity: disabled ? 0.5 : 1,
    fontFamily: "inherit",
  };
  const variants = {
    primary: { background: T.sageDark, color: "#fff" },
    secondary: { background: T.sagePale, color: T.sageDark, border: `1.5px solid ${T.border}` },
    danger: { background: T.danger, color: "#fff" },
    ghost: { background: "transparent", color: T.sageDark, border: `1.5px solid ${T.borderMid}` },
  };
  return <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick} disabled={disabled}>{icon && <Icon name={icon} size={14} color="currentColor"/>}{children}</button>;
};

const Card = ({ children, style = {}, onClick }) => (
  <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", ...style }} onClick={onClick}>
    {children}
  </div>
);

const ProgressBar = ({ value, max = 100, color = T.sageDark, height = 6 }) => (
  <div style={{ height, background: T.sagePale, borderRadius: height, overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${Math.min((value / max) * 100, 100)}%`, background: color, borderRadius: height, transition: "width 0.8s ease" }}/>
  </div>
);

const StatBox = ({ label, value, unit, icon, color = T.sageDark }) => (
  <Card style={{ padding: "14px 16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
      <span style={{ fontSize: 11, color: T.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</span>
      <Icon name={icon} size={15} color={color}/>
    </div>
    <div style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1 }}>
      {value}<span style={{ fontSize: 13, fontWeight: 400, color: T.muted }}>{unit && ` ${unit}`}</span>
    </div>
  </Card>
);

// Health score ring
const HealthRing = ({ score, size = 56 }) => {
  const r = (size - 10) / 2, circ = 2 * Math.PI * r;
  const color = score >= 80 ? T.success : score >= 55 ? T.warn : T.danger;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.sagePale} strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: "stroke-dasharray 1s ease" }}/>
      <text x={size/2} y={size/2 + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{score}</text>
    </svg>
  );
};

// Live gauge (arc)
const ArcGauge = ({ value, max, label, unit, warnAt, critAt }) => {
  const pct = Math.min(value / max, 1);
  const color = value >= (critAt || Infinity) ? T.danger : value >= (warnAt || Infinity) ? T.warn : T.success;
  const cx = 50, cy = 52, r = 38;
  const toXY = (deg) => ({ x: cx + r * Math.cos((deg * Math.PI) / 180), y: cy + r * Math.sin((deg * Math.PI) / 180) });
  const start = toXY(-140), end = toXY(-140 + pct * 280);
  const large = pct > 0.5 ? 1 : 0;
  return (
    <svg viewBox="0 0 100 72" style={{ width: "100%", maxWidth: 100 }}>
      <path d={`M ${toXY(-140).x} ${toXY(-140).y} A ${r} ${r} 0 1 1 ${toXY(140).x} ${toXY(140).y}`}
        stroke={T.sagePale} strokeWidth="5" fill="none" strokeLinecap="round"/>
      {pct > 0.01 && <path d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
        stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" style={{ transition: "all 0.6s ease" }}/>}
      <text x="50" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{typeof value === "number" ? (value % 1 ? value.toFixed(1) : value) : value}</text>
      <text x="50" y="62" textAnchor="middle" fontSize="8" fill={T.muted}>{unit}</text>
    </svg>
  );
};

// Notification toast
const Toast = ({ notif }) => notif ? (
  <div style={{ position: "fixed", top: 20, right: 24, zIndex: 9999, background: notif.type === "error" ? T.danger : T.sageDark, color: "#fff", borderRadius: 12, padding: "11px 18px", fontSize: 13, fontWeight: 600, boxShadow: "0 6px 24px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 8, animation: "toastIn 0.3s ease" }}>
    <Icon name={notif.type === "error" ? "x-circle" : "check-circle"} size={15} color="#fff"/>
    {notif.msg}
  </div>
) : null;

// Modal shell
const Modal = ({ open, onClose, title, children, width = 520 }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,40,32,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={onClose}>
      <div style={{ background: T.card, borderRadius: 18, width: "100%", maxWidth: width, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "modalIn 0.22s ease" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 0" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: T.dark }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, padding: 4 }}>
            <Icon name="x" size={18} color={T.muted}/>
          </button>
        </div>
        <div style={{ padding: "16px 24px 24px" }}>{children}</div>
      </div>
    </div>
  );
};

// ─── Add Vehicle Wizard ───────────────────────────────────────────────────────
const AddVehicleWizard = ({ onAdd, onClose }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ nickname: "", make: "", model: "", year: "", registration: "", vin: "", obdDeviceId: "", ecuId: "0x7E8", iccid: "" });
  const [errors, setErrors] = useState({});
  const [testing, setTesting] = useState(false);
  const [testOk, setTestOk] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const validate = (field) => {
    const spec = OBD_FIELDS.find(f => f.id === field);
    if (!spec) return true;
    return spec.pattern.test(form[field]);
  };

  const steps = ["Vehicle Info", "Hardware IDs", "Connection Test", "Confirm"];

  const doTest = () => {
    setTesting(true); setTestOk(false);
    setTimeout(() => { setTesting(false); setTestOk(true); }, 2200);
  };

  const submit = () => {
    onAdd({
      id: "v" + Date.now(),
      ...form,
      year: parseInt(form.year),
      status: "connected",
      vitals: { engineTemp: 82, oilPressure: 40, batteryV: 12.5, fuelLevel: 75, rpm: 0, speed: 0 },
      dtcCodes: [],
      odometer: 0,
      health: 95,
      trips: 0,
      fuelEff: 0,
      color: "#d0dcd8",
    });
  };

  const inputStyle = (err) => ({
    width: "100%", padding: "10px 12px", borderRadius: 9, border: `1.5px solid ${err ? T.danger : T.borderMid}`,
    fontSize: 13, color: T.dark, fontFamily: "inherit", background: "#fafaf8", outline: "none",
    boxSizing: "border-box",
  });

  const labelStyle = { fontSize: 12, fontWeight: 600, color: T.mid, marginBottom: 4, display: "block" };
  const hintStyle = { fontSize: 11, color: T.muted, marginTop: 3 };
  const techStyle = { fontSize: 10, color: T.sage, marginTop: 2, fontFamily: "monospace" };

  return (
    <div>
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, background: T.sagePale, borderRadius: 10, padding: 4 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center", padding: "7px 4px", borderRadius: 8, fontSize: 12, fontWeight: i === step ? 700 : 500, background: i === step ? T.card : "transparent", color: i <= step ? T.sageDark : T.muted, boxShadow: i === step ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
            {i < step ? <Icon name="check" size={12} color={T.success}/> : `${i + 1}.`} {s}
          </div>
        ))}
      </div>

      {/* Step 0: Vehicle info */}
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Nickname / Label</label>
            <input style={inputStyle()} value={form.nickname} onChange={e => set("nickname", e.target.value)} placeholder="e.g. Office Car, Family SUV"/>
            <div style={hintStyle}>A short name to identify this vehicle in your fleet</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 10 }}>
            <div>
              <label style={labelStyle}>Make</label>
              <input style={inputStyle()} value={form.make} onChange={e => set("make", e.target.value)} placeholder="Maruti Suzuki"/>
            </div>
            <div>
              <label style={labelStyle}>Model</label>
              <input style={inputStyle()} value={form.model} onChange={e => set("model", e.target.value)} placeholder="Swift VXi"/>
            </div>
            <div>
              <label style={labelStyle}>Year</label>
              <input style={inputStyle()} value={form.year} onChange={e => set("year", e.target.value)} placeholder="2022" type="number"/>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Registration Number</label>
            <input style={inputStyle()} value={form.registration} onChange={e => set("registration", e.target.value)} placeholder="RJ-15-AB-1234"/>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Btn onClick={() => setStep(1)} disabled={!form.nickname || !form.make || !form.model || !form.year}>Next — Hardware IDs</Btn>
          </div>
        </div>
      )}

      {/* Step 1: Hardware IDs */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: "10px 14px", background: T.blueBg, borderRadius: 10, fontSize: 12, color: T.blue, display: "flex", gap: 8 }}>
            <Icon name="info" size={14} color={T.blue}/>
            These identifiers pair your physical vehicle and Beacon hardware to this dashboard. All fields use standard OBD-II / CAN bus specifications.
          </div>
          {OBD_FIELDS.map(f => {
            const val = form[f.id];
            const valid = val ? f.pattern.test(val) : true;
            return (
              <div key={f.id}>
                <label style={labelStyle}>{f.label}</label>
                <input style={inputStyle(!valid && val)} value={val} onChange={e => set(f.id, e.target.value.slice(0, f.maxLen))} placeholder={f.placeholder} maxLength={f.maxLen}/>
                <div style={hintStyle}>{f.hint}</div>
                <div style={techStyle}>Technical: {f.technical}</div>
                {!valid && val && <div style={{ fontSize: 11, color: T.danger, marginTop: 2 }}>Invalid format — check and retry</div>}
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Btn variant="ghost" onClick={() => setStep(0)} icon="chevronLeft">Back</Btn>
            <Btn onClick={() => setStep(2)} disabled={!form.vin || !form.obdDeviceId} icon="wifi">Test Connection</Btn>
          </div>
        </div>
      )}

      {/* Step 2: Connection test */}
      {step === 2 && (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.dark, marginBottom: 6 }}>Connection Test</div>
          <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>Verifying Beacon hardware can communicate with your vehicle's ECU</div>
          {!testing && !testOk && (
            <Btn onClick={doTest} icon="wifi" style={{ margin: "0 auto" }}>Run Connection Test</Btn>
          )}
          {testing && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ animation: "spin 1.2s linear infinite" }}><Icon name="loader" size={36} color={T.sageDark}/></div>
              <div style={{ fontSize: 13, color: T.muted }}>Pinging OBD adapter and reading ECU headers…</div>
              {["Locating ICCID on network...", "Handshake with OBD adapter...", "Reading ECU at " + form.ecuId + "...", "Validating VIN response..."].map((msg, i) => (
                <div key={msg} style={{ fontSize: 12, color: T.sage, opacity: testing ? 1 : 0, transition: `opacity 0.3s ${i * 0.4}s` }}>
                  <Icon name="check" size={11} color={T.sage}/> {msg}
                </div>
              ))}
            </div>
          )}
          {testOk && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.successBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="check-circle" size={28} color={T.success}/>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.success }}>Connection Established</div>
              <div style={{ fontSize: 13, color: T.muted }}>ECU responding at {form.ecuId} · VIN confirmed · Signal strong</div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            <Btn variant="ghost" onClick={() => setStep(1)} icon="chevronLeft">Back</Btn>
            {testOk && <Btn onClick={() => setStep(3)} icon="chevronRight">Review & Confirm</Btn>}
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              ["Vehicle", `${form.year} ${form.make} ${form.model}`],
              ["Label", form.nickname],
              ["Registration", form.registration],
              ["VIN", form.vin],
              ["OBD Adapter", form.obdDeviceId],
              ["ECU Address", form.ecuId],
              ["ICCID", form.iccid || "—"],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: "10px 12px", background: T.sagePale, borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.muted, textTransform: "uppercase", marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.dark, fontFamily: k === "VIN" || k === "ECU Address" || k === "ICCID" || k === "OBD Adapter" ? "monospace" : "inherit", wordBreak: "break-all" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Btn variant="ghost" onClick={() => setStep(2)} icon="chevronLeft">Back</Btn>
            <Btn onClick={submit} icon="plus">Add to Fleet</Btn>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Vehicle Selector Popover ─────────────────────────────────────────────────
const VehicleSelector = ({ vehicles, selected, onSelect, onAdd }) => {
  const [open, setOpen] = useState(false);
  const v = vehicles.find(v => v.id === selected) || vehicles[0];
  const statusColor = (s) => s === "connected" ? T.success : s === "idle" ? T.warn : T.danger;
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: T.sagePale, border: `1.5px solid ${T.borderMid}`, borderRadius: 11, padding: "7px 12px", cursor: "pointer", userSelect: "none" }}
        onClick={() => setOpen(o => !o)}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor(v.status), flexShrink: 0 }}/>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.dark }}>{v.nickname}</div>
          <div style={{ fontSize: 10, color: T.muted }}>{v.registration}</div>
        </div>
        <Icon name="chevronDown" size={14} color={T.muted} style={{ marginLeft: 4 }}/>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: T.card, borderRadius: 13, border: `1px solid ${T.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.14)", zIndex: 200, minWidth: 240, overflow: "hidden" }}>
          {vehicles.map(veh => (
            <div key={veh.id} onClick={() => { onSelect(veh.id); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", cursor: "pointer", background: veh.id === selected ? T.sagePale : "transparent", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor(veh.status), flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.dark }}>{veh.nickname}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{veh.year} {veh.make} {veh.model}</div>
              </div>
              <HealthRing score={veh.health} size={34}/>
            </div>
          ))}
          <div style={{ padding: 10 }}>
            <Btn variant="ghost" onClick={() => { setOpen(false); onAdd(); }} style={{ width: "100%", justifyContent: "center" }} icon="plus">Add Vehicle</Btn>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Remove vehicle modal ─────────────────────────────────────────────────────
const RemoveVehicleModal = ({ vehicle, onConfirm, onClose }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.dangerBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
      <Icon name="trash" size={22} color={T.danger}/>
    </div>
    <div style={{ fontSize: 15, fontWeight: 700, color: T.dark, marginBottom: 6 }}>Remove Vehicle</div>
    <div style={{ fontSize: 13, color: T.muted, marginBottom: 20 }}>
      Remove <strong>{vehicle.nickname}</strong> ({vehicle.registration}) from your fleet? This will unlink the Beacon hardware and delete all local configuration.
    </div>
    <div style={{ padding: "10px 14px", background: T.dangerBg, borderRadius: 10, fontSize: 12, color: T.danger, marginBottom: 20, textAlign: "left" }}>
      Your captured PCAP data and dashcam footage are stored separately and will not be deleted.
    </div>
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
      <Btn variant="danger" onClick={onConfirm} icon="trash">Remove Vehicle</Btn>
    </div>
  </div>
);

// ─── FLEET OVERVIEW ───────────────────────────────────────────────────────────
const FleetView = ({ vehicles, onSelect, setTab, onAddVehicle, onRemove }) => {
  const totalTrips = vehicles.reduce((a, v) => a + v.trips, 0);
  const connected = vehicles.filter(v => v.status === "connected").length;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>Fleet Overview</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>{vehicles.length} vehicles registered · {connected} online</p>
        </div>
        <Btn onClick={onAddVehicle} icon="plus">Add Vehicle</Btn>
      </div>

      {/* Fleet summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <StatBox label="Total Vehicles" value={vehicles.length} icon="truck" color={T.sageDark}/>
        <StatBox label="Online Now" value={connected} icon="wifi" color={T.success}/>
        <StatBox label="Active DTC Codes" value={vehicles.reduce((a, v) => a + v.dtcCodes.length, 0)} icon="alert" color={T.warn}/>
        <StatBox label="Fleet Trips" value={totalTrips} icon="map" color={T.sageDark}/>
      </div>

      {/* Vehicle cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {vehicles.map(v => (
          <Card key={v.id} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 0 }}>
              {/* Color stripe */}
              <div style={{ width: 5, background: v.status === "connected" ? T.success : T.warn }}/>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <HealthRing score={v.health} size={52}/>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: T.dark }}>{v.nickname}</span>
                      <Badge color={v.status === "connected" ? T.success : T.warn}>
                        {v.status === "connected" ? "Connected" : "Idle"}
                      </Badge>
                      {v.dtcCodes.length > 0 && <Badge color={T.danger}>{v.dtcCodes.length} DTC</Badge>}
                    </div>
                    <div style={{ fontSize: 12, color: T.muted }}>{v.year} {v.make} {v.model} · {v.registration}</div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
                      {[
                        { label: "Odometer", value: v.odometer.toLocaleString() + " km", icon: "gauge" },
                        { label: "Fuel", value: v.vitals.fuelLevel + "%", icon: "droplet" },
                        { label: "Efficiency", value: v.fuelEff ? v.fuelEff + " km/L" : "—", icon: "bar-chart" },
                        { label: "Trips", value: v.trips, icon: "map" },
                      ].map(s => (
                        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <Icon name={s.icon} size={12} color={T.muted}/>
                          <span style={{ fontSize: 12, color: T.muted }}>{s.label}:</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: T.dark }}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                    {/* Hardware IDs strip */}
                    <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                      {[{ k: "VIN", v: v.vin }, { k: "OBD", v: v.obdDeviceId }, { k: "ECU", v: v.ecuId }].map(f => (
                        <div key={f.k} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          <span style={{ fontSize: 10, color: T.muted, fontWeight: 600 }}>{f.k}</span>
                          <code style={{ fontSize: 10, background: T.sagePale, color: T.sageDark, padding: "1px 6px", borderRadius: 4 }}>{f.v}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                    <Btn variant="secondary" icon="gauge" onClick={() => { onSelect(v.id); setTab("dash"); }}>Open Dashboard</Btn>
                    <Btn variant="ghost" icon="trash" onClick={() => onRemove(v)} style={{ color: T.danger, borderColor: T.danger + "40" }}>Remove</Btn>
                  </div>
                </div>
                {/* Health bar */}
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Vehicle Health</span>
                    <span style={{ fontSize: 11, color: v.health >= 80 ? T.success : T.warn, fontWeight: 700 }}>{v.health}%</span>
                  </div>
                  <ProgressBar value={v.health} color={v.health >= 80 ? T.success : v.health >= 55 ? T.warn : T.danger}/>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const DashView = ({ vehicle: v, setTab }) => (
  <div>
    <div style={{ background: `linear-gradient(130deg, ${T.sageDark} 0%, #3a5040 100%)`, borderRadius: 18, padding: "24px 28px", marginBottom: 20, color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, opacity: 0.6, marginBottom: 4 }}>Active Vehicle</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{v.nickname}</div>
          <div style={{ opacity: 0.65, fontSize: 13, marginTop: 2 }}>{v.year} {v.make} {v.model} · {v.registration}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <Badge color="#8fba8f" bg="#8fba8f22">Connected</Badge>
            {v.dtcCodes.length > 0 && <Badge color="#e09050" bg="#e0905022">{v.dtcCodes.length} Active DTC Codes</Badge>}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>{v.odometer.toLocaleString()}</div>
          <div style={{ opacity: 0.6, fontSize: 13 }}>km odometer</div>
          <div style={{ marginTop: 10 }}><HealthRing score={v.health} size={52}/></div>
        </div>
      </div>
    </div>

    {/* Gauges */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
      {[
        { label: "Engine Temp", icon: "thermometer", value: Math.round(v.vitals.engineTemp), unit: "°C", max: 130, warnAt: 100, critAt: 110 },
        { label: "Battery", icon: "battery", value: v.vitals.batteryV, unit: "V", max: 15, warnAt: 11.8, critAt: 11.2 },
        { label: "Fuel Level", icon: "droplet", value: v.vitals.fuelLevel, unit: "%", max: 100, warnAt: 25, critAt: 10 },
        { label: "Oil Pressure", icon: "droplet", value: v.vitals.oilPressure, unit: "psi", max: 80, warnAt: 22, critAt: 15 },
      ].map(g => (
        <Card key={g.label} style={{ padding: "14px 12px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: T.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6 }}>{g.label}</span>
            <Icon name={g.icon} size={14} color={T.muted}/>
          </div>
          <ArcGauge {...g}/>
          <div style={{ fontSize: 10, color: g.value >= (g.critAt || 999) ? T.danger : g.value >= (g.warnAt || 999) ? T.warn : T.success, marginTop: 2, fontWeight: 600 }}>
            {g.value >= (g.critAt || 999) ? "Critical" : g.value >= (g.warnAt || 999) ? "Warning" : "Normal"}
          </div>
        </Card>
      ))}
    </div>

    {/* Live + DTC */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr", gap: 12, marginBottom: 18 }}>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="activity" size={13} color={T.mid}/> Live RPM
        </div>
        <div style={{ fontSize: 34, fontWeight: 800, color: T.sageDark }}>{Math.round(v.vitals.rpm).toLocaleString()}</div>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 10 }}>revolutions / min</div>
        <ProgressBar value={v.vitals.rpm} max={6000} color={v.vitals.rpm > 5000 ? T.danger : T.sageDark}/>
      </Card>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="gauge" size={13} color={T.mid}/> Speed
        </div>
        <div style={{ fontSize: 34, fontWeight: 800, color: T.sageDark }}>{Math.round(v.vitals.speed)}</div>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 10 }}>km / h</div>
        <ProgressBar value={v.vitals.speed} max={120} color={T.success}/>
      </Card>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="alert" size={13} color={T.warn}/> Active DTC Codes
        </div>
        {v.dtcCodes.length === 0 ? (
          <div style={{ fontSize: 13, color: T.success, display: "flex", alignItems: "center", gap: 6, padding: "8px 0" }}>
            <Icon name="check-circle" size={14} color={T.success}/> No fault codes detected
          </div>
        ) : v.dtcCodes.map(code => (
          <div key={code} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
            <code style={{ background: T.warnBg, color: T.warn, padding: "2px 7px", borderRadius: 5, fontSize: 12, fontWeight: 700 }}>{code}</code>
            <span style={{ fontSize: 12, color: T.mid }}>{code === "P0420" ? "Catalyst efficiency low" : "System too lean (Bank 1)"}</span>
          </div>
        ))}
        <button style={{ marginTop: 10, background: "none", border: "none", color: T.sageDark, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}
          onClick={() => setTab("diag")}>
          Full diagnosis <Icon name="chevronRight" size={12} color={T.sageDark}/>
        </button>
      </Card>
    </div>

    {/* Quick access */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
      {[
        { tab: "diag",    label: "Diagnosis",     icon: "cpu",       desc: "OBD scan" },
        { tab: "driving", label: "Driving",        icon: "map",       desc: "Trip history" },
        { tab: "engine",  label: "Engine",         icon: "heart",     desc: "Parameters" },
        { tab: "fuel",    label: "Fuel",           icon: "droplet",   desc: "Efficiency" },
        { tab: "dashcam", label: "Dashcam",        icon: "video",     desc: "Footage" },
      ].map(n => (
        <Card key={n.tab} style={{ padding: "14px 12px", textAlign: "center", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
          onClick={() => setTab(n.tab)}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(74,96,80,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: T.sagePale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
            <Icon name={n.icon} size={17} color={T.sageDark}/>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.dark }}>{n.label}</div>
          <div style={{ fontSize: 11, color: T.muted }}>{n.desc}</div>
        </Card>
      ))}
    </div>
  </div>
);

// ─── DIAGNOSIS ────────────────────────────────────────────────────────────────
const DiagView = ({ vehicle: v, showNotif }) => {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const scan = () => { setScanning(true); setDone(false); setTimeout(() => { setScanning(false); setDone(true); showNotif("Scan complete"); }, 2600); };
  const checks = [
    { name: "Engine Control Module", ok: true },
    { name: "Transmission Control", ok: true },
    { name: "ABS / Stability Control", ok: true },
    { name: "Airbag / SRS", ok: true },
    { name: "Emission Control (CAT)", ok: false, note: "P0420 — Catalyst efficiency below threshold" },
    { name: "Fuel Delivery System", ok: false, note: "P0171 — Bank 1 running lean" },
    { name: "Power Steering (EPS)", ok: true },
    { name: "HVAC Module", ok: true },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>Vehicle Diagnosis</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>OBD-II full ECU module scan</p>
        </div>
        <Btn onClick={scan} disabled={scanning} icon={scanning ? "loader" : "cpu"}>{scanning ? "Scanning…" : "Run Full Scan"}</Btn>
      </div>
      {scanning && (
        <Card style={{ padding: 28, textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.sageDark, marginBottom: 14 }}>Querying ECU modules via {v.ecuId}…</div>
          <div style={{ height: 6, background: T.sagePale, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", background: T.sageDark, borderRadius: 4, animation: "scan 2.6s ease forwards" }}/>
          </div>
        </Card>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {checks.map(c => (
          <Card key={c.name} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: c.ok ? T.successBg : T.warnBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={c.ok ? "check-circle" : "alert"} size={18} color={c.ok ? T.success : T.warn}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.dark }}>{c.name}</div>
              {c.note ? <div style={{ fontSize: 11, color: T.warn, marginTop: 2 }}>{c.note}</div>
                : <div style={{ fontSize: 11, color: T.success }}>No faults detected</div>}
            </div>
            <Badge color={c.ok ? T.success : T.warn}>{c.ok ? "OK" : "FAULT"}</Badge>
          </Card>
        ))}
      </div>
      {/* History */}
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="clipboard" size={15} color={T.sageDark}/> Service History
        </div>
        {[
          { date: "2026-03-28", event: "Oil Change", shop: "AutoFix Garage", cost: 1200 },
          { date: "2026-03-10", event: "Brake Inspection", shop: "QuickFix", cost: 500 },
          { date: "2026-02-20", event: "Tyre Rotation", shop: "SpeedZone", cost: 800 },
          { date: "2026-01-15", event: "Battery Replace", shop: "AutoFix Garage", cost: 3500 },
        ].map((h, i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
            <code style={{ fontSize: 11, color: T.muted, minWidth: 90 }}>{h.date}</code>
            <div style={{ flex: 1, fontWeight: 600, fontSize: 13, color: T.dark }}>{h.event}</div>
            <div style={{ fontSize: 12, color: T.muted }}>{h.shop}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.sageDark }}>₹{h.cost.toLocaleString()}</div>
            <Badge color={T.success}>Done</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─── DRIVING RECORD ───────────────────────────────────────────────────────────
const DrivingView = ({ vehicle: v, showNotif }) => {
  const [expanded, setExpanded] = useState(null);
  const trips = [
    { id: 1, date: "Apr 02", from: "Pilani", to: "Jaipur", dist: 210, dur: "3h 20m", avgSpd: 63, fuel: 14.2, score: 87 },
    { id: 2, date: "Mar 30", from: "Jaipur", to: "Delhi", dist: 268, dur: "4h 10m", avgSpd: 64, fuel: 17.8, score: 72 },
    { id: 3, date: "Mar 28", from: "Delhi", to: "Pilani", dist: 223, dur: "3h 40m", avgSpd: 60, fuel: 15.1, score: 91 },
  ];
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: T.dark }}>Driving Record</h2>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: T.muted }}>Trip history and driving behaviour analysis</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatBox label="Total Trips" value={v.trips} icon="map"/>
        <StatBox label="Avg Score" value="83" unit="/100" icon="bar-chart" color={T.success}/>
        <StatBox label="Total Distance" value="889" unit="km" icon="gauge"/>
        <StatBox label="Fuel Used" value="59.7" unit="L" icon="droplet"/>
      </div>
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14 }}>Recent Trips</div>
        {trips.map((t, i) => (
          <div key={t.id} style={{ borderBottom: i < trips.length - 1 ? `1px solid ${T.border}` : "none", paddingBottom: 10, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
              onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
              <HealthRing score={t.score} size={46}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: T.dark }}>{t.from} — {t.to}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{t.date} · {t.dur} · {t.dist} km</div>
              </div>
              <div style={{ textAlign: "right", marginRight: 8 }}>
                <div style={{ fontSize: 11, color: T.muted }}>Avg speed</div>
                <div style={{ fontWeight: 700, color: T.sageDark }}>{t.avgSpd} km/h</div>
              </div>
              <div style={{ textAlign: "right", marginRight: 8 }}>
                <div style={{ fontSize: 11, color: T.muted }}>Fuel</div>
                <div style={{ fontWeight: 700, color: T.sageDark }}>{t.fuel} L</div>
              </div>
              <Icon name={expanded === t.id ? "chevronDown" : "chevronRight"} size={15} color={T.muted}/>
            </div>
            {expanded === t.id && (
              <div style={{ marginTop: 12, padding: 14, background: T.sagePale, borderRadius: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 10 }}>
                  {[["Hard Braking", "2 events"], ["Rapid Accel.", "3 events"], ["Speeding", "0 events"], ["Sharp Turns", "1 event"], ["Idle Time", "4 min"], ["Score", `${t.score}/100`]].map(([k, val]) => (
                    <div key={k} style={{ background: T.card, borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: T.muted, fontWeight: 600 }}>{k}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.sageDark }}>{val}</div>
                    </div>
                  ))}
                </div>
                <Btn variant="ghost" icon="download" onClick={() => showNotif("Trip report exported")}>Export Report</Btn>
              </div>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─── ENGINE HEALTH ────────────────────────────────────────────────────────────
const EngineView = ({ vehicle: v }) => {
  const params = [
    { name: "Coolant Temperature", val: Math.round(v.vitals.engineTemp), unit: "°C", max: 130, safe: [70, 100], icon: "thermometer" },
    { name: "Oil Pressure", val: v.vitals.oilPressure, unit: "psi", max: 80, safe: [25, 65], icon: "droplet" },
    { name: "Engine RPM", val: Math.round(v.vitals.rpm), unit: "rpm", max: 6000, safe: [700, 4500], icon: "activity" },
    { name: "Throttle Position", val: 34, unit: "%", max: 100, safe: [0, 80], icon: "zap" },
    { name: "MAF Sensor", val: 18.4, unit: "g/s", max: 60, safe: [5, 45], icon: "wifi" },
    { name: "O2 Sensor B1", val: 0.72, unit: "V", max: 1, safe: [0.1, 0.9], icon: "signal" },
  ];
  const parts = [
    { name: "Air Filter", life: 72, next: "~3,200 km" },
    { name: "Spark Plugs", life: 55, next: "~8,500 km" },
    { name: "Timing Belt", life: 88, next: "~22,000 km" },
    { name: "Engine Oil", life: 40, next: "~1,200 km" },
  ];
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: T.dark }}>Engine Health</h2>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: T.muted }}>Real-time ECU parameter monitoring</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
        {params.map(p => {
          const inSafe = p.val >= p.safe[0] && p.val <= p.safe[1];
          const color = inSafe ? T.success : T.danger;
          return (
            <Card key={p.name} style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Icon name={p.icon} size={14} color={T.sageDark}/>
                  <span style={{ fontWeight: 700, fontSize: 13, color: T.dark }}>{p.name}</span>
                </div>
                <Badge color={color}>{inSafe ? "Normal" : "Warning"}</Badge>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: T.sageDark, marginBottom: 8 }}>
                {typeof p.val === "number" && p.val % 1 ? p.val.toFixed(2) : p.val}
                <span style={{ fontSize: 13, fontWeight: 400, color: T.muted }}> {p.unit}</span>
              </div>
              <ProgressBar value={p.val} max={p.max} color={color}/>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: T.muted }}>
                <span>0</span><span>Safe: {p.safe[0]}–{p.safe[1]} {p.unit}</span><span>{p.max}</span>
              </div>
            </Card>
          );
        })}
      </div>
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="settings" size={15} color={T.sageDark}/> Predictive Maintenance
        </div>
        {parts.map(p => (
          <div key={p.name} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: T.dark }}>{p.name}</span>
              <span style={{ fontSize: 11, color: T.muted }}>Next: {p.next}</span>
            </div>
            <ProgressBar value={p.life} color={p.life > 60 ? T.success : p.life > 30 ? T.warn : T.danger}/>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{p.life}% remaining</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─── MANUFACTURER ─────────────────────────────────────────────────────────────
const MfrView = ({ vehicle: v, showNotif }) => (
  <div>
    <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: T.dark }}>Manufacturer Record</h2>
    <p style={{ margin: "0 0 18px", fontSize: 13, color: T.muted }}>OEM specifications and vehicle identity</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 18 }}>
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: T.dark }}>Vehicle Identity</div>
        {[["Make", v.make], ["Model", v.model], ["Year", v.year], ["Registration", v.registration], ["VIN", v.vin], ["OBD Adapter", v.obdDeviceId], ["ECU ID", v.ecuId], ["ICCID", v.iccid || "—"]].map(([k, val]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
            <span style={{ color: T.muted }}>{k}</span>
            <code style={{ fontWeight: 600, color: T.dark, fontFamily: ["VIN","OBD Adapter","ECU ID","ICCID"].includes(k) ? "monospace" : "inherit", fontSize: 12 }}>{val}</code>
          </div>
        ))}
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Warranty Status</div>
          {[{ n: "Basic Warranty", exp: "Mar 2027", pct: 65 }, { n: "Powertrain", exp: "Mar 2029", pct: 78 }, { n: "Rust Protection", exp: "Mar 2032", pct: 90 }].map(w => (
            <div key={w.n} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                <span style={{ fontWeight: 600, color: T.dark }}>{w.n}</span>
                <span style={{ color: T.muted }}>Expires {w.exp}</span>
              </div>
              <ProgressBar value={w.pct} color={T.success}/>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Documents</div>
          {["Registration Certificate", "Insurance Policy", "PUC Certificate", "Service Booklet"].map(d => (
            <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.dark }}>
                <Icon name="file" size={13} color={T.muted}/> {d}
              </div>
              <Btn variant="ghost" icon="download" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => showNotif(`Downloading ${d}`)}>Download</Btn>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </div>
);

// ─── FUEL EFFICIENCY ──────────────────────────────────────────────────────────
const FuelView = ({ vehicle: v }) => {
  const data = [14.2, 13.8, 15.1, 12.9, 14.6, 13.2, 16.1, 14.8];
  const max = Math.max(...data);
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: T.dark }}>Fuel Efficiency</h2>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: T.muted }}>Consumption trends and cost analysis</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatBox label="Current Mileage" value={v.fuelEff || "17.8"} unit="km/L" icon="droplet" color={T.success}/>
        <StatBox label="Best This Month" value="19.2" unit="km/L" icon="bar-chart" color={T.sageDark}/>
        <StatBox label="Cost / 100km" value="₹483" icon="zap" color={T.sageDark}/>
        <StatBox label="CO₂ Estimate" value="142" unit="g/km" icon="activity" color={T.warn}/>
      </div>
      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="bar-chart" size={14} color={T.sageDark}/> Consumption — Last 8 Weeks (L)
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 130 }}>
          {data.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, color: T.muted }}>{d}</span>
              <div style={{ width: "100%", height: `${(d / max) * 100}px`, background: i === data.length - 1 ? T.sageDark : T.sageLight, borderRadius: "5px 5px 0 0", transition: "height 1s ease" }}/>
              <span style={{ fontSize: 10, color: T.muted }}>W{i + 1}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="info" size={14} color={T.sageDark}/> Efficiency Recommendations
        </div>
        {["Tyre pressure 2 psi low — inflate to improve efficiency by ~1.5%", "3 instances of rapid acceleration detected last week", "Avg speed 63 km/h — optimal range for your engine is 60–80 km/h", "Air filter service due — estimated 4% fuel loss currently"].map((tip, i, arr) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "flex-start" }}>
            <Icon name="chevronRight" size={13} color={T.sageDark} style={{ marginTop: 2, flexShrink: 0 }}/>
            <span style={{ fontSize: 13, color: T.mid }}>{tip}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─── DASHCAM & INSURANCE ──────────────────────────────────────────────────────
const DashcamView = ({ showNotif }) => {
  const [shareTarget, setShareTarget] = useState(null);
  const footage = [
    { id: 1, date: "Apr 02 08:14", label: "Morning Commute", dur: "22 min", incident: false },
    { id: 2, date: "Mar 30 18:45", label: "Near-Miss Event", dur: "0:08 clip", incident: true },
    { id: 3, date: "Mar 28 11:20", label: "Highway Run", dur: "1h 10m", incident: false },
    { id: 4, date: "Mar 25 09:00", label: "City Drive", dur: "45 min", incident: false },
  ];
  const claims = [
    { id: "CLM-2024-001", date: "Mar 30", type: "Collision", status: "processing", pct: 60 },
    { id: "CLM-2023-004", date: "Nov 12", type: "Theft Attempt", status: "approved", pct: 100 },
  ];
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: T.dark }}>Dashcam & Insurance</h2>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: T.muted }}>Footage storage and tamper-proof claim evidence</p>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="video" size={14} color={T.sageDark}/> Recorded Footage
          </div>
          {footage.map((f, i) => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < footage.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 48, height: 36, background: f.incident ? T.dangerBg : T.sagePale, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="video" size={16} color={f.incident ? T.danger : T.sageDark}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: T.dark }}>{f.label}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{f.date} · {f.dur}</div>
              </div>
              {f.incident && <Badge color={T.danger}>Incident</Badge>}
              <div style={{ display: "flex", gap: 6 }}>
                <Btn variant="ghost" style={{ padding: "5px 10px", fontSize: 12 }} icon="activity" onClick={() => showNotif("Playing…")}>Play</Btn>
                <Btn variant="secondary" style={{ padding: "5px 10px", fontSize: 12 }} icon="upload" onClick={() => setShareTarget(f)}>Share</Btn>
              </div>
            </div>
          ))}
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card style={{ padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="shield" size={14} color={T.sageDark}/> Insurance Claims
            </div>
            {claims.map((c, i) => (
              <div key={c.id} style={{ padding: "11px 0", borderBottom: i < claims.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: T.dark, fontFamily: "monospace" }}>{c.id}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{c.type} · {c.date}</div>
                  </div>
                  <Badge color={c.status === "approved" ? T.success : T.warn}>{c.status === "approved" ? "Approved" : "In Review"}</Badge>
                </div>
                <ProgressBar value={c.pct} color={c.status === "approved" ? T.success : T.warn}/>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{c.pct}% complete</div>
              </div>
            ))}
            <Btn style={{ width: "100%", justifyContent: "center", marginTop: 14 }} icon="plus" onClick={() => showNotif("Claim form opened")}>File New Claim</Btn>
          </Card>
          <Card style={{ padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="upload" size={14} color={T.sageDark}/> Evidence Bundle
            </div>
            <p style={{ fontSize: 12, color: T.muted, margin: "0 0 12px" }}>Generate a tamper-proof package including footage, OBD data, GPS track and driving score.</p>
            {["Dashcam footage (incident clip)", "GPS route data", "OBD diagnostics snapshot", "Driving score report"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: T.dark, padding: "4px 0" }}>
                <Icon name="check" size={12} color={T.success}/> {item}
              </div>
            ))}
            <Btn style={{ width: "100%", justifyContent: "center", marginTop: 14 }} icon="shield" onClick={() => showNotif("Evidence bundle generated and sent")}>Generate & Send Bundle</Btn>
          </Card>
        </div>
      </div>
      <Modal open={!!shareTarget} onClose={() => setShareTarget(null)} title="Share Footage" width={400}>
        {shareTarget && (
          <div>
            <div style={{ fontSize: 13, color: T.muted, marginBottom: 16 }}>"{shareTarget.label}" · {shareTarget.date}</div>
            {[["Insurance Company", "layers"], ["Police / Authority", "shield"], ["Mechanic / Workshop", "settings"], ["Download (Personal)", "download"]].map(([label, icon]) => (
              <Btn key={label} variant="ghost" icon={icon} style={{ width: "100%", justifyContent: "flex-start", marginBottom: 8 }}
                onClick={() => { setShareTarget(null); showNotif(`Shared with: ${label}`); }}>{label}</Btn>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function BeaconApp() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [selectedId, setSelectedId] = useState("v1");
  const [tab, setTab] = useState("fleet");
  const [sidebar, setSidebar] = useState(true);
  const [notif, setNotif] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);

  const vehicle = vehicles.find(v => v.id === selectedId) || vehicles[0];

  // Live vitals
  useEffect(() => {
    const id = setInterval(() => {
      setVehicles(vs => vs.map(v =>
        v.status !== "connected" ? v : {
          ...v,
          vitals: {
            ...v.vitals,
            rpm: Math.max(700, Math.min(6000, v.vitals.rpm + (Math.random() - 0.5) * 180)),
            speed: Math.max(0, Math.min(120, v.vitals.speed + (Math.random() - 0.5) * 3)),
            engineTemp: Math.max(70, Math.min(110, v.vitals.engineTemp + (Math.random() - 0.45) * 0.8)),
          }
        }
      ));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const showNotif = useCallback((msg, type = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3200);
  }, []);

  const addVehicle = (v) => { setVehicles(vs => [...vs, v]); setAddOpen(false); setSelectedId(v.id); setTab("dash"); showNotif(`${v.nickname} added to fleet`); };
  const removeVehicle = () => { setVehicles(vs => vs.filter(v => v.id !== removeTarget.id)); setSelectedId(vehicles.find(v => v.id !== removeTarget.id)?.id || ""); setRemoveTarget(null); setTab("fleet"); showNotif(`${removeTarget.nickname} removed from fleet`); };

  const viewProps = { vehicle, setTab, showNotif, vehicles, onSelect: setSelectedId, onAddVehicle: () => setAddOpen(true), onRemove: setRemoveTarget };
  const views = { fleet: FleetView, dash: DashView, diag: DiagView, driving: DrivingView, engine: EngineView, mfr: MfrView, fuel: FuelView, dashcam: DashcamView };
  const View = views[tab] || DashView;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.sageBg}; font-family: 'Sora', 'Segoe UI', sans-serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.sageLight}; border-radius: 3px; }
        @keyframes toastIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes modalIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes scan { from { width:0; } to { width:100%; } }
        button { font-family: 'Sora', 'Segoe UI', sans-serif; }
        input { font-family: 'Sora', 'Segoe UI', sans-serif; }
        input:focus { outline: 2px solid ${T.sageDark}; outline-offset: 1px; }
      `}</style>

      <Toast notif={notif}/>

      {/* Add vehicle modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Vehicle to Fleet" width={560}>
        <AddVehicleWizard onAdd={addVehicle} onClose={() => setAddOpen(false)}/>
      </Modal>

      {/* Remove vehicle modal */}
      <Modal open={!!removeTarget} onClose={() => setRemoveTarget(null)} title="Confirm Removal" width={420}>
        {removeTarget && <RemoveVehicleModal vehicle={removeTarget} onConfirm={removeVehicle} onClose={() => setRemoveTarget(null)}/>}
      </Modal>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: sidebar ? 234 : 58, background: "#1a2820", display: "flex", flexDirection: "column", transition: "width 0.28s ease", overflow: "hidden", flexShrink: 0, zIndex: 10 }}>
          {/* Logo */}
          <div style={{ padding: sidebar ? "18px 14px 14px" : "18px 10px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: sidebar ? "space-between" : "center" }}>
            {sidebar ? <BeaconWordmark dark size={0.78}/> : (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <text x="2" y="22" fontFamily="Georgia,'Times New Roman',serif" fontWeight="700" fontSize="20" fill="#e8ede4">B</text>
                {/* Tilted wifi arcs, upper-right of B */}
                <circle cx="19" cy="8" r="1.8" fill="#8aae90"/>
                <path d="M18 3.5 A5.5 5.5 0 0 1 23.5 9" stroke="#8aae90" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <path d="M16.5 1 A9.5 9.5 0 0 1 27 9.5" stroke="#8aae90" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6"/>
              </svg>
            )}
            <button onClick={() => setSidebar(s => !s)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 4, display: "flex" }}>
              <Icon name={sidebar ? "chevronLeft" : "chevronRight"} size={16} color="rgba(255,255,255,0.4)"/>
            </button>
          </div>

          {/* Nav */}
          <div style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
            {NAV.map(n => {
              const active = tab === n.id;
              return (
                <div key={n.id} onClick={() => setTab(n.id)} title={!sidebar ? n.label : undefined}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: sidebar ? "10px 14px" : "10px 0", justifyContent: sidebar ? "flex-start" : "center", margin: "1px 8px", borderRadius: 9, cursor: "pointer", background: active ? "rgba(138,158,128,0.18)" : "transparent", borderLeft: active ? `3px solid ${T.sage}` : "3px solid transparent", color: active ? T.sageLight : "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: active ? 700 : 400, transition: "all 0.16s", whiteSpace: "nowrap", overflow: "hidden" }}>
                  <Icon name={n.icon} size={15} color={active ? T.sageLight : "rgba(255,255,255,0.45)"}/>
                  {sidebar && n.label}
                </div>
              );
            })}
          </div>

          {/* Bottom */}
          <div style={{ padding: sidebar ? "10px 14px 16px" : "10px 0 16px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", alignItems: sidebar ? "flex-start" : "center", gap: 8 }}>
            <div title={!sidebar ? "Settings" : undefined} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
              <Icon name="settings" size={15} color="rgba(255,255,255,0.3)"/>
              {sidebar && "Settings"}
            </div>
            {sidebar && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>Beacon Platform v2.1.0</div>}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Topbar */}
          <div style={{ background: T.cream, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", height: 58, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.muted }}>
              <span>Car Health Monitoring</span>
              <Icon name="chevronRight" size={13} color={T.muted}/>
              <span style={{ fontWeight: 700, color: T.dark }}>{NAV.find(n => n.id === tab)?.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Vehicle selector (hidden on fleet tab) */}
              {tab !== "fleet" && (
                <VehicleSelector vehicles={vehicles} selected={selectedId} onSelect={(id) => { setSelectedId(id); }} onAdd={() => setAddOpen(true)}/>
              )}
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Icon name="info" size={17} color={T.muted}/>
              </button>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.sageDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="user" size={15} color="#fff"/>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: 22 }}>
            <View {...viewProps}/>
          </div>
        </div>
      </div>
    </>
  );
}
