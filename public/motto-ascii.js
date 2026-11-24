// Motto background: flowing ASCII field (ref: Scrolltide "ASCII Flow"), own 2D-canvas implementation.
const flow = (x, y, t) => {
  const a = Math.sin(x * .9 + t * .5 + Math.sin(y * 1.3 - t * .3) * 1.6);
  const b = Math.sin(y * 1.1 - t * .4 + Math.sin(x * .7 + t * .25) * 1.8);
  const c = Math.sin((x + y) * .6 + t * .35);
  return (a + b + c) / 6 + .5;
};
const RAMP = ' .·:-=+*%#@', CELL = 14;

export function initMottoAscii({ reduce }) {
  const sec = document.querySelector('.motto'), c = sec.querySelector('.motto-bg'), x = c.getContext('2d');
  let cols = 0, rows = 0, w = 0, h = 0;
  const resize = () => {
    const r = sec.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2);
    w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.font = `500 ${CELL - 2}px ui-monospace,"SF Mono",Menlo,monospace`; x.textBaseline = 'top';
    cols = Math.ceil(w / CELL); rows = Math.ceil(h / (CELL * 1.25));
  };
  const draw = (t) => {
    x.clearRect(0, 0, w, h);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const v = flow(i * .09, j * .16, t), k = Math.min(RAMP.length - 1, Math.floor(Math.pow(v, 1.6) * RAMP.length));
      if (!k) continue;
      x.fillStyle = v > .84 ? `rgba(138,140,255,${.55 + (v - .84) * 3})` : `rgba(242,241,238,${.10 + v * .32})`;
      x.fillText(RAMP[k], i * CELL, j * CELL * 1.25);
    }
  };
  resize();
  new ResizeObserver(() => { resize(); if (reduce) draw(8); }).observe(sec); // section height also changes with language
  if (reduce) return draw(8);
  let vis = false, last = 0;
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(sec);
  const t0 = performance.now();
  const loop = (now) => { requestAnimationFrame(loop); if (!vis || now - last < 33) return; last = now; draw((now - t0) / 1000); };
  requestAnimationFrame(loop);
}
