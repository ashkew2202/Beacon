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
  indigo:     "#4a4a80",
  indigoBg:   "#f0f0f8",
  purple:     "#6a4a80",
  purpleBg:   "#f4f0f8",
};

// ─── SVG Icon system ──────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor", strokeWidth = 1.6 }) => {
  const s = { width: size, height: size, flexShrink: 0 };
  const paths = {
    activity:       <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    alert:          <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    battery:        <><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><line x1="6" y1="12" x2="10" y2="12"/></>,
    car:            <><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    check:          <><polyline points="20 6 9 17 4 12"/></>,
    "check-circle": <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    chevronDown:    <><polyline points="6 9 12 15 18 9"/></>,
    chevronRight:   <><polyline points="9 18 15 12 9 6"/></>,
    chevronLeft:    <><polyline points="15 18 9 12 15 6"/></>,
    clipboard:      <><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></>,
    cpu:            <><rect x="9" y="9" width="6" height="6"/><path d="M15 9V5h-4M9 9V5h4M15 15v4h-4M9 15v4h4M5 9H1v4M5 15H1v4M19 9h4v4M19 15h4v4"/></>,
    droplet:        <><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></>,
    download:       <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    edit:           <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    file:           <><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></>,
    gauge:          <><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6v2M12 16v2M6 12H4M20 12h-2M7.76 7.76l1.42 1.42M14.82 14.82l1.42 1.42M7.76 16.24l1.42-1.42M14.82 9.18l1.42-1.42"/><circle cx="12" cy="12" r="2"/></>,
    heart:          <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
    info:           <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    layers:         <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    link:           <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
    loader:         <><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></>,
    map:            <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    menu:           <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    minus:          <><line x1="5" y1="12" x2="19" y2="12"/></>,
    plus:           <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    plug:           <><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8H6l2 5h8l2-5z"/><path d="M12 17a5 5 0 005-5v-2H7v2a5 5 0 005 5z"/></>,
    refresh:        <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></>,
    settings:       <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    shield:         <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    thermometer:    <><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></>,
    trash:          <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
    truck:          <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    upload:         <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    user:           <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    users:          <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    video:          <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
    wifi:           <><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></>,
    "x":            <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    "x-circle":     <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    zap:            <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    list:           <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    grid:           <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    signal:         <><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55"/><path d="M5 12.55a10.94 10.94 0 015.17-2.39"/><path d="M10.71 5.05A16 16 0 0122.56 9"/><path d="M1.42 9a15.91 15.91 0 014.7-2.88"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></>,
    "bar-chart":    <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    key:            <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>,
    hash:           <><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></>,
    "cpu-chip":     <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></>,
    "hard-drive":   <><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/><circle cx="16" cy="16" r="1"/><circle cx="8" cy="16" r="1"/></>,
    lock:           <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    unlock:         <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 019.9-1"/></>,
    "send":         <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    "clock":        <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    "trending-up":  <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    "percent":      <><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    "bell":         <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    "eye":          <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    "eye-off":      <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
    "package":      <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    "building":     <><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></>,
    "toggle-left":  <><rect x="1" y="5" width="22" height="14" rx="7" ry="7"/><circle cx="8" cy="12" r="3"/></>,
    "toggle-right": <><rect x="1" y="5" width="22" height="14" rx="7" ry="7"/><circle cx="16" cy="12" r="3"/></>,
  };
  return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ─── Beacon Logo ──────────────────────────────────────────────────────────────
const BeaconWordmark = ({ dark = false, size = 1 }) => {
  const fg = dark ? "#e8ede4" : "#4a5a40";
  const accent = dark ? "#8aae90" : "#6b8060";
  const ox = 117, oy = 18;
  return (
    <svg width={148 * size} height={38 * size} viewBox="0 0 148 38" fill="none">
      <text x="4" y="30" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="26" fill={fg} letterSpacing="-0.3">Beacon</text>
      <circle cx={ox} cy={oy} r="2" fill={accent}/>
      <path d={`M${ox - 1} ${oy - 5.5} A6 6 0 0 1 ${ox + 5.5} ${oy + 1}`} stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d={`M${ox - 2} ${oy - 10} A11 11 0 0 1 ${ox + 10} ${oy + 2}`} stroke={accent} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.65"/>
    </svg>
  );
};

// ─── OBD Fields ───────────────────────────────────────────────────────────────
const OBD_FIELDS = [
  { id: "vin", label: "VIN (Vehicle Identification Number)", technical: "ISO 3779 — 17-char chassis identifier broadcast on PID 0x02", placeholder: "e.g. MA3FJEB1S00123456", pattern: /^[A-HJ-NPR-Z0-9]{17}$/i, hint: "17 characters — stamped on your dashboard near the windshield or door jamb", maxLen: 17 },
  { id: "obdDeviceId", label: "OBD-II Adapter Serial / Device ID", technical: "Unique hardware serial printed on ELM327 / STN-series adapter", placeholder: "e.g. OBD-A3F2-9C11", pattern: /.{4,}/, hint: "Found on the sticker on your OBD-II dongle (plugs under the steering column)", maxLen: 32 },
  { id: "ecuId", label: "ECU Module ID (CAN Bus Address)", technical: "11-bit or 29-bit CAN arbitration ID — typically 0x7E8 for engine ECU", placeholder: "e.g. 0x7E8", pattern: /^(0x[0-9A-Fa-f]{1,4}|[0-9]{1,4})$/, hint: "The CAN address of your primary ECU — leave as default 0x7E8 if unsure", maxLen: 6 },
  { id: "iccid", label: "Beacon Device ICCID (SIM)", technical: "19–20 digit ICCID of the embedded SIM in the Beacon telematics unit", placeholder: "e.g. 89910000000000000000", pattern: /^[0-9]{19,20}$/, hint: "Printed on the Beacon hardware unit or found in the Beacon activation email", maxLen: 20 },
];

// ─── Mock data ────────────────────────────────────────────────────────────────
const INITIAL_VEHICLES = [
  { id: "v1", nickname: "Swift — Daily", make: "Maruti Suzuki", model: "Swift VXi", year: 2022, color: "#e8e0d0", registration: "RJ-15-AB-1234", status: "connected", vin: "MA3FJEB1S00123456", obdDeviceId: "OBD-A3F2-9C11", ecuId: "0x7E8", iccid: "89910000001234567890", vitals: { engineTemp: 87, oilPressure: 42, batteryV: 12.6, fuelLevel: 68, rpm: 2400, speed: 62 }, dtcCodes: ["P0420", "P0171"], odometer: 48321, health: 74, trips: 127, fuelEff: 17.8 },
  { id: "v2", nickname: "Innova — Family", make: "Toyota", model: "Innova Crysta", year: 2021, color: "#c8d8c0", registration: "DL-3C-AB-5678", status: "idle", vin: "MBJFB8BJ3M2000001", obdDeviceId: "OBD-B8C1-2E40", ecuId: "0x7E8", iccid: "89910000009876543210", vitals: { engineTemp: 72, oilPressure: 48, batteryV: 12.9, fuelLevel: 91, rpm: 0, speed: 0 }, dtcCodes: [], odometer: 32100, health: 96, trips: 89, fuelEff: 12.4 },
];

// ─── Insurer access requests (shared state) ───────────────────────────────────
const INITIAL_ACCESS_REQUESTS = [
  { id: "req1", insurerId: "ins1", insurerName: "BharatShield Insurance", requestedAt: "2026-04-01", status: "pending", dataFields: ["driving_score", "trip_history", "dtc_codes", "odometer"], vehicles: ["v1"], purpose: "Premium recalculation for policy renewal", plan: "pro", expiresIn: "30 days" },
  { id: "req2", insurerId: "ins2", insurerName: "SecureDrive Co.", requestedAt: "2026-03-28", status: "approved", dataFields: ["driving_score", "odometer"], vehicles: ["v1", "v2"], purpose: "New policy onboarding — telematics discount", plan: "basic", expiresIn: "90 days", approvedAt: "2026-03-29" },
];

const INSURERS = [
  { id: "ins1", name: "BharatShield Insurance", logo: "BS", tier: "pro", customers: 142, claimsProcessed: 38, avgScore: 81, revenue: "₹2.4L/mo", status: "active", joined: "Jan 2026" },
  { id: "ins2", name: "SecureDrive Co.", logo: "SD", tier: "basic", customers: 67, claimsProcessed: 12, avgScore: 78, revenue: "₹0.9L/mo", status: "active", joined: "Mar 2026" },
  { id: "ins3", name: "SafeRoad Analytics", logo: "SR", tier: "enterprise", customers: 320, claimsProcessed: 94, avgScore: 83, revenue: "₹6.1L/mo", status: "active", joined: "Nov 2025" },
];

const DATA_FIELD_LABELS = {
  driving_score:   { label: "Driving Score", icon: "bar-chart", risk: "low" },
  trip_history:    { label: "Trip History", icon: "map", risk: "medium" },
  dtc_codes:       { label: "Fault Codes (DTC)", icon: "cpu", risk: "low" },
  odometer:        { label: "Odometer Reading", icon: "gauge", risk: "low" },
  live_vitals:     { label: "Live Vehicle Vitals", icon: "activity", risk: "high" },
  fuel_data:       { label: "Fuel Efficiency Data", icon: "droplet", risk: "low" },
  location_data:   { label: "GPS / Location Data", icon: "map", risk: "high" },
  dashcam_footage: { label: "Dashcam Footage", icon: "video", risk: "high" },
  engine_health:   { label: "Engine Health Report", icon: "heart", risk: "medium" },
  maintenance_log: { label: "Maintenance Records", icon: "clipboard", risk: "low" },
};

