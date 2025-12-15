export default async (request) => {
  const url = new URL(request.url);
  const targetParam = url.searchParams.get('url');
  
  if (!targetParam) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), { status: 400 });
  }
  
  // Декодуємо URL
  let targetUrl;
  try {
    targetUrl = decodeURIComponent(targetParam);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid url' }), { status: 400 });
  }
  
  // Перевірка хоста (безпека)
  const ALLOWED_HOSTS = ['sunrise.bubble.wtf', 'bubble.wtf'];
  const targetHost = new URL(targetUrl).hostname;
  
  if (!ALLOWED_HOSTS.some(host => targetHost.includes(host))) {
    return new Response(JSON.stringify({ error: 'Host not allowed' }), { status: 403 });
  }

  // Визначаємо корінь сайту (Origin)
  // Наприклад, для "http://sunrise.bubble.wtf:40010/api/shop"
  // Origin буде "http://sunrise.bubble.wtf:40010"
  const targetOrigin = new URL(targetUrl).origin;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Netlify Proxy)',
        'Accept': request.headers.get('Accept') || '*/*',
      },
    });
    
    const contentType = response.headers.get('Content-Type') || '';

    // Якщо це HTML, CSS або JS - треба переписати посилання всередині
    if (contentType.includes('text/html') || contentType.includes('javascript') || contentType.includes('css')) {
      let text = await response.text();
      
      // Створюємо URL для проксування кореня сайту
      // Це потрібно для файлів типу src="/img/logo.png"
      const proxyRootUrl = `/map-proxy?url=${encodeURIComponent(targetOrigin)}/`;

      // 1. Замінюємо повні абсолютні шляхи (http://site:port -> /map-proxy...)
      text = text.replace(
        new RegExp(targetOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        `/map-proxy?url=${encodeURIComponent(targetOrigin)}`
      );

      // 2. Замінюємо шляхи від кореня (src="/..." -> src="/map-proxy?url=origin/...")
      // Це критично важливо, бо сайт на /api/shop скоріше за все тягне стилі з /css/...
      text = text.replace(
        /(src|href|action|poster)="\/(?!\/)/g, 
        `$1="${proxyRootUrl}`
      );
      
      // 3. Замінюємо шляхи в CSS (url('/...'))
      text = text.replace(
        /url\(['"]?\/(?!\/)/g,
        `url('${proxyRootUrl}`
      );

      return new Response(text, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache' // Не кешувати, щоб бачити зміни
        }
      });
    }
    
    // Для картинок та інших файлів - просто віддаємо як є
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: 'Upstream error', details: error.message }), { status: 502 });
  }
};

export const config = {
  path: "/map-proxy"
};