import { removeContent } from '../utils';
import Sidebar from '../components/Sidebar';
import SubHeader from '../components/SubHeader';
import Backdrop from '../components/Backdrop';
import Achievements from '../components/achievements';
export default class HomeView {
  constructor({ container, initState }) {
    this.container = container;
    this.state = initState;

    this.render();
  }

  render() {
    removeContent();
    new Sidebar({ container: this.container });
    new Backdrop({ container: this.container });
    new SubHeader({ container: this.container });
    new Achievements({ container: this.container });
  }
}
