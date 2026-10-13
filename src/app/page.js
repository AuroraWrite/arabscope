"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { articles } from "@/data/articles";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(128);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingOverlayActive, setLoadingOverlayActive] = useState(false);
  const [ctaLoading, setCtaLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleRedirect = (url) => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    setLoadingOverlayActive(true);
    setTimeout(() => {
      window.location.href = url;
    }, 5000);
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (isRedirecting) return;
    setIsRedirecting(true);
    setCtaLoading(true);
    setLoadingOverlayActive(true);
    setTimeout(() => {
      window.location.href = "https://www.coindesk.com/tag/dubai";
    }, 5000);
  };

  const handleLike = () => {
    setHasLiked(prev => {
      const next = !prev;
      setLikes(l => next ? l + 1 : l - 1);
      showToast(next ? "Thank you for your feedback!" : "Feedback removed");
      return next;
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(prev => {
      const next = !prev;
      showToast(next ? "Saved to reading list" : "Removed from saved articles");
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percent = (window.scrollY / docHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, percent)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mobile-viewport">
      {/* 1. Top Header */}
      <header className="site-header">
        <div className="header-main">
          {/* Hamburger Menu Button */}
          <button
            id="menuBtn"
            className="icon-btn"
            aria-label="Open Navigation Menu"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <line x1="1" y1="2" x2="21" y2="2"></line>
              <line x1="1" y1="9" x2="21" y2="9"></line>
              <line x1="1" y1="16" x2="21" y2="16"></line>
            </svg>
          </button>

          {/* Brand Logo (ArabScope - Fig 2) */}
          <a href="#" className="brand-link" aria-label="ArabScope Home">
            <img
              src="/images/logo.png"
              alt="ArabScope"
              className="brand-logo"
            />
          </a>

          {/* Right Action Icons */}
          <div className="header-actions">
            {/* E-Paper / Newspaper Icon */}
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
            
            {/* Search Icon */}
            <button
              id="searchBtn"
              className="icon-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(prev => !prev)}
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7.5"></circle>
                <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Market & Weather Ticker Bar */}
        <div className="ticker-bar">
          <a href="#markets" className="ticker-item">GOLD/FOREX</a>
          <a href="#weather" className="ticker-item weather-item">
            <span>DUBAI 32°C</span>
            <span className="weather-icon">☀️</span>
          </a>
          <a href="#prayer" className="ticker-item">PRAYER TIMES</a>
        </div>


        {/* Reading Progress Indicator */}
        <div className="reading-progress-track">
          <div
            id="readingProgressBar"
            className="reading-progress-fill"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </header>

      {/* Collapsible Search Bar Overlay */}
      <div id="searchOverlay" className={`search-overlay ${searchOpen ? "active" : ""}`}>
        <div className="search-input-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            id="searchInput"
            placeholder="Search news, topics, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            id="closeSearchBtn"
            className="close-search-btn"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            ×
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Drawer Navigation */}
      <div
        id="navDrawerBackdrop"
        className={`drawer-backdrop ${drawerOpen ? "active" : ""}`}
        onClick={() => setDrawerOpen(false)}
      ></div>
      <aside
        id="navDrawer"
        className={`nav-drawer ${drawerOpen ? "active" : ""}`}
        aria-label="Mobile Navigation"
      >
        <div className="drawer-header">
          <img src="/images/logo.png" alt="ArabScope" className="drawer-logo" />
          <button
            id="closeDrawerBtn"
            className="close-drawer-btn"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            ×
          </button>
        </div>
        <nav className="drawer-nav">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Gulf & UAE</a>
          <a href="#" className="nav-link">Business & Finance</a>
          <a href="#" className="nav-link">Tech & Artificial Intelligence</a>
          <a href="#" className="nav-link">World News</a>
          <a href="#" className="nav-link">Opinion & Columns</a>
          <a href="#" className="nav-link">Lifestyle & Culture</a>
          <a href="#" className="nav-link">Sport</a>
        </nav>
        <div className="drawer-footer">
          <p className="drawer-copy">© 2026 ArabScope Media FZ-LLC</p>
        </div>
      </aside>

      {/* 2. Main Article Content */}

<main className="article-container">
      
      
      <div className="article-tag">PARTNER CONTENT</div>

      
      <h1 className="article-title">
        UAE warns crypto holders: WiFi attacks spread from hotels to private homes — Dubai crypto thefts rising
      </h1>

      
      <p className="article-deck">
        <strong>At a glance:</strong> Investigations show these WiFi attacks are mainly aimed at stealing cryptocurrency. Over 12,000 WiFi attacks in the UAE in 2025. About 35% of cyberattacks start with WiFi. Hackers now target not only public networks like hotels, but also private homes.
      </p>

      
      <div className="article-meta">
        <div className="meta-date">Last updated: October 13, 2026 | 18:03</div>
        <div className="meta-byline">Huda Ata, Special to ArabScope</div>
      </div>

      
      <figure className="article-hero-figure">
        <div className="hero-image-wrap">
          <img 
            src="/images/hero.jpg" 
            alt="Cybercriminal opening safe with Bitcoin: UAE warns of WiFi crypto thefts" 
            className="hero-img"
            loading="eager"
           />
        </div>
        <figcaption className="hero-caption">
          Cybercriminals in the UAE are increasingly targeting vulnerable Wi-Fi connections to compromise crypto wallets, hijack private files, and blackmail victims.
          <span className="photo-credit">Image Credit: ArabScope / Getty Images</span>
        </figcaption>
      </figure>

            
      <div className="article-body">
        <div className="lead-quote">
          “You think you are just connecting to WiFi. But you are putting your wallet, photos and chats into a glass room with no walls. The hacker does not break in. They just wait for you to press ‘connect.’”
        </div>

        <h2>Hotel: Fake WiFi, empty wallet, blackmail</h2>
        <p>
          A model in Dubai returned to her hotel. Her phone auto-connected to a WiFi name almost identical to the front desk’s — only one underscore different. She checked her wallet, made a call, nothing seemed wrong. She did not click strange links or share her recovery words.
        </p>
        <p>
          Three days later, she checked out. One week later, she got a message: her wallet balance was zero. Then screenshots from her cloud album — including private photos. The last message: <em>“Send 50,000 USDT, or the photos go public.”</em>
        </p>
        <p>
          She did not pay. She called police, deleted social media and left Dubai. But some photos had spread. Her $200,000 was gone.
        </p>

        <h2>Home: Router hacked, $80,000 stolen</h2>
        <p>
          That same week, Ahmed, a local resident in Mirdif, opened his crypto wallet. About $80,000 in Ethereum and stablecoins had vanished. No fake link. No strange pop-up. The hacker got in through his home router — default password, never updated in three years. They got into his wallet’s connection and stole the login key. His home security cameras had also been accessed.
        </p>

        <h2>What the UAE Cybersecurity Council says</h2>
        <p>
          Attacks on home routers and VPN devices have jumped over 40%. About 38% of recent attacks target home network equipment. Hackers are moving from protected central systems to weak points in people’s homes. The router you never changed the password for is now the back door to your wallet, photos and cameras.
        </p>

        <h2>How it works</h2>
        <p>
          Hackers create fake WiFi names like “Hotel_Free_WiFi” or “HotelFreeWiFi.” Your phone connects automatically. Once on the same network, they can see all your online activity. They wait until you leave the network — then strike. Draining the wallet is only the start. Photos, chats and camera videos become blackmail tools.
        </p>

        <h2>What you should do</h2>
        <p>Never open your wallet, bank app or cloud album on public WiFi. Use mobile data.</p>
        <p>Turn off auto-connect. Ask hotel staff for the exact WiFi name.</p>
        <p>At home: change the router’s default password. Use WPA3. Give guests a separate network. Update the router software.</p>
        <p>If you must use public WiFi, turn on a VPN.</p>
        <p>Keep large amounts in a hardware wallet. Never type your recovery words on any internet-connected device.</p>
        <p>If blackmailed, do not pay. Call 999 or report via the Dubai Police app.</p>

        <div className="warning-takeaway-box">
          <p>
            The hackers do not warn you. They just wait. Tonight, change your router password. Turn off auto-connect. Check your cloud album. Ten minutes.
          </p>
        </div>
      </div>

      
      <div className="cta-button-wrap">
        <button
          id="ctaMoreCryptoBtn"
          className="cta-btn"
          onClick={handleCtaClick}
          disabled={ctaLoading}
        >
          <span className={`btn-spinner ${ctaLoading ? "active" : ""}`} id="btnSpinner"></span>
          <span id="ctaBtnText">{ctaLoading ? "Loading..." : "More Crypto News"}</span>
        </button>
      </div>

            
      <section className="unread-section">
        <div className="unread-header">
          <div className="unread-icon">
            <span className="bar-black"></span>
            <span className="bar-red"></span>
          </div>
          <h2 className="unread-title">NEWS YOU HAVEN’T READ</h2>
        </div>

        <div className="unread-list">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/clanky/${art.slug}`}
              className="unread-card"
            >
              <div className="unread-thumb-wrap">
                <img src={art.img} alt={art.title} className="unread-thumb" />
              </div>
              <div className="unread-info">
                <h3 className="unread-headline">{art.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
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
          
          <a href="https://www.youtube.com/GulfNewsTV" target="_blank" rel="noopener" className="footer-social-btn" aria-label="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
            </svg>
          </a>
          
          <a href="https://whatsapp.com/channel/0029Va72kU8It5rt8E054U34" target="_blank" rel="noopener" className="footer-social-btn" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
            </svg>
          </a>
          
          <a href="https://t.me/gulfnews" target="_blank" rel="noopener" className="footer-social-btn" aria-label="Telegram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
            </svg>
          </a>
          
          <a href="https://www.linkedin.com/company/gulf-news" target="_blank" rel="noopener" className="footer-social-btn" aria-label="LinkedIn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.27 1.64 1.64 0 0 0 0 3.27m1.39 9.74v-8.37H5.07v8.37h2.78z"></path>
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

      {/* Toast Notification */}
      <div
        id="toastNotification"
        className={`toast ${toastMessage ? "show" : ""}`}
        role="alert"
        aria-live="polite"
      >
        {toastMessage || "Link copied to clipboard!"}
      </div>

      {/* Full-Screen Loading Overlay */}
      <div
        id="loadingOverlay"
        className={`loading-overlay ${loadingOverlayActive ? "active" : ""}`}
        aria-live="assertive"
      >
        <div className="loading-box">
          <div className="global-spinner"></div>
          <span className="loading-text">Loading...</span>
        </div>
      </div>
    </div>
  );
}
