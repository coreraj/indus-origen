import Image from "next/image";
import styles from "./page.module.css";

export default function ProductJar({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.jar} ${compact ? styles.jarCompact : ""}`} aria-hidden="true">
      <Image src="/assets/bucks-bottle.png" alt="" width={405} height={1058} />
    </div>
  );
}
