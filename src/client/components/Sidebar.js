import { CATEGORY_ICON } from '../constants';
import Component from '../core/Component';
import { showToastMessage } from '../utils';

export default class Siebar extends Component {
  constructor({ container, props }) {
    super({ container, props });
    this.container.classList.toggle('collapse', this.props.sidebarCollapse);
  }

  template() {
    const { categories, sidebarCollapse } = this.props;

    const sidebarHeader = `
    <div class="side-bar-header">
      <a href="#" class="side-bar-close-btn" aria-label="Close Sidebar">
        <i class="bx bx-x bx-spin-hover"></i>
      </a>
      <a href="#" class="side-bar-header-btn" role="presentation" aria-label="Expand/Collapse Sidebar">
        <i class="bx bx-arrow-from-${sidebarCollapse ? 'left' : 'right'} side-bar-header-btn-icon"></i>
      </a>
    </div>`;

    const sidebar =
      sidebarHeader +
      `<ul class="main-category">
  ${categories
    .map(({ title, name, subCategories }) => {
      return `<li>
        <a class="main-category-header" href="#${name}">${title}</a>
        <ul class="sub-category">
        ${subCategories
          .map(({ name, title }) => {
            return `<li class="sub-category-item">
            <a href="#${name}">
              <i class="${CATEGORY_ICON[name]}  sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">${title}</span>
            </a>
          </li>`;
          })
          .join('')}
        </ul>
      </li>`;
    })
    .join('')}
  </ul>`;

    return sidebar;
  }

  handleEvents() {
    const sideBarCloseBtn = this.container.querySelector('.side-bar-close-btn');
    sideBarCloseBtn.addEventListener('click', e => {
      e.preventDefault();
      this.container.classList.remove('open');
    });

    const sideBarHeaderBtn = this.container.querySelector('.side-bar-header-btn');
    const sideBarHeaderBtnIcon = this.container.querySelector('.side-bar-header-btn-icon');
    sideBarHeaderBtn.addEventListener('click', e => {
      e.preventDefault();

      this.container.classList.toggle('collapse');
      sideBarHeaderBtnIcon.classList = this.container.classList.contains('collapse')
        ? 'bx bx-arrow-from-left side-bar-header-btn-icon'
        : 'bx bx-arrow-from-right side-bar-header-btn-icon';
    });

    const mediaSize992 = window.matchMedia('(min-width: 992px)');
    mediaSize992.addEventListener('change', e => {
      if (e.matches) {
        this.container.classList.remove('open');
      }
    });

    this.container.addEventListener('click', e => {
      if (!e.target.closest('.sub-category-item')) {
        return;
      }
      e.preventDefault();
      const anchor = e.target.closest('a');
      const [prefix, category] = anchor.hash.split('#');

      const categoryHeader = document.querySelector(`h2#${category}`);
      if (categoryHeader) {
        categoryHeader.scrollIntoView({ behavior: 'smooth' });
      } else {
        showToastMessage('해당 카테고리 항목이 없습니다!');
      }
    });
  }
}
