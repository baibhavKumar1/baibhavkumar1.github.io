"use client";

import React, { useEffect, useRef, useState } from "react";

interface TactileShaderCanvasProps {
  className?: string;
  density?: number; // Scaling factor for retro-pixelation (e.g. 0.25 means render at 1/4 resolution and scale up)
}

export default function TactileShaderCanvas({
  className = "",
  density = 0.5,
}: TactileShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [glSupported, setGlSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use WebGL1 for maximum cross-browser compatibility
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn("WebGL not supported, falling back to static tactile style.");
      setGlSupported(false);
      return;
    }

    // Vertex Shader (renders a full-screen quad)
    const vsSource = `
      attribute vec2 position;
      varying vec2 v_uv;
      void main() {
        v_uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Drifting organic gradients + Bayer-Matrix Dithering
    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;

      // Pseudo-random noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // Simple 2D Noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      // 4x4 Bayer Dither Matrix
      float getBayerThreshold(vec2 fragCoord) {
        int x = int(mod(fragCoord.x, 4.0));
        int y = int(mod(fragCoord.y, 4.0));
        
        // Flattened 4x4 Bayer matrix
        float threshold = 0.0;
        int index = x + y * 4;
        
        if (index == 0) threshold = 0.0625;
        else if (index == 1) threshold = 0.5625;
        else if (index == 2) threshold = 0.1875;
        else if (index == 3) threshold = 0.6875;
        else if (index == 4) threshold = 0.8125;
        else if (index == 5) threshold = 0.3125;
        else if (index == 6) threshold = 0.9375;
        else if (index == 7) threshold = 0.4375;
        else if (index == 8) threshold = 0.25;
        else if (index == 9) threshold = 0.75;
        else if (index == 10) threshold = 0.125;
        else if (index == 11) threshold = 0.625;
        else if (index == 12) threshold = 1.0;
        else if (index == 13) threshold = 0.5;
        else if (index == 14) threshold = 0.875;
        else threshold = 0.375;
        
        return threshold;
      }

      void main() {
        // Slow drifting fluid motion
        vec2 p1 = v_uv * 3.5 + vec2(u_time * 0.04, u_time * 0.02);
        vec2 p2 = v_uv * 2.0 - vec2(u_time * 0.03, -u_time * 0.05);
        
        float n1 = noise(p1);
        float n2 = noise(p2);
        
        // Combine layers to create organic shapes
        float intensity = mix(n1, n2, 0.5);
        
        // Add vignette shadow around edges
        float dist = distance(v_uv, vec5(0.5, 0.5, 0.5, 0.5).xy);
        intensity = mix(intensity, intensity * (1.0 - dist * 0.8), 0.6);

        // Core Palette (Warm Tactile Monochromatic Paper)
        vec3 colCream = vec3(0.98, 0.97, 0.96);
        vec3 colOatmeal = vec3(0.93, 0.92, 0.90);
        
        // Smoothly blend the fluid colors
        vec3 finalColor = mix(colCream, colOatmeal, intensity);
        
        // Generate ultra-fine physical shifting paper grain noise
        float grain = (hash(gl_FragCoord.xy + u_time * 0.01) - 0.5) * 0.038;
        finalColor += grain;

        // Get Bayer threshold based on pixel coordinate
        float bayer = getBayerThreshold(gl_FragCoord.xy);
        
        // Apply Bayer matrix to quantize colors (giving the dithered print look)
        vec3 dithered = floor(finalColor * 8.0 + bayer - 0.5) / 8.0;

        // Blend dithered and smooth colors for high-fidelity tactile look
        gl_FragColor = vec4(mix(finalColor, dithered, 0.65), 0.14); // Monochromatic cream/grey dithered paper grain with elegant 14% opacity
      }
    `;

    // Helper to compile a shader
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

    if (!vs || !fs || !program) {
      setGlSupported(false);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setGlSupported(false);
      return;
    }

    gl.useProgram(program);

    // Setup screen quad positions
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

    // Uniforms
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");

    let animationFrameId: number;
    let startTime = Date.now();

    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      // Scale canvas backbuffer resolution down using density parameter
      const drawWidth = Math.floor(width * density);
      const drawHeight = Math.floor(height * density);

      if (canvas.width !== drawWidth || canvas.height !== drawHeight) {
        canvas.width = drawWidth;
        canvas.height = drawHeight;
        gl.viewport(0, 0, drawWidth, drawHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const render = () => {
      const elapsedSeconds = (Date.now() - startTime) / 1000.0;
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(timeLoc, elapsedSeconds);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [density]);

  if (!glSupported) {
    // Elegant CSS animation fallback
    return (
      <div 
        className={`absolute inset-0 z-0 pointer-events-none opacity-[0.06] bg-radial from-[#D97706] via-transparent to-transparent animate-pulse duration-10000 ${className}`}
        style={{ mixBlendMode: "multiply" }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${className}`}
      style={{
        imageRendering: "pixelated", // Enhance retro-dither grid feel
        mixBlendMode: "multiply", // Beautiful overlay blending
      }}
    />
  );
}
