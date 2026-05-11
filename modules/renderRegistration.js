import { registration, updateToken, updateUser } from './api.js';
import { featchAndRenderComments } from './featchAndRenderComments.js';
import { renderLogin } from './renderLogin.js';

export const renderRegistration = () => {
    const app = document.getElementById('app');

    app.innerHTML = `
    <div class="container">
        <h1>Страница регистрации</h1>
        <div class="form">
            <h3 class="form-title">Форма регистрации</h3>
            <div class="form-row">
                <input type="text" id="login-input" class="input" placeholder="Логин">
                <input type="text" id="name-input" class="input" placeholder="Имя">
                <input type="password" id="password-input" class="input" placeholder="Пароль">
            </div>
            <br />
            <button class="button" id="login-button">Зарегестрироваться</button>
            <button class="link-button" id="link-to-login">Войти</button>
        </div>
    </div>`;

    const button = document.getElementById('login-button');
    const loginElement = document.getElementById('login-input');
    const passwordElement = document.getElementById('password-input');
    const nameElement = document.getElementById('name-input');
    const linkToLogin = document.getElementById('link-to-login');

    // Переход на страницу входа
    linkToLogin.addEventListener('click', () => {
        renderLogin();
    });

    button.addEventListener('click', () => {
        if (
            !loginElement.value ||
            !nameElement.value ||
            !passwordElement.value
        ) {
            alert('Пожалуйста, заполните все поля формы');
            return;
        }

        button.disabled = true;
        button.textContent = 'Регистрация...';

        registration({
            name: nameElement.value,
            login: loginElement.value,
            password: passwordElement.value,
        })
            .then((responseData) => {
                updateToken(responseData.user.token);
                updateUser(responseData.user);
                featchAndRenderComments();
            })
            .catch((error) => {
                button.disabled = false;
                button.textContent = 'Зарегестрироваться';

                if (error.message === 'User with this login already exists') {
                    alert('Такой логин уже занят');
                } else if (error.message === 'Bad Request') {
                    alert('Логин и пароль должны быть не короче 3 символов');
                } else {
                    alert('Что-то пошло не так, попробуйте позже');
                }
                console.warn(error);
            });
    });
};
