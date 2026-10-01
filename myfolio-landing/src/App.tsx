import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  GitBranch,
  Globe2,
  Layers3,
  MousePointer2,
  Plus,
  Sparkles,
} from 'lucide-react';
import { useSpotlight } from './useSpotlight';
import { useGsapAnimations } from './useGsapAnimations';
import { AudienceSection, FeaturesSection, StudioSection } from './components/ProductSections';
import { ContactSection, PublishingSection, ResourcesSection } from './components/VisitorSections';
import { PricingSection } from './components/PricingSection';
import { FloatingSignupBar } from './components/FloatingSignupBar';

const SITE = '';
const GITHUB = 'https://github.com/Abdul-Aziz-Nooruddin/myfolio.tech';
const navigation = [
  { label: 'The idea', href: '#about', number: '01' },
  { label: 'Who it’s for', href: '#use-cases', number: '02' },
  { label: 'Features', href: '#features', number: '03' },
  { label: 'Templates', href: '#templates', number: '04' },
  { label: 'How it works', href: '#how-it-works', number: '05' },
  { label: 'Inside the studio', href: '#studio', number: '06' },
  { label: 'Preview & publishing', href: '#publishing', number: '07' },
  { label: 'Pricing & plans', href: '#pricing', number: '08' },
  { label: 'Guides & our story', href: '#resources', number: '09' },
  { label: 'Good questions', href: '#faq', number: '10' },
  { label: 'Let’s talk', href: '#contact', number: '11' },
];

const templates = [
  {
    name: 'Jack',
    category: 'Developers',
    description: 'An immersive, project-first home for software engineers and creative developers.',
    bestFor: 'Technical work, side projects, and interactive experiments.',
    includes: ['Projects and technical stack', 'Skills and career experience', 'Interactive 3D presentation'],
    tags: ['3D / Interactive', 'Developer portfolio'],
    image: '/images/template-jack.webp',
    alt: 'Jack portfolio preview with oversized silver typography and a three-dimensional character on a dark background',
    href: `${SITE}/jack-3d`,
    studio: `${SITE}/studio?template=jack-3d-creator`,
    className: 'template-jack',
  },
  {
    name: 'Nadia',
    category: 'Personal brands',
    description: 'An expressive editorial portfolio for people whose ideas and experience are the work.',
    bestFor: 'Speakers, advisors, writers, and independent professionals.',
    includes: ['Speaking and advisory work', 'Writing and professional story', 'Bold editorial presentation'],
    tags: ['Editorial / Bold', 'Personal brand'],
    image: '/images/template-nadia.webp',
    alt: 'Nadia portfolio preview with a portrait, expressive white typography, and coral accents',
    href: `${SITE}/nadia`,
    studio: `${SITE}/studio`,
    className: 'template-nadia',
  },
];

