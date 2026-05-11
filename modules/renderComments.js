import { comments } from './comments.js';
import { initLikeListeners, initQuoteListeners } from './initListeners.js';
import { app } from './elementSearch.js';
// Не забудьте импортировать инициализатор кнопки, если он в initListeners
import { initAddCommentListener } from './addNewComments.js';

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

    const appHTML = `
      <div class="container"> <!-- ДОБАВЛЕНО: Теперь стили CSS заработают -->
        <div id="loader" style="display: none;">
            <h1>Пожалуйста подождите, загружаю комментарии...</h1>
        </div>
        <div>
            <ul class="comments" id="comments-list">
                ${commentsHTML}
            </ul>
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
        </div>
      </div>`;

    if (app) {
        app.innerHTML = appHTML;
    }

    // После того как HTML отрисован, "оживляем" кнопки
    initLikeListeners();
    initQuoteListeners();
    initAddCommentListener();
}
