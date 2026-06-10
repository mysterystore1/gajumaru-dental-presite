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
});
