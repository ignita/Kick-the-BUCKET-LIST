import { CATEGORY_COLORS } from '../../constants/colors.js';
import Component from '../../core/Component.js';

export default class DonutChart extends Component {
  constructor({ container, props }) {
    super({ container, props });

    this.canvas = this.container.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.draw();
  }

  drawDonutSlice({ ctx, x, y, radius, startAngle, angle, color }) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, startAngle, startAngle + angle, false);
    ctx.closePath();
    ctx.fill();
  }

  template() {
    return `
     <canvas width="100" height="100"></canvas>
    `;
  }

  draw() {
    const data = this.props;
    const totalPercentage = data?.reduce((acc, { rat }) => acc + Number(rat), 0);

    const DRAW_FRAME = 60;
    let frame = 0;
    const drawDonut = () => {
      frame++;
      const { width, height } = this.canvas;
      this.ctx.clearRect(0, 0, width, height);

      data.reduce((startAngle, { subCategoryId, rat }) => {
        const angle = ((Number(rat) / totalPercentage) * 2 * Math.PI * frame) / DRAW_FRAME;
        this.drawDonutSlice({
          ctx: this.ctx,
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
        ctx: this.ctx,
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
