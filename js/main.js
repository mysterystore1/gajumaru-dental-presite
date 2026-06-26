/* =============================================
   辻堂がじゅまる歯科 — プレサイト JavaScript
   ============================================= */

/* --- Microsoft Clarity（アクセス解析・行動分析／ヒートマップ・録画） ---
   ID未設定（プレースホルダのまま）の間は注入しない＝空計測・誤計測を防ぐ。
   有効化手順：clarity.microsoft.com でプロジェクト作成 → 発行されたID（例 'abcd1234ef'）を
   下の CLARITY_PROJECT_ID に差し替えるだけ。honban/js/main.js も同じIDに揃える。
   ⚠個人情報保護：Clarityダッシュボードで Masking=Strict を設定。問い合わせフォームの
   氏名/メール/電話 入力欄は data-clarity-mask="true" でHTML側でも明示マスク済。
   プライバシーポリシー（honban/privacy.html）に解析ツール利用を明記すること。 */
(function () {
  var CLARITY_PROJECT_ID = 'xcwuquiftw'; // 辻堂がじゅまる歯科 ホームページ（clarity.microsoft.com 発行）
  if (!CLARITY_PROJECT_ID || CLARITY_PROJECT_ID === 'CLARITY_PROJECT_ID') return;
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
})();

/* --- Google Analytics 4（GA4・流入/ページ/イベント計測） ---
   測定ID G-DDTRX2HL8P（analytics.google.com 発行）。Clarityと併用（GA4=量的計測／Clarity=質的観察）。
   gtag.js を動的読込しページビュー自動計測。フォーム送信・電話発信は下のイベント処理で計測。
   ⚠PII保護：URL/ページパスに個人情報を載せない（当サイトはフォームPOST送信でURLに氏名等は付かない）。 */
(function () {
  var GA4_ID = 'G-DDTRX2HL8P';
  if (!GA4_ID || GA4_ID.indexOf('G-') !== 0) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_ID);
})();

document.addEventListener('DOMContentLoaded', () => {
  /* GA4: 電話発信（tel:リンク）クリックをコンバージョン計測 */
  document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.gtag) window.gtag('event', 'click_to_call', { link_url: a.getAttribute('href') });
    });
  });

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
          /* GA4: 問い合わせ送信をコンバージョン計測（入力値は送らずイベントのみ） */
          if (window.gtag) window.gtag('event', 'generate_lead', { form_id: form.id || 'contact-form' });
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