const NAV_CUSTOMER = [
  { id: "fleet",    label: "Fleet Overview",      icon: "grid" },
  { id: "dash",     label: "Dashboard",            icon: "gauge" },
  { id: "diag",     label: "Vehicle Diagnosis",    icon: "cpu" },
  { id: "driving",  label: "Driving Record",       icon: "map" },
  { id: "engine",   label: "Engine Health",        icon: "heart" },
  { id: "mfr",      label: "Manufacturer",         icon: "clipboard" },
  { id: "fuel",     label: "Fuel Efficiency",      icon: "droplet" },
  { id: "dashcam",  label: "Dashcam & Insurance",  icon: "video" },
  { id: "privacy",  label: "Data & Privacy",       icon: "shield" },
];

const NAV_INSURER = [
  { id: "ins_overview",  label: "Overview",          icon: "grid" },
  { id: "ins_customers", label: "Customers",         icon: "users" },
  { id: "ins_requests",  label: "Access Requests",   icon: "send" },
  { id: "ins_claims",    label: "Claims Centre",     icon: "shield" },
  { id: "ins_analytics", label: "Risk Analytics",    icon: "bar-chart" },
  { id: "ins_pricing",   label: "UBI Pricing",       icon: "percent" },
];

// ─── Primitives ───────────────────────────────────────────────────────────────
const Badge = ({ children, color = T.sageDark, bg }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bg || color + "18", color, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 700, letterSpacing: 0.2, whiteSpace: "nowrap" }}>{children}</span>
);

const Btn = ({ children, variant = "primary", onClick, disabled, style = {}, icon }) => {
  const base = { display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", border: "none", transition: "all 0.15s", opacity: disabled ? 0.5 : 1, fontFamily: "inherit" };
  const variants = {
    primary:   { background: T.sageDark, color: "#fff" },
    secondary: { background: T.sagePale, color: T.sageDark, border: `1.5px solid ${T.border}` },
    danger:    { background: T.danger, color: "#fff" },
    ghost:     { background: "transparent", color: T.sageDark, border: `1.5px solid ${T.borderMid}` },
    indigo:    { background: T.indigo, color: "#fff" },
    success:   { background: T.success, color: "#fff" },
  };
  return <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick} disabled={disabled}>{icon && <Icon name={icon} size={14} color="currentColor"/>}{children}</button>;
};

const Card = ({ children, style = {}, onClick }) => (
  <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", ...style }} onClick={onClick}>{children}</div>
);

const ProgressBar = ({ value, max = 100, color = T.sageDark, height = 6 }) => (
  <div style={{ height, background: T.sagePale, borderRadius: height, overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${Math.min((value / max) * 100, 100)}%`, background: color, borderRadius: height, transition: "width 0.8s ease" }}/>
  </div>
);

const StatBox = ({ label, value, unit, icon, color = T.sageDark, sub }) => (
  <Card style={{ padding: "14px 16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
      <span style={{ fontSize: 11, color: T.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</span>
      <Icon name={icon} size={15} color={color}/>
    </div>
    <div style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1 }}>
      {value}<span style={{ fontSize: 13, fontWeight: 400, color: T.muted }}>{unit && ` ${unit}`}</span>
    </div>
    {sub && <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{sub}</div>}
  </Card>
);

const HealthRing = ({ score, size = 56 }) => {
  const r = (size - 10) / 2, circ = 2 * Math.PI * r;
  const color = score >= 80 ? T.success : score >= 55 ? T.warn : T.danger;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.sagePale} strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: "stroke-dasharray 1s ease" }}/>
      <text x={size/2} y={size/2 + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{score}</text>
    </svg>
  );
};

const ArcGauge = ({ value, max, unit, warnAt, critAt }) => {
  const pct = Math.min(value / max, 1);
  const color = value >= (critAt || Infinity) ? T.danger : value >= (warnAt || Infinity) ? T.warn : T.success;
  const cx = 50, cy = 52, r = 38;
  const toXY = (deg) => ({ x: cx + r * Math.cos((deg * Math.PI) / 180), y: cy + r * Math.sin((deg * Math.PI) / 180) });
  const start = toXY(-140), end = toXY(-140 + pct * 280), large = pct > 0.5 ? 1 : 0;
  return (
    <svg viewBox="0 0 100 72" style={{ width: "100%", maxWidth: 100 }}>
      <path d={`M ${toXY(-140).x} ${toXY(-140).y} A ${r} ${r} 0 1 1 ${toXY(140).x} ${toXY(140).y}`} stroke={T.sagePale} strokeWidth="5" fill="none" strokeLinecap="round"/>
      {pct > 0.01 && <path d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`} stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" style={{ transition: "all 0.6s ease" }}/>}
      <text x="50" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{typeof value === "number" ? (value % 1 ? value.toFixed(1) : value) : value}</text>
      <text x="50" y="62" textAnchor="middle" fontSize="8" fill={T.muted}>{unit}</text>
    </svg>
  );
};

