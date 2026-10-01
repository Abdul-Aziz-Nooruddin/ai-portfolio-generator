import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, GitBranch, Globe2, Mail, Plus } from 'lucide-react';
import '../visitor-sections.css';

const SITE = '';
const SUPPORT_EMAIL = 'support@myfolio.tech';
const AZIZ_EMAIL = 'aziz@myfolio.tech';

export function PublishingSection() {
  return (
    <section className="visitor-section publishing-section section-pad" id="publishing" aria-labelledby="publishing-heading">
      <div className="section-label scroll-reveal">
        <span className="section-index">07 / PREVIEW & PUBLISH</span>
        <span>Try it. Then take it further.</span>
      </div>
      <div className="visitor-heading-row scroll-reveal">
        <h2 className="section-title" id="publishing-heading">Make sure it’s you.<br />Then make it live.</h2>
        <p>A proper test drive, not a leap of faith. Explore your portfolio first, then choose how to put it out into the world.</p>
      </div>

      <div className="publishing-grid">
        <article className="publishing-preview scroll-reveal" aria-labelledby="preview-heading">
          <div className="publishing-card-top"><span className="visitor-kicker">A little room to explore</span><Globe2 size={24} aria-hidden="true" /></div>
          <p className="publishing-duration" aria-hidden="true">24<span>hours</span></p>
          <h3 id="preview-heading">Your free 24-hour preview.</h3>
          <p>No credit card required. Build, personalize, and inspect a full-featured live preview before deciding on paid publishing.</p>
          <ul className="visitor-checklist">
            <li><Check size={18} aria-hidden="true" /><span>Compare templates and see which one suits your work.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Try your copy, colors, and project order in Web Studio.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Check the experience on your phone and desktop, including project and contact links.</span></li>
          </ul>
          <a className="visitor-button" href={`${SITE}/dashboard`}>Start my 24-hour preview <ArrowUpRight size={19} aria-hidden="true" /></a>
          <p className="publishing-note">A time-limited preview, not an ongoing free hosting plan.</p>
        </article>

        <div className="publishing-next scroll-reveal">
          <span className="visitor-kicker">When you’re ready</span>
          <h3>A clear path to your own address.</h3>
          <ol className="publishing-steps">
            <li><span aria-hidden="true">01</span><div><h4>Give the story a human check.</h4><p>Read every generated description. Confirm your role, dates, skills, and results against the actual work. AI can help with the first draft; the final accuracy check is yours.</p></div></li>
            <li><span aria-hidden="true">02</span><div><h4>Review the live publishing options.</h4><p>Current paid publishing terms and prices are available on the live platform dashboard. Check what’s included and the applicable terms before choosing how to publish beyond the preview.</p><a className="text-link" href={`${SITE}/dashboard`}>View publishing in the dashboard <ArrowUpRight size={17} aria-hidden="true" /></a></div></li>
            <li><span aria-hidden="true">03</span><div><h4>Connect, verify, and share.</h4><p>For a custom domain, follow the platform’s DNS and domain-verification instructions. Confirm verification and SSL are active, then open your HTTPS address and test its links before sharing it.</p></div></li>
          </ol>
        </div>
      </div>

      <div className="publishing-footnotes">
        <article><GitBranch size={22} aria-hidden="true" /><h3>Your work keeps moving.</h3><p>GitHub synchronization can bring repository updates into your connected portfolio. After important changes, check the published view and make sure the project story still reflects your contribution.</p></article>
        <article><Copy size={22} aria-hidden="true" /><h3>A copy you can take with you.</h3><p>The official About page lists offline ZIP export. Review that option in the platform if you want a local copy; check the exported files before planning your own hosting.</p><a className="text-link" href={`${SITE}/about`}>Read about ZIP export <ArrowUpRight size={16} aria-hidden="true" /></a></article>
        <article><Globe2 size={22} aria-hidden="true" /><h3>Public work. Thoughtful sharing.</h3><p>MyFolio’s About page says it reads public GitHub metadata. You don’t need to submit private code. Keep secrets and confidential client details out of your portfolio and review what you make public.</p><div className="visitor-policy-links"><a href={`${SITE}/privacy`}>Privacy policy</a><a href={`${SITE}/terms`}>Terms of service</a></div></article>
      </div>
    </section>
  );
}

