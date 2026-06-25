import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: radial-gradient(circle at top, rgba(59,130,246,0.14) 0%, rgba(0,0,0,0.95) 36%);
      color: #f8fafc;
      font-family: 'Inter', system-ui, sans-serif;
      min-height: 100vh;
    }

    .app-root {
      min-height: 100vh;
      background: linear-gradient(180deg, #06070d 0%, #080b12 100%);
    }

    .app-header {
      padding: 0 1.5rem;
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(8, 11, 20, 0.82);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04);
    }

    .app-header-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 72px;
      gap: 20px;
    }

    .app-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .app-logo-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: linear-gradient(135deg, #60a5fa, #6366f1);
      box-shadow: 0 0 18px rgba(96,165,250,0.45);
      animation: logoPulse 2.2s ease-in-out infinite;
    }

    @keyframes logoPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.55; transform: scale(0.88); }
    }

    .app-logo-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      font-weight: 700;
      color: #f8fafc;
      letter-spacing: -0.03em;
      transition: color 0.2s ease;
    }

    .app-logo:hover .app-logo-text { color: #93c5fd; }

    .app-logo-badge {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: #bfdbfe;
      background: rgba(59,130,246,0.14);
      border: 1px solid rgba(59,130,246,0.22);
      padding: 3px 9px;
      border-radius: 999px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .app-nav {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(15, 23, 42, 0.92);
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
      text-decoration: none;
    }

    .nav-btn:hover {
      background: rgba(59,130,246,0.18);
      border-color: rgba(96,165,250,0.35);
      transform: translateY(-1px);
      color: #f8fafc;
    }

    .nav-btn-icon {
      font-size: 14px;
      line-height: 1;
    }

    @media (max-width: 640px) {
      .app-header { padding: 0 1rem; }
      .app-header-inner { min-height: 64px; }
      .app-logo-badge { display: none; }
      .nav-btn { padding: 9px 14px; font-size: 12px; }
      .nav-btn span:nth-child(2) { display: none; }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="app-root">
        <header className="app-header">
          <div className="app-header-inner">

            {/* Logo */}
            <div className="app-logo" onClick={() => navigate("/")}>
              <div className="app-logo-dot" />
              <span className="app-logo-text">Chronicle</span>
              <span className="app-logo-badge">Tech</span>
            </div>

            {/* Nav */}
            <nav className="app-nav">
              <button className="nav-btn" onClick={() => navigate("/")}>
                <span className="nav-btn-icon">⌂</span>
                <span>Home</span>
              </button>
            </nav>

          </div>
        </header>

        <Outlet />
      </div>
    </>
  );
}