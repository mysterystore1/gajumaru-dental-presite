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
    'dental-anxiety.html': 'Anxiety',
    'services.html': 'Medical',
    'about.html': 'About',
    'facility.html': 'Clinic',
    'pricing.html': 'Price',
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

  /* --- 浮遊アクション(WEB予約 / ページTOP) --- */
  if (!document.querySelector('.floating-actions')) {
    const wrap = document.createElement('div');
    wrap.className = 'floating-actions';
    wrap.innerHTML =
      '<a href="#reserve" class="floating-actions__reserve">' +
        '<svg class="floating-actions__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
        '<span>WEB予約</span></a>' +
      '<button type="button" class="floating-actions__top" aria-label="ページ上部へ戻る">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>' +
        '<span>TOP</span></button>';
    document.body.appendChild(wrap);

    const topBtn = wrap.querySelector('.floating-actions__top');
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const reserve = wrap.querySelector('.floating-actions__reserve');
    reserve.addEventListener('click', (e) => {
      const target = document.getElementById('reserve');
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });

    const toggleTop = () => wrap.classList.toggle('is-scrolled', window.scrollY > 400);
    window.addEventListener('scroll', toggleTop, { passive: true });
    toggleTop();
  }
});
