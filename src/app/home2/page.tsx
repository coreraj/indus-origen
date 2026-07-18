import { readFileSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import TomatoFace from "./TomatoFace";
import SauceCarousel from "./SauceCarousel";
import RevealOnView from "./RevealOnView";
import BurstBackground from "./BurstBackground";
import TwoElephants from "./TwoElephants";
import BuyPackCarousel from "./BuyPackCarousel";
import AnimatedStatement from "./AnimatedStatement";
import HeroFoodParallax from "./HeroFoodParallax";
import PressCarousel from "./PressCarousel";
import HomeOneHeader from "./HomeOneHeader";
import {
  ArrowRight,
  Droplet,
  Flag,
  Heart,
  Leaf,
  Megaphone,
  Play,
  Wheat,
} from "lucide-react";
import styles from "./page.module.css";

const shopHeadingSvgSource = readFileSync(
  join(process.cwd(), "public/assets/shop-heading-reference-animated.svg"),
  "utf8"
);
const shopBirdBgCircle =
  '<circle class="shop-o-bird-bg" cx="136.925" cy="136.925" r="72" fill="rgb(255,255,255)" fill-opacity="1"></circle>';
const shopBirdMaskMarker = '<g mask="url(#__lottie_element_12_1)" style="display: block;">';
const shopHeadingSvgMarkup = (
  shopHeadingSvgSource.includes('class="shop-o-bird-bg"')
    ? shopHeadingSvgSource
    : shopHeadingSvgSource.replace(shopBirdMaskMarker, `${shopBirdBgCircle}${shopBirdMaskMarker}`)
).replace("<svg ", '<svg focusable="false" aria-hidden="true" ');

function SplitWords({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  const words = text.split(" ");
  const rendered: ReactNode[] = [];
  let charIndex = startIndex;
  words.forEach((word, wi) => {
    if (wi > 0) rendered.push(" ");
    rendered.push(
      <span className={styles.word} key={wi}>
        {word.split("").map((ch, ci) => {
          const currentIndex = charIndex;
          charIndex += 1;

          return (
            <span className={styles.char} key={ci} style={{ "--char-index": currentIndex } as CSSProperties}>
              {ch}
            </span>
          );
        })}
      </span>
    );
  });
  return (
    <span aria-label={text} className={styles.splitLine}>
      <span className={styles.line} aria-hidden="true">
        {rendered}
      </span>
    </span>
  );
}

function KajuIcon() {
  return (
    <span className={styles.kajuWrap}>
      <Image src="/assets/hero-kaju.png" alt="" width={1380} height={1140} />
      <TomatoFace />
    </span>
  );
}

function HeartBadge() {
  return (
    <div className={styles.heartBadge} aria-hidden="true">
      <svg className={styles.rotatingText} viewBox="0 0 138 138" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            id="heartBadgeCircle"
            d="M 69,69 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          />
        </defs>
        <text>
          <textPath href="#heartBadgeCircle" startOffset="0%">
            HANDMADE • SMALL BATCHES • HEARTMADE • SMALL BATCHES •
          </textPath>
        </text>
      </svg>

      <div className={styles.heartWrap}>
        <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="heartBadgeGlow" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="35%" stopColor="#ff2f2f" />
              <stop offset="70%" stopColor="#d10000" />
              <stop offset="100%" stopColor="#7c0000" />
            </radialGradient>
          </defs>
          <path
            d="M60 91 C56 87, 18 63, 18 35 C18 18, 30 8, 44 8 C53 8, 58 13, 60 19 C62 13, 67 8, 76 8 C90 8, 102 18, 102 35 C102 63, 64 87, 60 91Z"
            fill="url(#heartBadgeGlow)"
          />
          <path
            d="M43 18 C34 20, 28 28, 28 35 C28 38, 29 41, 31 44 C33 35, 38 27, 49 22 C50 21, 50 18, 43 18Z"
            fill="rgba(255,255,255,0.42)"
          />
        </svg>
      </div>
    </div>
  );
}

const loveNotes = [
  {
    quote: "Finally a tin that feels gifted before it is even opened.",
    name: "Amaan Bakali",
    role: "Founder, Weekend Table",
    image: "/assets/rajasthan-almonds-card.png",
  },
  {
    quote: "The flavor is elegant, rich, and genuinely memorable.",
    name: "Prerna Maarvikurne",
    role: "Food storyteller",
    image: "/assets/chilli-lemon-cashews-badge-card.png",
  },
  {
    quote: "Found my go-to festive dry fruit box.",
    name: "Shailin Suvarna",
    role: "Retail partner",
    image: "/assets/kolkata-dry-fruits.png",
  },
  {
    quote: "Tastes handcrafted, premium, and proudly Indian.",
    name: "Arjun Singh",
    role: "Brand consultant",
    image: "/assets/kashmir-walnuts.png",
  },
];

export default function HomeTwo() {
  return (
    <main className={styles.page}>
      <HomeOneHeader />
      <section id="top" className={styles.hero} data-hero-section>
        <HeroFoodParallax />
        <div className={styles.heroFoods} aria-hidden="true">
          <div className={`${styles.heroFood} ${styles.heroFoodPineapple}`} data-hero-food data-parallax-range="64">
            <Image src="/assets/pineapple-2.webp" alt="" width={375} height={431} />
          </div>
          <div className={`${styles.heroFood} ${styles.heroFoodOnion}`} data-hero-food data-parallax-range="92">
            <Image src="/assets/onion.webp" alt="" width={375} height={318} />
          </div>
          <div className={`${styles.heroFood} ${styles.heroFoodHabanero}`} data-hero-food data-parallax-range="86">
            <Image src="/assets/habanero.webp" alt="" width={375} height={446} />
          </div>
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroMobileIcon} aria-hidden="true">
            <KajuIcon />
          </span>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleMobile}>
              Sauce made{" "}
              <span className={styles.heroKaju}>
                <KajuIcon />
              </span>{" "}
              from real ingredients
            </span>
            <span className={styles.heroTitleDesktop}>
              <span className={styles.heroTitleRow}>
                <SplitWords text="Sauce made" />
                <span className={styles.heroKaju} aria-hidden="true">
                  <KajuIcon />
                </span>
                <SplitWords text="from" startIndex={2} />
              </span>
              <SplitWords text="real ingredients" startIndex={3} />
            </span>
          </h1>
          <p className={styles.heroDescription}>
            This is where you stop talking about sauce and actually get some.
          </p>
        </div>
      </section>

      <SauceCarousel />

      <section className={styles.infoStrip} aria-label="What makes it real">
        <div className={styles.infoStripText}>
          <h3>Just Real Food</h3>
          <p>
            Nothing to Google - just real peppers, pineapple, vinegar, garlic, and spices.
            Made from scratch in small batches, not in a factory. And a little Bucks County
            attitude.
          </p>
        </div>
        <div className={styles.infoStripIcons}>
          <div className={styles.infoStripIcon}>
            <span>
              <Leaf size={20} />
            </span>
            <b>No HFC</b>
          </div>
          <div className={styles.infoStripIcon}>
            <span>
              <Wheat size={20} />
            </span>
            <b>Gluten Free</b>
          </div>
          <div className={styles.infoStripIcon}>
            <span>
              <Droplet size={20} />
            </span>
            <b>No Additives</b>
          </div>
          <div className={styles.infoStripIcon}>
            <span>
              <Flag size={20} />
            </span>
            <b>No Seed Oils</b>
          </div>
        </div>
        <div className={styles.infoStripText}>
          <h3>Pairs With</h3>
          <p>
            Wings, baby back ribs, pulled pork, BBQ chicken, pork chops, salmon, burgers,
            roasted vegetables, tacos, pizza - and anything that needs more flavor.
          </p>
        </div>
      </section>

      <section id="chef" className={styles.chef}>
        <RevealOnView className={styles.chefHero}>
          <BurstBackground />
          <div className={styles.actionText}>
            <TwoElephants className={styles.chefEmblem} />
            <span>Meet the chef in</span>
            <strong>Action</strong>
          </div>
        </RevealOnView>
        <RevealOnView delayMs={150}>
          <div className={styles.streetFrame}>
            {/* Placeholder poster for the founder's-journey video — swap this
                Image for a <video> element (and drop the play button) once
                the real footage is ready. */}
            <Image
              src="/assets/chef-street-poster.png"
              alt="Street scene from India, preview for the founder's-journey video"
              fill
              sizes="(max-width: 1050px) 100vw, 1015px"
              className={styles.streetPoster}
              priority={false}
            />
            <button type="button" className={styles.videoPlayButton} aria-label="Play video (coming soon)">
              <Play size={26} fill="currentColor" />
            </button>
            <div className={styles.redStrip}>
              Indus Origin invites you on a culinary voyage through India&apos;s markets, regional
              kitchens and bold everyday rituals.
            </div>
          </div>
        </RevealOnView>
        <RevealOnView delayMs={300}>
          <div className={styles.storyStatement}>
            <HeartBadge />
            <AnimatedStatement text="Every bottle of Bucks Sauce is made with real ingredients, big attitude, and zero patience for bland food." />
            <button type="button">How it started</button>
          </div>
        </RevealOnView>
      </section>

      <BuyPackCarousel />

      <section id="shop" className={styles.shopMarqueeSection} aria-labelledby="shop-marquee-title">
        <div className={styles.shopMarquee} aria-hidden="true">
          <div className={styles.shopMarqueeTrack}>
            {Array.from({ length: 6 }).map((_, index) => (
              <span className={styles.shopMarqueeItem} key={index}>
                <span>From India</span>
                <span className={styles.shopTukTuk} />
              </span>
            ))}
          </div>
        </div>
        <div className={styles.shopHeadingWrap}>
          <h2 id="shop-marquee-title" className={styles.shopMegaTitle} aria-label="Shop">
            <span className={styles.shopHeadingSvg} dangerouslySetInnerHTML={{ __html: shopHeadingSvgMarkup }} />
          </h2>
        </div>
      </section>

      <section className={styles.loveSection} aria-label="Customer love">
        <div className={styles.loveSectionHead}>
          <h2>Real people. Real love.</h2>
          <div className={styles.loveCounter}>
            <span>
              <Heart size={18} fill="currentColor" />
              226K
            </span>
            <p>
              We&apos;re blessed! Because
              <br />
              we have you
            </p>
          </div>
        </div>
        <div className={styles.loveCards}>
          {loveNotes.map((note) => (
            <article className={styles.loveCard} key={note.name}>
              <blockquote>{note.quote}</blockquote>
              <div className={styles.loveCardImage}>
                <Image src={note.image} alt="" fill sizes="(max-width: 900px) 70vw, 190px" />
              </div>
              <div className={styles.loveCardFooter}>
                <div>
                  <strong>{note.name}</strong>
                  <p>{note.role}</p>
                </div>
                <button type="button" aria-label={`Read ${note.name}'s note`}>
                  <ArrowRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.communitySection} aria-label="Join the community">
        <div className={styles.communityInner}>
          <div className={styles.communityIntro}>
            <div className={styles.communityTitleRow}>
              <h2>
                Come, join
                <br />
                the fam!
              </h2>
              <p>Go truth seekers!</p>
            </div>
            <div className={styles.communityButtons}>
              <a className={styles.communityButtonPrimary} href="#shop">
                <span className={styles.communityIcon}>ig</span>
                <span>Join our Instagram Community</span>
                <ArrowRight size={22} />
              </a>
              <div className={styles.communityButtonRow}>
                <a href="#shop">
                  <span className={styles.communityIcon}>▶</span>
                  <span>YouTube</span>
                  <ArrowRight size={20} />
                </a>
                <a href="#shop">
                  <span className={styles.communityIcon}>in</span>
                  <span>LinkedIn</span>
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.communityPhoto}>
            <Image
              src="/assets/truth-community-photo.png"
              alt="A hand holding a Whole Truth protein pouch"
              fill
              sizes="(max-width: 900px) 100vw, 481px"
            />
          </div>

          <p className={styles.pressScribble}>
            STOP the PRESS!
            <br />
            Print The Looove ♥
          </p>

          <PressCarousel />
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <strong>IO</strong>
          <div className={styles.footerSignup}>
            <h3>
              <Megaphone size={25} />
              Truth-seekers, unite!
            </h3>
            <p>
              One, BS free, in-depth article about food, craft, and flavor.
              Delivered every Saturday. Free <span>(for now)</span>
            </p>
            <label htmlFor="home2-email">Email</label>
            <div>
              <input id="home2-email" placeholder="Enter your email" />
              <button type="button">Count me in</button>
            </div>
          </div>
        </div>

        <div className={styles.appBlock}>
          <div>
            <span>Food Safety Connect App</span>
            <p>Food Safety Connect app lets users report food issues, check FBOs, and get safety updates.</p>
          </div>
          <div className={styles.qrGroup}>
            <div>
              <div className={styles.qr} />
              <b>Android</b>
            </div>
            <div>
              <div className={styles.qr} />
              <b>iOS</b>
            </div>
          </div>
        </div>

        <nav className={styles.footerLinks} aria-label="Footer links">
          <div>
            <a href="#shop">Contact Us</a>
            <a href="#shop">Terms of Service</a>
            <a href="#shop">My Account</a>
            <a href="#shop">My Loyalty Points</a>
            <a href="#shop">Privacy Policy</a>
            <a href="#shop">Our Policies</a>
            <a href="#chef">Why We Exist</a>
            <a href="#chef">Careers</a>
          </div>
          <div>
            <a href="#shop">Why Prices Change</a>
            <a href="#shop">Ingredient Reports</a>
            <a href="#shop">Food Safety Reports</a>
            <a href="#shop">International Orders</a>
            <a href="#shop">Corporate Gifting</a>
            <a href="#shop">Unauthorized Sellers</a>
          </div>
          <div>
            <a href="#shop">Premium Dry Fruits</a>
            <a href="#shop">Rajasthan Almonds</a>
            <a href="#shop">Kashmir Walnuts</a>
            <a href="#shop">Kolkata Dry Fruits</a>
            <a href="#shop">Gift Packs</a>
            <a href="#shop">Limited Editions</a>
            <Link href="/">Home 1</Link>
          </div>
        </nav>

        <div className={styles.socials} aria-label="Social links">
          <a href="#shop">X</a>
          <a href="#shop">f</a>
          <a href="#shop">◎</a>
          <a href="#shop">▶</a>
        </div>

        <p className={styles.footerCopyright}>© 2026 Indus Origin Co. All rights reserved.</p>
      </footer>
    </main>
  );
}
