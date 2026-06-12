/* =============================================
   辻堂がじゅまる歯科 — プレサイト JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  /* --- ヘッダースクロール影 --- */
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
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
    'news.html': 'News',
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

  /* --- カルーセル（院内の様子・自動送り） --- */
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('.carousel__track');
    const slides = Array.from(root.querySelectorAll('.carousel__slide'));
    const dotsWrap = root.querySelector('.carousel__dots');
    if (!track || slides.length <= 1) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let timer = null;

    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel__dot';
      b.setAttribute('aria-label', (i + 1) + '枚目');
      b.addEventListener('click', () => go(i, true));
      dotsWrap.appendChild(b);
      return b;
    });

    const render = () => {
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    };
    const go = (i, user) => {
      index = (i + slides.length) % slides.length;
      render();
      if (user) restart();
    };
    const start = () => { if (!reduce && !timer) timer = setInterval(() => go(index + 1), 4500); };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const restart = () => { stop(); start(); };

    root.querySelector('.carousel__arrow--next').addEventListener('click', () => go(index + 1, true));
    root.querySelector('.carousel__arrow--prev').addEventListener('click', () => go(index - 1, true));
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    render();
    start();
  });

  /* --- 右端固定の予約レール（常時表示・PC） --- */
  if (!document.querySelector('.side-reserve')) {
    const cal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
    const phone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    const rail = document.createElement('div');
    rail.className = 'side-reserve';
    rail.innerHTML =
      '<a href="#reserve" class="side-reserve__btn side-reserve__btn--web">' + cal + '<span>WEB予約</span></a>' +
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
});
