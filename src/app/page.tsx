"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Copy, 
  Check, 
  Mail, 
  Linkedin, 
  Plus, 
  Globe,
  BookOpen,
  FileText
} from "lucide-react";

import { 
  WhatsAppCoexistenceDiagram, 
  ClouderyMcpDiagram, 
  GuideAutoFunnelDiagram, 
  MusicBuddyCacheDiagram 
} from "@/components/Illustrations";
import TactileShaderCanvas from "@/components/TactileShaderCanvas";

export default function Home() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("baibhavkumar.work@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projects = [
    {
      id: "whatsappcoex",
      title: "WhatsApp Coexistence Proxy",
      tagline: "Automate WhatsApp customer support without losing your native phone app access.",
      metric: "100% Message Sync",
      url: "https://github.com/baibhavkumar1/whatsapp-provider",
      problem: "Using standard WhatsApp business APIs normally locks you out of your personal phone app. Businesses lose direct access to native calls, search history, and normal manual chats once they activate automations.",
      solution: "Built a custom sync bridge that allows automated chat sequences and human agents to use the exact same phone number simultaneously. It acts as an intelligent traffic controller—routing webhook events and app messages in real time so your phone app and AI assistant coexist seamlessly with zero message conflicts.",
      illustration: <WhatsAppCoexistenceDiagram />,
      stack: ["Node.js", "Express", "Redis", "Meta API", "PostgreSQL", "Docker"]
    },
    {
      id: "clouderymcp",
      title: "Cloudery Remote MCP Gate",
      tagline: "A secure cloud gateway for hosting and executing remote AI agent tools.",
      metric: "<12ms Edge Routing",
      url: "https://github.com/baibhavkumar1/tinycloud",
      problem: "Giving AI agents access to databases and external tools requires opening public connections. This creates massive security vulnerabilities, making systems vulnerable to unauthorized commands.",
      solution: "Created a secure proxy gateway that sits between AI agents and external tools. It screens every request using granular access policies and instantly boots up isolated, secure temporary environments to run tools safely, scaling down to zero when idle to save server costs.",
      illustration: <ClouderyMcpDiagram />,
      stack: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "Google Cloud Run", "SSE"]
    },
    {
      id: "guide",
      title: "Guide: Educational Insights",
      tagline: "Interactive learning companion that answers student questions directly inside videos.",
      metric: "92.4% Answer Recall",
      url: "https://github.com/baibhavkumar1/guide",
      problem: "Students struggle to find specific answers inside long educational videos, while creators are overwhelmed trying to answer the exact same questions repeatedly in comments.",
      solution: "Developed an educational companion app that lets students click any part of a video to instantly get precise, AI-summarized insights. For creators, the system auto-analyzes comment sections and instantly publishes accurate, timestamped answers under repetitive questions.",
      illustration: <GuideAutoFunnelDiagram />,
      stack: ["Flutter", "Dart", "Firebase", "Google Genkit", "Gemini Pro", "OAuth 2.0"]
    },
    {
      id: "musicbuddy",
      title: "MusicBuddy Stem Splitter",
      tagline: "Split music tracks into vocal and instrument stems with zero wasted GPU bills.",
      metric: "$0.00 Duplicate Cost",
      url: "https://github.com/baibhavkumar1/musicbuddy",
      problem: "Running machine learning audio splitting models is extremely CPU and GPU intensive. Repeating the same split process for identical or duplicate songs runs up massive, redundant cloud computing bills.",
      solution: "Optimized the processing pipeline by checking file fingerprints (MD5 hashes) before triggering high-cost GPU nodes. If a song has been split before, the system instantly delivers the cached audio stems, dropping redundant processing to absolute zero.",
      illustration: <MusicBuddyCacheDiagram />,
      stack: ["FastAPI", "Python", "RunPod", "GCP Storage", "Firestore", "MD5 Hash"]
    }
  ];

  const principles = [
    {
      title: "Coexistence over Disruption",
      description: "Software should adapt to real-world business habits. I design automations that work alongside standard manual tools, avoiding forced migrations or broken workflows."
    },
    {
      title: "Cost-Conscious Design",
      description: "Cloud computing and GPUs are expensive. I optimize systems using smart caching, direct client uploads, and scale-to-zero microservices to keep operations highly efficient."
    },
    {
      title: "Secure by Default",
      description: "AI tools require strict boundaries. I sandbox execution environments and strictly isolate third-party integrations to keep data and infrastructure secure."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#D97706] selection:text-white relative overflow-x-hidden">
      
      {/* Real-time Bayer Dithered Fluid Noise Shader Overlay */}
      <TactileShaderCanvas density={0.4} />

      <div className="max-w-2xl md:max-w-3xl mx-auto px-6 py-12 md:py-24 relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-16 md:mb-24">
          <div>
            <span className="font-serif-custom text-xl font-bold tracking-tight">Baibhav Kumar</span>
            <span className="text-xs block font-mono-custom text-[#78716C] mt-1">Design & Systems Engineer</span>
          </div>
          <div className="flex gap-4 text-xs font-mono-custom items-center">
            <Link href="/dither" className="text-[#D97706] hover:text-[#B45309] font-semibold transition-colors">Dither Demo</Link>
            <a href="#work" className="text-[#78716C] hover:text-[#1C1917] transition-colors">Work</a>
            <a href="#principles" className="text-[#78716C] hover:text-[#1C1917] transition-colors">Principles</a>
            <a href="https://medium.com" target="_blank" rel="noreferrer" className="text-[#78716C] hover:text-[#1C1917] transition-colors">Medium</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-[#D97706] hover:text-[#B45309] font-semibold transition-colors">Resume</a>
            <a href="#connect" className="text-[#78716C] hover:text-[#1C1917] transition-colors">Connect</a>
          </div>
        </header>

        {/* Hero */}
        <section className="mb-20 md:mb-28">
          <h1 className="text-3xl md:text-5xl font-serif-custom font-normal leading-[1.15] tracking-tight text-[#1C1917] mb-6">
            Designing stable systems and clean experiences for the AI era.
          </h1>
          <p className="text-base md:text-lg text-[#78716C] font-normal leading-relaxed">
            I’m a Fullstack & AI Systems Engineer. I build reliable developer tools, secure cloud APIs, and high-performance automated integrations that fit seamlessly into production workflows.
          </p>
        </section>

        {/* Selected Work */}
        <section id="work" className="mb-20 md:mb-28">
          <h2 className="text-xs font-mono-custom uppercase tracking-wider text-[#A8A29E] mb-8">Selected Work</h2>
          <div className="divide-y divide-[#E6E1DA] border-t border-b border-[#E6E1DA]">
            {projects.map((project) => {
              const isExpanded = expandedId === project.id;
              const isBlurred = hoveredId && hoveredId !== project.id;
              
              return (
                <div 
                  key={project.id} 
                  className={`py-4 transition-all duration-300 ${
                    isBlurred ? "opacity-35 blur-[0.6px]" : "opacity-100 blur-0"
                  }`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="w-full flex items-center justify-between text-left py-2 group cursor-pointer"
                  >
                    <div className="pr-4">
                      <h3 className="text-lg md:text-xl font-serif-custom font-semibold text-[#1C1917] group-hover:text-[#D97706] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#78716C] mt-1 max-w-xl font-normal leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="hidden sm:inline-block text-xs font-mono-custom text-[#D97706] font-medium bg-[#FFFBEB] border border-[#FEF3C7] px-2.5 py-1 rounded-full">
                        {project.metric}
                      </span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="text-[#78716C] group-hover:text-[#1C1917]"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-6 space-y-6 text-sm text-[#1C1917] leading-relaxed">
                          {/* Mobile Stat Display */}
                          <div className="sm:hidden inline-block text-xs font-mono-custom text-[#D97706] font-medium bg-[#FFFBEB] border border-[#FEF3C7] px-2.5 py-1 rounded-full mb-3">
                            {project.metric}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-xs font-mono-custom text-[#A8A29E] uppercase tracking-wider mb-1">The Problem</h4>
                                <p className="text-[#78716C] font-normal leading-relaxed">{project.problem}</p>
                              </div>
                              <div>
                                <h4 className="text-xs font-mono-custom text-[#A8A29E] uppercase tracking-wider mb-1">The Solution</h4>
                                <p className="text-[#1C1917] font-normal leading-relaxed">{project.solution}</p>
                              </div>
                              <div className="pt-2">
                                <a 
                                  href={project.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-mono-custom text-[#D97706] hover:text-[#B45309] font-semibold transition-colors"
                                >
                                  <span>View Repository & Code</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                              </div>
                              <div>
                                <h4 className="text-xs font-mono-custom text-[#A8A29E] uppercase tracking-wider mb-2">Technologies</h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {project.stack.map((tech, idx) => (
                                    <span key={idx} className="text-[11px] font-mono-custom text-[#1C1917] bg-[#FAF8F5] border border-[#E6E1DA] px-2 py-0.5 rounded">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="bg-white border border-[#E6E1DA] rounded-xl p-4 flex flex-col justify-center items-center shadow-xs">
                              <h4 className="text-[10px] font-mono-custom text-[#A8A29E] uppercase tracking-wider mb-3 w-full text-left">System Schematic</h4>
                              <div className="w-full">
                                {project.illustration}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Engineering Principles */}
        <section id="principles" className="mb-20 md:mb-28">
          <h2 className="text-xs font-mono-custom uppercase tracking-wider text-[#A8A29E] mb-8">Engineering Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base font-serif-custom font-semibold text-[#1C1917]">
                  {principle.title}
                </h3>
                <p className="text-sm text-[#78716C] font-normal leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section id="connect" className="mb-16">
          <h2 className="text-xs font-mono-custom uppercase tracking-wider text-[#A8A29E] mb-8">Connect</h2>
          <div className="bg-[#F5F2EC] border border-[#E6E1DA] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-serif-custom font-semibold text-[#1C1917]">Let's collaborate on robust systems.</h3>
              <p className="text-sm text-[#78716C] font-normal leading-relaxed">
                Open to senior engineering opportunities and design collaborations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none px-5 py-3 bg-[#1C1917] text-[#FAF8F5] rounded-xl font-mono-custom text-xs font-medium hover:bg-[#D97706] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>Resume PDF</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex-1 md:flex-none px-5 py-3 bg-white border border-[#E6E1DA] hover:border-[#1C1917] text-[#1C1917] rounded-xl font-mono-custom text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-[#059669]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
              </button>

              <a
                href="mailto:baibhavkumar.work@gmail.com"
                className="flex-1 md:flex-none px-5 py-3 bg-white border border-[#E6E1DA] hover:border-[#1C1917] text-[#1C1917] rounded-xl font-mono-custom text-xs font-medium transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Direct</span>
              </a>

              <a
                href="https://medium.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none px-5 py-3 bg-white border border-[#E6E1DA] hover:border-[#1C1917] text-[#1C1917] rounded-xl font-mono-custom text-xs font-medium transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Medium</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white border border-[#E6E1DA] hover:border-[#1C1917] text-[#1C1917] rounded-xl transition-all flex items-center justify-center"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-[#E6E1DA] text-center text-xs font-mono-custom text-[#78716C] flex justify-between items-center">
          <p>© {new Date().getFullYear()} Baibhav Kumar</p>
          <p className="flex items-center gap-1">
            <Globe className="w-3 h-3" /> India
          </p>
        </footer>

      </div>
    </div>
  );
}
