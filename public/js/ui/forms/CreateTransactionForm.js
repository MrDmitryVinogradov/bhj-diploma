/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const newIncome = document.querySelector('#new-income-form');
    const newExpense = document.querySelector('#new-expense-form');
    const incomeAccount = document.querySelector('#income-accounts-list');
    const expenseAccount = document.querySelector('#expense-accounts-list');
    if (this.element === newIncome) {
      Account.list(User.current(), (err, response) => {
        incomeAccount.innerHTML = '';
        let html = [];
        for (let i = 0; i < response.length; i++) {
          html.push(`<option value="${response[i].id}">${response[i].name}</option>`);
        }
        incomeAccount.insertAdjacentHTML('beforeend', html.join(''));
      })
    }
    if (this.element === newExpense) {
      Account.list(User.current(), (err, response) => {
        expenseAccount.innerHTML = '';
        let html = [];
        for (let i = 0; i < response.length; i++) {
          html.push(`<option value="${response[i].id}">${response[i].name}</option>`);
        }
        expenseAccount.insertAdjacentHTML('beforeend', html.join(''));
      });
    }
  }


  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, () => {
      App.update();
      this.element.reset();
      App.getModal('newIncome').close();
      App.getModal('newExpense').close();
    });
  }
}