const questions = [
  {
    question: 'What is MyFolio, exactly?',
    answer: 'MyFolio turns your GitHub, projects, and career experience into a personal portfolio people can explore. Its AI analyzes your public work and helps bring it to life through distinctive templates, interactive visuals, and a web-based studio.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'No. Start with a template and use MyFolio’s Web Studio to make it your own. Your work is the starting point, so you can focus on telling your story instead of building a portfolio website from scratch.',
  },
  {
    question: 'How does the GitHub connection work?',
    answer: 'MyFolio analyzes your public repositories, languages, and commit activity to understand what you build. GitHub synchronization keeps the connected portfolio up to date as your work evolves. You stay in control of how your story is presented.',
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Yes. MyFolio supports custom domains with SSL-secured hosting. Connect your domain through the platform and follow its domain-verification instructions to put your portfolio at an address that’s yours.',
  },
  {
    question: 'Is it free to try?',
    answer: 'Yes. MyFolio offers a free, full-featured 24-hour preview with no credit card required. Build, personalize, and explore your portfolio before deciding what comes next. Visit the live platform for current publishing options.',
  },
  {
    question: 'What should I prepare before I start?',
    answer: 'Bring a short professional bio, your public GitHub handle if you have one, and two to four projects you are proud of. For each project, gather the problem, your specific contribution, the tools you used, and an honest outcome. Have your preferred contact details ready, and only include assets and client work you have permission to share.',
  },
  {
    question: 'Can I change the AI-generated content?',
    answer: 'Your generated portfolio is a starting point, not the final word on your career. Use Web Studio to personalize the content and presentation, then check project descriptions, dates, skills, links, and claims against your actual work before publishing. You should always be the final editor of your professional story.',
  },
  {
    question: 'Is MyFolio only for developers?',
    answer: 'GitHub-powered portfolios are designed around technical work, but the Nadia personal-brand template is built for speakers, advisors, and writers. Explore the live demos to decide which structure fits your work. Check the current input and editing options in Web Studio if your portfolio is not based on GitHub.',
  },
  {
    question: 'What happens after the 24-hour preview?',
    answer: 'You can generate up to 3 free evaluation builds every week. Each preview stays active for 24 hours. When you find a build you love, pay just ₹149 once for lifetime Netlify hosting, or ₹149/month for a branded <username>.myfolio.tech domain. Both include full source code download and live GitHub auto-updates.',
  },
  {
    question: 'Do I need to share private repositories?',
    answer: 'No. MyFolio only reads public repository metadata. You never need to share private code or secrets. You remain in complete control of which public projects, descriptions, and achievements appear in your portfolio.',
  },
  {
    question: 'Can I download and export the full source code for my portfolio?',
    answer: 'YES, 100%. Every paid build (both the ₹149 one-time Lifetime Build and the ₹149/month Pro Domain) includes full standalone source code and asset export in a clean ZIP package. There is zero platform lock-in. You own your code, HTML, CSS, React/JS, 3D WebGL assets, and styles completely, and can self-host anywhere (Netlify, Vercel, AWS, Cloudflare, GitHub Pages, or your own server).',
  },
  {
    question: 'How does MyFolio compare to other portfolio makers like Wix or Squarespace?',
    answer: 'Unlike generic website builders that lock you into recurring monthly fees without source code access, MyFolio is built specifically for developers. It connects directly to your GitHub to extract real repositories, renders interactive 3D WebGL presentations, auto-syncs when you push commits, and provides 100% full source code export with zero vendor lock-in at just ₹149.',
  },
  {
    question: 'Where can I get help or discuss a partnership?',
    answer: 'For product questions, account issues, and publishing help, contact support@myfolio.tech. For reaching Aziz, partnerships, bootcamps, and collaborations, use aziz@myfolio.tech. The contact section below can prepare an email draft, or you can reach out directly.',
  },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#home" aria-label="MyFolio home">
      <span className="brand-logo-wrap" aria-hidden="true">
        <picture>
          <source srcSet="/assets/logo-3d.webp" type="image/webp" />
          <img
            src="/assets/logo-3d.png"
            alt="MyFolio logo"
            className="brand-logo-img"
            width="34"
            height="34"
            loading="eager"
          />
        </picture>
      </span>
      <span aria-hidden="true">myfolio<span className="brand-period">.</span></span>
    </a>
  );
}

function PillLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <a className={`pill-button ${className}`} href={href}>
      <span className="pill-background" aria-hidden="true" />
      <span className="pill-label">{children}</span>
      <span className="pill-circle"><ArrowUpRight size={21} strokeWidth={1.8} aria-hidden="true" /></span>
    </a>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [filter, setFilter] = useState('All worlds');
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const heroRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useSpotlight(heroRef, artRef);
  useGsapAnimations();

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 64);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timeout = window.setTimeout(() => setShowSplash(false), reduceMotion.matches ? 0 : 1700);
    const elements = document.querySelectorAll<HTMLElement>('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    if (!reduceMotion.matches) {
      elements.forEach((element) => {
        element.classList.add('reveal-ready');
        observer.observe(element);
      });
    }

    const onMotionChange = () => {
      if (reduceMotion.matches) {
        setShowSplash(false);
        elements.forEach((element) => element.classList.add('is-visible'));
        observer.disconnect();
      }
    };
    reduceMotion.addEventListener('change', onMotionChange);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      reduceMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  // Aggressively purge third-party extension injected elements (e.g. Careerflow)
  useEffect(() => {
    const purgeInjected = () => {
      const targets = document.querySelectorAll(
        '[id*="careerflow" i], [class*="careerflow" i], [data-careerflow], careerflow-extension, img[alt*="Careerflow" i]'
      );
      targets.forEach((node) => {
        const container = node.closest('div[style*="fixed"], div[style*="absolute"], aside, section') || node;
        container.remove();
      });
    };

    purgeInjected();
    const domObserver = new MutationObserver(purgeInjected);
    domObserver.observe(document.body, { childList: true, subtree: true });
    return () => domObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    // Wait for the disclosure's visibility/inert styles to reach the browser before focusing.
    const focusFrame = requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLAnchorElement>('nav a')?.focus({ preventScroll: true });
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus({ preventScroll: true });
      }
    };
    const onOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !burgerRef.current?.contains(target)) setMenuOpen(false);
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !burgerRef.current?.contains(target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onOutsidePointer);
    document.addEventListener('focusin', onFocus);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onOutsidePointer);
      document.removeEventListener('focusin', onFocus);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const visibleTemplates = templates.filter((template) => filter === 'All worlds' || template.category === filter);
  const headline = 'Your work deserves more than a PDF. Build a portfolio that feels like you.';

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {showSplash && (
        <div className="splash" aria-hidden="true">
          {['top', 'bottom'].map((row) => (
            <div className={`splash-row splash-row-${row}`} key={row}>
              {Array.from({ length: 5 }, (_, i) => <div className="splash-box" key={i} style={{ '--i': i } as CSSProperties} />)}
            </div>
          ))}
        </div>
      )}

      <header className={`site-header${headerScrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-is-open' : ''}`}>
        <div className="logo-wrapper"><Brand /></div>
        <nav className="desktop-navigation" aria-label="Quick navigation">
          <a href="#features">Features</a>
          <a href="#templates">Templates</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#publishing">Preview & publishing</a>
        </nav>
        <div className="header-actions">
          <a className="studio-link" href={`${SITE}/studio`}>Open studio <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button
            className={`burger-button${menuOpen ? ' open' : ''}`}
            ref={burgerRef}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            type="button"
          >
            <span /><span />
          </button>
        </div>
        <div
          className={`menu-panel${menuOpen ? ' open' : ''}`}
          id="site-menu"
          ref={menuRef}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <span className="eyebrow menu-heading">Make yourself at home.</span>
          <nav aria-label="Main navigation">
            {navigation.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                <span>{link.label}</span><span className="menu-number">{link.number}</span>
              </a>
            ))}
          </nav>
          <div className="menu-bottom">
            <PillLink href={`${SITE}/dashboard`} className="pill-small">Build my portfolio</PillLink>
            <div className="menu-secondary">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a href={`${SITE}/dashboard`}>Sign in <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" ref={heroRef} aria-labelledby="hero-heading">
          <div className="hero-wordmark" aria-hidden="true">Myfolio.</div>
          <div className={`hero-art${revealed ? ' reveal-all' : ''}`} ref={artRef} aria-hidden="true">
            <img className="hero-base" src="/images/hero-base.webp" width="2560" height="1447" alt="" fetchPriority="high" />
            <img className="hero-reveal" src="/images/hero-reveal.webp" width="1536" height="868" alt="" />
          </div>

          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span className="status-dot" /> Not another ordinary portfolio.</p>
            <h1 id="hero-heading" className="hero-headline" aria-label={headline}>
              {headline.split(' ').map((word, i) => (
                <span className="word-reveal" key={`${word}-${i}`} aria-hidden="true" style={{ animationDelay: `${1 + i * 0.045}s` }}>{word} </span>
              ))}
            </h1>
            <div className="hero-cta">
              <PillLink href={`${SITE}/dashboard`}>Build my portfolio</PillLink>
              <p className="hero-caption">Free 24-hour preview. No credit card.</p>
            </div>
          </div>

          <div className="hero-side-note" aria-hidden="true"><span>CODE INTO CHARACTER</span><span className="small-cross">+</span><span>MADE TO BE EXPLORED</span></div>
          <div className="hero-bottom">
            <a href="#about" className="explore-link" aria-label="Scroll to explore MyFolio"><span className="outline-circle"><ArrowDown size={18} aria-hidden="true" /></span><span>Scroll to explore<br /><span className="scroll-caption">There’s a whole world below.</span></span></a>
            <button
              className={`reveal-toggle${revealed ? ' active' : ''}`}
              onClick={() => setRevealed((value) => !value)}
              aria-pressed={revealed}
              type="button"
            >
              <MousePointer2 size={15} aria-hidden="true" />
              <span>{revealed ? 'Back to the original' : 'Reveal another side'}</span>
              <span className="reveal-toggle-dot" aria-hidden="true" />
            </button>
          </div>
        </section>

        <div className="identity-strip" aria-label="Built for developers, designers, and independent thinkers">
          <span className="eyebrow">For the beautifully unordinary.</span>
          <div><span><Code2 size={18} aria-hidden="true" /> Developers</span><span><Layers3 size={18} aria-hidden="true" /> Designers</span><span><Sparkles size={18} aria-hidden="true" /> Independent thinkers</span></div>
        </div>

        <section className="about-section section-pad" id="about" aria-labelledby="about-heading">
          <div className="section-label scroll-reveal"><span className="section-index">01 / THE IDEA</span><span>More you. Less template.</span></div>
          <div className="about-grid">
            <h2 className="section-title scroll-reveal" id="about-heading">You’re not<br />a bullet point<span className="blue-period">.</span></h2>
            <div className="about-copy scroll-reveal">
              <p className="large-copy">So why should your<br className="hidden sm:block" /> portfolio look like one?</p>
              <p>MyFolio is an AI-assisted portfolio builder that brings your public GitHub work, projects, and professional experience into one personal website. Instead of asking someone to piece your story together across tabs, give them one place to understand what you do.</p>
              <p>Start with a distinctive design, personalize it in Web Studio, and review how your story looks on desktop and mobile. Your portfolio can connect the dots between a project, the skills behind it, and the person who made it happen.</p>
              <p>For a recruiter, that means context. For a potential client, clarity. For you, a professional home that can grow alongside your work—not another document to start from scratch.</p>
              <a className="text-link" href="#how-it-works">Meet your next portfolio <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="benefit-row scroll-reveal">
            <span><GitBranch size={19} aria-hidden="true" /> Powered by your real work</span>
            <span><Sparkles size={19} aria-hidden="true" /> Made personal with AI</span>
            <span><Globe2 size={19} aria-hidden="true" /> Yours to put out into the world</span>
          </div>
        </section>

        <AudienceSection />
        <FeaturesSection />

        <section className="templates-section section-pad" id="templates" aria-labelledby="templates-heading">
          <div className="section-label scroll-reveal"><span className="section-index">04 / PICK YOUR WORLD</span><span>A starting point. Not a box.</span></div>
          <div className="section-heading-row scroll-reveal">
            <h2 className="section-title" id="templates-heading">Different by design.</h2>
            <p>Start with a little inspiration.<br />Make the rest your own.</p>
          </div>
          <div className="template-toolbar">
            <div className="template-filters" role="group" aria-label="Filter templates">
              {['All worlds', 'Developers', 'Personal brands'].map((category) => (
                <button className={filter === category ? 'selected' : ''} key={category} onClick={() => setFilter(category)} aria-pressed={filter === category} type="button">{category}</button>
              ))}
            </div>
            <span className="template-count" role="status">{String(visibleTemplates.length).padStart(2, '0')} {visibleTemplates.length === 1 ? 'WORLD' : 'WORLDS'} TO EXPLORE</span>
          </div>
          <div className="templates-grid">
            {visibleTemplates.map((template) => (
              <article className={`template-card ${template.className}`} key={template.name}>
                <a className="template-preview" href={template.href} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${template.name} live demo (opens in a new tab)`}>
                  <div className="preview-browser">
                    <div className="browser-top"><span /><span /><span /><span className="browser-address">yourname.myfolio.tech</span><ArrowUpRight size={12} aria-hidden="true" /></div>
                    <img src={template.image} alt={template.alt} width="1440" height="1050" loading="lazy" />
                  </div>
                  <span className="preview-open"><ArrowUpRight size={22} aria-hidden="true" /><span>Explore live</span></span>
                </a>
                <div className="template-info">
                  <div><h3>{template.name}<span> / {template.category}</span></h3><p>{template.description}</p></div>
                  <a className="template-use" href={template.studio} aria-label={`Customize ${template.name} in MyFolio Studio`}><ArrowUpRight size={23} aria-hidden="true" /></a>
                </div>
                <p className="template-best-for"><strong>Best for:</strong> {template.bestFor}</p>
                <ul className="template-includes">{template.includes.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul>
                <div className="template-tags">{template.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="template-actions">
                  <a href={template.href} target="_blank" rel="noopener noreferrer">View live demo <ArrowUpRight size={16} aria-hidden="true" /></a>
                  <a href={template.studio}>Customize in studio <ArrowRight size={16} aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
          <p className="template-footnote">Not just a pretty face. Every world is responsive, customizable, and ready for your story. <a href={`${SITE}/studio`}>Open the studio <ArrowUpRight size={14} aria-hidden="true" /></a></p>
        </section>

        <section className="process-section section-pad" id="how-it-works" aria-labelledby="process-heading">
          <div className="section-label scroll-reveal"><span className="section-index">05 / LESS SETUP, MORE YOU</span><span>A small process. A big difference.</span></div>
          <div className="process-grid">
            <div className="process-copy">
              <h2 className="section-title scroll-reveal" id="process-heading">From “I should”<br />to “it’s live.”</h2>
              <p className="process-intro scroll-reveal">You don’t need a finished website to get started. Bring the ingredients of your professional story; MyFolio helps turn them into a portfolio you can review, refine, and share.</p>
              <ol className="process-steps">
                <li className="scroll-reveal"><span className="step-number">01</span><div><h3>Bring your work.</h3><p>Start on the live MyFolio platform with your public GitHub handle, relevant projects, and career experience. Add a résumé or supporting details where the setup flow asks for them.</p></div><GitBranch size={23} aria-hidden="true" /></li>
                <li className="scroll-reveal"><span className="step-number">02</span><div><h3>Make it feel like you.</h3><p>Choose a design that suits your work and personalize it in Web Studio. Edit your introduction, select the projects that matter, and verify the generated descriptions against your actual contribution.</p></div><Layers3 size={23} aria-hidden="true" /></li>
                <li className="scroll-reveal"><span className="step-number">03</span><div><h3>Put yourself out there.</h3><p>Test your links and mobile layout during the free preview. When you’re ready, review the available publishing options, connect your domain if needed, and share your portfolio with the right people.</p></div><Globe2 size={23} aria-hidden="true" /></li>
              </ol>
            </div>
            <div className="process-visual scroll-reveal">
              <div className="visual-top"><span className="eyebrow">A LITTLE INPUT. A LOT OF YOU.</span><Plus size={20} aria-hidden="true" /></div>
              <div className="input-chips"><span><GitBranch size={16} aria-hidden="true" /> Your GitHub</span><span><Code2 size={16} aria-hidden="true" /> Your projects</span><span><Sparkles size={16} aria-hidden="true" /> Your story</span></div>
              <div className="flow-line" aria-hidden="true"><i /><i /><i /></div>
              <div className="world-window">
                <div className="world-window-bar"><span /><span /><span /><span className="world-address">a world of your own</span><Check size={13} aria-hidden="true" /></div>
                <div className="world-window-art"><span aria-hidden="true">Hello,<br />world.</span><img src="/images/hero-base.webp" alt="Blue voxel character in a personalized portfolio" loading="lazy" width="2560" height="1447" /></div>
                <div className="world-window-bottom"><span><span className="status-dot" /> UNMISTAKABLY YOU.</span><ArrowUpRight size={19} aria-hidden="true" /></div>
              </div>
              <div className="visual-bottom"><span>Less building a website.<br />More building what’s next.</span><span className="visual-asterisk" aria-hidden="true">✳</span></div>
            </div>
          </div>
          <div className="process-footer"><p>No blank canvas anxiety. No starting from zero.</p><PillLink href={`${SITE}/dashboard`} className="pill-small">Let’s make it yours</PillLink></div>
        </section>

        <StudioSection />
        <PublishingSection />
        <PricingSection />
        <ResourcesSection />

        <section className="faq-section section-pad" id="faq" aria-labelledby="faq-heading">
          <div className="faq-heading scroll-reveal">
            <span className="section-index">10 / A LITTLE CLARITY</span>
            <h2 className="section-title" id="faq-heading">Good<br />questions.</h2>
            <p>Curiosity looks good on you.<br />Here are a few things worth knowing.</p>
            <a className="text-link" href={`${SITE}/contact`}>Ask us something else <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <div className="faq-list scroll-reveal">
            {questions.map((item, index) => (
              <div className={`faq-item${openQuestion === index ? ' expanded' : ''}`} key={item.question}>
                <h3><button onClick={() => setOpenQuestion(openQuestion === index ? null : index)} aria-expanded={openQuestion === index} aria-controls={`answer-${index}`} id={`question-${index}`} type="button"><span className="faq-number">{String(index + 1).padStart(2, '0')}</span><span>{item.question}</span><Plus size={19} aria-hidden="true" /></button></h3>
                <div className="faq-answer" id={`answer-${index}`} role="region" aria-labelledby={`question-${index}`} hidden={openQuestion !== index}><p>{item.answer}</p></div>
              </div>
            ))}
          </div>
        </section>

        <ContactSection />

        <section className="closing-section section-pad" aria-labelledby="closing-heading">
          <div className="closing-top"><span className="eyebrow"><span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE.</span><span className="closing-star" aria-hidden="true">✳</span></div>
          <h2 className="closing-title scroll-reveal" id="closing-heading">You did the work.<br />Let the world <span>see it.</span></h2>
          <div className="closing-bottom"><p>Not just another link.<br />A little world with your name on it.</p><div><PillLink href={`${SITE}/dashboard`}>Build my portfolio</PillLink><p className="closing-caption">Try it for 24 hours. On us.</p></div></div>
        </section>
      </main>

      <footer className="site-footer section-pad">
        <div className="footer-top"><Brand footer /><p>Built for people who build things.<br />Made with a little imagination.</p><a className="back-to-top" href="#home">Back to top <span><ArrowUpRight size={21} aria-hidden="true" /></span></a></div>
        <div className="footer-directory">
          <div><h3>Product</h3><nav aria-label="Product links"><a href="#features">Features</a><a href="#templates">Templates</a><a href="#pricing">Pricing & plans</a><a href="#studio">Inside Web Studio</a><a href="#publishing">Preview & publishing</a></nav></div>
          <div><h3>Explore</h3><nav aria-label="Explore links"><a href="#use-cases">Who it’s for</a><a href="#how-it-works">How it works</a><a href={`${SITE}/jack-3d`}>Jack live demo</a><a href={`${SITE}/nadia`}>Nadia live demo</a></nav></div>
          <div><h3>Resources</h3><nav aria-label="Resource links"><a href="#resources">Portfolio guides</a><a href="#faq">Frequently asked questions</a><a href={GITHUB} target="_blank" rel="noopener noreferrer">Source on GitHub <ArrowUpRight size={13} aria-hidden="true" /></a><a href={`${SITE}/dashboard`}>Your dashboard</a></nav></div>
          <div><h3>Company & support</h3><nav aria-label="Company links"><a href={`${SITE}/about`}>Our story</a><a href="#contact">Contact & partnerships</a><a href="mailto:support@myfolio.tech">support@myfolio.tech</a><a href={`${SITE}/privacy`}>Privacy policy</a><a href={`${SITE}/terms`}>Terms of service</a></nav></div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">Your work. Your world.</div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} MyFolio. A world of possibility.</span><span>By <a href="https://github.com/Abdul-Aziz-Nooruddin" target="_blank" rel="noopener noreferrer">Abdul Aziz Nooruddin <ArrowRight size={12} aria-hidden="true" /></a></span><div><a href={`${SITE}/privacy`}>Privacy</a><a href={`${SITE}/terms`}>Terms</a></div></div>
      </footer>
      <FloatingSignupBar />
    </>
  );
}
