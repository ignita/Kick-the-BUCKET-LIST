import View from '../core/View';

export default class AboutView extends View {
  constructor({ container }) {
    super({ container });
  }

  template() {
    return `
      <main class="content">
      About
      </main>
    `;
  }
}
