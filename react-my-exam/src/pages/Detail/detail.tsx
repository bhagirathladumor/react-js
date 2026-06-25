import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Article = {
    title: string;
    description: string | null;
    content: string | null;
    author: string | null;
    publishedAt: string;
    urlToImage: string | null;
    source: { name: string };
    url: string;
};

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        if (!id) return;
        const decodedDate = decodeURIComponent(id);
        const stored = sessionStorage.getItem("newsArticles");
        if (!stored) return;
        try {
            const parsed = JSON.parse(stored) as Article[];
            const found = parsed.find((a) => a.publishedAt === decodedDate);
            if (found) setArticle(found);
        } catch (error) {
            console.error("Failed to load article", error);
        }
    }, [id]);

    const formatDate = (value: string) =>
        new Date(value).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });

    const cleanContent = (raw: string | null) => {
        if (!raw) return null;
        // Remove the "[+N chars]" NewsAPI truncation notice
        return raw.replace(/\[\+\d+ chars\]$/, "").trim();
    };

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background: radial-gradient(circle at top, rgba(59,130,246,0.14) 0%, rgba(7,11,20,0.95) 40%, #050608 100%);
            color: #f8fafc;
            font-family: 'Inter', system-ui, sans-serif;
            min-height: 100vh;
        }

        /* ── Page shell ── */
        .detail-page {
            min-height: 100vh;
            background: linear-gradient(180deg, rgba(6, 8, 15, 0.98) 0%, #06080f 100%);
            padding: 3rem 1.5rem 6rem;
        }

        .detail-inner {
            max-width: 760px;
            margin: 0 auto;
            background: rgba(14, 20, 34, 0.88);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 28px;
            padding: 32px;
            box-shadow: 0 30px 80px rgba(0,0,0,0.22);
            backdrop-filter: blur(18px);
        }

        /* ── Back button ── */
        .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 18px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(15, 23, 42, 0.96);
            color: #dbeafe;
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
            margin-bottom: 2rem;
        }
        .back-btn:hover {
            background: rgba(96,165,250,0.12);
            border-color: rgba(96,165,250,0.35);
            transform: translateY(-1px);
            color: #f8fafc;
        }
        .back-arrow {
            font-size: 16px;
            transition: transform 0.2s ease;
        }
        .back-btn:hover .back-arrow { transform: translateX(-3px); }

        /* ── Meta bar ── */
        .meta-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        .source-pill {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #bfdbfe;
            background: rgba(96,165,250,0.14);
            border: 1px solid rgba(96,165,250,0.2);
            padding: 5px 12px;
            border-radius: 999px;
        }
        .meta-dot { color: rgba(255,255,255,0.3); font-size: 16px; }
        .meta-date { font-size: 13px; color: #94a3b8; }

        /* ── Title ── */
        .article-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: clamp(30px, 4vw, 44px);
            font-weight: 700;
            line-height: 1.12;
            color: #f8fafc;
            letter-spacing: -0.03em;
            margin-bottom: 1.6rem;
        }

        /* ── Author row ── */
        .author-row {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 0;
            border-top: 1px solid rgba(255,255,255,0.06);
            border-bottom: 1px solid rgba(255,255,255,0.06);
            margin-bottom: 2rem;
        }
        .author-avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: linear-gradient(135deg, #60a5fa, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-weight: 700;
            color: #ffffff;
            flex-shrink: 0;
        }
        .author-name {
            font-size: 15px;
            font-weight: 700;
            color: #f8fafc;
        }
        .author-label {
            font-size: 12px;
            color: #94a3b8;
            margin-top: 2px;
        }

        /* ── Hero image ── */
        .hero-img-wrap {
            width: 100%;
            border-radius: 22px;
            overflow: hidden;
            margin-bottom: 2.2rem;
            border: 1px solid rgba(255,255,255,0.08);
            background: radial-gradient(circle at top, rgba(96,165,250,0.14), transparent 45%);
        }
        .hero-img {
            width: 100%;
            max-height: 440px;
            object-fit: cover;
            display: block;
        }
        .hero-img-placeholder {
            width: 100%;
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 72px;
            color: rgba(248,250,252,0.6);
            background: linear-gradient(135deg, #0f172a 0%, #111827 100%);
        }

        /* ── Body text ── */
        .article-description {
            font-size: 18px;
            font-weight: 400;
            color: #dbeafe;
            line-height: 1.75;
            margin-bottom: 1.75rem;
            padding-bottom: 1.75rem;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            font-style: italic;
        }

        .article-content {
            font-size: 16px;
            color: #d1d5db;
            line-height: 1.85;
            margin-bottom: 2.75rem;
        }

        /* ── Divider ── */
        .section-divider {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 2rem 0;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .divider-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #60a5fa;
            flex-shrink: 0;
        }

        /* ── CTA card ── */
        .cta-card {
            background: rgba(15, 23, 42, 0.98);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 22px;
            padding: 26px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
        }
        .cta-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 18px;
            font-weight: 700;
            color: #f8fafc;
            margin-bottom: 6px;
        }
        .cta-sub {
            font-size: 13px;
            color: #94a3b8;
        }
        .cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 20px;
            border-radius: 999px;
            border: none;
            background: #60a5fa;
            color: #0f172a;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
            white-space: nowrap;
            flex-shrink: 0;
        }
        .cta-btn:hover {
            background: #38bdf8;
            transform: translateY(-1px);
            box-shadow: 0 12px 28px rgba(56,189,248,0.22);
        }
        .cta-btn:active { transform: translateY(0); }

        /* ── Not found ── */
        .not-found {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            gap: 18px;
            text-align: center;
        }
        .not-found-icon { font-size: 68px; opacity: 0.35; }
        .not-found-title {
            font-family: 'Playfair Display', serif;
            font-size: 26px;
            color: #f8fafc;
        }
        .not-found-sub { font-size: 14px; color: #94a3b8; }

        /* ── Fade-in ── */
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .detail-inner { animation: fadeUp 0.4s ease both; }

        @media (max-width: 600px) {
            .detail-page { padding: 2rem 1rem 4rem; }
            .detail-inner { padding: 24px; }
            .cta-card { flex-direction: column; align-items: stretch; }
            .cta-btn { width: 100%; justify-content: center; }
        }
    `;

    if (!article) {
        return (
            <>
                <style>{styles}</style>
                <div className="detail-page">
                    <div className="not-found">
                        <div className="not-found-icon">📭</div>
                        <h2 className="not-found-title">Article not found</h2>
                        <p className="not-found-sub">This story may have expired from your session.</p>
                        <button className="back-btn" onClick={() => navigate("/")}>
                            <span className="back-arrow">←</span> Back to Home
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{styles}</style>
            <div className="detail-page">
                <div className="detail-inner">

                    {/* Back */}
                    <button className="back-btn" onClick={() => navigate("/")}>
                        <span className="back-arrow">←</span> All Stories
                    </button>

                    {/* Meta */}
                    <div className="meta-bar">
                        <span className="source-pill">{article.source?.name || "Unknown"}</span>
                        <span className="meta-dot">·</span>
                        <span className="meta-date">{formatDate(article.publishedAt)}</span>
                    </div>

                    {/* Title */}
                    <h1 className="article-title">{article.title}</h1>

                    {/* Author */}
                    <div className="author-row">
                        <div className="author-avatar">
                            {(article.author || "?").charAt(0).toUpperCase()}
                        </div>
                        <div className="author-info">
                            <div className="author-name">{article.author || "Unknown Author"}</div>
                            <div className="author-label">Staff Writer</div>
                        </div>
                    </div>

                    {/* Hero image */}
                    {!imgError && article.urlToImage ? (
                        <div className="hero-img-wrap">
                            <img
                                className="hero-img"
                                src={article.urlToImage}
                                alt={article.title}
                                onError={() => setImgError(true)}
                            />
                        </div>
                    ) : (
                        <div className="hero-img-wrap">
                            <div className="hero-img-placeholder">📰</div>
                        </div>
                    )}

                    {/* Description (lead) */}
                    {article.description && (
                        <p className="article-description">{article.description}</p>
                    )}

                    {/* Content */}
                    {cleanContent(article.content) ? (
                        <p className="article-content">{cleanContent(article.content)}</p>
                    ) : (
                        <p className="article-content" style={{ fontStyle: "italic", opacity: 0.5 }}>
                            Full content not available in preview.
                        </p>
                    )}

                    {/* Divider */}
                    <div className="section-divider">
                        <div className="divider-line" />
                        <div className="divider-dot" />
                        <div className="divider-line" />
                    </div>

                    {/* CTA */}
                    <div className="cta-card">
                        <div className="cta-text">
                            <div className="cta-title">Continue reading on {article.source?.name || "the source"}</div>
                            <div className="cta-sub">Full story with all details on the original publication</div>
                        </div>
                        <button className="cta-btn" onClick={() => window.open(article.url, "_blank")}>
                            Read Full Article ↗
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}