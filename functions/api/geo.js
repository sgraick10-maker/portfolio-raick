// Cloudflare Pages Function: devolve só o país do visitante (ISO-2), lido do próprio Cloudflare.
export const onRequestGet = ({ request }) =>
  new Response(JSON.stringify({ country: request.cf?.country ?? null }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
