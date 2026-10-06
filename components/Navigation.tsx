"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Research", href: "#research" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "shadow-2xl shadow-black/30"
          : ""
      }`}
      style={
        scrolled
          ? {
              background: "rgba(9,9,11,0.85)",
              backdropFilter: "blur(20px) saturate(180%)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }
          : {}
      }
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-white flex items-center gap-2.5 group"
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white group-hover:scale-105 transition-transform duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              boxShadow: "0 2px 12px rgba(99,102,241,0.4)",
            }}
          >
            MK
          </span>
          <span className="text-zinc-300 group-hover:text-white transition-colors text-sm hidden sm:block font-semibold">
            Mukul Kumar
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors font-medium px-3.5 py-2 rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 text-sm px-4 py-2 text-white rounded-lg transition-all duration-200 font-semibold"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              boxShadow: "0 2px 12px rgba(99,102,241,0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(99,102,241,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 2px 12px rgba(99,102,241,0.35)";
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "bg-white rotate-45 translate-y-[7px]" : "bg-zinc-400"
              }`}
            />
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                menuOpen ? "bg-white opacity-0 scale-x-0" : "bg-zinc-400"
              }`}
            />
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "bg-white -rotate-45 -translate-y-[7px]" : "bg-zinc-400"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(9,9,11,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base text-zinc-400 hover:text-white transition-colors font-medium px-3 py-2.5 rounded-lg hover:bg-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 text-sm px-5 py-3 text-white rounded-xl font-semibold text-center"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              boxShadow: "0 2px 12px rgba(99,102,241,0.3)",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
