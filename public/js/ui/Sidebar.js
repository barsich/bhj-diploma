/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.getElementsByTagName('body');
    const sidebarToggle = document.querySelector('[data-toggle="push-menu"]');
    sidebarToggle.addEventListener('click', () => {
      body[0].classList.toggle('sidebar-open');
      body[0].classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const menuItems = Array.from(document.querySelectorAll('.menu-item'));
    menuItems.forEach((item) =>
      item.addEventListener('click', (event) => {
        event.preventDefault();
        switch (event.currentTarget.className) {
          case 'menu-item menu-item_login':
            App.getModal('login').open();
            break;
          case 'menu-item menu-item_register':
            App.getModal('register').open();
            break;
          case 'menu-item menu-item_logout':
            //TODO: При нажатии на кнопку «Выйти» необходимо вызвать метод User.logout и после успешного выхода (response.success = true), нужно вызвать App.setState( 'init' )
            User.logout();
            break;
        }
      })
    );
  }
}