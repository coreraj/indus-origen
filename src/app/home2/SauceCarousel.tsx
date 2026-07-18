"use client";

import { useEffect, useRef, useState } from "react";
import DiamondProductCard from "./DiamondProductCard";
import styles from "./page.module.css";

const products = [
  {
    name: "Kolkata Dry Fruits",
    title: "Kolkata Gold",
    subtitle: "Royal. Rich. Remarkably layered.",
    description: "Premium dry fruits curated with old-world charm, warm texture, and a finish made for slow, generous snacking.",
    statement: "A regal Indian classic.",
    price: "₹100",
    tone: "tonePlum" as const,
    image: "/assets/kolkata-dry-fruits.png",
    badge: "/assets/chilli-lemon-cashews-badge-card.png",
  },
  {
    name: "Rajasthan Almonds",
    title: "Citrus Fire",
    subtitle: "Bright. Bold. Beautifully Unexpected.",
    description: "Premium whole almonds delicately roasted and layered with vibrant zest, gentle heat, and a lively balance of crunch.",
    statement: "A modern Indian classic.",
    price: "₹100",
    tone: "tonePlum" as const,
    image: "/assets/rajasthan-almonds-card.png",
    badge: "/assets/chilli-lemon-cashews-badge-card.png",
  },
  {
    name: "Kashmir Walnuts",
    title: "Kashmir Bloom",
    subtitle: "Earthy. Elegant. Deeply nutty.",
    description: "Premium walnuts with a clean bite, mellow richness, and a crafted finish that feels both classic and unexpected.",
    statement: "A crafted Indian classic.",
    price: "₹100",
    tone: "tonePlum" as const,
    image: "/assets/kashmir-walnuts.png",
    badge: "/assets/chilli-lemon-cashews-badge-card.png",
  },
];

export default function SauceCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -22% 0px", threshold: 0.18 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sauceCarousel} ${visible ? styles.sauceCarouselVisible : ""}`}
      aria-label="Sauce collection"
    >
      {products.map((product) => (
        <DiamondProductCard product={product} key={product.name} />
      ))}
    </section>
  );
}
