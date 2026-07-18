"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./page.module.css";

export default function AnimatedStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.28 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={`${styles.statementText} ${visible ? styles.statementTextVisible : ""}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          aria-hidden="true"
          className={styles.statementWord}
          key={`${word}-${index}`}
          style={{ "--word-index": index } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
