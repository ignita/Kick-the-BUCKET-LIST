export default class HomeView {
  constructor({ container, initState }) {
    this.container = container;
    this.state = initState;

    this.render();
  }

  render() {
    const wrapper = document.createElement('main');
    wrapper.innerHTML = `
    <aside class="side-bar">
    <div class="side-bar-header">
      <a href="#" class="side-bar-close-btn" aria-label="Close Sidebar"><i class="bx bx-x bx-spin-hover"></i></a>
      <a href="#" class="side-bar-header-btn" role="presentation" aria-label="Expand/Collapse Sidebar">
        <i class="bx bx-arrow-from-right side-bar-header-btn-icon"></i>
      </a>
    </div>
    <ul class="main-category">
      <li>
        <a class="main-category-header" href="#rest">휴식</a>
        <ul class="sub-category">
          <li class="sub-category-item">
            <a href="#trip">
              <i class="bx bxs-map-alt sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">여행</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#food">
              <i class="bx bxs-bowl-rice sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">음식</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#rest-etc">
              <i class="bx bxs-bed sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">기타</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a class="main-category-header" href="#hobby">취미</a>
        <ul class="sub-category">
          <li class="sub-category-item">
            <a href="#making">
              <i class="bx bxs-wrench sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">제작</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#computer">
              <i class="bx bx-desktop sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">컴퓨터</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#art">
              <i class="bx bxs-palette sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">예술</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#community">
              <i class="bx bxs-group sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">커뮤니티</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#hobby-etc">
              <i class="bx bxs-joystick sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">기타</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a class="main-category-header" href="#health">건강</a>
        <ul class="sub-category">
          <li class="sub-category-item">
            <a href="#survival">
              <i class="bx bxs-compass sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">생존</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#outdoor">
              <i class="bx bx-run sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">야외운동</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#indoor">
              <i class="bx bx-dumbbell sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">실내운동</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#health-etc">
              <i class="bx bxs-heart sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">기타</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a class="main-category-header" href="#learn">배움</a>
        <ul class="sub-category">
          <li class="sub-category-item">
            <a href="#education">
              <i class="bx bxs-graduation sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">고등교육</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#certificate">
              <i class="bx bxs-certification sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">자격</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#language">
              <i class="bx bxs-book sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">언어</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a class="main-category-header" href="#money">돈</a>
        <ul class="sub-category">
          <li class="sub-category-item">
            <a href="#work">
              <i class="bx bxs-briefcase-alt-2 sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">직업</span>
            </a>
          </li>
          <li class="sub-category-item">
            <a href="#possession">
              <i class="bx bxs-box sub-category-item-icon bx-fw"></i>
              <span class="sub-category-item-text">소유</span>
              <span class="tooltip">소유</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>`;

    [...this.container.children].forEach(layoutTag => {
      if (layoutTag.tagName !== 'HEADER') {
        layoutTag.remove();
      }
    });
    this.container.append(wrapper);
  }
}
