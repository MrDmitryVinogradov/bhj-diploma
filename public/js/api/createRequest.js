/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method === 'GET') {
        if (options.data) {
            let url = options.url + '?';
            for (key in options.data) {
               url = url + `${key}` + '=' + `${options.data[key]}` + '&';
            }
            xhr.open('GET', url, true);
        } else {
            xhr.open('GET', `${options.url}?mail=${options.email}&password=${options.password}`);
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
        for (key in options.data) {
            formdata.append(key, options.data[key]);
        }
        xhr.open(options.method, options.url, true);
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
