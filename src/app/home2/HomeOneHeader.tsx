"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Camera, Menu, ShoppingBasket, ThumbsUp, X } from "lucide-react";
import styles from "./page.module.css";

function BrandMark() {
  return (
    <div className={styles.brandMark} aria-hidden="true">
      <span>Indus</span>
      <strong>Origen</strong>
      <i />
    </div>
  );
}

export default function HomeOneHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);

  useEffect(() => {
    const updateHeader = () => setHeaderCompact(window.scrollY > 80);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <>
      <header className={`${styles.topbar} ${headerCompact ? styles.headerCompact : ""}`}>
        <a className={styles.logoLink} href="#top" aria-label="Indus Origen home">
          <BrandMark />
        </a>
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#bundles">Wholesale</a>
          <a href="#origin">About</a>
          <a href="#club">Contact</a>
          <a href="#faq">FAQ</a>
          <Link href="/">Home 1</Link>
          <a href="#cart">Cart(0)</a>
        </nav>
      </header>

      <div className={`${styles.cornerActions} ${headerCompact ? styles.actionsVisible : ""}`}>
        <a href="#shop">Get snacks</a>
        <button type="button" aria-label="Open cart">
          <ShoppingBasket size={22} />
        </button>
        <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <Menu size={25} />
        </button>
      </div>

      <div className={`${styles.menuPanel} ${menuOpen ? styles.menuOpen : ""}`}>
        <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
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
    </>
  );
}
