import * as THREE from 'three';
import { initLang, ui } from './i18n.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => matchMedia('(min-width: 901px)').matches;
gsap.registerPlugin(ScrollTrigger);

/* ---------- smooth scroll ---------- */
let lenis = null;
if (!reduce && window.Lenis) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
const scrollTo = (target) => {
  if (typeof target === 'number') { lenis ? lenis.scrollTo(target, { duration: 1.2 }) : window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' }); return; }
  const el = typeof target === 'string' ? $(target) : target;
  if (!el) return;
  lenis ? lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
};
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
  const id = a.getAttribute('href');
  if (id.length < 2 && id !== '#') return;
  e.preventDefault(); closeMenu(); scrollTo(id === '#' || id === '#top' ? document.body : id);
}));

/* ---------- menu ---------- */
const menuBtn = $('#menuBtn'), overlay = $('#overlay');
function closeMenu() { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.firstChild.textContent = ui('menu'); lenis?.start(); }
menuBtn.addEventListener('click', () => {
  if (overlay.classList.contains('open')) return closeMenu();
  overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); menuBtn.setAttribute('aria-expanded', 'true'); menuBtn.firstChild.textContent = ui('close'); lenis?.stop();
});
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

/* ---------- next-section button ---------- */
const stops = ['#sobre', '#servicos', '#processo', '#trabalho', '#produtos', '#experiencia', '#contato'].map((s) => $(s));
$('#nextBtn').addEventListener('click', (e) => {
  e.preventDefault(); e.stopImmediatePropagation();
  const y = scrollY + 10;
  const next = stops.find((el) => el.getBoundingClientRect().top + scrollY > y + 4) || document.body;
  scrollTo(next);
}, true);
ScrollTrigger.create({ trigger: '#contato', start: 'top 70%', end: 'max', onToggle: (s) => gsap.to('#nextBtn', { autoAlpha: s.isActive ? 0 : 1, duration: .3 }) });

/* ---------- clock + mini globe ---------- */
const clock = $('#clock');
const tick = () => { clock.textContent = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date()); };
tick(); setInterval(tick, 15000);
(() => {
  const c = $('#globe'), x = c.getContext('2d'); const pts = [];
  for (let i = 0; i < 420; i++) { const y = 1 - (i / 419) * 2, r = Math.sqrt(1 - y * y), t = i * 2.39996; pts.push([Math.cos(t) * r, y, Math.sin(t) * r]); }
  let a = 0;
  const draw = () => {
    x.clearRect(0, 0, 88, 88); x.fillStyle = '#16161a'; x.beginPath(); x.arc(44, 44, 43, 0, 7); x.fill();
    for (const [px, py, pz] of pts) {
      const ca = Math.cos(a), sa = Math.sin(a), X = px * ca - pz * sa, Z = px * sa + pz * ca;
      if (Z < 0) continue; x.fillStyle = `rgba(150,152,255,${0.25 + Z * 0.75})`; x.fillRect(44 + X * 38, 44 - py * 38, 1.6, 1.6);
    }
    a += 0.006; if (!reduce) requestAnimationFrame(draw);
  };
  draw();
})();

/* ---------- marquees ---------- */
const fill = (el, items, sep) => { const html = items.map((t) => `<span>${t}${sep}</span>`).join(''); el.innerHTML = html + html; };
fill($('#nameMarquee'), Array(6).fill('Raick Silva'), ' <i>•</i>');
fill($('#techMarquee'), ['TypeScript', 'React', 'Next.js', 'React Native', 'Swift', 'SwiftUI', 'Python', 'PostgreSQL', 'Supabase', 'Docker', 'Claude Code', 'Codex', 'MCP', 'Astro', 'Bubble', 'Xano', 'SQLite', 'Git'], '<i>•</i>');

