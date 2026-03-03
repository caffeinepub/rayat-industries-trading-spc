import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  Factory,
  FileText,
  Globe,
  Handshake,
  HardHat,
  Heart,
  Hotel,
  Layers,
  Lightbulb,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Newspaper,
  Package,
  Phone,
  Server,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Users,
  Wheat,
  Wifi,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Language types & helpers ─────────────────────────────────────────────────
type Lang = "en" | "ar";
function makeT(lang: Lang) {
  return (en: string, ar: string) => (lang === "ar" ? ar : en);
}

// ─── Page type ────────────────────────────────────────────────────────────────
type Page =
  | "home"
  | "labour"
  | "services"
  | "portfolio"
  | "team"
  | "news"
  | "contact"
  | "trading-divisions"
  | "fmcg"
  | "networking"
  | "construction-materials"
  | "safety-ppe"
  | "solar";

// ─── Watermark component ──────────────────────────────────────────────────────
function LogoWatermark({ size = 320 }: { size?: number }) {
  return (
    <img
      src="/assets/generated/rayat-logo-extracted-transparent-transparent.dim_400x400.png"
      alt=""
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        width: size,
        height: size,
        opacity: 0.08,
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        objectFit: "contain",
        zIndex: 1,
      }}
    />
  );
}

// ─── Page Hero Banner ────────────────────────────────────────────────────────
function PageHero({
  title,
  subtitle,
  image,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/92 via-brand-teal/80 to-brand-teal-dark/90" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.07) 20px, rgba(255,255,255,0.07) 40px)",
        }}
      />
      <LogoWatermark size={340} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 pt-32 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-brand-gold/90 font-medium text-sm tracking-widest uppercase mb-3 text-outline">
            RAYAT Industries Trading SPC &nbsp;/&nbsp; {breadcrumb}
          </p>
          <h1 className="font-display text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 text-outline-strong">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-outline">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
        >
          <path
            d="M0 50L60 42C120 34 240 18 360 13C480 8 600 16 720 21C840 26 960 26 1080 21C1200 16 1320 8 1380 4L1440 0V50H0Z"
            fill="oklch(0.97 0.02 78)"
          />
        </svg>
      </div>
    </section>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = makeT(lang);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tradingDropdownOpen, setTradingDropdownOpen] = useState(false);
  const [mobileTradingOpen, setMobileTradingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentPage is a prop used to reset scroll on navigation
  useEffect(() => {
    // Reset to top on page change, then start listening
    setScrolled(false);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPage]);

  const tradingDivisionPages: Page[] = [
    "trading-divisions",
    "fmcg",
    "networking",
    "construction-materials",
    "safety-ppe",
    "solar",
  ];
  const isTradingActive = tradingDivisionPages.includes(currentPage);

  const navLinks: { label: string; page: Page }[] = [
    { label: t("Home", "الرئيسية"), page: "home" },
    { label: t("Portfolio", "المحفظة"), page: "portfolio" },
    { label: t("Services", "الخدمات"), page: "services" },
  ];

  const tradingSubLinks: { label: string; page: Page }[] = [
    {
      label: t("Trading Overview", "نظرة عامة على التداول"),
      page: "trading-divisions",
    },
    { label: t("Solar Division", "قسم الطاقة الشمسية"), page: "solar" },
    { label: t("FMCG Division", "قسم السلع الاستهلاكية"), page: "fmcg" },
    { label: t("Networking Division", "قسم الشبكات"), page: "networking" },
    {
      label: t("Construction Materials", "مواد البناء"),
      page: "construction-materials",
    },
    {
      label: t("Safety & PPE / Metals", "السلامة والمعادن"),
      page: "safety-ppe",
    },
  ];

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    setTradingDropdownOpen(false);
  }

  // Pages without a full-bleed hero video/image — use opaque navbar from the start
  const hasHeroVideo: boolean = currentPage === "home";

  const isTransparent = !scrolled && hasHeroVideo;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 md:h-32">
          {/* Logo + Name */}
          <button
            type="button"
            data-ocid="nav.home.link"
            className="flex items-center gap-4 min-w-0 cursor-pointer"
            onClick={() => navigate("home")}
          >
            <img
              src="/assets/generated/rayat-logo-extracted-transparent-transparent.dim_400x400.png"
              alt="RAYAT Industries Trading SPC Logo"
              className="w-auto object-contain flex-shrink-0"
              style={{ height: "96px" }}
            />
            <span className="flex flex-col leading-none font-display transition-colors duration-300">
              <span
                className={`font-bold text-base md:text-lg lg:text-xl tracking-wide transition-colors duration-300 ${
                  isTransparent ? "text-white" : "text-brand-teal-dark"
                }`}
                style={
                  isTransparent
                    ? {
                        textShadow:
                          "-1px -1px 0 rgba(0,0,0,0.9), 1px -1px 0 rgba(0,0,0,0.9), -1px 1px 0 rgba(0,0,0,0.9), 1px 1px 0 rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.6)",
                      }
                    : undefined
                }
              >
                RAYAT Industries
              </span>
              <span
                className={`font-medium text-sm md:text-base tracking-wide mt-0.5 transition-colors duration-300 ${
                  isTransparent ? "text-brand-gold" : "text-brand-gold"
                }`}
                style={{
                  fontFamily:
                    "'Amiri', 'Scheherazade New', 'Arabic UI Text', serif",
                  direction: "rtl",
                  ...(isTransparent
                    ? {
                        textShadow:
                          "-1px -1px 0 rgba(0,0,0,0.9), 1px -1px 0 rgba(0,0,0,0.9), -1px 1px 0 rgba(0,0,0,0.9), 1px 1px 0 rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.6)",
                      }
                    : undefined),
                }}
              >
                رايات للصناعات
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.page}
                data-ocid={`nav.${link.page}.link`}
                onClick={() => navigate(link.page)}
                className={`font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer pb-0.5 ${
                  currentPage === link.page
                    ? isTransparent
                      ? "text-white border-b-2 border-white"
                      : "text-brand-teal border-b-2 border-brand-teal"
                    : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-brand-teal-dark hover:text-brand-teal"
                }`}
                style={
                  isTransparent
                    ? {
                        textShadow:
                          "-1px -1px 0 rgba(0,0,0,0.9), 1px -1px 0 rgba(0,0,0,0.9), -1px 1px 0 rgba(0,0,0,0.9), 1px 1px 0 rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)",
                      }
                    : undefined
                }
              >
                {link.label}
              </button>
            ))}

            {/* Trading Divisions Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-ocid="nav.trading-divisions.link"
                onClick={() => setTradingDropdownOpen((v) => !v)}
                onBlur={() =>
                  setTimeout(() => setTradingDropdownOpen(false), 150)
                }
                className={`flex items-center gap-1 font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer pb-0.5 ${
                  isTradingActive
                    ? isTransparent
                      ? "text-white border-b-2 border-white"
                      : "text-brand-teal border-b-2 border-brand-teal"
                    : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-brand-teal-dark hover:text-brand-teal"
                }`}
                style={
                  isTransparent
                    ? {
                        textShadow:
                          "-1px -1px 0 rgba(0,0,0,0.9), 1px -1px 0 rgba(0,0,0,0.9), -1px 1px 0 rgba(0,0,0,0.9), 1px 1px 0 rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)",
                      }
                    : undefined
                }
              >
                {t("Trading", "التداول")}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${tradingDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {tradingDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50"
                  >
                    {tradingSubLinks.map((link) => (
                      <button
                        key={link.page}
                        type="button"
                        data-ocid={`nav.dropdown.${link.page}.link`}
                        onClick={() => navigate(link.page)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                          currentPage === link.page
                            ? "bg-brand-teal text-white font-semibold"
                            : "text-brand-teal-dark hover:bg-brand-sand hover:text-brand-teal"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language toggle */}
            <button
              type="button"
              data-ocid="nav.lang.toggle"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-200 ${
                isTransparent
                  ? "border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-gray-900"
                  : "border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-gray-900"
              }`}
              style={
                isTransparent
                  ? {
                      textShadow:
                        "-1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)",
                    }
                  : undefined
              }
              aria-label={
                lang === "en" ? "Switch to Arabic" : "Switch to English"
              }
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>

            <button
              type="button"
              data-ocid="nav.contact.primary_button"
              onClick={() => navigate("contact")}
              className={`px-4 py-2 rounded font-semibold text-sm transition-all duration-300 ${
                isTransparent
                  ? "bg-white/20 border border-white text-white hover:bg-white/40 backdrop-blur-sm"
                  : "bg-brand-teal text-white hover:bg-brand-teal-dark"
              } ${currentPage === "contact" && !isTransparent ? "ring-2 ring-brand-teal-dark" : ""}`}
            >
              {t("Contact Us", "تواصل معنا")}
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="nav.mobile_menu.toggle"
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-brand-teal-dark"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-brand-teal/20 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.page}
                  data-ocid={`nav.mobile.${link.page}.link`}
                  onClick={() => navigate(link.page)}
                  className={`text-left font-medium py-2.5 px-3 rounded-lg transition-colors text-sm ${
                    currentPage === link.page
                      ? "bg-brand-teal text-white"
                      : "text-brand-teal-dark hover:bg-brand-teal/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Mobile Trading accordion */}
              <button
                type="button"
                data-ocid="nav.mobile.trading.toggle"
                onClick={() => setMobileTradingOpen((v) => !v)}
                className={`flex items-center justify-between text-left font-medium py-2.5 px-3 rounded-lg transition-colors text-sm ${
                  isTradingActive
                    ? "bg-brand-teal text-white"
                    : "text-brand-teal-dark hover:bg-brand-teal/10"
                }`}
              >
                <span>{t("Trading Divisions", "أقسام التداول")}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${mobileTradingOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileTradingOpen && (
                <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-brand-teal/30 pl-3">
                  {tradingSubLinks.map((link) => (
                    <button
                      key={link.page}
                      type="button"
                      data-ocid={`nav.mobile.${link.page}.link`}
                      onClick={() => navigate(link.page)}
                      className={`text-left font-medium py-2 px-3 rounded-lg transition-colors text-sm ${
                        currentPage === link.page
                          ? "bg-brand-teal text-white"
                          : "text-brand-teal-dark hover:bg-brand-teal/10"
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                data-ocid="nav.mobile.contact.primary_button"
                onClick={() => navigate("contact")}
                className="bg-brand-teal text-white px-4 py-2.5 rounded-lg font-semibold text-sm text-center hover:bg-brand-teal-dark transition-colors mt-2"
              >
                {t("Contact Us", "تواصل معنا")}
              </button>

              {/* Mobile language toggle */}
              <button
                type="button"
                data-ocid="nav.mobile.lang.toggle"
                onClick={() => {
                  setLang(lang === "en" ? "ar" : "en");
                  setMobileOpen(false);
                }}
                className="border-2 border-brand-gold text-brand-gold px-4 py-2 rounded-lg font-bold text-sm text-center hover:bg-brand-gold hover:text-gray-900 transition-colors mt-1"
              >
                {lang === "en"
                  ? "عربي | Switch to Arabic"
                  : "EN | Switch to English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Scroll helper ────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HeroSection({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Static image fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1400x600.jpg')",
        }}
      />
      {/* Video background overlay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        poster="/assets/generated/hero-banner.dim_1400x600.jpg"
      >
        <source
          src="https://videos.pexels.com/video-files/852395/852395-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/90 via-brand-teal/75 to-brand-teal-dark/85" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)",
        }}
      />
      <LogoWatermark size={480} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="font-semibold text-2xl md:text-3xl mb-3 tracking-widest text-outline"
            dir="rtl"
            style={{ color: "rgba(201,168,76,0.45)" }}
          >
            رايات للصناعات والتجارة
          </p>
          <h1 className="mb-6">
            <span
              className="font-display text-white font-black block text-outline-strong"
              style={{
                fontSize: "clamp(5rem, 12vw, 9rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              RAYAT
            </span>
            <span
              className="font-display text-brand-gold/90 font-semibold block tracking-[0.3em] uppercase text-outline"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
                marginTop: "0.25em",
              }}
            >
              industries
            </span>
          </h1>
          <p className="text-white/85 text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto leading-relaxed text-outline">
            {t(
              "Building Oman's Future Through Industrial Excellence & Global Trade",
              "بناء مستقبل عُمان من خلال التميز الصناعي والتجارة العالمية",
            )}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              type="button"
              data-ocid="hero.explore_sectors.primary_button"
              onClick={() => scrollTo("sectors")}
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded active:scale-95 transition-all duration-200 text-base shadow-xl"
              style={{
                backgroundColor: "rgba(201,168,76,0.45)",
                color: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(201,168,76,0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(201,168,76,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(201,168,76,0.45)";
              }}
            >
              {t("Explore Our Sectors", "استكشف قطاعاتنا")}
              <ChevronRight size={18} className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              data-ocid="hero.contact_us.secondary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded hover:bg-white hover:text-brand-teal active:scale-95 transition-all duration-200 text-base"
            >
              {t("Contact Us", "تواصل معنا")}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
        >
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="oklch(0.97 0.02 78)"
          />
        </svg>
      </div>
    </section>
  );
}

function AboutSection({ lang }: { lang: Lang }) {
  const t = makeT(lang);
  const stats = [
    { value: "10+", label: t("Years Experience", "سنوات خبرة") },
    { value: "4+", label: t("Industry Sectors", "قطاعات صناعية") },
    { value: "50+", label: t("Trusted Partners", "شركاء موثوقون") },
    { value: "100%", label: t("Omani Owned", "ملكية عُمانية") },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
              {t("Who We Are", "من نحن")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t("About RAYAT Industries", "عن رايات للصناعات والتجارة")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              {t(
                "RAYAT Industries is a dynamic Omani company committed to driving industrial growth and facilitating global trade across the Sultanate. Founded on principles of integrity, quality, and innovation, we serve as a trusted partner for businesses across solar energy, seafood & food trading, construction, general trading, and industrial supply sectors.",
                "رايات للصناعات والتجارة ش.ش.ف هي شركة عُمانية ديناميكية ملتزمة بدفع عجلة النمو الصناعي وتيسير التجارة العالمية في جميع أنحاء السلطنة. تأسست على مبادئ النزاهة والجودة والابتكار، ونعمل كشريك موثوق للشركات في قطاعات البناء والزراعة والتجارة العامة والإمدادات الصناعية.",
              )}
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              {t(
                "Our deep market knowledge and strong supplier networks allow us to deliver reliable solutions that meet the evolving needs of Oman's growing economy.",
                "تتيح لنا معرفتنا العميقة بالسوق وشبكات الموردين القوية تقديم حلول موثوقة تلبي الاحتياجات المتطورة لاقتصاد عُمان المتنامي.",
              )}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-center bg-white rounded-lg p-4 shadow-sm border border-border"
                >
                  <div className="font-display text-2xl md:text-3xl font-extrabold text-brand-teal">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/generated/about-dock-crane.dim_800x600.jpg"
                className="w-full h-full object-cover"
              >
                <source
                  src="https://videos.pexels.com/video-files/4839014/4839014-uhd_2560_1440_25fps.mp4"
                  type="video/mp4"
                />
                <img
                  src="/assets/generated/about-dock-crane.dim_800x600.jpg"
                  alt="Shipping containers being unloaded at a port with large cranes"
                  className="w-full h-full object-cover"
                />
              </video>
              <div className="absolute inset-0 rounded-2xl ring-4 ring-brand-gold/30 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function getSectors(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      title: t("Construction & Infrastructure", "البناء والبنية التحتية"),
      description: t(
        "We supply high-quality construction materials, equipment, and project support services to contractors and developers across Oman and the GCC.",
        "نوفر مواد بناء عالية الجودة ومعدات وخدمات دعم المشاريع للمقاولين والمطورين في عُمان ودول الخليج.",
      ),
      image: "/assets/generated/sector-construction.dim_600x400.jpg",
      icon: Building2,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      page: "services" as Page,
    },
    {
      title: t("Seafood & Food Trading", "المأكولات البحرية وتجارة الأغذية"),
      description: t(
        "Premium seafood (shrimp, tuna, salmon, mackerel, squid and more), poultry, and agricultural products connecting Oman with global supply chains.",
        "مأكولات بحرية متميزة (روبيان، تونة، سلمون وأكثر) ودواجن ومنتجات زراعية تربط عُمان بسلاسل الإمداد العالمية.",
      ),
      image: "/assets/generated/fmcg-seafood-poultry.dim_800x600.jpg",
      icon: Wheat,
      color: "text-blue-700",
      bg: "bg-blue-50",
      page: "fmcg" as Page,
    },
    {
      title: t("General Trading & Logistics", "التجارة العامة واللوجستيات"),
      description: t(
        "Our general trading operations cover a broad range of commodities, managed through efficient logistics and strong international partnerships.",
        "تغطي عملياتنا التجارية العامة مجموعة واسعة من السلع، تُدار من خلال لوجستيات فعّالة وشراكات دولية قوية.",
      ),
      image: "/assets/generated/sector-trading.dim_600x400.jpg",
      icon: Truck,
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
      page: "services" as Page,
    },
    {
      title: t("Industrial Supplies", "الإمدادات الصناعية"),
      description: t(
        "We source and distribute a comprehensive range of industrial supplies, tools, and equipment to meet the operational demands of manufacturing and production facilities.",
        "نوفر ونوزع مجموعة شاملة من الإمدادات الصناعية والأدوات والمعدات لتلبية متطلبات مرافق التصنيع والإنتاج.",
      ),
      image: "/assets/generated/sector-industrial.dim_600x400.jpg",
      icon: Factory,
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
      page: "services" as Page,
    },
    {
      title: t("Solar & Renewable Energy", "الطاقة الشمسية والمتجددة"),
      description: t(
        "Solar power generation, energy storage systems, solar heating, and complete renewable energy solutions for Oman and the Gulf.",
        "توليد الطاقة الشمسية وأنظمة تخزين الطاقة والتدفئة الشمسية وحلول الطاقة المتجددة الكاملة.",
      ),
      image: "/assets/generated/division-solar-hero.dim_1400x600.jpg",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      page: "solar" as Page,
    },
    {
      title: t("Trading Divisions", "أقسام التداول"),
      description: t(
        "FMCG (Seafood, Poultry & more), Solar Division, Networking, Construction Materials & Safety/PPE — our specialized trading divisions power the Gulf economy.",
        "السلع الاستهلاكية والطاقة الشمسية والشبكات ومواد البناء والسلامة — أقسامنا المتخصصة تُقوّي الاقتصاد الخليجي بمنتجات متميزة.",
      ),
      image: "/assets/generated/trading-divisions-overview.dim_1400x600.jpg",
      icon: Globe,
      color: "text-blue-700",
      bg: "bg-blue-50",
      page: "trading-divisions" as Page,
    },
  ];
}

function SectorsSection({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  return (
    <section id="sectors" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
            {t("What We Do", "ما نقوم به")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {t("Our Industry Sectors", "قطاعاتنا الصناعية")}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {getSectors(lang).map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.button
                type="button"
                key={sector.title}
                data-ocid={`sectors.card.${i + 1}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.25 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() => navigate(sector.page)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-brand-teal border border-border transition-all duration-300 text-left w-full cursor-pointer"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <div
                    className={`inline-flex items-center gap-2 ${sector.bg} ${sector.color} rounded-lg px-3 py-1.5 mb-3`}
                  >
                    <Icon size={16} />
                    <span className="text-xs font-semibold">
                      {t("Sector", "قطاع")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-brand-teal-dark text-lg mb-2 leading-snug">
                    {sector.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection({ lang }: { lang: Lang }) {
  const t = makeT(lang);
  const features = [
    {
      icon: Users,
      title: t("Trusted Partnerships", "شراكات موثوقة"),
      description: t(
        "Built on years of reliable relationships with global suppliers and local clients",
        "مبنية على سنوات من العلاقات الموثوقة مع الموردين العالميين والعملاء المحليين",
      ),
      accent: "bg-brand-teal/10 text-brand-teal",
    },
    {
      icon: MapPin,
      title: t("Local Expertise", "خبرة محلية"),
      description: t(
        "Deep understanding of Oman's market, regulations, and business culture",
        "فهم عميق لسوق عُمان وأنظمتها وثقافتها التجارية",
      ),
      accent: "bg-brand-gold/10 text-brand-gold",
    },
    {
      icon: ShieldCheck,
      title: t("Quality Assured", "جودة مضمونة"),
      description: t(
        "Every product and service meets rigorous quality standards before delivery",
        "كل منتج وخدمة تستوفي معايير الجودة الصارمة قبل التسليم",
      ),
      accent: "bg-green-50 text-green-700",
    },
    {
      icon: Package,
      title: t("End-to-End Solutions", "حلول متكاملة"),
      description: t(
        "From sourcing to delivery, we manage the entire supply chain for our clients",
        "من التوريد إلى التسليم، ندير سلسلة التوريد بأكملها لعملائنا",
      ),
      accent: "bg-brand-terracotta/10 text-brand-terracotta",
    },
  ];
  return (
    <section
      id="why-us"
      className="py-20 md:py-28 bg-brand-teal relative overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      >
        <source
          src="https://videos.pexels.com/video-files/5528018/5528018-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3 text-outline">
            {t("Our Advantage", "ميزتنا")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
            {t("Why Choose RAYAT?", "لماذا تختار رايات؟")}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.accent} mb-5`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2 text-outline">
                  {feature.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed text-outline">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── VISION & MISSION SECTION ──────────────────────────────────────────────────
function VisionMissionSection({ lang }: { lang: Lang }) {
  const t = makeT(lang);

  const coreValues = [
    { label: t("Integrity", "النزاهة"), icon: ShieldCheck },
    { label: t("Excellence", "التميز"), icon: Star },
    { label: t("Partnership", "الشراكة"), icon: Handshake },
    { label: t("Innovation", "الابتكار"), icon: Lightbulb },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-teal-dark relative overflow-hidden">
      {/* Geometric gold pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(201,168,76,0.3) 30px, rgba(201,168,76,0.3) 32px), repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(201,168,76,0.3) 30px, rgba(201,168,76,0.3) 32px)",
        }}
      />
      <LogoWatermark size={380} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3 text-outline">
            {t("Our Purpose", "غايتنا")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
            {t("Vision & Mission", "الرؤية والرسالة")}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/8 backdrop-blur-sm border border-brand-gold/30 rounded-2xl p-8 hover:border-brand-gold/60 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                <Eye size={22} className="text-brand-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-gold text-outline">
                {t("Our Vision", "رؤيتنا")}
              </h3>
            </div>
            <p className="text-white/85 text-base md:text-lg leading-relaxed text-outline">
              {t(
                "To be the leading industrial and trading powerhouse of the Middle East — a bridge between global markets and regional ambition, aligned with Oman Vision 2040 and the Gulf's transformative economic agenda.",
                "أن نكون القوة الصناعية والتجارية الرائدة في الشرق الأوسط — جسر بين الأسواق العالمية والطموح الإقليمي، متوافقين مع رؤية عُمان 2040 وأجندة التحول الاقتصادي الخليجي.",
              )}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/8 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-brand-gold/40 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Lightbulb size={22} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white text-outline">
                {t("Our Mission", "رسالتنا")}
              </h3>
            </div>
            <p className="text-white/85 text-base md:text-lg leading-relaxed text-outline">
              {t(
                "To deliver uncompromising quality and reliability across every trade, supply, and partnership — empowering businesses across Oman, the GCC, and beyond to build, grow, and prosper.",
                "تقديم الجودة والموثوقية التي لا تقبل المساومة في كل تجارة وإمداد وشراكة — تمكين الشركات في عُمان والخليج العربي وما وراءها من البناء والنمو والازدهار.",
              )}
            </p>
          </motion.div>
        </div>

        {/* Core Values chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {coreValues.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.label}
                data-ocid={`vision.value.card.${i + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.4 }}
                className="flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/40 text-brand-gold px-5 py-2.5 rounded-full font-semibold text-sm"
              >
                <Icon size={15} />
                {val.label}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function HomeContactCTA({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  return (
    <section className="py-16 md:py-24 bg-brand-sand">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
            {t("Reach Out", "تواصل معنا")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Ready to Work With Us?", "مستعد للعمل معنا؟")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {t(
              "Whether you need industrial supplies or general trading services — we're here to help. Contact our team for a prompt response.",
              "سواء كنت بحاجة إلى إمدادات صناعية أو خدمات تجارية عامة — نحن هنا للمساعدة. تواصل مع فريقنا للحصول على رد سريع.",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              data-ocid="home.contact_cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors text-base shadow-lg"
            >
              <MessageCircle size={18} />
              {t("Get In Touch", "تواصل معنا")}
            </button>
            <a
              href="https://wa.me/96824000000"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="home.whatsapp_cta.secondary_button"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-green-600 transition-colors text-base shadow-lg"
            >
              <MessageCircle size={18} />
              {t("WhatsApp Us", "واتساب")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomePage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  return (
    <>
      <HeroSection navigate={navigate} lang={lang} />
      <AboutSection lang={lang} />
      <SectorsSection navigate={navigate} lang={lang} />
      <WhyUsSection lang={lang} />
      <VisionMissionSection lang={lang} />
      <HomeContactCTA navigate={navigate} lang={lang} />
    </>
  );
}

// ─── LABOUR & MANPOWER PAGE ───────────────────────────────────────────────────
const workerCategories = [
  {
    icon: HardHat,
    title: "Construction Workers",
    desc: "Builders, masons, steel fixers, scaffolders, carpenters, and civil laborers for all construction scales.",
    color: "text-orange-700",
    bg: "bg-orange-50",
  },
  {
    icon: Zap,
    title: "Technical & Skilled Trades",
    desc: "Electricians, plumbers, welders, HVAC technicians, and pipefitters with verified certifications.",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    icon: Factory,
    title: "Industrial Workers",
    desc: "Machine operators, warehouse staff, factory workers, and production line technicians.",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
  },
  {
    icon: Briefcase,
    title: "Office & Administrative",
    desc: "Data entry operators, receptionists, admin executives, and office support staff.",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    icon: Hotel,
    title: "Hospitality & Service",
    desc: "Hotel staff, cleaners, drivers, security guards, and front-of-house personnel.",
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
  {
    icon: Wheat,
    title: "Agricultural Workers",
    desc: "Farm laborers, irrigation technicians, agricultural equipment operators, and produce handlers.",
    color: "text-green-700",
    bg: "bg-green-50",
  },
];

const recruitmentSteps = [
  {
    step: "01",
    title: "Submit Requirements",
    desc: "Share your workforce needs — number, skills, timeline, and any certifications required.",
  },
  {
    step: "02",
    title: "Candidate Sourcing",
    desc: "We tap our network of pre-vetted candidates from 15+ source countries across South and Southeast Asia.",
  },
  {
    step: "03",
    title: "Screening & Vetting",
    desc: "Thorough background checks, skill verification, medical fitness, and reference validation.",
  },
  {
    step: "04",
    title: "Deployment",
    desc: "Handle all visa processing, LMRA compliance, contracts, and smooth on-boarding coordination.",
  },
];

function LabourPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang; // lang available for future use
  return (
    <div>
      <PageHero
        title="Labour & Manpower Solutions"
        subtitle="Comprehensive workforce supply and recruitment services for businesses across Oman and the GCC"
        image="/assets/generated/page-manpower-hero.dim_1400x600.jpg"
        breadcrumb="Labour & Manpower"
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                Workforce Solutions
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Your Trusted Manpower Partner in Oman
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                RAYAT provides comprehensive manpower supply solutions for
                businesses in Oman and the GCC. From unskilled construction
                laborers to highly skilled technical professionals, we connect
                employers with the right talent efficiently and compliantly.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                All placements are handled with full LMRA compliance, proper
                employment contracts, and complete documentation support. We
                manage the entire recruitment lifecycle so you can focus on your
                core business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="labour.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  Request Workers
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/labour-workers.dim_600x400.jpg"
                  alt="RAYAT manpower workers"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 rounded-2xl ring-4 ring-brand-gold/20 pointer-events-none" />
              </div>
              {/* Stats floater */}
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-2xl font-extrabold">500+</div>
                <div className="text-xs opacity-80">Workers Placed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Worker Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Categories
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Worker Categories
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workerCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  data-ocid={`labour.category.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${cat.bg} ${cat.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recruitment Process */}
      <section className="py-16 md:py-24 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3">
              How It Works
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Our Recruitment Process
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruitmentSteps.map((step, i) => (
              <motion.div
                key={step.step}
                data-ocid={`labour.process.step.${i + 1}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="font-display text-5xl font-extrabold text-brand-gold/30 mb-3 leading-none">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa & Documentation */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                Documentation
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Visa & Documentation Services
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                We handle all the complex paperwork so you don't have to. Our
                documentation team is fully versed in Omani labour law and Oman
                Labor Law requirements.
              </p>
              <ul className="space-y-3">
                {[
                  "Work visa processing and renewal",
                  "LMRA (Labour Market Regulatory Authority) compliance",
                  "Employment contracts in Arabic and English",
                  "Medical fitness coordination and testing",
                  "Accommodation and transport coordination",
                  "Insurance and health coverage setup",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <BadgeCheck
                      className="text-brand-teal flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/assets/generated/labour-visa-services.dim_600x400.jpg"
                  alt="Visa documentation services"
                  className="w-full h-auto object-cover aspect-[3/2]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Workers Placed" },
              { value: "50+", label: "Client Companies" },
              { value: "15+", label: "Source Countries" },
              { value: "100%", label: "LMRA Compliant" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                data-ocid={`labour.stat.card.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-sand rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-teal mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Need Skilled or Unskilled Workers?
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            Tell us your requirements and we'll have candidates ready within 72
            hours.
          </p>
          <button
            type="button"
            data-ocid="labour.bottom_cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Contact Our Team
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────────────────
const services = [
  {
    icon: Building2,
    title: "Construction & Infrastructure Supply",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
    summary:
      "Premium construction materials, heavy equipment, and project support for Oman's development projects.",
    details: [
      "Structural steel, rebar, and metal works",
      "Cement, aggregates, and ready-mix concrete",
      "MEP materials and electrical components",
      "Heavy equipment rental and procurement",
      "Project site supply logistics management",
    ],
  },
  {
    icon: Wheat,
    title: "Agriculture & Food Trading",
    color: "text-green-700",
    bg: "bg-green-50",
    summary:
      "Global sourcing of grains, fresh produce, and agricultural inputs to food businesses in Oman and GCC.",
    details: [
      "Bulk grain imports: wheat, rice, barley, corn",
      "Fresh and frozen produce supply chains",
      "Animal feed and livestock supplies",
      "Agricultural equipment and tools",
      "Fertilizers and crop protection products",
    ],
  },
  {
    icon: Factory,
    title: "Industrial Supplies",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    summary:
      "Comprehensive range of industrial tools, equipment, safety gear, and consumables for manufacturing.",
    details: [
      "Safety gear: PPE, helmets, gloves, harnesses",
      "Hand tools, power tools, and cutting equipment",
      "Industrial fasteners and hardware",
      "Lubricants, sealants, and maintenance products",
      "Conveyor systems and material handling",
    ],
  },
  {
    icon: Globe,
    title: "General Trading & Commodities",
    color: "text-brand-terracotta",
    bg: "bg-brand-terracotta/10",
    summary:
      "Wide-ranging import/export of commercial goods with competitive pricing and reliable global networks.",
    details: [
      "Consumer goods import and distribution",
      "Export facilitation for local manufacturers",
      "Commodity trading and brokering",
      "Cross-border trade documentation",
      "Customs clearance advisory services",
    ],
  },
  {
    icon: Truck,
    title: "Logistics & Freight Management",
    color: "text-blue-700",
    bg: "bg-blue-50",
    summary:
      "End-to-end freight management across sea, air, and road with full customs clearance support.",
    details: [
      "Sea freight FCL/LCL shipments",
      "Air freight for time-sensitive cargo",
      "Cross-Gulf road freight services",
      "Customs clearance and documentation",
      "Warehousing and distribution in Oman",
    ],
  },
  {
    icon: Users,
    title: "Labour & Manpower Solutions",
    color: "text-purple-700",
    bg: "bg-purple-50",
    summary:
      "Comprehensive workforce supply, recruitment, and HR outsourcing for all industries in Oman.",
    details: [
      "Skilled and unskilled worker supply",
      "Permanent and contract recruitment",
      "HR outsourcing and payroll management",
      "LMRA compliance and visa processing",
      "Staff training and onboarding support",
    ],
  },
];

function ServicesPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      <PageHero
        title="Our Services"
        subtitle="Six integrated service lines delivering end-to-end industrial and trading solutions"
        image="/assets/generated/page-services-hero.dim_1400x600.jpg"
        breadcrumb="Services"
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              What We Offer
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Complete Service Portfolio
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isOpen = expanded === i;
              return (
                <motion.div
                  key={service.title}
                  data-ocid={`services.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-border transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.bg} ${service.color} mb-4`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.summary}
                    </p>

                    <button
                      type="button"
                      data-ocid={`services.learn_more.button.${i + 1}`}
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="text-brand-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      {isOpen ? "Show Less" : "Learn More"}
                      <ChevronRight
                        size={14}
                        className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-2 overflow-hidden"
                        >
                          {service.details.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <BadgeCheck
                                className="text-brand-teal flex-shrink-0 mt-0.5"
                                size={16}
                              />
                              {d}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 md:py-24 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3">
              Our Process
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              How We Work
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                title: "Requirement Analysis",
                desc: "We deeply understand your needs, specifications, timelines, and budget constraints.",
              },
              {
                n: "02",
                title: "Sourcing",
                desc: "Our global network enables competitive sourcing from the best suppliers worldwide.",
              },
              {
                n: "03",
                title: "Quality Check",
                desc: "Rigorous quality inspection and verification before any shipment or deployment.",
              },
              {
                n: "04",
                title: "Delivery",
                desc: "On-time delivery with complete documentation, logistics support, and after-service.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                data-ocid={`services.process.step.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="font-display text-5xl font-extrabold text-brand-gold/30 mb-3 leading-none">
                  {step.n}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Contact us to discuss your requirements and receive a tailored
            proposal from our team.
          </p>
          <button
            type="button"
            data-ocid="services.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors shadow-lg"
          >
            Request a Quote
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── PORTFOLIO PAGE ────────────────────────────────────────────────────────────
type PortfolioFilter =
  | "All"
  | "Construction"
  | "Agriculture"
  | "Industrial"
  | "Trading"
  | "Manpower"
  | "Seafood"
  | "Poultry"
  | "Solar";

const projects = [
  {
    name: "Muscat Grand Mall Infrastructure Supply",
    sector: "Construction" as PortfolioFilter,
    year: "2023",
    desc: "Supplied structural steel, aggregates, and MEP materials for the expansion of Muscat Grand Mall's retail and parking complex.",
    image: "/assets/generated/sector-construction.dim_600x400.jpg",
  },
  {
    name: "The Wave Muscat Development — Building Materials",
    sector: "Construction" as PortfolioFilter,
    year: "2022",
    desc: "Long-term supply agreement for premium building materials throughout the prestigious The Wave Muscat waterfront development.",
    image: "/assets/generated/sector-construction.dim_600x400.jpg",
  },
  {
    name: "GCC Grain Import Program",
    sector: "Agriculture" as PortfolioFilter,
    year: "2023",
    desc: "Managed bulk import of wheat, rice, and barley from South Asia for a consortium of GCC food distributors.",
    image: "/assets/generated/sector-agriculture.dim_600x400.jpg",
  },
  {
    name: "Sohar Industrial Zone Supply",
    sector: "Industrial" as PortfolioFilter,
    year: "2022",
    desc: "Supplied safety gear, industrial fasteners, and maintenance consumables to multiple factories in Sohar Free Zone.",
    image: "/assets/generated/sector-industrial.dim_600x400.jpg",
  },
  {
    name: "Muscat New Urban Manpower Contract",
    sector: "Manpower" as PortfolioFilter,
    year: "2024",
    desc: "Placed 120+ construction workers, electricians, and site supervisors for Muscat's new urban Phase 2 housing project.",
    image: "/assets/generated/labour-workers.dim_600x400.jpg",
  },
  {
    name: "Mina Sultan Qaboos Logistics Hub",
    sector: "Trading" as PortfolioFilter,
    year: "2023",
    desc: "Managed import logistics and customs clearance for a major retail chain's new Mina Sultan Qaboos distribution centre.",
    image: "/assets/generated/sector-trading.dim_600x400.jpg",
  },
  {
    name: "Oman Oil Facility Supplies",
    sector: "Industrial" as PortfolioFilter,
    year: "2021",
    desc: "Long-term industrial supply contract for PPE, tools, and safety equipment to an Oman oil facility.",
    image: "/assets/generated/sector-industrial.dim_600x400.jpg",
  },
  {
    name: "Regional Food Distribution Network",
    sector: "Agriculture" as PortfolioFilter,
    year: "2022",
    desc: "Established a multi-supplier fresh produce distribution network across Oman, Kuwait, and Qatar.",
    image: "/assets/generated/sector-agriculture.dim_600x400.jpg",
  },
  // New seafood / poultry / solar projects
  {
    name: "Gulf Shrimp & Tuna Export Program",
    sector: "Seafood" as PortfolioFilter,
    year: "2024",
    desc: "Coordinated large-scale export of fresh Omani shrimp, yellowfin tuna, and mackerel to premium buyers in the UAE, Qatar, and Saudi Arabia.",
    image: "/assets/generated/fmcg-seafood-poultry.dim_800x600.jpg",
  },
  {
    name: "Muscat Seafood Cold-Chain Distribution",
    sector: "Seafood" as PortfolioFilter,
    year: "2023",
    desc: "Set up a temperature-controlled distribution network supplying squid, cuttlefish, mussels, and clams to supermarkets and restaurants across Muscat.",
    image: "/assets/generated/fmcg-seafood-poultry.dim_800x600.jpg",
  },
  {
    name: "Integrated Poultry Supply — Oman Retailers",
    sector: "Poultry" as PortfolioFilter,
    year: "2024",
    desc: "Long-term supply agreement delivering graded whole chicken (800g, 1000g, 1100g classes) and fresh eggs to leading Omani supermarket chains.",
    image: "/assets/generated/fmcg-seafood-poultry.dim_800x600.jpg",
  },
  {
    name: "Poultry & Egg Distribution — Sohar Region",
    sector: "Poultry" as PortfolioFilter,
    year: "2023",
    desc: "Established reliable weekly delivery cycles for standardised chicken cuts and free-range eggs to food service businesses and hotels in Sohar.",
    image: "/assets/generated/fmcg-seafood-poultry.dim_800x600.jpg",
  },
  {
    name: "Muscat Commercial Solar Rooftop Installation",
    sector: "Solar" as PortfolioFilter,
    year: "2024",
    desc: "Supplied and commissioned a 500 kW rooftop solar power generation system for a large commercial warehouse complex in Al Rusayl Industrial Estate.",
    image: "/assets/generated/division-solar-hero.dim_1400x600.jpg",
  },
  {
    name: "Solar Water Heating — Residential Development",
    sector: "Solar" as PortfolioFilter,
    year: "2023",
    desc: "Delivered and installed solar heating and domestic hot water systems across 120 villas in a new Muscat residential development, reducing energy costs by 65%.",
    image: "/assets/generated/division-solar-hero.dim_1400x600.jpg",
  },
];

const sectorColors: Record<string, { text: string; bg: string }> = {
  Construction: { text: "text-orange-700", bg: "bg-orange-50" },
  Agriculture: { text: "text-green-700", bg: "bg-green-50" },
  Industrial: { text: "text-brand-gold", bg: "bg-brand-gold/10" },
  Trading: { text: "text-brand-terracotta", bg: "bg-brand-terracotta/10" },
  Manpower: { text: "text-purple-700", bg: "bg-purple-50" },
  Seafood: { text: "text-blue-700", bg: "bg-blue-50" },
  Poultry: { text: "text-amber-700", bg: "bg-amber-50" },
  Solar: { text: "text-yellow-700", bg: "bg-yellow-50" },
};

function PortfolioPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const [filter, setFilter] = useState<PortfolioFilter>("All");
  const filters: PortfolioFilter[] = [
    "All",
    "Solar",
    "Seafood",
    "Poultry",
    "Construction",
    "Agriculture",
    "Industrial",
    "Trading",
    "Manpower",
  ];
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.sector === filter);

  return (
    <div>
      <PageHero
        title="Our Portfolio"
        subtitle="Showcasing completed projects across solar energy, seafood & poultry, construction, industrial, and trading sectors"
        image="/assets/generated/page-portfolio-hero.dim_1400x600.jpg"
        breadcrumb="Portfolio"
      />

      {/* Filters + Grid */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {filters.map((f) => (
              <button
                type="button"
                key={f}
                data-ocid="portfolio.filter.tab"
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === f
                    ? "bg-brand-teal text-white shadow-md"
                    : "bg-white text-foreground border border-border hover:border-brand-teal hover:text-brand-teal"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filtered.map((project, i) => {
                const col = sectorColors[project.sector] || {
                  text: "text-brand-teal",
                  bg: "bg-brand-teal/10",
                };
                return (
                  <motion.div
                    key={project.name}
                    data-ocid={`portfolio.project.card.${i + 1}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                  >
                    <div className="relative overflow-hidden h-40">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-brand-teal-dark text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3 ${col.bg} ${col.text}`}
                      >
                        {project.sector}
                      </span>
                      <h3 className="font-display font-bold text-foreground text-sm leading-snug mb-2">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div
              data-ocid="portfolio.projects.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── Upcoming Projects ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-teal-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(201,168,76,0.3) 30px, rgba(201,168,76,0.3) 32px), repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(201,168,76,0.3) 30px, rgba(201,168,76,0.3) 32px)",
          }}
        />
        <LogoWatermark size={320} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3 text-outline">
              Coming Soon
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
              Upcoming Projects
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
            <p className="text-white/70 mt-4 max-w-2xl mx-auto text-base leading-relaxed text-outline">
              Projects currently in planning or execution phase — watch this
              space for updates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Large-Scale Solar Farm — South Oman",
                sector: "Solar",
                eta: "Q3 2025",
                desc: "5 MW ground-mounted solar power generation plant with battery energy storage for an industrial client in the South Oman region. Engineering and procurement phase underway.",
                icon: Zap,
                color: "text-yellow-400",
                bg: "bg-yellow-400/10 border-yellow-400/30",
              },
              {
                name: "Salmon & Tuna Cold-Chain Export to EU",
                sector: "Seafood",
                eta: "Q4 2025",
                desc: "Establishing an export pipeline for premium Omani and Indian Ocean salmon and bluefin tuna to European buyers, including compliance with EU food safety standards.",
                icon: Globe,
                color: "text-blue-300",
                bg: "bg-blue-300/10 border-blue-300/30",
              },
              {
                name: "Poultry Processing Facility Partnership",
                sector: "Poultry",
                eta: "Q1 2026",
                desc: "Strategic partnership with a licensed Omani poultry processor to establish a grading, packaging, and cold-storage facility for chicken and egg distribution across the GCC.",
                icon: Wheat,
                color: "text-amber-300",
                bg: "bg-amber-300/10 border-amber-300/30",
              },
              {
                name: "Solar Energy Storage Systems — Commercial Rollout",
                sector: "Solar",
                eta: "Q2 2026",
                desc: "Rollout of modular lithium battery storage systems paired with solar installations across commercial and industrial clients in Muscat and Sohar.",
                icon: Zap,
                color: "text-yellow-400",
                bg: "bg-yellow-400/10 border-yellow-400/30",
              },
              {
                name: "Seafood Distribution Hub — Muscat Port",
                sector: "Seafood",
                eta: "Q3 2026",
                desc: "Development of a dedicated seafood import, grading, and distribution hub at Muscat port to streamline shrimp, squid, and fish supply to hotels, restaurants, and retailers.",
                icon: Globe,
                color: "text-blue-300",
                bg: "bg-blue-300/10 border-blue-300/30",
              },
              {
                name: "Integrated Poultry & Seafood FMCG Export Program",
                sector: "Poultry",
                eta: "Q4 2026",
                desc: "Combined FMCG export program targeting GCC and East African markets — bundling graded chicken, eggs, and certified frozen seafood under a single RAYAT-managed supply chain.",
                icon: Wheat,
                color: "text-amber-300",
                bg: "bg-amber-300/10 border-amber-300/30",
              },
            ].map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.name}
                  data-ocid={`portfolio.upcoming.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl p-6 border backdrop-blur-sm ${project.bg} hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`inline-flex items-center gap-2 ${project.color} font-semibold text-xs uppercase tracking-wider`}
                    >
                      <Icon size={15} />
                      {project.sector}
                    </div>
                    <span className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-2.5 py-1 rounded-full border border-brand-gold/30">
                      {project.eta}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base leading-snug mb-3 text-outline">
                    {project.name}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-gold/50 rounded-full"
                        style={{ width: i < 2 ? "60%" : i < 4 ? "35%" : "15%" }}
                      />
                    </div>
                    <span className="text-white/40 text-xs">
                      {i < 2 ? "In Progress" : i < 4 ? "Planning" : "Scoping"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 bg-brand-teal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "40+", label: "Projects Completed" },
              { value: "OMR 5M+", label: "Value Delivered" },
              { value: "8+", label: "Years Active" },
              { value: "30+", label: "Happy Clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                data-ocid={`portfolio.achievement.card.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-white"
              >
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Let's Work Together on Your Next Project
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Whether it's construction supply, manpower, or trading — RAYAT
            delivers results you can count on.
          </p>
          <button
            type="button"
            data-ocid="portfolio.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors shadow-lg"
          >
            Discuss Your Project
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── OUR TEAM PAGE ─────────────────────────────────────────────────────────────
const teamMembers = [
  {
    initials: "AR",
    name: "Abdullah Al-Rayat",
    title: "Founder & Managing Director",
    bio: "With over 20 years of experience in Oman's industrial sector, Abdullah founded RAYAT with a vision to build a world-class trading and industrial company. He leads the company's strategic direction and key client relationships.",
    color: "bg-brand-teal text-white",
  },
  {
    initials: "MK",
    name: "Mohammed Al-Khalifa",
    title: "Deputy Managing Director",
    bio: "Mohammed brings 15 years of commercial trading expertise to RAYAT. He oversees the company's trading operations, supplier relations, and international business development partnerships.",
    color: "bg-brand-teal-dark text-white",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    title: "Head of Operations",
    bio: "Priya manages day-to-day operations across all service lines, ensuring seamless delivery for clients. Her expertise in logistics and process optimization has significantly improved our service turnaround times.",
    color: "bg-brand-terracotta text-white",
  },
  {
    initials: "TH",
    name: "Tariq Hassan",
    title: "Business Development Manager",
    bio: "Tariq leads RAYAT's growth initiatives, with a focus on expanding manpower services and forging new partnerships in the GCC market. He has brought over 20 new enterprise clients to RAYAT in the past two years.",
    color: "bg-brand-gold text-gray-900",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "We operate with full transparency in all business dealings, honouring every commitment we make.",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    icon: Star,
    title: "Excellence",
    desc: "Every service, every delivery, every interaction — we hold ourselves to the highest possible standard.",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
  },
  {
    icon: Handshake,
    title: "Partnership",
    desc: "We view our clients and suppliers as long-term partners, not just transactions.",
    color: "text-brand-terracotta",
    bg: "bg-brand-terracotta/10",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We continuously seek smarter ways to source, supply, and serve in an evolving market.",
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
];

function TeamPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  return (
    <div>
      <PageHero
        title="Our Team"
        subtitle="Meet the leadership and management behind RAYAT's success"
        image="/assets/generated/page-team-hero.dim_1400x600.jpg"
        breadcrumb="Our Team"
      />

      {/* Leadership */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Leadership
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Meet Our Leadership Team
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                data-ocid={`team.member.card.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300 text-center"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-display ${member.color} shadow-lg`}
                >
                  {member.initials}
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-0.5">
                  {member.name}
                </h3>
                <p className="text-brand-teal text-sm font-medium mb-3">
                  {member.title}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed text-left">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              What Drives Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Our Values
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  data-ocid={`team.value.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-sand rounded-2xl p-6 border border-border hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${v.bg} ${v.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-14 bg-brand-teal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="text-brand-gold mx-auto mb-4" size={36} />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Our Culture
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
              At RAYAT, we believe that a company is only as strong as the
              people behind it. We foster a culture of respect, continuous
              learning, and cross-functional collaboration. Every team member —
              from operations to business development — is empowered to make
              decisions that benefit our clients. We celebrate diversity and
              bring together talent from across the globe to serve Oman's
              growing economy.
            </p>
            <button
              type="button"
              data-ocid="team.cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Join Our Team
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── NEWS PAGE ─────────────────────────────────────────────────────────────────
const newsArticles = [
  {
    title: "RAYAT Expands Manpower Services to Include Hospitality Sector",
    date: "January 2026",
    month: "JAN",
    year: "2026",
    excerpt:
      "RAYAT Industries Trading SPC has officially expanded its manpower division to include dedicated hospitality and service industry placements. The move follows growing demand from Oman's hospitality sector, which is experiencing rapid growth ahead of major tourism initiatives. RAYAT will now supply hotel staff, housekeeping teams, and food service personnel to hotels and resorts across the Sultanate.",
    category: "Company News",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    title: "New Partnership with South Asian Labour Agencies Announced",
    date: "December 2025",
    month: "DEC",
    year: "2025",
    excerpt:
      "RAYAT has signed formal partnership agreements with five major recruitment agencies in India, Bangladesh, and Nepal. These partnerships will significantly expand our candidate pool and reduce placement timelines for clients requiring large-scale workforce deployments. The agreements cover all worker categories from skilled trades to domestic workers.",
    category: "Partnerships",
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
  {
    title:
      "RAYAT Wins Preferred Supplier Status at Major Bahrain Construction Project",
    date: "November 2025",
    month: "NOV",
    year: "2025",
    excerpt:
      "Following a competitive tender process, RAYAT Industries Trading SPC has been awarded preferred supplier status for a landmark infrastructure development in Oman's Northern Governorate. The multi-year supply contract covers structural steel, aggregates, and MEP materials valued at over OMR 2 million. This represents RAYAT's largest single construction supply contract to date.",
    category: "Awards",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
  },
  {
    title: "Agriculture Trading Volume Grows 40% in FY2025",
    date: "October 2025",
    month: "OCT",
    year: "2025",
    excerpt:
      "RAYAT's agriculture and food trading division has recorded a 40% year-on-year increase in trading volume for FY2025. Growth was driven by expanded grain import programs and new contracts with Omani food manufacturers. The company plans to further invest in cold-chain logistics infrastructure to support fresh produce trading in 2026.",
    category: "Financial",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    title: "LMRA Compliance Certification Renewed for 2025–2026",
    date: "September 2025",
    month: "SEP",
    year: "2025",
    excerpt:
      "RAYAT Industries Trading SPC has successfully renewed its Oman Labor Law compliance certification for the 2025–2026 period. This certification confirms our commitment to ethical recruitment practices, fair employment terms, and full compliance with Omani labour law — giving our clients complete confidence in every placement we make.",
    category: "Compliance",
    color: "text-brand-terracotta",
    bg: "bg-brand-terracotta/10",
  },
  {
    title: "Company Celebrates 10th Anniversary in Bahrain Market",
    date: "August 2025",
    month: "AUG",
    year: "2025",
    excerpt:
      "RAYAT Industries Trading SPC marked its 10th anniversary in the Oman market with a gala dinner for clients, partners, and employees. The milestone reflects a decade of growth from a small trading enterprise to a diversified company spanning industrial supply, agriculture, logistics, and trading services. The Managing Director pledged continued investment in Oman's economic future.",
    category: "Milestone",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
];

function NewsPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const [email, setEmail] = useState("");

  return (
    <div>
      <PageHero
        title="News & Updates"
        subtitle="Latest announcements, milestones, and industry updates from RAYAT"
        image="/assets/generated/page-news-hero.dim_1400x600.jpg"
        breadcrumb="News & Updates"
      />

      {/* News Grid */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Latest
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Recent News & Announcements
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, i) => (
              <motion.article
                key={article.title}
                data-ocid={`news.article.card.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-border transition-shadow duration-300 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-brand-teal text-white rounded-lg px-3 py-2 text-center min-w-[50px]">
                        <div className="text-xs font-medium leading-none">
                          {article.month}
                        </div>
                        <div className="font-display text-lg font-bold leading-none">
                          {article.year}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${article.bg} ${article.color}`}
                    >
                      {article.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-foreground text-base leading-snug mb-3">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {article.excerpt.slice(0, 180)}…
                  </p>

                  <button
                    type="button"
                    data-ocid={`news.read_more.button.${i + 1}`}
                    className="mt-4 text-brand-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read More <ChevronRight size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Newspaper className="text-brand-gold mx-auto mb-4" size={36} />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              Stay Updated
            </h3>
            <p className="text-white/75 mb-8 leading-relaxed">
              Subscribe to receive RAYAT news, industry updates, and market
              insights directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="news.newsletter.input"
                className="bg-white/90 border-0 flex-1 text-foreground placeholder:text-muted-foreground rounded-lg"
              />
              <button
                type="button"
                data-ocid="news.newsletter.submit_button"
                onClick={() => {
                  toast.success("Subscribed! We'll keep you posted.");
                  setEmail("");
                }}
                className="bg-brand-gold text-gray-900 font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">
            Want to Learn More About RAYAT?
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Explore our services, portfolio, or get in touch with our team
            directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              data-ocid="news.services_cta.secondary_button"
              onClick={() => navigate("services")}
              className="inline-flex items-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
            >
              View Our Services
            </button>
            <button
              type="button"
              data-ocid="news.contact_cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────────
function ContactForm({ lang }: { lang: Lang }) {
  const t = makeT(lang);
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Service unavailable");
      await actor.submitContactForm(data.name, data.email, data.message);
    },
    onSuccess: () => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent! We'll get back to you shortly.");
    },
    onError: () => {
      toast.error("Failed to send your message. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    mutation.mutate({ name, email, message });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
      <h3 className="font-display text-xl font-bold text-foreground mb-6">
        {t("Send Us a Message", "أرسل لنا رسالة")}
      </h3>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            data-ocid="contact.form.success_state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-brand-teal" size={32} />
            </div>
            <h4 className="font-display text-xl font-bold text-foreground mb-2">
              {t("Message Sent!", "تم إرسال الرسالة!")}
            </h4>
            <p className="text-muted-foreground mb-6">
              {t(
                "Thank you for reaching out. Our team will contact you shortly.",
                "شكراً للتواصل معنا. سيتصل بك فريقنا قريباً.",
              )}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-brand-teal font-semibold hover:underline"
            >
              {t("Send another message", "إرسال رسالة أخرى")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="contact.form.panel"
          >
            <div>
              <Label
                htmlFor="contact-name"
                className="text-sm font-semibold text-foreground mb-1.5 block"
              >
                {t("Full Name", "الاسم الكامل")}
              </Label>
              <Input
                id="contact-name"
                data-ocid="contact.name.input"
                placeholder={t("Your full name", "اسمك الكامل")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-border focus:ring-brand-teal"
              />
            </div>
            <div>
              <Label
                htmlFor="contact-email"
                className="text-sm font-semibold text-foreground mb-1.5 block"
              >
                {t("Email Address", "البريد الإلكتروني")}
              </Label>
              <Input
                id="contact-email"
                data-ocid="contact.email.input"
                type="email"
                placeholder={t("you@example.com", "بريدك@مثال.com")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border focus:ring-brand-teal"
              />
            </div>
            <div>
              <Label
                htmlFor="contact-message"
                className="text-sm font-semibold text-foreground mb-1.5 block"
              >
                {t("Message", "الرسالة")}
              </Label>
              <Textarea
                id="contact-message"
                data-ocid="contact.message.textarea"
                placeholder={t("How can we help you?", "كيف يمكننا مساعدتك؟")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="border-border focus:ring-brand-teal resize-none"
              />
            </div>

            {mutation.isError && (
              <p
                data-ocid="contact.form.error_state"
                className="text-red-600 text-sm"
              >
                Something went wrong. Please try again.
              </p>
            )}

            <Button
              type="submit"
              data-ocid="contact.form.submit_button"
              disabled={mutation.isPending}
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-3 rounded-lg transition-colors"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="me-2 h-4 w-4 animate-spin" />
                  {t("Sending...", "جارٍ الإرسال...")}
                </>
              ) : (
                t("Send Message", "إرسال الرسالة")
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactPage({ lang }: { lang: Lang }) {
  const t = makeT(lang);
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-brand-teal">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <LogoWatermark size={240} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center py-16 pt-32 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-gold font-medium text-sm tracking-widest uppercase mb-3">
              RAYAT Industries Trading SPC / {t("Contact", "تواصل")}
            </p>
            <h1 className="font-display text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-shadow-lg">
              {t("Get In Touch", "تواصل معنا")}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              {t(
                "We're here to help. Reach out to discuss requirements, request a quote, or simply learn more about RAYAT.",
                "نحن هنا للمساعدة. تواصل معنا لمناقشة المتطلبات أو طلب عرض أسعار أو معرفة المزيد عن رايات.",
              )}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            aria-hidden="true"
          >
            <path d="M0 40L720 10L1440 40V40H0Z" fill="oklch(0.97 0.02 78)" />
          </svg>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm lang={lang} />
            </motion.div>

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="bg-brand-teal rounded-2xl p-8 text-white shadow-lg">
                <h3 className="font-display text-xl font-bold mb-6">
                  {t("Contact Information", "معلومات التواصل")}
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: MapPin,
                      label: t("Address", "العنوان"),
                      content: t(
                        "Way 4521, Building 3, Al Ghubra North, Muscat 133, Sultanate of Oman",
                        "طريق 4521، مبنى 3، الغبرة شمال، مسقط 133، سلطنة عُمان",
                      ),
                      href: undefined as string | undefined,
                    },
                    {
                      icon: Mail,
                      label: t("Email", "البريد الإلكتروني"),
                      content: "info@rayatindustries.com",
                      href: "mailto:info@rayatindustries.com",
                    },
                    {
                      icon: Phone,
                      label: t("Phone", "الهاتف"),
                      content: "+968 2400 0000",
                      href: "tel:+96824000000",
                    },
                    {
                      icon: MessageCircle,
                      label: t("WhatsApp", "واتساب"),
                      content: "+968 2400 0000",
                      href: "https://wa.me/96824000000",
                    },
                    {
                      icon: Clock,
                      label: t("Office Hours", "ساعات العمل"),
                      content: t(
                        "Sunday–Thursday, 8:00 AM – 5:00 PM",
                        "الأحد–الخميس، 8:00 ص – 5:00 م",
                      ),
                      href: undefined as string | undefined,
                    },
                  ].map(({ icon: Icon, label, content, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white/70 mb-0.5">
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            data-ocid={`contact.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
                            className="text-white hover:text-brand-gold transition-colors"
                            target={
                              href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="text-white">{content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration info */}
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="text-brand-teal" size={18} />
                  {t("Company Registration", "تسجيل الشركة")}
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    {t(
                      "Registered with the Ministry of Commerce, Industry and Investment Promotion, Sultanate of Oman",
                      "مسجلة لدى وزارة التجارة والصناعة وترويج الاستثمار، سلطنة عُمان",
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      {t("CR No.:", "رقم السجل التجاري:")}
                    </span>{" "}
                    Oman CR Registration
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      {t("LMRA Licensed:", "مرخص من هيئة سوق العمل:")}
                    </span>{" "}
                    {t(
                      "Labour & Manpower Recruitment",
                      "توظيف العمالة والقوى البشرية",
                    )}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden flex-1 min-h-[280px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14631.5!2d58.3700!3d23.5950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91fce5d2ae3deb%3A0x6a2a4fe88c71ee4a!2sAl+Ghubra+North%2C+Muscat%2C+Oman!5e0!3m2!1sen!2s!4v1700000000001!5m2!1sen!2s"
                  width="100%"
                  height="280"
                  className="border-0 w-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RAYAT Industries Location - Al Ghubra North, Muscat, Oman"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── TRADING DIVISIONS OVERVIEW PAGE ─────────────────────────────────────────
function TradingDivisionsPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const divisions = [
    {
      title: "Solar Division",
      description:
        "Oman's trusted solar energy trading partner — solar panels, complete PV systems, energy storage, solar heating, and all components for clean energy projects.",
      image: "/assets/generated/division-solar-hero.dim_1400x600.jpg",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      page: "solar" as Page,
    },
    {
      title: "FMCG Division",
      description:
        "Supplying the Gulf's finest retail channels with food, beverages, household products, and personal care items from trusted global manufacturers.",
      image: "/assets/generated/division-fmcg-hero.dim_1400x600.jpg",
      icon: ShoppingBag,
      color: "text-green-700",
      bg: "bg-green-50",
      page: "fmcg" as Page,
    },
    {
      title: "Networking Division",
      description:
        "Delivering cutting-edge networking equipment, structured cabling, telecom hardware, and IT infrastructure solutions across the region.",
      image: "/assets/generated/division-networking-hero.dim_1400x600.jpg",
      icon: Network,
      color: "text-blue-700",
      bg: "bg-blue-50",
      page: "networking" as Page,
    },
    {
      title: "Construction Materials",
      description:
        "The Raw Materials Powering Gulf Megaprojects — reinforcing steel, aluminum, copper, pipes and more for contractors and developers.",
      image:
        "/assets/generated/division-construction-materials-hero.dim_1400x600.jpg",
      icon: Building2,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      page: "construction-materials" as Page,
    },
    {
      title: "Safety & PPE / Metals",
      description:
        "Comprehensive construction safety & raw materials from helmet to boot, meeting EN/ANSI/OSHA standards for Gulf megaprojects.",
      image: "/assets/generated/division-safety-ppe-hero.dim_1400x600.jpg",
      icon: ShieldCheck,
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
      page: "safety-ppe" as Page,
    },
  ];

  const stats = [
    { value: "500+", label: "Products Traded" },
    { value: "15+", label: "Countries Served" },
    { value: "20+", label: "Years Gulf Experience" },
    { value: "ISO", label: "9001 Compliant" },
  ];

  return (
    <div>
      <PageHero
        title="Our Trading Divisions"
        subtitle="Trusted trading partner across FMCG, Networking & Construction Materials. Building partnerships. Delivering excellence."
        image="/assets/generated/trading-divisions-overview.dim_1400x600.jpg"
        breadcrumb="Trading Divisions"
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
              About Our Trading Operations
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Delivering Excellence in Every Trade
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
              RAYAT Industries is a diversified trading conglomerate with deep
              roots in the Gulf region. Founded with the vision of bridging
              global markets with local expertise, we have grown to become a
              trusted name across Solar Energy, FMCG (Seafood &amp; Poultry),
              Networking infrastructure, and Construction materials.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              Founded in Oman with a vision to reshape Gulf commerce. Building
              trusted partnerships across the Gulf since 2004, our trading
              divisions serve hypermarkets, data centers, mega construction
              projects, and industrial facilities with uncompromising quality
              and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                data-ocid={`trading_divisions.stat.card.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-sand rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-teal mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Division Cards */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Our Divisions
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Explore Our Trading Divisions
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              return (
                <motion.button
                  type="button"
                  key={div.title}
                  data-ocid={`trading_divisions.card.${i + 1}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(div.page)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-border transition-all duration-300 text-left w-full cursor-pointer"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                        <Icon size={14} />
                        {div.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div
                      className={`inline-flex items-center gap-2 ${div.bg} ${div.color} rounded-lg px-3 py-1.5 mb-3`}
                    >
                      <Icon size={16} />
                      <span className="text-xs font-semibold">
                        Trading Division
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-xl mb-3 leading-snug">
                      {div.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {div.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-brand-teal font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Explore Division <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to Partner with RAYAT Trading?
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            Contact our trading team to discuss product availability, pricing,
            and partnership opportunities across our four divisions.
          </p>
          <button
            type="button"
            data-ocid="trading_divisions.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Contact Our Trading Team
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── FMCG DIVISION PAGE ────────────────────────────────────────────────────────
function FMCGPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const productCategories = [
    {
      icon: Star,
      title: "Seafood & Poultry",
      desc: "Premium fresh and frozen seafood: Shrimp, Tuna, Salmon, Mackerel, Squid, Cuttlefish, Mussels, Clams. Plus Poultry: Whole Chicken (1000g, 800g, 1100g sizes), Eggs.",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Wheat,
      title: "Food & Staples",
      desc: "Rice, flour, sugar, cooking oils, pulses, spices, canned goods, and dry staples from global suppliers.",
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      icon: Package,
      title: "Beverages",
      desc: "Juices, water, soft drinks, energy drinks, tea, coffee, and dairy beverages for retail and hospitality.",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Zap,
      title: "Household Cleaning",
      desc: "Detergents, fabric softeners, multi-surface cleaners, dishwashing products, and hygiene solutions.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Heart,
      title: "Personal Care",
      desc: "Shampoos, conditioners, body wash, skincare, oral care, and grooming products for all demographics.",
      color: "text-pink-700",
      bg: "bg-pink-50",
    },
    {
      icon: Star,
      title: "Snacks & Confectionery",
      desc: "Snacks, confectionery, frozen foods, dairy products, and impulse purchase categories.",
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Users,
      title: "Baby & Infant",
      desc: "Baby food, diapers, wipes, lotions, powders, and feeding accessories for infant care.",
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  const whoWeServe = [
    { title: "Hypermarkets & Supermarkets", icon: ShoppingBag },
    { title: "Hotels & Hospitality", icon: Hotel },
    { title: "Institutional Buyers", icon: Briefcase },
    { title: "Convenience Stores", icon: Package },
  ];

  return (
    <div>
      <PageHero
        title="FMCG Division"
        subtitle="Gulf's Trusted FMCG Trading Partner — Food, Beverages, Household & Personal Care"
        image="/assets/generated/division-fmcg-hero.dim_1400x600.jpg"
        breadcrumb="FMCG Division"
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                Division Overview
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Your Gulf FMCG Supply Partner
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                Our FMCG division has built an extensive network of trusted
                manufacturers and distribution partners across the Gulf. We
                supply food, beverages, household cleaning products, and
                personal care items to hypermarkets, supermarkets, hotels, and
                institutional buyers. Our portfolio spans premium international
                brands and competitive value offerings.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                From staple foods to premium personal care, we curate product
                ranges that meet the diverse demands of the Gulf's multicultural
                consumer base. Our logistics network ensures on-time delivery to
                12+ countries across the MENA region.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="fmcg.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  FMCG Enquiry
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="fmcg.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  All Divisions
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-fmcg-hero.dim_1400x600.jpg"
                  alt="FMCG Products"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-2xl font-extrabold">12+</div>
                <div className="text-xs opacity-80">MENA Countries</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seafood & Poultry Featured Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Featured Sector
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Seafood &amp; Poultry
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Our major focus area — supplying premium quality seafood and
              poultry products across Oman and the Gulf.
            </p>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seafood */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-sand rounded-2xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Star size={20} className="text-blue-700" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl">
                  Seafood
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Shrimp",
                  "Tuna",
                  "Salmon",
                  "Mackerel",
                  "Squid",
                  "Cuttlefish",
                  "Mussels",
                  "Clams",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    <BadgeCheck size={13} /> {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Poultry */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-sand rounded-2xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Wheat size={20} className="text-amber-700" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl">
                  Poultry
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Chicken — 800g",
                  "Chicken — 1000g",
                  "Chicken — 1100g",
                  "Eggs",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    <BadgeCheck size={13} /> {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/assets/generated/fmcg-seafood-poultry.dim_800x600.jpg"
              alt="Seafood and Poultry Products"
              className="w-full object-cover max-h-64"
            />
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              What We Supply
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Product Categories
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  data-ocid={`fmcg.category.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${cat.bg} ${cat.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 md:py-20 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Our Clients
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Who We Serve
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {whoWeServe.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  data-ocid={`fmcg.client.card.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-border text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal mb-3 mx-auto">
                    <Icon size={18} />
                  </div>
                  <p className="font-semibold text-foreground text-sm leading-snug">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why RAYAT FMCG */}
      <section className="py-14 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              Why RAYAT FMCG?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "15+ years building an extensive portfolio of trusted international and regional manufacturers",
                "We bridge the gap between global producers and Gulf consumers with efficiency, speed, and uncompromising quality control",
                "Direct relationships with mills and manufacturers ensure competitive pricing and consistent supply",
                "Full logistics support with on-time delivery to 12+ MENA countries",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-left bg-white/10 rounded-xl p-4 border border-white/15"
                >
                  <BadgeCheck
                    className="text-brand-gold flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-white/90 text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-white/75 mb-6 text-base">
              Contact our FMCG team for product catalogues, pricing, and
              availability.
            </p>
            <button
              type="button"
              data-ocid="fmcg.enquiry.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              FMCG Enquiry <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── NETWORKING DIVISION PAGE ──────────────────────────────────────────────────
function NetworkingPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const productLines = [
    {
      icon: Server,
      title: "Network Switches",
      desc: "Layer 2 & Layer 3 managed switches from enterprise-grade manufacturers for data center and campus deployments.",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Layers,
      title: "Structured Cabling",
      desc: "Cat6, Cat6A, Cat8 cables, patch panels, keystone jacks, cabinets, and complete structured cabling systems.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Zap,
      title: "Fiber Optics",
      desc: "Single-mode and multi-mode fiber optic cables, transceivers, media converters, and fiber distribution systems.",
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      icon: Wifi,
      title: "Wireless / Wi-Fi",
      desc: "Indoor and outdoor Wi-Fi 6 & Wi-Fi 6E access points for high-density enterprise and industrial environments.",
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      icon: ShieldCheck,
      title: "Network Security",
      desc: "Firewalls, UTM appliances, VPN concentrators, and network access control systems for enterprise security.",
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
    {
      icon: Phone,
      title: "IP Telephony / VoIP",
      desc: "IP PBX systems, VoIP phones, DECT handsets, and unified communications infrastructure for businesses.",
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  const whoWeServe = [
    { title: "Data Centers", icon: Server },
    { title: "Banking & Finance", icon: Briefcase },
    { title: "IT & Telecom", icon: Network },
    { title: "Hotels & Hospitality", icon: Hotel },
    { title: "Infrastructure Solutions", icon: Layers },
  ];

  return (
    <div>
      <PageHero
        title="Networking Division"
        subtitle="Delivering cutting-edge IT & telecom infrastructure solutions across the Gulf"
        image="/assets/generated/division-networking-hero.dim_1400x600.jpg"
        breadcrumb="Networking Division"
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                Division Overview
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Gulf's Digital Infrastructure Partner
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                As the Gulf's digital infrastructure rapidly expands, RAYAT's
                Networking division has become a key supplier of networking
                equipment, structured cabling solutions, telecom hardware, and
                IT infrastructure components. We serve systems integrators,
                telecom providers, and large enterprise clients with reliable,
                high-quality products.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                From structured cabling for greenfield developments to fiber
                optic solutions for carrier-grade networks, we offer a
                comprehensive portfolio of products backed by technical
                expertise and reliable after-sale support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="networking.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  Get Technical Support
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="networking.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  All Divisions
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-networking-hero.dim_1400x600.jpg"
                  alt="Networking Infrastructure"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-2xl font-extrabold">ISO</div>
                <div className="text-xs opacity-80">9001 Certified</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Our Products
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Product Lines
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productLines.map((prod, i) => {
              const Icon = prod.icon;
              return (
                <motion.div
                  key={prod.title}
                  data-ocid={`networking.product.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${prod.bg} ${prod.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {prod.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 md:py-20 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Our Clients
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Who We Serve
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {whoWeServe.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  data-ocid={`networking.client.card.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-border text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-700 mb-3 mx-auto">
                    <Icon size={18} />
                  </div>
                  <p className="font-semibold text-foreground text-sm leading-snug">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-10 bg-white border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "ISO 9001 Compliant",
              "EN / ANSI / OSHA",
              "Mill-Certified Products",
              "Cross-Industry Expertise",
            ].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal-dark font-semibold text-sm px-4 py-2 rounded-full border border-brand-teal/20"
              >
                <BadgeCheck size={15} className="text-brand-teal" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Looking for Networking Solutions?
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            Connect with our technical team for product specifications,
            availability, and project support.
          </p>
          <button
            type="button"
            data-ocid="networking.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Get Technical Support <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── CONSTRUCTION MATERIALS PAGE ───────────────────────────────────────────────
function ConstructionMaterialsPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const materials = [
    {
      title: "Steel Products",
      items: [
        "Deformed steel rebar (Grade 60/75), welded wire mesh, and reinforcing accessories for concrete structures.",
        "Structural steel, steel beams, H-beams, angle iron, flat bars, and steel plates for construction projects.",
      ],
      icon: Layers,
      color: "text-gray-700",
      bg: "bg-gray-100",
    },
    {
      title: "Aluminum Profiles",
      items: [
        "Extruded aluminum sections, aluminum sheet, roofing, cladding, and architectural aluminum systems.",
      ],
      icon: Building2,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      title: "Copper & Wire",
      items: [
        "Copper rods, copper sheets, electrical copper wire, bare copper conductors, and copper tubes.",
      ],
      icon: Zap,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      title: "Pipes & Fittings",
      items: [
        "GI pipes, HDPE pipes, PVC pipes, copper pipes, and complete pipe fittings for plumbing and HVAC.",
      ],
      icon: Globe,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      title: "Cement & Masonry",
      items: [
        "Portland cement, gypsum boards, insulation panels, concrete blocks, and masonry products.",
      ],
      icon: Package,
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
  ];

  return (
    <div>
      <PageHero
        title="Construction Materials"
        subtitle="The Raw Materials Powering Gulf Megaprojects — Steel, Aluminum, Copper & More"
        image="/assets/generated/division-construction-materials-hero.dim_1400x600.jpg"
        breadcrumb="Construction Materials"
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                Division Overview
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Fueling the Gulf's Construction Boom
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                Fueling the Gulf's construction boom, our Construction Materials
                division provides everything from Safety & PPE equipment to
                metals and raw materials. With active Gulf megaprojects driving
                unprecedented demand, we supply contractors, developers, and
                project managers with the materials they need to build safely
                and efficiently.
              </p>
              <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-xl p-4 mb-8">
                <p className="text-brand-teal-dark font-semibold text-sm">
                  Supplying{" "}
                  <span className="text-brand-teal font-bold">
                    Active Project Sites
                  </span>{" "}
                  Across the Gulf
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="construction.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  Request a Quote
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="construction.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  All Divisions
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-metals-materials.dim_800x600.jpg"
                  alt="Construction Materials"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">
                  Grade 60/75
                </div>
                <div className="text-xs opacity-80">Certified Rebar</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Material Types */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              What We Supply
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Material Types
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((mat, i) => {
              const Icon = mat.icon;
              return (
                <motion.div
                  key={mat.title}
                  data-ocid={`construction.material.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${mat.bg} ${mat.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-3">
                    {mat.title}
                  </h3>
                  <ul className="space-y-2">
                    {mat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed"
                      >
                        <BadgeCheck
                          size={14}
                          className="text-brand-teal flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-10 bg-brand-sand border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">
            Standards & Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Mill-Certified Materials",
              "Grade 60/75 Rebar",
              "ISO 9001 Compliant",
              "EN & ANSI Standards",
            ].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal-dark font-semibold text-sm px-4 py-2 rounded-full border border-brand-teal/20"
              >
                <BadgeCheck size={15} className="text-brand-teal" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to Supply Your Project?
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            Get quotes, request samples, or discuss large-scale project
            requirements with our team.
          </p>
          <button
            type="button"
            data-ocid="construction.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Request a Quote <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── SAFETY & PPE / METALS PAGE ────────────────────────────────────────────────
function SafetyPPEPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const ppeCategories = [
    {
      icon: HardHat,
      title: "Head Protection",
      desc: "Safety helmets, hard hats, bump caps, and head protection systems meeting EN 397 and ANSI Z89 standards.",
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Eye,
      title: "Eye & Face Protection",
      desc: "Safety glasses, goggles, face shields, welding masks, and complete eye protection solutions.",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: ShieldCheck,
      title: "Hand Protection",
      desc: "Safety gloves — cut-resistant, chemical-resistant, welding, and general purpose work gloves.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Star,
      title: "Hearing Protection",
      desc: "Ear plugs, ear muffs, communication headsets, and hearing conservation solutions for noisy environments.",
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      icon: Wind,
      title: "Respiratory Protection",
      desc: "Dust masks, half-face respirators, full-face respirators, and self-contained breathing apparatus.",
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      icon: Layers,
      title: "Fall Protection",
      desc: "Safety harnesses, lanyards, self-retracting lifelines, and complete fall arrest systems.",
      color: "text-red-700",
      bg: "bg-red-50",
    },
    {
      icon: Package,
      title: "Safety Footwear",
      desc: "Steel-toed boots, composite toe shoes, anti-puncture footwear, and chemical-resistant footwear.",
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Zap,
      title: "High-Visibility Vests",
      desc: "Class 2 & Class 3 hi-vis vests, reflective jackets, and safety workwear for all site conditions.",
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div>
      <PageHero
        title="Safety & PPE / Metals & Raw Materials"
        subtitle="Safety & PPE and Metals & Raw Materials for Gulf Megaprojects"
        image="/assets/generated/division-safety-ppe-hero.dim_1400x600.jpg"
        breadcrumb="Safety & PPE / Metals"
      />

      {/* Overview */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                Division Overview
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Safety First, Every Site, Every Time
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                Safety is non-negotiable in Gulf construction. RAYAT's Safety &
                PPE range includes certified personal protective equipment
                meeting international standards (EN, ANSI, OSHA). From helmet to
                boot, we provide comprehensive protection solutions for
                construction, industrial, and oil & gas environments across the
                region.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                From reinforcing steel for high-rise towers to copper wire for
                electrical systems, RAYAT's Metals & Raw Materials division
                supplies contractors and developers across the Gulf with
                premium-grade materials. Our direct relationships with mills and
                manufacturers ensure competitive pricing and consistent supply
                for projects of any scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="safety-ppe.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  Enquire Now
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="safety-ppe.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  All Divisions
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-safety-ppe-hero.dim_1400x600.jpg"
                  alt="Safety PPE Equipment"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">
                  EN/ANSI
                </div>
                <div className="text-xs opacity-80">OSHA Certified</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PPE Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              Product Range
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              PPE Product Categories
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ppeCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  data-ocid={`safety-ppe.category.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${cat.bg} ${cat.color} mb-3`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-10 bg-brand-sand border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">
            Standards Compliance
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "EN Certified PPE",
              "ANSI Standards",
              "OSHA Compliant",
              "Mill-Certified Metals",
              "ISO 9001 Compliant",
            ].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal-dark font-semibold text-sm px-4 py-2 rounded-full border border-brand-teal/20"
              >
                <BadgeCheck size={15} className="text-brand-teal" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Comprehensive Safety Solutions for Gulf Projects
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            Comprehensive safety solutions for Gulf construction projects —
            contact our team to discuss your PPE and materials requirements.
          </p>
          <button
            type="button"
            data-ocid="safety-ppe.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Enquire Now <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── SOLAR DIVISION PAGE ──────────────────────────────────────────────────────
function SolarDivisionPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  void lang;
  const products = [
    {
      icon: Zap,
      title: "Solar Power Generation",
      desc: "Complete solar photovoltaic (PV) systems for residential, commercial, and industrial power generation. Monocrystalline and polycrystalline panels from top-tier manufacturers.",
      color: "text-yellow-700",
      bg: "bg-yellow-50",
    },
    {
      icon: Wind,
      title: "Solar Power Systems",
      desc: "End-to-end solar power system design and supply: grid-tied, off-grid, and hybrid systems. Inverters, charge controllers, mounting structures, and complete turnkey packages.",
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Package,
      title: "Energy Storage & Conversion",
      desc: "Battery energy storage systems (BESS), lithium-ion and lead-acid battery banks, DC-AC inverters, UPS systems, and power conversion equipment for reliable energy management.",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Layers,
      title: "Solar Heating & Water Systems",
      desc: "Solar water heaters, solar pool heating, solar thermal collectors, and complete solar hot water solutions for residential, commercial, and industrial applications.",
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Star,
      title: "Components & Accessories",
      desc: "Solar cables, MC4 connectors, combiner boxes, surge protection devices, monitoring systems, junction boxes, and all accessories for a complete solar installation.",
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
  ];

  return (
    <div>
      <PageHero
        title="Solar Division"
        subtitle="Renewable Energy Solutions for Oman & the Gulf — Solar Power, Storage & Heating Systems"
        image="/assets/generated/division-solar-hero.dim_1400x600.jpg"
        breadcrumb="Solar Division"
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                Division Overview
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Oman's Solar Energy Trading Partner
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                RAYAT's Solar Division is at the forefront of Oman's transition
                to clean, renewable energy. We supply solar panels, complete
                power systems, energy storage solutions, and heating systems to
                contractors, developers, and businesses across Oman and the Gulf
                — aligned with Oman Vision 2040's sustainability goals.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                From rooftop solar installations to large-scale solar farms, we
                provide high-quality products from globally certified
                manufacturers with competitive pricing and full technical
                support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="solar.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  Solar Enquiry <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="solar.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  All Divisions
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-solar-hero.dim_1400x600.jpg"
                  alt="Solar Division"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">100%</div>
                <div className="text-xs opacity-80">Clean Energy</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              What We Supply
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Solar Product Categories
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod, i) => {
              const Icon = prod.icon;
              return (
                <motion.div
                  key={prod.title}
                  data-ocid={`solar.product.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${prod.bg} ${prod.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {prod.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Solar RAYAT */}
      <section className="py-14 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              Why Choose RAYAT Solar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Aligned with Oman Vision 2040 renewable energy targets",
                "Globally certified solar products from top manufacturers",
                "Complete supply chain from panels to installation accessories",
                "Competitive pricing with full technical support across the Gulf",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-left bg-white/10 rounded-xl p-4 border border-white/15"
                >
                  <BadgeCheck
                    className="text-brand-gold flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-white/90 text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              data-ocid="solar.enquiry.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Solar Enquiry <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const year = 2017;

  const footerLinks: { label: string; page: Page }[] = [
    { label: t("Home", "الرئيسية"), page: "home" },
    { label: t("Portfolio", "المحفظة"), page: "portfolio" },
    { label: t("Services", "الخدمات"), page: "services" },
    { label: t("Contact", "تواصل"), page: "contact" },
    {
      label: t("Trading Divisions", "أقسام التداول"),
      page: "trading-divisions",
    },
    { label: t("Solar Division", "قسم الطاقة الشمسية"), page: "solar" },
    { label: t("FMCG Division", "قسم السلع الاستهلاكية"), page: "fmcg" },
    { label: t("Networking Division", "قسم الشبكات"), page: "networking" },
    {
      label: t("Construction Materials", "مواد البناء"),
      page: "construction-materials",
    },
    {
      label: t("Safety & PPE / Metals", "السلامة والمعادن"),
      page: "safety-ppe",
    },
  ];

  return (
    <footer className="bg-brand-teal-dark text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/15">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/rayat-logo-transparent.dim_400x400-transparent.png"
                alt="RAYAT Industries Trading SPC"
                className="w-auto object-contain"
                style={{ height: "80px" }}
              />
            </div>
            <p className="font-display font-bold text-lg text-white">
              RAYAT Industries Trading SPC
            </p>
            <p className="text-brand-gold mt-1" dir="rtl">
              رايات للصناعات والتجارة
            </p>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              {t(
                "A trusted Omani partner for industrial growth and global trade.",
                "شريك عُماني موثوق للنمو الصناعي والتجارة العالمية.",
              )}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">
              {t("Quick Links", "روابط سريعة")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.page}.link`}
                    onClick={() => {
                      navigate(link.page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white/70 hover:text-brand-gold text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact summary */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">
              {t("Contact", "تواصل")}
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="flex-shrink-0 text-brand-gold mt-0.5"
                />
                <span>
                  {t(
                    "Way 4521, Building 3, Al Ghubra North, Muscat 133, Oman",
                    "طريق 4521، مبنى 3، الغبرة شمال، مسقط 133، عُمان",
                  )}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0 text-brand-gold" />
                <a
                  href="mailto:info@rayatindustries.com"
                  className="hover:text-white transition-colors"
                >
                  info@rayatindustries.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0 text-brand-gold" />
                <a
                  href="tel:+96824000000"
                  className="hover:text-white transition-colors"
                >
                  +968 2400 0000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle
                  size={14}
                  className="flex-shrink-0 text-brand-gold"
                />
                <a
                  href="https://wa.me/96824000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t("WhatsApp: +968 2400 0000", "واتساب: +968 2400 0000")}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={14} className="flex-shrink-0 text-brand-gold" />
                {t(
                  "Sun–Thu, 8:00 AM – 5:00 PM",
                  "الأحد–الخميس، 8:00 ص – 5:00 م",
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            © {year} RAYAT Industries Trading SPC.{" "}
            {t("All rights reserved.", "جميع الحقوق محفوظة.")}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [lang, setLang] = useState<Lang>("en");

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className="min-h-screen"
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
    >
      <Toaster richColors position="top-right" />
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigate}
        lang={lang}
        setLang={setLang}
      />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {currentPage === "home" && (
              <HomePage navigate={navigate} lang={lang} />
            )}
            {currentPage === "labour" && (
              <LabourPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "services" && (
              <ServicesPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "portfolio" && (
              <PortfolioPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "team" && (
              <TeamPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "news" && (
              <NewsPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "contact" && <ContactPage lang={lang} />}
            {currentPage === "trading-divisions" && (
              <TradingDivisionsPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "fmcg" && (
              <FMCGPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "networking" && (
              <NetworkingPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "construction-materials" && (
              <ConstructionMaterialsPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "safety-ppe" && (
              <SafetyPPEPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "solar" && (
              <SolarDivisionPage navigate={navigate} lang={lang} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer navigate={navigate} lang={lang} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/96824000000"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.floating.button"
        className="fixed bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 ltr:right-6 rtl:left-6"
        aria-label={
          lang === "ar" ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"
        }
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
