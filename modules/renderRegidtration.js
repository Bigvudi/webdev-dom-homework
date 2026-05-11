import { registration } from './api.js';
import { updateToken } from './api.js';
import { featchAndRenderComments } from './featchAndRenderComments.js';

export const renderRegistration = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
    <h1>Страница регистрации</h1>
<div class="form">
    <h3 class="form-title">Форма входа</h3>
    <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин">
        <input type="text" id="name-input" class="input" placeholder="Имя">
        <input type="password" id="password-input" class="input" placeholder="Пароль">
    </div>
    <br />
    <button class="button" id="login-button">Зарегестрироваться</button>
</div>`;

    const button = document.getElementById('login-button');
    const loginElement = document.getElementById('login-input');
    const passwordElement = document.getElementById('password-input');
    const nameElement = document.getElementById('name-input');
    button.addEventListener('click', () => {
        registration({
            name: nameElement.value,
            login: loginElement.value,
            password: passwordElement.value,
        }).then((responseData) => {
            updateToken(responseData.user.token);
            featchAndRenderComments();
        });
    });
};
