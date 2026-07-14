"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Menu,
  ShoppingBasket,
  ThumbsUp,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    no: "01",
    name: "Peanut Shots",
    kicker: "Peanut coated bites",
    color: "mustard",
    price: "$8.00",
    caption: "Crunchy coated peanuts with a sweet-salty street snack snap.",
    bits: ["peanut", "jaggery", "sea salt"],
  },
  {
    no: "02",
    name: "Chilli Lemon Cashews",
    kicker: "Spicy tangy cashews",
    color: "chilli",
    price: "$10.00",
    caption: "Roasted cashews hit with chilli, lemon, and a bright finish.",
    bits: ["cashew", "lemon", "chilli"],
  },
  {
    no: "03",
    name: "Hazelnut Roco",
    kicker: "Hazelnut chocolate bites",
    color: "cocoa",
    price: "$11.00",
    caption: "Chocolate coated hazelnut bites built for dessert-level snacking.",
    bits: ["hazelnut", "cocoa", "crunch"],
  },
  {
    no: "04",
    name: "Rose Pista Granola",
    kicker: "Rose + pista granola mix",
    color: "rose",
    price: "$9.00",
    caption: "Floral rose, pista crunch, and golden clusters in one loud mix.",
    bits: ["rose", "pista", "oats"],
  },
  {
    no: "05",
    name: "Pizza Almonds",
    kicker: "Pizza-flavored almonds",
    color: "tomato",
    price: "$10.00",
    caption: "Roasted almonds dusted like the last slice disappeared first.",
    bits: ["almond", "tomato", "herbs"],
  },
];

const bundles = [
  "Hazelnut Roco + Pizza Almonds",
  "Rose Pista Granola + Hazelnut Roco",
  "Rose Pista Granola + Hazelnut Roco + Chilli Lemon Cashews",
];

const reviews = [
  {
    title: "This is what desk snacks wanted to be.",
    copy: "The chilli lemon cashews have that dangerous one-more-handful problem.",
  },
  {
    title: "Loud flavor, premium finish.",
    copy: "Rose pista granola feels familiar and new at the same time.",
  },
  {
    title: "Pizza almonds are not playing fair.",
    copy: "They taste like the snack aisle finally got a personality.",
  },
];

function BrandMark() {
  return (
    <div className={styles.brandMark} aria-hidden="true">
      <span>Indus</span>
      <strong>Origen</strong>
      <i />
    </div>
  );
}

