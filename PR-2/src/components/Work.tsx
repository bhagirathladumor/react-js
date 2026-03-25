import React from "react";

const projects = [
  { title: "E-Commerce Platform", tag: "React + Node.js", desc: "Full-stack shopping app with payments & dashboard." },
  { title: "SaaS Dashboard", tag: "TypeScript + AWS", desc: "Analytics dashboard with real-time data visualization." },
  { title: "Portfolio Builder", tag: "Next.js + Tailwind", desc: "Drag-and-drop portfolio generator for creatives." },
  { title: "Mobile Banking UI", tag: "React Native", desc: "Clean banking app UI with dark mode support." },
  { title: "AI Chat App", tag: "OpenAI + Express", desc: "GPT-powered chat with history and auth." },
  { title: "DevOps Pipeline", tag: "Docker + GitHub CI", desc: "Automated CI/CD pipeline for microservices." },
];

const Work: React.FC = () => (
  <>
    <style>{`
      .work-section * { font-family: 'Space Grotesk', sans-serif; }
      .work-section {
        background: #000a06;
        padding: 100px 0;
      }
      .work-badge {
        display: inline-block;
        background: rgba(10,173,10,0.1);
        border: 1px solid rgba(10,173,10,0.25);
        border-radius: 999px; padding: 5px 16px;
        color: #0aad0a; font-size: 13px; font-weight: 500;
        margin-bottom: 16px;
      }
      .work-title {
        font-size: clamp(28px, 4vw, 44px);
        font-weight: 700; color: #fff;
        letter-spacing: -1px; margin-bottom: 12px;
      }
      .work-subtitle {
        font-size: 15px; color: rgba(255,255,255,0.4);
        max-width: 420px; margin: 0 auto 56px;
      }
      .work-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 18px; padding: 28px;
        height: 100%;
        transition: border-color 0.25s, transform 0.25s, background 0.25s;
        cursor: default;
      }
      .work-card:hover {
        border-color: rgba(10,173,10,0.35);
        background: rgba(10,173,10,0.04);
        transform: translateY(-6px);
      }
      .work-card-tag {
        display: inline-block;
        background: rgba(10,173,10,0.1);
        border: 1px solid rgba(10,173,10,0.2);
        color: #0aad0a; border-radius: 999px;
        padding: 3px 12px; font-size: 11px; font-weight: 600;
        margin-bottom: 16px;
      }
      .work-card-title {
        font-size: 17px; font-weight: 600;
        color: #fff; margin-bottom: 10px;
      }
      .work-card-desc {
        font-size: 13px; color: rgba(255,255,255,0.4);
        line-height: 1.7;
      }
      .work-card-arrow {
        margin-top: 20px;
        color: rgba(255,255,255,0.2);
        font-size: 18px;
        transition: color 0.2s, transform 0.2s;
        display: inline-block;
      }
      .work-card:hover .work-card-arrow {
        color: #0aad0a;
        transform: translateX(4px);
      }
    `}</style>

    <section id="work" className="work-section">
      <div className="container">
        <div className="text-center">
          <span className="work-badge">My Work</span>
          <h2 className="work-title">Selected Projects</h2>
          <p className="work-subtitle">A few things I've built recently.</p>
        </div>
        <div className="row gy-4">
          {projects.map(({ title, tag, desc }) => (
            <div key={title} className="col-md-6 col-lg-4">
              <div className="work-card">
                <span className="work-card-tag">{tag}</span>
                <div className="work-card-title">{title}</div>
                <div className="work-card-desc">{desc}</div>
                <div className="work-card-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Work;
