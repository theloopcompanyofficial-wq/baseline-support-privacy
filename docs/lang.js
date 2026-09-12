const panels = document.querySelectorAll('[data-lang]');
  const buttons = { en: document.getElementById('btn-en'), it: document.getElementById('btn-it') };

  function show(lang) {
    panels.forEach(panel => {
      const on = panel.dataset.lang === lang;
      panel.classList.toggle('on', on);
      // The footer's inline spans need the same switch without becoming blocks.
      if (panel.tagName === 'SPAN') panel.style.display = on ? 'inline' : 'none';
    });
    Object.entries(buttons).forEach(([key, button]) => button.setAttribute('aria-pressed', String(key === lang)));
    document.documentElement.lang = lang;
    try { localStorage.setItem('baseline-privacy-lang', lang); } catch (e) { /* private windows have no storage */ }
  }

  let initial = 'en';
  try {
    const saved = localStorage.getItem('baseline-privacy-lang');
    if (saved === 'en' || saved === 'it') initial = saved;
    else if ((navigator.language || '').toLowerCase().startsWith('it')) initial = 'it';
  } catch (e) {
    if ((navigator.language || '').toLowerCase().startsWith('it')) initial = 'it';
  }
  show(initial);

  buttons.en.addEventListener('click', () => show('en'));
  buttons.it.addEventListener('click', () => show('it'));
