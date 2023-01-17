import Component from '../../core/Component';
import AchievementsDashboard from './Dashboard';
import AchievementsList from './List';

export default class Achievements extends Component {
  template() {
    return `
      <div class="achievements-dashboard"></div>
      <div class="achievements-content"></div>
    `;
  }

  mounted() {
    const dashboard = document.querySelector('.achievements-dashboard');
    new AchievementsDashboard({ container: dashboard, props: this.props.trending });

    const list = document.querySelector('.achievements-content');
    new AchievementsList({ container: list, props: this.props });
  }

  handleEvents() {
    this.container.addEventListener('click', e => {
      if (!e.target.closest('.achievement-wrapper')) {
        const flippedCards = [...document.querySelectorAll('.flipped')];
        flippedCards.forEach(item => item.classList.remove('flipped'));
        return;
      }

      const card = e.target.closest('.achievement-wrapper');
      card.classList.toggle('flipped');
    });

    this.container.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        const card = document.querySelector('.achievement-wrapper:focus');
        card.classList.toggle('flipped');
      }
    });
  }
}
