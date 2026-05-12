import { comments } from './comments.js';
import { renderComments } from './renderComments.js';
import { token } from './api.js'; // 1. Импортируем токен

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export function likeHandler(event) {
    event.stopPropagation();

    if (token === '') {
        alert('Авторизируйтесь');
        return;
    }

    const index = event.currentTarget.dataset.index;
    const comment = comments[index];

    event.currentTarget.classList.add('-loading-like');

    delay(2000).then(() => {
        if (comment.isLiked) {
            comment.likes--;
            comment.isLiked = false;
        } else {
            comment.likes++;
            comment.isLiked = true;
        }

        renderComments();
    });
}
