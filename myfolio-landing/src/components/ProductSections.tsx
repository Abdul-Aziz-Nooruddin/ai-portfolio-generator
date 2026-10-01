import { useState } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  FileText,
  GitBranch,
  Globe2,
  GraduationCap,
  Layers3,
  Palette,
  PanelsTopLeft,
  Sparkles,
} from 'lucide-react';
import '../product-sections.css';

const SITE = '';

const audiences = [
  {
    id: 'developer',
    label: 'Developer',
    icon: Code2,
    title: 'Show the thinking behind the build.',
    description: 'A repository shows your code. A portfolio can explain the problem, the trade-offs, and the part you played. Connect your public GitHub work, then give a few carefully chosen projects the context a reviewer needs.',
    story: 'Lead with a project you can talk through: what you built, why you chose that approach, and what you would improve next.',
    checklist: [
      ['Your public GitHub profile', 'Start with repositories that represent the work you want to do next. Check their READMEs and public links.'],
      ['Two or three project stories', 'Explain the problem, your contribution, the stack, and the outcome. Add a working demo or repository link.'],
      ['Experience with context', 'Include roles, open-source contributions, or team projects. Make your own responsibilities clear.'],
      ['A useful introduction', 'Describe your interests and the opportunities you are looking for, with a way to get in touch.'],
    ],
    recommendation: 'Jack pairs a developer-focused layout with an expressive, interactive presentation.',
    linkLabel: 'Explore the Jack template',
    href: `${SITE}/jack-3d`,
  },
  {
    id: 'designer',
    label: 'Designer',
    icon: Palette,
    title: 'Put your process next to the pixels.',
    description: 'The finished screen is only part of the story. Bring projects that explain your brief, your decisions, and how the work evolved. A visual portfolio gives your process and your point of view room to sit together.',
    story: 'Start with one strong case study: the challenge, a key design decision, and the finished work. Credit collaborators and be precise about your role.',
    checklist: [
      ['Selected case studies', 'Choose a small set of relevant projects, with a clear brief and your responsibilities on each.'],
      ['Visuals with a purpose', 'Gather final designs and a few process images you have permission to share. Explain what each one demonstrates.'],
      ['Decisions and outcomes', 'Describe constraints, research, and iterations. Include results only when you can support them.'],
      ['Your creative perspective', 'Add a short bio, your disciplines, and contact details or links to more of your work.'],
    ],
    recommendation: 'Nadia offers a bold, editorial starting point for a personality-led presentation.',
    linkLabel: 'Explore the Nadia template',
    href: `${SITE}/nadia`,
  },
  {
    id: 'independent',
    label: 'Independent professional',
    icon: BriefcaseBusiness,
    title: 'Make your expertise easy to understand.',
    description: 'Give a prospective client more than a job title. Bring together the problems you help with, relevant project experience, and a clear description of how you work. Your portfolio can make that first conversation more informed.',
    story: 'Organize your story around the work you want to be hired for, rather than every assignment you have ever completed.',
    checklist: [
      ['A focused introduction', 'Explain who you help and the kind of work you take on, in language a first-time visitor can understand.'],
      ['Relevant project examples', 'Describe the brief, your approach, and the deliverable. Respect client confidentiality and sharing permissions.'],
      ['Experience that supports it', 'Add roles, specialist knowledge, and public work that demonstrate your expertise without overstating results.'],
      ['A clear next step', 'Include your preferred contact link and what a potential collaborator should tell you when reaching out.'],
    ],
    recommendation: 'Try Nadia for a personal-brand direction, then use Web Studio to shape your own introduction and project story.',
    linkLabel: 'Find your starting point in Studio',
    href: `${SITE}/studio`,
  },
  {
    id: 'early-career',
    label: 'Early career',
    icon: GraduationCap,
    title: 'You do not need years to have a story.',
    description: 'Coursework, personal experiments, volunteering, and collaborative projects can all show how you think. Start with what you have actually made and learned; you do not need to turn a small project into an inflated achievement.',
    story: 'Choose one finished project over a long list of skills. Explain your contribution, what challenged you, and what you learned.',
    checklist: [
      ['A direction, not a perfect title', 'Introduce what you are learning and the roles or opportunities you would like to explore.'],
      ['Projects you can explain', 'Include coursework, personal builds, or volunteer work. Label the context and credit any teammates.'],
      ['Evidence of your learning', 'Link to a repository, demo, design file, or write-up. Describe what you did yourself and what you would change.'],
      ['Education and a way to connect', 'Add relevant study, experience, and a professional contact link. Review your public details before sharing.'],
    ],
    recommendation: 'Explore Jack for code-led projects, or begin in Web Studio with the experience and work you already have.',
    linkLabel: 'Explore the Jack template',
    href: `${SITE}/jack-3d`,
  },
];

