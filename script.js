const i18n = {
  de: {
    soon: 'Bald verfügbar',
    headline: 'Premium: Qualität statt Masse',
    vip: 'Die Bewerbung ist ab sofort möglich! Die ersten 10 Kunden werden automatisch VIP-Kunden und genießen zusätzliche Vorteile.',
    contact: 'Vorab-Bewerbung per E-Mail:'
  },
  it: {
    soon: 'Prossimamente',
    headline: 'Premium: qualità, non quantità',
    vip: 'Le candidature sono già aperte! I primi 10 clienti diventeranno automaticamente clienti VIP e godranno di vantaggi extra.',
    contact: 'Pre-candidatura via e-mail:'
  },
  en: {
    soon: 'Coming soon',
    headline: 'Premium: quality over quantity',
    vip: 'Applications are now open! The first 10 clients will automatically become VIP clients and enjoy extra benefits.',
    contact: 'Pre-apply by email:'
  }
};
const themes = [
  { id: '1', name: 'Alpine Ivory', logo: 'assets/logos/Logo-1.png', color: '#F4EFE6' },
  { id: '2', name: 'Forest Reserve', logo: 'assets/logos/Logo-2.png', color: '#263D32' },
  { id: '3', name: 'Heritage White', logo: 'assets/logos/Logo-3.png', color: '#F7F5F0' },
  { id: '4', name: 'Warm Sand', logo: 'assets/logos/Logo-4.png', color: '#EEDDC8' }
];
const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) { return null; } };
const logo = document.getElementById('logo');
const wordmark = document.getElementById('wordmark');
const themeBox = document.getElementById('themes');

logo.addEventListener('load', () => { logo.hidden = false; wordmark.hidden = true; });
logo.addEventListener('error', () => { logo.hidden = true; wordmark.hidden = false; });

function setLang(lang) {
  if (!i18n[lang]) lang = 'de';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = i18n[lang][el.dataset.i18n]; });
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  store('lang', lang);
}
function setTheme(id) {
  const t = themes.find(x => x.id === id) || themes[0];
  document.documentElement.dataset.theme = t.id;
  logo.src = t.logo;
  themeBox.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.theme === t.id));
  store('theme', t.id);
}

themes.forEach(t => {
  const b = document.createElement('button');
  b.type = 'button';
  b.dataset.theme = t.id;
  b.style.background = t.color;
  b.setAttribute('aria-label', t.name + ' theme');
  b.title = t.name;
  b.addEventListener('click', () => setTheme(t.id));
  themeBox.appendChild(b);
});
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

setLang(store('lang') || ((navigator.language || 'de').slice(0, 2)));
setTheme(store('theme') || '1');
