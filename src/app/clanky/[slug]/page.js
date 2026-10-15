import Link from "next/link";
import { articles, getArticleBySlug, getOtherArticles } from "@/data/articles";
import CtaButton from "./CtaButton";

export async function generateStaticParams() {
  return articles.flatMap((item) => [
    { slug: item.slug },
    { slug: String(item.id) },
  ]);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | ArabScope",
    };
  }

  return {
    title: `${article.title} | ArabScope`,
    description: article.lead,
    openGraph: {
      title: article.title,
      description: article.lead,
      images: [{ url: article.img }],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="mobile-viewport">
        <header className="site-header">
          <div className="header-main">
            <Link href="/" className="brand-link" aria-label="ArabScope Home">
              <img src="/images/logo.png" alt="ArabScope" className="brand-logo" />
            </Link>
          </div>
        </header>
        <main className="article-container" style={{ padding: "40px 20px", textAlign: "center" }}>
          <h1 className="article-headline" style={{ fontSize: "22px", marginBottom: "16px" }}>Article Not Found</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "24px" }}>
            The article you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="cta-btn" style={{ maxWidth: "240px", margin: "0 auto" }}>
            Return to Home
          </Link>
        </main>
      </div>
    );
  }

  const otherArticles = getOtherArticles(slug);

  return (
    <div className="mobile-viewport">
      {/* 1. Header */}
      <header className="site-header">
        <div className="header-main">
          {/* Hamburger / Back */}
          <Link href="/" className="icon-btn" aria-label="Back to Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>

          {/* Brand Logo */}
          <Link href="/" className="brand-link" aria-label="ArabScope Home">
            <img src="/images/logo.png" alt="ArabScope" className="brand-logo" />
          </Link>

          {/* Actions */}
          <div className="header-actions">
            <button className="icon-btn epaper-btn" aria-label="E-Paper">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <line x1="7" y1="8" x2="12" y2="8"></line>
                <line x1="7" y1="12" x2="12" y2="12"></line>
                <line x1="7" y1="16" x2="17" y2="16"></line>
                <line x1="15" y1="8" x2="17" y2="8"></line>
                <line x1="15" y1="12" x2="17" y2="12"></line>
              </svg>
            </button>
            <button className="icon-btn" aria-label="Search">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7.5"></circle>
                <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Ticker Bar */}
        <div className="ticker-bar">
          <span className="ticker-item">GOLD/FOREX</span>
          <span className="ticker-item weather-item">
            <span>DUBAI 32°C</span>
            <span className="weather-icon">☀️</span>
          </span>
          <span className="ticker-item">PRAYER TIMES</span>
        </div>

      </header>

      {/* 2. Main Article Content */}
      <main className="article-container">
        {/* Kicker */}
        <div className="article-kicker">{article.category}</div>

        {/* Headline */}
        <h1 className="article-headline">{article.title}</h1>

        {/* Lead / Subtitle */}
        <p className="article-deck">
          <strong>At a glance:</strong> {article.lead}
        </p>

        {/* Meta Info */}
        <div className="article-meta">
          <div className="meta-date">Last updated: {article.date}</div>
          <div className="meta-byline">{article.author}</div>
        </div>

        {/* Hero Image */}
        <figure className="article-hero-figure">
          <div className="hero-image-wrap">
            <img
              src={article.img}
              alt={article.title}
              className="hero-img"
              loading="eager"
            />
          </div>
          <figcaption className="hero-caption">
            {article.title}
            <span className="photo-credit">Image Credit: ArabScope / Gulf News</span>
          </figcaption>
        </figure>

        {/* Article Body */}
        <div className="article-body">
          {article.paragraphs.map((p, idx) => (
            <p key={idx} className="body-p">
              {p}
            </p>
          ))}
        </div>

        

        {/* 3. Unread News Section */}
        <section className="unread-section">
          <div className="unread-header">
            <div className="unread-icon">
              <span className="bar-black"></span>
              <span className="bar-red"></span>
            </div>
            <h2 className="unread-title">NEWS YOU HAVEN’T READ</h2>
          </div>

          <div className="unread-list">
            {otherArticles.map((item) => (
              <Link
                key={item.id}
                href={`/clanky/${item.slug}`}
                className="unread-card"
              >
                <div className="unread-thumb-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="unread-thumb"
                  />
                </div>
                <div className="unread-info">
                  <h3 className="unread-headline">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Black CTA Button (5-second redirect to CoinDesk) */}
        <CtaButton />
      </main>

      {/* 4. Site Footer */}
      <footer className="site-footer">
        <div className="footer-social-section">
          <h3 className="footer-section-title">Find us on social</h3>
          <div className="footer-social-row">
            <a href="https://www.instagram.com/gulfnews" target="_blank" rel="noopener" className="footer-social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.facebook.com/GulfNews.UAE" target="_blank" rel="noopener" className="footer-social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://twitter.com/gulf_news" target="_blank" rel="noopener" className="footer-social-btn" aria-label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a href="https://whatsapp.com/channel/0029Va72kU8It5rt8E054U34" target="_blank" rel="noopener" className="footer-social-btn" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-app-section">
          <h3 className="footer-section-title">Download our app</h3>
          <div className="footer-badges-grid">
            <a href="https://apps.apple.com" target="_blank" rel="noopener" className="store-badge">
              <svg className="store-icon" width="20" height="24" viewBox="0 0 170 170" fill="currentColor">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.05-7.7-7.76-12.01-14.13-6.1-9.04-10.88-19.49-14.34-31.36-3.46-11.87-5.19-23.11-5.19-33.72 0-14.37 3.58-26.4 10.74-36.09 7.16-9.69 16.32-14.65 27.48-14.88 5.1 0 10.63 1.34 16.59 4.02 5.96 2.68 9.94 4.08 11.96 4.2 1.77-.24 5.93-1.69 12.48-4.34 6.55-2.65 12.06-3.87 16.52-3.66 12.28.61 22.09 4.96 29.43 13.06-10.74 6.53-15.98 15.65-15.72 27.36.26 9.17 3.86 16.89 10.81 23.16 6.95 6.27 15.11 9.87 24.48 10.8-2.31 7.07-4.94 13.84-7.89 20.31zM119.22 31.84c0-7.39 2.69-14.36 8.07-20.91 5.38-6.55 12.05-10.51 20.02-11.87 1.04 7.51-1.35 14.7-7.17 21.57-5.82 6.87-12.78 11-20.92 12.38v-1.17z"/>
              </svg>
              <div className="store-text">
                <span className="store-sub">Download on the</span>
                <span className="store-name">App Store</span>
              </div>
            </a>

            <a href="https://play.google.com" target="_blank" rel="noopener" className="store-badge">
              <svg className="store-icon" width="20" height="22" viewBox="0 0 512 512">
                <path fill="#00f076" d="M380.9 238.8L86.2 38.6c-9.1-6.2-20.4-3.5-26.6 5.6-2.5 3.7-3.9 8.1-3.9 12.7v398.2c0 11 8.9 19.9 19.9 19.9 4.6 0 9-1.4 12.7-3.9l292.6-196.4c9.3-6.2 11.8-18.7 5.6-28-.5-.8-1-1.5-1.6-2.1z"/>
                <path fill="#00a0f0" d="M55.7 56.9L283 256 55.7 455.1c0-.1 0-.2 0-.3V57.2c0-.1 0-.2 0-.3z"/>
                <path fill="#ffe000" d="M380.9 273.2l-97.9-67.2-46.1 46.1 46.1 46.1 97.9-67.2c-1.6 1.4-1.6 1.4 0 2.2z"/>
                <path fill="#ff3a44" d="M283 256L55.7 56.9c3.7-2.5 8.1-3.9 12.7-3.9 6.8 0 13.3 3.3 17.8 8.9L380.9 238.8 283 256z"/>
              </svg>
              <div className="store-text">
                <span className="store-sub">GET IT ON</span>
                <span className="store-name">Google Play</span>
              </div>
            </a>

            <a href="https://appgallery.huawei.com" target="_blank" rel="noopener" className="store-badge">
              <svg className="store-icon" width="22" height="22" viewBox="0 0 48 48">
                <rect x="4" y="4" width="40" height="40" rx="8" fill="#e01a22"/>
                <path d="M24 14c-4.4 0-8 3.6-8 8v1h16v-1c0-4.4-3.6-8-8-8zm0 2.5c3 0 5.5 2.5 5.5 5.5v1h-11v-1c0-3 2.5-5.5 5.5-5.5z" fill="#ffffff"/>
                <rect x="13" y="21" width="22" height="15" rx="3" fill="#ffffff"/>
              </svg>
              <div className="store-text">
                <span className="store-sub">EXPLORE IT ON</span>
                <span className="store-name">AppGallery</span>
              </div>
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-copy-text">
          © ArabScope 2026. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
