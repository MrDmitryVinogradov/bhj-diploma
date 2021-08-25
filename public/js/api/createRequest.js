/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    const data = options.data;
    if (options.method === 'GET') {
        if (data) {
            let url = options.url + '?';
            for (key in data) {
               url = url + `${key}` + '=' + `${options.data[key]}` + '&';
            }
            xhr.open('GET', url, true);
        } else {
            xhr.open('GET', `${options.url}?mail=${options.mail}&password=${options.password}`);
        }
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
        for (key in data) {
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
