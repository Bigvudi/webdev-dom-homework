import {formName} from "./elementSearch.js";
import {renderComments} from "./renderComments.js";
import {formText} from "./elementSearch.js";
import {formButton} from "./elementSearch.js";
import {comments} from "./comments.js";
import {clearText} from "./clearText.js"


formButton.addEventListener('click', ()  => {
      formName.classList.remove("error");
      formText.classList.remove("error");

      if (!formName.value.trim()) { // trim обрежет пробелы и проверит, что пользователь не попытался обойти валидацию с помощью пробелов
      formName.classList.add("error");
      return;
      }

      if (!formText.value.trim()) {
        formText.classList.add("error");
        return;
      }
        //МОДУЛЬ
      const now = new Date();
      const date = 
        now.getDate().toString().padStart(2, '0') + '.' + 
        (now.getMonth() + 1).toString().padStart(2, '0') + '.' + 
        now.getFullYear().toString().slice(-2) + ' ' + 
        now.getHours().toString().padStart(2, '0') + ':' + 
        now.getMinutes().toString().padStart(2, '0');

        //МОДУЛЬ
      comments.push({
        name: clearText(formName.value),
        date: date,
        text: clearText(formText.value),
        likes: 0,
        isLiked: false
      });

    renderComments ();

  
      formName.value = ""; //обнуляем строку вода
      formText.value = "";

    });