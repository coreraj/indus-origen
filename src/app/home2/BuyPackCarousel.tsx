"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FaceCanvas from "./FaceCanvas";
import styles from "./page.module.css";

const packs = [
  {
    name: "Crushed Pineapple Sriracha",
    tone: "toneGold" as const,
    bg: "#be8d40",
    image: "/assets/buypack-pineapple-sriracha.avif",
    packImage: "/assets/aaY4j1xvIZEnjQSL_3-pack-3-.png",
    cover: true,
  },
  {
    name: "Crushed Habanero Garlic",
    tone: "toneOrange" as const,
    bg: "#f15825",
    image: "/assets/buypack-habanero-garlic.png",
    packImage: "/assets/aaY4kVxvIZEnjQSM_3-pack.png",
    cover: true,
  },
  {
    name: "Crushed Cherry Garlic",
    tone: "toneRed" as const,
    bg: "#da1e27",
    image: "/assets/buypack-cherry-garlic.png",
    packImage: "/assets/aaY4h1xvIZEnjQSH_3-pack-1-.png",
    cover: true,
  },
];

export default function BuyPackCarousel() {
  const [index, setIndex] = useState(0);
  const [packSize, setPackSize] = useState<3 | 6>(3);

  const active = packs[index];

  function prev() {
    setIndex((i) => (i - 1 + packs.length) % packs.length);
  }

  function next() {
    setIndex((i) => (i + 1) % packs.length);
  }

  return (
    <section id="shop" className={styles.buyPack}>
      <div className={styles.buyPackImage}>
        <div
          className={styles.buyPackImageTrack}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {packs.map((pack) =>
            pack.cover ? (
              <div key={pack.name} className={styles.buyPackImageSlide} style={{ background: pack.bg }}>
                <Image src={pack.image} alt="" fill sizes="(max-width: 1050px) 100vw, 50vw" className={styles.buyPackImageCover} />
              </div>
            ) : (
              <div key={pack.name} className={styles.buyPackImageSlide} style={{ background: pack.bg }}>
                <Image src={pack.image} alt="" width={375} height={431} className={styles.buyPackImagePhoto} />
              </div>
            )
          )}
        </div>
      </div>

      <div className={styles.packPanel}>
        <div className={styles.packPanelHead}>
          <h2>Buy a pack</h2>
          <p>Save some bucks</p>
          <div className={styles.packToggle}>
            <button
              type="button"
              className={packSize === 3 ? styles.packToggleActive : ""}
              onClick={() => setPackSize(3)}
            >
              3 pack
            </button>
            <button
              type="button"
              className={packSize === 6 ? styles.packToggleActive : ""}
              onClick={() => setPackSize(6)}
            >
              6 pack
            </button>
          </div>
        </div>

        <div className={styles.packCardWrap}>
          <button type="button" className={styles.buyPackArrowLeft} onClick={prev} aria-label="Previous product">
            <ArrowLeft size={20} />
          </button>

          <div className={`${styles.packCard} ${styles[active.tone]}`}>
            <h3>{active.name}</h3>
            <div className={styles.packFaceCanvas} aria-hidden="true">
              <FaceCanvas />
            </div>
            <div className={styles.packBottles} data-pack-size={packSize}>
              <Image
                src={active.packImage}
                alt={`${active.name} ${packSize} pack`}
                width={2560}
                height={2560}
                className={styles.packBottleImage}
              />
            </div>
            <button type="button" className={styles.packCartButton}>
              <span>Add to cart</span>
              <strong>{packSize === 3 ? "$32.00" : "$54.00"}</strong>
            </button>
          </div>

          <button type="button" className={styles.buyPackArrowRight} onClick={next} aria-label="Next product">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
