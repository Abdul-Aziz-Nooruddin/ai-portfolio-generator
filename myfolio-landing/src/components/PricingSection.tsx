import { ArrowUpRight, Check, ShieldCheck, Sparkles, Zap, Lock, Code2, Globe } from 'lucide-react';
import '../pricing.css';

const SITE = '';

interface PlanFeature {
  text: string;
}

interface Plan {
  id: string;
  name: string;
  badge: string;
  featured?: boolean;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  ctaText: string;
  ctaHref: string;
  buttonClass: string;
}

const plans: Plan[] = [
  {
    id: 'preview',
    name: 'Free Evaluation',
    badge: 'No Card Required',
    price: '₹0',
    period: '/ 3 builds per week',
    description: 'Generate up to 3 separate portfolio builds every week to test designs and explore Web Studio.',
    features: [
      { text: '3 preview builds generated per week' },
      { text: 'Each build stays active for 24 hours' },
      { text: 'Interactive 3D WebGL preview on desktop & mobile' },
      { text: 'Jack 3D & Nadia Brand template exploration' },
      { text: 'Web Studio customization & live editing' },
      { text: 'No credit card or commitment required' },
    ],
    ctaText: 'Start free evaluation',
    ctaHref: `${SITE}/dashboard`,
    buttonClass: 'pricing-cta-outline',
  },
  {
    id: 'starter',
    name: 'Lifetime Build',
    badge: 'One-Time Payment',
    price: '₹149',
    period: '/ one-time (per build)',
    description: 'Pay once for your selected build. Hosted permanently on a Netlify address with full code export.',
    features: [
      { text: 'Valid for 1 specific generated portfolio build' },
      { text: 'Permanent lifetime Netlify hosting (e.g. your-site.netlify.app)' },
      { text: 'Full source code & asset export (ZIP download included)' },
      { text: 'Automatic GitHub sync (updates when your repos change)' },
      { text: 'All MyFolio watermarks completely removed' },
      { text: 'Pay individually only for the builds you want to keep' },
    ],
    ctaText: 'Get This Build (₹149)',
    ctaHref: `${SITE}/dashboard`,
    buttonClass: 'pricing-cta-solid',
  },
  {
    id: 'pro',
    name: 'Pro Domain',
    badge: 'Most Professional',
    featured: true,
    price: '₹149',
    period: '/ month (per build)',
    description: 'Your chosen build hosted on a clean, professional address (username.myfolio.tech) with continuous maintenance.',
    features: [
      { text: 'Branded professional domain: <username>.myfolio.tech' },
      { text: 'Maintained live address with automated SSL certificate' },
      { text: 'Full source code & asset export (ZIP download included)' },
      { text: 'Automatic GitHub sync (updates when your repos change)' },
      { text: 'All MyFolio watermarks completely removed' },
      { text: 'Unlimited studio rebuilds & edits for your active domain' },
    ],
    ctaText: 'Claim <username>.myfolio.tech',
    ctaHref: `${SITE}/dashboard`,
    buttonClass: 'pricing-cta-featured',
  },
];

export function PricingSection() {
  return (
    <section className="pricing-section section-pad" id="pricing" aria-labelledby="pricing-heading">
      <div className="section-label scroll-reveal">
        <span className="section-index">08 / PRICING & BUILDS</span>
        <span>Transparent pricing. Pay per build.</span>
      </div>

      <div className="pricing-heading-row scroll-reveal">
        <h2 className="section-title" id="pricing-heading">
          One small price.<br />A world of your own.
        </h2>
        <p>
          Start with free weekly builds to test your portfolio. When you’re ready to share, pay only for the build you love — with permanent Netlify hosting or a branded professional domain.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''}`}
            aria-labelledby={`plan-title-${plan.id}`}
          >
            <div className={`pricing-badge ${plan.featured ? 'pricing-badge-featured' : ''}`}>
              {plan.featured && <Sparkles size={12} aria-hidden="true" />}
              <span>{plan.badge}</span>
            </div>

            <div className="pricing-header">
              <h3 id={`plan-title-${plan.id}`}>{plan.name}</h3>
              <p className="pricing-desc">{plan.description}</p>
            </div>

            <div className="pricing-cost">
              <span className="pricing-price">{plan.price}</span>
              <span className="pricing-period">{plan.period}</span>
            </div>

            <ul className="pricing-features" aria-label={`Features included with ${plan.name}`}>
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <Check size={16} aria-hidden="true" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <a className={`pricing-cta-btn ${plan.buttonClass}`} href={plan.ctaHref}>
              <span>{plan.ctaText}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>

      {/* Domain Difference Clarification Callout */}
      <div className="pricing-difference-callout scroll-reveal">
        <div className="callout-icon" aria-hidden="true">
          <Globe size={24} />
        </div>
        <div className="callout-content">
          <h4>The Difference Between the ₹149 Plans</h4>
          <p>
            Both ₹149 plans include full source code download and live GitHub auto-updates for the purchased build. The only difference is the address: the one-time plan gives you a standard Netlify link (e.g. <code>your-site.netlify.app</code>), while the monthly plan maintains your clean, branded <code>&lt;username&gt;.myfolio.tech</code> domain with continuous SSL and domain routing.
          </p>
        </div>
      </div>

      {/* Purchase Protection & Trust Bar */}
      <div className="pricing-trust-bar scroll-reveal" aria-label="Purchase protections and guarantees">
        <div className="pricing-trust-item">
          <Code2 size={18} aria-hidden="true" />
          <span>100% Full Source Code & ZIP Export (Zero Lock-in)</span>
        </div>
        <div className="pricing-trust-item">
          <Zap size={18} aria-hidden="true" />
          <span>Automatic updates from GitHub activity</span>
        </div>
        <div className="pricing-trust-item">
          <Lock size={18} aria-hidden="true" />
          <span>Secure Razorpay checkout (UPI, Cards, NetBanking)</span>
        </div>
        <div className="pricing-trust-item">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>Pay only for the specific builds you want</span>
        </div>
      </div>
    </section>
  );
}
