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

        // スマホメニューを閉じたときにドロップダウンの状態もリセット
        document.querySelectorAll('.has-dropdown').forEach((dropdown) => {
            dropdown.classList.remove('is-open');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
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

// ヘッダーナビゲーションのドロップダウン開閉処理（ホバー・クリック対応）
const initDropdown = () => {
    const dropdowns = document.querySelectorAll('.has-dropdown');

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

    // ドロップダウンの外側をクリックしたときに閉じる
    document.addEventListener('click', (e) => {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('is-open');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
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
    initDropdown();
    initFixedBackground();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