/* ---------- hero particles ---------- */
const hero = (() => {
  const canvas = $('#particles');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100); camera.position.z = 6;
  const N = innerWidth < 900 ? 7000 : 16000;
  const sphere = new Float32Array(N * 3), scatter = new Float32Array(N * 3), rnd = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = i * 2.399963;
    const R = 1.55 + (Math.random() - .5) * 0.06;
    sphere.set([Math.cos(t) * r * R, y * R, Math.sin(t) * r * R], i * 3);
    const u = Math.random() * 6.283, v = Math.acos(2 * Math.random() - 1), d = 4 + Math.random() * 7;
    scatter.set([Math.sin(v) * Math.cos(u) * d, Math.sin(v) * Math.sin(u) * d, Math.cos(v) * d - 2], i * 3);
    rnd[i] = Math.random();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(sphere, 3));
  g.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3));
  g.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 1));
  g.setAttribute('aPortrait', new THREE.BufferAttribute(new Float32Array(sphere), 3));
  g.setAttribute('aBright', new THREE.BufferAttribute(new Float32Array(N).fill(1), 1));
  const uniforms = { uTime: { value: 0 }, uGather: { value: 0 }, uExplode: { value: 0 }, uPortrait: { value: 0 }, uMouse: { value: new THREE.Vector3(9, 9, 0) }, uPx: { value: renderer.getPixelRatio() } };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform float uTime,uGather,uExplode,uPx,uPortrait; uniform vec3 uMouse;
      attribute vec3 aScatter, aPortrait; attribute float aRnd, aBright; varying float vA; varying float vT;
      void main(){
        vec3 p = position;
        float n = sin(p.y*3.1+uTime*.9+aRnd*6.)*.5+sin(p.x*2.7-uTime*.7)*.5;
        p *= 1. + n*.045;
        float ca=cos(uTime*.12), sa=sin(uTime*.12); p.xz = mat2(ca,-sa,sa,ca)*p.xz;
        vec3 pp = aPortrait + vec3(sin(uTime*.8+aRnd*40.)*.012, cos(uTime*.7+aRnd*30.)*.012, sin(uTime*.5+aPortrait.y*3.)*.05);
        p = mix(p, pp, uPortrait);
        vec3 q = mix(aScatter, p, smoothstep(0.,1.,clamp(uGather*1.25-aRnd*.25,0.,1.)));
        q = mix(q, q*2.6 + vec3(0.,0.,1.5)*aRnd, uExplode);
        vec3 d = q - uMouse; float m = smoothstep(.9,0.,length(d.xy)); q += normalize(d+1e-4)*m*.35;
        vec4 mv = modelViewMatrix*vec4(q,1.);
        gl_Position = projectionMatrix*mv;
        gl_PointSize = mix(1.6+aRnd*1.6, 1.3+aBright*1.9, uPortrait)*uPx*(6./-mv.z);
        vA = mix(smoothstep(-1.6,1.6,q.z)*.85+.15, .18+aBright*.82, uPortrait); vT = aRnd;
      }`,
    fragmentShader: `
      varying float vA; varying float vT;
      void main(){ float d=length(gl_PointCoord-.5); if(d>.5) discard;
        vec3 c = mix(vec3(.93,.93,.95), vec3(.55,.56,1.), step(.86,vT));
        gl_FragColor = vec4(c, vA*(1.-d*2.)*.9); }`,
  });
  const pts = new THREE.Points(g, mat); scene.add(pts);
  const ndc = new THREE.Vector2(9, 9), ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
  addEventListener('pointermove', (e) => { ndc.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); });
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    pts.position.x = w > 900 ? -1.35 : 0; pts.position.y = w > 900 ? 0.15 : 0.5; pts.scale.setScalar(w > 900 ? 1 : 0.56);
  };
  resize(); addEventListener('resize', resize);
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  const clockT = new THREE.Clock();
  const loop = () => {
    requestAnimationFrame(loop); if (!visible) return;
    uniforms.uTime.value = clockT.getElapsedTime();
    ray.setFromCamera(ndc, camera); ray.ray.intersectPlane(plane, hit);
    if (hit) { hit.sub(pts.position).divideScalar(pts.scale.x); uniforms.uMouse.value.lerp(hit, .12); }
    renderer.render(scene, camera);
  };
  loop();
  ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true, onUpdate: (s) => { uniforms.uExplode.value = s.progress; } });
  // retrato em partículas (amostra os pixels claros do rosto, como no inacionakiti.com)
  const img = new Image();
  img.onload = () => {
    const w = img.width, h = img.height, c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true }); ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, w, h).data, cand = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const k = (y * w + x) * 4, l = (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;
      const wt = Math.pow(Math.min(1, Math.max(0, (l - 0.255) / 0.5)), 0.8); if (wt > 0) cand.push(x, y, wt);
    }
    if (!cand.length) return;
    const H3 = 3.9, W3 = H3 * w / h, port = g.attributes.aPortrait.array, br = g.attributes.aBright.array;
    for (let i = 0; i < N; i++) {
      let j; do { j = (Math.random() * cand.length / 3 | 0) * 3; } while (Math.random() > cand[j + 2] * 0.9 + 0.1);
      const x = cand[j] + Math.random() - .5, y = cand[j + 1] + Math.random() - .5, b = cand[j + 2];
      port[i * 3] = (x / w - .5) * W3; port[i * 3 + 1] = -(y / h - .5) * H3; port[i * 3 + 2] = (b - .5) * .35 + (Math.random() - .5) * .08;
      br[i] = b;
    }
    g.attributes.aPortrait.needsUpdate = true; g.attributes.aBright.needsUpdate = true;
    gsap.to(uniforms.uPortrait, { value: 1, duration: reduce ? 0 : 2.2, ease: 'power3.inOut', delay: uniforms.uGather.value > .5 ? 0 : 1.6 });
  };
  img.src = 'img/retrato-particulas.jpg';
  return { gather: () => gsap.to(uniforms.uGather, { value: 1, duration: reduce ? 0 : 2.6, ease: 'power3.out' }) };
})();

/* ---------- loader + intro ---------- */
(() => {
  const n = { v: 0 }, el = $('#count');
  gsap.set('.hero h1, .hero-copy p, .hero-ctas, .hero-clock, .nav', { autoAlpha: 0, y: 20 });
  gsap.timeline()
    .to(n, { v: 100, duration: reduce ? 0.1 : 1.8, ease: 'power2.inOut', onUpdate: () => { el.textContent = Math.round(n.v); } })
    .to('#loader', { yPercent: -100, duration: reduce ? 0 : 1, ease: 'expo.inOut' }, '+=.15')
    .add(() => { document.body.classList.remove('is-loading'); lenis?.start(); hero.gather(); $('#loader').remove(); }, '-=.5')
    .to('.nav', { autoAlpha: 1, y: 0, duration: .8 }, '-=.2')
    .to('.hero h1, .hero-copy p, .hero-ctas, .hero-clock', { autoAlpha: 1, y: 0, duration: 1, stagger: .1, ease: 'power3.out' }, '-=.4');
})();

/* ---------- cine: zoom-out + palavras ---------- */
if (!reduce) {
  gsap.to('.cine img', { scale: 1, ease: 'none', scrollTrigger: { trigger: '.cine', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.cine-word', { y: 60, autoAlpha: 0, stagger: .12, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.cine', start: 'top 55%' } });
}

/* ---------- about: word reveal + counters ---------- */
(() => {
  const p = $('.about-lede');
  const wrap = (node) => {
    [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((w) => { if (!w) return; if (/^\s+$/.test(w)) frag.append(w); else { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; frag.append(s); } });
        c.replaceWith(frag);
      } else wrap(c);
    });
  };
  let tw = null;
  const setup = () => {
    tw?.scrollTrigger?.kill(); tw?.kill(); wrap(p);
    if (reduce) { $$('.w', p).forEach((w) => (w.style.opacity = 1)); return; }
    tw = gsap.to($$('.w', p), { opacity: 1, stagger: .05, ease: 'none', scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  };
  setup(); document.addEventListener('langchange', setup);

  $$('.count').forEach((c) => {
    const o = { v: 0 }, to = +c.dataset.to;
    ScrollTrigger.create({ trigger: c, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: to, duration: reduce ? 0 : 1.6, ease: 'power2.out', onUpdate: () => { c.textContent = Math.round(o.v); } }) });
  });
})();

/* ---------- pinned stepper helper ---------- */
function stepper(section, count, onStep, perStep = 70) {
  let cur = -1;
  const set = (i) => { if (i === cur) return; cur = i; onStep(i); };
  set(0);
  ScrollTrigger.matchMedia({
    '(min-width: 901px)': () => {
      const st = ScrollTrigger.create({ trigger: section, start: 'top top', end: `+=${count * perStep}%`, pin: section.querySelector('.pin-wrap'), pinSpacing: true,
        onUpdate: (s) => set(Math.min(count - 1, Math.floor(s.progress * count))) });
      return () => { st.kill(); set(0); };
    },
  });
  return (i) => { const st = ScrollTrigger.getAll().find((t) => t.trigger === section); if (!st) return set(i); scrollTo(st.start + (i + .5) / count * (st.end - st.start)); };
}

/* services */
(() => {
  const sec = $('#servicos'), items = $$('.svc-item', sec), vis = $$('.vis', sec), tabs = $$('.svc-tabs button', sec);
  const go = stepper(sec, items.length, (i) => { [items, vis, tabs].forEach((g) => g.forEach((el, k) => el.classList.toggle('is-on', k === i))); });
  tabs.forEach((b, i) => b.addEventListener('click', () => go(i)));
})();

/* process */
(() => {
  const sec = $('#processo'), steps = $$('.ps', sec), pv = $$('.pv', sec);
  stepper(sec, steps.length, (i) => { steps.forEach((el, k) => el.classList.toggle('is-on', k === i)); pv.forEach((el, k) => el.classList.toggle('is-on', k === i)); });
  const wave = $('#wave'), bars = [];
  for (let i = 0; i < 64; i++) { const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); r.setAttribute('x', i * 6.25 + 1); r.setAttribute('width', 3); r.setAttribute('rx', 1.5); wave.append(r); bars.push(r); }
  const anim = (t) => { bars.forEach((r, i) => { const env = Math.exp(-Math.pow((i - 32) / 14, 2)); const h = 6 + env * 150 * (0.45 + 0.55 * Math.abs(Math.sin(t * .003 + i * .55) * Math.cos(t * .0017 + i * .21))); r.setAttribute('y', 100 - h / 2); r.setAttribute('height', h); }); if (!reduce) requestAnimationFrame(anim); };
  requestAnimationFrame(anim);
})();

/* ---------- curved 3D gallery ---------- */
(() => {
  const sec = $('#trabalho'), canvas = $('#gallery');
  const items = $$('#workList a').map((a) => ({ href: a.href, name: a.textContent, desc: a.dataset.desc, descEn: a.dataset.descEn, img: a.dataset.img }));
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(55, 1, .1, 100);
  const R = 7.2, W = 3.9, H = W * 0.625, GAP = 0.32, STEP = (W + GAP) / R;
  const group = new THREE.Group(); scene.add(group);
  const loader = new THREE.TextureLoader();
  const meshes = items.map((it, i) => {
    const geo = new THREE.PlaneGeometry(W, H, 32, 1); const pos = geo.attributes.position;
    for (let k = 0; k < pos.count; k++) { const x = pos.getX(k), a = x / R; pos.setXYZ(k, Math.sin(a) * R, pos.getY(k), R - Math.cos(a) * R); }
    geo.computeVertexNormals();
    const mat = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
    loader.load(it.img, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; mat.map = t; mat.needsUpdate = true; });
    const m = new THREE.Mesh(geo, mat);
    const pivot = new THREE.Group(); pivot.rotation.y = -i * STEP; m.position.z = -R; pivot.add(m); group.add(pivot);
    m.userData.i = i; return m;
  });
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.fov = w < 700 ? 75 : 52; camera.updateProjectionMatrix();
  };
  resize(); addEventListener('resize', resize);

  const total = (items.length - 1) * STEP;
  let target = 0, current = 0, drag = null, active = -1, hovered = -1;
  const ui = { name: $('#wkName'), desc: $('#wkDesc'), link: $('#wkLink'), idx: $('#wkIdx') };
  const setActive = (i) => {
    if (i === active) return; active = i; const it = items[i];
    gsap.fromTo([ui.name, ui.desc], { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .45, stagger: .05 });
    ui.name.textContent = it.name; ui.desc.textContent = document.documentElement.lang === 'en' ? it.descEn : it.desc; ui.link.href = it.href; ui.idx.textContent = `${String(i + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  };
  setActive(0);
  document.addEventListener('langchange', () => { const a = active; active = -1; setActive(Math.max(0, a)); });
  const st = ScrollTrigger.create({ trigger: sec, start: 'top top', end: `+=${items.length * 55}%`, pin: sec.querySelector('.pin-wrap'), scrub: true,
    onUpdate: (s) => { if (!drag) target = s.progress * total; } });

  canvas.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, t: target, moved: false }; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => {
    if (drag) { const dx = e.clientX - drag.x; if (Math.abs(dx) > 4) drag.moved = true; target = gsap.utils.clamp(0, total, drag.t - dx / canvas.clientWidth * 2.2); }
    ndc.set(e.offsetX / canvas.clientWidth * 2 - 1, -(e.offsetY / canvas.clientHeight) * 2 + 1);
  });
  const endDrag = () => {
    if (!drag) return; const moved = drag.moved; drag = null;
    const snapI = Math.round(target / STEP); target = snapI * STEP;
    const y = st.start + (target / total) * (st.end - st.start); lenis ? lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
    if (!moved && hovered >= 0) { if (hovered === active) open(items[hovered].href); else { target = hovered * STEP; scrollTo(st.start + (target / total) * (st.end - st.start)); } }
  };
  canvas.addEventListener('pointerup', endDrag); canvas.addEventListener('pointercancel', () => { drag = null; });
  canvas.addEventListener('pointerleave', () => { ndc.set(9, 9); });
  const ndc = new THREE.Vector2(9, 9), ray = new THREE.Raycaster();

  let visible = false; new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  const loop = () => {
    requestAnimationFrame(loop); if (!visible) return;
    current += (target - current) * 0.08;
    group.rotation.y = current;
    setActive(Math.round(current / STEP));
    ray.setFromCamera(ndc, camera); const hit = ray.intersectObjects(meshes)[0];
    hovered = hit ? hit.object.userData.i : -1; canvas.classList.toggle('hovering', hovered >= 0);
    meshes.forEach((m, i) => { const d = Math.abs(i * STEP - current) / STEP; const c = 1 - Math.min(d, 1.5) * 0.42 + (i === hovered ? .08 : 0); m.material.color.setScalar(Math.min(1, c)); });
    renderer.render(scene, camera);
  };
  loop();
})();

