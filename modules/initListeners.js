import { likeHandler } from './addLikes.js';
import { comments } from './comments.js';
// Удаляем импорт formText отсюда, он больше не нужен как статичная переменная

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
            // Ищем поле ввода ПРЯМО ЗДЕСЬ, в момент клика
            const formTextElement = document.querySelector('.add-form-text');

            // ЗАЩИТА: если пользователь не авторизован, поля на странице нет.
            // Без этой проверки код упадет с ошибкой TypeError
            if (!formTextElement) {
                console.warn(
                    'Поле ввода не найдено. Авторизуйтесь, чтобы цитировать.',
                );
                return;
            }

            const index =
                commentElement.querySelector('.like-button').dataset.index;
            const comment = comments[index];

            // Теперь записываем текст в "живой" элемент
            formTextElement.value = `${comment.author.name},\n> ${comment.text}\n\n`;
            formTextElement.focus();
        });
    }
}
