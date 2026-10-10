/* ===== CONFIG =====
   WAITLIST_MODE: while Lena is a demo, every "Create your Lena" CTA on the landing page opens the waitlist form.
   Add ?demo=1 to the URL to reach the onboarding demo instead. */
const WAITLIST_MODE = true;
const WAITLIST_ENDPOINT = 'https://lena-api-production-daf6.up.railway.app/waitlist';

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const SHOT = params.has('shot');
  const app = $('#app');

  /* ---------------- i18n ---------------- */
  const I18N = window.I18N, I18N_SECTORS = window.I18N_SECTORS;
  const LANGS = ['nl', 'fr', 'en'];
  const LOCALE = { nl: 'nl-BE', fr: 'fr-BE', en: 'en-GB' };
  const pickLang = () => {
    const q = (params.get('lang') || '').toLowerCase();
    if (LANGS.includes(q)) return q;
    let st = null; try { st = localStorage.getItem('lena-lang'); } catch (e) {}
    if (LANGS.includes(st)) return st;
    const nav = (navigator.languages && navigator.languages[0] || navigator.language || '').slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : 'nl';
  };
  let LANG = pickLang();
  const frFix = (x) => x.replace(/ ([?!:;»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
  const t = (k, vars) => {
    let x = (I18N[LANG] && I18N[LANG][k] != null) ? I18N[LANG][k] : (I18N.en[k] != null ? I18N.en[k] : k);
    if (vars) x = x.replace(/\{(\w+)\}/g, (m, v) => vars[v] != null ? vars[v] : m);
    return LANG === 'fr' ? frFix(x) : x;
  };
  const textNodes = [], attrNodes = [];
  (function collect() {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => {
      const p = n.parentElement;
      if (!p || p.closest('script,style,svg,textarea,[data-noi18n]')) return NodeFilter.FILTER_REJECT;
      return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    } });
    let n; while ((n = w.nextNode())) { const raw = n.nodeValue; textNodes.push({ n, key: raw.trim().replace(/\s+/g, ' '), pre: raw.match(/^\s*/)[0], post: raw.match(/\s*$/)[0] }); }
    $$('[placeholder],[aria-label],[title]').forEach(el => { if (el.closest('[data-noi18n]') && !el.matches('.lang-switch')) return; ['placeholder', 'aria-label', 'title'].forEach(a => { if (el.hasAttribute(a)) attrNodes.push({ el, a, key: el.getAttribute(a) }); }); });
  })();
  function translateStatic() {
    textNodes.forEach(o => { if (o.n.isConnected) o.n.nodeValue = o.pre + t(o.key) + o.post; });
    attrNodes.forEach(o => o.el.setAttribute(o.a, t(o.key)));
    document.title = t('Timeless X — Lena, your AI receptionist for phone & WhatsApp');
    document.documentElement.lang = LANG;
    $$('.lang-switch').forEach(sw => {
      $$('button', sw).forEach((b, i) => { const on = b.dataset.lang === LANG; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); if (on) sw.style.setProperty('--i', i); });
    });
  }
  translateStatic();

  /* ---------------- sector data ---------------- */
  const SECTORS = {
    realestate: {
      label: 'Real Estate', name: 'Antwerp Homes',
      example: 'We are a real estate agency in Antwerp. We sell apartments and houses. We are open Monday-Friday 9-18. We specialize in first-time buyers.',
      pitch: "I'll answer property questions, qualify buyers and book viewings.",
      tip: '“Can I book a viewing this Saturday?”',
      outcome: 'Viewing booked',
      script: [
        ['lena', "Hi, I'm Lena from {biz}. How can I help you today?"],
        ['caller', "Hi! I saw the two-bedroom apartment on Mechelsesteenweg. Is it still available?"],
        ['lena', "Yes, it is! It's €329,000 with a terrace and a parking spot. Are you buying your first home?"],
        ['caller', "I am, yes. Could I see it this week?"],
        ['lena', "Of course. I have Thursday at 14:30 or Friday at 10:00. Which suits you best?"],
        ['caller', "Thursday at 14:30, please."],
        ['lena', "Perfect, you're booked for Thursday at 14:30. I'll send the details by WhatsApp."],
      ],
      calls: [['phone','Sophie Martens','Asked about 2-bed apartment, Mechelsesteenweg','booked','Viewing booked','18:42'],['message','Tom Janssens','First-time buyer · budget €350k','leadtag','Lead','17:15'],['phone','Unknown caller','Asked about opening hours','info','Answered','16:03'],['phone','Elise Wouters','Wants valuation of her house','leadtag','Lead','14:27']],
      appts: [['THU','15','Viewing · Mechelsesteenweg 12','Sophie Martens','14:30'],['FRI','16','Viewing · Zuid loft','Tom Janssens','10:00'],['SAT','17','Valuation visit','Elise Wouters','11:00']],
    },
    dealer: {
      label: 'Car Dealership', name: 'Ghent Motors',
      example: 'We are a car dealership in Ghent. We sell new and used Volkswagen and Audi models. We are open Monday-Saturday 9-18. Test drives are free and take about 30 minutes.',
      pitch: "I'll answer vehicle questions, book test drives and follow up with leads.",
      tip: '“Can I test drive the Audi Q4 on Saturday?”',
      outcome: 'Test drive booked',
      script: [
        ['lena', "Hi, I'm Lena from {biz}. How can I help you today?"],
        ['caller', "Hi, is the white Audi Q4 e-tron from your website still in stock?"],
        ['lena', "It is! It's a 2024 model with 18,000 km. Would you like to take it for a test drive?"],
        ['caller', "Yes, ideally on Saturday morning."],
        ['lena', "I can do Saturday at 10:00 or 11:30. Which works for you?"],
        ['caller', "10:00 is great."],
        ['lena', "Done! Your test drive is booked for Saturday at 10:00. I'll text you a confirmation."],
      ],
      calls: [['phone','Pieter De Smet','Audi Q4 e-tron availability','booked','Test drive','18:20'],['message','Lotte Claes','Trade-in value for Golf 7','leadtag','Lead','16:48'],['phone','Unknown caller','Asked about Saturday hours','info','Answered','15:12'],['phone','Karim Benali','Financing options for ID.4','leadtag','Lead','13:05']],
      appts: [['SAT','17','Test drive · Audi Q4 e-tron','Pieter De Smet','10:00'],['MON','19','Trade-in appraisal','Lotte Claes','09:30'],['TUE','20','Delivery · VW ID.4','Karim Benali','16:00']],
    },
    garage: {
      label: 'Garage', name: 'Garage Peeters',
      example: 'We are a family garage in Mechelen. We do maintenance, repairs and tyre changes for all brands. We are open Monday-Friday 8-17:30. A standard service starts at €149.',
      pitch: "I'll schedule repairs and answer service questions for your customers.",
      tip: '“My brakes are squeaking, can you fit me in this week?”',
      outcome: 'Repair booked',
      script: [
        ['lena', "Hi, I'm Lena from {biz}. How can I help you today?"],
        ['caller', "Hi, my brakes have been squeaking since yesterday. Can you take a look?"],
        ['lena', "Sorry to hear that! What car do you drive, and is the noise there when you brake gently?"],
        ['caller', "A 2018 Peugeot 308. Yes, every time I brake."],
        ['lena', "Thanks. I can book a brake check on Wednesday at 8:30. It usually takes about an hour."],
        ['caller', "Wednesday works, thank you."],
        ['lena', "You're all set for Wednesday at 8:30. I'll send a reminder the day before."],
      ],
      calls: [['phone','Marc Vermeulen','Brake check · Peugeot 308','booked','Booked','18:05'],['message','An Jacobs','Winter tyres price request','leadtag','Lead','16:31'],['phone','Unknown caller','Is my car ready?','info','Answered','14:50'],['phone','Bart Hermans','Annual service quote','leadtag','Lead','11:22']],
      appts: [['WED','14','Brake check · Peugeot 308','Marc Vermeulen','08:30'],['THU','15','Tyre change · 4 winter tyres','An Jacobs','13:00'],['FRI','16','Annual service · Škoda Octavia','Bart Hermans','08:00']],
    },
  };

  const S = (key) => {
    const b = SECTORS[key], l = I18N_SECTORS[LANG] && I18N_SECTORS[LANG][key];
    const calls = b.calls.map((c, i) => [c[0], t(c[1]), l ? l.calls[i][0] : c[2], c[3], l ? l.calls[i][1] : c[4], c[5]]);
    const appts = b.appts.map((a, i) => [l ? l.appts[i][0] : a[0], a[1], l ? l.appts[i][1] : a[2], a[3], a[4]]);
    return l ? { ...b, label: t(b.label), pitch: l.pitch, tip: l.tip, outcome: l.outcome, example: l.example, script: l.script, calls, appts } : { ...b, calls, appts };
  };

  const state = { screen: 1, sector: null, biz: '', voice: 'Friendly', persona: 55, greetingEdited: false, facts: [] };

  /* ---------------- theme ---------------- */
  const setTheme = (t) => {
    document.documentElement.dataset.theme = t;
    $('meta[name="theme-color"]').content = t === 'dark' ? '#080C1A' : '#F6F8FE';
    try { localStorage.setItem('lena-theme', t); } catch (e) {}
  };
  const initialTheme = params.get('theme') || (() => { try { return localStorage.getItem('lena-theme'); } catch (e) { return null; } })() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(initialTheme);
  ['#themeToggle', '#themeToggle2', '#themeToggle3'].forEach(id => $(id)?.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')));

  /* ---------------- toast ---------------- */
  let toastT;
  const toast = (msg) => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1900); };
  document.addEventListener('click', (e) => { const el = e.target.closest('[data-toast]'); if (el) { e.preventDefault(); toast(t(el.dataset.toast)); } });

  /* ---------------- navigation ---------------- */
  const STEP_NAMES = { 2: 'Business', 3: 'Train', 4: 'Customize', 5: 'Test' };
  function go(n, opts = {}) {
    n = Math.max(1, Math.min(6, n));
    if (n >= 3 && !state.sector) selectSector('realestate', true);
    const back = n < state.screen;
    app.classList.toggle('back', back);
    state.screen = n;
    app.dataset.screen = n;
    document.body.dataset.screen = n;
    $$('.screen').forEach(s => s.classList.toggle('active', +s.dataset.screen === n));
    // progress
    $$('.seg').forEach(s => { const k = +s.dataset.seg; s.classList.toggle('done', k < n); s.classList.toggle('current', k === n); });
    if (STEP_NAMES[n]) { $('#progressLabel').textContent = t('Step {n} of 4', { n: n - 1 }); $('#progressName').textContent = t(STEP_NAMES[n]); }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    if (!opts.silent) history.pushState({ n }, '', n === 1 ? location.pathname + location.search : `#step-${n}`);
    onEnter(n);
    updatePreview();
  }
  const DEMO = params.get('demo') === '1';
  const useWaitlist = () => WAITLIST_MODE && !DEMO;
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-go]'); if (!el || el.disabled) return;
    e.preventDefault();
    if (useWaitlist() && +el.dataset.go === 2 && state.screen === 1) { openWaitlist(el.closest('#industries') ? $('.ind-tab.active')?.dataset.ind : null); return; }
    go(+el.dataset.go);
  });
  $('#backBtn').addEventListener('click', () => go(state.screen - 1));
  addEventListener('popstate', (e) => go(e.state?.n || 1, { silent: true }));
  const onScroll = () => {
    $('#topbar').classList.toggle('scrolled', scrollY > 4);
    app.classList.toggle('scrolled', scrollY > 24);
    app.classList.toggle('past-hero', scrollY > innerHeight * 0.55);
  };
  addEventListener('scroll', onScroll, { passive: true });
  // in-page anchor links (landing) — scroll without touching history state
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute('data-go') || a.hasAttribute('data-toast')) return;
    const id = a.getAttribute('href').slice(1);
    const el = id && document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });

  /* ---------------- landing: reveal, tabs, sample convo ---------------- */
  const reveals = $$('.reveal');
  if (SHOT || !('IntersectionObserver' in window)) reveals.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver((ents) => ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  }
  const tabs = $$('.ind-tab');
  tabs.forEach((t, i) => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.toggle('active', x === t));
    $$('.ind-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === t.dataset.ind));
    $('.ind-glider').style.transform = `translateX(${i * 100}%)`;
  }));
  const convoEls = $$('#convo .cb, #convo .convo-result');
  let convoT = [];
  function playConvo(instant) {
    convoT.forEach(clearTimeout); convoT = [];
    convoEls.forEach(el => el.classList.toggle('show', !!instant));
    if (instant) return;
    let at = 300;
    convoEls.forEach(el => { convoT.push(setTimeout(() => el.classList.add('show'), at)); at += el.classList.contains('cb') ? 300 + el.textContent.length * 14 : 0; });
  }
  if (SHOT) playConvo(true);
  else if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { playConvo(); cio.disconnect(); } }, { threshold: 0.35 });
    cio.observe($('#convo'));
  } else playConvo(true);
  $('#replayConvo').addEventListener('click', () => playConvo());

  /* ---------------- 2 business ---------------- */
  function selectSector(key, silent) {
    const changed = state.sector !== key;
    state.sector = key;
    $$('.biz-card').forEach(c => { const on = c.dataset.sector === key; c.classList.toggle('selected', on); c.setAttribute('aria-checked', on); });
    $('#toTrain').disabled = false;
    if (changed) {
      const s = S(key);
      state.biz = s.name; $('#bizName').value = s.name;
      $('#teachInput').value = ''; state.facts = []; renderFacts(true);
      typed = false;
      if (!state.greetingEdited) setGreeting();
    }
    if (!silent) updatePreview(true);
  }
  $$('.biz-card').forEach(c => c.addEventListener('click', () => selectSector(c.dataset.sector)));

  /* ---------------- 3 train ---------------- */
  const CATS = [
    ['Opening hours', /\bopen\b|hours|closed|monday|tuesday|friday|saturday|sunday|weekend|\d{1,2}\s*[-–]\s*\d{1,2}|geopend|gesloten|openingsuren|maandag|vrijdag|zaterdag|zondag|ouvert|fermé|horaire|lundi|vendredi|samedi|dimanche|\d{1,2}\s*h\b/i],
    ['Pricing', /€|\$|price|cost|fee|commission|starts at|\bfree\b|discount|prijs|kost|vanaf|gratis|korting|commissie|prix|coût|tarif|à partir de|gratuit|remise/i],
    ['Rules Lena should follow', /\bnever\b|\balways\b|don't|do not|\bmust\b|transfer|escalate|rule|\bnooit\b|\baltijd\b|\bmoet|doorverbind|regel|jamais|toujours|\bdoit|transférer|règle/i],
    ['FAQs', /\?|faq|people often ask|question|vraag|vragen/i],
    ['Services', /\bsell|\brent|repair|maintenance|service|test drive|tyre|tire|lease|valuation|offer|viewing|inspection|verko|verhuur|herstel|onderhoud|testrit|band|schatting|bezichtig|\bvend|lou|répar|entretien|essai|pneu|estimation|visite/i],
    ['Business information', /.*/],
  ];
  const tidy = (s) => {
    s = s.trim().replace(/^(and|also)\s+/i, '');
    const lab = s.match(/^([\p{L} ]{3,30}):\s*(.*)$/u); if (lab) s = lab[2];
    s = s.replace(/^(wij|we) zijn (een )?/i, (m, w, a) => a ? 'Een ' : '').replace(/^nous sommes (une? )?/i, (m, a) => a ? (a.trim() === 'une' ? 'Une ' : 'Un ') : '');
    s = s.replace(/^we are (a |an )?/i, (m, a) => a ? (a.trim() === 'an' ? 'An ' : 'A ') : '').replace(/^we('re| are)?\s+/i, '').replace(/^our /i, '');
    s = s.replace(/^do\s+/i, '').replace(/^(sell|specialize|specialise|offer|rent|repair|serve|work|help)\b/i, (m) => m + 's');
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  function extract(text) {
    return text.split(/(?<=[.!?])\s+|\n+/).map(x => x.replace(/[.!]+$/, '').trim()).filter(x => x.length > 5 && !/^[\p{L} ]{3,30}:\s*$/u.test(x)).map(raw => {
      const lab = raw.match(/^([\p{L} ]{3,30}):/u);
      const lk = lab && lab[1].trim().toLowerCase().slice(0, 5);
      let cat = lab && CATS.find(c => c[0].toLowerCase().startsWith(lk) || t(c[0]).toLowerCase().startsWith(lk));
      if (!cat) cat = CATS.find(c => c[1].test(raw));
      return { cat: cat[0], text: tidy(raw) };
    }).filter(f => f.text.length > 3);
  }
  function factHTML(f, isNew) {
    return `<li class="fact"${isNew ? '' : ' style="animation:none"'}><span class="fact-check"><svg class="ic"><use href="#i-check"/></svg></span><span class="fact-body"><span class="fact-tag">${t(f.cat)}</span><span class="fact-text">${f.text.replace(/</g, '&lt;')}</span></span></li>`;
  }
  let prevKeys = new Set();
  function renderFacts(reset) {
    if (reset) prevKeys = new Set();
    const keys = new Set(state.facts.map(f => f.cat + f.text));
    $('#facts').innerHTML = state.facts.map(f => factHTML(f, !prevKeys.has(f.cat + f.text))).join('');
    $('#pvFactList').innerHTML = state.facts.slice(-4).map(f => factHTML(f, !prevKeys.has(f.cat + f.text))).join('');
    prevKeys = keys;
    $('#learnCount').textContent = state.facts.length;
    $$('.chip').forEach(c => c.classList.toggle('has', state.facts.some(f => f.cat === c.dataset.chip)));
    $('#teachStatus').textContent = state.facts.length ? (state.facts.length === 1 ? t('Learned 1 fact about {biz}', { biz: state.biz || t('your business') }) : t('Learned {n} facts about {biz}', { n: state.facts.length, biz: state.biz || t('your business') })) : t('Listening…');
    updatePreview();
  }
  let learnT;
  function learn(instant) {
    const badge = $('#learnBadge');
    badge.classList.add('on'); badge.classList.remove('done'); badge.lastChild.textContent = t('Learning');
    clearTimeout(learnT);
    learnT = setTimeout(() => {
      state.facts = extract($('#teachInput').value);
      renderFacts();
      badge.classList.add('done'); badge.lastChild.textContent = t('Learned');
      if (!state.facts.length) badge.classList.remove('on');
    }, instant ? 0 : 650);
  }
  $('#teachInput').addEventListener('input', () => learn());
  $('#bizName').addEventListener('input', (e) => { state.biz = e.target.value.trim(); if (!state.greetingEdited) setGreeting(); updatePreview(); });
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    const ta = $('#teachInput');
    const pre = ta.value && !/\n$/.test(ta.value) ? '\n' : '';
    ta.value += `${pre}${t(c.dataset.chip)}: `;
    ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
    ta.scrollTop = ta.scrollHeight;
  }));
  let typed = false;
  function typeExample() {
    const ta = $('#teachInput');
    if (typed || ta.value) return; typed = true;
    const txt = S(state.sector).example;
    if (SHOT) { ta.value = txt; learn(true); return; }
    let i = 0;
    const step = () => {
      if (state.screen !== 3) { ta.value = txt; learn(); return; }
      i += 2; ta.value = txt.slice(0, i);
      if (/[.]$/.test(ta.value) || i % 40 === 0) learn();
      if (i < txt.length) setTimeout(step, 18); else learn();
    };
    setTimeout(step, 450);
  }

  /* ---------------- 4 customize ---------------- */
  const fitGreet = () => { const g = $('#greeting'); if (!g.offsetParent) return; g.style.height = 'auto'; g.style.height = g.scrollHeight + 'px'; };
  function setGreeting() { const tpl = t('greeting', { biz: '{biz}' }); const biz = state.biz || t('your business'); $('#greeting').value = LANG === 'fr' ? tpl.replace('de {biz}', /^[aeiouyéèêàâh]/i.test(biz) ? 'd’' + biz : 'de ' + biz) : tpl.replace('{biz}', biz); fitGreet(); }
  $('#greeting').addEventListener('input', () => { state.greetingEdited = true; fitGreet(); updatePreview(); });
  const VOICE = { Professional: [0.98, 1.0], Friendly: [1.02, 1.12], Luxury: [0.88, 0.95], Energetic: [1.15, 1.2] };
  let playT;
  $$('.voice-card').forEach(card => card.addEventListener('click', () => {
    state.voice = card.dataset.voice;
    $$('.voice-card').forEach(c => c.classList.toggle('selected', c === card));
    $$('.voice-card').forEach(c => c.classList.remove('playing'));
    card.classList.add('playing');
    clearTimeout(playT); playT = setTimeout(() => card.classList.remove('playing'), 2800);
    try {
      if (!SHOT && 'speechSynthesis' in window) {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance($('#greeting').value);
        u.lang = LOCALE[LANG]; [u.rate, u.pitch] = VOICE[state.voice];
        const vs = speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith(LANG));
        const v = vs.find(v => /be/i.test(v.lang) && /female|ellen|amelie|aurelie|flo|google/i.test(v.name)) || vs.find(v => /female|samantha|serena|karen|moira|ellen|claire|amelie|google/i.test(v.name)) || vs[0];
        if (v) u.voice = v;
        speechSynthesis.speak(u);
      }
    } catch (e) {}
    updatePreview(true);
  }));
  const personaLabel = (v) => v < 20 ? 'Very friendly' : v < 42 ? 'Friendly' : v < 60 ? 'Balanced' : v < 82 ? 'Professional' : 'Very formal';
  function setPersona(v) { state.persona = v; const r = $('#persona'); r.style.setProperty('--p', v + '%'); $('#personaVal').textContent = t(personaLabel(v)); updatePreview(); }
  $('#persona').addEventListener('input', (e) => setPersona(+e.target.value));

  /* ---------------- preview pane ---------------- */
  function updatePreview(bump) {
    const s = state.sector && S(state.sector);
    $('#pvSector').textContent = s ? s.label : t('No business yet');
    $('#pvName').textContent = 'Lena';
    $('#pvRole').textContent = state.biz ? t('AI receptionist at {biz}', { biz: state.biz }) : t('AI receptionist');
    $('#pvVoice').textContent = t(state.voice);
    $('#pvTone').textContent = t(personaLabel(state.persona));
    $('#pvFacts').textContent = state.facts.length;
    $('#launchBiz').textContent = state.biz ? t('Receptionist · {biz}', { biz: state.biz }) : t('Receptionist');
    if (s) $('#tipQ').textContent = s.tip;
    let msg = t('Hi! Choose your business and I\u2019ll start learning right away.');
    if (state.screen === 2 && s) msg = t('Great choice! {pitch}', { pitch: s.pitch });
    if (state.screen === 3) msg = state.facts.length ? t('Got it! I\u2019ve learned {n} things about {biz} so far.', { n: state.facts.length, biz: state.biz || t('your business') }) : t('Tell me about your business. I\u2019m all ears.');
    if (state.screen === 4) msg = LANG === 'fr' ? `« ${$('#greeting').value} »` : `“${$('#greeting').value}”`;
    if (state.screen === 5) msg = t('I\u2019m ready when you are. Give me a call.');
    const b = $('#pvBubble');
    if (b.textContent !== msg) { b.textContent = msg; bump = true; }
    if (bump) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  }

  /* ---------------- 5 call ---------------- */
  const overlay = $('#callOverlay'), wave = $('#voiceWave'), tr = $('#transcript');
  const BARS = 30;
  wave.innerHTML = '<i></i>'.repeat(BARS);
  const bars = $$('i', wave);
  let speaking = 'none', raf, timerI, t0, scriptT = [];
  function animateWave() {
    const now = performance.now() / 1000;
    bars.forEach((b, i) => {
      const center = 1 - Math.abs(i - BARS / 2) / (BARS / 2);
      let h;
      if (speaking === 'lena') h = 6 + (0.35 + 0.65 * center) * 38 * (0.35 + 0.65 * Math.abs(Math.sin(now * 7 + i * 0.6) * Math.cos(now * 3.1 + i * 0.27)));
      else if (speaking === 'caller') h = 5 + center * 10 * Math.abs(Math.sin(now * 5 + i));
      else h = 4 + center * 2;
      b.style.height = h.toFixed(1) + 'px';
    });
    raf = requestAnimationFrame(animateWave);
  }
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  function setSpeaking(who) {
    speaking = who;
    $('#callAvatar').classList.toggle('speaking', who === 'lena');
    $('#speakingLabel').textContent = who === 'lena' ? t('Lena is speaking…') : who === 'caller' ? t('Listening…') : '';
  }
  function addLine(who, text, instant) {
    const el = document.createElement('div');
    el.className = `tl ${who}`;
    if (instant) el.style.animation = 'none';
    el.innerHTML = `<small>${who === 'lena' ? 'Lena' : t('You')}</small>${(LANG === 'fr' ? frFix(text).replace('de {biz}', /^[aeiouyéèêàâh]/i.test(state.biz || 'v') ? 'd’{biz}' : 'de {biz}') : text).replace('{biz}', state.biz || t('your business'))}`;
    tr.appendChild(el);
    while (tr.children.length > 5) tr.firstChild.remove();
  }
  function startCall(demo) {
    const s = S(state.sector || 'realestate');
    overlay.classList.add('open'); overlay.classList.remove('ended'); overlay.setAttribute('aria-hidden', 'false');
    $('#callSub').textContent = t('{biz} · Test call', { biz: state.biz || 'Timeless X' });
    tr.innerHTML = ''; scriptT.forEach(clearTimeout); scriptT = [];
    t0 = Date.now() - (demo ? 37000 : 0);
    $('#callTimer').textContent = demo ? fmt(37) : t('Calling…');
    cancelAnimationFrame(raf); animateWave();
    clearInterval(timerI);
    const tick = () => $('#callTimer').textContent = fmt(Math.floor((Date.now() - t0) / 1000));
    if (demo) {
      s.script.slice(0, 4).forEach(([w, t]) => addLine(w, t, true));
      addLine('lena', s.script[4][1], true);
      setSpeaking('lena');
      timerI = setInterval(tick, 1000);
      return;
    }
    setSpeaking('none'); $('#speakingLabel').textContent = t('Connecting…');
    let at = 1400;
    scriptT.push(setTimeout(() => { t0 = Date.now(); tick(); timerI = setInterval(tick, 1000); }, at));
    s.script.forEach(([w, t]) => {
      const dur = Math.max(1600, t.length * 42);
      scriptT.push(setTimeout(() => { setSpeaking(w); addLine(w, t); }, at));
      at += dur + 500;
    });
    scriptT.push(setTimeout(() => setSpeaking('none'), at));
  }
  function endCall() {
    scriptT.forEach(clearTimeout); clearInterval(timerI); cancelAnimationFrame(raf);
    const secs = Math.max(1, Math.floor((Date.now() - t0) / 1000));
    $('#sumDur').textContent = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
    const s = S(state.sector || 'realestate');
    const booked = tr.querySelectorAll('.tl').length >= 6;
    $('#sumOutcome').textContent = booked ? s.outcome : t('Question answered');
    $('#sumText').textContent = booked ? t('Lena handled it perfectly and synced it to your calendar.') : t('Lena is ready to handle real calls.');
    overlay.classList.add('ended');
  }
  $('#callBtn').addEventListener('click', () => startCall(false));
  $('#endCall').addEventListener('click', endCall);
  $('#tryAgain').addEventListener('click', () => startCall(false));
  $('#goLive').addEventListener('click', () => { overlay.classList.remove('open', 'ended'); overlay.setAttribute('aria-hidden', 'true'); go(6); });

  /* ---------------- bottom nav glass bubble ---------------- */
  function placeBubble(item, instant) {
    const nav = $('.bottom-nav'), bub = $('.bn-bubble');
    if (!nav || !item || !nav.offsetWidth) return;
    const nr = nav.getBoundingClientRect(), r = item.getBoundingClientRect();
    if (instant) bub.style.transition = 'none';
    const extra = 18;
    bub.style.width = (r.width + extra) + 'px';
    bub.style.transform = `translateX(${r.left - nr.left - extra / 2 - 1}px)`;
    if (instant) { void bub.offsetWidth; bub.style.transition = ''; }
  }
  $$('.bn-item').forEach(it => it.addEventListener('click', (e) => {
    e.preventDefault();
    $$('.bn-item').forEach(x => x.classList.toggle('active', x === it));
    placeBubble(it);
  }));
  addEventListener('resize', () => placeBubble($('.bn-item.active'), true));

  /* ---------------- 6 dashboard ---------------- */
  function renderDash() {
    const s = S(state.sector || 'realestate');
    const now = new Date();
    const ds = now.toLocaleDateString(LOCALE[LANG], { weekday: 'long', day: 'numeric', month: 'long' }); $('#dashDate').textContent = ds.charAt(0).toUpperCase() + ds.slice(1);
    const h = now.getHours();
    $('#dashBiz').textContent = state.biz || s.name;
    $('.dash-title').firstChild.textContent = t(h < 12 ? 'Good morning, ' : h < 18 ? 'Good afternoon, ' : 'Good evening, ');
    $('#callRows').innerHTML = s.calls.map(([ico, who, what, tag, tagT, time]) =>
      `<li class="row"><span class="row-ico"><svg class="ic"><use href="#i-${ico}"/></svg></span><span class="row-main"><b>${who}</b><small>${what}</small></span><span class="row-side"><span class="tag ${tag}">${tagT}</span><br>${time}</span></li>`).join('');
    $('#apptRows').innerHTML = s.appts.map(([d, n, what, who, time]) =>
      `<li class="row"><span class="appt-date"><small>${d}</small><b>${n}</b></span><span class="row-main"><b>${what}</b><small>${who}</small></span><span class="row-side"><b style="color:var(--text);font-size:13.5px">${time}</b></span></li>`).join('');
    $$('.stat b').forEach(b => {
      const target = +b.dataset.count;
      if (SHOT) { b.textContent = target; return; }
      const start = performance.now();
      const step = (t) => { const p = Math.min(1, (t - start) / 900); b.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    const week = [9, 14, 11, 16, 13, 7, 12];
    const max = Math.max(...week);
    const dayName = (back) => { const d = new Date(now); d.setDate(d.getDate() - back); const x = d.toLocaleDateString(LOCALE[LANG], { weekday: 'short' }).replace(/\.$/, ''); return x.charAt(0).toUpperCase() + x.slice(1); };
    $('#weekChart').innerHTML = week.map((v, i) => {
      const d = dayName(6 - i);
      return `<div class="bar-col${i === 6 ? ' today' : ''}"><span class="bar-val">${v}</span><span class="bar" style="--h:${(v / max * 100).toFixed(0)}%;animation-delay:${i * 60}ms"></span><small>${i === 6 ? t('Today') : d}</small></div>`;
    }).join('');
  }

  function onEnter(n) {
    if (n === 3) typeExample();
    if (n === 4) requestAnimationFrame(fitGreet);
    if (n === 6) { renderDash(); requestAnimationFrame(() => placeBubble($('.bn-item.active'), true)); }
  }

  /* ---------------- waitlist ---------------- */
  const wl = $('#waitlist'), wlForm = $('#waitlistForm');
  const WL_SECTOR = { garage: 'garage', dealer: 'autodealer', realestate: 'vastgoedkantoor' };
  const setNext = () => { const thanks = 'https://timelessautomations.be/bedankt/'; $('#form-next').value = LANG === 'nl' ? thanks : thanks + '?lang=' + encodeURIComponent(LANG); };
  let wlLastFocus = null;
  function openWaitlist(sectorKey) {
    wlLastFocus = document.activeElement;
    wl.classList.remove('success'); $('#wlError').hidden = true;
    if (sectorKey && WL_SECTOR[sectorKey] && !$('#sector').value) $('#sector').value = WL_SECTOR[sectorKey];
    setNext();
    wl.classList.add('open'); wl.setAttribute('aria-hidden', 'false'); document.body.classList.add('wl-lock');
    if (!SHOT) setTimeout(() => $('#company').focus({ preventScroll: true }), 320);
  }
  function closeWaitlist() {
    wl.classList.remove('open'); wl.setAttribute('aria-hidden', 'true'); document.body.classList.remove('wl-lock');
    if (wlLastFocus && wlLastFocus.focus) wlLastFocus.focus({ preventScroll: true });
  }
  wl.addEventListener('click', (e) => { if (e.target.closest('[data-wl-close]')) closeWaitlist(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && wl.classList.contains('open')) closeWaitlist(); });
  wlForm.addEventListener('input', (e) => { e.target.classList?.remove('bad'); e.target.closest('.wl-consent')?.classList.remove('bad'); });
  wlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ok = true;
    $$('[required]', wlForm).forEach(f => {
      const bad = f.type === 'checkbox' ? !f.checked : !f.checkValidity() || !String(f.value).trim();
      if (f.type === 'checkbox') f.closest('.wl-consent').classList.toggle('bad', bad); else f.classList.toggle('bad', bad);
      if (bad) ok = false;
    });
    const err = $('#wlError');
    if (!ok) { err.textContent = t('Please fill in all required fields.'); err.hidden = false; $('.bad', wlForm)?.focus(); return; }
    err.hidden = true;
    setNext();
    const btn = $('#wlSubmit'); btn.disabled = true;
    let res;
    try {
      // Same endpoint and field names as the old live form. The API allows CORS for timelessautomations.be and answers
      // JSON ({ok:true}) to fetch requests; a plain form POST gets a 303 redirect to _next (/bedankt/).
      res = await fetch(wlForm.action || WAITLIST_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new URLSearchParams(new FormData(wlForm)) });
    } catch (x) {
      // Network/CORS failure (e.g. opened from another origin): fall back to the classic form POST so the sign-up is still saved.
      wlForm.submit(); return;
    } finally { btn.disabled = false; }
    if (res.ok) { wl.classList.add('success'); wlForm.reset(); }
    else if (res.status === 429) { err.textContent = t('You have just sent the form. Please try again in a few minutes.'); err.hidden = false; }
    else if (res.status === 400) { err.textContent = t('Please fill in all required fields with a valid email address.'); err.hidden = false; }
    else { err.textContent = t('Something went wrong. Please try again or email nelly@timelessautomations.be.'); err.hidden = false; }
  });

  /* ---------------- language switching ---------------- */
  function setLang(l) {
    if (!LANGS.includes(l)) return;
    const ta = $('#teachInput');
    const wasExample = state.sector && ta.value && ta.value === S(state.sector).example;
    LANG = l;
    try { localStorage.setItem('lena-lang', l); } catch (e) {}
    translateStatic(); setNext();
    if (wasExample) { ta.value = S(state.sector).example; state.facts = extract(ta.value); renderFacts(true); }
    else renderFacts(true);
    if ($('#learnBadge').classList.contains('done')) $('#learnBadge').lastChild.textContent = t('Learned');
    if (!state.greetingEdited) setGreeting();
    setPersona(state.persona);
    if (STEP_NAMES[state.screen]) { $('#progressLabel').textContent = t('Step {n} of 4', { n: state.screen - 1 }); $('#progressName').textContent = t(STEP_NAMES[state.screen]); }
    if (state.screen === 6) renderDash();
    updatePreview();
    requestAnimationFrame(() => placeBubble($('.bn-item.active'), true));
  }
  document.addEventListener('click', (e) => { const b = e.target.closest('.lang-switch [data-lang]'); if (b) { e.preventDefault(); setLang(b.dataset.lang); } });

  /* ---------------- init ---------------- */
  setGreeting(); setPersona(55);
  $$('.voice-card').find(c => c.dataset.voice === state.voice).classList.add('selected');
  let start = +(params.get('screen') || (location.hash.match(/step-(\d)/) || [])[1] || 1);
  if (params.get('sector')) selectSector(params.get('sector'), true);
  if (SHOT && start >= 2 && !state.sector) selectSector(params.get('sector') || 'realestate', true);
  const openWl = /^#(aanmelden|wachtlijst|waitlist)$/.test(location.hash);
  history.replaceState({ n: start }, '', start === 1 ? location.pathname + location.search : location.search + `#step-${start}`);
  if (SHOT && start >= 4) { $('#teachInput').value = S(state.sector).example; typed = true; learn(true); }
  go(start, { silent: true });
  if (params.has('call')) startCall(true);
  if (openWl && start === 1 && useWaitlist()) openWaitlist();
  if (params.has('waitlist')) { openWaitlist(params.get('sector')); if (params.get('waitlist') === 'success') wl.classList.add('success'); }
})();
