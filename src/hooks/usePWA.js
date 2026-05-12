// PWA Registration Hook
import { useEffect } from 'react';

export function usePWA() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered:', registration.scope);
          })
          .catch((error) => {
            console.log('SW registration failed:', error);
          });
      });
    }
  }, []);

  // Check for updates
  const checkForUpdates = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const update = await registration.update();
      return update;
    }
    return false;
  };

  // Prompt user to install
  const promptInstall = () => {
    // Will be triggered by user gesture
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
    }
  };

  return { checkForUpdates, promptInstall };
}
