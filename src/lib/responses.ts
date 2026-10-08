/** Text responses with an explicit UTF-8 charset (so ñ, á, ¿ render everywhere). */
export function text(body: string, type: string): Response {
  return new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });
}
