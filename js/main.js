/**
 * Yuichiro Mori - Personal Site
 * main.js
 *
 * ■ このファイルで管理している機能：
 *   1. カスタムカーソル（円形のトレイル）
 *   2. ヘッダー スクロール演出
 *   3. パーティクル背景（ヒーローセクション）
 *   4. タイピングアニメーション
 *   5. スクロールアニメーション（Intersection Observer）
 *   6. ページトップへ戻るボタン
 *   7. カテゴリフィルター（worksページ）
 */

'use strict';

/* =============================================
   1. カスタムカーソル
   ============================================= */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) return;

  // マウス座標
  let mouseX = -100, mouseY = -100;
  // リングの現在位置（なめらかに追従させる）
  let ringX = -100, ringY = -100;

  // マウス移動で dot をすぐ追従
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  // リングはRAFでなめらかに遅延追従
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // リンク・ボタン上でリングを大きくする
  const hoverTargets = document.querySelectorAll('a, button, .filter-btn, .tag');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
})();


/* =============================================
   2. ヘッダー スクロール演出
   ============================================= */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    // スクロール量が 60px を超えたら .scrolled クラスを付与
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* =============================================
   3. パーティクル背景（AIっぽい回路・ドット）
   ============================================= */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // キャンバスサイズをウィンドウに合わせる
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // パーティクルの数（少なくするとパフォーマンス向上）
  const PARTICLE_COUNT = 70;
  // 線を引く最大距離
  const MAX_DIST = 150;
  // アクセントカラー（style.cssの--accentに合わせてください）
  const ACCENT_COLOR = '123, 97, 255';

  // パーティクルを生成
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:  Math.random() * window.innerWidth,
    y:  Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r:  Math.random() * 2 + 1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // パーティクル同士が近いとき線を引く
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${ACCENT_COLOR}, ${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }

    // ドットを描画
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT_COLOR}, 0.6)`;
      ctx.fill();

      // 移動・境界で跳ね返る
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();


/* =============================================
   4. タイピングアニメーション
   ============================================= */
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  // ここに表示したいテキストを追加・変更できます
  const words = ['フリーター', 'AIいじり好き', '福岡在住'];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  // タイピング速度（ミリ秒）
  const TYPE_SPEED   = 100;
  const DELETE_SPEED = 60;
  const PAUSE_TIME   = 2000; // テキスト表示後の待機時間

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // 削除中
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, DELETE_SPEED);

    } else {
      // 入力中
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, PAUSE_TIME);
        return;
      }
      setTimeout(type, TYPE_SPEED);
    }
  }

  // 少し遅らせてから開始（ヒーローアニメーションの後）
  setTimeout(type, 1200);
})();


/* =============================================
   5. スクロールアニメーション（Intersection Observer）
   ふわっと要素が現れる演出
   ============================================= */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 一度表示したら監視を解除（パフォーマンス向上）
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // 要素の15%が見えたらアニメーション開始
      rootMargin: '0px 0px -40px 0px',
    }
  );

  // 複数要素がある場合は少しずつずらして表示（stagger効果）
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
})();


/* =============================================
   6. ページトップへ戻るボタン
   ============================================= */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* =============================================
   7. カテゴリフィルター（works.htmlのみ）
   ============================================= */
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards  = document.querySelectorAll('.work-card');

  if (!filterBtns.length || !workCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // アクティブボタンを切り替え
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      workCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // 表示時に reveal アニメーションを再発火
          card.classList.remove('is-visible');
          requestAnimationFrame(() => {
            card.classList.add('is-visible');
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();
