// PT é o idioma base (está no HTML). Aqui ficam só as traduções para inglês, por seletor.
const EN = {
  'title': 'Raick Silva | Full Stack Developer & Agentic Development',
  '.loader .eyebrow': 'Raick Silva · Full Stack Developer',
  '.loader-q': 'From spec<br>to deploy.',
  '.loader-count small': 'Loading',
  '.nav-role': 'Full Stack Developer · Agentic development',
  '.nav-status': '<i></i>Available for projects',
  '.nav-links a:nth-child(1)': 'About',
  '.nav-links a:nth-child(2)': 'Work',
  '.nav-links a:nth-child(3)': 'Contact',
  '.overlay nav a:nth-child(1)': '<small>01</small>About',
  '.overlay nav a:nth-child(2)': '<small>02</small>What I do',
  '.overlay nav a:nth-child(3)': '<small>03</small>Work',
  '.overlay nav a:nth-child(4)': '<small>04</small>Products',
  '.overlay nav a:nth-child(5)': '<small>05</small>Experience',
  '.overlay nav a:nth-child(6)': '<small>06</small>Contact',
  '.hero-clock small': 'Brazil · remote, anywhere',
  '.hero h1': 'Products that go<br>from idea to production.',
  '.hero-copy p': 'I spec, steer and review AI agents to ship web, iOS and mobile, from specification to deploy.',
  '.hero-ctas .pill': 'Let’s talk',
  '.hero-ctas .link-arrow': 'See the work <span>›</span>',
  '.scroll-hint': '<span></span>Scroll',
  '#sobre .sec-top': '<span>(01)</span><b>About me</b><em>Coronel Fabriciano, working remotely</em>',
  '.about-lede': 'I started in Bubble and Low-Code and moved to code with an agentic approach: <strong>I write the spec, agents implement it and I review every line</strong> before it ships. Today I deliver in <strong>TypeScript, React, React Native, Swift and Python</strong>, with PostgreSQL and Supabase on the back end, working with several clients in parallel.',
  '.stats sup': 'years',
  '.stats div:nth-child(1) small': 'building digital products',
  '.stats div:nth-child(2) small': 'companies and software houses',
  '.stats div:nth-child(3) small': 'countries served: Brazil, UK and USA',
  '.stats div:nth-child(4) small': 'platforms: web, iOS and mobile',
  '#servicos .sec-top': '<span>(02)</span><b>What I do</b><em>Usually on the same project</em>',
  '.svc-kicker': 'From the spec to the last endpoint.',
  '.svc-item:nth-child(1) h3': 'Agentic',
  '.svc-item:nth-child(1) p': 'Claude Code and Codex with Spec Kit and BMAD Method. Skills, MCP and context engineering, with a human review of every diff.',
  '.svc-item:nth-child(2) p': 'React, Next.js, TypeScript and Astro. Dashboards, SaaS and fast websites, from layout to deploy on Vercel or Cloudflare.',
  '.svc-item:nth-child(3) h3': 'Native iOS',
  '.svc-item:nth-child(3) p': 'Swift and SwiftUI for a London marketplace: bookings, pricing, catalog and reviews.',
  '.svc-item:nth-child(4) p': 'React Native and Expo to bring the same product to iPhone and Android.',
  '.svc-item:nth-child(5) p': 'PostgreSQL, Supabase, REST APIs, webhooks and offline sync with SQLite.',
  '.svc-item:nth-child(6) p': 'Bubble integrated with Xano, Supabase and external services, when it is the fastest way to validate.',
  '.term pre': '<span class="ac">$</span> /specify ministry schedules\n<span class="ok">✓</span> spec.md · acceptance criteria\n<span class="ac">$</span> /plan\n<span class="ok">✓</span> schema · RLS · tasks\n<span class="ac">$</span> /implement\n<span class="ok">✓</span> tests passing\n<span class="ac">$</span> review diff<span class="caret"></span>',
  '.proc-visual pre:nth-of-type(1)': '<span class="ac">## Plan</span>\n- [ ] migration: <span class="hl">schedules</span>, <span class="hl">ministries</span>\n- [ ] RLS per access role\n- [ ] weekly schedule screen\n- [ ] business rule tests',
  '.svc-tabs button:nth-child(1)': '01<b>Agentic</b>',
  '.blocks span:nth-child(1)': 'Trigger',
  '.blocks span:nth-child(7)': 'Database',
  '.proc-title': 'From spec<br>to deploy.',
  '.ps:nth-child(1)': '<span>01</span><b>Specify</b><p>Requirements and acceptance criteria before any code.</p>',
  '.ps:nth-child(2)': '<span>02</span><b>Plan</b><p>Architecture, database and small, verifiable tasks.</p>',
  '.ps:nth-child(3)': '<span>03</span><b>Implement</b><p>Agents execute task by task, with context.</p>',
  '.ps:nth-child(4)': '<span>04</span><b>Review</b><p>I read the whole diff: bugs, security and tests.</p>',
  '.ps:nth-child(5)': '<span>05</span><b>Ship</b><p>Pull request, deploy and documentation.</p>',
  '#trabalho .sec-top': '<span>(03)</span><b>Published websites</b><em>Local businesses in Brazil</em>',
  '.visit': 'Open site ↗',
  '#produtos .sec-top': '<span>(04)</span><b>Products</b><em>What I’m working on</em>',
  '#produtos .big': 'Products in progress',
  '.acc-item:nth-child(1) .acc-body p': 'Church management SaaS: members, ministries, groups, schedules, events, communication and finances. Architecture, database and business rules designed from scratch.',
  '.acc-item:nth-child(1) .acc-body small': 'Own product · Founder · in validation',
  '.acc-item:nth-child(2) .acc-body p': 'Native iOS app for a home cleaning marketplace in London: bookings, pricing, service catalog, professionals and reviews.',
  '.acc-item:nth-child(2) .acc-body small': 'Client · London · remote',
  '.acc-item:nth-child(3) .acc-v': 'Mobile app',
  '.acc-item:nth-child(3) .acc-body h3': 'Mobile app',
  '.acc-item:nth-child(3) .acc-body p': 'New React Native app for a client, from screen flows to the app store release.',
  '.acc-item:nth-child(3) .acc-body small': 'Client · in development',
  '#experiencia .sec-top': '<span>(05)</span><b>Experience</b><em>Since 2021</em>',
  '.exp-lede': 'Since 2021 I have been building for <strong>software houses</strong>, <strong>startups</strong> and direct clients. Before code, networks and fiber optics in the field.',
  '.exp-list li:nth-child(1)': '<time>Aug 2021 – Feb 2023 · On-site</time><b>Network &amp; Fiber Optics Technician</b><span>Ultranet Telecom · Coronel Fabriciano</span>',
  '.exp-list li:nth-child(2)': '<time>Mar 2023 – Aug 2024 · Remote</time><b>Bubble Developer</b><span>Softaliza, Fensor, Kafé Apps, Studio Pipple and Hamurabi</span>',
  '.exp-list li:nth-child(3)': '<time>Nov 2024 – Jun 2025 · Full-time</time><b>Software Developer</b><span>Cazin · software house</span>',
  '.exp-list li:nth-child(4)': '<time>Jul 2025 – Nov 2025 · Freelance</time><b>Software Developer</b><span>Neural Business AI · Bubble, Xano and Supabase</span>',
  '.exp-list li:nth-child(5)': '<time>Nov 2025 – Jul 2026 · Full-time</time><b>Software Developer</b><span>Bovichain · traceability and offline sync</span>',
  '.exp-list li:nth-child(6)': '<time>Jan 2026 – present · Remote, UK</time><b>Software Developer (iOS)</b><span>Cleaner2Day · Swift/SwiftUI</span>',
  '.exp-list li:nth-child(7)': '<time>2026 – present · Self-employed</time><b>Full Stack Developer</b><span>Own company · apps and websites</span>',
  '.exp-list li:nth-child(8)': '<time>Mar 2026 – <em>now</em></time><b>Founder &amp; Software Developer</b><span>EkklesiaHub · own SaaS</span>',
  '.exp .link-arrow': 'Download full résumé (PDF, in Portuguese) <span>›</span>',
  '.motto small': 'My motto',
  '.motto h2': 'The agent writes.<br><span>I answer for the code.</span>',
  '#contato .sec-top': '<span>(06)</span><b>Contact</b><em>I reply the same day</em>',
  '#contato .big': 'Shall we build<br>something together?',
  '.wm-live .wm-a': 'Online now',
  '.wm-live .wm-b': 'in Coronel Fabriciano · same-day reply',
  '.contact footer span:nth-child(2)': 'Coronel Fabriciano, MG · Brazil',
  '.contact footer a': 'Back to top ↑',
};
const UI = {
  pt: { menu: 'Menu ', close: 'Fechar ', year: 'Ano', desc: 'Desenvolvedor Full Stack com quase 5 anos de experiência. Da especificação ao deploy com agentes de IA: TypeScript/React, React Native, Swift/SwiftUI, Python, PostgreSQL e Supabase.' },
  en: { menu: 'Menu ', close: 'Close ', year: 'Year', desc: 'Full Stack Developer with almost 5 years of experience. From spec to deploy with AI agents: TypeScript/React, React Native, Swift/SwiftUI, Python, PostgreSQL and Supabase.' },
};
const PT_COUNTRIES = new Set(['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL']);
const THE = new Set(['US', 'GB', 'AE', 'NL', 'PH', 'CZ', 'BS', 'GM', 'DO', 'CF', 'KY', 'VG', 'MV', 'SC']);
const KEY = 'raick-lang';

