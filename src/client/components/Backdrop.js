import Component from '../core/Component';
export default class Backdrop extends Component {
  handleEvents() {
    this.container.addEventListener('click', e => {
      const sideBar = document.querySelector('.side-bar');
      sideBar.classList.remove('open');
    });
  }
}
