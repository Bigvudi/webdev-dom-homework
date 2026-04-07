import {likeHandler} from "./addLikes.js";
import {comments} from "./comments.js";
import {formText} from "./elementSearch.js";

export function initEventListeners() {
        const likeButtons = document.querySelectorAll('.like-button')
        for (const button of likeButtons) {
          button.addEventListener('click', likeHandler);
      }
        // ДОБАВЛЯЮ ОБРАБОТЧИКИ ДЛЯ ЦИТИРОВАНИЯ (клик по всему комментарию)
        const commentElements = document.querySelectorAll('.comment');
        for (const commentElement of commentElements) {
          commentElement.addEventListener('click', () => {
      // Находим индекс через кнопку лайка внутри этого комментария
        const index = commentElement.querySelector('.like-button').dataset.index;
        const comment = comments[index];

      // Записываем данные в поле ввода (textarea)
      // Сначала символ цитаты ">", потом текст, потом имя автора
          formText.value = `> ${comment.text}\n\n${comment.name}, `;
      
      // Ставим фокус (курсор), чтобы сразу начать печатать
      formText.focus();
    });
}
}