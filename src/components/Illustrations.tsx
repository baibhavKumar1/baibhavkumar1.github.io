"use client";

import React from "react";

// Single-Color Case Study 1: Multi-Agent Systems Line Art
export function MultiAgentDiagram() {
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="180" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      
      {/* Central Hub */}
      <circle cx="190" cy="90" r="30" fill="#FFFFFF" stroke="#1447e6" strokeWidth="1.5" />
      <text x="190" y="94" fill="#1447e6" fontSize="11" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">DAG HUB</text>

      {/* Satellite Nodes */}
      <circle cx="70" cy="45" r="20" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <text x="70" y="48" fill="#1447e6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Parser</text>

      <circle cx="310" cy="45" r="20" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <text x="310" y="48" fill="#1447e6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Analyst</text>

      <circle cx="70" cy="135" r="20" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <text x="70" y="138" fill="#1447e6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Critic</text>

      <circle cx="310" cy="135" r="20" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <text x="310" y="138" fill="#1447e6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Auditor</text>

      {/* Connectors */}
      <line x1="88" y1="56" x2="162" y2="78" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="292" y1="56" x2="218" y2="78" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="88" y1="124" x2="162" y2="102" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="292" y1="124" x2="218" y2="102" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

// Single-Color Case Study 2: Hybrid RAG & Vector Line Art
export function HybridRagDiagram() {
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="180" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      
      <circle cx="100" cy="70" r="24" fill="#FFFFFF" stroke="#1447e6" strokeWidth="1.5" />
      <text x="100" y="74" fill="#1447e6" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">HNSW</text>

      <rect x="230" y="48" width="80" height="44" rx="8" fill="#FFFFFF" stroke="#1447e6" strokeWidth="1.5" />
      <text x="270" y="74" fill="#1447e6" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">BM25</text>

      <rect x="50" y="125" width="280" height="34" rx="8" fill="#FFFFFF" stroke="#1447e6" strokeWidth="1.5" />
      <text x="190" y="146" fill="#1447e6" fontSize="11" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">Cross-Encoder BGE Reranker</text>

      <path d="M 100 94 L 140 125" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 270 92 L 240 125" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

// Single-Color Case Study 3: Python Telemetry & Guardrail Proxy Line Art
export function GuardrailDiagram() {
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="180" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      
      <rect x="30" y="70" width="70" height="40" rx="8" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <text x="65" y="94" fill="#1447e6" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">RAW PII</text>

      <polygon points="190,35 235,60 235,120 190,145 145,120 145,60" fill="#FFFFFF" stroke="#1447e6" strokeWidth="2" />
      <text x="190" y="93" fill="#1447e6" fontSize="11" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">PYTHON PROXY</text>

      <rect x="280" y="70" width="70" height="40" rx="8" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <text x="315" y="94" fill="#1447e6" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">CLEAN</text>

      <path d="M 100 90 L 145 90" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 235 90 L 280 90" stroke="#1447e6" strokeWidth="1.5" />
    </svg>
  );
}

// Single-Color Case Study 4: Data Engineering / ETL Pipeline Line Art
export function EtlPipelineDiagram() {
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="180" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      
      {/* Input Sources */}
      <rect x="25" y="45" width="70" height="35" rx="6" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <text x="60" y="66" fill="#1447e6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">S3 / Kafka</text>

      <rect x="25" y="100" width="70" height="35" rx="6" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <text x="60" y="121" fill="#1447e6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">SQL Logs</text>

      {/* ETL Core Engine */}
      <rect x="140" y="45" width="100" height="90" rx="10" fill="#FFFFFF" stroke="#1447e6" strokeWidth="1.5" />
      <text x="190" y="80" fill="#1447e6" fontSize="11" fontFamily="Space Grotesk" textAnchor="middle" fontWeight="bold">PySpark / DuckDB</text>
      <text x="190" y="98" fill="#64748B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Feature Extractor</text>

      {/* Feature Store Output */}
      <rect x="285" y="70" width="70" height="40" rx="6" fill="#FFFFFF" stroke="#1447e6" strokeWidth="1.5" />
      <text x="320" y="88" fill="#1447e6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">PARQUET</text>
      <text x="320" y="100" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Feature Store</text>

      {/* Connections */}
      <path d="M 95 62 L 140 70" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 95 117 L 140 110" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 240 90 L 285 90" stroke="#1447e6" strokeWidth="1.5" />
    </svg>
  );
}