/* ---------- products accordion ---------- */
(() => {
  const items = $$('.acc-item');
  const openIt = (it) => items.forEach((x) => x.classList.toggle('is-open', x === it));
  items.forEach((it) => {
    it.addEventListener('mouseenter', () => { if (isDesktop()) openIt(it); });
    it.addEventListener('click', () => openIt(it));
    it.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openIt(it); } });
  });
})();

/* ---------- experience: year counter ---------- */
(() => {
  const yr = $('#yr'), lbl = $('#yrLabel'), o = { v: 2021 };
  $$('.exp-list li').forEach((li) => {
    ScrollTrigger.create({ trigger: li, start: 'top 62%', end: 'bottom 62%',
      onToggle: (s) => {
        if (!s.isActive) return;
        $$('.exp-list li').forEach((x) => x.classList.toggle('is-on', x === li || (x.compareDocumentPosition(li) & Node.DOCUMENT_POSITION_FOLLOWING)));
        const to = +li.dataset.y;
        gsap.to(o, { v: to, duration: .8, ease: 'power2.out', onUpdate: () => { yr.textContent = Math.round(o.v); lbl.textContent = `${ui('year')} ${Math.round(o.v) - 2020}`; } });
      } });
  });
  $$('.exp-list li')[0].classList.add('is-on');
})();

/* ---------- section reveals ---------- */
if (!reduce) {
  $$('.big, .exp-lede, .motto h2, .stats > div, .contact-row a').forEach((el) => {
    gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
}
addEventListener('load', () => ScrollTrigger.refresh());
initLang({ promptDelay: 3200 });
document.addEventListener('langchange', () => { $('#yrLabel').textContent = `${ui('year')} ${+$('#yr').textContent - 2020}`; requestAnimationFrame(() => ScrollTrigger.refresh()); });
