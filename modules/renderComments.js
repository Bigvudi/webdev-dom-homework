import { comments } from './comments.js';
import { initLikeListeners, initQuoteListeners } from './initListeners.js';
import { app } from './elementSearch.js';
import { initAddCommentListener } from './addNewComments.js';
// 1. Импортируем токен и функцию отрисовки логина
import { token, user } from './api.js';
import { renderLogin } from './renderLogin.js';

export function renderComments() {
    const commentsHTML = comments
        .map((comment, index) => {
            const likeButtonClass = comment.isLiked
                ? 'like-button -active-like'
                : 'like-button';
            return `<li class="comment">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${new Date(comment.date).toLocaleString()}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text" data-index="${index}">${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="${likeButtonClass}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
        })
        .join('');

    // 2. Определяем, что показать под списком: форму или ссылку
    const formHTML = token
        ? `<div class="add-form">
            <input type="text" class="add-form-name" value="${user ? user.name : ''}" 
            readonly  placeholder="Введите ваше имя" />
            <textarea class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
          </div>`
        : `<p class="nav-text">Чтобы добавить комментарий, <button id="link-to-login" class="link-button">авторизуйтесь</button></p>`;

    const appHTML = `
      <div class="container">
        <ul class="comments" id="comments-list">
            ${commentsHTML}
        </ul>
        ${formHTML}
      </div>`;

    if (app) {
        app.innerHTML = appHTML;
    }

    // 3. "Оживляем" кнопки в зависимости от статуса
    initLikeListeners();
    initQuoteListeners();

    if (token) {
        initAddCommentListener();
    } else {
        // Если не авторизован, вешаем слушатель на кнопку-ссылку
        document
            .getElementById('link-to-login')
            .addEventListener('click', () => {
                renderLogin();
            });
    }
}
