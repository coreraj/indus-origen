"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./page.module.css";

const FOOD_ASSETS = [
  { src: "/assets/statement-walnut.png", width: 1280, height: 1280, size: "clamp(180px, 24vw, 360px)" },
  { src: "/assets/statement-cashew.png", width: 1280, height: 1280, size: "clamp(130px, 18vw, 290px)" },
  { src: "/assets/statement-raisins.png", width: 1280, height: 1280, size: "clamp(150px, 20vw, 310px)" },
  { src: "/assets/statement-pistachio.png", width: 1280, height: 1280, size: "clamp(140px, 18vw, 290px)" },
  { src: "/assets/statement-almonds.png", width: 512, height: 512, size: "clamp(160px, 21vw, 320px)" },
  { src: "/assets/almond.png", width: 522, height: 420, size: "clamp(150px, 20vw, 310px)" },
];

const ROUTES = [
  { steerX: "1vw", steerY: "-9vh", midX: "0vw", midY: "-36vh", x: "1vw", y: "-74vh", endX: "0vw", endY: "-112vh", rotate: "20deg" },
  { steerX: "8vw", steerY: "-7vh", midX: "34vw", midY: "-30vh", x: "70vw", y: "-62vh", endX: "108vw", endY: "-98vh", rotate: "-12deg" },
  { steerX: "9vw", steerY: "0vh", midX: "40vw", midY: "1vh", x: "78vw", y: "3vh", endX: "114vw", endY: "5vh", rotate: "22deg" },
  { steerX: "8vw", steerY: "7vh", midX: "34vw", midY: "32vh", x: "70vw", y: "66vh", endX: "108vw", endY: "102vh", rotate: "-16deg" },
  { steerX: "0vw", steerY: "9vh", midX: "0vw", midY: "36vh", x: "-2vw", y: "74vh", endX: "1vw", endY: "112vh", rotate: "16deg" },
  { steerX: "-8vw", steerY: "7vh", midX: "-34vw", midY: "32vh", x: "-70vw", y: "66vh", endX: "-108vw", endY: "102vh", rotate: "-18deg" },
  { steerX: "-9vw", steerY: "0vh", midX: "-40vw", midY: "-1vh", x: "-78vw", y: "-3vh", endX: "-114vw", endY: "-5vh", rotate: "24deg" },
  { steerX: "-8vw", steerY: "-7vh", midX: "-34vw", midY: "-30vh", x: "-70vw", y: "-62vh", endX: "-108vw", endY: "-98vh", rotate: "-24deg" },
];

const TRAVEL_MS = 3800;
const SPAWN_MS = TRAVEL_MS / 2;

type Particle = {
  id: number;
  assetIndex: number;
  routeIndex: number;
};

export default function StoryFoodLoop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);
  const lastRouteRef = useRef(-1);
  const [active, setActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px", threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const spawn = () => {
      const availableRoutes = ROUTES.map((_, index) => index).filter((index) => index !== lastRouteRef.current);
      const routeIndex = availableRoutes[Math.floor(Math.random() * availableRoutes.length)] ?? 0;
      lastRouteRef.current = routeIndex;

      const particle: Particle = {
        id: nextIdRef.current,
        assetIndex: nextIdRef.current % FOOD_ASSETS.length,
        routeIndex,
      };

      nextIdRef.current += 1;
      setParticles((current) => [...current.slice(-5), particle]);
      window.setTimeout(() => {
        setParticles((current) => current.filter((item) => item.id !== particle.id));
      }, TRAVEL_MS + 200);
    };

    spawn();
    const interval = window.setInterval(spawn, SPAWN_MS);
    return () => window.clearInterval(interval);
  }, [active]);

  return (
    <div ref={rootRef} className={styles.storyFoodLoop} aria-hidden="true">
      {active
        ? particles.map((particle) => {
            const asset = FOOD_ASSETS[particle.assetIndex];
            const route = ROUTES[particle.routeIndex];
            const particleStyle = {
              "--story-food-size": asset.size,
              "--story-food-duration": `${TRAVEL_MS}ms`,
              "--story-food-steer-x": route.steerX,
              "--story-food-steer-y": route.steerY,
              "--story-food-mid-x": route.midX,
              "--story-food-mid-y": route.midY,
              "--story-food-x": route.x,
              "--story-food-y": route.y,
              "--story-food-end-x": route.endX,
              "--story-food-end-y": route.endY,
              "--story-food-rotate": route.rotate,
            } as CSSProperties;

            return (
              <span
                key={particle.id}
                className={`${styles.storyFoodItem} ${styles.storyFoodParticle}`}
                style={particleStyle}
              >
                <Image
                  src={asset.src}
                  alt=""
                  width={asset.width}
                  height={asset.height}
                  loading="lazy"
                  sizes="(max-width: 768px) 42vw, 24vw"
                />
              </span>
            );
          })
        : null}
    </div>
  );
}
