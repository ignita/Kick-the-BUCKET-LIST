export default class Siebar {
  constructor({ container, initState }) {
    this.container = container;
    this.target = document.createElement('section');
    this.target.classList = 'sub-header';
    this.container.appendChild(this.target);

    this.render();
    this.handleEvents();
  }

  render() {
    this.target.innerHTML = `
    <ul class="filter-list" role="filtering">
      <li class="filter-list-item">
        <a href="#" class="filter-list-item-side-toggle-btn">
          <i class="bx bx-menu filter-list-item-icon"></i>
        </a>
      </li>
      <li class="filter-list-item active">
        <a href="#">
          <i class="bx bx-checkbox-square filter-list-item-icon"></i>
          <span class="filter-list-item-text">전체</span>
        </a>
      </li>
      <li class="filter-list-item">
        <a href="#">
          <i class="bx bx-checkbox-checked filter-list-item-icon"></i
          ><span class="filter-list-item-text">달성</span>
        </a>
      </li>
      <li class="filter-list-item">
        <a href="#">
          <i class="bx bx-checkbox filter-list-item-icon"></i><span class="filter-list-item-text">미달성</span>
        </a>
      </li>
      <li class="filter-list-item">
        <a href="#">
          <i class="bx bxs-error filter-list-item-icon"></i><span class="filter-list-item-text">실패</span>
        </a>
      </li>
    </ul>
    `;
  }

  handleEvents() {
    const sideBar = document.querySelector('.side-bar');
    const sideBarOpenBtn = document.querySelector('.filter-list-item-side-toggle-btn');
    sideBarOpenBtn.addEventListener('click', e => {
      e.preventDefault();
      sideBar.classList.add('open');
    });
  }
}