const guides = [
  {
    number: '01',
    title: 'Choose projects that say something.',
    description: 'A smaller, stronger selection beats a wall of repositories.',
    points: [
      'Start with the role or kind of work you want next. Select two to four projects that demonstrate relevant skills and different kinds of decisions.',
      'For each project, include the problem, a useful screenshot or demo, and a working repository link when the code is public. Say if a demo needs an account.',
      'Be clear about status: shipped, maintained, experiment, or archived. A thoughtful side project is useful evidence without pretending it is a production product.',
      'Only share work you have permission to show. For private work, use an approved high-level summary rather than code, internal screenshots, or client data.',
    ],
    takeaway: 'Try this: if someone opens only one project, which one best explains the work you want to do?',
  },
  {
    number: '02',
    title: 'Explain your role. Show the difference.',
    description: 'Give the reader context, not just a list of technologies.',
    points: [
      'Open with who had the problem and why it mattered. Then state your own responsibility, especially when the project was a team effort.',
      'Describe a decision you made, the alternatives you considered, and the trade-off. Link to a public pull request, design note, or demo when it helps.',
      'Use measured outcomes only when you can support them. Include a baseline and timeframe; never turn a guess into a percentage.',
      'No metrics yet? Explain what now works, what you learned, and what you would change next. Credit teammates and distinguish your contribution from the team’s result.',
    ],
    takeaway: 'A useful structure: problem → my contribution → decision → evidence → what I learned.',
  },
  {
    number: '03',
    title: 'Do one last pass before you publish.',
    description: 'Treat your portfolio like a product someone is about to use.',
    points: [
      'Read the generated copy line by line. Confirm names, dates, skills, project status, and claims. Remove anything you cannot stand behind.',
      'Open every demo, repository, résumé, and contact link. Use a signed-out browser to catch private links or permissions that a visitor will not have.',
      'Check a narrow mobile screen and a desktop. Tab through navigation and controls, check readable contrast, and add meaningful image descriptions where supported.',
      'Review current publishing terms in the dashboard. For your own domain, finish verification, check SSL, and test the final HTTPS address before sharing it.',
      'After a GitHub update, revisit the published portfolio. Keep a local ZIP export if useful, and check what is included before relying on that copy.',
    ],
    takeaway: 'The final test: ask someone unfamiliar with your work to find your best project and a way to contact you.',
  },
];

export function ResourcesSection() {
  return (
    <section className="visitor-section resources-section section-pad" id="resources" aria-labelledby="resources-heading">
      <div className="section-label scroll-reveal"><span className="section-index">09 / A LITTLE GUIDANCE</span><span>Less guesswork. More good work.</span></div>
      <div className="visitor-heading-row scroll-reveal">
        <h2 className="section-title" id="resources-heading">Make the work<br />easy to understand.</h2>
        <p>A few practical notes for choosing what to show, telling the truth well, and sharing a portfolio that’s ready to be explored.</p>
      </div>
      <div className="resources-grid">
        <div className="resource-guides">
          {guides.map((guide) => (
            <details className="resource-guide" key={guide.number}>
              <summary><span className="resource-number" aria-hidden="true">{guide.number}</span><span className="resource-summary-copy"><span className="resource-guide-title">{guide.title}</span><span className="resource-guide-description">{guide.description}</span></span><Plus size={21} aria-hidden="true" /></summary>
              <div className="resource-guide-content"><ul>{guide.points.map((point) => <li key={point}>{point}</li>)}</ul><p className="resource-takeaway">{guide.takeaway}</p></div>
            </details>
          ))}
        </div>
        <aside className="resource-mission" aria-labelledby="mission-heading">
          <div className="publishing-card-top"><span className="visitor-kicker">Why MyFolio exists</span><span className="resource-star" aria-hidden="true">✳</span></div>
          <h3 id="mission-heading">Good work shouldn’t<br />get lost in the telling.</h3>
          <p>There’s a gap between doing meaningful work and presenting it clearly. MyFolio’s mission is to help close that gap, so a developer’s projects are easier to explore and understand.</p>
          <p>Built by Abdul Aziz Nooruddin. The goal is a better stage for your work—not a substitute for the work itself, and not a promise of a job.</p>
          <div className="resource-mission-links"><a className="text-link" href={`${SITE}/about`}>Read the mission <ArrowUpRight size={17} aria-hidden="true" /></a><a className="text-link" href="https://github.com/Abdul-Aziz-Nooruddin">Meet the founder on GitHub <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        </aside>
      </div>
    </section>
  );
}

const inquiryTopics = [
  { value: 'support', label: 'Technical support', email: SUPPORT_EMAIL },
  { value: 'billing', label: 'Billing / publishing', email: SUPPORT_EMAIL },
  { value: 'feature', label: 'Feature request', email: SUPPORT_EMAIL },
  { value: 'partnership', label: 'Partnership / press / founder', email: AZIZ_EMAIL },
  { value: 'feedback', label: 'General feedback', email: SUPPORT_EMAIL },
  { value: 'other', label: 'Other', email: SUPPORT_EMAIL },
];

