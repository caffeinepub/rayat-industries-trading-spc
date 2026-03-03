import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
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
import { useState } from "react";
import { toast } from "sonner";

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
  | "safety-ppe";

// ─── Watermark component ──────────────────────────────────────────────────────
function LogoWatermark({ size = 320 }: { size?: number }) {
  return (
    <img
      src="/assets/generated/rayat-logo-transparent.dim_400x400-transparent.png"
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
    <section className="relative min-h-[340px] md:min-h-[420px] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
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
      <LogoWatermark size={260} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-brand-gold/90 font-medium text-sm tracking-widest uppercase mb-3">
            RAYAT Industries Trading SPC &nbsp;/&nbsp; {breadcrumb}
          </p>
          <h1 className="font-display text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 text-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-shadow-md">
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
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tradingDropdownOpen, setTradingDropdownOpen] = useState(false);
  const [mobileTradingOpen, setMobileTradingOpen] = useState(false);

  const tradingDivisionPages: Page[] = [
    "trading-divisions",
    "fmcg",
    "networking",
    "construction-materials",
    "safety-ppe",
  ];
  const isTradingActive = tradingDivisionPages.includes(currentPage);

  const navLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "Labour & Manpower", page: "labour" },
    { label: "Portfolio", page: "portfolio" },
    { label: "Our Team", page: "team" },
    { label: "News", page: "news" },
  ];

  const tradingSubLinks: { label: string; page: Page }[] = [
    { label: "Trading Overview", page: "trading-divisions" },
    { label: "FMCG Division", page: "fmcg" },
    { label: "Networking Division", page: "networking" },
    { label: "Construction Materials", page: "construction-materials" },
    { label: "Safety & PPE / Metals", page: "safety-ppe" },
  ];

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    setTradingDropdownOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-sand-gold shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Name */}
          <button
            type="button"
            data-ocid="nav.home.link"
            className="flex items-center gap-3 min-w-0 cursor-pointer"
            onClick={() => navigate("home")}
          >
            <img
              src="/assets/generated/rayat-logo-transparent.dim_400x400-transparent.png"
              alt="RAYAT Industries Trading SPC Logo"
              className="h-10 md:h-13 w-auto object-contain flex-shrink-0"
              style={{ height: "52px" }}
            />
            <span className="text-brand-teal-dark font-bold text-sm md:text-base lg:text-lg leading-tight tracking-wide font-display">
              RAYAT Industries Trading SPC
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
                className={`font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer pb-0.5 ${
                  currentPage === link.page
                    ? "text-brand-teal border-b-2 border-brand-teal"
                    : "text-brand-teal-dark hover:text-brand-teal"
                }`}
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
                className={`flex items-center gap-1 font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer pb-0.5 ${
                  isTradingActive
                    ? "text-brand-teal border-b-2 border-brand-teal"
                    : "text-brand-teal-dark hover:text-brand-teal"
                }`}
              >
                Trading
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

            <button
              type="button"
              data-ocid="nav.contact.primary_button"
              onClick={() => navigate("contact")}
              className={`bg-brand-teal text-white px-4 py-2 rounded font-semibold text-sm hover:bg-brand-teal-dark transition-colors ${
                currentPage === "contact" ? "ring-2 ring-brand-teal-dark" : ""
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="nav.mobile_menu.toggle"
            className="lg:hidden text-brand-teal-dark p-2"
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
            className="lg:hidden bg-brand-sand-gold border-t border-brand-teal/20 overflow-hidden"
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
                <span>Trading Divisions</span>
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
                Contact Us
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
function HeroSection({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1400x600.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/90 via-brand-teal/75 to-brand-teal-dark/85" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)",
        }}
      />
      <LogoWatermark size={360} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="text-brand-gold font-semibold text-xl md:text-2xl mb-3 tracking-widest text-shadow-md"
            dir="rtl"
          >
            رايات للصناعات والتجارة
          </p>
          <h1 className="font-display text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-shadow-lg">
            RAYAT Industries Trading SPC
          </h1>
          <p className="text-white/85 text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-shadow-md">
            Building Bahrain's Future Through Industrial Excellence &amp; Global
            Trade
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
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded hover:opacity-90 active:scale-95 transition-all duration-200 text-base shadow-xl"
            >
              Explore Our Sectors
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              data-ocid="hero.contact_us.secondary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded hover:bg-white hover:text-brand-teal active:scale-95 transition-all duration-200 text-base"
            >
              Contact Us
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

function AboutSection() {
  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "4+", label: "Industry Sectors" },
    { value: "50+", label: "Trusted Partners" },
    { value: "100%", label: "Bahraini Owned" },
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
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-l-4 border-brand-gold pl-3">
              Who We Are
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              About RAYAT Industries Trading SPC
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              RAYAT Industries Trading SPC is a dynamic Bahraini company
              committed to driving industrial growth and facilitating global
              trade across the Kingdom. Founded on principles of integrity,
              quality, and innovation, we serve as a trusted partner for
              businesses across construction, agriculture, general trading,
              industrial supply, and labour & manpower sectors.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              Our deep market knowledge and strong supplier networks allow us to
              deliver reliable solutions that meet the evolving needs of
              Bahrain's growing economy.
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/generated/about-us.dim_800x600.jpg"
                alt="RAYAT Industries team meeting"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 rounded-2xl ring-4 ring-brand-gold/30 pointer-events-none" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
              <div className="text-xs font-medium opacity-80">
                Established in
              </div>
              <div className="font-display text-xl font-extrabold">Bahrain</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const sectors = [
  {
    title: "Construction & Infrastructure",
    description:
      "We supply high-quality construction materials, equipment, and project support services to contractors and developers across Bahrain and the GCC.",
    image: "/assets/generated/sector-construction.dim_600x400.jpg",
    icon: Building2,
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
    page: "services" as Page,
  },
  {
    title: "Agriculture & Food Trading",
    description:
      "From grain and fresh produce to agricultural inputs, we connect Bahraini businesses with reliable global food supply chains.",
    image: "/assets/generated/sector-agriculture.dim_600x400.jpg",
    icon: Wheat,
    color: "text-green-700",
    bg: "bg-green-50",
    page: "services" as Page,
  },
  {
    title: "General Trading & Logistics",
    description:
      "Our general trading operations cover a broad range of commodities, managed through efficient logistics and strong international partnerships.",
    image: "/assets/generated/sector-trading.dim_600x400.jpg",
    icon: Truck,
    color: "text-brand-terracotta",
    bg: "bg-brand-terracotta/10",
    page: "services" as Page,
  },
  {
    title: "Industrial Supplies",
    description:
      "We source and distribute a comprehensive range of industrial supplies, tools, and equipment to meet the operational demands of manufacturing and production facilities.",
    image: "/assets/generated/sector-industrial.dim_600x400.jpg",
    icon: Factory,
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
    page: "services" as Page,
  },
  {
    title: "Trading Divisions",
    description:
      "FMCG, Networking, Construction Materials & Safety/PPE — our specialized trading divisions power the Gulf economy with premium products.",
    image: "/assets/generated/trading-divisions-overview.dim_1400x600.jpg",
    icon: Globe,
    color: "text-blue-700",
    bg: "bg-blue-50",
    page: "trading-divisions" as Page,
  },
];

function SectorsSection({ navigate }: { navigate: (p: Page) => void }) {
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
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Our Industry Sectors
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.button
                type="button"
                key={sector.title}
                data-ocid={`sectors.card.${i + 1}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(sector.page)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-border transition-all duration-300 text-left w-full cursor-pointer"
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
                    <span className="text-xs font-semibold">Sector</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base mb-2 leading-snug">
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

const features = [
  {
    icon: Users,
    title: "Trusted Partnerships",
    description:
      "Built on years of reliable relationships with global suppliers and local clients",
    accent: "bg-brand-teal/10 text-brand-teal",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Deep understanding of Bahrain's market, regulations, and business culture",
    accent: "bg-brand-gold/10 text-brand-gold",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description:
      "Every product and service meets rigorous quality standards before delivery",
    accent: "bg-green-50 text-green-700",
  },
  {
    icon: Package,
    title: "End-to-End Solutions",
    description:
      "From sourcing to delivery, we manage the entire supply chain for our clients",
    accent: "bg-brand-terracotta/10 text-brand-terracotta",
  },
];

function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="py-20 md:py-28 bg-brand-teal relative overflow-hidden"
    >
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
          <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Our Advantage
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Why Choose RAYAT?
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
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
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

function HomeContactCTA({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <section className="py-16 md:py-24 bg-brand-sand">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
            Reach Out
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Whether you need industrial supplies, manpower solutions, or general
            trading services — we're here to help. Contact our team for a prompt
            response.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              data-ocid="home.contact_cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors text-base shadow-lg"
            >
              <Mail size={18} />
              Get In Touch
            </button>
            <button
              type="button"
              data-ocid="home.labour_cta.secondary_button"
              onClick={() => navigate("labour")}
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-8 py-4 rounded-lg hover:bg-brand-teal hover:text-white transition-all text-base"
            >
              <Users size={18} />
              Labour & Manpower
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <HeroSection navigate={navigate} />
      <AboutSection />
      <SectorsSection navigate={navigate} />
      <WhyUsSection />
      <HomeContactCTA navigate={navigate} />
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

function LabourPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div>
      <PageHero
        title="Labour & Manpower Solutions"
        subtitle="Comprehensive workforce supply and recruitment services for businesses across Bahrain and the GCC"
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
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-l-4 border-brand-gold pl-3">
                Workforce Solutions
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Your Trusted Manpower Partner in Bahrain
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                RAYAT provides comprehensive manpower supply solutions for
                businesses in Bahrain and the GCC. From unskilled construction
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
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-l-4 border-brand-gold pl-3">
                Documentation
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Visa & Documentation Services
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                We handle all the complex paperwork so you don't have to. Our
                documentation team is fully versed in Bahraini labour law and
                LMRA requirements.
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
      "Premium construction materials, heavy equipment, and project support for Bahrain's development projects.",
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
      "Global sourcing of grains, fresh produce, and agricultural inputs to food businesses in Bahrain and GCC.",
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
      "Warehousing and distribution in Bahrain",
    ],
  },
  {
    icon: Users,
    title: "Labour & Manpower Solutions",
    color: "text-purple-700",
    bg: "bg-purple-50",
    summary:
      "Comprehensive workforce supply, recruitment, and HR outsourcing for all industries in Bahrain.",
    details: [
      "Skilled and unskilled worker supply",
      "Permanent and contract recruitment",
      "HR outsourcing and payroll management",
      "LMRA compliance and visa processing",
      "Staff training and onboarding support",
    ],
  },
];

