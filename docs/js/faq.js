// FAQの質問ボタンをすべて取得
const faqButtons = document.querySelectorAll('.faq-accordion_question');

// ボタンをクリックしたら回答を開閉
faqButtons.forEach(function (button) {

    button.addEventListener('click', function () {

        // 親要素の開閉状態を切り替える
        button.parentElement.classList.toggle('is-open');

    });

});