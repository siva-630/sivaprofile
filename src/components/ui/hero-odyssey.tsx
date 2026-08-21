
"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect';
import { Typewriter } from '@/components/ui/typewriter';
import { FileText } from 'lucide-react';
import { StarBorder } from '@/components/ui/star-border';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

import im from '../sections/img/im';


interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

// Helper function to convert HSL to RGB string
function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));
  return `rgb(${r}, ${g}, ${b})`;
}


const Lightning: React.FC<LightningProps> = ({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformLocationsRef = useRef<{
    iResolution?: WebGLUniformLocation | null;
    iTime?: WebGLUniformLocation | null;
    uHue?: WebGLUniformLocation | null;
    uXOffset?: WebGLUniformLocation | null;
    uSpeed?: WebGLUniformLocation | null;
    uIntensity?: WebGLUniformLocation | null;
    uSize?: WebGLUniformLocation | null;
    aPosition?: number;
  }>({});
  const vertexBufferRef = useRef<WebGLBuffer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    startTimeRef.current = performance.now();

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      const displayWidth = canvasRef.current.clientWidth;
      const displayHeight = canvasRef.current.clientHeight;
      if (canvasRef.current.width !== displayWidth || canvasRef.current.height !== displayHeight) {
        canvasRef.current.width = displayWidth;
        canvasRef.current.height = displayHeight;
        return true;
      }
      return false;
    };
    resizeCanvas();

    const localGl = canvas.getContext("webgl");
    if (!localGl) {
      console.error("WebGL not supported");
      return;
    }
    glRef.current = localGl;

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = localGl.createShader(type);
      if (!shader) return null;
      localGl.shaderSource(shader, source);
      localGl.compileShader(shader);
      if (!localGl.getShaderParameter(shader, localGl.COMPILE_STATUS)) {
        console.error("Shader compile error:", localGl.getShaderInfoLog(shader));
        localGl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, localGl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, localGl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = localGl.createProgram();
    if (!program) return;
    localGl.attachShader(program, vertexShader);
    localGl.attachShader(program, fragmentShader);
    localGl.linkProgram(program);
    if (!localGl.getProgramParameter(program, localGl.LINK_STATUS)) {
      console.error("Program linking error:", localGl.getProgramInfoLog(program));
      localGl.deleteProgram(program);
      localGl.deleteShader(vertexShader);
      localGl.deleteShader(fragmentShader);
      return;
    }
    programRef.current = program;

    uniformLocationsRef.current = {
      iResolution: localGl.getUniformLocation(program, "iResolution"),
      iTime: localGl.getUniformLocation(program, "iTime"),
      uHue: localGl.getUniformLocation(program, "uHue"),
      uXOffset: localGl.getUniformLocation(program, "uXOffset"),
      uSpeed: localGl.getUniformLocation(program, "uSpeed"),
      uIntensity: localGl.getUniformLocation(program, "uIntensity"),
      uSize: localGl.getUniformLocation(program, "uSize"),
      aPosition: localGl.getAttribLocation(program, "aPosition"),
    };

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = localGl.createBuffer();
    localGl.bindBuffer(localGl.ARRAY_BUFFER, buffer);
    localGl.bufferData(localGl.ARRAY_BUFFER, vertices, localGl.STATIC_DRAW);
    vertexBufferRef.current = buffer;

    const aPositionLoc = uniformLocationsRef.current.aPosition;
    if (typeof aPositionLoc === 'number' && aPositionLoc !== -1) {
      localGl.enableVertexAttribArray(aPositionLoc);
      localGl.vertexAttribPointer(aPositionLoc, 2, localGl.FLOAT, false, 0, 0);
    }

    const onWindowResize = () => {
      if (resizeCanvas()) {
        if (glRef.current) {
          glRef.current.viewport(0, 0, glRef.current.drawingBufferWidth, glRef.current.drawingBufferHeight);
        }
      }
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);

      const currentGl = glRef.current;
      if (currentGl) {
        if (programRef.current) currentGl.deleteProgram(programRef.current);
        if (vertexShader) currentGl.deleteShader(vertexShader);
        if (fragmentShader) currentGl.deleteShader(fragmentShader);
        if (vertexBufferRef.current) currentGl.deleteBuffer(vertexBufferRef.current);
      }
      programRef.current = null;
      vertexBufferRef.current = null;
      glRef.current = null;
    };
  }, []);


  useEffect(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    const locations = uniformLocationsRef.current;

    if (!gl || !program || !canvas || locations.aPosition === undefined) return;

    gl.useProgram(program);
    const aPositionLoc = locations.aPosition;
    if (typeof aPositionLoc === 'number' && aPositionLoc !== -1) {
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferRef.current);
      gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPositionLoc);
    }

    const render = () => {
      if (!glRef.current || !programRef.current || !canvasRef.current || !uniformLocationsRef.current.iResolution) {
        if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
        return;
      }
      if (!canvasRef.current.isConnected) {
        if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
        return;
      }

      const currentGl = glRef.current;
      const currentProgram = programRef.current;
      const currentCanvas = canvasRef.current;
      const currentLocations = uniformLocationsRef.current;

      if (currentCanvas.width !== currentCanvas.clientWidth || currentCanvas.height !== currentCanvas.clientHeight) {
        currentCanvas.width = currentCanvas.clientWidth;
        currentCanvas.height = currentCanvas.clientHeight;
        currentGl.viewport(0, 0, currentGl.drawingBufferWidth, currentGl.drawingBufferHeight);
      }

      currentGl.useProgram(currentProgram);

      currentGl.uniform2f(currentLocations.iResolution as WebGLUniformLocation | null, currentGl.drawingBufferWidth, currentGl.drawingBufferHeight);
      const currentTimeVal = performance.now();
      currentGl.uniform1f(currentLocations.iTime as WebGLUniformLocation | null, (currentTimeVal - startTimeRef.current) / 1000.0);
      currentGl.uniform1f(currentLocations.uHue as WebGLUniformLocation | null, hue);
      currentGl.uniform1f(currentLocations.uXOffset as WebGLUniformLocation | null, xOffset);
      currentGl.uniform1f(currentLocations.uSpeed as WebGLUniformLocation | null, speed);
      currentGl.uniform1f(currentLocations.uIntensity as WebGLUniformLocation | null, intensity);
      currentGl.uniform1f(currentLocations.uSize as WebGLUniformLocation | null, size);

      currentGl.drawArrays(currentGl.TRIANGLES, 0, 6);
      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [hue, xOffset, speed, intensity, size]);


  return <canvas ref={canvasRef} className="w-full h-full relative" />;
};


