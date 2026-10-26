const initMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu a');

    if (!hamburger || !menu) return;

    // メニューの開閉切り替え関数
    const toggleMenu = () => {
        hamburger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
        if (overlay) {
            overlay.classList.toggle('is-active');
        }
        // メニュー展開時の背景スクロールを防止
        document.body.classList.toggle('menu-open');
    };

    // メニューを閉じる関数
    const closeMenu = () => {
        hamburger.classList.remove('is-active');
        menu.classList.remove('is-active');
        if (overlay) {
            overlay.classList.remove('is-active');
        }
        document.body.classList.remove('menu-open');
    };

    hamburger.addEventListener('click', toggleMenu);

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // メニュー内のリンクをクリックしたときにも閉じる
    menuLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
};

// アドレスバー(検索バー)開閉に伴う背景デコレーションのガタつき・ズレ防止
const initFixedBackground = () => {
    const bg = document.querySelector('.background-decoration');
    if (!bg) return;

    let lastWidth = window.innerWidth;

    const updateHeight = () => {
        // 現在のビューポート高さをpxで固定化（スクロール時のアドレスバー伸縮による再計算を防ぐ）
        bg.style.height = `${window.innerHeight}px`;
    };

    updateHeight();

    // 画面の向きが変わった時、または横幅が変わるサイズ変更時のみ更新
    window.addEventListener('resize', () => {
        if (Math.abs(window.innerWidth - lastWidth) > 10) {
            lastWidth = window.innerWidth;
            updateHeight();
        }
    });

    window.addEventListener('orientationchange', () => {
        setTimeout(updateHeight, 150);
    });
};

const initApp = () => {
    initMenu();
    initFixedBackground();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