function prepareInquiry(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const topic = inquiryTopics.find((item) => item.value === data.get('topic'));

  for (const fieldName of ['name', 'message']) {
    const field = form.elements.namedItem(fieldName);
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      field.setCustomValidity(field.value.trim() ? '' : `Please enter your ${fieldName}.`);
    }
  }
  if (!form.reportValidity() || !topic) return null;

  const subject = `MyFolio inquiry: ${topic.label}`;
  const body = `Name: ${name}\r\nReply email: ${email}\r\nTopic: ${topic.label}\r\n\r\n${message}`;
  return {
    recipient: topic.email,
    mailto: `mailto:${topic.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    text: `To: ${topic.email}\nSubject: ${subject}\n\n${body}`,
  };
}

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState('');
  const [draftText, setDraftText] = useState('');
  const [copying, setCopying] = useState(false);
  const recipient = inquiryTopics.find((item) => item.value === topic)?.email ?? SUPPORT_EMAIL;

  function openEmailDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('');
    const draft = prepareInquiry(event.currentTarget);
    if (!draft) return;
    setDraftText(draft.text);
    try {
      window.location.href = draft.mailto;
      setStatus('Email draft requested. Nothing has been sent from this page. Review and send it in your email app. If nothing opens, use Copy inquiry or the live contact page.');
    } catch {
      setStatus('Your email app could not be opened. Nothing has been sent. Use Copy inquiry or the live contact page instead.');
    }
  }

  async function copyInquiry() {
    if (!formRef.current) return;
    setStatus('');
    const draft = prepareInquiry(formRef.current);
    if (!draft) return;
    setDraftText(draft.text);
    setCopying(true);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(draft.text);
      setStatus(`Inquiry copied. Paste it into an email to ${draft.recipient}, review it, and send it yourself. Nothing has been sent from this page.`);
    } catch {
      setStatus('Clipboard access is unavailable. Open “Review or manually copy your draft” below to select and copy the text, or use the live contact page. Nothing has been sent.');
    } finally {
      setCopying(false);
    }
  }

  return (
    <section className="visitor-section contact-section section-pad" id="contact" aria-labelledby="contact-heading">
      <div className="section-label scroll-reveal"><span className="section-index">11 / LET’S TALK</span><span>A question is a good place to start.</span></div>
      <div className="contact-grid">
        <div className="contact-copy scroll-reveal">
          <h2 className="section-title" id="contact-heading">A little help.<br />A new idea.<br />Say hello.</h2>
          <p className="visitor-intro">Stuck on your portfolio? Thinking about a collaboration? Pick the right conversation and we’ll help you get it started.</p>
          <div className="contact-channels">
            <article><span className="visitor-kicker">Support & product questions</span><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}<ArrowUpRight size={18} aria-hidden="true" /></a><p>Portfolio setup, domain questions, publishing, and feedback.</p></article>
            <article><span className="visitor-kicker">Founder, partnerships & press</span><a href={`mailto:${AZIZ_EMAIL}`}>{AZIZ_EMAIL}<ArrowUpRight size={18} aria-hidden="true" /></a><p>Direct contact with Aziz, collaborations, universities, and press inquiries.</p></article>
          </div>
          <a className="text-link" href={`${SITE}/contact`}>Prefer the live contact page? <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>

        <form className="contact-form" ref={formRef} onSubmit={openEmailDraft} onChange={() => { setStatus(''); setDraftText(''); }} onInvalid={() => setStatus('')} aria-labelledby="inquiry-heading" aria-describedby="inquiry-help">
          <div className="publishing-card-top"><h3 id="inquiry-heading">Start a conversation.</h3><Mail size={23} aria-hidden="true" /></div>
          <p id="inquiry-help">All fields are required. This form opens your email app with a draft; it does not send a message. You’ll review and send it there.</p>
          <div className="contact-field-row">
            <div className="contact-field"><label htmlFor="inquiry-name">Your name</label><input id="inquiry-name" name="name" autoComplete="name" required maxLength={100} onInput={(event) => event.currentTarget.setCustomValidity('')} /></div>
            <div className="contact-field"><label htmlFor="inquiry-email">Email address</label><input id="inquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
          </div>
          <div className="contact-field"><label htmlFor="inquiry-topic">What’s it about?</label><select id="inquiry-topic" name="topic" required value={topic} onChange={(event) => setTopic(event.target.value)}><option value="" disabled>Select a topic</option>{inquiryTopics.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
          <div className="contact-field"><label htmlFor="inquiry-message">Your message</label><textarea id="inquiry-message" name="message" rows={5} required maxLength={3000} aria-describedby="inquiry-message-help" onInput={(event) => event.currentTarget.setCustomValidity('')} /><p className="contact-field-help" id="inquiry-message-help">A little context goes a long way. Don’t include passwords, private code, or payment details. Up to 3,000 characters.</p></div>
          <p className="contact-recipient">Draft goes to <a href={`mailto:${recipient}`}>{recipient}</a>.</p>
          <div className="contact-actions"><button className="visitor-button" type="submit">Open email draft <ArrowUpRight size={19} aria-hidden="true" /></button><button className="contact-copy-button" type="button" disabled={copying} onClick={copyInquiry}><Copy size={16} aria-hidden="true" />{copying ? 'Copying…' : 'Copy inquiry'}</button></div>
          <p className="contact-status" role="status" aria-live="polite" aria-atomic="true">{status}</p>
          {draftText && <details className="contact-draft"><summary>Review or manually copy your draft</summary><label htmlFor="inquiry-draft">Your prepared email (not sent)</label><textarea id="inquiry-draft" readOnly value={draftText} rows={8} onFocus={(event) => event.currentTarget.select()} /></details>}
          <p className="contact-policy">Before sharing personal information, review the <a href={`${SITE}/privacy`}>privacy policy</a>. No email app configured? Use the <a href={`${SITE}/contact`}>live contact page</a>.</p>
        </form>
      </div>
    </section>
  );
}
