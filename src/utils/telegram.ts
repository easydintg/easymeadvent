// Проверка, открыт ли WebApp в Telegram
export function isTelegramWebApp() {
  return typeof window !== "undefined" && (window as any).Telegram?.WebApp;
}

// Инициализация Telegram WebApp
export function initTelegramWebApp() {
  const tg = (window as any).Telegram.WebApp;

  if (tg && tg.ready) {
    tg.ready();
    tg.expand();
    tg.disableVerticalSwipes?.();
  }
}

// Получение пользователя
export function getTelegramUser() {
  const tg = (window as any).Telegram?.WebApp;

  if (!tg) return null;

  try {
    return tg.initDataUnsafe?.user || null;
  } catch (e) {
    console.warn("Ошибка чтения initData", e);
    return null;
  }
}
