document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.js-timetable-modal');
    if (!modal) return;

    const modalTitle = modal.querySelector('.js-modal-title');
    const modalImage = modal.querySelector('.js-modal-image');
    const modalNav = modal.querySelector('.js-modal-nav');
    const navPrevBtn = modal.querySelector('.js-nav-prev');
    const navNextBtn = modal.querySelector('.js-nav-next');
    const navIndicator = modal.querySelector('.js-nav-indicator');
    const closeButtons = modal.querySelectorAll('.js-modal-close');
    const triggers = document.querySelectorAll('.js-modal-trigger');

    let currentImages = [];
    let currentIndex = 0;

    function updateModalImage(index) {
        if (!currentImages.length) return;
        currentIndex = (index + currentImages.length) % currentImages.length;
        modalImage.src = currentImages[currentIndex];

        if (currentImages.length > 1) {
            modalNav.style.display = 'flex';
            navIndicator.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        } else {
            modalNav.style.display = 'none';
        }
    }

    function openModal(title, imagesStr) {
        if (!imagesStr) return;
        currentImages = imagesStr.split(',').map(url => url.trim()).filter(Boolean);
        if (currentImages.length === 0) return;

        modalTitle.textContent = title || '企画詳細';
        modalImage.alt = title || '企画ポスター';
        updateModalImage(0);

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        // Reset image src after transition
        setTimeout(() => {
            if (!modal.classList.contains('is-open')) {
                modalImage.src = '';
            }
        }, 300);
    }

    triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            const title = trigger.dataset.title;
            const images = trigger.dataset.images;
            openModal(title, images);
        });

        // キーボード操作対応 (Enter / Space)
        trigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const title = trigger.dataset.title;
                const images = trigger.dataset.images;
                openModal(title, images);
            }
        });
    });

    closeButtons.forEach(function (button) {
        button.addEventListener('click', closeModal);
    });

    if (navPrevBtn) {
        navPrevBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            updateModalImage(currentIndex - 1);
        });
    }

    if (navNextBtn) {
        navNextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            updateModalImage(currentIndex + 1);
        });
    }

    // ESCキーで閉じる / 左右キーで画像切り替え
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('is-open')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft' && currentImages.length > 1) {
            updateModalImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentImages.length > 1) {
            updateModalImage(currentIndex + 1);
        }
    });
});