const Toast = ({ notif }) => notif ? (
  <div style={{ position: "fixed", top: 20, right: 24, zIndex: 9999, background: notif.type === "error" ? T.danger : T.sageDark, color: "#fff", borderRadius: 12, padding: "11px 18px", fontSize: 13, fontWeight: 600, boxShadow: "0 6px 24px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 8, animation: "toastIn 0.3s ease" }}>
    <Icon name={notif.type === "error" ? "x-circle" : "check-circle"} size={15} color="#fff"/>
    {notif.msg}
  </div>
) : null;

const Modal = ({ open, onClose, title, children, width = 520 }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,40,32,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: T.card, borderRadius: 18, width: "100%", maxWidth: width, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "modalIn 0.22s ease" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 0" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: T.dark }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, padding: 4 }}><Icon name="x" size={18} color={T.muted}/></button>
        </div>
        <div style={{ padding: "16px 24px 24px" }}>{children}</div>
      </div>
    </div>
  );
};

const VehicleSelector = ({ vehicles, selected, onSelect, onAdd }) => {
  const [open, setOpen] = useState(false);
  const v = vehicles.find(v => v.id === selected) || vehicles[0];
  const statusColor = (s) => s === "connected" ? T.success : s === "idle" ? T.warn : T.danger;
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: T.sagePale, border: `1.5px solid ${T.borderMid}`, borderRadius: 11, padding: "7px 12px", cursor: "pointer", userSelect: "none" }} onClick={() => setOpen(o => !o)}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor(v.status), flexShrink: 0 }}/>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.dark }}>{v.nickname}</div>
          <div style={{ fontSize: 10, color: T.muted }}>{v.registration}</div>
        </div>
        <Icon name="chevronDown" size={14} color={T.muted}/>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: T.card, borderRadius: 13, border: `1px solid ${T.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.14)", zIndex: 200, minWidth: 240, overflow: "hidden" }}>
          {vehicles.map(veh => (
            <div key={veh.id} onClick={() => { onSelect(veh.id); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", cursor: "pointer", background: veh.id === selected ? T.sagePale : "transparent", borderBottom: `1px solid ${T.border}` }}>
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

// ─── Add Vehicle Wizard ───────────────────────────────────────────────────────
const AddVehicleWizard = ({ onAdd, onClose }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ nickname: "", make: "", model: "", year: "", registration: "", vin: "", obdDeviceId: "", ecuId: "0x7E8", iccid: "" });
  const [testing, setTesting] = useState(false);
  const [testOk, setTestOk] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const steps = ["Vehicle Info", "Hardware IDs", "Connection Test", "Confirm"];
  const doTest = () => { setTesting(true); setTestOk(false); setTimeout(() => { setTesting(false); setTestOk(true); }, 2200); };
  const submit = () => onAdd({ id: "v" + Date.now(), ...form, year: parseInt(form.year), status: "connected", vitals: { engineTemp: 82, oilPressure: 40, batteryV: 12.5, fuelLevel: 75, rpm: 0, speed: 0 }, dtcCodes: [], odometer: 0, health: 95, trips: 0, fuelEff: 0, color: "#d0dcd8" });
  const inputStyle = (err) => ({ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1.5px solid ${err ? T.danger : T.borderMid}`, fontSize: 13, color: T.dark, fontFamily: "inherit", background: "#fafaf8", outline: "none", boxSizing: "border-box" });
  const labelStyle = { fontSize: 12, fontWeight: 600, color: T.mid, marginBottom: 4, display: "block" };
  return (
    <div>
      <div style={{ display: "flex", gap: 0, marginBottom: 24, background: T.sagePale, borderRadius: 10, padding: 4 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center", padding: "7px 4px", borderRadius: 8, fontSize: 12, fontWeight: i === step ? 700 : 500, background: i === step ? T.card : "transparent", color: i <= step ? T.sageDark : T.muted, boxShadow: i === step ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
            {i < step ? <Icon name="check" size={12} color={T.success}/> : `${i + 1}.`} {s}
          </div>
        ))}
      </div>
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={labelStyle}>Nickname / Label</label><input style={inputStyle()} value={form.nickname} onChange={e => set("nickname", e.target.value)} placeholder="e.g. Office Car"/></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 10 }}>
            <div><label style={labelStyle}>Make</label><input style={inputStyle()} value={form.make} onChange={e => set("make", e.target.value)} placeholder="Maruti Suzuki"/></div>
            <div><label style={labelStyle}>Model</label><input style={inputStyle()} value={form.model} onChange={e => set("model", e.target.value)} placeholder="Swift VXi"/></div>
            <div><label style={labelStyle}>Year</label><input style={inputStyle()} value={form.year} onChange={e => set("year", e.target.value)} placeholder="2022" type="number"/></div>
          </div>
          <div><label style={labelStyle}>Registration</label><input style={inputStyle()} value={form.registration} onChange={e => set("registration", e.target.value)} placeholder="RJ-15-AB-1234"/></div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}><Btn onClick={() => setStep(1)} disabled={!form.nickname || !form.make || !form.model || !form.year}>Next — Hardware IDs</Btn></div>
        </div>
      )}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: "10px 14px", background: T.blueBg, borderRadius: 10, fontSize: 12, color: T.blue, display: "flex", gap: 8 }}>
            <Icon name="info" size={14} color={T.blue}/> These identifiers pair your physical vehicle and Beacon hardware to this dashboard.
          </div>
          {OBD_FIELDS.map(f => {
            const val = form[f.id]; const valid = val ? f.pattern.test(val) : true;
            return (
              <div key={f.id}>
                <label style={labelStyle}>{f.label}</label>
                <input style={inputStyle(!valid && val)} value={val} onChange={e => set(f.id, e.target.value.slice(0, f.maxLen))} placeholder={f.placeholder} maxLength={f.maxLen}/>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{f.hint}</div>
                {!valid && val && <div style={{ fontSize: 11, color: T.danger, marginTop: 2 }}>Invalid format</div>}
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Btn variant="ghost" onClick={() => setStep(0)} icon="chevronLeft">Back</Btn>
            <Btn onClick={() => setStep(2)} disabled={!form.vin || !form.obdDeviceId} icon="wifi">Test Connection</Btn>
          </div>
        </div>
      )}
      {step === 2 && (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.dark, marginBottom: 6 }}>Connection Test</div>
          <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>Verifying Beacon hardware can communicate with your vehicle's ECU</div>
          {!testing && !testOk && <Btn onClick={doTest} icon="wifi" style={{ margin: "0 auto" }}>Run Connection Test</Btn>}
          {testing && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ animation: "spin 1.2s linear infinite" }}><Icon name="loader" size={36} color={T.sageDark}/></div>
              <div style={{ fontSize: 13, color: T.muted }}>Pinging OBD adapter and reading ECU headers…</div>
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
      {step === 3 && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[["Vehicle", `${form.year} ${form.make} ${form.model}`], ["Label", form.nickname], ["Registration", form.registration], ["VIN", form.vin], ["OBD Adapter", form.obdDeviceId], ["ECU Address", form.ecuId]].map(([k, v]) => (
              <div key={k} style={{ padding: "10px 12px", background: T.sagePale, borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.muted, textTransform: "uppercase", marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.dark }}>{v}</div>
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

const RemoveVehicleModal = ({ vehicle, onConfirm, onClose }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.dangerBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><Icon name="trash" size={22} color={T.danger}/></div>
    <div style={{ fontSize: 15, fontWeight: 700, color: T.dark, marginBottom: 6 }}>Remove Vehicle</div>
    <div style={{ fontSize: 13, color: T.muted, marginBottom: 20 }}>Remove <strong>{vehicle.nickname}</strong> ({vehicle.registration}) from your fleet?</div>
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
      <Btn variant="danger" onClick={onConfirm} icon="trash">Remove Vehicle</Btn>
    </div>
  </div>
);

// ─── CUSTOMER VIEWS ───────────────────────────────────────────────────────────

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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <StatBox label="Total Vehicles" value={vehicles.length} icon="truck" color={T.sageDark}/>
        <StatBox label="Online Now" value={connected} icon="wifi" color={T.success}/>
        <StatBox label="Active DTC Codes" value={vehicles.reduce((a, v) => a + v.dtcCodes.length, 0)} icon="alert" color={T.warn}/>
        <StatBox label="Fleet Trips" value={totalTrips} icon="map" color={T.sageDark}/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {vehicles.map(v => (
          <Card key={v.id} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 0 }}>
              <div style={{ width: 5, background: v.status === "connected" ? T.success : T.warn }}/>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <HealthRing score={v.health} size={52}/>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: T.dark }}>{v.nickname}</span>
                      <Badge color={v.status === "connected" ? T.success : T.warn}>{v.status === "connected" ? "Connected" : "Idle"}</Badge>
                      {v.dtcCodes.length > 0 && <Badge color={T.danger}>{v.dtcCodes.length} DTC</Badge>}
                    </div>
                    <div style={{ fontSize: 12, color: T.muted }}>{v.year} {v.make} {v.model} · {v.registration}</div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
                      {[{ label: "Odometer", value: v.odometer.toLocaleString() + " km", icon: "gauge" }, { label: "Fuel", value: v.vitals.fuelLevel + "%", icon: "droplet" }, { label: "Efficiency", value: v.fuelEff ? v.fuelEff + " km/L" : "—", icon: "bar-chart" }, { label: "Trips", value: v.trips, icon: "map" }].map(s => (
                        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <Icon name={s.icon} size={12} color={T.muted}/>
                          <span style={{ fontSize: 12, color: T.muted }}>{s.label}:</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: T.dark }}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                    <Btn variant="secondary" icon="gauge" onClick={() => { onSelect(v.id); setTab("dash"); }}>Open Dashboard</Btn>
                    <Btn variant="ghost" icon="trash" onClick={() => onRemove(v)} style={{ color: T.danger, borderColor: T.danger + "40" }}>Remove</Btn>
                  </div>
                </div>
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

const DashView = ({ vehicle: v, setTab }) => (
  <div>
    <div style={{ background: `linear-gradient(130deg, ${T.sageDark} 0%, #3a5040 100%)`, borderRadius: 18, padding: "24px 28px", marginBottom: 20, color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, opacity: 0.6, marginBottom: 4 }}>Active Vehicle</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{v.nickname}</div>
          <div style={{ opacity: 0.65, fontSize: 13, marginTop: 2 }}>{v.year} {v.make} {v.model} · {v.registration}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
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
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr", gap: 12, marginBottom: 18 }}>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Icon name="activity" size={13} color={T.mid}/> Live RPM</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: T.sageDark }}>{Math.round(v.vitals.rpm).toLocaleString()}</div>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 10 }}>revolutions / min</div>
        <ProgressBar value={v.vitals.rpm} max={6000} color={v.vitals.rpm > 5000 ? T.danger : T.sageDark}/>
      </Card>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Icon name="gauge" size={13} color={T.mid}/> Speed</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: T.sageDark }}>{Math.round(v.vitals.speed)}</div>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 10 }}>km / h</div>
        <ProgressBar value={v.vitals.speed} max={120} color={T.success}/>
      </Card>
      <Card style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Icon name="alert" size={13} color={T.warn}/> Active DTC Codes</div>
        {v.dtcCodes.length === 0 ? (
          <div style={{ fontSize: 13, color: T.success, display: "flex", alignItems: "center", gap: 6, padding: "8px 0" }}><Icon name="check-circle" size={14} color={T.success}/> No fault codes detected</div>
        ) : v.dtcCodes.map(code => (
          <div key={code} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
            <code style={{ background: T.warnBg, color: T.warn, padding: "2px 7px", borderRadius: 5, fontSize: 12, fontWeight: 700 }}>{code}</code>
            <span style={{ fontSize: 12, color: T.mid }}>{code === "P0420" ? "Catalyst efficiency low" : "System too lean (Bank 1)"}</span>
          </div>
        ))}
        <button style={{ marginTop: 10, background: "none", border: "none", color: T.sageDark, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }} onClick={() => setTab("diag")}>Full diagnosis <Icon name="chevronRight" size={12} color={T.sageDark}/></button>
      </Card>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
      {[{ tab: "diag", label: "Diagnosis", icon: "cpu", desc: "OBD scan" }, { tab: "driving", label: "Driving", icon: "map", desc: "Trip history" }, { tab: "engine", label: "Engine", icon: "heart", desc: "Parameters" }, { tab: "fuel", label: "Fuel", icon: "droplet", desc: "Efficiency" }, { tab: "dashcam", label: "Dashcam", icon: "video", desc: "Footage" }].map(n => (
        <Card key={n.tab} style={{ padding: "14px 12px", textAlign: "center", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }} onClick={() => setTab(n.tab)}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(74,96,80,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: T.sagePale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><Icon name={n.icon} size={17} color={T.sageDark}/></div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.dark }}>{n.label}</div>
          <div style={{ fontSize: 11, color: T.muted }}>{n.desc}</div>
        </Card>
      ))}
    </div>
  </div>
);