function SnackPack({
  product,
  size = "regular",
}: {
  product: (typeof products)[number];
  size?: "regular" | "hero" | "small";
}) {
  return (
    <div className={`${styles.pack} ${styles[product.color]} ${styles[size]}`}>
      <div className={styles.packSeal}>IO</div>
      <div className={styles.packBody}>
        <span>Indus Origen</span>
        <strong>{product.name}</strong>
        <em>{product.kicker}</em>
      </div>
      <div className={styles.packWindow}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 105,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.from("[data-hero-pack]", {
        y: 80,
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.35,
      });

      gsap.to("[data-float]", {
        y: -18,
        rotate: 2,
        repeat: -1,
        yoyo: true,
        duration: 2.4,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to("[data-marquee-track]", {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.from(item, {
          y: 54,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 84%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((item, index) => {
        gsap.to(item, {
          x: index % 2 ? -36 : 36,
          scrollTrigger: {
            trigger: item,
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const featured = products[4];

  return (
    <main ref={rootRef} className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.logoLink} href="#top" aria-label="Indus Origen home">
          <BrandMark />
        </a>
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#bundles">Wholesale</a>
          <a href="#origin">About</a>
          <a href="#club">Contact</a>
          <a href="#faq">FAQ</a>
          <a href="#cart">Cart(0)</a>
        </nav>
      </header>

      <div className={styles.cornerActions}>
        <a href="#shop">Get snacks</a>
        <button aria-label="Open cart">
          <ShoppingBasket size={22} />
        </button>
        <button aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <Menu size={25} />
        </button>
      </div>

      <div className={`${styles.menuPanel} ${menuOpen ? styles.menuOpen : ""}`}>
        <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
          <X size={22} />
        </button>
        <a href="#shop" onClick={() => setMenuOpen(false)}>
          Shop
        </a>
        <a href="#bundles" onClick={() => setMenuOpen(false)}>
          Wholesale
        </a>
        <a href="#origin" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="#club" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>
          FAQ
        </a>
        <div>
          <span>Instagram</span>
          <Camera size={18} />
        </div>
        <div>
          <span>Facebook</span>
          <ThumbsUp size={18} />
        </div>
      </div>

      <section id="top" className={styles.hero}>
        <div className={styles.heroTitle}>
          <h1 aria-label="The snacks that make other snacks insecure">
            <span data-hero-line>The snacks</span>
            <span data-hero-line>that make</span>
            <span data-hero-line>other snacks</span>
            <span data-hero-line>insecure</span>
          </h1>
        </div>

        <div className={styles.heroProduct} data-hero-pack>
          <div className={styles.productMetaLeft}>Product No. 01</div>
          <div className={styles.productMetaRight}>{featured.name}</div>
          <button className={styles.roundArrow} aria-label="Previous product">
            <ArrowLeft size={28} />
          </button>
          <button className={`${styles.roundArrow} ${styles.nextArrow}`} aria-label="Next product">
            <ArrowRight size={28} />
          </button>
          <div className={styles.heroBlob} />
          <div className={styles.floatingSnackOne} data-float />
          <div className={styles.floatingSnackTwo} data-float />
          <SnackPack product={featured} size="hero" />
          <a className={styles.shopNow} href="#shop">
            Shop now
          </a>
        </div>
      </section>

      <section className={styles.copyPunch} data-reveal>
        <p>
          Our snacks use real, natural stuff like it&apos;s the 1800s. Rip it
          open, pass it around, and act surprised when people think you can
          snack.
        </p>
      </section>

      <section className={styles.marquee} aria-label="Product marquee">
        <div data-marquee-track>
          {Array.from({ length: 2 }).map((_, index) => (
            <div className={styles.marqueeGroup} key={index}>
              <span>Hazelnut Roco</span>
              <span>Chilli Lemon Cashews</span>
              <span>Pizza Almonds</span>
              <span>Peanut Shots</span>
              <span>Rose Pista Granola</span>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className={styles.weaponSection}>
        <p className={styles.sectionKicker} data-reveal>
          Choose your
        </p>
        <h2 className={styles.outlineWord} data-drift>
          Weapon
        </h2>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <article className={styles.productCard} key={product.name} data-reveal>
              <div className={styles.cardHeader}>
                <span>{product.name}</span>
                <small>{product.kicker}</small>
              </div>
              <SnackPack product={product} />
              <p>{product.caption}</p>
              <div className={styles.cardActions}>
                <button>
                  Add to cart <strong>{product.price}</strong>
                </button>
                <a href="#origin" aria-label={`View ${product.name}`}>
                  View product <ArrowRight size={20} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="origin" className={styles.storyGrid}>
        <div className={styles.foodImage} data-reveal>
          <div />
          <span>Crunch that looks illegal but is mostly roasted.</span>
        </div>
        <article className={styles.ingredientPanel} data-reveal>
          <h2>01</h2>
          <span>Ingredients</span>
          <p>
            Nuts, grains, chocolate, rose, pista, chilli, lemon, herbs. No
            flavor shortcuts. No sleepy snack logic.
          </p>
        </article>
        <article className={styles.ingredientPanelAlt} data-reveal>
          <h2>02</h2>
          <span>Built for shelves</span>
          <p>
            Every pack gets a loud color, a clear product name, and a reason to
            be grabbed from the cart.
          </p>
        </article>
        <article className={styles.awardPanel} data-reveal>
          <h2>03</h2>
          <span>Oh, this?</span>
          <p>
            Indus Origen Snack Fest 2026: best thing on the table that was not
            technically dinner.
          </p>
        </article>
      </section>

      <section id="bundles" className={styles.bundleShowcase}>
        <div className={styles.bundleCopy} data-reveal>
          <p className={styles.sectionKicker}>Shop the chaos</p>
          <h2>Combos that stack like collector cards.</h2>
        </div>
        <div className={styles.bundleCarousel}>
          {bundles.map((bundle, index) => (
            <article className={styles.bundleCard} key={bundle} data-reveal>
              <button aria-label="Previous bundle">
                <ArrowLeft size={22} />
              </button>
              <div>
                <h3>{bundle}</h3>
                <div className={styles.bundlePacks}>
                  <SnackPack product={products[index]} size="small" />
                  <SnackPack product={products[index + 1]} size="small" />
                  <SnackPack product={products[index + 2]} size="small" />
                </div>
                <a href="#cart">Add to cart $32.00</a>
              </div>
              <button aria-label="Next bundle">
                <ArrowRight size={22} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.reviews}>
        <h2 className={styles.outlineWord} data-drift>
          Reviews
        </h2>
        <div className={styles.reviewGrid}>
          {reviews.map((review) => (
            <blockquote key={review.title} data-reveal>
              <h3>{review.title}</h3>
              <p>{review.copy}</p>
            </blockquote>
          ))}
        </div>
      </section>

      <footer id="club" className={styles.footer}>
        <div className={styles.footerBrand} data-reveal>
          <BrandMark />
        </div>
        <nav className={styles.footerNav} aria-label="Footer navigation" data-reveal>
          <a href="#shop">Shop</a>
          <a href="#bundles">Wholesale</a>
          <a href="#origin">About</a>
          <a href="#faq">FAQ</a>
          <a href="#club">Contact</a>
        </nav>
        <form className={styles.clubForm} data-reveal>
          <h2>Join the Indus club</h2>
          <p>New flavors. Restocks. Combo drops.</p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Your email..." />
          <button type="submit" aria-label="Submit email">
            <ArrowRight size={26} />
          </button>
        </form>
        <div className={styles.socials} data-reveal>
          <a href="#top" aria-label="Instagram">
            <Camera size={26} />
          </a>
          <a href="#top" aria-label="Facebook">
            <ThumbsUp size={26} />
          </a>
        </div>
        <small>2026. Indus Origen. All rights reserved.</small>
      </footer>
    </main>
  );
}
