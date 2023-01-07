export default class AchievementsCard {
  constructor({ container, initState }) {
    this.container = container;
    this.target = document.createElement('div');
    this.target.classList = 'achievement-wrapper';
    this.target.tabIndex = 0;
    this.state = initState;

    this.render();
    this.handleEvents();
  }

  renderIcon({ isFailure, completed }) {
    return isFailure
      ? `<i class='bx bxs-error'></i>`
      : completed
      ? `<i class='bx bx-checkbox-checked'></i>`
      : `<i class='bx bx-checkbox'></i>`;
  }

  renderSubAchievements() {
    return this.state.subAchievements
      .map(({ title, description, completed, completedDate, isFailure }) => {
        const icon = this.renderIcon({ isFailure, completed });
        return `<div class="sub-achievement-title">
          ${icon} ${title}</span>
        </div>
        <div class="sub-achievement-completed">${completed ? completedDate : ''}</div>
        <div class="sub-achievement-description">${description}</div>`;
      })
      .join('');
  }
  render() {
    const {
      id,
      subCategoryId,
      achievementsId,
      title,
      description,
      completed,
      completedDate,
      review,
      images,
      isFailure,
      subAchievements,
    } = this.state;

    const icon = this.renderIcon({ isFailure, completed });
    this.target.innerHTML = `
    <div class="front">
      <dl>
        <dt class="achievement-title">${icon} ${title}</dt>
        <dd class="achievement-description">${description}</dd>
      </dl>
      ${subAchievements.length > 0 ? `<div class="sub-achievements-list">${this.renderSubAchievements()}</div>` : ''}
    </div>`;

    this.container.appendChild(this.target);
  }

  handleEvents() {}
}
