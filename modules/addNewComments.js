import { formName, formText, formButton } from './elementSearch.js';
import { renderComments } from './renderComments.js';
import { updateComments } from './comments.js';
import { clearText } from './clearText.js';

export function initAddCommentListener() {
    formButton.addEventListener('click', () => {
        formName.classList.remove('error');
        formText.classList.remove('error');

        if (!formName.value.trim() || !formText.value.trim()) {
            formName.classList.add('error');
            formText.classList.add('error');
            return;
        }

        fetch('https://wedev-api.sky.pro/api/v1/tyryshkin-sergei2/comments', {
            method: 'POST',
            body: JSON.stringify({
                name: clearText(formName.value),
                text: clearText(formText.value),
            }),
        })
            .then(() => {
                // Просто загружаем свежий список комментариев
                return fetch(
                    'https://wedev-api.sky.pro/api/v1/tyryshkin-sergei2/comments',
                );
            })
            .then((response) => response.json())
            .then((data) => {
                updateComments(data.comments);
                renderComments();
                formName.value = '';
                formText.value = '';
            });
    });
}
