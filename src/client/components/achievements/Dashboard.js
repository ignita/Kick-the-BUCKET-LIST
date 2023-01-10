export default class AchievementsDashboard {
  constructor({ container, initState }) {
    this.container = container;
    this.target = document.createElement('div');
    this.target.classList = 'achievements-dashboard';
    this.container.appendChild(this.target);

    this.state = initState;

    this.render();
  }

  render() {
    const {
      thisYear = 0,
      thisYearTrending = 0,
      gapThisYear = 0,
      lastYear = 0,
      lastYearTrending = 0,
      gapLastYear = 0,
      yearBeforeLast = 0,
      yearBeforeLastTrending = 0,
      gapYearBeforeLast = 0,
      lastThreeYears = 0,
      lastThreeYearsTrending = 0,
      gapLastThreeYears = 0,
      incompleted = 0,
      total = 0,
      completed = 0,
    } = this.state;

    this.target.innerHTML = `
    <div class="achievements-dashboard-header">
      <span class="dashboard-title">통계</span>
    </div>
    <div class="dashboard-contents">
      <div class="total-status">
        <div class="item-status">
          <span class="status-type">달성</span>
          <span class="status-number">${completed} </span>
        </div>
        <div class="item-status">
          <span class="status-type">미달성</span>
          <span class="status-number">${incompleted} </span>
        </div>
        <div class="item-status">
          <span class="status-type">총 업적</span>
          <span class="status-number">${total} </span>
        </div>
      </div>
      <div class="year-status">
        <div class="year-status-item">
          <div class="year-status-item-content">
            <span class="year-status-item-type">올해</span>
            <span class="year-status-item-number">${thisYear}</span>
          </div>
          <div class="year-status-item-trending trending-${Math.sign(gapThisYear) === 1 ? 'up' : 'down'}">
            <span class="year-status-item-trending-icon"><i class="bx bx-trending-${
              Math.sign(gapThisYear) === 1 ? 'up' : 'down'
            } bx-md"></i></span>
            <span class="year-status-item-trending-number">${gapThisYear} (${Math.round(thisYearTrending)}%)</span>
            <span class="year-status-item-trending-type">vs. 지난해</span>
          </div>
        </div>
        <div class="year-status-item">
          <div class="year-status-item-content">
            <span class="year-status-item-type">지난 해</span>
            <span class="year-status-item-number">${lastYear}</span>
          </div>
          <div class="year-status-item-trending trending-${Math.sign(gapLastYear) === 1 ? 'up' : 'down'}">
            <span class="year-status-item-trending-icon"><i class="bx bx-trending-${
              Math.sign(gapLastYear) === 1 ? 'up' : 'down'
            } bx-md"></i></span>
            <span class="year-status-item-trending-number">${gapLastYear} (${Math.round(lastYearTrending)} %)</span>
            <span class="year-status-item-trending-type">vs. 지지난해</span>
          </div>
        </div>
        <div class="year-status-item">
          <div class="year-status-item-content">
            <span class="year-status-item-type">지지난해</span>
            <span class="year-status-item-number">${yearBeforeLast} </span>
          </div>
          <div class="year-status-item-trending trending-${Math.sign(gapYearBeforeLast) === 1 ? 'up' : 'down'}">
            <span class="year-status-item-trending-icon"><i class="bx bx-trending-${
              Math.sign(gapYearBeforeLast) === 1 ? 'up' : 'down'
            } bx-md"></i></span>
            <span class="year-status-item-trending-number">${gapYearBeforeLast} (${Math.round(
      yearBeforeLastTrending,
    )}%)</span>
            <span class="year-status-item-trending-type">vs. ${new Date().getFullYear() - 3}년</span>
          </div>
        </div>
        <div class="year-status-item">
          <div class="year-status-item-content">
            <span class="year-status-item-type">최근 3년</span>
            <span class="year-status-item-number">${lastThreeYears} </span>
          </div>
          <div class="year-status-item-trending trending-${Math.sign(gapLastThreeYears) === 1 ? 'up' : 'down'}">
            <span class="year-status-item-trending-icon"><i class="bx bx-trending-${
              Math.sign(gapLastThreeYears) === 1 ? 'up' : 'down'
            } bx-md"></i></span>
            <span class="year-status-item-trending-number">${gapLastThreeYears} (${Math.round(
      lastThreeYearsTrending,
    )} %)</span>
            <span class="year-status-item-trending-type">vs. 이전 3년</span>
          </div>
        </div>
      </div>
    </div>  
    `;
  }
}
