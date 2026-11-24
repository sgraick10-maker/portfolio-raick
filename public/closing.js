// Closing: full-bleed wordmark (ref: jeppesen.dev, in its Clash Grotesk) + inspect mode under the pointer (ref: Scrolltide "Drop a line").
export function initClosing({ reduce }) {
  const sec = document.getElementById('contato');
  const wm = sec.querySelector('.wm'), span = wm.firstElementChild;
  const fit = () => {
    span.style.fontSize = '100px';
    span.style.fontSize = `${(100 * wm.clientWidth) / span.getBoundingClientRect().width}px`;
  };
  fit();
  addEventListener('resize', fit);
  document.fonts.load('700 100px "Clash Grotesk"').catch(() => {}).finally(() => { fit(); ScrollTrigger.refresh(); });
  if (!reduce) gsap.from(span, { yPercent: 60, ease: 'none', scrollTrigger: { trigger: wm, start: 'top bottom', end: 'bottom bottom', scrub: true } });

  if (!matchMedia('(hover: hover)').matches) return;
  const layer = document.createElement('div'), box = document.createElement('div'), tag = document.createElement('span');
  layer.className = 'wm-layer'; box.className = 'wm-inspect'; tag.className = 'wm-tag';
  box.append(tag); layer.append(box); document.body.append(layer);
  const targets = [sec.querySelector('.big'), sec.querySelector('.wm-live'), wm, ...sec.querySelectorAll('.contact-row a, .sec-top, footer')];
  let cur = null;
  const show = (el) => {
    cur = el;
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el === wm ? span : el);
    const fam = cs.fontFamily.split(',')[0].replace(/"/g, '');
    const cls = el.className ? '.' + String(el.className).split(' ')[0] : '';
    tag.innerHTML = `<b>${el.tagName.toLowerCase()}${cls}</b> ${Math.round(r.width)} × ${Math.round(r.height)}<br><span>${fam} ${cs.fontWeight} · ${Math.round(parseFloat(cs.fontSize))}px</span>`;
    Object.assign(box.style, { transform: `translate(${r.left}px,${r.top}px)`, width: `${r.width}px`, height: `${r.height}px`, opacity: 1 });
    box.classList.toggle('below', r.top < 70);
  };
  const hide = () => { cur = null; box.style.opacity = 0; };
  sec.addEventListener('pointermove', (e) => { const el = targets.find((t) => t.contains(e.target)); el ? show(el) : hide(); });
  sec.addEventListener('pointerleave', hide);
  addEventListener('scroll', () => cur && show(cur), { passive: true });
}
