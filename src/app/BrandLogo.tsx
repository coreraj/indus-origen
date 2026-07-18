import Image from "next/image";
import styles from "./BrandLogo.module.css";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
  decorative?: boolean;
  priority?: boolean;
};

export default function BrandLogo({
  className,
  compact = false,
  decorative = false,
  priority = false,
}: BrandLogoProps) {
  const modeClass = compact ? styles.compactMode : styles.defaultMode;

  return (
    <span
      className={`${styles.root} ${modeClass} ${className ?? ""}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Indus Origin Co logo"}
      aria-hidden={decorative ? "true" : undefined}
    >
      <Image
        src="/assets/indus-origin-logo.png"
        alt=""
        width={1051}
        height={1497}
        className={`${styles.image} ${styles.fullImage}`}
        priority={priority}
        sizes="(max-width: 720px) 92px, 150px"
      />
      <Image
        src="/assets/indus-elephant-logo.png"
        alt=""
        width={447}
        height={558}
        className={`${styles.image} ${styles.compactImage}`}
        priority={priority}
        sizes="63px"
      />
    </span>
  );
}
