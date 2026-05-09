import { clearText } from './clearText.js';
import { featchAndRenderComments } from './featchAndRenderComments.js';
import { postComments } from './api.js';

export function initAddCommentListener() {
    // 1. Ищем элементы ЗДЕСЬ, а не берем старые из импорта
    const formName = document.querySelector('.add-form-name');
    const formText = document.querySelector('.add-form-text');
    const formButton = document.querySelector('.add-form-button');

    // Проверка на случай, если формы нет (например, на странице входа)
    if (!formButton) return;

    const handlePostClick = () => {
        formName.classList.remove('error');
        formText.classList.remove('error');

        if (!formName.value.trim() || !formText.value.trim()) {
            formName.classList.add('error');
            formText.classList.add('error');
            return;
        }

        formButton.disabled = true;
        formButton.textContent = 'Комментарий добавляется...';

        postComments({
            name: clearText(formName.value),
            text: clearText(formText.value),
        })
            .then(() => {
                return featchAndRenderComments();
            })
            .then(() => {
                formName.value = '';
                formText.value = '';
            })
            .catch((error) => {
                if (error.message === 'Сервер сломался, попробуй позже') {
                    handlePostClick();
                    return;
                }
                alert(
                    error.message === 'Failed to fetch'
                        ? 'Нет интернета'
                        : error.message,
                );
            })
            .finally(() => {
                // Важно: проверяем, существует ли еще кнопка (мог случиться рендер)
                if (formButton) {
                    formButton.disabled = false;
                    formButton.textContent = 'Написать';
                }
            });
    };

    // Чтобы не вешать по 10 обработчиков на одну кнопку,
    // сначала удаляем старый (если он был), затем добавляем новый
    formButton.removeEventListener('click', handlePostClick);
    formButton.addEventListener('click', handlePostClick);
}
