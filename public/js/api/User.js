/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user';

  static setCurrent(user) {
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.getItem('id') && localStorage.getItem('name')) {
      return {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name')
      }
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      method: 'GET',
      url: this.URL + '/current',
      callback: (err, response) => {
        if (err === null) {
          callback(err, response);
          if (response === 'success') {
            this.current();
          }
          else {
            this.unsetCurrent();
          }
        }
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        else {
          callback(err, response);
        }
      }
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    if (data.name && data.email && data.password) {
      createRequest({
        url: this.URL + '/register',
        method: 'POST',
        data,
        callback: (err, response) => {
          if (err === null) {
            if (response.success) {
              this.setCurrent(response.user);
            }
            else {
              console.log(response.error);
            }
            callback(err, response);
          }
        }
      })
    }
  }


  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: () => {
      callback()
      }
    })
  }
}