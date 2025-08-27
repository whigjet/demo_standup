import { useState, useEffect } from 'react';
import type { TelegramWebApp, TelegramUser } from '../types/telegram';

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isTelegramEnv, setIsTelegramEnv] = useState(false);

  // Моковые данные для демонстрации вне Telegram
  const mockUser: TelegramUser = {
    id: 123456789,
    first_name: 'Демо',
    last_name: 'Пользователь',
    username: 'demo_user',
    is_premium: true,
    photo_url: 'https://via.placeholder.com/150/3498db/ffffff?text=Demo'
  };

  useEffect(() => {
    const initTelegram = () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        setWebApp(tg);
        setIsTelegramEnv(true);
        
        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user);
        }
        
        tg.ready();
        setIsReady(true);
        
        tg.expand();
        
        tg.setHeaderColor('#2c3e50');
        tg.setBackgroundColor('#f8f9fa');
      } else {
        // Fallback для демонстрации вне Telegram
        setUser(mockUser);
        setIsReady(true);
        setIsTelegramEnv(false);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTelegram);
    } else {
      initTelegram();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', initTelegram);
    };
  }, []);

  const showAlert = (message: string) => {
    if (webApp) {
      webApp.showAlert(message);
    } else {
      // Fallback для браузера
      alert(message);
    }
  };

  const showConfirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (webApp) {
        webApp.showConfirm(message, (confirmed) => {
          resolve(confirmed);
        });
      } else {
        // Fallback для браузера
        resolve(confirm(message));
      }
    });
  };

  const hapticFeedback = {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
      if (webApp) {
        webApp.HapticFeedback.impactOccurred(style);
      }
      // В браузере haptic feedback игнорируется
    },
    notificationOccurred: (type: 'error' | 'success' | 'warning' = 'success') => {
      if (webApp) {
        webApp.HapticFeedback.notificationOccurred(type);
      }
      // В браузере haptic feedback игнорируется
    },
    selectionChanged: () => {
      if (webApp) {
        webApp.HapticFeedback.selectionChanged();
      }
      // В браузере haptic feedback игнорируется
    }
  };

  const mainButton = {
    show: (text: string, callback?: () => void) => {
      if (webApp) {
        webApp.mainButton.setText(text);
        if (callback) {
          webApp.mainButton.onClick(callback);
        }
        webApp.mainButton.show();
      }
      // В браузере main button игнорируется
    },
    hide: () => {
      if (webApp) {
        webApp.mainButton.hide();
      }
    },
    setText: (text: string) => {
      if (webApp) {
        webApp.mainButton.setText(text);
      }
    },
    enable: () => {
      if (webApp) {
        webApp.mainButton.enable();
      }
    },
    disable: () => {
      if (webApp) {
        webApp.mainButton.disable();
      }
    }
  };

  return {
    webApp,
    user,
    isReady,
    isTelegramEnv,
    showAlert,
    showConfirm,
    hapticFeedback,
    mainButton
  };
};
