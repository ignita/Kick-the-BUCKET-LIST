export default class Header {
  constructor({ container, initState, renderView }) {
    this.container = container;
    this.state = initState;
    this.target = document.createElement('header');
    this.renderView = renderView;

    this.render();
    this.handleEvents();
  }

  render() {
    this.target.innerHTML = `
    <div class="title">
      <a href="/">the achievements</a>
    </div>
    <nav>
      <ul>
      ${this.state.map(({ name, path }) => `<li><a href="${path}">${name}</a></li>`).join('')}
      </ul>
    </nav>
    <button class="theme-switcher"
            id="theme-switcher"
            title="테마 변경하기(light & dark)"
            aria-label="auto"
            aria-live="polite">
      <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor"/>
        <g class="sun-beams" stroke="currentColor">
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </g>
        <mask class="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white"/>
          <circle cx="24" cy="10" r="6" fill="black"/>
        </mask>
      </svg>    
    </button>
    `;
    this.container.prepend(this.target);
  }

  handleEvents() {
    this.target.addEventListener('click', e => {
      if (!e.target.closest('a')) {
        return;
      }
      e.preventDefault();

      const path = e.target.getAttribute('href');
      window.history.pushState(null, null, path);
      this.renderView(path);
    });

    const storageKey = 'theme-preference';
    const getColorPreference = () => {
      if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
      } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    };
    const theme = { value: getColorPreference() };

    const setPreference = () => {
      localStorage.setItem(storageKey, theme.value);
      reflectPreference();
    };

    const reflectPreference = () => {
      document.firstElementChild.setAttribute('data-theme', theme.value);
      document.querySelector('#theme-switcher')?.setAttribute('aria-label', theme.value);
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      metaThemeColor.content = theme.value === 'dark' ? '#3d4852' : '#293c8b';
    };

    reflectPreference();
    document.querySelector('#theme-switcher').addEventListener('click', e => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';

      setPreference();
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
      theme.value = isDark ? 'dark' : 'light';
      setPreference();
    });
  }
}
