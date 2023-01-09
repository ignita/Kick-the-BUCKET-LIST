import { FILTER_ITEMS, FILTER_TYPE } from '../constants';
export default class Siebar {
  constructor({ container, initState, onFilter }) {
    this.container = container;
    this.target = document.createElement('section');
    this.target.classList = 'sub-header';
    this.container.appendChild(this.target);

    this.state = initState;
    this.filterItem = onFilter;

    this.render();
    this.handleEvents();
  }

  render() {
    const filterType = this.state;
    this.target.innerHTML = `
    <ul class="filter-list" role="filtering">
      <li class="filter-list-item menu">
        <a href="#" class="filter-list-item-side-toggle-btn">
          <i class="bx bx-menu filter-list-item-icon"></i>
        </a>
      </li>
      ${FILTER_ITEMS.map(({ type, title }) => {
        return `<li class="filter-list-item${filterType === type ? ` active` : ``} " data-filter-type="${type}">
          <a href="#">
            <i class="bx bx-checkbox-square filter-list-item-icon"></i>
            <span class="filter-list-item-text">${title}</span>
          </a>
        </li>`;
      }).join('')}
    </ul>
    `;
  }

  handleEvents() {
    const sideBar = document.querySelector('.side-bar');
    const sideBarOpenBtn = this.target.querySelector('.filter-list-item-side-toggle-btn');
    sideBarOpenBtn.addEventListener('click', e => {
      e.preventDefault();
      sideBar.classList.add('open');
    });

    this.target.addEventListener('click', e => {
      const item = e.target.closest('.filter-list-item:not(.menu)');
      if (!item) {
        return;
      }
      e.preventDefault();

      const sidebarActiveItems = document.querySelectorAll(`.sub-category-item > a.active`);
      sidebarActiveItems.forEach(item => item.classList.remove('active'));

      const active = this.target.querySelector('.active');
      active.classList.remove('active');
      item.classList.add('active');

      const { filterType } = item.dataset;
      this.filterItem({ filterType: Number(filterType) });
    });
  }
}
