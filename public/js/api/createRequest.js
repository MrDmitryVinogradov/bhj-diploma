/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method === 'GET') {
        let url = options.url + '?';
        for (let key in options.data) {
            url = url + `${key}=${options.data[key]}&`;
        }
        url = url.slice(0, -1);
        xhr.open('GET', url);
        try {
            xhr.send()
        }
        catch (e) {
            let err = e;
            options.callback(err, response);
        }
    }
    else {
        let formdata = new FormData();
        for (key in options.data) {
            formdata.append(key, options.data[key]);
        }
        xhr.open(options.method, options.url);
        try {
            xhr.send(formdata);
        } catch (e) {
            let err = e;
            options.callback(err, response);
        }
    }
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let err = null;
            let response = xhr.response;
            options.callback(err, response);
        }
    });
}
