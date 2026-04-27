import { formName, formText, formButton } from './elementSearch.js';
import { renderComments } from './renderComments.js';
import { comments } from './comments.js';
import { clearText } from './clearText.js';

// Оборачиваем всё в одну функцию
export function initAddCommentListener() {
    formButton.addEventListener('click', () => {
        formName.classList.remove('error');
        formText.classList.remove('error');

        if (!formName.value.trim()) {
            formName.classList.add('error');
            return;
        }

        if (!formText.value.trim()) {
            formText.classList.add('error');
            return;
        }

        const now = new Date();
        const date =
            now.getDate().toString().padStart(2, '0') +
            '.' +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            '.' +
            now.getFullYear().toString().slice(-2) +
            ' ' +
            now.getHours().toString().padStart(2, '0') +
            ':' +
            now.getMinutes().toString().padStart(2, '0');

        comments.push({
            name: clearText(formName.value),
            date: date,
            text: clearText(formText.value),
            likes: 0,
            isLiked: false,
        });

        renderComments();

        formName.value = '';
        formText.value = '';
    });
}
