// netlify/edge-functions/map-proxy.js
export default async (request) => {
  const url = new URL(request.url);
  const targetPath = url.pathname.replace('/map-proxy', '') || '/';
  const targetSearch = url.search;
  
  // Основний URL карти
  const MAP_BASE_URL = 'http://map.m4sub.click';
  const targetUrl = `${MAP_BASE_URL}${targetPath}${targetSearch}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0',
        'Accept': request.headers.get('Accept') || '*/*',
        'Accept-Language': request.headers.get('Accept-Language') || 'en-US,en;q=0.9',
      },
    });
    
    // Отримуємо content-type
    const contentType = response.headers.get('Content-Type') || 'text/html';
    
    // Для HTML контенту - переписуємо URL
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // Переписуємо абсолютні URL на проксі
      html = html.replace(
        /http:\/\/map\.m4sub\.click/g, 
        '/map-proxy'
      );
      
      // Також переписуємо відносні URL для коректної роботи
      html = html.replace(
        /(src|href)="\//g,
        '$1="/map-proxy/'
      );
      
      return new Response(html, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=60',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    // Для JS файлів - також переписуємо URL
    if (contentType.includes('javascript')) {
      let js = await response.text();
      js = js.replace(
        /http:\/\/map\.m4sub\.click/g, 
        '/map-proxy'
      );
      
      return new Response(js, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    
    // Для інших ресурсів (зображення, JSON, tiles) - просто проксуємо
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
  } catch (error) {
    console.error('Map proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to load map' }), 
      { 
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const config = {
  path: "/map-proxy/*"
};