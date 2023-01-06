import { removeContent } from '../utils';
export default class AboutView {
  constructor({ container, initState }) {
    this.container = container;
    this.state = initState;

    this.render();
  }

  render() {
    const main = document.createElement('main');
    main.classList.add('content');
    main.innerHTML = 'About';

    removeContent();

    this.container.append(main);
  }
}
