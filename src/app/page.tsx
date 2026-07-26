"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Mail, 
  Linkedin, 
  Github, 
  Maximize2, 
  X,
  UserCheck,
  Code2
} from "lucide-react";

import { 
  MultiAgentDiagram, 
  HybridRagDiagram, 
  GuardrailDiagram, 
  EtlPipelineDiagram 
} from "@/components/Illustrations";

export default function Home() {
  // Active Project EDD Modal
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [activeEddTab, setActiveEddTab] = useState<"overview" | "architecture" | "tradeoffs" | "metrics">("overview");

  // Copy Status
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Core Production Systems (Individual Contributor Role)
  const coreICProjects = [
    {
      id: "omnigraph",
      title: "OmniGraph Agent Orchestrator",
      subtitle: "Enterprise Multi-Agent Workflow Engine",
      roleBadge: "Individual Contributor · Core Platform Team",
      category: "Multi-Agent Systems",
      stat: "99.4%",
      statLabel: "DAG Task Success",
      diagram: <MultiAgentDiagram />,
      description: "Stateful asynchronous Python multi-agent DAG engine with Redis checkpointing, human-in-the-loop validation, and streaming trace telemetry.",
      problem: "Enterprise financial audits and document processing fail under single-turn LLM prompts due to missing state persistence and lack of human intervention safeguards.",
      architecture: "Built on Python, FastAPI, LangGraph, and Redis. Breaks monolithic tasks into specialized sub-agent nodes (Parser, Analyst, Critic, Auditor) with human-in-the-loop pause/resume checkpoints and a Next.js TypeScript interface.",
      tradeoffs: [
        { topic: "LangGraph vs CrewAI", choice: "LangGraph (Python)", rationale: "LangGraph provides explicit state graphs and fine-grained control over cyclical agent loops and Redis checkpoint persistence in Python." },
        { topic: "State Persistence", choice: "Redis + Postgres", rationale: "Redis handles sub-5ms volatile state checkpointing during active agent execution, while Postgres persists audit trails long-term." }
      ],
      metrics: [
        { label: "Task Success Rate", value: "99.4%" },
        { label: "Median Loop Latency", value: "450ms" },
        { label: "Cost Savings", value: "42%" }
      ],
      stack: ["Python", "LangGraph", "FastAPI", "Redis", "TypeScript", "Next.js", "WebSockets", "Docker"]
    },
    {
      id: "sovereignrag",
      title: "SovereignRAG Knowledge Engine",
      subtitle: "Multi-Tenant Hybrid Vector & Graph Retrieval",
      roleBadge: "Individual Contributor · AI Infrastructure",
      category: "RAG & Vector Architecture",
      stat: "94.2%",
      statLabel: "Context Recall",
      diagram: <HybridRagDiagram />,
      description: "Scalable multi-tenant hybrid search engine using pgvector HNSW indexing, LlamaIndex parent-document retrieval, BGE-Reranker, and chunk-level RBAC.",
      problem: "Standard vector databases struggle with enterprise multi-tenancy, authorization filtering, and exact keyword precision (e.g. part numbers or legal codes).",
      architecture: "Combines dense vector embeddings with sparse BM25 keyword matching inside PostgreSQL pgvector, followed by a BGE cross-encoder reranker managed via Python LlamaIndex pipeline and TypeScript UI.",
      tradeoffs: [
        { topic: "pgvector vs Pinecone", choice: "pgvector (PostgreSQL)", rationale: "Eliminated cross-cloud network hops and maintained strict data residency inside client VPC, cutting infrastructure bill by 68%." },
        { topic: "Hybrid vs Dense Only", choice: "Dense + Sparse + Reranker", rationale: "Dense retrieval alone missed exact serial codes; hybrid search boosted context recall from 71% to 94.2%." }
      ],
      metrics: [
        { label: "Context Recall", value: "94.2%" },
        { label: "P99 Retrieval Latency", value: "280ms" },
        { label: "Infra Cost Savings", value: "68%" }
      ],
      stack: ["Python", "PostgreSQL", "pgvector", "LlamaIndex", "Cohere Rerank", "FastAPI", "TypeScript", "Next.js"]
    }
  ];

  // Independent Engineering Projects
  const independentProjects = [
    {
      id: "telemetrypulse",
      title: "TelemetryPulse LLMOps Gateway",
      subtitle: "Real-Time Proxy & Cost Optimization Plane",
      roleBadge: "Independent Project",
      category: "LLMOps & Telemetry",
      stat: "<6ms",
      statLabel: "Proxy Overhead",
      diagram: <GuardrailDiagram />,
      description: "High-throughput Python AsyncIO reverse proxy for real-time LLM telemetry, automated PII scrubbing, fallback provider routing, and token cost budgeting.",
      problem: "Unmonitored LLM consumption leads to unexpected monthly cloud bill spikes, compliance leaks (PII/PHI), and single-provider downtime vulnerabilities.",
      architecture: "Positioned as a zero-overhead gateway between client apps and upstream LLM providers. Built on Python AsyncIO & Pydantic V2 for sub-6ms PII regex scrubbing, Langfuse tracing, and fallback model routing.",
      tradeoffs: [
        { topic: "AsyncIO vs Sync Flask", choice: "Python AsyncIO (uvicorn)", rationale: "Python AsyncIO handled 12k concurrent requests at <6ms overhead using non-blocking event loops, avoiding thread pool exhaustion." },
        { topic: "Local Guardrail Engine", choice: "NeMo Guardrails + ONNX", rationale: "Executed local PII detection models in ONNX via Python runtime to keep guardrail processing latency under 8ms." }
      ],
      metrics: [
        { label: "Proxy Overhead", value: "<6ms" },
        { label: "PII Prevention", value: "100%" },
        { label: "Token Savings", value: "$18.4k/mo" }
      ],
      stack: ["Python", "FastAPI", "Pydantic V2", "Langfuse", "NeMo Guardrails", "TypeScript", "Next.js", "Prometheus"]
    },
    {
      id: "datapulse",
      title: "DataPulse ETL & Feature Pipeline",
      subtitle: "High-Throughput PySpark & DuckDB Store",
      roleBadge: "Independent Project",
      category: "Data Science & ETL",
      stat: "1.2M",
      statLabel: "Events Processed / Sec",
      diagram: <EtlPipelineDiagram />,
      description: "Scalable Python data engineering pipeline using PySpark, DuckDB, and Parquet for automated data cleaning, feature extraction, and real-time model ingestion.",
      problem: "Raw unformatted enterprise logs and unstructured documents require automated schema validation, deduplication, and feature vectorization before feeding downstream ML models.",
      architecture: "Built using Python, PySpark, DuckDB, and FastAPI. Ingests streaming data from Kafka/S3, executes schema checks with Great Expectations, and registers embeddings into pgvector & Parquet feature store.",
      tradeoffs: [
        { topic: "DuckDB vs PySpark", choice: "DuckDB + PySpark", rationale: "DuckDB provided zero-copy memory querying for fast local feature validation, while PySpark handled multi-terabyte batch cluster runs." },
        { topic: "Parquet vs JSON", choice: "Apache Parquet", rationale: "Columnar Parquet compression reduced storage footprint by 74% and accelerated feature extraction queries by 5.8x." }
      ],
      metrics: [
        { label: "Throughput Rate", value: "1.2M evt/s" },
        { label: "Storage Reduction", value: "74%" },
        { label: "Feature Latency", value: "<12ms" }
      ],
      stack: ["Python", "PySpark", "DuckDB", "PostgreSQL", "FastAPI", "Apache Parquet", "Docker", "TypeScript"]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-prussian font-sans text-base selection:bg-prussian selection:text-white relative overflow-x-hidden">
      {/* Supermemory Minimalist Ultra-Wide Navigation Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1536px]">
        <nav className="minimal-nav px-10 py-5 rounded-full flex items-center justify-between shadow-sm">
          <a href="#" className="font-heading font-bold text-xl tracking-tight text-prussian flex items-center gap-3">
            <span>Baibhav Kumar</span>
            <span className="hidden sm:inline-block text-base font-mono-custom text-[#64748B] border-l border-slate-200 pl-4">Fullstack AI Engineer</span>
          </a>

          <div className="hidden md:flex items-center gap-12 text-base font-mono-custom text-[#475569]">
            <a href="#production-contributions" className="hover:text-prussian transition-colors">Production IC Work</a>
            <a href="#independent-projects" className="hover:text-prussian transition-colors">Independent Projects</a>
            <a href="#architecture" className="hover:text-prussian transition-colors">Topology</a>
            <a href="#experience" className="hover:text-prussian transition-colors">Experience</a>
          </div>

          <a 
            href="#contact"
            className="px-7 py-3 bg-prussian text-white font-medium rounded-full hover:bg-slate-800 transition-all text-base font-mono-custom shadow-sm"
          >
            Get in Touch
          </a>
        </nav>
      </header>

      {/* Clean Minimalist Hero Section */}
      <section className="pt-44 pb-24 px-6 md:px-12 w-[95%] max-w-[1536px] mx-auto text-center flex flex-col items-center">
        {/* Positioning Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-prussian text-base font-mono-custom mb-8 shadow-sm">
          <span>Fullstack AI Engineer · Python & TypeScript Infrastructure</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-prussian leading-[1.06] mb-8 max-w-6xl">
          Building Multi-Agent Systems & Scalable GenAI Infrastructure.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xl md:text-2xl text-[#475569] font-light leading-relaxed mb-10 max-w-4xl">
          Fullstack AI Engineer crafting production LangGraph multi-agent DAGs, PostgreSQL pgvector hybrid search, Python PySpark data ETL pipelines, and Next.js TypeScript web applications.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a 
            href="#production-contributions"
            className="px-9 py-4 bg-prussian text-white font-semibold rounded-full hover:bg-slate-800 transition-all flex items-center gap-3 text-base shadow-sm"
          >
            View Production IC Work
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <a 
            href="#contact"
            className="px-9 py-4 bg-white border border-slate-300 hover:border-prussian text-prussian font-medium rounded-full transition-all text-base font-mono-custom"
          >
            Contact Baibhav
          </a>
        </div>
      </section>

      {/* SECTION 1: Production System Contributions (Individual Contributor Role) */}
      <section id="production-contributions" className="py-24 px-6 md:px-12 w-[95%] max-w-[1536px] mx-auto border-t border-slate-200">
        <div className="mb-14">
          <span className="text-base font-mono-custom text-[#64748B] uppercase tracking-widest flex items-center gap-2 mb-2">
            <UserCheck className="w-4 h-4 text-prussian" /> Primary Production Work (Individual Contributor)
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-prussian tracking-tight">Enterprise Production Systems</h2>
          <p className="text-[#475569] text-xl font-light mt-3 max-w-3xl">
            Core production systems built as an individual contributor in cross-functional engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {coreICProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                setActiveProject(project);
                setActiveEddTab("overview");
              }}
              className="minimal-card rounded-3xl p-8 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <span className="text-base font-mono-custom px-3.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-[#475569]">
                    {project.roleBadge}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-prussian hover:bg-prussian hover:text-white transition-all">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                  <div className="md:col-span-5 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    {project.diagram}
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-prussian mb-2 hover:underline">
                      {project.title}
                    </h3>
                    <p className="text-base font-mono-custom text-[#64748B] mb-3">{project.subtitle}</p>
                    <p className="text-[#475569] text-base leading-relaxed line-clamp-3 font-light">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-heading font-bold text-prussian">{project.stat}</div>
                    <div className="text-base text-[#64748B] font-mono-custom">{project.statLabel}</div>
                  </div>
                  <span className="text-base font-mono-custom text-prussian flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Production Deployed
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                  {project.stack.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="text-base font-mono-custom bg-slate-100 text-[#475569] px-3.5 py-1 rounded-xl border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Independent / Specialized Projects */}
      <section id="independent-projects" className="py-24 px-6 md:px-12 w-[95%] max-w-[1536px] mx-auto border-t border-slate-200">
        <div className="mb-14">
          <span className="text-base font-mono-custom text-[#64748B] uppercase tracking-widest flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-prussian" /> Specialized Implementations
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-prussian tracking-tight">Independent Projects & Data Pipelines</h2>
          <p className="text-[#475569] text-xl font-light mt-3 max-w-3xl">
            Custom telemetry gateways, PySpark ETL pipelines, and specialized AI developer tools.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {independentProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                setActiveProject(project);
                setActiveEddTab("overview");
              }}
              className="minimal-card rounded-3xl p-8 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <span className="text-base font-mono-custom px-3.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-[#475569]">
                    {project.roleBadge}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-prussian hover:bg-prussian hover:text-white transition-all">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                  <div className="md:col-span-5 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    {project.diagram}
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-prussian mb-2 hover:underline">
                      {project.title}
                    </h3>
                    <p className="text-base font-mono-custom text-[#64748B] mb-3">{project.subtitle}</p>
                    <p className="text-[#475569] text-base leading-relaxed line-clamp-3 font-light">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-heading font-bold text-prussian">{project.stat}</div>
                    <div className="text-base text-[#64748B] font-mono-custom">{project.statLabel}</div>
                  </div>
                  <span className="text-base font-mono-custom text-prussian flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Verified Benchmark
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                  {project.stack.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="text-base font-mono-custom bg-slate-100 text-[#475569] px-3.5 py-1 rounded-xl border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study EDD Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-300 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-prussian hover:bg-slate-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-12">
                <span className="text-base font-mono-custom px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-prussian font-semibold mb-3 inline-block">
                  ENGINEERING DESIGN DOC · {activeProject.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-prussian mb-2">
                  {activeProject.title}
                </h2>
                <p className="text-base font-mono-custom text-[#64748B]">{activeProject.subtitle}</p>
              </div>

              {/* Modal Tabs */}
              <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 mb-8">
                <button
                  onClick={() => setActiveEddTab("overview")}
                  className={`px-5 py-2 rounded-xl text-base font-mono-custom transition-all ${
                    activeEddTab === "overview" ? "bg-prussian text-white font-bold" : "text-[#64748B] hover:text-prussian"
                  }`}
                >
                  Overview & Problem
                </button>
                <button
                  onClick={() => setActiveEddTab("architecture")}
                  className={`px-5 py-2 rounded-xl text-base font-mono-custom transition-all ${
                    activeEddTab === "architecture" ? "bg-prussian text-white font-bold" : "text-[#64748B] hover:text-prussian"
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setActiveEddTab("tradeoffs")}
                  className={`px-5 py-2 rounded-xl text-base font-mono-custom transition-all ${
                    activeEddTab === "tradeoffs" ? "bg-prussian text-white font-bold" : "text-[#64748B] hover:text-prussian"
                  }`}
                >
                  Trade-offs
                </button>
                <button
                  onClick={() => setActiveEddTab("metrics")}
                  className={`px-5 py-2 rounded-xl text-base font-mono-custom transition-all ${
                    activeEddTab === "metrics" ? "bg-prussian text-white font-bold" : "text-[#64748B] hover:text-prussian"
                  }`}
                >
                  Metrics
                </button>
              </div>

              {activeEddTab === "overview" && (
                <div className="space-y-6 text-[#475569] leading-relaxed">
                  <div>
                    <h4 className="text-prussian font-heading font-semibold text-xl mb-2">The Problem</h4>
                    <p className="text-base font-light">{activeProject.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-prussian font-heading font-semibold text-xl mb-2">The Architecture</h4>
                    <p className="text-base font-light">{activeProject.architecture}</p>
                  </div>
                </div>
              )}

              {activeEddTab === "architecture" && (
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <p className="text-base font-mono-custom text-prussian leading-relaxed">
                    {activeProject.architecture}
                  </p>
                </div>
              )}

              {activeEddTab === "tradeoffs" && (
                <div className="space-y-4">
                  {activeProject.tradeoffs.map((item: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-heading font-bold text-prussian">{item.topic}</span>
                        <span className="text-base font-mono-custom text-prussian bg-white px-3 py-1 rounded-full border border-slate-300">
                          Selected: {item.choice}
                        </span>
                      </div>
                      <p className="text-base text-[#475569] font-light leading-relaxed">
                        {item.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeEddTab === "metrics" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeProject.metrics.map((m: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center">
                      <div className="text-3xl font-heading font-bold text-prussian mb-1">{m.value}</div>
                      <div className="text-base text-[#64748B] font-mono-custom">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8XL System Architecture Section */}
      <section id="architecture" className="py-24 px-6 md:px-12 w-[95%] max-w-[1536px] mx-auto border-t border-slate-200">
        <div className="mb-12">
          <span className="text-base font-mono-custom text-[#64748B] uppercase tracking-widest block mb-2">System Stack</span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-prussian tracking-tight">Fullstack AI Topology</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <span className="text-base font-mono-custom text-[#64748B] block mb-2">Layer 01 — Orchestration</span>
              <h3 className="text-2xl font-heading font-bold text-prussian mb-3">LangGraph Multi-Agent DAG</h3>
              <p className="text-[#475569] text-base leading-relaxed font-light mb-6">
                Stateful asynchronous workflow breakdown with Redis state checkpoints and human-in-the-loop intervention gates.
              </p>
            </div>
            <span className="text-base font-mono-custom text-prussian bg-white px-4 py-2 rounded-xl border border-slate-300 self-start">
              Python / LangGraph / Redis
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <span className="text-base font-mono-custom text-[#64748B] block mb-2">Layer 02 — Knowledge Engine</span>
              <h3 className="text-2xl font-heading font-bold text-prussian mb-3">PostgreSQL pgvector Hybrid RAG</h3>
              <p className="text-[#475569] text-base leading-relaxed font-light mb-6">
                Multi-tenant dense HNSW vector embeddings combined with BM25 sparse search and Cohere cross-encoder reranking.
              </p>
            </div>
            <span className="text-base font-mono-custom text-prussian bg-white px-4 py-2 rounded-xl border border-slate-300 self-start">
              Python / pgvector / LlamaIndex
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <span className="text-base font-mono-custom text-[#64748B] block mb-2">Layer 03 — Telemetry & Guardrails</span>
              <h3 className="text-2xl font-heading font-bold text-prussian mb-3">Python AsyncIO Proxy Gateway</h3>
              <p className="text-[#475569] text-base leading-relaxed font-light mb-6">
                High-throughput Python AsyncIO reverse proxy delivering sub-6ms PII regex scrubbing, token cost budgeting, and Langfuse tracing.
              </p>
            </div>
            <span className="text-base font-mono-custom text-prussian bg-white px-4 py-2 rounded-xl border border-slate-300 self-start">
              Python AsyncIO / Pydantic V2
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <span className="text-base font-mono-custom text-[#64748B] block mb-2">Layer 04 — Data Pipelines</span>
              <h3 className="text-2xl font-heading font-bold text-prussian mb-3">PySpark & DuckDB Feature Store</h3>
              <p className="text-[#475569] text-base leading-relaxed font-light mb-6">
                High-throughput PySpark batch processing combined with DuckDB zero-copy in-memory querying for feature extraction.
              </p>
            </div>
            <span className="text-base font-mono-custom text-prussian bg-white px-4 py-2 rounded-xl border border-slate-300 self-start">
              PySpark / DuckDB / Parquet
            </span>
          </div>
        </div>
      </section>

      {/* 8XL Work Experience Section */}
      <section id="experience" className="py-24 px-6 md:px-12 w-[95%] max-w-[1536px] mx-auto border-t border-slate-200">
        <span className="text-base font-mono-custom text-[#64748B] uppercase tracking-widest block mb-2">Career History</span>
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-prussian tracking-tight mb-12">Work Experience</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-prussian">Fullstack AI Engineer</h3>
                  <p className="text-base font-mono-custom text-[#64748B]">NeuralScale Labs · Full-time</p>
                </div>
                <span className="text-base font-mono-custom text-prussian bg-white px-4 py-1.5 rounded-full border border-slate-300">2024 — Present</span>
              </div>
              <p className="text-[#475569] text-lg font-light leading-relaxed mb-6">
                Engineered multi-agent LangGraph workflow pipelines, PostgreSQL pgvector hybrid retrieval engines, and Next.js TypeScript web applications.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 font-mono-custom text-base text-[#475569] pt-4 border-t border-slate-200">
              <span className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-300">✓ Built LangGraph Redis state engine</span>
              <span className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-300">✓ 99.4% DAG task execution success</span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-prussian">Software Engineer</h3>
                  <p className="text-base font-mono-custom text-[#64748B]">Apex Global Tech · Full-time</p>
                </div>
                <span className="text-base font-mono-custom text-prussian bg-white px-4 py-1.5 rounded-full border border-slate-300">2023 — 2024</span>
              </div>
              <p className="text-[#475569] text-lg font-light leading-relaxed mb-6">
                Developed high-concurrency Python FastAPI microservices, PostgreSQL databases, and React/Next.js frontend user interfaces.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 font-mono-custom text-base text-[#475569] pt-4 border-t border-slate-200">
              <span className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-300">✓ Shipped pgvector hybrid search</span>
              <span className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-300">✓ Built Python AsyncIO proxies</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8XL Footer */}
      <footer id="contact" className="py-24 px-6 w-[95%] max-w-[1536px] mx-auto border-t border-slate-200 text-center">
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-[36px] p-12 md:p-16 shadow-sm">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-prussian tracking-tight mb-6">
            Let’s build high-impact AI systems together.
          </h2>
          <p className="text-[#475569] text-xl max-w-2xl mx-auto font-light mb-10 leading-relaxed">
            Open for Fullstack AI Engineer & AI Systems Engineer roles. Feel free to reach out via email or connect on LinkedIn.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a 
              href="mailto:baibhavkumar.work@gmail.com"
              className="px-8 py-4 bg-prussian text-white font-semibold rounded-full hover:bg-slate-800 transition-all flex items-center gap-3 text-base shadow-sm"
            >
              baibhavkumar.work@gmail.com
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <button 
              onClick={() => {
                navigator.clipboard.writeText("baibhavkumar.work@gmail.com");
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
              }}
              className="px-6 py-4 bg-white border border-slate-300 hover:border-prussian text-prussian rounded-full transition-all text-base font-mono-custom flex items-center gap-2"
            >
              {copiedEmail ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5 text-prussian" />}
              <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-[#475569]">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-prussian transition-colors p-2" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-prussian transition-colors p-2" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-12 text-base font-mono-custom text-[#64748B] flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Baibhav Kumar. Minimalist Fullstack AI Portfolio.</span>
          <span>Fullstack AI Engineer</span>
        </div>
      </footer>
    </div>
  );
}
