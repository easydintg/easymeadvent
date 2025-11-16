alert("КОД ЗАГРУЗИЛСЯ");
console.log("MAIN LOADED");
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// === Добавлено для проверки Telegram WebApp ===
const tg = (window as any).Telegram?.WebApp;

if (!tg) {
  alert("Telegram WebApp не найден. Вы открыли приложение НЕ через Telegram.");
} else {
  const data = tg.initDataUnsafe;
  alert("Telegram initDataUnsafe:\n\n" + JSON.stringify(data, null, 2));
  console.log("Telegram initDataUnsafe:", data);
}
// ==============================================

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
