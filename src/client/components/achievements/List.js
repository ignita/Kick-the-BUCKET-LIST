import AchievementsCard from './Card';
import { FILTER_TYPE } from '../../constants';
import Component from '../../core/Component';

export default class AchievementsList extends Component {
  filteredData({ achievements, filterType }) {
    let filtered = [];
    switch (filterType) {
      case FILTER_TYPE.ALL:
        filtered = achievements;
        break;
      case FILTER_TYPE.COMPLETED:
        filtered = achievements.filter(item => {
          return item.completed || item.subAchievements.some(subItem => subItem.completed);
        });
        break;
      case FILTER_TYPE.INCOMPLETED:
        filtered = achievements.filter(item => !item.completed);
        break;
      case FILTER_TYPE.FAILURE:
        filtered = achievements.filter(item => {
          return item.isFailure || item.subAchievements.some(subItem => subItem.isFailure);
        });
        break;
    }

    return filtered;
  }

  renderCategoryTitle({ name, title }) {
    return `
      <h1 id="${name}" class="category-title">${title}</h1>
    `;
  }

  renderSubCategoryTitle({ name, title }) {
    return `
      <h2 id="${name}" class="category-title">${title}</h2>
    `;
  }

  template() {
    let categoryTemplate = '';
    const { categories, achievements, filterType } = this.props;
    const filtered = this.filteredData({ achievements, filterType });

    categories.forEach(({ title, name, subCategories }) => {
      const subCategoryIds = subCategories.map(({ id }) => id);
      const hasItem = filtered.some(item => subCategoryIds.includes(item.subCategoryId));

      if (hasItem) {
        categoryTemplate += this.renderCategoryTitle({ name, title });

        subCategories.forEach(({ id, name, title }) => {
          const hasItem = filtered.some(item => id === item.subCategoryId);
          if (hasItem) {
            categoryTemplate += this.renderSubCategoryTitle({ name, title });
            categoryTemplate += `<div class="achievements-list" data-category-id="${id}"></div>`;
          }
        });
      }
    });
    return categoryTemplate;
  }

  mounted() {
    const { achievements, filterType } = this.props;
    const filtered = this.filteredData({ achievements, filterType });

    const achievementsWrappers = document.querySelectorAll('.achievements-list');
    achievementsWrappers.forEach(achievementsWrapper => {
      const { categoryId } = achievementsWrapper.dataset;
      const achievements = filtered.filter(({ subCategoryId }) => subCategoryId === Number(categoryId));
      new AchievementsCard({ container: achievementsWrapper, props: achievements });
    });
  }

  handleEvents() {
    const changeNav = entries => {
      entries.forEach(entry => {
        const { isIntersecting, intersectionRatio, target } = entry;
        const { id } = target;
        const anchor = document.querySelector('a[href*=' + id + ']');
        if (isIntersecting && intersectionRatio >= 0.55) {
          if (anchor) {
            anchor.classList.add('active');
          }
        } else {
          if (anchor) {
            anchor.classList.remove('active');
          }
        }
      });
    };

    const navObserver = new IntersectionObserver(changeNav, {
      threshold: 0.8,
    });
    const sections = document.querySelectorAll('h2.category-title');
    sections.forEach(section => navObserver.observe(section));
  }
}