function ServicesPage({ navigate }: { navigate: (p: Page) => void }) {
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
  | "Manpower";

const projects = [
  {
    name: "Seef Mall Infrastructure Supply",
    sector: "Construction" as PortfolioFilter,
    year: "2023",
    desc: "Supplied structural steel, aggregates, and MEP materials for the expansion of Seef Mall's retail and parking complex.",
    image: "/assets/generated/sector-construction.dim_600x400.jpg",
  },
  {
    name: "Bahrain Bay Development — Building Materials",
    sector: "Construction" as PortfolioFilter,
    year: "2022",
    desc: "Long-term supply agreement for premium building materials throughout the prestigious Bahrain Bay waterfront development.",
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
    name: "Al Hidd Industrial Zone Supply",
    sector: "Industrial" as PortfolioFilter,
    year: "2022",
    desc: "Supplied safety gear, industrial fasteners, and maintenance consumables to multiple factories in Al Hidd Free Zone.",
    image: "/assets/generated/sector-industrial.dim_600x400.jpg",
  },
  {
    name: "Northern City Manpower Contract",
    sector: "Manpower" as PortfolioFilter,
    year: "2024",
    desc: "Placed 120+ construction workers, electricians, and site supervisors for Northern City's Phase 2 housing project.",
    image: "/assets/generated/labour-workers.dim_600x400.jpg",
  },
  {
    name: "Isa Town Logistics Hub",
    sector: "Trading" as PortfolioFilter,
    year: "2023",
    desc: "Managed import logistics and customs clearance for a major retail chain's new Isa Town distribution centre.",
    image: "/assets/generated/sector-trading.dim_600x400.jpg",
  },
  {
    name: "Bahrain Petroleum Facility Supplies",
    sector: "Industrial" as PortfolioFilter,
    year: "2021",
    desc: "Long-term industrial supply contract for PPE, tools, and safety equipment to a Bahrain petroleum facility.",
    image: "/assets/generated/sector-industrial.dim_600x400.jpg",
  },
  {
    name: "Regional Food Distribution Network",
    sector: "Agriculture" as PortfolioFilter,
    year: "2022",
    desc: "Established a multi-supplier fresh produce distribution network across Bahrain, Kuwait, and Qatar.",
    image: "/assets/generated/sector-agriculture.dim_600x400.jpg",
  },
];

const sectorColors: Record<string, { text: string; bg: string }> = {
  Construction: { text: "text-orange-700", bg: "bg-orange-50" },
  Agriculture: { text: "text-green-700", bg: "bg-green-50" },
  Industrial: { text: "text-brand-gold", bg: "bg-brand-gold/10" },
  Trading: { text: "text-brand-terracotta", bg: "bg-brand-terracotta/10" },
  Manpower: { text: "text-purple-700", bg: "bg-purple-50" },
};

function PortfolioPage({ navigate }: { navigate: (p: Page) => void }) {
  const [filter, setFilter] = useState<PortfolioFilter>("All");
  const filters: PortfolioFilter[] = [
    "All",
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
        subtitle="Showcasing completed projects across construction, agriculture, industrial, and trading sectors"
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

      {/* Achievements */}
      <section className="py-12 bg-brand-teal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "40+", label: "Projects Completed" },
              { value: "BD 5M+", label: "Value Delivered" },
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
    bio: "With over 20 years of experience in Bahrain's industrial sector, Abdullah founded RAYAT with a vision to build a world-class trading and manpower company. He leads the company's strategic direction and key client relationships.",
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

function TeamPage({ navigate }: { navigate: (p: Page) => void }) {
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
              bring together talent from across the globe to serve Bahrain's
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
      "RAYAT Industries Trading SPC has officially expanded its manpower division to include dedicated hospitality and service industry placements. The move follows growing demand from Bahrain's hospitality sector, which is experiencing rapid growth ahead of major tourism initiatives. RAYAT will now supply hotel staff, housekeeping teams, and food service personnel to hotels and resorts across the Kingdom.",
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
      "Following a competitive tender process, RAYAT Industries Trading SPC has been awarded preferred supplier status for a landmark infrastructure development in Bahrain's Northern Governorate. The multi-year supply contract covers structural steel, aggregates, and MEP materials valued at over BD 2 million. This represents RAYAT's largest single construction supply contract to date.",
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
      "RAYAT's agriculture and food trading division has recorded a 40% year-on-year increase in trading volume for FY2025. Growth was driven by expanded grain import programs and new contracts with Bahraini food manufacturers. The company plans to further invest in cold-chain logistics infrastructure to support fresh produce trading in 2026.",
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
      "RAYAT Industries Trading SPC has successfully renewed its Labour Market Regulatory Authority (LMRA) compliance certification for the 2025–2026 period. This certification confirms our commitment to ethical recruitment practices, fair employment terms, and full compliance with Bahraini labour law — giving our clients complete confidence in every placement we make.",
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
      "RAYAT Industries Trading SPC marked its 10th anniversary in the Bahrain market with a gala dinner for clients, partners, and employees. The milestone reflects a decade of growth from a small trading enterprise to a diversified company spanning industrial supply, agriculture, logistics, and manpower services. The Managing Director pledged continued investment in Bahrain's economic future.",
    category: "Milestone",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
];

function NewsPage({ navigate }: { navigate: (p: Page) => void }) {
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
function ContactForm() {
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
        Send Us a Message
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
              Message Sent!
            </h4>
            <p className="text-muted-foreground mb-6">
              Thank you for reaching out. Our team will contact you shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-brand-teal font-semibold hover:underline"
            >
              Send another message
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
                Full Name
              </Label>
              <Input
                id="contact-name"
                data-ocid="contact.name.input"
                placeholder="Your full name"
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
                Email Address
              </Label>
              <Input
                id="contact-email"
                data-ocid="contact.email.input"
                type="email"
                placeholder="you@example.com"
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
                Message
              </Label>
              <Textarea
                id="contact-message"
                data-ocid="contact.message.textarea"
                placeholder="How can we help you?"
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden pt-16 md:pt-20 bg-brand-teal">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <LogoWatermark size={240} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-gold font-medium text-sm tracking-widest uppercase mb-3">
              RAYAT Industries Trading SPC / Contact
            </p>
            <h1 className="font-display text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-shadow-lg">
              Get In Touch
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              We're here to help. Reach out to discuss requirements, request a
              quote, or simply learn more about RAYAT.
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
              <ContactForm />
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
                  Contact Information
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: MapPin,
                      label: "Address",
                      content: "Manama, Kingdom of Bahrain",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      content: "info@rayatindustries.com",
                      href: "mailto:info@rayatindustries.com",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      content: "+973 1700 0000",
                      href: "tel:+97317000000",
                    },
                    {
                      icon: Clock,
                      label: "Office Hours",
                      content: "Sunday–Thursday, 8:00 AM – 5:00 PM",
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
                            data-ocid={`contact.${label.toLowerCase()}.link`}
                            className="text-white hover:text-brand-gold transition-colors"
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
                  Company Registration
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Registered with the Ministry of Industry &amp; Commerce,
                    Kingdom of Bahrain
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      CR No.:
                    </span>{" "}
                    Bahrain CR Registration
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      LMRA Licensed:
                    </span>{" "}
                    Labour & Manpower Recruitment
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden flex-1 min-h-[220px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57880.1!2d50.5577!3d26.2172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af4b45a39f3b%3A0x97f2a58c5bfac2!2sManama%2C%20Bahrain!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="220"
                  className="border-0 w-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RAYAT Industries Location - Manama, Bahrain"
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
function TradingDivisionsPage({ navigate }: { navigate: (p: Page) => void }) {
  const divisions = [
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
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-l-4 border-brand-gold pl-3">
              About Our Trading Operations
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Delivering Excellence in Every Trade
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
              RAYAT Industries Trading SPC is a diversified trading conglomerate
              with deep roots in the Gulf region. Founded with the vision of
              bridging global markets with local expertise, we have grown to
              become a trusted name across FMCG, Networking infrastructure, and
              Construction materials.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              Founded in Bahrain with a vision to reshape Gulf commerce.
              Building trusted partnerships across the Gulf since 2004, our
              trading divisions serve hypermarkets, data centers, mega
              construction projects, and industrial facilities with
              uncompromising quality and reliability.
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
function FMCGPage({ navigate }: { navigate: (p: Page) => void }) {
  const productCategories = [
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
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-l-4 border-brand-gold pl-3">
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

      {/* Product Categories */}
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
function NetworkingPage({ navigate }: { navigate: (p: Page) => void }) {
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
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-l-4 border-brand-gold pl-3">
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
}: { navigate: (p: Page) => void }) {
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
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-l-4 border-brand-gold pl-3">
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
function SafetyPPEPage({ navigate }: { navigate: (p: Page) => void }) {
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
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-l-4 border-brand-gold pl-3">
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

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const footerLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "Labour & Manpower", page: "labour" },
    { label: "Portfolio", page: "portfolio" },
    { label: "Our Team", page: "team" },
    { label: "News & Updates", page: "news" },
    { label: "Contact", page: "contact" },
    { label: "Trading Divisions", page: "trading-divisions" },
    { label: "FMCG Division", page: "fmcg" },
    { label: "Networking Division", page: "networking" },
    { label: "Construction Materials", page: "construction-materials" },
    { label: "Safety & PPE / Metals", page: "safety-ppe" },
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
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="font-display font-bold text-lg text-white">
              RAYAT Industries Trading SPC
            </p>
            <p className="text-brand-gold mt-1" dir="rtl">
              رايات للصناعات والتجارة
            </p>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              A trusted Bahraini partner for industrial growth, global trade,
              and manpower solutions.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">
              Quick Links
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
              Contact
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0 text-brand-gold" />
                Manama, Kingdom of Bahrain
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
                  href="tel:+97317000000"
                  className="hover:text-white transition-colors"
                >
                  +973 1700 0000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={14} className="flex-shrink-0 text-brand-gold" />
                Sun–Thu, 8:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} RAYAT Industries Trading SPC. All rights reserved.</p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Scroll to top on page change — handled in navigate(), no effect needed

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-right" />
      <Navbar currentPage={currentPage} setCurrentPage={navigate} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {currentPage === "home" && <HomePage navigate={navigate} />}
            {currentPage === "labour" && <LabourPage navigate={navigate} />}
            {currentPage === "services" && <ServicesPage navigate={navigate} />}
            {currentPage === "portfolio" && (
              <PortfolioPage navigate={navigate} />
            )}
            {currentPage === "team" && <TeamPage navigate={navigate} />}
            {currentPage === "news" && <NewsPage navigate={navigate} />}
            {currentPage === "contact" && <ContactPage />}
            {currentPage === "trading-divisions" && (
              <TradingDivisionsPage navigate={navigate} />
            )}
            {currentPage === "fmcg" && <FMCGPage navigate={navigate} />}
            {currentPage === "networking" && (
              <NetworkingPage navigate={navigate} />
            )}
            {currentPage === "construction-materials" && (
              <ConstructionMaterialsPage navigate={navigate} />
            )}
            {currentPage === "safety-ppe" && (
              <SafetyPPEPage navigate={navigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
