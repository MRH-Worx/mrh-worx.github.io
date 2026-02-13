(function () {
  const THEME_KEY = 'mrhWorxBaysideMode';

  function setTheme(isEnabled) {
    const body = document.body;
    if (!body) return;
    body.classList.toggle('saved-by-bell', isEnabled);
    const toggle = document.querySelector('.saved-by-bell-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isEnabled));
      toggle.setAttribute('data-mode', isEnabled ? 'rad' : 'chill');
    }
  }

  function persistTheme(isEnabled) {
    try {
      window.localStorage.setItem(THEME_KEY, isEnabled ? '1' : '0');
    } catch (_) {
      /* ignore private mode blockers */
    }
  }

  function readTheme() {
    try {
      return window.localStorage.getItem(THEME_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function initToggle() {
    const toggle = document.querySelector('.saved-by-bell-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      const isEnabled = !document.body.classList.contains('saved-by-bell');
      setTheme(isEnabled);
      persistTheme(isEnabled);
    });

    toggle.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle.click();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const isEnabled = readTheme();
    setTheme(isEnabled);
    initToggle();
  });
})();
