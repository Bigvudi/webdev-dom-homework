const host = 'https://wedev-api.sky.pro/api/v2/tyryshkin-sergei2/comments';
export let token = '';
export let user = '';

export const updateToken = (newToken) => {
    token = newToken;
};

export const updateUser = (newUser) => {
    user = newUser;
};

const authToken = 'https://wedev-api.sky.pro/api/user';

// Универсальный обработчик ответов
const handleResponse = (response) => {
    if (response.status === 201 || response.status === 200) {
        return response.json();
    }

    // Вместо мгновенного throw, сначала читаем JSON от сервера
    return response.json().then((errorData) => {
        if (response.status === 400) {
            // errorData.error — это то самое сообщение от сервера (например, "Такой логин уже есть")
            throw new Error(errorData.error);
        }

        if (response.status === 500) {
            throw new Error('Сервер сломался, попробуй позже');
        }

        if (response.status === 401) {
            throw new Error('Вы не авторизованы');
        }

        throw new Error('Что-то пошло не так');
    });
};

export function getComments() {
    return fetch(host, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(handleResponse);
}

export function postComments({ text }) {
    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
        }),
    }).then(handleResponse);
}

export function login({ login, password }) {
    return fetch(`${authToken}/login`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then(handleResponse);
}

export function registration({ login, name, password }) {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    }).then(handleResponse);
}