const PT = {};
const nodes = (sel) => (sel === 'title' ? [document.querySelector('title')] : [...document.querySelectorAll(sel)]);
for (const sel of Object.keys(EN)) PT[sel] = nodes(sel).map((n) => n.innerHTML);

export let lang = 'pt';
export const ui = (k) => UI[lang][k];

export function setLang(next, { save = true } = {}) {
  if (next !== 'pt' && next !== 'en') return;
  lang = next;
  for (const sel of Object.keys(EN)) nodes(sel).forEach((n, i) => { n.innerHTML = next === 'en' ? EN[sel] : PT[sel][i]; });
  document.documentElement.lang = next === 'en' ? 'en' : 'pt-BR';
  document.querySelector('meta[name="description"]').content = UI[next].desc;
  document.querySelectorAll('.lang-switch button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
  if (save) { try { localStorage.setItem(KEY, next); } catch {} }
  document.dispatchEvent(new CustomEvent('langchange', { detail: next }));
}

async function geoCountry() {
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 2000);
    const r = await fetch('/api/geo', { signal: ctl.signal }); clearTimeout(t);
    if (!r.headers.get('content-type')?.includes('json')) return null;
    return (await r.json()).country ?? null;
  } catch { return null; }
}

const COPY = {
  en: { country: (c) => `Looks like you’re in ${c}.`, browser: 'Your browser is set to English.', q: 'Would you like to see the site in English?', go: 'Switch to English', stay: 'Keep Portuguese' },
  pt: { country: (c) => `Parece que você está ${c}.`, browser: 'Seu navegador está em português.', q: 'Prefere ver o site em português?', go: 'Mudar para português', stay: 'Manter em inglês' },
};
function countryName(code, l) {
  try {
    const n = new Intl.DisplayNames([l === 'en' ? 'en' : 'pt-BR'], { type: 'region' }).of(code);
    return l === 'en' ? (THE.has(code) ? `the ${n}` : n) : `no ${n}`.replace(/^no (Portugal|Angola|Moçambique|Cabo Verde|Timor-Leste)/, 'em $1');
  } catch { return code; }
}

