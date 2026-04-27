import { comments } from './comments.js';
import { initLikeListeners, initQuoteListeners } from './initListeners.js';
import { containerComments } from './elementSearch.js';

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
            <div class="comment-text">${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="${likeButtonClass}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
        })
        .join(''); /*склеиваем массив в строку */

    containerComments.innerHTML = commentsHTML; /*добавляем массив HTML */
    initLikeListeners();
    initQuoteListeners();
}
