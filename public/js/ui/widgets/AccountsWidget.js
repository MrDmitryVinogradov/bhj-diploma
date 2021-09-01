/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    try {
      this.element = element;
    } catch (e) {
      console.log(e);
    };

    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = document.querySelector('.create-account');

    createAccount.addEventListener('click', () => {
      (App.getModal('createAccount')).open();
    });

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.onSelectAccount(e.target.closest('.account'))
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();
    if (user) {
      Account.list(user, (err, response) => {
        this.clear();
        this.renderItem(response);
      });
    };
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    for (const i of Array.from(document.querySelectorAll('.account'))) {
        i.remove();
      }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    if (element) {
      for (const i of document.querySelectorAll('.account')) {
        if (i.classList.contains('active')) {
          i.classList.remove('active');
        };
      }
      element.classList.add('active');
      App.showPage('transactions', { account_id: element.dataset.id });
    } else {
      return;
    }
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    const html = `<li class="active account" data-id="${item.id}">
                      <a href="#">
                          <span>${item.name}</span> /
                          <span>${item.sum} ₽</span>
                      </a>
                  </li>`
    return html;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    for (let i = 0; i < data.length; i++) {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data[i]));
    };
  }
}