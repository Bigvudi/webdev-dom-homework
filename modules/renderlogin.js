import { login, updateToken, updateUser } from './api.js';
import { featchAndRenderComments } from './featchAndRenderComments.js';
import { renderRegistration } from './renderRegistration.js';

export const renderLogin = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
    <h1>Страница входа</h1>
<div class="form">
    <h3 class="form-title">Форма входа</h3>
    <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин">
        <input type="password" id="password-input" class="input" placeholder="Пароль">
    </div>
    <br />
    <button class="button" id="login-button">Войти</button>
    <button class="button" id="reg-button">Зарегестрироваться</button>
</div>`;

    const button = document.getElementById('login-button');
    const loginElement = document.getElementById('login-input');
    const passwordElement = document.getElementById('password-input');

    button.addEventListener('click', () => {
        // Проверка на пустые поля
        if (!loginElement.value || !passwordElement.value) {
            alert('Введите логин и пароль');
            return;
        }

        // Блокировка кнопки
        button.disabled = true;
        button.textContent = 'Входим...';

        login({
            login: loginElement.value,
            password: passwordElement.value,
        })
            .then((responseData) => {
                updateToken(responseData.user.token);
                updateUser(responseData.user);
                featchAndRenderComments();
            })
            .catch((error) => {
                // Разблокировка при ошибке
                button.disabled = false;
                button.textContent = 'Войти';

                if (error.message === 'Вы не авторизованы') {
                    alert('Неверный логин или пароль');
                } else {
                    alert('Кажется, что-то пошло не так. Попробуйте позже');
                }
                console.warn(error);
            });
    });

    const buttonReg = document.getElementById('reg-button');
    buttonReg.addEventListener('click', () => {
        renderRegistration();
    });
};
