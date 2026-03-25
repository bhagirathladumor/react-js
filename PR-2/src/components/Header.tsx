import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .uniq-nav * { font-family: 'Space Grotesk', sans-serif; }

        .uniq-nav {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: calc(100% - 48px);
          max-width: 860px;
          background: rgba(0, 10, 6, 0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(10,173,10,0.18);
          border-radius: 999px;
          padding: 10px 10px 10px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: box-shadow 0.3s, background 0.3s;
        }
        .uniq-nav.scrolled {
          background: rgba(0, 10, 6, 0.82);
          box-shadow: 0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(10,173,10,0.22);
        }

        /* Logo */
        .uniq-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
        }
        .uniq-logo-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: conic-gradient(#0aad0a 0%, #06850a 60%, #001e2b 100%);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; color: #fff; font-size: 14px;
          box-shadow: 0 0 12px rgba(10,173,10,0.6);
          animation: spin-slow 8s linear infinite;
        }
        @keyframes spin-slow {
          from { filter: hue-rotate(0deg); }
          to   { filter: hue-rotate(30deg); }
        }
        .uniq-logo-text {
          font-size: 16px; font-weight: 700;
          color: #fff; letter-spacing: -0.4px;
        }
        .uniq-logo-text span { color: #0aad0a; }

        /* Desktop links */
        .uniq-links {
          display: flex; align-items: center; gap: 4px;
        }
        .uniq-link {
          position: relative;
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          overflow: hidden;
        }
        .uniq-link::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 999px;
          background: rgba(10,173,10,0.12);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .uniq-link:hover { color: #fff; }
        .uniq-link:hover::before { opacity: 1; }
        .uniq-link.active {
          color: #0aad0a;
          background: rgba(10,173,10,0.12);
          font-weight: 600;
        }

        /* CTA */
        .uniq-cta {
          background: #0aad0a;
          color: #fff !important;
          border-radius: 999px;
          padding: 9px 22px;
          font-size: 14px; font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          white-space: nowrap;
          box-shadow: 0 0 0 0 rgba(10,173,10,0.5);
        }
        .uniq-cta:hover {
          background: #088a08;
          box-shadow: 0 0 18px rgba(10,173,10,0.55);
          transform: scale(1.04);
          color: #fff !important;
        }

        /* Mobile burger */
        .uniq-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          margin-right: 4px;
        }
        .uniq-burger span {
          display: block; width: 20px; height: 2px;
          background: #fff; border-radius: 2px;
          transition: all 0.3s;
        }
        .uniq-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .uniq-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .uniq-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile sheet */
        .uniq-sheet {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 860px;
          background: rgba(0,10,6,0.92);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(10,173,10,0.15);
          border-radius: 24px;
          z-index: 9998;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
          opacity: 0;
        }
        .uniq-sheet.open {
          max-height: 320px;
          opacity: 1;
        }
        .uniq-sheet-inner {
          padding: 16px 20px 20px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .uniq-sheet-link {
          padding: 12px 16px;
          border-radius: 14px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 15px; font-weight: 500;
          transition: background 0.2s, color 0.2s;
          display: flex; align-items: center; justify-content: space-between;
        }
        .uniq-sheet-link:hover, .uniq-sheet-link.active {
          background: rgba(10,173,10,0.1);
          color: #0aad0a;
        }
        .uniq-sheet-link .arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
        .uniq-sheet-link:hover .arrow, .uniq-sheet-link.active .arrow {
          opacity: 1; transform: translateX(4px);
        }

        @media (max-width: 767px) {
          .uniq-links, .uniq-cta { display: none !important; }
          .uniq-burger { display: flex !important; }
        }

        /* Spacer so content doesn't hide under floating nav */
        .uniq-spacer { height: 80px; }
      `}</style>

      {/* Floating pill navbar */}
      <nav className={`uniq-nav ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <a href="#" className="uniq-logo">
          <span className="uniq-logo-icon">M</span>
          <span className="uniq-logo-text">My<span>Site</span></span>
        </a>

        {/* Desktop links */}
        <div className="uniq-links">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`uniq-link ${active === label ? "active" : ""}`}
              onClick={() => setActive(label)}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA + burger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="#contact" className="uniq-cta" onClick={() => setActive("Contact")}>
            Hire Me →
          </a>
          <button
            className={`uniq-burger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div className={`uniq-sheet ${open ? "open" : ""}`}>
        <div className="uniq-sheet-inner">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`uniq-sheet-link ${active === label ? "active" : ""}`}
              onClick={() => { setActive(label); setOpen(false); }}
            >
              {label}
              <span className="arrow">→</span>
            </a>
          ))}
          <a
            href="#contact"
            className="uniq-cta text-center mt-2"
            style={{ display: "block" }}
            onClick={() => { setActive("Contact"); setOpen(false); }}
          >
            Hire Me →
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div className="uniq-spacer" />
    </>
  );
};

export default Header;