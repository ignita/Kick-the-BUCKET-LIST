import AchievementsDashboard from './Dashboard';
import AchievementsList from './List';

export default class Achievements {
  constructor({ container, initState }) {
    this.container = container;
    this.target = document.createElement('main');
    this.target.classList = 'achievements-wrapper';
    this.container.appendChild(this.target);

    this.state = initState;
    this.render();
    this.handleEvents();
  }

  render() {
    new AchievementsDashboard({ container: this.target, initState: this.state.trending });
    new AchievementsList({ container: this.target, initState: this.state });
  }

  handleEvents() {
    this.target.addEventListener('click', e => {
      if (!e.target.closest('.achievement-wrapper')) {
        const flippedCards = [...document.querySelectorAll('.flipped')];
        flippedCards.forEach(item => item.classList.remove('flipped'));
        return;
      }

      const card = e.target.closest('.achievement-wrapper');
      card.classList.toggle('flipped');
    });

    this.target.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        const card = document.querySelector('.achievement-wrapper:focus');
        card.classList.toggle('flipped');
      }
    });
  }
}
