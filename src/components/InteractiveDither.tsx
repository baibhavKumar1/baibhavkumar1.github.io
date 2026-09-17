"use client";

import React, { useEffect, useRef } from "react";

export interface DitherConfig {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  pixelSize: number; // 1 = full resolution, 2 = 1/2, 4 = 1/4, etc.
  colorNum: number; // Number of dither color bands
  bgColor: string; // Hex color
  waveColor: string; // Hex color
  enableMouse: boolean;
  mouseRadius: number; // 0.0 to 1.0
}

interface InteractiveDitherProps {
  config: DitherConfig;
}

// Helper to convert hex to vec3
function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  return [r, g, b];
}

export default function InteractiveDither({ config }: InteractiveDitherProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0.5,
    y: 0.5,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }

    const vsSource = `
      attribute vec2 position;
      varying vec2 v_uv;
      void main() {
        v_uv = position * 0.5 + 0.5;
        // Flip UV y-coordinate to match canvas coordinate system
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform bool u_mouse_active;
      uniform float u_mouse_radius;

      uniform float u_wave_speed;
      uniform float u_wave_frequency;
      uniform float u_wave_amplitude;
      uniform float u_color_num;
      
      uniform vec3 u_color_bg;
      uniform vec3 u_color_wave;

      // Pseudo-random noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // 4x4 Bayer Dither Matrix
      float getBayerThreshold(vec2 fragCoord) {
        int x = int(mod(fragCoord.x, 4.0));
        int y = int(mod(fragCoord.y, 4.0));
        int index = x + y * 4;
        
        if (index == 0) return 0.0625;
        if (index == 1) return 0.5625;
        if (index == 2) return 0.1875;
        if (index == 3) return 0.6875;
        if (index == 4) return 0.8125;
        if (index == 5) return 0.3125;
        if (index == 6) return 0.9375;
        if (index == 7) return 0.4375;
        if (index == 8) return 0.25;
        if (index == 9) return 0.75;
        if (index == 10) return 0.125;
        if (index == 11) return 0.625;
        if (index == 12) return 1.0;
        if (index == 13) return 0.5;
        if (index == 14) return 0.875;
        return 0.375;
      }

      void main() {
        vec2 uv = v_uv;
        
        // Base coordinate distortion from waves
        float wave1 = sin(uv.x * u_wave_frequency + u_time * u_wave_speed) * u_wave_amplitude;
        float wave2 = cos(uv.y * u_wave_frequency * 0.8 + u_time * u_wave_speed * 1.3) * u_wave_amplitude * 0.6;
        
        // Mouse force perturbation
        float mouseForce = 0.0;
        if (u_mouse_active) {
          float dist = distance(uv, u_mouse);
          if (dist < u_mouse_radius) {
            float strength = 1.0 - (dist / u_mouse_radius);
            // Dynamic ripple out
            mouseForce = strength * 0.2 * sin(dist * 35.0 - u_time * 8.0);
          }
        }

        // Combine to define final pixel intensity band
        float intensity = uv.y + wave1 + wave2 + mouseForce;
        intensity = clamp(intensity, 0.0, 1.0);

        // Add fine film grain noise
        float grain = (hash(gl_FragCoord.xy + u_time * 0.05) - 0.5) * 0.025;
        intensity = clamp(intensity + grain, 0.0, 1.0);

        // Bayer threshold
        float bayer = getBayerThreshold(gl_FragCoord.xy);
        
        // Apply Bayer matrix quantization
        float levels = max(u_color_num - 1.0, 1.0);
        float quantized = floor(intensity * levels + bayer - 0.5) / levels;
        quantized = clamp(quantized, 0.0, 1.0);

        // Mix custom colors
        vec3 finalColor = mix(u_color_bg, u_color_wave, quantized);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();

    if (!vs || !fs || !program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uniforms = {
      time: gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      mouseActive: gl.getUniformLocation(program, "u_mouse_active"),
      mouseRadius: gl.getUniformLocation(program, "u_mouse_radius"),
      waveSpeed: gl.getUniformLocation(program, "u_wave_speed"),
      waveFrequency: gl.getUniformLocation(program, "u_wave_frequency"),
      waveAmplitude: gl.getUniformLocation(program, "u_wave_amplitude"),
      colorNum: gl.getUniformLocation(program, "u_color_num"),
      colorBg: gl.getUniformLocation(program, "u_color_bg"),
      colorWave: gl.getUniformLocation(program, "u_color_wave"),
    };

    let animationFrameId: number;
    let startTime = Date.now();

    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      // Scaling divisor for pixelation
      const scale = 1 / config.pixelSize;
      const drawWidth = Math.floor(width * scale);
      const drawHeight = Math.floor(height * scale);

      if (canvas.width !== drawWidth || canvas.height !== drawHeight) {
        canvas.width = drawWidth;
        canvas.height = drawHeight;
        gl.viewport(0, 0, drawWidth, drawHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000.0;
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Pass configuration values to uniforms
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1i(uniforms.mouseActive, config.enableMouse && mouseRef.current.active ? 1 : 0);
      gl.uniform1f(uniforms.mouseRadius, config.mouseRadius);

      gl.uniform1f(uniforms.waveSpeed, config.waveSpeed);
      gl.uniform1f(uniforms.waveFrequency, config.waveFrequency);
      gl.uniform1f(uniforms.waveAmplitude, config.waveAmplitude);
      gl.uniform1f(uniforms.colorNum, config.colorNum);

      const rgbBg = hexToRgb(config.bgColor);
      const rgbWave = hexToRgb(config.waveColor);
      gl.uniform3f(uniforms.colorBg, rgbBg[0], rgbBg[1], rgbBg[2]);
      gl.uniform3f(uniforms.colorWave, rgbWave[0], rgbWave[1], rgbWave[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse event handlers mapping to WebGL coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches[0].clientX - rect.left) / rect.width;
        const y = (e.touches[0].clientY - rect.top) / rect.height;
        mouseRef.current = { x, y, active: true };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-all duration-300"
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
}
