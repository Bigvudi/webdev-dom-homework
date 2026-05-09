import { renderComments } from './renderComments.js';
import { updateComments } from './comments.js';
import { getComments } from './api.js';

export const featchAndRenderComments = () => {
    // Ищем лоадер прямо здесь. Если его нет в HTML — будет null
    const loaderElement = document.getElementById('loader');

    return getComments()
        .then((data) => {
            console.log(data);

            // Проверяем существование перед тем как менять style
            if (loaderElement) {
                loaderElement.style.display = 'none';
            }

            updateComments(data.comments);
            renderComments();
        })
        .catch((error) => {
            if (error.message === 'Сервер сломался, попробуй позже') {
                console.warn('Ошибка 500 на GET. Повторяю получение списка...');
                return featchAndRenderComments();
            }

            if (error.message === 'Failed to fetch') {
                alert('Кажется, у вас сломался интернет, попробуйте позже.');
            }

            console.error(error);
        });
};
