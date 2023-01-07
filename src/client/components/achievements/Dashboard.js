export default class AchievementsDashboard {
  constructor({ container }) {
    this.container = container;
    this.target = document.createElement('div');
    this.target.classList = 'achievements-dashboard';
    this.container.appendChild(this.target);

    this.render();
  }

  render() {
    this.target.innerHTML = `
    <div class="achievements-dashboard-header">
      <span class="dashboard-title">통계</span>
    </div>
    <div class="dashboard-contents">
      <div class="total-status">
        <div class="item-status">
          <span class="status-type">달성</span>
          <span class="status-number">45</span>
        </div>
        <div class="item-status">
          <span class="status-type">미달성</span>
          <span class="status-number">24</span>
        </div>
        <div class="item-status">
          <span class="status-type">총 업적</span>
          <span class="status-number">62</span>
        </div>
      </div>
      <div class="year-status">
        <div class="year-status-item">
          <div class="year-status-item-content">
            <span class="year-status-item-type">올해</span>
            <span class="year-status-item-number">7</span>
          </div>
          <div class="year-status-item-trending trending-down">
            <span class="year-status-item-trending-icon"><i class="bx bx-trending-down bx-md"></i></span>
            <span class="year-status-item-trending-number">-5(-42%)</span>
            <span class="year-status-item-trending-type">vs. 지난해</span>
          </div>
        </div>
        <div class="year-status-item">
          <div class="year-status-item-content">
            <span class="year-status-item-type">지난 해</span>
            <span class="year-status-item-number">12</span>
          </div>
          <div class="year-status-item-trending trending-down">
            <span class="year-status-item-trending-icon"><i class="bx bx-trending-down bx-md"></i></span>
            <span class="year-status-item-trending-number">4(50%)</span>
            <span class="year-status-item-trending-type">vs. 지지난 해</span>
          </div>
        </div>
        <div class="year-status-item">
          <div class="year-status-item-content">
            <span class="year-status-item-type">지지난해</span>
            <span class="year-status-item-number">8</span>
          </div>
          <div class="year-status-item-trending trending-up">
            <span class="year-status-item-trending-icon"><i class="bx bx-trending-up bx-md"></i></span>
            <span class="year-status-item-trending-number">-11(-50%)</span>
            <span class="year-status-item-trending-type">vs. 2019년</span>
          </div>
        </div>
        <div class="year-status-item">
          <div class="year-status-item-content">
            <span class="year-status-item-type">최근 3년</span>
            <span class="year-status-item-number">27</span>
          </div>
          <div class="year-status-item-trending trending-up">
            <span class="year-status-item-trending-icon"><i class="bx bx-trending-up bx-md"></i></span>
            <span class="year-status-item-trending-number">7(35%)</span>
            <span class="year-status-item-trending-type">vs. 이전 3년</span>
          </div>
        </div>
      </div>
    </div>  
    `;
  }
}
