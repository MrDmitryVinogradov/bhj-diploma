/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
    static URL = '/transaction';
    static get(id = '', callback) {
      createRequest({
        method: 'GET',
        url: this.URL,
        callback: (err, response) => {
          if (err === null && response.success) {
            callback(err, response)
          }
        }
      })
    }
}
