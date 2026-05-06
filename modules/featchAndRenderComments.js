import { renderComments } from './renderComments.js';
import { updateComments } from './comments.js';
import { loader } from './elementSearch.js';

export const featchAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/tyryshkin-sergei2/comments')
        .then((response) => {
            // Добавляем проверку на 500, чтобы работал автоповтор
            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            loader.style.display = 'none';
            updateComments(data.comments);
            renderComments();
        })
        .catch((error) => {
            // Если сервер "упал" при загрузке списка — повторяем запрос (рекурсия)
            if (error.message === 'Сервер сломался, попробуй позже') {
                console.warn('Ошибка 500 на GET. Повторяю получение списка...');
                return featchAndRenderComments();
            }
            // Ловим отсутствие интернета
            if (error.message === 'Failed to fetch') {
                alert('Кажется, у вас сломался интернет, попробуйте позже.');
            }
            console.error(error);
        });
};
