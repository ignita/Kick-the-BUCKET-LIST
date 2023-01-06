import { removeContent } from '../utils';
export default class StatsView {
  constructor({ container, initState }) {
    this.container = container;
    this.state = initState;

    this.render();
  }

  render() {
    const main = document.createElement('main');
    main.classList.add('content');
    main.innerHTML = 'Stats';

    removeContent();

    this.container.append(main);
  }
}
