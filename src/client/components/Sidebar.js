import { CATEGORY_ICON } from '../constants';

export default class Siebar {
  constructor({ container, initState }) {
    this.container = container;
    this.target = document.createElement('aside');
    this.target.classList = 'side-bar';
    this.container.appendChild(this.target);

    this.state = [
      {
        id: 1,
        name: 'rest',
        title: '휴식',
        subCategories: [
          {
            id: 1,
            name: 'trip',
            title: '여행',
          },
          {
            id: 2,
            name: 'food',
            title: '음식',
          },
          {
            id: 3,
            name: 'rest-etc',
            title: '기타',
          },
        ],
      },
      {
        id: 2,
        name: 'hobby',
        title: '취미',
        subCategories: [
          {
            id: 4,
            name: 'making',
            title: '제작',
          },
          {
            id: 5,
            name: 'computer',
            title: '컴퓨터',
          },
          {
            id: 6,
            name: 'art',
            title: '예술',
          },
          {
            id: 7,
            name: 'community',
            title: '커뮤니티',
          },
          {
            id: 8,
            name: 'hobby-etc',
            title: '기타',
          },
        ],
      },
      {
        id: 3,
        name: 'health',
        title: '건강',
        subCategories: [
          {
            id: 9,
            name: 'survival',
            title: '생존',
          },
          {
            id: 10,
            name: 'outdoor',
            title: '야외운동',
          },
          {
            id: 11,
            name: 'indoor',
            title: '실내운동',
          },
          {
            id: 12,
            name: 'health-etc',
            title: '기타',
          },
        ],
      },
      {
        id: 4,
        name: 'learn',
        title: '배움',
        subCategories: [
          {
            id: 13,
            name: 'education',
            title: '고등 교육',
          },
          {
            id: 14,
            name: 'certificate',
            title: '자격',
          },
          {
            id: 15,
            name: 'language',
            title: '언어',
          },
        ],
      },
      {
        id: 5,
        name: 'money',
        title: '돈',
        subCategories: [
          {
            id: 16,
            name: 'work',
            title: '직업',
          },
          {
            id: 17,
            name: 'possession',
            title: '소유',
          },
        ],
      },
    ];
    this.render();
    this.handleEvents();
  }

  render() {
    const sidebarHeader = `
    <div class="side-bar-header">
      <a href="#" class="side-bar-close-btn" aria-label="Close Sidebar">
        <i class="bx bx-x bx-spin-hover"></i>
      </a>
      <a href="#" class="side-bar-header-btn" role="presentation" aria-label="Expand/Collapse Sidebar">
        <i class="bx bx-arrow-from-right side-bar-header-btn-icon"></i>
      </a>
    </div>`;
    this.target.innerHTML =
      sidebarHeader +
      `<ul class="main-category">
    ${this.state
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
  }

  handleEvents() {
    const sideBar = document.querySelector('.side-bar');

    const sideBarCloseBtn = document.querySelector('.side-bar-close-btn');
    sideBarCloseBtn.addEventListener('click', e => {
      e.preventDefault();
      sideBar.classList.remove('open');
    });

    const sideBarHeaderBtn = document.querySelector('.side-bar-header-btn');
    const sideBarHeaderBtnIcon = document.querySelector('.side-bar-header-btn-icon');
    sideBarHeaderBtn.addEventListener('click', e => {
      e.preventDefault();
      sideBar.classList.toggle('collapse');

      sideBarHeaderBtnIcon.classList = sideBar.classList.contains('collapse')
        ? 'bx bx-arrow-from-left side-bar-header-btn-icon'
        : 'bx bx-arrow-from-right side-bar-header-btn-icon';
    });

    const mediaSize992 = window.matchMedia('(min-width: 992px)');
    mediaSize992.addEventListener('change', e => {
      if (e.matches) {
        sideBar.classList.remove('open');
      }
    });
  }
}
