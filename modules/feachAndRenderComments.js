import { renderComments } from './renderComments.js';
import { updateComments } from './comments.js';
import { loader } from './elementSearch.js';

export const feachAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/tyryshkin-sergei2/comments')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            loader.style.display = 'none';
            updateComments(data.comments);
            renderComments();
        });
};
