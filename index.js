import { loader } from './modules/elementSearch.js';
import { renderComments } from './modules/renderComments.js';
import { initAddCommentListener } from './modules/addNewComments.js';
import { updateComments } from './modules/comments.js';

fetch('https://wedev-api.sky.pro/api/v1/tyryshkin-sergei2/comments')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        loader.style.display = 'none';
        updateComments(data.comments);
        renderComments();
    });

initAddCommentListener();
