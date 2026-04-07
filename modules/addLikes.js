 import {comments} from "./comments.js";
 import {renderComments} from "./renderComments.js";

 export function likeHandler(event) {
          event.stopPropagation(); // тобы не вызывала всплытие(не срабатывали все элементы)
          // Получаем индекс комментария из data-атрибута
        const index = event.currentTarget.dataset.index;
        const comment = comments[index];
      //МОДУЛЬ
    // Счетчик лайков туда и обратно из 1 урока
        if (comment.isLiked) {
      
          comment.likes--;
          comment.isLiked = false;
        } else {

          comment.likes++;
          comment.isLiked = true;
      }
      renderComments (); 
    }