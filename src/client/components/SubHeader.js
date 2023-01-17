import { FILTER_ITEMS } from '../constants';
import Component from '../core/Component';
export default class Siebar extends Component {
  constructor({ container, props, setState }) {
    super({ container, props });

    this.setState = setState;
  }

  template() {
    const filterType = this.props;

    return `
    <ul class="filter-list" role="filtering">
      <li class="filter-list-item menu">
        <a href="#" class="filter-list-item-side-toggle-btn">
          <i class="bx bx-menu filter-list-item-icon"></i>
        </a>
      </li>
      ${FILTER_ITEMS.map(({ type, title, icon }) => {
        return `<li class="filter-list-item${filterType === type ? ` active` : ``} " data-filter-type="${type}">
          <a href="#">
            <i class="${icon}  filter-list-item-icon"></i>
            <span class="filter-list-item-text">${title}</span>
          </a>
        </li>`;
      }).join('')}
    </ul>
    `;
  }

  handleEvents() {
    const sideBar = document.querySelector('.side-bar');
    const sideBarOpenBtn = this.container.querySelector('.filter-list-item-side-toggle-btn');
    sideBarOpenBtn.addEventListener('click', e => {
      e.preventDefault();
      sideBar.classList.add('open');
    });

    this.container.addEventListener('click', e => {
      const item = e.target.closest('.filter-list-item:not(.menu)');
      if (!item) {
        return;
      }
      e.preventDefault();

      const sidebarActiveItems = document.querySelectorAll(`.sub-category-item > a.active`);
      sidebarActiveItems.forEach(item => item.classList.remove('active'));

      const active = this.container.querySelector('.active');
      active.classList.remove('active');
      item.classList.add('active');

      const { filterType } = item.dataset;
      const collapse = document.querySelector('.collapse');
      this.setState({ filterType: Number(filterType), sidebarCollapse: collapse });
    });
  }
}
