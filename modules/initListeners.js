import { likeHandler } from './addLikes.js';
import { comments } from './comments.js';
import { formText } from './elementSearch.js';

// 1. Функция для лайков
export function initLikeListeners() {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const button of likeButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            likeHandler(event);
        });
    }
}

// 2. Функция для цитирования
export function initQuoteListeners() {
    const commentElements = document.querySelectorAll('.comment');
    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const index =
                commentElement.querySelector('.like-button').dataset.index;
            const comment = comments[index];

            formText.value = `> ${comment.text}\n\n${comment.name}, `;
            formText.focus();
        });
    }
}
