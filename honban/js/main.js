/* =============================================
   辻堂がじゅまる歯科 — プレサイト JavaScript
   ============================================= */

/* --- テーマ切替（B案検討用・公開時はこのブロックと theme-variants.css を撤去で A案へ完全復帰） ---
   data-theme で :root 変数を上書き。warm=現行A案(既定・属性なし)。localStorage で保持。 */
(function () {
  if (!document.querySelector('link[data-theme-variants]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/theme-variants.css';
    link.setAttribute('data-theme-variants', '');
    document.head.appendChild(link);
  }
  let saved = null;
  try { saved = localStorage.getItem('gj-theme'); } catch (e) {}
  if (saved && saved !== 'warm') document.documentElement.setAttribute('data-theme', saved);

  window.__gjThemes = [
    { id: 'warm', name: '①現行', sw: '#C56A38' },
    { id: 'blue', name: '②青', sw: '#2D7DB0' },
    { id: 'hybrid', name: '③併用', sw: '#2E8C9E' },
    { id: 'teal', name: '④緑', sw: '#2F8E7E' },
  ];
  window.__gjApplyTheme = function (id) {
    if (id === 'warm') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', id);
    try { localStorage.setItem('gj-theme', id); } catch (e) {}
    document.querySelectorAll('.theme-switch__btn').forEach((b) => {
      b.classList.toggle('is-active', b.getAttribute('data-theme-id') === id);
    });
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  /* --- ヘッダースクロール影＋スマートヘッダー ---
     下スクロール中は隠して画面を空け、上に戻した瞬間に再表示する。
     メニュー展開中は隠さない */
  let lastScrollY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('header--scrolled', y > 10);
    if (nav.classList.contains('is-open')) {
      header.classList.remove('header--hidden');
    } else if (y > 240 && y > lastScrollY + 4) {
      header.classList.add('header--hidden');
    } else if (y < lastScrollY - 4 || y <= 240) {
      header.classList.remove('header--hidden');
    }
    lastScrollY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- ハンバーガーメニュー --- */
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  const closeMenu = () => {
    hamburger.classList.remove('is-active');
    nav.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* --- スムーススクロール --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* --- フェードインアニメーション (Intersection Observer) --- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });
  } else {
    /* Intersection Observer 非対応ブラウザ: 全要素を即表示 */
    document.querySelectorAll('.fade-in').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  /* タブ復帰時の救済: 長寿命タブでIOが失効しても、画面内の未表示要素を取り残さない */
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    document.querySelectorAll('.fade-in:not(.is-visible)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('is-visible');
      }
    });
  });

  /* --- お問い合わせフォーム送信 --- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '送信中...';
      submitBtn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          /* 送信成功: フォームを完了メッセージに差し替え */
          const wrapper = form.parentElement;
          form.style.display = 'none';

          const success = document.createElement('div');
          success.className = 'form-success fade-in is-visible';
          success.innerHTML =
            '<p class="form-success__title">お問い合わせありがとうございます</p>' +
            '<p>内容を確認の上、折り返しご連絡いたします。<br>しばらくお待ちください。</p>';
          wrapper.insertBefore(success, form.nextSibling);
        } else {
          throw new Error('送信に失敗しました');
        }
      } catch {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        window.alert(
          '送信に失敗しました。\nお手数ですが、お電話にてお問い合わせください。'
        );
      }
    });
  }

  /* --- バイリンガルnav: 各リンクにEN副ラベルを付与 --- */
  const NAV_EN = {
    'index.html': 'Home',
    'dental-anxiety.html': 'First Step',
    'services.html': 'Services',
    'about.html': 'About',
    'facility.html': 'Clinic',
    'pricing.html': 'Fees',
    'access.html': 'Access',
    'faq.html': 'FAQ',
  };
  document.querySelectorAll('.header__nav-list a').forEach((a) => {
    const file = (a.getAttribute('href') || '').split('/').pop();
    const en = NAV_EN[file];
    if (!en || a.querySelector('.header__nav-en')) return;
    a.classList.add('has-en');
    const span = document.createElement('span');
    span.className = 'header__nav-en';
    span.textContent = en;
    a.appendChild(span);
  });

  /* --- 流れる帯ギャラリー（院内の様子）: シームレスループ用にスライド一式を複製 --- */
  document.querySelectorAll('[data-gallery-flow]').forEach((root) => {
    const track = root.querySelector('.gallery-flow__track');
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    Array.from(track.children).forEach((li) => {
      const clone = li.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });

  /* --- 右端固定の予約レール（常時表示・PC） --- */
  if (!document.querySelector('.side-reserve')) {
    const cal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
    const phone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    const rail = document.createElement('div');
    rail.className = 'side-reserve';
    /* reserveセクションが無いページ(privacy/recruit等)はトップの予約導線へ */
    const reserveHref = document.getElementById('reserve') ? '#reserve' : 'index.html#reserve';
    rail.innerHTML =
      '<a href="' + reserveHref + '" class="side-reserve__btn side-reserve__btn--web">' + cal + '<span>WEB予約</span></a>' +
      '<a href="tel:0466XXXXXX" class="side-reserve__btn side-reserve__btn--tel">' + phone + '<span>電話</span></a>';
    document.body.appendChild(rail);

    rail.querySelectorAll('a[href="#reserve"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const target = document.getElementById('reserve');
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* --- 浮遊TOPボタン（スクロール後に表示） --- */
  if (!document.querySelector('.floating-actions')) {
    const wrap = document.createElement('div');
    wrap.className = 'floating-actions';
    wrap.innerHTML =
      '<button type="button" class="floating-actions__top" aria-label="ページ上部へ戻る">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>' +
        '<span>TOP</span></button>';
    document.body.appendChild(wrap);

    const topBtn = wrap.querySelector('.floating-actions__top');
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const toggleTop = () => wrap.classList.toggle('is-scrolled', window.scrollY > 400);
    window.addEventListener('scroll', toggleTop, { passive: true });
    toggleTop();
  }

  /* --- 予約ボタンに識別アイコンを付与（LINE/EPARK/電話/フォーム） --- */
  const RESERVE_ICONS = {
    'reserve__btn--line':
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.2c-5.1 0-9.3 3.35-9.3 7.48 0 3.7 3.32 6.8 7.8 7.39.3.06.72.2.83.46.1.24.06.6.03.85l-.13.8c-.04.24-.19.94.82.51 1.02-.43 5.48-3.23 7.48-5.53 1.38-1.52 2.04-3.06 2.04-4.88 0-4.13-4.14-7.48-9.34-7.48Zm-3.77 9.6h-1.9a.49.49 0 0 1-.5-.49V8.96a.5.5 0 0 1 1 0v2.86h1.4a.49.49 0 0 1 0 .98Zm1.96-.49a.5.5 0 0 1-1 0V8.96a.5.5 0 0 1 1 0v3.35Zm4.2 0a.49.49 0 0 1-.34.47.5.5 0 0 1-.56-.18l-1.92-2.62v2.33a.5.5 0 0 1-1 0V8.96a.49.49 0 0 1 .9-.29l1.92 2.62V8.96a.5.5 0 0 1 1 0v3.35Zm3.1-2.36a.49.49 0 0 1 0 .98h-1.4v.9h1.4a.49.49 0 0 1 0 .98h-1.9a.49.49 0 0 1-.5-.49V8.96a.5.5 0 0 1 .5-.49h1.9a.49.49 0 0 1 0 .98h-1.4v.9h1.4Z"/></svg>',
    'reserve__btn--epark':
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8.5 20.5h7M12 17.5v3"/><path d="M7.5 11l2.2 2.2 4.8-4.8"/></svg>',
    'reserve__btn--tel':
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    'reserve__btn--form':
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h6"/></svg>',
  };
  document.querySelectorAll('.reserve__btn').forEach((btn) => {
    if (btn.querySelector('.reserve__btn-icon')) return;
    let svg = null;
    Object.keys(RESERVE_ICONS).forEach((cls) => { if (btn.classList.contains(cls)) svg = RESERVE_ICONS[cls]; });
    if (!svg) return;
    const span = document.createElement('span');
    span.className = 'reserve__btn-icon';
    span.innerHTML = svg;
    btn.insertBefore(span, btn.firstChild);
    /* EPARK: ロゴで医院名が出るのでサブの重複「EPARK」を整理 */
    if (btn.classList.contains('reserve__btn--epark')) {
      const sub = btn.querySelector('.reserve__btn-sub');
      if (sub && sub.textContent.indexOf('EPARK') !== -1) sub.textContent = '（準備中）';
    }
  });

  /* --- 装飾アイコンSVGをインライン化し色を変数化（テーマ追従・公開時も無害） ---
     <img> 埋め込みのままだと CSS変数が中に届かずテーマで再着色されないため、
     svc-/icon-/promise- のアイコンを取得→インライン展開→ハードコード4色を var() 置換。
     warm(現行) は変数=元色のため描画は同一。 */
  (() => {
    const ICON_RE = /(?:^|\/)(svc-|icon-|promise-)[^/]+\.svg(?:\?.*)?$/;
    const COLOR_MAP = {
      '#F7E8DB': 'var(--icon-bg)',
      '#C56A38': 'var(--icon-line)',
      '#E0884A': 'var(--icon-accent)',
      '#FBF6F0': 'var(--icon-tick)',
    };
    const cache = new Map();
    const inline = (img, text) => {
      let svg = text;
      Object.keys(COLOR_MAP).forEach((hex) => {
        svg = svg.split(hex).join(COLOR_MAP[hex]);
        svg = svg.split(hex.toLowerCase()).join(COLOR_MAP[hex]);
      });
      const tpl = document.createElement('template');
      tpl.innerHTML = svg.trim();
      const el = tpl.content.querySelector('svg');
      if (!el) return;
      ['class', 'width', 'height'].forEach((a) => {
        if (img.getAttribute(a)) el.setAttribute(a, img.getAttribute(a));
      });
      el.setAttribute('aria-hidden', 'true');
      img.replaceWith(el);
    };
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (!ICON_RE.test(src)) return;
      if (cache.has(src)) { inline(img, cache.get(src)); return; }
      fetch(src).then((r) => r.text()).then((t) => { cache.set(src, t); inline(img, t); }).catch(() => {});
    });
  })();

  /* --- テーマ切替UI（左下フローティング・検討用・公開時は撤去） --- */
  if (!document.querySelector('.theme-switch') && window.__gjThemes) {
    const current = document.documentElement.getAttribute('data-theme') || 'warm';
    const box = document.createElement('div');
    box.className = 'theme-switch';
    box.setAttribute('aria-label', 'テーマ切替（検討用）');
    let html = '<span class="theme-switch__label">テーマ確認用</span><div class="theme-switch__row">';
    window.__gjThemes.forEach((t) => {
      html += '<button type="button" class="theme-switch__btn' + (t.id === current ? ' is-active' : '') +
        '" data-theme-id="' + t.id + '"><span class="theme-switch__sw" style="background:' + t.sw + '"></span>' + t.name + '</button>';
    });
    html += '</div>';
    box.innerHTML = html;
    document.body.appendChild(box);
    box.querySelectorAll('.theme-switch__btn').forEach((b) => {
      b.addEventListener('click', () => window.__gjApplyTheme(b.getAttribute('data-theme-id')));
    });
  }
});
