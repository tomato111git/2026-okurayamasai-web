document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        loop: false,
        speed: 400,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 24,

        // 矢印ナビゲーション
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // ページ番号（例: 1 / 35）
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },

        // キーボード操作対応
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
    });
});