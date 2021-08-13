/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method === 'GET') {
        if (options.data) {
            xhr.open(options.method, options.url + '?mail=' + options.data.mail + '&password=' + options.data.password, true);
            try {
                xhr.send()
            }
            catch (e) {
                options.callback(e);
            }
        }
    }
    if (options.method != 'GET') {
        let formdata = new FormData();
        for (key in options.data) {
            formdata.append(key, options.data[key]);
        }
        xhr.open(options.method, options.url, true);
        try {
            xhr.open(options.method, options.url, true);
            xhr.send(formdata);
        } catch (e) {
            options.callback(e);
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