export function AudienceSection() {
  const [selectedId, setSelectedId] = useState(audiences[0].id);
  const selected = audiences.find((audience) => audience.id === selectedId) ?? audiences[0];
  const Icon = selected.icon;

  return (
    <section className="product-section ps-audience section-pad" id="use-cases" aria-labelledby="audience-heading">
      <div className="section-label">
        <span className="section-index">02 / YOUR KIND OF WORK</span>
        <span>Different paths. A place for each.</span>
      </div>
      <div className="ps-section-heading">
        <h2 className="section-title" id="audience-heading">A story only<br />you can tell.</h2>
        <p>You bring the experience. We give it a home. Pick a starting point to see what belongs in your portfolio.</p>
      </div>

      <div className="ps-persona-picker" role="group" aria-label="Choose your portfolio audience">
        {audiences.map((audience) => (
          <button
            type="button"
            key={audience.id}
            aria-pressed={selectedId === audience.id}
            aria-controls="audience-panel"
            onClick={() => setSelectedId(audience.id)}
          >
            {audience.label}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className="ps-sr-only" role="status">Showing portfolio guidance for: {selected.label}.</p>

      <article className="ps-persona-panel" id="audience-panel" data-persona={selected.id} aria-labelledby="audience-detail-heading">
        <div className="ps-persona-story">
          <span className="ps-persona-icon"><Icon size={28} strokeWidth={1.5} aria-hidden="true" /></span>
          <p className="eyebrow">{selected.label} / Your starting point</p>
          <h3 id="audience-detail-heading">{selected.title}</h3>
          <p>{selected.description}</p>
          <div className="ps-story-note">
            <span className="eyebrow">A good first story</span>
            <p>{selected.story}</p>
          </div>
        </div>
        <div className="ps-persona-checklist">
          <h4>Bring these ingredients.</h4>
          <ul>
            {selected.checklist.map(([title, detail]) => (
              <li key={title}>
                <Check size={17} strokeWidth={1.8} aria-hidden="true" />
                <div><strong>{title}</strong><p>{detail}</p></div>
              </li>
            ))}
          </ul>
          <div className="ps-recommendation">
            <p>{selected.recommendation}</p>
            <a className="text-link" href={selected.href}>{selected.linkLabel}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </article>
    </section>
  );
}

const features = [
  {
    title: 'Your public work, understood.',
    icon: GitBranch,
    description: 'MyFolio analyzes public GitHub metadata, including repositories, languages, and commit activity, to help surface the work behind your profile.',
    point: 'Give that activity context: identify your contribution and explain why a selected project matters. Public activity is not the whole measure of your ability.',
    label: 'Public GitHub analysis',
  },
  {
    title: 'A starting point for your story.',
    icon: Sparkles,
    description: 'AI-assisted storytelling helps turn your inputs into a portfolio narrative, so you have something to shape rather than a blank page.',
    point: 'Review the wording, correct the details, and make it sound like you. Your experience and claims should remain yours to verify.',
    label: 'AI-assisted storytelling',
  },
  {
    title: 'More than a list of roles.',
    icon: Layers3,
    description: 'Bring résumé details, projects, and experience into one presentation. Connect what you have done with examples someone can actually explore.',
    point: 'Pair a project with its brief, your role, and a relevant link. Add career or learning context that a repository alone cannot provide.',
    label: 'Projects & experience',
  },
  {
    title: 'A little more character.',
    icon: PanelsTopLeft,
    description: 'Start with distinctive templates instead of an empty canvas. Explore Jack’s interactive, three-dimensional direction or Nadia’s bold editorial style.',
    point: 'Choose the presentation that supports your work, then try the live template before making it your starting point.',
    label: 'Interactive templates',
  },
  {
    title: 'The details are your call.',
    icon: Palette,
    description: 'Use Web Studio to personalize your portfolio content and presentation. Shape your introduction, project details, and visual direction around your own work.',
    point: 'Make a first pass, read it as a visitor, and refine it. The walkthrough below illustrates the process; your actual editing happens in Web Studio.',
    label: 'Web Studio customization',
  },
  {
    title: 'A home beyond this screen.',
    icon: Globe2,
    description: 'Responsive portfolios give your story a home across screen sizes. MyFolio also supports custom domains with SSL and real-time GitHub synchronization.',
    point: 'Review mobile layouts and links before sharing. Follow the live platform’s domain setup instructions and check current publishing options.',
    label: 'Responsive portfolio & custom domain',
  },
];

export function FeaturesSection() {
  return (
    <section className="product-section ps-features section-pad" id="features" aria-labelledby="features-heading">
      <div className="section-label">
        <span className="section-index">03 / THE WORK, BROUGHT TOGETHER</span>
        <span>Useful underneath the unusual.</span>
      </div>
      <div className="ps-section-heading">
        <h2 className="section-title" id="features-heading">Personality.<br />With substance.</h2>
        <p>From the raw material to the finishing touches, here is what MyFolio helps you bring to the page.</p>
      </div>
      <div className="ps-feature-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <article className="ps-feature" key={feature.label}>
              <div className="ps-feature-top"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div>
              <p className="eyebrow">{feature.label}</p>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="ps-feature-point"><span className="ps-point-dot" aria-hidden="true" /><p>{feature.point}</p></div>
            </article>
          );
        })}
      </div>

      <div className="ps-comparison" aria-labelledby="comparison-heading">
        <div className="ps-comparison-intro">
          <p className="eyebrow">Not either / or</p>
          <h3 id="comparison-heading">Keep the résumé.<br />Open up the story.</h3>
          <p>A résumé is still useful for applications and a quick career summary. A portfolio adds space for the work itself. Neither replaces accurate details, thoughtful editing, or a good conversation.</p>
        </div>
        <div className="ps-comparison-pair">
          <article className="ps-comparison-card">
            <FileText size={25} strokeWidth={1.5} aria-hidden="true" />
            <h4>A static résumé</h4>
            <dl>
              <div><dt>At a glance</dt><dd>A concise, familiar summary of experience and qualifications.</dd></div>
              <div><dt>The evidence</dt><dd>Short descriptions and links, within the limits of the document.</dd></div>
              <div><dt>Keeping it current</dt><dd>Edit the file and send a new version when your experience changes.</dd></div>
              <div><dt>Sharing it</dt><dd>A portable file for applications, attachments, and offline reading.</dd></div>
            </dl>
          </article>
          <article className="ps-comparison-card ps-comparison-portfolio">
            <Globe2 size={25} strokeWidth={1.5} aria-hidden="true" />
            <h4>A MyFolio portfolio</h4>
            <dl>
              <div><dt>At a glance</dt><dd>An introduction with a visual presentation and room to explore.</dd></div>
              <div><dt>The evidence</dt><dd>Project stories, visuals, and links alongside your experience.</dd></div>
              <div><dt>Keeping it current</dt><dd>Edit your portfolio in Studio. Connected GitHub work can sync; your narrative still needs review.</dd></div>
              <div><dt>Sharing it</dt><dd>A web destination, with custom-domain support. Check the live platform for publishing options.</dd></div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}

