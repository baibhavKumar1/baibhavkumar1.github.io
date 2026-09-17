"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, RotateCcw, Sparkles } from "lucide-react";
import InteractiveDither, { DitherConfig } from "@/components/InteractiveDither";

const PRESETS: Record<string, Partial<DitherConfig> & { name: string }> = {
  classic: {
    name: "Classic Retro (Amber)",
    bgColor: "#120f17",
    waveColor: "#d97706",
    waveSpeed: 0.05,
    waveFrequency: 4.0,
    waveAmplitude: 0.15,
    colorNum: 4,
    pixelSize: 2,
  },
  matrix: {
    name: "Matrix Code (Emerald)",
    bgColor: "#080c0a",
    waveColor: "#059669",
    waveSpeed: 0.08,
    waveFrequency: 6.0,
    waveAmplitude: 0.1,
    colorNum: 3,
    pixelSize: 3,
  },
  nordic: {
    name: "Nordic Frost",
    bgColor: "#0f172a",
    waveColor: "#38bdf8",
    waveSpeed: 0.03,
    waveFrequency: 3.0,
    waveAmplitude: 0.2,
    colorNum: 5,
    pixelSize: 2,
  },
  tactile: {
    name: "Warm Editorial (Portfolio)",
    bgColor: "#faf8f5",
    waveColor: "#78716c",
    waveSpeed: 0.04,
    waveFrequency: 3.5,
    waveAmplitude: 0.12,
    colorNum: 4,
    pixelSize: 25, // Extremely pixelated / print look
  },
  synthwave: {
    name: "Neon Synthwave",
    bgColor: "#1a062c",
    waveColor: "#ec4899",
    waveSpeed: 0.07,
    waveFrequency: 4.5,
    waveAmplitude: 0.18,
    colorNum: 6,
    pixelSize: 2,
  },
};

const DEFAULT_CONFIG: DitherConfig = {
  waveSpeed: 0.05,
  waveFrequency: 4.0,
  waveAmplitude: 0.15,
  pixelSize: 2,
  colorNum: 4,
  bgColor: "#120f17",
  waveColor: "#d97706",
  enableMouse: true,
  mouseRadius: 0.25,
};

