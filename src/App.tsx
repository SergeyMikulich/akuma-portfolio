import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Instagram,
  Linkedin,
  Menu,
  Send,
  Trophy,
  UserRound,
  Users,
  Eye,
  Rocket,
  LayoutGrid,
  Megaphone,
  Camera,
  Palette,
  Sparkles,
  Play,
  MessageSquareMore,
  MapPin,
  Copy,
} from 'lucide-react';
import TikTokPreviewModal from './components/TikTokPreviewModal';
import { interviewWorks, works } from './data/works';
import { getFallbackThumbnailUrl, getPlatformLabel } from './lib/media';
import type { WorkItem, WorkMetadata } from './lib/work-types';

type NavItem = {
  label: string;
  href: string;
};

type TimelineItem = {
  year: string;
  title: string;
  company: string;
  description: string;
  details: string;
};

type SkillItem = {
  label: string;
  icon: React.ReactNode;
};

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  accent: string;
};

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const brands = ['BetBoom Team', 'BetBoom Esports', 'No[o]ne fan page', 'Miracle fan page', 'Daxak fan page', 'OFFSTAGE'];

const timeline: TimelineItem[] = [
  {
    year: '2018 - 2022',
    title: 'SMM / Manager',
    company: 'NooneTV · DaxakOfficial · Miracle',
    description:
      'Social content, graphic design and TikTok production for esports channels and creators.',
    details:
      'NooneTV: graphic design development, content preparation and placement. DaxakOfficial: graphic design, content preparation and placement, filming and editing TikTok videos. Miracle: graphic design development, content preparation and posting.',
  },
  {
    year: 'May 2022 - Feb 2024',
    title: 'SMM / Content Maker',
    company: 'BetBoom Team',
    description:
      'Social media promotion, tournament media work, player communications and short-form video production.',
    details:
      'Promotion across Telegram, VK, Instagram and TikTok; preparing content and publishing plans; technical specifications for designers and editors; tournament media work, player communications and organizational support; TikTok concepts, filming, props and short-form video production; memes, news content and exclusive event coverage.',
  },
  {
    year: 'Feb 2024 - Sep 2025',
    title: 'SMM Manager',
    company: 'BetBoom Esports · SMM / Content Maker',
    description:
      'Social strategy, player work, tournament coverage and content production for Dota 2 and CS2.',
    details:
      'Worked across Telegram, VK, Instagram and TikTok; created memes and news-based picture/video content; prepared designer and editor briefs; supported players and managers during tournaments; planned, filmed and produced short TikTok videos; created fresh photo and video content from events; contributed to large YouTube productions and on-set coordination; developed promotion strategies for Telegram channels and TikTok.',
  },
  {
    year: 'Current',
    title: 'Host / Content Maker',
    company: 'OFFSTAGE',
    description:
      'Interviews, scripts, intros, outros and new content formats for esports media.',
    details:
      'Filming and conducting interviews; scriptwriting; recording intros and outros; assisting with editing; preparing content for social media; creating new content formats.',
  },
];

const stats = [
  { icon: <Users size={28} />, value: 'SMM / Content Maker / Host', label: 'Professional focus' },
  { icon: <Rocket size={28} />, value: 'Shorts Content / Interviews', label: 'Video formats' },
  { icon: <Eye size={28} />, value: '6+', label: 'Years in content' },
  { icon: <Trophy size={28} />, value: 'OFFSTAGE', label: 'Current work' },
];

const skills: SkillItem[] = [
  { label: 'Social Media Strategy', icon: <Megaphone size={16} /> },
  { label: 'Content Creation', icon: <Sparkles size={16} /> },
  { label: 'Copywriting', icon: <MessageSquareMore size={16} /> },
  { label: 'Influencer Marketing', icon: <UserRound size={16} /> },
  { label: 'Analytics & Reporting', icon: <LayoutGrid size={16} /> },
  { label: 'Tournament Media Work', icon: <Trophy size={16} /> },
  { label: 'Interviews', icon: <Camera size={16} /> },
  { label: 'Video Production', icon: <Play size={16} /> },
  { label: 'Photoshop / Figma', icon: <Palette size={16} /> },
  { label: 'Script Writing', icon: <MessageSquareMore size={16} /> },
  { label: 'Creative Director', icon: <Sparkles size={16} /> },
  { label: 'Esports Knowledge', icon: <Camera size={16} /> },
];

