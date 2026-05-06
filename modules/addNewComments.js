import { formName, formText, formButton } from './elementSearch.js';
import { clearText } from './clearText.js';
import { featchAndRenderComments } from './featchAndRenderComments.js';

export function initAddCommentListener() {
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

        fetch('https://wedev-api.sky.pro/api/v1/tyryshkin-sergei2/comments', {
            method: 'POST',
            body: JSON.stringify({
                name: clearText(formName.value),
                text: clearText(formText.value),
                forceError: true, // Для проверки 500-й ошибки
            }),
        })
            .then((response) => {
                if (response.status === 400) {
                    throw new Error(
                        'Имя и комментарий должны быть не короче 3 символов',
                    );
                }
                if (response.status === 500) {
                    throw new Error('Сервер сломался, попробуй позже');
                }
                if (!response.ok) {
                    throw new Error('Что-то пошло не так');
                }
                return response.json();
            })
            .then(() => {
                return featchAndRenderComments();
            })
            .then(() => {
                // Успех: только тут чистим форму и разблокируем кнопку
                formButton.disabled = false;
                formButton.textContent = 'Написать';
                formName.value = '';
                formText.value = '';
            })
            .catch((error) => {
                // Если сервер выдал 500 — мгновенно повторяем запрос
                if (error.message === 'Сервер сломался, попробуй позже') {
                    console.warn('Ошибка 500. Повторяю запрос...');
                    handlePostClick();
                    return; // Кнопка остается disabled, alert не показываем
                }

                // В случае других ошибок (400 или интернет) разблокируем интерфейс
                formButton.disabled = false;
                formButton.textContent = 'Написать';

                if (error.message === 'Failed to fetch') {
                    alert(
                        'Кажется, у вас сломался интернет, попробуйте позже.',
                    );
                } else {
                    alert(error.message);
                }
                console.warn(error);
            });
    };

    formButton.addEventListener('click', handlePostClick);
}
