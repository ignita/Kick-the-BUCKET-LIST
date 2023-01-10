export default class NotFoundView {
  constructor({ container }) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = `
    <div class="not-found">
      <div class="not-found-box">
        페이지를 찾을 수 없습니다.
      </div>
    </div>`;
  }
}
