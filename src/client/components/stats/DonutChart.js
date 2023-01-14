import { CATEGORY_COLORS } from '../../constants/colors.js';

export default class DonutChart {
  constructor({ parent, props }) {
    this.target = document.createElement('div');
    this.target.className = 'donut-chart-wrapper';
    this.canvas = document.createElement('canvas');
    this.canvas.width = 100;
    this.canvas.height = 100;
    this.ctx = this.canvas.getContext('2d');

    this.target.appendChild(this.canvas);
    parent.appendChild(this.target);

    this.props = props;

    this.render();
  }

  drawDonutSlice({ x, y, radius, startAngle, angle, color }) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, radius, startAngle, startAngle + angle, false);
    this.ctx.closePath();
    this.ctx.fill();
  }

  render() {
    const data = this.props;

    const totalPercentage = data.reduce((acc, { rat }) => acc + Number(rat), 0);

    const DRAW_FRAME = 60;
    let frame = 0;
    const drawDonut = () => {
      frame++;
      const { width, height } = this.canvas;
      this.ctx.clearRect(0, 0, width, height);

      data.reduce((startAngle, { subCategoryId, rat }) => {
        const angle = ((Number(rat) / totalPercentage) * 2 * Math.PI * frame) / DRAW_FRAME;
        this.drawDonutSlice({
          x: this.canvas.width / 2,
          y: this.canvas.height / 2,
          radius: Math.min(this.canvas.width / 2, this.canvas.height / 2),
          startAngle,
          angle,
          color: CATEGORY_COLORS[subCategoryId],
        });
        return startAngle + angle;
      }, 1.5 * Math.PI);

      this.drawDonutSlice({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        radius: 0.6 * Math.min(this.canvas.width / 2, this.canvas.height / 2),
        startAngle: 0,
        angle: 2 * Math.PI,
        color: 'white',
      });

      if (frame < DRAW_FRAME) {
        requestAnimationFrame(drawDonut);
      }
    };

    drawDonut();
  }
}
