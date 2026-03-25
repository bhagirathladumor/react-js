import React from "react";

const Slider: React.FC = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
      .hero-section * { font-family: 'Space Grotesk', sans-serif; }
      .hero-section {
        min-height: 92vh;
        background: #000a06;
        display: flex; align-items: center;
        position: relative; overflow: hidden;
      }
      .hero-blob {
        position: absolute; border-radius: 50%;
        filter: blur(80px); pointer-events: none;
      }
      .hero-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(10,173,10,0.1);
        border: 1px solid rgba(10,173,10,0.25);
        border-radius: 999px; padding: 6px 16px;
        color: #0aad0a; font-size: 13px; font-weight: 500;
        margin-bottom: 24px;
      }
      .hero-badge-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #0aad0a;
        box-shadow: 0 0 8px #0aad0a;
        animation: pulse-dot 1.8s ease-in-out infinite;
      }
      @keyframes pulse-dot {
        0%,100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.7); }
      }
      .hero-title {
        font-size: clamp(38px, 6vw, 72px);
        font-weight: 700; line-height: 1.1;
        color: #fff; letter-spacing: -1.5px;
        margin-bottom: 20px;
      }
      .hero-title .green { color: #0aad0a; }
      .hero-desc {
        font-size: 16px; color: rgba(255,255,255,0.5);
        max-width: 480px; line-height: 1.75;
        margin-bottom: 36px;
      }
      .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
      .hero-btn-primary {
        background: #0aad0a; color: #fff;
        border: none; border-radius: 999px;
        padding: 13px 30px; font-size: 15px; font-weight: 600;
        text-decoration: none; cursor: pointer;
        transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        box-shadow: 0 0 0 0 rgba(10,173,10,0.4);
      }
      .hero-btn-primary:hover {
        background: #088a08; color: #fff;
        box-shadow: 0 0 24px rgba(10,173,10,0.5);
        transform: translateY(-2px);
      }
      .hero-btn-outline {
        background: transparent; color: rgba(255,255,255,0.8);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 999px; padding: 13px 30px;
        font-size: 15px; font-weight: 500;
        text-decoration: none; cursor: pointer;
        transition: border-color 0.2s, color 0.2s;
      }
      .hero-btn-outline:hover {
        border-color: #0aad0a; color: #0aad0a;
      }
      .hero-card {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px; padding: 28px;
        backdrop-filter: blur(10px);
      }
      .hero-stat-num {
        font-size: 32px; font-weight: 700; color: #fff;
      }
      .hero-stat-num span { color: #0aad0a; }
      .hero-stat-label {
        font-size: 13px; color: rgba(255,255,255,0.45); margin-top: 2px;
      }
      .hero-divider {
        width: 1px; background: rgba(255,255,255,0.08); align-self: stretch;
      }
    `}</style>

    <section id="home" className="hero-section">
      {/* Background blobs */}
      <div className="hero-blob" style={{ width: 500, height: 500, background: "rgba(10,173,10,0.07)", top: -100, left: -100 }} />
      <div className="hero-blob" style={{ width: 300, height: 300, background: "rgba(10,173,10,0.05)", bottom: 0, right: 100 }} />

      <div className="container">
        <div className="row align-items-center gy-5">
          {/* Left */}
          <div className="col-lg-7">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for work
            </div>
            <h1 className="hero-title">
              Building digital<br />
              products that <span className="green">matter.</span>
            </h1>
            <p className="hero-desc">
              Full-stack developer crafting fast, beautiful, and scalable web experiences from idea to deployment.
            </p>
            <div className="hero-btns">
              <a href="#work" className="hero-btn-primary">View My Work →</a>
              <a href="#contact" className="hero-btn-outline">Let's Talk</a>
            </div>
          </div>

          {/* Right — stats card */}
          <div className="col-lg-5">
            <div className="hero-card">
              <div className="d-flex align-items-center gap-4">
                <div className="text-center flex-fill">
                  <div className="hero-stat-num">12<span>+</span></div>
                  <div className="hero-stat-label">Projects Done</div>
                </div>
                <div className="hero-divider" />
                <div className="text-center flex-fill">
                  <div className="hero-stat-num">3<span>+</span></div>
                  <div className="hero-stat-label">Years Exp.</div>
                </div>
                <div className="hero-divider" />
                <div className="text-center flex-fill">
                  <div className="hero-stat-num">98<span>%</span></div>
                  <div className="hero-stat-label">Satisfaction</div>
                </div>
              </div>
              <hr style={{ borderColor: "rgba(255,255,255,0.07)", margin: "22px 0" }} />
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Tech Stack</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["React", "TypeScript", "Node.js", "Tailwind", "AWS"].map(t => (
                  <span key={t} style={{
                    background: "rgba(10,173,10,0.1)",
                    border: "1px solid rgba(10,173,10,0.2)",
                    color: "#0aad0a", borderRadius: 999,
                    padding: "4px 12px", fontSize: 12, fontWeight: 500
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Slider;