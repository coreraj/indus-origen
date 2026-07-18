import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

export type SauceProduct = {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  statement: string;
  price: string;
  tone: "toneGold" | "toneOrange" | "toneRed" | "tonePlum";
  image: string;
  badge: string;
};

export default function DiamondProductCard({ product }: { product: SauceProduct }) {
  return (
    <article className={styles.productCard}>
      <div className={`${styles.productCardFace} ${styles[product.tone]}`}>
        <Image src="/assets/lotus-card-default.png" alt="" width={653} height={938} className={styles.defaultCardLotus} />
        <div className={styles.defaultCardFlowers} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.defaultCardHead}>
          <h2>{product.title}</h2>
          <p>{product.subtitle}</p>
        </div>
      </div>
      <div className={`${styles.productCardFaceHover} ${styles[product.tone]}`}>
        <Image src="/assets/lotus-card-hover.png" alt="" width={448} height={448} className={styles.hoverCardLotus} />
        <div className={styles.hoverCardFlowers} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.hoverCardBody}>
          <p>{product.description}</p>
          <strong>{product.statement}</strong>
        </div>
        <div className={styles.hoverCardActions}>
          <button type="button" className={styles.addToCartBtn}>
            <span>Add to cart</span>
            <b>{product.price}</b>
          </button>
          <button type="button" className={styles.viewProductBtn}>
            <span>View product</span>
            <span className={styles.arrowBox}>
              <ArrowUpRight size={18} />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.cardProductMotion}>
        <Image
          src={product.image}
          alt={product.name}
          width={900}
          height={1200}
          className={styles.cardProductTin}
          priority
        />
        <Image src={product.badge} alt="" width={160} height={160} className={styles.cardProductBadge} />
      </div>
    </article>
  );
}
