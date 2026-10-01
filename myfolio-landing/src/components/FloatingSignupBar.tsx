import { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { gsap } from 'gsap';

export function FloatingSignupBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      // Show once user scrolls past 380px (past hero)
      if (window.scrollY > 380) {
        if (!visible) setVisible(true);
      } else {
        if (visible) setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible, dismissed]);

  useEffect(() => {
    const el = document.getElementById('floating-signup-bar');
    if (!el) return;

    if (visible && !dismissed) {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.45,
        ease: 'power3.out',
      });
    } else {
      gsap.to(el, {
        y: 60,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [visible, dismissed]);

  if (dismissed) return null;

  return (
    <aside
      id="floating-signup-bar"
      aria-label="Quick registration prompt"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%) translateY(60px)',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 9990,
        maxWidth: '92vw',
        width: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(23, 24, 23, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '999px',
          padding: '8px 10px 8px 18px',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4), 0 0 0 1px rgba(117,197,222,0.18)',
          color: '#f4f1e8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'rgba(117, 197, 222, 0.2)',
              color: '#75C5DE',
            }}
          >
            <Sparkles size={12} />
          </span>
          <span style={{ letterSpacing: '-0.01em' }}>
            <strong style={{ color: '#ffffff' }}>Free Evaluation:</strong> 3 builds / week (24h preview)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#75C5DE',
              color: '#08171c',
              padding: '7px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 10px rgba(117, 197, 222, 0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#8fe0fa';
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#75C5DE';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <span>Start Free Build</span>
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>

          <a
            href="#pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#f4f1e8',
              padding: '7px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
          >
            <span>Pricing (₹149)</span>
          </a>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss quick signup bar"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(244, 241, 232, 0.5)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '2px',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244, 241, 232, 0.5)')}
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
