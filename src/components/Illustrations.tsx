"use client";

import React from "react";

// Warm Editorial WhatsApp Coexistence Diagram
export function WhatsAppCoexistenceDiagram() {
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="180" rx="12" fill="#FAF8F5" stroke="#E6E1DA" strokeWidth="1" />
      
      {/* Human App side */}
      <rect x="25" y="45" width="105" height="50" rx="8" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
      <text x="77.5" y="68" fill="#1C1917" fontSize="10" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="600">WhatsApp App</text>
      <text x="77.5" y="82" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Human Chat (Free)</text>

      {/* Sync Webhook Bridge */}
      <path d="M 130 60 L 250 60" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 250 80 L 130 80" stroke="#C2410C" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="190" y="52" fill="#D97706" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Meta Echoes</text>
      <text x="190" y="93" fill="#C2410C" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Webhooks Sync</text>

      {/* Cloud API Side */}
      <rect x="250" y="45" width="105" height="50" rx="8" fill="#FFFFFF" stroke="#1C1917" strokeWidth="1.5" />
      <text x="302.5" y="68" fill="#1C1917" fontSize="10" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="600">Cloud API Engine</text>
      <text x="302.5" y="82" fill="#D97706" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">AI Automations</text>

      {/* Redis Buffer Queue */}
      <rect x="135" y="115" width="110" height="35" rx="6" fill="#FFFFFF" stroke="#E6E1DA" strokeWidth="1.25" />
      <text x="190" y="130" fill="#1C1917" fontSize="9" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="bold">Redis Event Queue</text>
      <text x="190" y="142" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Prevents Spike Loss</text>

      <path d="M 77.5 95 L 77.5 132 L 135 132" stroke="#78716C" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 302.5 95 L 302.5 132 L 245 132" stroke="#78716C" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

// Warm Editorial Cloudery MCP Host Diagram
export function ClouderyMcpDiagram() {
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="180" rx="12" fill="#FAF8F5" stroke="#E6E1DA" strokeWidth="1" />
      
      {/* Wildcard Subdomain */}
      <circle cx="70" cy="90" r="26" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
      <text x="70" y="90" fill="#1C1917" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">*.cloudery</text>
      <text x="70" y="100" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">xyz</text>

      {/* Edge Proxy */}
      <polygon points="190,45 235,70 235,110 190,135 145,110 145,70" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
      <text x="190" y="88" fill="#1C1917" fontSize="10" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="bold">EDGE PROXY</text>
      <text x="190" y="100" fill="#D97706" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">JWT / ACL Gate</text>

      {/* GCP Cloud Run Server-Sent Events */}
      <rect x="270" y="60" width="85" height="60" rx="8" fill="#FFFFFF" stroke="#1C1917" strokeWidth="1.5" />
      <text x="312.5" y="85" fill="#1C1917" fontSize="9" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="600">GCP Cloud Run</text>
      <text x="312.5" y="98" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Remote MCP SSE</text>
      <text x="312.5" y="108" fill="#059669" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Isolated Container</text>

      <path d="M 96 90 L 145 90" stroke="#D8D2C7" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 235 90 L 270 90" stroke="#D97706" strokeWidth="1.5" />
    </svg>
  );
}

// Warm Editorial Guide AutoFunnel Diagram
export function GuideAutoFunnelDiagram() {
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="180" rx="12" fill="#FAF8F5" stroke="#E6E1DA" strokeWidth="1" />
      
      {/* Inbound Comment */}
      <rect x="20" y="65" width="85" height="40" rx="6" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
      <text x="62.5" y="83" fill="#1C1917" fontSize="8" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="600">YouTube Comment</text>
      <text x="62.5" y="95" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">"Is there a link?"</text>

      {/* Parser & Classifier */}
      <rect x="135" y="45" width="110" height="80" rx="8" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
      <text x="190" y="68" fill="#D97706" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Genkit / Gemini</text>
      <text x="190" y="85" fill="#1C1917" fontSize="9" fontFamily="Plus Jakarta Sans" textAnchor="middle">Intent Classifier</text>
      <line x1="145" y1="95" x2="235" y2="95" stroke="#E6E1DA" strokeWidth="1" />
      <text x="190" y="112" fill="#C2410C" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Doubt Level: 94%</text>

      {/* Auto Reply Publishing */}
      <rect x="275" y="65" width="85" height="40" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="1.5" />
      <text x="317.5" y="83" fill="#059669" fontSize="8" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="bold">Direct API Publish</text>
      <text x="317.5" y="95" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">With Course Upsell</text>

      <path d="M 105 85 L 135 85" stroke="#D8D2C7" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 245 85 L 275 85" stroke="#059669" strokeWidth="1.5" />
    </svg>
  );
}

// Warm Editorial MusicBuddy Cache Diagram
export function MusicBuddyCacheDiagram() {
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="180" rx="12" fill="#FAF8F5" stroke="#E6E1DA" strokeWidth="1" />
      
      {/* Input WAV */}
      <rect x="20" y="70" width="75" height="35" rx="6" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
      <text x="57.5" y="87" fill="#1C1917" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">WAV Upload</text>
      <text x="57.5" y="98" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">MD5 Hashed</text>

      {/* MD5 Cache Engine */}
      <rect x="125" y="40" width="130" height="95" rx="10" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
      <text x="190" y="63" fill="#D97706" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">FastAPI MD5 Cache</text>
      <text x="190" y="82" fill="#1C1917" fontSize="9" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="600">Verification Gate</text>
      
      {/* Cache routes */}
      <line x1="135" y1="95" x2="245" y2="95" stroke="#E6E1DA" strokeWidth="1" />
      <text x="190" y="110" fill="#059669" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">{"Hit -> Immediate URL"}</text>
      <text x="190" y="122" fill="#C2410C" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">{"Miss -> RunPod Demucs"}</text>

      {/* Storage signed URLs */}
      <rect x="285" y="68" width="75" height="40" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="1.5" />
      <text x="322.5" y="86" fill="#059669" fontSize="8" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="bold">GCS Signed</text>
      <text x="322.5" y="98" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">$0 GPU Cost Hit</text>

      <path d="M 95 87 L 125 87" stroke="#D8D2C7" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 255 87 L 285 87" stroke="#059669" strokeWidth="1.5" />
    </svg>
  );
}
