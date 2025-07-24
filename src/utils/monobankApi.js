// Утилітарні функції для роботи з MonoBank API

/**
 * Функція для отримання даних донатів з MonoBank віджета
 * Використовує різні методи для обходу CORS обмежень
 */
export const fetchMonoBankDonations = async () => {
  const widgetUrls = [
    // Горизонтальний прогрес віджет з українською тематикою
    'https://send.monobank.ua/widget.html?jar=pb2BxUAnZmAq4Koj1K4eXHZoTGmKw9k&sendId=85Ui7vsyCD&type=lhp&textScheme=black&colorScheme=ukraine&shapeScheme=parallelogram&progressScheme=inset',
    // QR код + прогрес
    'https://send.monobank.ua/widget.html?jar=pb2BxUAnZmAq4Koj1K4eXHZoTGmKw9k&sendId=85Ui7vsyCD&type=qrp&colorScheme=black'
  ];

  // Список публічних CORS proxy сервісів
  const corsProxies = [
    'https://api.allorigins.win/get?url=',
    'https://api.codetabs.com/v1/proxy?quest=',
    'https://cors-anywhere.herokuapp.com/',
    'https://thingproxy.freeboard.io/fetch/'
  ];

  for (const widgetUrl of widgetUrls) {
    for (const proxy of corsProxies) {
      try {
        const response = await fetch(proxy + encodeURIComponent(widgetUrl), {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache'
          },
          timeout: 10000 // 10 секунд таймаут
        });

        if (response.ok) {
          let html = await response.text();
          
          // Якщо використовуємо allorigins, витягуємо contents
          if (proxy.includes('allorigins')) {
            const data = JSON.parse(html);
            html = data.contents;
          }

          const parsedData = parseMonoBankWidget(html);
          if (parsedData && parsedData.currentAmount > 0) {
            return parsedData;
          }
        }
      } catch (error) {
        console.log(`Failed to fetch from ${proxy}:`, error.message);
        continue;
      }
    }
  }

  // Якщо всі методи не спрацювали, повертаємо null
  return null;
};

/**
 * Парсинг HTML віджета MonoBank для витягнення суми донатів
 */
export const parseMonoBankWidget = (html) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Список можливих селекторів для суми
    const selectors = [
      '[class*="amount"]',
      '[class*="sum"]',
      '[class*="collected"]',
      '[class*="progress"]',
      '[id*="amount"]',
      '[id*="sum"]',
      '.amount',
      '.sum',
      '.collected',
      '#amount',
      '#sum'
    ];

    // Шукаємо суму в елементах DOM
    for (const selector of selectors) {
      const elements = doc.querySelectorAll(selector);
      for (const element of elements) {
        const text = element.textContent || element.innerText || '';
        const amount = extractAmountFromText(text);
        if (amount > 0) {
          return { 
            currentAmount: amount,
            source: 'DOM',
            selector: selector 
          };
        }
      }
    }

    // Шукаємо суму в JavaScript коді
    const scripts = doc.getElementsByTagName('script');
    for (const script of scripts) {
      const content = script.textContent || script.innerHTML || '';
      
      // Різні патерни для пошуку суми в JS
      const patterns = [
        /amount["\']?\s*:\s*["\']?(\d+(?:[\.,]\d+)?)/gi,
        /sum["\']?\s*:\s*["\']?(\d+(?:[\.,]\d+)?)/gi,
        /collected["\']?\s*:\s*["\']?(\d+(?:[\.,]\d+)?)/gi,
        /progress["\']?\s*:\s*["\']?(\d+(?:[\.,]\d+)?)/gi,
        /"amount"\s*:\s*(\d+(?:[\.,]\d+)?)/gi,
        /"sum"\s*:\s*(\d+(?:[\.,]\d+)?)/gi
      ];

      for (const pattern of patterns) {
        const matches = content.matchAll(pattern);
        for (const match of matches) {
          const amount = parseFloat(match[1].replace(',', '.'));
          if (amount > 0) {
            return { 
              currentAmount: amount,
              source: 'JavaScript',
              pattern: pattern.toString()
            };
          }
        }
      }
    }

    // Шукаємо суму в тексті сторінки
    const bodyText = doc.body?.textContent || doc.documentElement?.textContent || '';
    const amount = extractAmountFromText(bodyText);
    if (amount > 0) {
      return { 
        currentAmount: amount,
        source: 'bodyText'
      };
    }

    return null;
  } catch (error) {
    console.error('Помилка парсингу віджета MonoBank:', error);
    return null;
  }
};

/**
 * Витягнення суми з тексту
 */
const extractAmountFromText = (text) => {
  if (!text || typeof text !== 'string') return 0;

  // Патерни для пошуку сум у різних форматах
  const patterns = [
    /(\d{1,3}(?:[\s,]\d{3})*(?:[\.,]\d{2})?)\s*(?:грн|UAH|₴)/gi,
    /₴\s*(\d{1,3}(?:[\s,]\d{3})*(?:[\.,]\d{2})?)/gi,
    /(\d+(?:[\.,]\d+)?)\s*(?:грн|UAH)/gi,
    /(\d+[\.,]?\d*)/g
  ];

  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      let amount = match[1].replace(/\s/g, '').replace(',', '.');
      amount = parseFloat(amount);
      
      // Фільтруємо суми, які виглядають як реальні донати (від 1 до 100000 грн)
      if (amount >= 1 && amount <= 100000) {
        return amount;
      }
    }
  }

  return 0;
};

/**
 * Кешування результатів для зменшення навантаження на API
 */
const cache = new Map();
const CACHE_DURATION = 60000; // 1 хвилина

export const getCachedDonations = async () => {
  const cacheKey = 'monobank_donations';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetchMonoBankDonations();
  if (data) {
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  return data;
};
