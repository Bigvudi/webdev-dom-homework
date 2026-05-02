import { formName, formText, formButton } from './elementSearch.js';
import { clearText } from './clearText.js';
import { feachAndRenderComments } from './feachAndRenderComments.js';

export function initAddCommentListener() {
    formButton.addEventListener('click', () => {
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
            }),
        })
            .then((response) => {
                // Проверяем статус ответа
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
                return feachAndRenderComments();
            })
            .then(() => {
                formButton.disabled = false;
                formButton.textContent = 'Написать';
                formName.value = '';
                formText.value = '';
            })
            .catch((error) => {
                formButton.disabled = false;
                formButton.textContent = 'Написать';

                alert(error.message);
                console.warn(error);
            });
    });
}
