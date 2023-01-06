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

    [...this.container.children].forEach(layoutTag => {
      if (layoutTag.tagName !== 'HEADER') {
        layoutTag.remove();
      }
    });
    this.container.append(main);
  }
}