export default function DitherDemoPage() {
  const [config, setConfig] = useState<DitherConfig>(DEFAULT_CONFIG);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("classic");

  const handlePresetSelect = (key: string) => {
    setActivePreset(key);
    setConfig((prev) => ({
      ...prev,
      ...PRESETS[key],
    }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setActivePreset("classic");
  };

  const handleCopyCode = () => {
    const codeString = `<Dither
  waveSpeed={${config.waveSpeed}}
  waveFrequency={${config.waveFrequency}}
  waveAmplitude={${config.waveAmplitude}}
  pixelSize={${config.pixelSize}}
  colorNum={${config.colorNum}}
  bgColor="${config.bgColor}"
  waveColor="${config.waveColor}"
  enableMouse={${config.enableMouse}}
  mouseRadius={${config.mouseRadius}}
/>`;
    navigator.clipboard.writeText(codeString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden selection:bg-[#D97706] selection:text-white font-sans">
      {/* Fullscreen Interactive Dither Canvas */}
      <InteractiveDither config={config} />

      {/* Decorative Overlay to blend with UI */}
      <div 
        className="absolute inset-0 pointer-events-none z-1" 
        style={{
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.2)"
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl px-4 py-8 md:py-12 flex flex-col gap-8">
        
        {/* Navigation */}
        <header className="flex justify-between items-center bg-white/70 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-4 shadow-sm">
          <Link 
            href="/"
            className="flex items-center gap-2 text-xs font-mono-custom text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-mono-custom text-[#D97706] font-semibold bg-[#FFFBEB] border border-[#FEF3C7] px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WebGL Dither Playground</span>
          </div>
        </header>

        {/* Title Section */}
        <div className="text-center md:text-left text-white drop-shadow-md">
          <h1 className="text-3xl md:text-5xl font-serif-custom font-bold leading-tight tracking-tight">
            Bayer Dither Shader
          </h1>
          <p className="text-sm md:text-base text-white/80 font-normal mt-2 max-w-xl">
            A retro-styled dithered wave background component built with WebGL and React. Tweak parameters in real-time or drag the cursor across the canvas to interact.
          </p>
        </div>

        {/* Dynamic Layout: Controls & Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Configuration Panel */}
          <section className="bg-white/95 backdrop-blur-lg border border-neutral-200/80 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
              <h2 className="text-base font-serif-custom font-semibold text-neutral-900">
                Configuration Panel
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[11px] font-mono-custom text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Reset to default settings"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Presets Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-custom text-neutral-400 uppercase tracking-wider block">
                Presets
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(PRESETS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handlePresetSelect(key)}
                    className={`px-3 py-2 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      activePreset === key
                        ? "border-[#D97706] bg-[#FFFBEB] text-[#D97706] font-semibold"
                        : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {value.name.split(" (")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Control Sliders */}
            <div className="space-y-4">
              {/* Wave Speed */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-neutral-500">Wave Speed</span>
                  <span className="text-neutral-950 font-medium">{config.waveSpeed}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.2"
                  step="0.01"
                  value={config.waveSpeed}
                  onChange={(e) => {
                    setActivePreset("");
                    setConfig((prev) => ({ ...prev, waveSpeed: parseFloat(e.target.value) }));
                  }}
                  className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-[#D97706]"
                />
              </div>

              {/* Wave Frequency */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-neutral-500">Wave Frequency</span>
                  <span className="text-neutral-950 font-medium">{config.waveFrequency}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.1"
                  value={config.waveFrequency}
                  onChange={(e) => {
                    setActivePreset("");
                    setConfig((prev) => ({ ...prev, waveFrequency: parseFloat(e.target.value) }));
                  }}
                  className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-[#D97706]"
                />
              </div>

              {/* Wave Amplitude */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-neutral-500">Wave Amplitude</span>
                  <span className="text-neutral-950 font-medium">{config.waveAmplitude}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={config.waveAmplitude}
                  onChange={(e) => {
                    setActivePreset("");
                    setConfig((prev) => ({ ...prev, waveAmplitude: parseFloat(e.target.value) }));
                  }}
                  className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-[#D97706]"
                />
              </div>

              {/* Pixel Size */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-neutral-500">Pixel Size / Grid Scale</span>
                  <span className="text-neutral-950 font-medium">{config.pixelSize}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={config.pixelSize}
                  onChange={(e) => {
                    setActivePreset("");
                    setConfig((prev) => ({ ...prev, pixelSize: parseInt(e.target.value) }));
                  }}
                  className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-[#D97706]"
                />
              </div>

              {/* Colors count */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-neutral-500">Color Depth (Steps)</span>
                  <span className="text-neutral-950 font-medium">{config.colorNum}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="16"
                  step="1"
                  value={config.colorNum}
                  onChange={(e) => {
                    setActivePreset("");
                    setConfig((prev) => ({ ...prev, colorNum: parseInt(e.target.value) }));
                  }}
                  className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-[#D97706]"
                />
              </div>

              {/* Mouse Radius */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-neutral-500">Mouse Push Radius</span>
                  <span className="text-neutral-950 font-medium">{config.mouseRadius}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.6"
                  step="0.01"
                  value={config.mouseRadius}
                  onChange={(e) => {
                    setConfig((prev) => ({ ...prev, mouseRadius: parseFloat(e.target.value) }));
                  }}
                  disabled={!config.enableMouse}
                  className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-[#D97706] disabled:opacity-40"
                />
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono-custom text-neutral-500">Canvas Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.bgColor}
                      onChange={(e) => {
                        setActivePreset("");
                        setConfig((prev) => ({ ...prev, bgColor: e.target.value }));
                      }}
                      className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden"
                    />
                    <span className="text-xs font-mono-custom text-neutral-800 uppercase">{config.bgColor}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono-custom text-neutral-500">Wave Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.waveColor}
                      onChange={(e) => {
                        setActivePreset("");
                        setConfig((prev) => ({ ...prev, waveColor: e.target.value }));
                      }}
                      className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden"
                    />
                    <span className="text-xs font-mono-custom text-neutral-800 uppercase">{config.waveColor}</span>
                  </div>
                </div>
              </div>

              {/* Mouse active checkbox */}
              <label className="flex items-center gap-2.5 pt-2 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enableMouse}
                  onChange={(e) => setConfig((prev) => ({ ...prev, enableMouse: e.target.checked }))}
                  className="w-4 h-4 rounded border-neutral-300 text-[#D97706] focus:ring-[#D97706] accent-[#D97706]"
                />
                <span className="text-xs font-mono-custom text-neutral-700">Enable Cursor Interaction</span>
              </label>
            </div>
          </section>

          {/* Code Component Output */}
          <section className="bg-neutral-900/95 backdrop-blur-lg border border-neutral-800/80 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6 text-white">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <h2 className="text-base font-serif-custom font-semibold text-neutral-200">
                Installation Usage
              </h2>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-[11px] font-mono-custom text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Component props
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-3 font-mono-custom text-xs">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">React Props</span>
              <pre className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 overflow-x-auto text-neutral-300 leading-relaxed max-h-[300px]">
{`<Dither
  waveSpeed={${config.waveSpeed}}
  waveFrequency={${config.waveFrequency}}
  waveAmplitude={${config.waveAmplitude}}
  pixelSize={${config.pixelSize}}
  colorNum={${config.colorNum}}
  bgColor="${config.bgColor}"
  waveColor="${config.waveColor}"
  enableMouse={${config.enableMouse}}
  mouseRadius={${config.mouseRadius}}
/>`}
              </pre>
            </div>

            <div className="text-xs text-neutral-400 leading-relaxed border-t border-neutral-800 pt-4 flex flex-col gap-2">
              <h3 className="font-semibold text-neutral-300">How it works</h3>
              <p>
                1. <strong>Bayer Dithering</strong>: Calculates a 4x4 matrix threshold in GLSL registers to quantize brightness into fine print-like grids.
              </p>
              <p>
                2. <strong>Low resolution scaling</strong>: Pixel size setting changes the backbuffer resolution of the WebGL rendering context, which is then upscale-rendered via <code>image-rendering: pixelated</code> to achieve zero anti-aliasing retro aesthetics.
              </p>
            </div>
          </section>

        </div>
        
      </div>
    </div>
  );
}
