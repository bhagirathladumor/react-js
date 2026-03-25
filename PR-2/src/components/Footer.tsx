import React from "react";

const Footer: React.FC = () => (
  <>
    <style>{`
      .footer-section * { font-family: 'Space Grotesk', sans-serif; }
      .footer-section {
        background: #000a06;
        border-top: 1px solid rgba(255,255,255,0.06);
        padding: 60px 0 30px;
      }
      .footer-logo-text {
        font-size: 18px; font-weight: 700; color: #fff;
        letter-spacing: -0.4px;
      }
      .footer-logo-text span { color: #0aad0a; }
      .footer-desc {
        font-size: 13px; color: rgba(255,255,255,0.35);
        line-height: 1.8; margin-top: 12px; max-width: 240px;
      }
      .footer-heading {
        font-size: 12px; font-weight: 600;
        color: rgba(255,255,255,0.3);
        letter-spacing: 1px; text-transform: uppercase;
        margin-bottom: 16px;
      }
      .footer-link {
        display: block;
        font-size: 14px; color: rgba(255,255,255,0.5);
        text-decoration: none; margin-bottom: 10px;
        transition: color 0.2s;
      }
      .footer-link:hover { color: #0aad0a; }
      .footer-social {
        display: inline-flex; align-items: center; justify-content: center;
        width: 36px; height: 36px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px;
        color: rgba(255,255,255,0.5);
        text-decoration: none; font-size: 13px; font-weight: 600;
        transition: border-color 0.2s, color 0.2s, background 0.2s;
      }
      .footer-social:hover {
        border-color: rgba(10,173,10,0.4);
        color: #0aad0a;
        background: rgba(10,173,10,0.08);
      }
      .footer-bottom {
        font-size: 12px; color: rgba(255,255,255,0.2);
        text-align: center; margin-top: 48px;
        padding-top: 24px;
        border-top: 1px solid rgba(255,255,255,0.05);
      }
    `}</style>

    <footer className="footer-section">
      <div className="container">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-md-4">
            <div className="footer-logo-text">My<span>Site</span></div>
            <p className="footer-desc">Building modern web experiences with clean code and great design.</p>
          </div>

          {/* Links */}
          <div className="col-md-4">
            <div className="footer-heading">Quick Links</div>
            {["Home", "Work", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">→ {l}</a>
            ))}
          </div>

          {/* Social */}
          <div className="col-md-4">
            <div className="footer-heading">Connect</div>
            <div style={{ display: "flex", gap: 10 }}>
              {["GH", "LI", "TW"].map(s => (
                <a key={s} href="#" className="footer-social">{s}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">© 2026 MySite. All rights reserved.</div>
      </div>
    </footer>
  </>
);

export default Footer;
