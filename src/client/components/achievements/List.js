import AchievementsCard from './Card';
import { FILTER_TYPE } from '../../constants';

export default class AchievementsList {
  constructor({ container, initState }) {
    this.container = container;
    this.target = document.createElement('div');
    this.target.classList = 'achievements-list';
    this.state = initState;

    this.render();
    this.handleEvents();
  }

  renderCategoryTitle({ name, title }) {
    const el = document.createElement('h1');
    this.setCategoryAttributes({ el, name, title });
    return el;
  }

  renderSubCategoryTitle({ name, title }) {
    const el = document.createElement('h2');
    this.setCategoryAttributes({ el, name, title });
    return el;
  }

  setCategoryAttributes({ el, name, title }) {
    el.id = `${name}`;
    el.className = 'category-title';
    el.innerText = title;

    return el;
  }

  render() {
    const { categories, achievements, filterType } = this.state;

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

    categories.forEach(({ title, name, subCategories }) => {
      const subCategoryIds = subCategories.map(({ id }) => id);
      const hasItem = filtered.some(item => subCategoryIds.includes(item.subCategoryId));

      if (hasItem) {
        const categoryTitle = this.renderCategoryTitle({ name, title });
        this.container.appendChild(categoryTitle);

        subCategories.forEach(({ id, name, title }) => {
          const hasItem = filtered.some(item => id === item.subCategoryId);
          if (hasItem) {
            const categoryTitle = this.renderSubCategoryTitle({ name, title });
            this.container.appendChild(categoryTitle);

            const achievementWrapper = document.createElement('div');
            achievementWrapper.className = 'achievements-list';
            const achievementsByCategory = filtered.filter(({ subCategoryId }) => subCategoryId === id);
            achievementsByCategory.forEach(achievement => {
              new AchievementsCard({ container: achievementWrapper, initState: achievement });
            });

            this.container.appendChild(achievementWrapper);
          }
        });
      }
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