const DiagView = ({ vehicle: v, showNotif }) => {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const scan = () => { setScanning(true); setDone(false); setTimeout(() => { setScanning(false); setDone(true); showNotif("Scan complete"); }, 2600); };
  const checks = [
    { name: "Engine Control Module", ok: true }, { name: "Transmission Control", ok: true },
    { name: "ABS / Stability Control", ok: true }, { name: "Airbag / SRS", ok: true },
    { name: "Emission Control (CAT)", ok: false, note: "P0420 — Catalyst efficiency below threshold" },
    { name: "Fuel Delivery System", ok: false, note: "P0171 — Bank 1 running lean" },
    { name: "Power Steering (EPS)", ok: true }, { name: "HVAC Module", ok: true },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div><h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>Vehicle Diagnosis</h2><p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>OBD-II full ECU module scan</p></div>
        <Btn onClick={scan} disabled={scanning} icon={scanning ? "loader" : "cpu"}>{scanning ? "Scanning…" : "Run Full Scan"}</Btn>
      </div>
      {scanning && <Card style={{ padding: 28, textAlign: "center", marginBottom: 18 }}><div style={{ fontSize: 13, fontWeight: 600, color: T.sageDark, marginBottom: 14 }}>Querying ECU modules via {v.ecuId}…</div><div style={{ height: 6, background: T.sagePale, borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", background: T.sageDark, borderRadius: 4, animation: "scan 2.6s ease forwards" }}/></div></Card>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {checks.map(c => (
          <Card key={c.name} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: c.ok ? T.successBg : T.warnBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={c.ok ? "check-circle" : "alert"} size={18} color={c.ok ? T.success : T.warn}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.dark }}>{c.name}</div>
              {c.note ? <div style={{ fontSize: 11, color: T.warn, marginTop: 2 }}>{c.note}</div> : <div style={{ fontSize: 11, color: T.success }}>No faults detected</div>}
            </div>
            <Badge color={c.ok ? T.success : T.warn}>{c.ok ? "OK" : "FAULT"}</Badge>
          </Card>
        ))}
      </div>
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><Icon name="clipboard" size={15} color={T.sageDark}/> Service History</div>
        {[{ date: "2026-03-28", event: "Oil Change", shop: "AutoFix Garage", cost: 1200 }, { date: "2026-03-10", event: "Brake Inspection", shop: "QuickFix", cost: 500 }, { date: "2026-02-20", event: "Tyre Rotation", shop: "SpeedZone", cost: 800 }, { date: "2026-01-15", event: "Battery Replace", shop: "AutoFix Garage", cost: 3500 }].map((h, i, arr) => (
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
            <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
              <HealthRing score={t.score} size={46}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: T.dark }}>{t.from} — {t.to}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{t.date} · {t.dur} · {t.dist} km</div>
              </div>
              <div style={{ textAlign: "right", marginRight: 8 }}><div style={{ fontSize: 11, color: T.muted }}>Avg speed</div><div style={{ fontWeight: 700, color: T.sageDark }}>{t.avgSpd} km/h</div></div>
              <div style={{ textAlign: "right", marginRight: 8 }}><div style={{ fontSize: 11, color: T.muted }}>Fuel</div><div style={{ fontWeight: 700, color: T.sageDark }}>{t.fuel} L</div></div>
              <Icon name={expanded === t.id ? "chevronDown" : "chevronRight"} size={15} color={T.muted}/>
            </div>
            {expanded === t.id && (
              <div style={{ marginTop: 12, padding: 14, background: T.sagePale, borderRadius: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 10 }}>
                  {[["Hard Braking", "2 events"], ["Rapid Accel.", "3 events"], ["Speeding", "0 events"], ["Sharp Turns", "1 event"], ["Idle Time", "4 min"], ["Score", `${t.score}/100`]].map(([k, val]) => (
                    <div key={k} style={{ background: T.card, borderRadius: 8, padding: "8px 10px" }}><div style={{ fontSize: 10, color: T.muted, fontWeight: 600 }}>{k}</div><div style={{ fontSize: 13, fontWeight: 700, color: T.sageDark }}>{val}</div></div>
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

const EngineView = ({ vehicle: v }) => {
  const params = [
    { name: "Coolant Temperature", val: Math.round(v.vitals.engineTemp), unit: "°C", max: 130, safe: [70, 100], icon: "thermometer" },
    { name: "Oil Pressure", val: v.vitals.oilPressure, unit: "psi", max: 80, safe: [25, 65], icon: "droplet" },
    { name: "Engine RPM", val: Math.round(v.vitals.rpm), unit: "rpm", max: 6000, safe: [700, 4500], icon: "activity" },
    { name: "Throttle Position", val: 34, unit: "%", max: 100, safe: [0, 80], icon: "zap" },
    { name: "MAF Sensor", val: 18.4, unit: "g/s", max: 60, safe: [5, 45], icon: "wifi" },
    { name: "O2 Sensor B1", val: 0.72, unit: "V", max: 1, safe: [0.1, 0.9], icon: "signal" },
  ];
  const parts = [{ name: "Air Filter", life: 72, next: "~3,200 km" }, { name: "Spark Plugs", life: 55, next: "~8,500 km" }, { name: "Timing Belt", life: 88, next: "~22,000 km" }, { name: "Engine Oil", life: 40, next: "~1,200 km" }];
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: T.dark }}>Engine Health</h2>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: T.muted }}>Real-time ECU parameter monitoring</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
        {params.map(p => {
          const inSafe = p.val >= p.safe[0] && p.val <= p.safe[1];
          const color = inSafe ? T.success : p.val < p.safe[0] * 0.8 || p.val > p.safe[1] * 1.1 ? T.danger : T.warn;
          return (
            <Card key={p.name} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.mid }}>{p.name}</span>
                <Icon name={p.icon} size={14} color={color}/>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: T.sageDark, marginBottom: 8 }}>
                {typeof p.val === "number" && p.val % 1 ? p.val.toFixed(2) : p.val}<span style={{ fontSize: 13, fontWeight: 400, color: T.muted }}> {p.unit}</span>
              </div>
              <ProgressBar value={p.val} max={p.max} color={color}/>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: T.muted }}><span>0</span><span>Safe: {p.safe[0]}–{p.safe[1]} {p.unit}</span><span>{p.max}</span></div>
            </Card>
          );
        })}
      </div>
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><Icon name="settings" size={15} color={T.sageDark}/> Predictive Maintenance</div>
        {parts.map(p => (
          <div key={p.name} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontWeight: 600, fontSize: 13, color: T.dark }}>{p.name}</span><span style={{ fontSize: 11, color: T.muted }}>Next: {p.next}</span></div>
            <ProgressBar value={p.life} color={p.life > 60 ? T.success : p.life > 30 ? T.warn : T.danger}/>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{p.life}% remaining</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

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
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}><span style={{ fontWeight: 600, color: T.dark }}>{w.n}</span><span style={{ color: T.muted }}>Expires {w.exp}</span></div>
              <ProgressBar value={w.pct} color={T.success}/>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Documents</div>
          {["Registration Certificate", "Insurance Policy", "PUC Certificate", "Service Booklet"].map(d => (
            <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.dark }}><Icon name="file" size={13} color={T.muted}/> {d}</div>
              <Btn variant="ghost" icon="download" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => showNotif(`Downloading ${d}`)}>Download</Btn>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </div>
);

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
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Icon name="bar-chart" size={14} color={T.sageDark}/> Consumption — Last 8 Weeks (L)</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 130 }}>
          {data.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, color: T.muted }}>{d}</span>
              <div style={{ width: "100%", height: `${(d / max) * 100}px`, background: i === data.length - 1 ? T.sageDark : T.sageLight, borderRadius: "5px 5px 0 0" }}/>
              <span style={{ fontSize: 10, color: T.muted }}>W{i + 1}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><Icon name="info" size={14} color={T.sageDark}/> Efficiency Recommendations</div>
        {["Tyre pressure 2 psi low — inflate to improve efficiency by ~1.5%", "3 instances of rapid acceleration detected last week", "Avg speed 63 km/h — optimal range for your engine is 60–80 km/h", "Air filter service due — estimated 4% fuel loss currently"].map((tip, i, arr) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "flex-start" }}>
            <Icon name="chevronRight" size={13} color={T.sageDark}/>
            <span style={{ fontSize: 13, color: T.mid }}>{tip}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

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
          <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><Icon name="video" size={14} color={T.sageDark}/> Recorded Footage</div>
          {footage.map((f, i) => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < footage.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 48, height: 36, background: f.incident ? T.dangerBg : T.sagePale, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="video" size={16} color={f.incident ? T.danger : T.sageDark}/></div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13, color: T.dark }}>{f.label}</div><div style={{ fontSize: 11, color: T.muted }}>{f.date} · {f.dur}</div></div>
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
            <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><Icon name="shield" size={14} color={T.sageDark}/> Insurance Claims</div>
            {claims.map((c, i) => (
              <div key={c.id} style={{ padding: "11px 0", borderBottom: i < claims.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div><div style={{ fontWeight: 700, fontSize: 13, color: T.dark, fontFamily: "monospace" }}>{c.id}</div><div style={{ fontSize: 11, color: T.muted }}>{c.type} · {c.date}</div></div>
                  <Badge color={c.status === "approved" ? T.success : T.warn}>{c.status === "approved" ? "Approved" : "In Review"}</Badge>
                </div>
                <ProgressBar value={c.pct} color={c.status === "approved" ? T.success : T.warn}/>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{c.pct}% complete</div>
              </div>
            ))}
            <Btn style={{ width: "100%", justifyContent: "center", marginTop: 14 }} icon="plus" onClick={() => showNotif("Claim form opened")}>File New Claim</Btn>
          </Card>
          <Card style={{ padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><Icon name="upload" size={14} color={T.sageDark}/> Evidence Bundle</div>
            <p style={{ fontSize: 12, color: T.muted, margin: "0 0 12px" }}>Generate a tamper-proof package including footage, OBD data, GPS track and driving score.</p>
            {["Dashcam footage (incident clip)", "GPS route data", "OBD diagnostics snapshot", "Driving score report"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: T.dark, padding: "4px 0" }}><Icon name="check" size={12} color={T.success}/> {item}</div>
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
              <Btn key={label} variant="ghost" icon={icon} style={{ width: "100%", justifyContent: "flex-start", marginBottom: 8 }} onClick={() => { setShareTarget(null); showNotif(`Shared with: ${label}`); }}>{label}</Btn>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─── DATA & PRIVACY VIEW (Customer) ──────────────────────────────────────────
const PrivacyView = ({ accessRequests, onApprove, onRevoke, vehicles, showNotif }) => {
  const [selected, setSelected] = useState(null);
  const [approveModal, setApproveModal] = useState(null);
  const [approvedFields, setApprovedFields] = useState({});

  const openApprove = (req) => {
    const initial = {};
    req.dataFields.forEach(f => initial[f] = true);
    setApprovedFields(initial);
    setApproveModal(req);
  };

  const submitApproval = () => {
    const grantedFields = Object.entries(approvedFields).filter(([, v]) => v).map(([k]) => k);
    onApprove(approveModal.id, grantedFields);
    setApproveModal(null);
    showNotif(`Access granted to ${approveModal.insurerName}`);
  };

  const pending = accessRequests.filter(r => r.status === "pending");
  const approved = accessRequests.filter(r => r.status === "approved");

  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: T.dark }}>Data & Privacy</h2>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: T.muted }}>Control which insurers can access your vehicle data, and exactly what they can see</p>

      {/* Pending requests banner */}
      {pending.length > 0 && (
        <div style={{ background: T.warnBg, border: `1.5px solid ${T.warn}30`, borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: T.warn + "20", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bell" size={17} color={T.warn}/></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: T.dark }}>{pending.length} pending data access request{pending.length > 1 ? "s" : ""}</div>
              <div style={{ fontSize: 12, color: T.muted }}>Insurers are requesting access to your vehicle data. Review and approve or deny.</div>
            </div>
          </div>
          <Badge color={T.warn}>{pending.length} Pending</Badge>
        </div>
      )}

      {/* Info strip */}
      <div style={{ background: T.blueBg, border: `1px solid ${T.blue}20`, borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Icon name="lock" size={15} color={T.blue}/>
        <div style={{ fontSize: 12, color: T.blue }}>
          <strong>Your data is protected.</strong> No insurer can access your vehicle data without your explicit approval. You can revoke access at any time, and choose exactly which data fields to share.
        </div>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.dark, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Icon name="clock" size={14} color={T.warn}/> Pending Requests</div>
          {pending.map(req => (
            <Card key={req.id} style={{ padding: 18, marginBottom: 12, border: `1.5px solid ${T.warn}30` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: T.indigoBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: T.indigo }}>
                    {INSURERS.find(i => i.id === req.insurerId)?.logo || "?"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: T.dark }}>{req.insurerName}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>Requested {req.requestedAt} · Access for {req.expiresIn}</div>
                  </div>
                </div>
                <Badge color={T.warn}>Awaiting Your Decision</Badge>
              </div>
              <div style={{ padding: "10px 12px", background: T.sagePale, borderRadius: 10, fontSize: 12, color: T.mid, marginBottom: 14 }}>
                <strong>Purpose:</strong> {req.purpose}
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Data fields requested</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {req.dataFields.map(f => {
                    const meta = DATA_FIELD_LABELS[f];
                    return (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: meta?.risk === "high" ? T.dangerBg : meta?.risk === "medium" ? T.warnBg : T.successBg, borderRadius: 8, fontSize: 12, color: meta?.risk === "high" ? T.danger : meta?.risk === "medium" ? T.warn : T.success, fontWeight: 600 }}>
                        <Icon name={meta?.icon || "file"} size={11} color="currentColor"/>
                        {meta?.label || f}
                        {meta?.risk === "high" && <Icon name="alert" size={11} color={T.danger}/>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="success" icon="check-circle" onClick={() => openApprove(req)}>Review & Approve</Btn>
                <Btn variant="danger" icon="x-circle" onClick={() => { onRevoke(req.id); showNotif("Request denied"); }}>Deny</Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Approved */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.dark, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Icon name="check-circle" size={14} color={T.success}/> Active Data Shares</div>
        {approved.length === 0 ? (
          <Card style={{ padding: 28, textAlign: "center" }}>
            <Icon name="shield" size={28} color={T.muted}/>
            <div style={{ fontSize: 13, color: T.muted, marginTop: 8 }}>No active data shares</div>
          </Card>
        ) : approved.map(req => (
          <Card key={req.id} style={{ padding: 18, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: T.indigoBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: T.indigo }}>
                  {INSURERS.find(i => i.id === req.insurerId)?.logo || "?"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: T.dark }}>{req.insurerName}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>Approved {req.approvedAt} · Expires in {req.expiresIn}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                    {req.dataFields.map(f => <Badge key={f} color={T.sageDark}>{DATA_FIELD_LABELS[f]?.label || f}</Badge>)}
                  </div>
                </div>
              </div>
              <Btn variant="danger" icon="x-circle" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => { onRevoke(req.id); showNotif(`Access revoked from ${req.insurerName}`); }}>Revoke</Btn>
            </div>
          </Card>
        ))}
      </div>

      {/* Approve modal with field-by-field control */}
      <Modal open={!!approveModal} onClose={() => setApproveModal(null)} title="Review Data Access Request" width={540}>
        {approveModal && (
          <div>
            <div style={{ padding: "12px 14px", background: T.blueBg, borderRadius: 10, fontSize: 12, color: T.blue, marginBottom: 16, display: "flex", gap: 8 }}>
              <Icon name="info" size={14} color={T.blue}/>
              You can uncheck any data field you don't want to share. Only checked fields will be shared with {approveModal.insurerName}.
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>Choose what to share</div>
              {approveModal.dataFields.map(f => {
                const meta = DATA_FIELD_LABELS[f];
                return (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: approvedFields[f] ? T.successBg : T.sagePale, borderRadius: 10, marginBottom: 8, cursor: "pointer", border: `1.5px solid ${approvedFields[f] ? T.success + "40" : T.border}` }}
                    onClick={() => setApprovedFields(prev => ({ ...prev, [f]: !prev[f] }))}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${approvedFields[f] ? T.success : T.borderMid}`, background: approvedFields[f] ? T.success : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {approvedFields[f] && <Icon name="check" size={11} color="#fff"/>}
                    </div>
                    <Icon name={meta?.icon || "file"} size={14} color={T.mid}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: T.dark }}>{meta?.label || f}</div>
                      <div style={{ fontSize: 11, color: T.muted }}>Sensitivity: <span style={{ color: meta?.risk === "high" ? T.danger : meta?.risk === "medium" ? T.warn : T.success, fontWeight: 600 }}>{meta?.risk || "low"}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="ghost" onClick={() => setApproveModal(null)}>Cancel</Btn>
              <Btn variant="success" icon="check-circle" onClick={submitApproval} disabled={!Object.values(approvedFields).some(Boolean)}>
                Grant Access to {Object.values(approvedFields).filter(Boolean).length} field{Object.values(approvedFields).filter(Boolean).length !== 1 ? "s" : ""}
              </Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─── INSURER PORTAL VIEWS ─────────────────────────────────────────────────────

const InsurerOverview = ({ showNotif }) => {
  const stats = [
    { label: "Total Customers", value: "529", icon: "users", color: T.sageDark, sub: "+14 this month" },
    { label: "Active Policies", value: "412", icon: "shield", color: T.success, sub: "78% conversion" },
    { label: "Claims This Month", value: "23", icon: "alert", color: T.warn, sub: "↓ 18% from last" },
    { label: "Monthly Revenue", value: "₹9.4L", icon: "trending-up", color: T.blue, sub: "+12% MoM" },
  ];
  const recentActivity = [
    { type: "request_approved", customer: "Raj Sharma", vehicle: "Swift — Daily", time: "2h ago", icon: "check-circle", color: T.success },
    { type: "claim_filed", customer: "Priya Mehta", vehicle: "Innova — Family", time: "5h ago", icon: "shield", color: T.warn },
    { type: "new_customer", customer: "Amit Kumar", vehicle: "Baleno — Office", time: "1d ago", icon: "user", color: T.sageDark },
    { type: "risk_alert", customer: "Sunita Rao", vehicle: "Creta — Weekend", time: "1d ago", icon: "alert", color: T.danger },
  ];
  const activityLabels = { request_approved: "Access request approved", claim_filed: "New claim filed", new_customer: "New customer onboarded", risk_alert: "High risk alert triggered" };

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>Insurer Overview</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>BharatShield Insurance · Beacon Enterprise Portal</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {stats.map(s => <StatBox key={s.label} {...s}/>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        {/* Fleet risk distribution */}
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Icon name="bar-chart" size={14} color={T.sageDark}/> Fleet Risk Distribution</div>
          {[{ label: "Low Risk (Score 80–100)", count: 312, pct: 59, color: T.success }, { label: "Medium Risk (Score 55–79)", count: 174, pct: 33, color: T.warn }, { label: "High Risk (Score < 55)", count: 43, pct: 8, color: T.danger }].map(r => (
            <div key={r.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                <span style={{ color: T.dark, fontWeight: 600 }}>{r.label}</span>
                <span style={{ color: T.muted, fontWeight: 700 }}>{r.count} <span style={{ fontWeight: 400, fontSize: 11 }}>customers</span></span>
              </div>
              <ProgressBar value={r.pct} color={r.color}/>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{r.pct}% of fleet</div>
            </div>
          ))}
        </Card>
        {/* Recent activity */}
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><Icon name="clock" size={14} color={T.sageDark}/> Recent Activity</div>
          {recentActivity.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < recentActivity.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: a.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={a.icon} size={14} color={a.color}/></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.dark }}>{activityLabels[a.type]}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{a.customer} · {a.vehicle}</div>
              </div>
              <div style={{ fontSize: 11, color: T.muted, whiteSpace: "nowrap" }}>{a.time}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

const InsurerCustomers = ({ showNotif }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const customers = [
    { id: "c1", name: "Raj Sharma", vehicles: 2, avgScore: 84, risk: "low", premium: "₹8,400/yr", status: "active", joined: "Jan 2026", dataAccess: ["driving_score", "odometer", "dtc_codes"], lastTrip: "Today" },
    { id: "c2", name: "Priya Mehta", vehicles: 1, avgScore: 71, risk: "medium", premium: "₹11,200/yr", status: "active", joined: "Feb 2026", dataAccess: ["driving_score", "trip_history", "dtc_codes"], lastTrip: "Yesterday" },
    { id: "c3", name: "Amit Kumar", vehicles: 3, avgScore: 91, risk: "low", premium: "₹6,800/yr", status: "active", joined: "Mar 2026", dataAccess: ["driving_score"], lastTrip: "3 days ago" },
    { id: "c4", name: "Sunita Rao", vehicles: 1, avgScore: 48, risk: "high", premium: "₹18,900/yr", status: "review", joined: "Jan 2026", dataAccess: ["driving_score", "trip_history", "live_vitals", "dtc_codes"], lastTrip: "Today" },
  ];

  const riskColor = (r) => r === "low" ? T.success : r === "medium" ? T.warn : T.danger;
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div><h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>Customers</h2><p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>Customers who have approved data access</p></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers…" style={{ padding: "8px 12px 8px 34px", borderRadius: 9, border: `1.5px solid ${T.borderMid}`, fontSize: 13, fontFamily: "inherit", color: T.dark, background: T.cream, outline: "none", width: 200 }}/>
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Icon name="users" size={14} color={T.muted}/></div>
          </div>
        </div>
      </div>
      <Card style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr 1fr", padding: "10px 18px", borderBottom: `1px solid ${T.border}`, background: T.sagePale }}>
          {["Customer", "Risk", "Score", "Premium", "Data Access", "Last Active"].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>{h}</div>
          ))}
        </div>
        {filtered.map((c, i) => (
          <div key={c.id} onClick={() => setSelected(c)} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr 1fr", padding: "14px 18px", borderBottom: i < filtered.length - 1 ? `1px solid ${T.border}` : "none", cursor: "pointer", background: selected?.id === c.id ? T.sagePale : "transparent", transition: "background 0.15s" }}
            onMouseEnter={e => { if (selected?.id !== c.id) e.currentTarget.style.background = T.cream; }}
            onMouseLeave={e => { if (selected?.id !== c.id) e.currentTarget.style.background = "transparent"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.sageDark, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{c.name[0]}</div>
              <div><div style={{ fontWeight: 700, fontSize: 13, color: T.dark }}>{c.name}</div><div style={{ fontSize: 11, color: T.muted }}>{c.vehicles} vehicle{c.vehicles > 1 ? "s" : ""}</div></div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}><Badge color={riskColor(c.risk)}>{c.risk.charAt(0).toUpperCase() + c.risk.slice(1)}</Badge></div>
            <div style={{ display: "flex", alignItems: "center" }}><HealthRing score={c.avgScore} size={36}/></div>
            <div style={{ display: "flex", alignItems: "center", fontWeight: 700, fontSize: 13, color: T.sageDark }}>{c.premium}</div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>{c.dataAccess.slice(0, 2).map(f => <Badge key={f} color={T.sageDark}>{DATA_FIELD_LABELS[f]?.label?.split(" ")[0] || f}</Badge>)}{c.dataAccess.length > 2 && <Badge color={T.muted}>+{c.dataAccess.length - 2}</Badge>}</div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: T.muted }}>{c.lastTrip}</div>
          </div>
        ))}
      </Card>

      {/* Customer detail panel */}
      {selected && (
        <Card style={{ padding: 20, marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: T.sageDark, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 800 }}>{selected.name[0]}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: T.dark }}>{selected.name}</div>
                <div style={{ fontSize: 12, color: T.muted }}>Customer since {selected.joined} · {selected.vehicles} vehicle{selected.vehicles > 1 ? "s" : ""}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="secondary" icon="file" onClick={() => showNotif("Generating report…")}>Full Report</Btn>
              <Btn variant="ghost" icon="x" onClick={() => setSelected(null)}>Close</Btn>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
            {[["Driving Score", selected.avgScore + "/100", "bar-chart"], ["Risk Level", selected.risk, "shield"], ["Premium", selected.premium, "percent"], ["Status", selected.status, "check-circle"]].map(([k, v, ic]) => (
              <div key={k} style={{ padding: "10px 12px", background: T.sagePale, borderRadius: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}><Icon name={ic} size={10} color={T.muted}/>{k}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.dark }}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Approved data access</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {selected.dataAccess.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: T.successBg, borderRadius: 8, fontSize: 12, color: T.success, fontWeight: 600 }}>
                  <Icon name={DATA_FIELD_LABELS[f]?.icon || "file"} size={12} color={T.success}/>
                  {DATA_FIELD_LABELS[f]?.label || f}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const InsurerRequests = ({ showNotif }) => {
  const [requests, setRequests] = useState([
    { id: "r1", customer: "Ravi Singh", vehicle: "Honda City", requestedAt: "Apr 02", fields: ["driving_score", "trip_history", "dtc_codes", "odometer"], status: "draft", purpose: "Policy renewal — 15% discount offered for telematics opt-in" },
    { id: "r2", customer: "Meena Kapoor", vehicle: "Hyundai Creta", requestedAt: "Apr 01", fields: ["driving_score", "odometer"], status: "sent", purpose: "New policy onboarding" },
    { id: "r3", customer: "Ajay Verma", vehicle: "Tata Nexon", requestedAt: "Mar 30", fields: ["driving_score", "trip_history", "engine_health"], status: "approved", purpose: "Risk reassessment — claim history review" },
    { id: "r4", customer: "Deepa Nair", vehicle: "Maruti Swift", requestedAt: "Mar 28", fields: ["driving_score"], status: "denied", purpose: "Annual renewal discount check" },
  ]);
  const [newReq, setNewReq] = useState(false);
  const [form, setForm] = useState({ customer: "", vehicle: "", purpose: "", fields: [] });

  const statusMeta = { draft: { color: T.muted, label: "Draft", icon: "edit" }, sent: { color: T.blue, label: "Sent — Awaiting Approval", icon: "clock" }, approved: { color: T.success, label: "Approved", icon: "check-circle" }, denied: { color: T.danger, label: "Denied", icon: "x-circle" } };

  const toggleField = (f) => setForm(prev => ({ ...prev, fields: prev.fields.includes(f) ? prev.fields.filter(x => x !== f) : [...prev.fields, f] }));

  const sendRequest = () => {
    setRequests(prev => [...prev, { id: "r" + Date.now(), ...form, requestedAt: "Apr 02", status: "sent" }]);
    setNewReq(false);
    setForm({ customer: "", vehicle: "", purpose: "", fields: [] });
    showNotif("Access request sent to customer");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div><h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>Access Requests</h2><p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>Request and track data access from your policyholders</p></div>
        <Btn icon="send" onClick={() => setNewReq(true)}>New Request</Btn>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[["Sent", requests.filter(r => r.status === "sent").length, "clock", T.blue], ["Approved", requests.filter(r => r.status === "approved").length, "check-circle", T.success], ["Denied", requests.filter(r => r.status === "denied").length, "x-circle", T.danger], ["Draft", requests.filter(r => r.status === "draft").length, "edit", T.muted]].map(([label, value, icon, color]) => (
          <StatBox key={label} label={label} value={value} icon={icon} color={color}/>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {requests.map(req => {
          const sm = statusMeta[req.status];
          return (
            <Card key={req.id} style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flex: 1 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: sm.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={sm.icon} size={17} color={sm.color}/></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: T.dark }}>{req.customer}</span>
                      <Badge color={sm.color}>{sm.label}</Badge>
                    </div>
                    <div style={{ fontSize: 12, color: T.muted, marginBottom: 8 }}>{req.vehicle} · Sent {req.requestedAt}</div>
                    <div style={{ fontSize: 12, color: T.mid, marginBottom: 10 }}><strong>Purpose:</strong> {req.purpose}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {req.fields.map(f => (
                        <span key={f} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: T.sageDark, background: T.sagePale, padding: "3px 8px", borderRadius: 6 }}>
                          <Icon name={DATA_FIELD_LABELS[f]?.icon || "file"} size={10} color={T.sageDark}/>{DATA_FIELD_LABELS[f]?.label || f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {req.status === "draft" && <Btn variant="indigo" icon="send" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => { setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: "sent" } : r)); showNotif("Request sent"); }}>Send</Btn>}
                {req.status === "approved" && <Btn variant="secondary" icon="eye" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => showNotif("Opening data view…")}>View Data</Btn>}
              </div>
            </Card>
          );
        })}
      </div>

      {/* New request modal */}
      <Modal open={newReq} onClose={() => setNewReq(false)} title="New Data Access Request" width={560}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ padding: "10px 14px", background: T.indigoBg, borderRadius: 10, fontSize: 12, color: T.indigo, display: "flex", gap: 8 }}>
            <Icon name="info" size={14} color={T.indigo}/> The customer will receive a notification and must explicitly approve before any data is shared.
          </div>
          <div><label style={{ fontSize: 12, fontWeight: 600, color: T.mid, marginBottom: 4, display: "block" }}>Customer Name</label><input value={form.customer} onChange={e => setForm(f => ({ ...f, customer: e.target.value }))} placeholder="e.g. Ravi Singh" style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1.5px solid ${T.borderMid}`, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}/></div>
          <div><label style={{ fontSize: 12, fontWeight: 600, color: T.mid, marginBottom: 4, display: "block" }}>Vehicle</label><input value={form.vehicle} onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))} placeholder="e.g. Honda City" style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1.5px solid ${T.borderMid}`, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}/></div>
          <div><label style={{ fontSize: 12, fontWeight: 600, color: T.mid, marginBottom: 4, display: "block" }}>Purpose (shown to customer)</label><input value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))} placeholder="e.g. Policy renewal — telematics discount" style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1.5px solid ${T.borderMid}`, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}/></div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: T.mid, marginBottom: 8, display: "block" }}>Data fields to request</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {Object.entries(DATA_FIELD_LABELS).map(([key, meta]) => (
                <div key={key} onClick={() => toggleField(key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, border: `1.5px solid ${form.fields.includes(key) ? T.sageDark + "60" : T.border}`, background: form.fields.includes(key) ? T.sagePale : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${form.fields.includes(key) ? T.sageDark : T.borderMid}`, background: form.fields.includes(key) ? T.sageDark : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {form.fields.includes(key) && <Icon name="check" size={10} color="#fff"/>}
                  </div>
                  <Icon name={meta.icon} size={13} color={T.mid}/>
                  <span style={{ fontSize: 13, color: T.dark, fontWeight: 600 }}>{meta.label}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: meta.risk === "high" ? T.danger : meta.risk === "medium" ? T.warn : T.success }}>
                    {meta.risk} sensitivity
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setNewReq(false)}>Cancel</Btn>
            <Btn variant="indigo" icon="send" disabled={!form.customer || !form.vehicle || form.fields.length === 0} onClick={sendRequest}>Send Request</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const InsurerClaims = ({ showNotif }) => {
  const claims = [
    { id: "CLM-2026-018", customer: "Priya Mehta", vehicle: "Innova — Family", type: "Collision", date: "Apr 01", amount: "₹1,24,000", status: "reviewing", score: 71, hasEvidence: true },
    { id: "CLM-2026-015", customer: "Rakesh Gupta", vehicle: "Swift — Office", type: "Third Party", date: "Mar 28", amount: "₹42,000", status: "approved", score: 85, hasEvidence: true },
    { id: "CLM-2026-012", customer: "Sunita Rao", vehicle: "Creta — Weekend", type: "Theft Attempt", date: "Mar 22", amount: "₹18,000", status: "disputed", score: 48, hasEvidence: false },
    { id: "CLM-2026-009", customer: "Vikram Shah", vehicle: "Fortuner", type: "Natural Peril", date: "Mar 15", amount: "₹67,000", status: "paid", score: 88, hasEvidence: true },
  ];
  const statusMeta = { reviewing: { color: T.warn, label: "Under Review" }, approved: { color: T.success, label: "Approved" }, disputed: { color: T.danger, label: "Disputed" }, paid: { color: T.sageDark, label: "Paid Out" } };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>Claims Centre</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>Review Beacon-verified claim evidence and telematics data</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <StatBox label="Under Review" value={claims.filter(c => c.status === "reviewing").length} icon="clock" color={T.warn}/>
        <StatBox label="Approved" value={claims.filter(c => c.status === "approved").length} icon="check-circle" color={T.success}/>
        <StatBox label="Disputed" value={claims.filter(c => c.status === "disputed").length} icon="alert" color={T.danger}/>
        <StatBox label="Total Exposure" value="₹2.5L" icon="shield" color={T.sageDark}/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {claims.map(c => {
          const sm = statusMeta[c.status];
          return (
            <Card key={c.id} style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <code style={{ fontWeight: 700, fontSize: 14, color: T.dark }}>{c.id}</code>
                    <Badge color={sm.color}>{sm.label}</Badge>
                    {c.hasEvidence && <Badge color={T.success}><Icon name="shield" size={10} color={T.success}/>Beacon Verified</Badge>}
                  </div>
                  <div style={{ fontSize: 13, color: T.mid, fontWeight: 600 }}>{c.customer} · {c.vehicle}</div>
                  <div style={{ fontSize: 12, color: T.muted }}>{c.type} · {c.date}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: T.dark }}>{c.amount}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>claimed amount</div>
                  <div style={{ marginTop: 6 }}><HealthRing score={c.score} size={38}/></div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {c.hasEvidence && <Btn variant="secondary" icon="eye" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => showNotif("Loading evidence bundle…")}>View Evidence</Btn>}
                {c.status === "reviewing" && <>
                  <Btn variant="success" icon="check-circle" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => showNotif("Claim approved")}>Approve</Btn>
                  <Btn variant="danger" icon="x-circle" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => showNotif("Claim flagged for dispute")}>Dispute</Btn>
                </>}
                <Btn variant="ghost" icon="file" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => showNotif("Generating claim report…")}>Report</Btn>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const InsurerAnalytics = ({ showNotif }) => {
  const riskFactors = [
    { name: "Hard Braking Events", impact: 82, color: T.danger },
    { name: "Night Driving %", impact: 67, color: T.warn },
    { name: "Highway Speed Compliance", impact: 91, color: T.success },
    { name: "Engine Fault History", impact: 54, color: T.warn },
    { name: "Idle Time Ratio", impact: 38, color: T.danger },
    { name: "Trip Regularity", impact: 76, color: T.sageDark },
  ];
  const segments = [
    { label: "Urban Commuters", count: 218, avgPremium: "₹9,200", avgScore: 79, claims: "4.2%", trend: "+2%" },
    { label: "Highway Frequent", count: 124, avgPremium: "₹11,400", avgScore: 72, claims: "6.1%", trend: "-1%" },
    { label: "Weekend Drivers", count: 142, avgPremium: "₹7,100", avgScore: 85, claims: "2.8%", trend: "+5%" },
    { label: "Commercial Fleet", count: 45, avgPremium: "₹22,000", avgScore: 68, claims: "9.3%", trend: "0%" },
  ];
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>Risk Analytics</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>Telematics-driven risk scoring and fleet intelligence</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Icon name="activity" size={14} color={T.sageDark}/> Risk Factor Weights</div>
          {riskFactors.map(f => (
            <div key={f.name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}><span style={{ color: T.dark, fontWeight: 600 }}>{f.name}</span><span style={{ color: T.muted }}>{f.impact}/100</span></div>
              <ProgressBar value={f.impact} color={f.color}/>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Icon name="users" size={14} color={T.sageDark}/> Customer Segments</div>
          {segments.map((s, i) => (
            <div key={s.label} style={{ padding: "10px 0", borderBottom: i < segments.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: T.dark }}>{s.label}</span>
                <span style={{ fontSize: 12, color: T.muted }}>{s.count} customers</span>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {[["Avg Premium", s.avgPremium], ["Avg Score", s.avgScore], ["Claim Rate", s.claims], ["Trend", s.trend]].map(([k, v]) => (
                  <div key={k}><div style={{ fontSize: 10, color: T.muted }}>{k}</div><div style={{ fontSize: 12, fontWeight: 700, color: T.sageDark }}>{v}</div></div>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </div>
      <Card style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Icon name="trending-up" size={14} color={T.sageDark}/> Monthly Claims vs Driving Score Correlation</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 110 }}>
          {[{ score: "< 40", claims: 18, bar: 90 }, { score: "40-55", claims: 12, bar: 65 }, { score: "55-70", claims: 8, bar: 44 }, { score: "70-85", claims: 4, bar: 22 }, { score: "85+", claims: 2, bar: 11 }].map(d => (
            <div key={d.score} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, color: T.muted }}>{d.claims}%</span>
              <div style={{ width: "100%", height: `${d.bar}px`, background: d.bar > 60 ? T.danger : d.bar > 35 ? T.warn : T.success, borderRadius: "5px 5px 0 0" }}/>
              <span style={{ fontSize: 10, color: T.muted, textAlign: "center" }}>{d.score}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 8, textAlign: "center" }}>Claim frequency (%) by driving score band</div>
      </Card>
    </div>
  );
};

const InsurerPricing = ({ showNotif }) => {
  const [baseRate, setBaseRate] = useState(12000);
  const [scoreMult, setScoreMult] = useState(true);
  const [dtcAddon, setDtcAddon] = useState(true);
  const [nightAddon, setNightAddon] = useState(false);

  const exampleCustomers = [
    { name: "Amit Kumar", score: 91, dtcs: 0, nightPct: 5 },
    { name: "Raj Sharma", score: 84, dtcs: 1, nightPct: 12 },
    { name: "Priya Mehta", score: 71, dtcs: 2, nightPct: 20 },
    { name: "Sunita Rao", score: 48, dtcs: 4, nightPct: 35 },
  ];

  const calcPremium = (c) => {
    let p = baseRate;
    if (scoreMult) p *= c.score >= 85 ? 0.75 : c.score >= 70 ? 0.92 : c.score >= 55 ? 1.1 : 1.35;
    if (dtcAddon && c.dtcs > 0) p += c.dtcs * 800;
    if (nightAddon) p += (c.nightPct / 100) * 3000;
    return Math.round(p);
  };

  const Toggle = ({ on, label, desc, onChange }) => (
    <div onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: on ? T.successBg : T.sagePale, borderRadius: 10, cursor: "pointer", border: `1.5px solid ${on ? T.success + "40" : T.border}`, marginBottom: 8, transition: "all 0.15s" }}>
      <Icon name={on ? "toggle-right" : "toggle-left"} size={22} color={on ? T.success : T.muted}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: T.dark }}>{label}</div>
        <div style={{ fontSize: 11, color: T.muted }}>{desc}</div>
      </div>
      <Badge color={on ? T.success : T.muted}>{on ? "Active" : "Off"}</Badge>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.dark }}>UBI Pricing Engine</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>Usage-Based Insurance — configure dynamic premium factors</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 18 }}>
        <div>
          <Card style={{ padding: 18, marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><Icon name="settings" size={14} color={T.sageDark}/> Premium Factors</div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.mid, marginBottom: 6, display: "block" }}>Base Annual Premium (₹)</label>
              <input type="number" value={baseRate} onChange={e => setBaseRate(parseInt(e.target.value) || 0)} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1.5px solid ${T.borderMid}`, fontSize: 14, fontWeight: 700, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}/>
            </div>
            <Toggle on={scoreMult} label="Driving Score Multiplier" desc="Adjust premium based on telematics driving score" onChange={() => setScoreMult(s => !s)}/>
            <Toggle on={dtcAddon} label="DTC Fault Code Add-on" desc="+₹800 per active fault code detected" onChange={() => setDtcAddon(s => !s)}/>
            <Toggle on={nightAddon} label="Night Driving Surcharge" desc="Proportional surcharge for high % of night driving" onChange={() => setNightAddon(s => !s)}/>
          </Card>
          <Card style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: T.dark, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Icon name="info" size={13} color={T.sageDark}/> Score Multiplier Table</div>
            {[["85–100", "0.75×", "25% discount", T.success], ["70–84", "0.92×", "8% discount", T.success], ["55–69", "1.10×", "10% loading", T.warn], ["< 55", "1.35×", "35% loading", T.danger]].map(([range, mult, label, color]) => (
              <div key={range} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${T.border}`, fontSize: 12 }}>
                <span style={{ color: T.muted }}>Score {range}</span>
                <code style={{ fontWeight: 700, color: T.dark }}>{mult}</code>
                <Badge color={color}>{label}</Badge>
              </div>
            ))}
          </Card>
        </div>
        <Card style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.dark, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Icon name="percent" size={14} color={T.sageDark}/> Live Premium Preview</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>Based on current factor settings — updates in real time</div>
          {exampleCustomers.map((c, i) => {
            const premium = calcPremium(c);
            const base = baseRate;
            const diff = premium - base;
            return (
              <div key={c.name} style={{ padding: "14px 0", borderBottom: i < exampleCustomers.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <HealthRing score={c.score} size={38}/>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: T.dark }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: T.muted }}>Score {c.score} · {c.dtcs} DTC{c.dtcs !== 1 ? "s" : ""} · {c.nightPct}% night driving</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: T.dark }}>₹{premium.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: diff < 0 ? T.success : T.danger }}>{diff < 0 ? "↓" : "↑"} ₹{Math.abs(diff).toLocaleString()} vs base</div>
                  </div>
                </div>
                <ProgressBar value={c.score} color={c.score >= 80 ? T.success : c.score >= 55 ? T.warn : T.danger}/>
              </div>
            );
          })}
          <Btn style={{ width: "100%", justifyContent: "center", marginTop: 16 }} icon="send" onClick={() => showNotif("Pricing model published to all active policies")}>Publish Pricing Model</Btn>
        </Card>
      </div>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function BeaconApp() {
  const [mode, setMode] = useState("customer"); // "customer" | "insurer"
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [selectedId, setSelectedId] = useState("v1");
  const [tab, setTab] = useState("fleet");
  const [insTab, setInsTab] = useState("ins_overview");
  const [sidebar, setSidebar] = useState(true);
  const [notif, setNotif] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [accessRequests, setAccessRequests] = useState(INITIAL_ACCESS_REQUESTS);

  const vehicle = vehicles.find(v => v.id === selectedId) || vehicles[0];

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

  const showNotif = useCallback((msg, type = "success") => { setNotif({ msg, type }); setTimeout(() => setNotif(null), 3200); }, []);
  const addVehicle = (v) => { setVehicles(vs => [...vs, v]); setAddOpen(false); setSelectedId(v.id); setTab("dash"); showNotif(`${v.nickname} added to fleet`); };
  const removeVehicle = () => { setVehicles(vs => vs.filter(v => v.id !== removeTarget.id)); setSelectedId(vehicles.find(v => v.id !== removeTarget.id)?.id || ""); setRemoveTarget(null); setTab("fleet"); showNotif(`${removeTarget.nickname} removed from fleet`); };

  const approveRequest = (id, fields) => setAccessRequests(prev => prev.map(r => r.id === id ? { ...r, status: "approved", dataFields: fields, approvedAt: "Apr 02" } : r));
  const revokeRequest = (id) => setAccessRequests(prev => prev.map(r => r.id === id ? { ...r, status: "denied" } : r));

  const pendingCount = accessRequests.filter(r => r.status === "pending").length;

  const NAV = mode === "customer" ? NAV_CUSTOMER : NAV_INSURER;
  const currentTab = mode === "customer" ? tab : insTab;
  const setCurrentTab = mode === "customer" ? setTab : setInsTab;

  // Insurer views map
  const insurerViews = { ins_overview: InsurerOverview, ins_customers: InsurerCustomers, ins_requests: InsurerRequests, ins_claims: InsurerClaims, ins_analytics: InsurerAnalytics, ins_pricing: InsurerPricing };

  // Customer views map
  const customerViews = { fleet: FleetView, dash: DashView, diag: DiagView, driving: DrivingView, engine: EngineView, mfr: MfrView, fuel: FuelView, dashcam: DashcamView, privacy: PrivacyView };

  const viewProps = mode === "customer"
    ? { vehicle, setTab, showNotif, vehicles, onSelect: setSelectedId, onAddVehicle: () => setAddOpen(true), onRemove: setRemoveTarget, accessRequests, onApprove: approveRequest, onRevoke: revokeRequest }
    : { showNotif };

  const View = mode === "customer" ? (customerViews[tab] || DashView) : (insurerViews[insTab] || InsurerOverview);

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

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Vehicle to Fleet" width={560}>
        <AddVehicleWizard onAdd={addVehicle} onClose={() => setAddOpen(false)}/>
      </Modal>
      <Modal open={!!removeTarget} onClose={() => setRemoveTarget(null)} title="Confirm Removal" width={420}>
        {removeTarget && <RemoveVehicleModal vehicle={removeTarget} onConfirm={removeVehicle} onClose={() => setRemoveTarget(null)}/>}
      </Modal>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: sidebar ? 234 : 58, background: mode === "insurer" ? "#1a2040" : "#1a2820", display: "flex", flexDirection: "column", transition: "width 0.28s ease", overflow: "hidden", flexShrink: 0, zIndex: 10 }}>
          {/* Logo + mode toggle */}
          <div style={{ padding: sidebar ? "18px 14px 14px" : "18px 10px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: sidebar ? "space-between" : "center" }}>
            {sidebar ? <BeaconWordmark dark size={0.78}/> : (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <text x="2" y="22" fontFamily="Georgia,'Times New Roman',serif" fontWeight="700" fontSize="20" fill="#e8ede4">B</text>
                <circle cx="19" cy="8" r="1.8" fill="#8aae90"/>
                <path d="M18 3.5 A5.5 5.5 0 0 1 23.5 9" stroke="#8aae90" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <path d="M16.5 1 A9.5 9.5 0 0 1 27 9.5" stroke="#8aae90" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6"/>
              </svg>
            )}
            <button onClick={() => setSidebar(s => !s)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 4, display: "flex" }}>
              <Icon name={sidebar ? "chevronLeft" : "chevronRight"} size={16} color="rgba(255,255,255,0.4)"/>
            </button>
          </div>

          {/* Mode switcher */}
          {sidebar && (
            <div style={{ margin: "10px 10px 0", display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: 9, padding: 3 }}>
              {[{ id: "customer", label: "Customer", icon: "user" }, { id: "insurer", label: "Insurer", icon: "building" }].map(m => (
                <button key={m.id} onClick={() => { setMode(m.id); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "6px 4px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit", background: mode === m.id ? "rgba(255,255,255,0.14)" : "transparent", color: mode === m.id ? "#fff" : "rgba(255,255,255,0.4)", transition: "all 0.15s" }}>
                  <Icon name={m.icon} size={12} color="currentColor"/>{m.label}
                </button>
              ))}
            </div>
          )}
          {!sidebar && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "10px 6px 0" }}>
              {[{ id: "customer", icon: "user" }, { id: "insurer", icon: "building" }].map(m => (
                <button key={m.id} onClick={() => setMode(m.id)} title={m.id === "customer" ? "Customer Portal" : "Insurer Portal"} style={{ width: "100%", padding: "7px 0", borderRadius: 7, border: "none", cursor: "pointer", background: mode === m.id ? "rgba(255,255,255,0.14)" : "transparent", color: mode === m.id ? "#fff" : "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={m.icon} size={15} color="currentColor"/>
                </button>
              ))}
            </div>
          )}

          {/* Nav */}
          <div style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
            {NAV.map(n => {
              const active = currentTab === n.id;
              const showBadge = n.id === "privacy" && pendingCount > 0;
              return (
                <div key={n.id} onClick={() => setCurrentTab(n.id)} title={!sidebar ? n.label : undefined}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: sidebar ? "10px 14px" : "10px 0", justifyContent: sidebar ? "flex-start" : "center", margin: "1px 8px", borderRadius: 9, cursor: "pointer", background: active ? "rgba(138,158,128,0.18)" : "transparent", borderLeft: active ? `3px solid ${mode === "insurer" ? "#6a7acc" : T.sage}` : "3px solid transparent", color: active ? T.sageLight : "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: active ? 700 : 400, transition: "all 0.16s", whiteSpace: "nowrap", overflow: "hidden" }}>
                  <Icon name={n.icon} size={15} color={active ? T.sageLight : "rgba(255,255,255,0.45)"}/>
                  {sidebar && n.label}
                  {sidebar && showBadge && <span style={{ marginLeft: "auto", background: T.warn, color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 700 }}>{pendingCount}</span>}
                  {!sidebar && showBadge && <span style={{ position: "absolute", width: 7, height: 7, background: T.warn, borderRadius: "50%", top: 6, right: 8 }}/>}
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
            {sidebar && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>Beacon Platform v2.2.0</div>}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Topbar */}
          <div style={{ background: T.cream, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", height: 58, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.muted }}>
              <span>{mode === "customer" ? "Car Health Monitoring" : "Insurance Gateway"}</span>
              <Icon name="chevronRight" size={13} color={T.muted}/>
              <span style={{ fontWeight: 700, color: T.dark }}>{NAV.find(n => n.id === currentTab)?.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {mode === "customer" && tab !== "fleet" && (
                <VehicleSelector vehicles={vehicles} selected={selectedId} onSelect={setSelectedId} onAdd={() => setAddOpen(true)}/>
              )}
              {/* Pending requests bell */}
              {mode === "customer" && pendingCount > 0 && (
                <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setTab("privacy")}>
                  <Icon name="bell" size={18} color={T.warn}/>
                  <span style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, background: T.warn, color: "#fff", borderRadius: "50%", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{pendingCount}</span>
                </div>
              )}
              {mode === "insurer" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: T.indigoBg, borderRadius: 8, fontSize: 12, color: T.indigo, fontWeight: 600 }}>
                  <Icon name="building" size={13} color={T.indigo}/> BharatShield Insurance
                </div>
              )}
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Icon name="info" size={17} color={T.muted}/>
              </button>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: mode === "insurer" ? T.indigo : T.sageDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={mode === "insurer" ? "building" : "user"} size={15} color="#fff"/>
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
