import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchNews();
        }
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredArticles(articles);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = articles.filter(
                (article) =>
                    article.author?.toLowerCase().includes(query) ||
                    article.source?.name?.toLowerCase().includes(query)
            );
            setFilteredArticles(filtered);
        }
    }, [searchQuery, articles]);

    const fetchNews = async () => {
        try {
            const response = await axios.get(
                "https://newsapi.org/v2/everything?q=technology&pageSize=20&apiKey=1ec49c0db02b4b50ad2d9c291a352715"
            );
            if (response.data.status === "ok") {
                const filtered = response.data.articles.filter(
                    (article: Article) =>
                        article.title && article.title !== "[Removed]"
                );
                setArticles(filtered);
                setFilteredArticles(filtered);
                sessionStorage.setItem("newsArticles", JSON.stringify(filtered));
                toast.success(`${filtered.length} articles loaded`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "dark",
                    toastId: "success-toast",
                });
            }
        } catch (error) {
            console.error("Failed to load news articles", error);
            toast.error("Failed to load news. Check your connection.", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                theme: "dark",
                toastId: "error-toast",
            });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (value: string) =>
        new Date(value).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background: radial-gradient(circle at top, rgba(59,130,246,0.18) 0%, rgba(10,12,20,0.96) 38%, #050608 100%);
            color: #f8fafc;
            font-family: 'Inter', system-ui, sans-serif;
        }

        .news-app {
            min-height: 100vh;
            background: linear-gradient(180deg, rgba(10, 12, 20, 0.98) 0%, rgba(6, 8, 15, 1) 100%);
        }

        /* ── Header ── */
        .header {
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding: 0 1.5rem;
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(10, 12, 20, 0.88);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
        }
        .header-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 72px;
            gap: 18px;
        }
        .search-wrap {
            flex: 1;
            max-width: 560px;
            position: relative;
        }
        .search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            font-size: 16px;
            pointer-events: none;
            transition: color 0.2s ease;
        }
        .search-wrap:focus-within .search-icon {
            color: #60a5fa;
        }
        .search-input {
            width: 100%;
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 18px;
            padding: 14px 18px 14px 44px;
            font-size: 15px;
            font-family: 'Inter', sans-serif;
            color: #f8fafc;
            outline: none;
            transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .search-input::placeholder { color: #7c8a9b; }
        .search-input:focus {
            border-color: rgba(96,165,250,0.65);
            background: rgba(15, 23, 42, 1);
            box-shadow: 0 0 0 4px rgba(96,165,250,0.12);
        }
        .header-count {
            font-size: 13px;
            color: #cbd5e1;
            white-space: nowrap;
            flex-shrink: 0;
            padding: 10px 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.03);
        }
        .header-count span {
            color: #f8fafc;
            font-weight: 700;
        }

        /* ── Main ── */
        .main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2.5rem 2rem 4rem;
        }

        /* ── Section label ── */
        .section-label {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 1.5rem;
        }
        .section-label-text {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #94a3b8;
        }
        .section-label-line {
            flex: 1;
            height: 1px;
            background: rgba(255,255,255,0.06);
        }

        /* ── Hero card ── */
        .hero-card {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 0;
            border-radius: 24px;
            overflow: hidden;
            background: rgba(15, 23, 42, 0.96);
            border: 1px solid rgba(96,165,250,0.16);
            margin-bottom: 2.5rem;
            text-decoration: none;
            color: inherit;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            min-height: 400px;
            backdrop-filter: blur(10px);
        }
        .hero-card:hover {
            transform: translateY(-2px);
            border-color: rgba(96,165,250,0.35);
            box-shadow: 0 28px 80px rgba(0,0,0,0.28);
        }
        .hero-img-wrap {
            position: relative;
            overflow: hidden;
            min-height: 100%;
        }
        .hero-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
        }
        .hero-card:hover .hero-img { transform: scale(1.04); }
        .hero-img-placeholder {
            width: 100%;
            height: 100%;
            min-height: 400px;
            background: radial-gradient(circle at 30% 30%, rgba(96,165,250,0.2), transparent 40%),
                linear-gradient(135deg, #10131b 0%, #111827 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 72px;
            color: rgba(255,255,255,0.7);
        }
        .hero-content {
            padding: 2.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 1.5rem;
        }
        .hero-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 1rem;
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
        .meta-dot { color: rgba(255,255,255,0.3); font-size: 18px; }
        .meta-date { font-size: 12px; color: #94a3b8; }
        .hero-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: clamp(32px, 3vw, 42px);
            font-weight: 700;
            line-height: 1.15;
            color: #f8fafc;
            letter-spacing: -0.03em;
            margin-bottom: 1rem;
        }
        .hero-desc {
            font-size: 15px;
            color: #cbd5e1;
            line-height: 1.8;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            flex: 1;
        }
        .hero-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255,255,255,0.06);
        }
        .author-chip {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .author-avatar {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: linear-gradient(135deg, #60a5fa, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            color: #ffffff;
            flex-shrink: 0;
        }
        .author-name { font-size: 13px; color: #cbd5e1; }
        .read-btn {
            font-size: 13px;
            font-weight: 700;
            color: #e0f2fe;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 10px 16px;
            border-radius: 999px;
            background: rgba(96,165,250,0.12);
            border: 1px solid rgba(96,165,250,0.2);
            transition: transform 0.2s ease, background 0.2s ease;
        }
        .hero-card:hover .read-btn { transform: translateX(2px); background: rgba(96,165,250,0.18); }

        /* ── Grid ── */
        .articles-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
        }

        /* ── Card ── */
        .article-link {
            text-decoration: none;
            color: inherit;
            display: block;
        }
        .article-card {
            background: rgba(15, 23, 42, 0.96);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 22px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            backdrop-filter: blur(12px);
        }
        .article-card:hover {
            border-color: rgba(96,165,250,0.3);
            box-shadow: 0 16px 48px rgba(0,0,0,0.24);
            transform: translateY(-2px);
        }
        .card-img {
            width: 100%;
            height: 190px;
            object-fit: cover;
            display: block;
            transition: transform 0.4s ease;
        }
        .article-card:hover .card-img { transform: scale(1.05); }
        .card-img-wrap { overflow: hidden; height: 190px; }
        .card-img-placeholder {
            width: 100%;
            height: 190px;
            background: linear-gradient(135deg, #0f172a, #111827);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            color: rgba(255,255,255,0.65);
        }
        .card-body {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .card-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        .card-source {
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #bfdbfe;
        }
        .card-date { font-size: 11px; color: #94a3b8; }
        .card-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 18px;
            font-weight: 700;
            line-height: 1.35;
            color: #f8fafc;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            letter-spacing: -0.02em;
        }
        .card-desc {
            font-size: 14px;
            color: #cbd5e1;
            line-height: 1.7;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            flex: 1;
        }
        .card-author {
            font-size: 12px;
            color: #94a3b8;
            padding-top: 12px;
            border-top: 1px solid rgba(255,255,255,0.06);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .card-author-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #60a5fa;
            flex-shrink: 0;
        }

        /* ── Loader ── */
        .loader-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 500px;
            gap: 24px;
        }
        .loader-ring {
            width: 56px;
            height: 56px;
            border: 4px solid rgba(255,255,255,0.08);
            border-top-color: #60a5fa;
            border-right-color: #60a5fa;
            border-radius: 50%;
            animation: spin 0.75s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .loader-text {
            font-size: 14px;
            color: #94a3b8;
            font-weight: 500;
            letter-spacing: 0.04em;
        }

        /* ── Empty state ── */
        .empty-state {
            text-align: center;
            padding: 72px 36px;
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 24px;
        }
        .empty-icon { font-size: 56px; margin-bottom: 18px; opacity: 0.75; }
        .empty-title { font-family: 'Playfair Display', serif; font-size: 24px; color: #f8fafc; margin-bottom: 10px; }
        .empty-sub { font-size: 14px; color: #94a3b8; }

        /* ── Search count pill ── */
        .search-result-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
            margin-bottom: 1.5rem;
            font-size: 13px;
            color: #94a3b8;
        }
        .search-result-bar strong { color: #f8fafc; }
        .clear-btn {
            font-size: 12px;
            color: #60a5fa;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            font-family: 'Inter', sans-serif;
        }
        .clear-btn:hover { text-decoration: underline; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
            .hero-card { grid-template-columns: 1fr; min-height: unset; }
            .hero-img-placeholder { min-height: 260px; }
            .articles-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
            .header-inner { height: auto; flex-direction: column; align-items: stretch; gap: 16px; }
            .main { padding: 1.5rem 1rem 3rem; }
            .articles-grid { grid-template-columns: 1fr; }
            .hero-content { padding: 1.75rem; }
            .hero-title { font-size: 24px; }
            .header-count { display: none; }
        }

        /* ── Card fade-in ── */
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .article-card, .hero-card {
            animation: fadeUp 0.4s ease both;
        }
    `;

    const heroArticle = filteredArticles[0];
    const restArticles = filteredArticles.slice(1);

    return (
        <>
            <style>{styles}</style>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                theme="dark"
                limit={1}
            />

            <div className="news-app">
                <header className="header">
                    <div className="header-inner">

                        <div className="search-wrap">
                            <span className="search-icon">⌕</span>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search by author or source…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {!loading && (
                            <div className="header-count">
                                <span>{filteredArticles.length}</span> stories
                            </div>
                        )}
                    </div>
                </header>

                {/* ── Main content ── */}
                <main className="main">
                    {loading ? (
                        <div className="loader-wrap">
                            <div className="loader-ring" />
                            <p className="loader-text">Fetching latest stories…</p>
                        </div>
                    ) : (
                        <>
                            {searchQuery && (
                                <div className="search-result-bar">
                                    <strong>{filteredArticles.length}</strong> result{filteredArticles.length !== 1 ? "s" : ""} for "{searchQuery}"
                                    <button className="clear-btn" onClick={() => setSearchQuery("")}>Clear</button>
                                </div>
                            )}

                            {filteredArticles.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">🔍</div>
                                    <h3 className="empty-title">No stories found</h3>
                                    <p className="empty-sub">No results matching "{searchQuery}" in author or source</p>
                                </div>
                            ) : (
                                <>
                                    {/* ── Hero ── */}
                                    {heroArticle && !searchQuery && (
                                        <>
                                            <div className="section-label">
                                                <span className="section-label-text">Top Story</span>
                                                <div className="section-label-line" />
                                            </div>
                                            <Link
                                                to={`/news/${encodeURIComponent(heroArticle.publishedAt)}`}
                                                state={{ article: heroArticle }}
                                                className="hero-card"
                                            >
                                                <div className="hero-img-wrap">
                                                    {heroArticle.urlToImage ? (
                                                        <img className="hero-img" src={heroArticle.urlToImage} alt={heroArticle.title} />
                                                    ) : (
                                                        <div className="hero-img-placeholder">📰</div>
                                                    )}
                                                </div>
                                                <div className="hero-content">
                                                    <div>
                                                        <div className="hero-meta">
                                                            <span className="source-pill">{heroArticle.source?.name || "Unknown"}</span>
                                                            <span className="meta-dot">·</span>
                                                            <span className="meta-date">{formatDate(heroArticle.publishedAt)}</span>
                                                        </div>
                                                        <h2 className="hero-title">{heroArticle.title}</h2>
                                                        <p className="hero-desc">{heroArticle.description || "No description available."}</p>
                                                    </div>
                                                    <div className="hero-footer">
                                                        <div className="author-chip">
                                                            <div className="author-avatar">
                                                                {(heroArticle.author || "?").charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="author-name">{heroArticle.author || "Unknown Author"}</span>
                                                        </div>
                                                        <span className="read-btn">Read story →</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                    )}

                                    {/* ── Grid ── */}
                                    <div className="section-label" style={{ marginTop: !searchQuery ? "2.5rem" : 0 }}>
                                        <span className="section-label-text">
                                            {searchQuery ? "Results" : "Latest Stories"}
                                        </span>
                                        <div className="section-label-line" />
                                    </div>

                                    <div className="articles-grid">
                                        {(searchQuery ? filteredArticles : restArticles).map((article, i) => (
                                            <Link
                                                key={article.publishedAt}
                                                to={`/news/${encodeURIComponent(article.publishedAt)}`}
                                                state={{ article }}
                                                className="article-link"
                                            >
                                                <article
                                                    className="article-card"
                                                    style={{ animationDelay: `${i * 0.05}s` }}
                                                >
                                                    <div className="card-img-wrap">
                                                        {article.urlToImage ? (
                                                            <img className="card-img" src={article.urlToImage} alt={article.title} />
                                                        ) : (
                                                            <div className="card-img-placeholder">📰</div>
                                                        )}
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="card-meta">
                                                            <span className="card-source">{article.source?.name || "Unknown"}</span>
                                                            <span className="card-date">{formatDate(article.publishedAt)}</span>
                                                        </div>
                                                        <h3 className="card-title">{article.title}</h3>
                                                        <p className="card-desc">{article.description || "No description available."}</p>
                                                        <div className="card-author">
                                                            <div className="card-author-dot" />
                                                            {article.author || "Unknown Author"}
                                                        </div>
                                                    </div>
                                                </article>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </main>
            </div>
        </>
    );
}