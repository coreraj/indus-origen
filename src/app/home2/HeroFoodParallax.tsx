"use client";

import { useEffect } from "react";

type FoodState = {
  element: HTMLElement;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  range: number;
};

export default function HeroFoodParallax() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-section]");
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const heroEl = hero;

    const foods: FoodState[] = Array.from(heroEl.querySelectorAll<HTMLElement>("[data-hero-food]")).map(
      (element) => ({
        element,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        range: Number(element.dataset.parallaxRange ?? 28),
      })
    );

    if (foods.length === 0) return;

    let frameId = 0;

    function setTargets(clientX: number, clientY: number) {
      const rect = heroEl.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;

      foods.forEach((food) => {
        food.targetX = -x * food.range;
        food.targetY = -y * food.range;
      });
    }

    function resetTargets() {
      foods.forEach((food) => {
        food.targetX = 0;
        food.targetY = 0;
      });
    }

    function tick() {
      foods.forEach((food) => {
        food.currentX += (food.targetX - food.currentX) * 0.055;
        food.currentY += (food.targetY - food.currentY) * 0.055;
        food.element.style.setProperty("--cursor-x", `${food.currentX.toFixed(2)}px`);
        food.element.style.setProperty("--cursor-y", `${food.currentY.toFixed(2)}px`);
      });

      frameId = requestAnimationFrame(tick);
    }

    function handlePointerMove(event: PointerEvent) {
      setTargets(event.clientX, event.clientY);
    }

    heroEl.addEventListener("pointermove", handlePointerMove);
    heroEl.addEventListener("pointerleave", resetTargets);
    frameId = requestAnimationFrame(tick);

    return () => {
      heroEl.removeEventListener("pointermove", handlePointerMove);
      heroEl.removeEventListener("pointerleave", resetTargets);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
