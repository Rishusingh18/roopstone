"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { navItems } from "@/lib/public-data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        width: "100%",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <NavBody>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none", flexShrink: 0 }}>
          <img src="/logo.png" alt="Roop Stone Arts" style={{ height: 60, width: "auto" }} />
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.2rem",
              fontWeight: 400,
              color: "var(--color-text-main)",
              letterSpacing: 3,
              textTransform: "uppercase",
              lineHeight: 1.2,
            }}
          >
            Roop <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: 5, opacity: 0.7 }}>Stone Arts</span>
          </div>
        </Link>

        <NavItems />

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/book-consultation" className="md-block" style={buttonStyle}>
            Book Consultation
          </Link>
          <button
            onClick={() => setIsOpen((value) => !value)}
            className="lg-hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-main)", alignItems: "center" }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </NavBody>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.4rem",
              backgroundColor: "rgba(251, 247, 238, 0.98)",
              pointerEvents: "auto",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-text-main)",
                  fontSize: "1.55rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/book-consultation" onClick={() => setIsOpen(false)} className="btn-primary">
              Book Consultation
              <span className="arrow">→</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavBody({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrolled = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 80;
    const shouldBeUnscrolled = latest < 30;

    if (shouldBeScrolled && !lastScrolled.current) {
      lastScrolled.current = true;
      setIsScrolled(true);
    } else if (shouldBeUnscrolled && lastScrolled.current) {
      lastScrolled.current = false;
      setIsScrolled(false);
    }
  });

  return <div className={isScrolled ? "navbar-island navbar-island--scrolled" : "navbar-island"}>{children}</div>;
}

function NavItems() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="md-flex" style={{ gap: "1.8rem" }}>
      {navItems.map((item, idx) => (
        <Link
          key={item.href}
          href={item.href}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="nav-link"
          style={{ color: hoveredIdx === idx ? "var(--color-primary)" : "var(--color-text-main)", fontSize: "0.85rem" }}
        >
          {item.name}
          {hoveredIdx === idx && (
            <motion.span
              layoutId="hover-pill"
              style={{
                position: "absolute",
                inset: "-8px -16px",
                zIndex: -1,
                borderRadius: 100,
                backgroundColor: "rgba(119, 89, 44, 0.05)",
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Link>
      ))}
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "0.8rem 1.8rem",
  borderRadius: 100,
  backgroundColor: "var(--color-primary)",
  color: "#fff",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: "uppercase",
  boxShadow: "0 8px 20px rgba(119, 89, 44, 0.2)",
  transition: "all 0.3s ease",
};
