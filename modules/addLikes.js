import { comments } from './comments.js';
import { renderComments } from './renderComments.js';

// 1. Добавляем функцию delay
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export function likeHandler(event) {
    event.stopPropagation();
    const index = event.currentTarget.dataset.index;
    const comment = comments[index];

    // Добавляем визуальный эффект загрузки (опционально)
    event.currentTarget.classList.add('-loading-like');

    // 2. Вызываем delay, и только в .then меняем данные
    delay(2000).then(() => {
        if (comment.isLiked) {
            comment.likes--;
            comment.isLiked = false;
        } else {
            comment.likes++;
            comment.isLiked = true;
        }

        // 3. Перерисовываем только после паузы
        renderComments();
    });
}
