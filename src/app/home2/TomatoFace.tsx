"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

interface ExpressionState {
  name: string;
  eyeW: number;
  eyeH: number;
  pupilY: number;
  pupilR: number;
  browY: number;
  browTilt: number;
  browCurve: number;
  heart: number;
  smile: number;
  openMouth: number;
  surprise: number;
  cheek: number;
}

const HOLD_DURATION = 1250;
const TRANSITION_DURATION = 380;

const expressions: ExpressionState[] = [
  {
    name: "happy",
    eyeW: 60,
    eyeH: 86,
    pupilY: 7,
    pupilR: 11,
    browY: -102,
    browTilt: 0.13,
    browCurve: 18,
    heart: 0,
    smile: 1,
    openMouth: 0,
    surprise: 0,
    cheek: 0.55,
  },
  {
    name: "love",
    eyeW: 67,
    eyeH: 88,
    pupilY: 0,
    pupilR: 10,
    browY: -105,
    browTilt: 0.16,
    browCurve: 20,
    heart: 1,
    smile: 0,
    openMouth: 1,
    surprise: 0,
    cheek: 0.8,
  },
  {
    name: "surprised",
    eyeW: 61,
    eyeH: 96,
    pupilY: 16,
    pupilR: 11,
    browY: -114,
    browTilt: 0.18,
    browCurve: 21,
    heart: 0,
    smile: 0,
    openMouth: 0,
    surprise: 1,
    cheek: 0,
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

function ease(value: number) {
  const t = clamp(value);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function mixState(first: ExpressionState, second: ExpressionState, amount: number): ExpressionState {
  const result = { ...first };
  (Object.keys(first) as (keyof ExpressionState)[]).forEach((key) => {
    const a = first[key];
    const b = second[key];
    if (typeof a === "number" && typeof b === "number") {
      (result[key] as number) = lerp(a, b, amount);
    } else {
      (result[key] as ExpressionState[typeof key]) = amount < 0.5 ? a : b;
    }
  });
  return result;
}

export default function TomatoFace({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true }) ?? null;
    if (!canvas || !ctx) return;

    let cssW = 0;
    let cssH = 0;
    let current = 0;
    let next = 1;
    let phaseStart = performance.now();
    let transitioning = false;
    let rafId = 0;

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function roundedStroke(width: number, color = "#151515") {
      if (!ctx) return;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
    }

    function clearCanvas() {
      ctx?.clearRect(0, 0, cssW, cssH);
    }

    function drawBrow(x: number, y: number, tilt: number, curve: number, side: number) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(side * tilt);
      roundedStroke(9);
      ctx.beginPath();
      ctx.moveTo(-29, 7);
      ctx.quadraticCurveTo(0, -curve, 30, 3);
      ctx.stroke();
      ctx.restore();
    }

    function heartPath(x: number, y: number, size: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.32);
      ctx.bezierCurveTo(x - size * 0.76, y - size * 0.15, x - size * 0.42, y - size * 0.78, x, y - size * 0.37);
      ctx.bezierCurveTo(x + size * 0.42, y - size * 0.78, x + size * 0.76, y - size * 0.15, x, y + size * 0.32);
      ctx.closePath();
    }

    function drawEye(x: number, y: number, state: ExpressionState, side: number, blink: number) {
      if (!ctx) return;
      const eyeHeight = Math.max(8, state.eyeH * blink);

      ctx.save();
      ctx.translate(x, y);

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#151515";
      ctx.lineWidth = 7;

      ctx.beginPath();
      ctx.ellipse(0, 0, state.eyeW / 2, eyeHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      if (blink > 0.22) {
        const heartOpacity = clamp(state.heart);
        const pupilOpacity = 1 - heartOpacity;

        if (pupilOpacity > 0.01) {
          const pupilX = side * -5;

          ctx.save();
          ctx.globalAlpha = pupilOpacity;

          ctx.fillStyle = "#151515";
          ctx.beginPath();
          ctx.arc(pupilX, state.pupilY, state.pupilR, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(pupilX - state.pupilR * 0.34, state.pupilY - state.pupilR * 0.37, state.pupilR * 0.3, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        if (heartOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = heartOpacity;

          const scale = 0.8 + heartOpacity * 0.2;
          ctx.scale(scale, scale);

          const gradient = ctx.createLinearGradient(0, -25, 0, 25);
          gradient.addColorStop(0, "#ff5b72");
          gradient.addColorStop(1, "#df203e");

          ctx.fillStyle = gradient;
          ctx.strokeStyle = "#b81731";
          ctx.lineWidth = 4;

          heartPath(0, 3, 37);
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        }
      }

      ctx.restore();
    }

    function drawCheek(x: number, y: number, alpha: number) {
      if (!ctx || alpha < 0.01) return;
      ctx.save();
      ctx.globalAlpha = alpha * 0.28;
      ctx.fillStyle = "#ffb0b8";
      ctx.beginPath();
      ctx.ellipse(x, y, 28, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawSmile(alpha: number) {
      if (!ctx || alpha < 0.01) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      roundedStroke(8);
      ctx.beginPath();
      ctx.moveTo(-57, 28);
      ctx.quadraticCurveTo(0, 78, 58, 24);
      ctx.stroke();
      ctx.restore();
    }

    function drawLoveMouth(alpha: number) {
      if (!ctx || alpha < 0.01) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      ctx.fillStyle = "#171717";
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = 7;

      ctx.beginPath();
      ctx.moveTo(-61, 11);
      ctx.quadraticCurveTo(0, 38, 61, 11);
      ctx.quadraticCurveTo(52, 92, 0, 98);
      ctx.quadraticCurveTo(-52, 92, -61, 11);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(-50, 19);
      ctx.quadraticCurveTo(0, 40, 50, 19);
      ctx.lineTo(45, 39);
      ctx.quadraticCurveTo(0, 53, -45, 38);
      ctx.closePath();
      ctx.fill();

      const tongueGradient = ctx.createLinearGradient(0, 67, 0, 92);
      tongueGradient.addColorStop(0, "#ff7188");
      tongueGradient.addColorStop(1, "#df3e5a");

      ctx.fillStyle = tongueGradient;
      ctx.beginPath();
      ctx.ellipse(0, 78, 33, 13, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function drawSurprisedMouth(alpha: number) {
      if (!ctx || alpha < 0.01) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.strokeStyle = "#151515";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(0, 24);
      ctx.bezierCurveTo(16, 24, 22, 38, 21, 55);
      ctx.bezierCurveTo(20, 75, 12, 87, 0, 87);
      ctx.bezierCurveTo(-13, 87, -21, 75, -21, 55);
      ctx.bezierCurveTo(-21, 38, -15, 24, 0, 24);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }

    function drawFace(state: ExpressionState, now: number, morphProgress: number) {
      if (!ctx) return;
      clearCanvas();

      const size = Math.min(cssW, cssH);
      const scale = size / 500;
      const centerX = cssW / 2;
      const centerY = cssH / 2 - 3;

      const idleY = Math.sin(now * 0.0024) * 1.7;
      const idleRotation = Math.sin(now * 0.0014) * 0.008;

      const transitionWave = Math.sin(morphProgress * Math.PI);
      const squash = 1 - transitionWave * 0.014;
      const stretch = 1 + transitionWave * 0.014;

      const blinkPulse = Math.sin(now * 0.0052);
      const blink =
        state.heart > 0.55 ? 1 : blinkPulse > 0.975 ? Math.max(0.08, 1 - (blinkPulse - 0.975) * 38) : 1;

      ctx.save();
      ctx.translate(centerX, centerY + idleY);
      ctx.rotate(idleRotation);
      ctx.scale(scale * stretch, scale * squash);

      drawBrow(-74, state.browY, state.browTilt, state.browCurve, -1);
      drawBrow(74, state.browY, state.browTilt, state.browCurve, 1);

      drawEye(-68, -37, state, -1, blink);
      drawEye(68, -37, state, 1, blink);

      drawCheek(-112, 39, state.cheek);
      drawCheek(112, 39, state.cheek);

      drawSmile(state.smile);
      drawLoveMouth(state.openMouth);
      drawSurprisedMouth(state.surprise);

      ctx.restore();
    }

    function beginNext() {
      if (transitioning) return;
      next = (current + 1) % expressions.length;
      transitioning = true;
      phaseStart = performance.now();
    }

    function animate(now: number) {
      const elapsed = now - phaseStart;

      if (!transitioning) {
        drawFace(expressions[current], now, 0);

        if (elapsed >= HOLD_DURATION) {
          next = (current + 1) % expressions.length;
          transitioning = true;
          phaseStart = now;
        }
      } else {
        const rawProgress = clamp(elapsed / TRANSITION_DURATION);
        const progress = ease(rawProgress);
        const mixedState = mixState(expressions[current], expressions[next], progress);

        drawFace(mixedState, now, progress);

        if (rawProgress >= 1) {
          current = next;
          transitioning = false;
          phaseStart = now;
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    canvas.addEventListener("click", beginNext);
    window.addEventListener("resize", resizeCanvas);

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);

    resizeCanvas();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("click", beginNext);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={`${styles.tomatoFace} ${className ?? ""}`} aria-hidden="true" />;
}
