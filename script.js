const i18n = {
  de: {
    soon: 'Bald verfügbar',
    headline: 'Zurück zur Natur – echtes Wohlbefinden für Hunde',
    status: 'Bewerbungen ab sofort möglich.'
  },
  it: {
    soon: 'Prossimamente',
    headline: 'Ritorno alla natura – vero benessere per i cani',
    status: 'Candidature aperte.'
  },
  en: {
    soon: 'Coming soon',
    headline: 'Back to nature - real dog wellness',
    status: 'Application now open.'
  }
};
const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) { return null; } };

function setLang(lang) {
  if (!i18n[lang]) lang = 'de';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = i18n[lang][el.dataset.i18n]; });
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  store('lang', lang);
}

document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

setLang(store('lang') || ((navigator.language || 'de').slice(0, 2)));