function prompt(suggest, country) {
  const box = document.getElementById('langPrompt'), c = COPY[suggest];
  document.getElementById('lpTitle').textContent = country ? c.country(countryName(country, suggest)) : c.browser;
  document.getElementById('lpQ').textContent = c.q;
  document.getElementById('lpSwitch').textContent = c.go;
  document.getElementById('lpStay').textContent = c.stay;
  const close = (chosen) => { box.classList.remove('show'); setTimeout(() => (box.hidden = true), 400); try { sessionStorage.setItem(KEY + '-asked', '1'); } catch {} if (chosen) setLang(chosen); };
  document.getElementById('lpSwitch').onclick = () => close(suggest);
  document.getElementById('lpStay').onclick = () => close(lang);
  box.querySelector('.lp-close').onclick = () => close();
  box.hidden = false; requestAnimationFrame(() => box.classList.add('show'));
}

export async function initLang({ promptDelay = 0 } = {}) {
  document.querySelectorAll('.lang-switch button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
  const param = new URLSearchParams(location.search).get('lang');
  let saved = null; try { saved = localStorage.getItem(KEY); } catch {}
  if (param === 'en' || param === 'pt') { setLang(param, { save: false }); return; }
  if (saved) { setLang(saved, { save: false }); return; }
  let asked = false; try { asked = !!sessionStorage.getItem(KEY + '-asked'); } catch {}
  if (asked) return;
  const browser = (navigator.languages?.[0] || navigator.language || '').toLowerCase();
  const country = await geoCountry();
  const suggest = browser.startsWith('pt') || (country && PT_COUNTRIES.has(country)) ? 'pt' : 'en';
  if (suggest !== lang) setTimeout(() => prompt(suggest, country), promptDelay);
}
