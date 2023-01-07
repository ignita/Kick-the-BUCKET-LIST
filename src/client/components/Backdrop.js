export default class Backdrop {
  constructor({ container }) {
    this.container = container;
    this.target = document.createElement('div');
    this.target.classList = 'side-bar-backdrop';
    this.container.appendChild(this.target);

    this.handleEvents();
  }

  handleEvents() {
    this.target.addEventListener('click', e => {
      const sideBar = document.querySelector('.side-bar');
      sideBar.classList.remove('open');
    });
  }
}
