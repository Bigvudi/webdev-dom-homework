const host = 'https://wedev-api.sky.pro/api/v2/tyryshkin-sergei2/comments';
let token = '';

export const updateToken = (newToken) => {
    token = newToken;
};

const authToken = 'https://wedev-api.sky.pro/api/user';

// Универсальный обработчик ответов
const handleResponse = (response) => {
    if (response.status === 201 || response.status === 200) {
        return response.json();
    }

    if (response.status === 400) {
        throw new Error('Имя и комментарий должны быть не короче 3 символов');
    }

    if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже');
    }

    if (response.status === 401) {
        throw new Error('Вы не авторизованы');
    }

    throw new Error('Что-то пошло не так');
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
            text, // API v2 часто требует только text, так как имя берется из профиля юзера
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
