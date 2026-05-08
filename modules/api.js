const host = 'https://wedev-api.sky.pro/api/v2/tyryshkin-sergei2/comments';
const token = 'Bearer syf45t3c34tc3rt43tc4ct53y34 ';

export function getComments() {
    return fetch(host, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response.json(); // Преобразуем ответ сервера в JSON
    });
}

export function postComments(text) {
    // Делаем запрос на сервер, чтобы получить список задач

    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
        }),
    }).then((response) => {
        return response.json(); // Преобразуем ответ сервера в JSON
    });
}
