export default async (request) => {
  const url = new URL(request.url);
  const targetParam = url.searchParams.get('url');
  
  if (!targetParam) {
    return new Response(JSON.stringify({ error: 'Missing url' }), { status: 400 });
  }
  
  let targetUrl;
  try {
    targetUrl = decodeURIComponent(targetParam);
    // Додаємо слеш в кінці, якщо його немає, це важливо для відносних шляхів карти
    if (!targetUrl.endsWith('/') && !targetUrl.split('/').pop().includes('.')) {
        targetUrl += '/';
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid url' }), { status: 400 });
  }
  
  // Безпека: дозволяємо тільки ваші домени
  const ALLOWED_HOSTS = [
    'sunrise.bubble.wtf',
    'bubble.wtf',
    'map.m4sub.click' // Можна залишити на майбутнє
  ];
  
  const targetHost = new URL(targetUrl).hostname; // hostname ігнорує порт
  if (!ALLOWED_HOSTS.some(host => targetHost.includes(host))) {
    return new Response(JSON.stringify({ error: 'Host not allowed' }), { status: 403 });
  }
  
  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Netlify Edge Proxy)',
        'Accept': request.headers.get('Accept') || '*/*',
      },
    });
    
    // Отримуємо базову частину URL (наприклад http://sunrise.bubble.wtf:40010)
    const baseUrlObj = new URL(targetUrl);
    const baseOrigin = baseUrlObj.origin; // http://sunrise.bubble.wtf:40010
    
    const contentType = response.headers.get('Content-Type') || '';

    // Якщо це HTML або JS/CSS, нам треба переписати шляхи всередині файлу,
    // щоб вони теж йшли через проксі, а не напряму на HTTP
    if (contentType.includes('text/html') || contentType.includes('javascript') || contentType.includes('css')) {
      let text = await response.text();
      
      // 1. Замінюємо абсолютні посилання на саму себе
      // Було: http://sunrise.bubble.wtf:40010/js/map.js
      // Стало: /map-proxy?url=http%3A%2F%2Fsunrise.bubble.wtf%3A40010%2Fjs%2Fmap.js
      text = text.replace(
        new RegExp(baseOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        `/map-proxy?url=${encodeURIComponent(baseOrigin)}`
      );
      
      // 2. Виправляємо відносні шляхи (src="/js/...")
      // Це складний момент, але для карт зазвичай працює додавання базового URL
      text = text.replace(
        /(src|href|action)="\/(?!\/)/g, 
        `$1="/map-proxy?url=${encodeURIComponent(baseOrigin)}/`
      );
      
      return new Response(text, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Для картинок та інших бінарних даних просто віддаємо як є
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 502 });
  }
};

export const config = {
  path: "/map-proxy"
};