type StudioMode = 'content' | 'appearance' | 'publish';

const studioModes = [
  {
    id: 'content',
    label: 'Content',
    heading: 'Start with what is already yours.',
    description: 'Bring your public GitHub profile, résumé details, projects, and experience to the real Studio. Give each selected project a short brief, your contribution, and a useful link. You do not need a long career to have meaningful work to share.',
    points: ['Write an introduction that says what you do and what interests you.', 'Add context that public repository metadata cannot tell on its own.', 'Read AI-assisted copy carefully and correct anything that is not accurate.'],
    image: '/images/template-jack.webp',
    imageAlt: 'Jack template example with silver typography and a three-dimensional character on a dark background',
    previewTitle: 'Your work is the starting point.',
    previewText: 'Example content outline: a short introduction, selected projects, and the experience behind them.',
    previewLabel: 'Content outline / Jack example',
    previewItems: ['Your introduction', 'Selected projects', 'Experience & contact'],
  },
  {
    id: 'appearance',
    label: 'Appearance',
    heading: 'Choose a direction. Make it personal.',
    description: 'Explore Jack for an interactive developer-focused direction or Nadia for a bold editorial feel. In Web Studio, personalize the available content and appearance settings so the template supports your story, rather than competing with it.',
    points: ['Choose a template that gives your strongest work room to breathe.', 'Use your own introduction and relevant visuals, with permission to share them.', 'Review contrast, text length, and the way your project images fit.'],
    image: '/images/template-nadia.webp',
    imageAlt: 'Nadia template example with a portrait, bold white typography, and coral accents',
    previewTitle: 'Same purpose. A different personality.',
    previewText: 'The local illustration switches to Nadia to show another visual direction. This does not change an account or an actual portfolio.',
    previewLabel: 'Visual direction / Nadia example',
    previewItems: ['Editorial layout', 'Personal introduction', 'Expressive visuals'],
  },
  {
    id: 'publish',
    label: 'Publish',
    heading: 'Give it one more look, then share.',
    description: 'Preview your real portfolio before sharing it. MyFolio supports responsive layouts and custom domains with SSL; domain setup and publishing happen on the live platform, not in this demonstration.',
    points: ['Check project links, contact details, spelling, and the claims in your copy.', 'Review your actual portfolio on a phone as well as a larger screen.', 'Review the current publishing options and follow the domain-verification steps if you use your own address.'],
    image: '/images/template-jack.webp',
    imageAlt: 'Jack template example used to illustrate a final portfolio review before publishing',
    previewTitle: 'A review checklist, not a publish button.',
    previewText: 'Nothing here is saved or published. Use this checklist as a reminder before opening your own portfolio in the real Studio.',
    previewLabel: 'Before sharing / Jack example',
    previewItems: ['Review your links', 'Check smaller screens', 'Confirm public details'],
  },
] satisfies { id: StudioMode; label: string; heading: string; description: string; points: string[]; image: string; imageAlt: string; previewTitle: string; previewText: string; previewLabel: string; previewItems: string[] }[];

