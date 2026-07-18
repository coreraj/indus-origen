"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import styles from "./page.module.css";

const pressItems = [
  {
    title: "Shashank Mehta on removing Instagram from the marketing mix of The Whole Truth",
    source: "FORBES",
    logo: "F",
    tone: "pink" as const,
  },
  {
    title: "TWT unmasks unhealthy food brands with Rohan Joshi",
    source: "BRANDEQUITY.COM",
    logo: "br",
    tone: "gold" as const,
  },
  {
    title: "Why clean-label food brands are changing the Indian snack shelf",
    source: "MINT",
    logo: "M",
    tone: "pink" as const,
  },
];

export default function PressCarousel() {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, pressItems.length - 2);

  const goPrevious = () => setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  const goNext = () => setIndex((current) => (current >= maxIndex ? 0 : current + 1));

  return (
    <div className={styles.pressCarousel} aria-label="Press mentions">
      <button type="button" className={styles.pressArrow} onClick={goPrevious} aria-label="Previous press story">
        <ArrowLeft size={30} />
      </button>

      <div className={styles.pressViewport}>
        <div className={styles.pressTrack} style={{ "--press-index": index } as CSSProperties}>
          {pressItems.map((item) => (
            <article
              className={`${styles.pressCard} ${item.tone === "gold" ? styles.pressCardGold : ""}`}
              key={item.title}
            >
              <div className={styles.pressCardHeadline}>{item.title}</div>
              <div className={styles.pressMeta}>
                <span className={item.logo === "br" ? styles.pressLogoText : styles.pressLogo}>{item.logo}</span>
                <div>
                  <strong>{item.source}</strong>
                  <small>2 min read</small>
                </div>
                <span className={styles.pressSearch}>
                  <Search size={17} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.pressArrow} ${styles.pressArrowActive}`}
        onClick={goNext}
        aria-label="Next press story"
      >
        <ArrowRight size={30} />
      </button>
    </div>
  );
}