const testimonials: TestimonialItem[] = [
  {
    quote:
      'Alina is a true professional. She understands esports audience, creates viral content and always brings fresh ideas that work.',
    name: 'Nikita Chukalin',
    role: 'CEO, BetBoom Esports',
    accent: 'from-[#d65aff] to-[#7b2eff]',
  },
  {
    quote:
      'Working with Alina is easy and productive. Her passion for esports and attention to details make a huge difference.',
    name: 'Dmitry Smetanin',
    role: 'Marketing Director, Team Spirit',
    accent: 'from-[#ffcc55] to-[#ff8a3d]',
  },
];

const socialLinks = [
  { icon: <Send size={18} />, href: 'https://t.me/Akuma_812', label: 'Telegram' },
  {
    icon: <Linkedin size={18} />,
    href: 'https://www.linkedin.com/in/anastasiia-begliakova-4846b7336',
    label: 'LinkedIn',
  },
  {
    icon: <Instagram size={18} />,
    href: 'https://www.instagram.com/akuma_812',
    label: 'Instagram',
  },
];

const contactLinks = {
  telegram: 'https://t.me/Akuma_812',
  linkedin: 'https://www.linkedin.com/in/anastasiia-begliakova-4846b7336',
  instagram: 'https://www.instagram.com/akuma_812',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState('');
  const [previewWork, setPreviewWork] = useState<WorkItem | null>(null);
  const [workMeta, setWorkMeta] = useState<Record<string, WorkMetadata>>({});
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const copiedEmail = useMemo(() => 'nastya.beglyakova44@gmail.com', []);
  const allWorks = useMemo(() => [...works, ...interviewWorks], []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(copiedEmail);
  };

  useEffect(() => {
    let cancelled = false;

    async function loadMeta() {
      try {
        const response = await fetch('/api/work-metadata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ urls: allWorks.map((work) => work.url) }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch work metadata');
        }

        const data = (await response.json()) as { items?: Record<string, WorkMetadata> };

        if (!cancelled) {
          setWorkMeta(data.items ?? {});
        }
      } catch {
        if (!cancelled) {
          setWorkMeta({});
        }
      }
    }

    void loadMeta();

    return () => {
      cancelled = true;
    };
  }, [allWorks]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewWork(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const renderWorkCard = (work: WorkItem) => {
    const meta = workMeta[work.url];
    const previewUrl =
      work.posterUrl ?? meta?.thumbnailUrl ?? getFallbackThumbnailUrl(work.platform, work.url);

    return (
      <button
        key={work.id}
        type="button"
        className={`work-card ${selectedWork === work.id ? 'active' : ''}`}
        onClick={() => {
          setSelectedWork(work.id);
          setPreviewWork(work);
        }}
        aria-pressed={selectedWork === work.id}
        aria-label={`Open ${work.title}`}
      >
        <div className={`work-thumb ${work.accent}`}>
          <div className="work-thumb-top">
            <span>{work.tag}</span>
            {/* <span>{meta?.authorName ?? getPlatformLabel(work.platform)}</span> */}
          </div>
          <div className="work-thumb-visual">
            {previewUrl ? (
              <img src={previewUrl} alt={`${work.title} preview`} loading="lazy" />
            ) : (
              <div className="work-thumb-fallback">
                <span>{getPlatformLabel(work.platform)}</span>
                <strong>{work.title}</strong>
              </div>
            )}
            <div className="work-thumb-scrim" />
            {/* <div className="work-thumb-caption">
              <span>{getPlatformLabel(work.platform)}</span>
            </div> */}
            <div className="work-thumb-play">
              <Play size={16} />
            </div>
          </div>
        </div>
        <div className="work-card-body">
          <h4>{meta?.title ?? work.title}</h4>
          <span className="work-card-platform">{getPlatformLabel(work.platform)}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="page-shell">
      <div className="page-background" aria-hidden="true" />
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Homepage">
          <span className="logo-mark">Akuma</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href={contactLinks.telegram} aria-label="Telegram" target="_blank" rel="noreferrer">
            <Send size={18} />
          </a>
          <a href={contactLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <Linkedin size={18} />
          </a>
          <a href={contactLinks.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
            <Instagram size={18} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <Menu size={22} />
          </button>
        </div>

        <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-grid">
            <motion.div
              className="hero-visual"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-corner hero-corner-top" />
              <div className="hero-corner hero-corner-bottom" />
              <div className="hero-side-copy" aria-hidden="true">
                <span />
                <p>Focus</p>
                <p>Create</p>
                <p>Engage</p>
                <p>Win</p>
              </div>
              <div className="hero-portrait-frame">
                <div className="hero-portrait-glow" />
                <img
                  src="/header_template.png"
                  alt="Futuristic esports portrait with dramatic purple lighting"
                  className="hero-portrait"
                  loading="eager"
                />
              </div>
            </motion.div>

            <motion.div
              className="hero-content"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              <p className="eyebrow">SMM • ESPORTS • CONTENT</p>
              <h1 id="hero-title">
                <span>Anastasiia</span>
                <span>Begliakova</span>
              </h1>
              <div className="hero-underline" aria-hidden="true" />
              <h2>SMM / Content Maker / Host</h2>
              <p className="hero-copy">
                I create engaging content and digital campaigns that connect brands with millions
                of esports fans. Turning attention into community and community into loyalty.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href="/cv/CV%20Begliakova%20Anastasiia.pdf"
                  download="CV Begliakova Anastasiia.pdf"
                >
                  <Download size={16} />
                  Download CV
                </a>
                <a className="button button-secondary" href="#contact">
                  Contact Me
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="hero-socials" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} aria-label={link.label} target="_blank">
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="stats section-wrap" aria-label="Statistics">
          <motion.div
            className="stats-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
                {index < stats.length - 1 ? <div className="stat-divider" aria-hidden="true" /> : null}
              </div>
            ))}
          </motion.div>
        </section>

        <section className="experience section-wrap" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h3 id="experience-title">My Journey So Far</h3>
            <p>
              SMM manager and content maker with experience across esports, social media strategy,
              tournament media work, interviews and short-form video.
            </p>
          </div>
          <div className="timeline">
            <div className="timeline-track" aria-hidden="true" />
            {timeline.map((item, index) => (
              <motion.article
                key={item.year}
                className={`timeline-item timeline-item-${index}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="timeline-dot" />
                <p className="timeline-year">{item.year}</p>
                <h4>{item.title}</h4>
                <p className="timeline-company">{item.company}</p>
                <button
                  type="button"
                  className={`timeline-description timeline-description-toggle ${expandedExperience === index ? 'expanded' : ''}`}
                  aria-expanded={expandedExperience === index}
                  onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
                >
                  <span>{expandedExperience === index ? item.details : item.description}</span>
                  <span className="timeline-description-action">
                    {expandedExperience === index ? 'Show less' : 'Read more'}
                  </span>
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="work section-wrap" id="work" aria-labelledby="work-title">
          <div className="works-layout">
            <div className="section-heading narrow works-intro">
              <p className="eyebrow">My works</p>
              <h3 id="work-title">Portfolio</h3>
            </div>

            <motion.div
              className="works-stage"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.28 }}
              variants={fadeUp}
            >
              <div className="works-category">
                <p className="eyebrow">Shorts Content</p>
                <div className="works-carousel" aria-label="Shorts portfolio">
                  {works.map((work) => renderWorkCard(work))}
                </div>
              </div>
              <div className="works-category works-category-interviews">
                <p className="eyebrow">Long COntent</p>
                <div className="works-carousel" aria-label="Interview portfolio">
                  {interviewWorks.map((work) => renderWorkCard(work))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="brands section-wrap" aria-labelledby="brands-title" id='brands'>
          <motion.div
            className="brands-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
          >
            <div className="brands-lead">
              <p className="eyebrow" id="brands-title">
                Brands & companies I&apos;ve worked with
              </p>
            </div>
            <div className="brands-row" aria-label="Brand logos">
              {brands.map((brand) => (
                <span key={brand} className={`brand brand-${brand.toLowerCase().replace(/\s/g, '')}`}>
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="skills section-wrap" id="skills" aria-labelledby="skills-title">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h3 id="skills-title">What I Do Best</h3>
          </div>
          <motion.div
            className="skills-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {skills.map((skill) => (
              <span key={skill.label} className="skill-pill">
                {skill.icon}
                {skill.label}
              </span>
            ))}
          </motion.div>
        </section>

        {/* <section className="testimonials section-wrap" aria-labelledby="testimonials-title">
          <div className="section-heading">
            <p className="eyebrow">Testimonials</p>
            <h3 id="testimonials-title">What People Say</h3>
          </div>

          <div className="testimonials-shell">
            <button className="carousel-button left" type="button" aria-label="Previous testimonial">
              <ChevronLeft size={18} />
            </button>
            <div className="testimonial-track">
              {testimonials.map((item) => (
                <motion.article
                  key={item.name}
                  className="testimonial-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={fadeUp}
                >
                  <div className={`quote-mark ${item.accent}`}>66</div>
                  <p className="testimonial-copy">{item.quote}</p>
                  <div className="testimonial-person">
                    <div className="avatar-ring">
                      <div className="avatar" aria-hidden="true">
                        <UserRound size={20} />
                      </div>
                    </div>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <button className="carousel-button right" type="button" aria-label="Next testimonial">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="carousel-dots" aria-hidden="true">
            <span className="active" />
            <span />
            <span />
          </div>
        </section> */}

        <section className="contact section-wrap" id="contact" aria-labelledby="contact-title">
          <div className="section-heading">
            <p className="eyebrow">Let&apos;s connect</p>
            <h3 id="contact-title">Let&apos;s Create Something Epic</h3>
          </div>
          <div className="contact-grid">
            <div className="contact-item">
              <p>Email</p>
              <strong>{copiedEmail}</strong>
              <button type="button" className="inline-action" aria-label="Copy email" onClick={copyEmail}>
                <Copy size={14} />
              </button>
            </div>
            <div className="contact-item">
              <p>Telegram</p>
              <strong>@Akuma_812</strong>
              <button type="button" className="inline-action" aria-label="Open Telegram">
                <Send size={14} />
              </button>
            </div>
            <div className="contact-item">
              <p>Location</p>
              <strong>Saint Petersburg, Russia</strong>
              <MapPin size={14} />
            </div>
            <a
              className="button button-primary contact-cta"
              href={contactLinks.telegram}
              target="_blank"
              rel="noreferrer"
            >
              Text me
              <Send size={16} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="logo footer-logo" href="#top" aria-label="Homepage">
          <span className="logo-mark">Akuma</span>
        </a>
        <p>© 2026 Anastasiia Begliakova. All rights reserved.</p>
        <div className="footer-socials" aria-label="Footer social links">
          <a href={contactLinks.telegram} aria-label="Telegram" target="_blank" rel="noreferrer">
            <Send size={16} />
          </a>
          <a href={contactLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <Linkedin size={16} />
          </a>
          <a href={contactLinks.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
            <Instagram size={16} />
          </a>
        </div>
      </footer>

      <TikTokPreviewModal work={previewWork} onClose={() => setPreviewWork(null)} />
    </div>
  );
}

export default App;
