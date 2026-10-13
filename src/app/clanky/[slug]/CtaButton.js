"use client";

import { useState } from "react";

export default function CtaButton() {
  const [loading, setLoading] = useState(false);

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      window.location.href = "https://www.coindesk.com/tag/dubai";
    }, 5000);
  };

  return (
    <>
      <div className="cta-button-wrap">
        <button
          id="ctaMoreCryptoBtn"
          className="cta-btn"
          onClick={handleCtaClick}
          disabled={loading}
        >
          <span className={`btn-spinner ${loading ? "active" : ""}`} id="btnSpinner"></span>
          <span id="ctaBtnText">{loading ? "Loading..." : "More Crypto News"}</span>
        </button>
      </div>

      {loading && (
        <div className="loading-overlay active" aria-live="assertive">
          <div className="loading-box">
            <div className="global-spinner"></div>
            <span className="loading-text">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
