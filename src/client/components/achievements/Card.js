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
      .map(({ title, description, completed, completedDate, completedYear, isFailure }) => {
        const icon = this.renderIcon({ isFailure, completed });
        const completedDateFormat = completedDate ? completedDate : completedYear ? completedYear : '';
        return `<div class="sub-achievement-title">
          ${icon} ${title}</span>
        </div>
        <div class="sub-achievement-completed">${completedDateFormat}</div>
        <div class="sub-achievement-description">${description}</div>`;
      })
      .join('');
  }

  renderSubAchievementsReview() {
    return this.state.subAchievements
      .filter(item => item.review)
      .map(({ title, review, completed, completedDate, completedYear, isFailure }) => {
        const icon = this.renderIcon({ isFailure, completed });
        const completedDateFormat = completedDate ? completedDate : completedYear ? completedYear : '';

        return `<div class="sub-achievement-title">
          ${icon} ${title}</span>
        </div>
        <div class="sub-achievement-completed">${completedDateFormat}</div>
        <div class="sub-achievement-description">${review}</div>`;
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
      completedYear,
      review,
      images,
      isFailure,
      subAchievements,
    } = this.state;

    const icon = this.renderIcon({ isFailure, completed });
    const completedDateFormat = completedDate ? completedDate : completedYear ? completedYear : '';
    const subAchievementRate = (subAchievements.filter(item => item.completed).length / subAchievements.length) * 100;
    const hasSubReview = subAchievements.some(item => item.review);
    const front = `<div class="front">
                    <dl>
                      <dt class="achievement-title">${icon} ${title}</dt>
                      <dd class="achievement-description">${description} 
                        ${
                          completedDateFormat &&
                          `<span class="achievement-completed-date">${completedDateFormat}</span>`
                        }
                      </dd>
                    </dl>
                    ${
                      subAchievements.length > 0
                        ? `<div class="sub-achievements-list">
                            <div class="progress-bar">
                              <span class="box-progress" style="width: ${subAchievementRate}%"></span>
                            </div>${this.renderSubAchievements()}
                          </div>`
                        : ''
                    }
                  </div>`;

    const back = `<div class="back">
                    <dl>
                      <dt class="achievement-title">${title}</dt>
                      <dd class="achievement-description">${review ? review : ''}
                       ${
                         completedDateFormat && `<span class="achievement-completed-date">${completedDateFormat}</span>`
                       }</dd></dd>
                      ${
                        hasSubReview
                          ? `<div class="sub-achievements-list">${this.renderSubAchievementsReview()}</div>`
                          : ''
                      }
                    </dl>
                  </div>`;

    this.target.innerHTML = `
    ${front}
    ${review || hasSubReview ? back : ''}
    `;

    this.container.appendChild(this.target);
  }

  handleEvents() {}
}
