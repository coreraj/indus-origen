"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FaceCanvas from "./FaceCanvas";
import styles from "./page.module.css";

const packs = [
  {
    id: "everyday",
    name: "Everyday Collection",
    tone: "toneGold" as const,
    bg: "#064d92",
    image: "/assets/buy-pack-left-almond-blue.png",
    packImage: "/assets/bundle-collection-pack.png",
    cover: true,
  },
  {
    id: "gift-walnut",
    name: "Gift Collection",
    tone: "toneOrange" as const,
    bg: "#8d5629",
    image: "/assets/buy-pack-left-walnut-brown.png",
    packImage: "/assets/bundle-collection-pack.png",
    cover: true,
  },
  {
    id: "gift-almond",
    name: "Gift Collection",
    tone: "toneRed" as const,
    bg: "#064a38",
    image: "/assets/buy-pack-left-dryfruit-green.png",
    packImage: "/assets/bundle-collection-pack.png",
    cover: true,
  },
];

export default function BuyPackCarousel() {
  const [index, setIndex] = useState(0);
  const [packSize, setPackSize] = useState<3 | 6>(3);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const active = packs[index];

  function move(nextIndex: number, nextDirection: "next" | "prev") {
    if (transitioning) return;

    setDirection(nextDirection);
    setTransitioning(true);

    window.setTimeout(() => {
      setIndex(nextIndex);
      window.setTimeout(() => setTransitioning(false), 120);
    }, 460);
  }

  function prev() {
    move((index - 1 + packs.length) % packs.length, "prev");
  }

  function next() {
    move((index + 1) % packs.length, "next");
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
              <div key={pack.id} className={styles.buyPackImageSlide} style={{ background: pack.bg }}>
                <Image src={pack.image} alt="" fill sizes="(max-width: 1050px) 100vw, 50vw" className={styles.buyPackImageCover} />
              </div>
            ) : (
              <div key={pack.id} className={styles.buyPackImageSlide} style={{ background: pack.bg }}>
                <Image src={pack.image} alt="" width={375} height={431} className={styles.buyPackImagePhoto} />
              </div>
            )
          )}
        </div>
      </div>

      <div className={styles.packPanel}>
        <div className={styles.packPanelHead}>
          <h2>Curated Collections</h2>
          <p>
            Discover our thoughtfully assembled gourmet boxes designed for gifting,
            celebrations and everyday luxury.
          </p>
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

        <div
          className={`${styles.packCardWrap} ${transitioning ? styles.packCardChanging : ""} ${
            direction === "next" ? styles.packDirectionNext : styles.packDirectionPrev
          }`}
        >
          <button type="button" className={styles.buyPackArrowLeft} onClick={prev} aria-label="Previous product" disabled={transitioning}>
            <ArrowLeft size={20} />
          </button>

          <div className={`${styles.packCard} ${styles[active.tone]}`} key={active.id}>
            <h3>{active.name}</h3>
            <div className={styles.packFaceCanvas} aria-hidden="true">
              <FaceCanvas />
            </div>
            <div className={styles.packBottles} data-pack-size={packSize}>
              <Image
                src={active.packImage}
                alt={`${active.name} ${packSize} pack`}
                width={1180}
                height={929}
                className={styles.packBottleImage}
              />
            </div>
            <button type="button" className={styles.packCartButton}>
              <span>Add to cart</span>
              <strong>{packSize === 3 ? "$32.00" : "$54.00"}</strong>
            </button>
          </div>

          <button type="button" className={styles.buyPackArrowRight} onClick={next} aria-label="Next product" disabled={transitioning}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