export const HeroSection: React.FC = () => {
  const initialHue = 220;
  const [targetHue, setTargetHue] = useState(initialHue);
  const animatedHueMotionValue = useMotionValue(initialHue);
  const [displayHue, setDisplayHue] = useState(initialHue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTargetHue(Math.floor(Math.random() * 361));
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const controls = animate(animatedHueMotionValue, targetHue, {
      duration: 1.5,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [targetHue, animatedHueMotionValue]);

  useEffect(() => {
    const unsubscribe = animatedHueMotionValue.on("change", (latest) => {
      const roundedHue = Math.round(latest);
      setDisplayHue(roundedHue);
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--portfolio-brand-hue', roundedHue.toString());
      }
    });
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--portfolio-brand-hue', Math.round(initialHue).toString());
    }
    return () => unsubscribe();
  }, [animatedHueMotionValue, initialHue]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const nameColor = useMemo(() => hslToRgb(displayHue, 100, 70), [displayHue]);
  const dynamicBorderColor = useMemo(() => `hsl(${displayHue}, 100%, 70%)`, [displayHue]);

  return (
    <div className="relative w-full bg-black text-white min-h-screen">

      {/* ── Backgrounds (z-0, behind everything) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100vw+200px)] max-w-[1000px] h-[calc(100vw+200px)] max-h-[1000px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-b from-blue-500/20 to-purple-600/10 blur-3xl"></div>
        <div className="absolute top-0 w-full left-0 h-full">
          <Lightning hue={displayHue} xOffset={0} speed={1.6} intensity={0.6} size={2} />
        </div>
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 w-[calc(80vw+100px)] max-w-[800px] h-[calc(80vw+100px)] max-h-[800px] sm:w-[600px] sm:h-[600px] backdrop-blur-3xl rounded-full bg-[radial-gradient(circle_at_25%_90%,_#1e386b_15%,_#000000de_70%,_#000000ed_100%)]"></div>
      </div>

      {/* ── Foreground content ── */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-16 w-full"
          >
            {/* ── LEFT: ID Card ── */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start pt-8 w-full lg:w-auto"
            >
              <div className="id-card-wrapper">
                <div className="id-card">
                  <div className="id-card-clip"></div>
                  <Image
                    src={im.siva}
                    alt="Siva Shankar Profile"
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-[3px] border-[#22d3ee] mt-[20px] mb-[15px]"
                    style={{ transform: 'translateZ(30px)' }}
                    data-ai-hint="profile photo"
                    priority
                  />
                  <div className="id-card-text">SIVA SHANKAR<br /></div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: About Me Box ── */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-[280px] sm:max-w-sm lg:ml-auto mt-8 lg:mt-0"
            >
              <div className="relative p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-white/10 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-50 pointer-events-none"></div>
                <h3 
                  className="text-xl sm:text-2xl font-bold mb-4 tracking-tight relative z-10" 
                  style={{ color: dynamicBorderColor }}
                >
                  Hello! I'm Siva Shankar
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed relative z-10">
                  Computer Science undergraduate (AI & Data Science) skilled in Java, JavaScript, SQL, Data Structures & Algorithms, React.js, Node.js, Express.js, MongoDB, and REST APIs.<br/><br/>Seeking a Software Engineer role to deliver reliable, scalable, and high-quality software solutions.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

    </div>
  );
};
