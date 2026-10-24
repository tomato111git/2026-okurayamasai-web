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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    initMenu();
}