export function StudioSection() {
  const [mode, setMode] = useState<StudioMode>('content');
  const selected = studioModes.find((item) => item.id === mode) ?? studioModes[0];

  return (
    <section className="product-section ps-studio section-pad" id="studio" aria-labelledby="studio-heading">
      <div className="section-label">
        <span className="section-index">06 / MAKE IT YOURS</span>
        <span>A little direction. Your decisions.</span>
      </div>
      <div className="ps-section-heading">
        <h2 className="section-title" id="studio-heading">Meet your<br />creative control.</h2>
        <p>What do you bring? What can you shape? What should you check? Take a quick look at the journey through Web Studio.</p>
      </div>

      <div className="ps-studio-shell">
        <div className="ps-studio-topbar">
          <span className="ps-studio-name"><PanelsTopLeft size={20} aria-hidden="true" /> Inside Web Studio</span>
          <p id="studio-demo-disclaimer">Illustrative studio preview — not connected to your account</p>
        </div>
        <div className="ps-studio-modes" role="group" aria-label="Studio preview modes" aria-describedby="studio-demo-disclaimer">
          {studioModes.map((item, index) => (
            <button
              type="button"
              key={item.id}
              id={`studio-mode-${item.id}`}
              aria-pressed={mode === item.id}
              aria-controls="studio-walkthrough studio-preview"
              onClick={() => setMode(item.id)}
            >
              <span className="ps-mode-number" aria-hidden="true">0{index + 1}</span>{item.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="ps-sr-only" role="status">Studio walkthrough: {selected.label}. {selected.previewLabel}.</p>
        <div className="ps-studio-workspace" data-mode={mode}>
          <div className="ps-studio-details" id="studio-walkthrough" aria-labelledby="studio-step-heading">
            <p className="eyebrow">{selected.label} / The walkthrough</p>
            <h3 id="studio-step-heading">{selected.heading}</h3>
            <p>{selected.description}</p>
            <ul>
              {selected.points.map((point) => <li key={point}><span className="ps-point-dot" aria-hidden="true" /><span>{point}</span></li>)}
            </ul>
          </div>
          <figure className="ps-studio-preview" id="studio-preview" aria-labelledby="studio-preview-caption" data-template={mode === 'appearance' ? 'nadia' : 'jack'}>
            <div className="ps-preview-label"><span className="ps-point-dot" aria-hidden="true" />{selected.previewLabel}</div>
            <div className="ps-studio-image">
              <img src={selected.image} alt={selected.imageAlt} width="1440" height="1050" loading="lazy" />
            </div>
            <figcaption id="studio-preview-caption">
              <h4>{selected.previewTitle}</h4>
              <p>{selected.previewText}</p>
              <ul>{selected.previewItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="ps-studio-footer">
        <p>This is a local, three-step illustration, not the editor. Ready to work on your own portfolio? Open the real Web Studio to get started.</p>
        <a className="text-link" href={`${SITE}/studio`}>Open Web Studio<ArrowUpRight size={20} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
