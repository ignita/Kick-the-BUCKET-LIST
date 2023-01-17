import Component from '../../core/Component';

export default class LineChart extends Component {
  constructor({ container, props }) {
    super({ container, props });

    this.canvas = this.container.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 1.5;

    this.props = props;
    this.lineCnt = 11;
    this.xStart = 30;
    this.yStart = 30;
    this.gridWidth = this.canvas.width - this.xStart * 2;
    this.gridHeight = this.canvas.height - this.yStart * 2;
    this.dx = this.gridWidth / (this.lineCnt - 1);
    this.dy = this.gridHeight / (this.lineCnt - 1);

    this.draw();
  }

  template() {
    const width = this.container.clientWidth;

    return `
      <canvas width="${width}" height="400"></canvas>
    `;
  }

  drawText({ fontWeight = 400, fontSize = '12px', color, value, x, y }) {
    this.ctx.font = `${fontWeight} ${fontSize} Pretendard Variable`;
    this.ctx.fillStyle = '#606f7b';
    this.ctx.fillText(value, x, y);
  }

  drawDot({ color, x, y, radius }) {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#606f7b';
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawGrid() {
    this.drawStrokePath({
      drawStroke: () => {
        this.drawGridRows();
        this.drawGridColumns();
      },
    });
  }

  drawGridLine({ fromX, fromY, toX, toY }) {
    const halfLineWidth = this.ctx.lineWidth / 2;
    this.ctx.moveTo(fromX + halfLineWidth, fromY + halfLineWidth);
    this.ctx.lineTo(toX + halfLineWidth, toY + halfLineWidth);
  }

  drawGridRows() {
    const x = 30;
    let y = 30;
    for (let i = 0; i < this.lineCnt; i++) {
      this.drawGridLine({ fromX: x, fromY: y, toX: x + this.gridWidth, toY: y });
      y += this.dy;
    }
  }

  drawGridColumns() {
    let x = 30;
    const y = 30;
    for (let i = 0; i < this.lineCnt; i++) {
      this.drawGridLine({ fromX: x, fromY: y, toX: x, toY: y + this.gridHeight });
      x += this.dx;
    }
  }

  drawStrokePath({ drawStroke, color = '#606f7b' }) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    drawStroke();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawGraph() {
    const today = new Date();
    const thisYear = today.getFullYear();
    const years = Array.from({ length: 11 }, (v, i) => thisYear - i).reverse();
    const maxCnt = Math.max(...this.props.map(({ cnt }) => cnt));
    const digit = String(maxCnt).length - 1;
    const ceil = (number, digit) => Math.ceil(number * 0.1 ** digit) * 10 ** digit;
    const maxY = ceil(maxCnt, digit);

    const dots = years.reduce((acc, curr, idx) => {
      const data = this.props.find(({ year }) => year === curr.toString());
      const x = this.xStart + this.ctx.lineWidth + this.dx * idx;
      const y = this.yStart + this.gridHeight * (data ? 1 - data.cnt / maxY : 1);
      this.drawDot({ x, y, radius: 4 });
      this.drawText({
        value: data ? data.cnt : 0,
        x: x - 4,
        y: y - 20,
      });
      acc.push([x, y]);
      return acc;
    }, []);

    const DRAW_FRAME = 20;
    const lineTrace = dots.reduce((result, dot, idx) => {
      if (idx === dots.length - 1) {
        result.push(dot);
        return result;
      }
      const [startX, startY] = dot;
      const [endX, endY] = dots[idx + 1];
      const [dx, dy] = [(endX - startX) / DRAW_FRAME, (endY - startY) / DRAW_FRAME];
      const traces = [...Array.from({ length: DRAW_FRAME })].reduce((acc, curr, i) => {
        const next = [startX + dx * i, startY + dy * i];
        acc.push(next);
        return acc;
      }, []);
      return result.concat(traces);
    }, []);

    let frame = 0;
    const animateDrawLines = () => {
      const [fromX, fromY] = lineTrace[frame];
      const [toX, toY] = lineTrace[frame + 1];

      this.drawStrokePath({
        drawStroke: () => {
          this.ctx.moveTo(fromX, fromY);
          this.ctx.lineTo(toX, toY);
        },
      });
      frame++;

      if (frame < lineTrace.length - 1) {
        requestAnimationFrame(animateDrawLines);
      }
    };

    animateDrawLines();
  }

  drawColumnLabel() {
    const today = new Date();
    const thisYear = today.getFullYear();
    const years = Array.from({ length: 11 }, (v, i) => thisYear - i).reverse();

    years.forEach((year, idx) => {
      const x = this.xStart - this.ctx.lineWidth * 8 + this.dx * idx;
      const y = this.canvas.height;
      this.drawText({ x, y, value: year });
    });
  }

  draw() {
    this.drawGrid();
    this.drawGraph();
    this.drawColumnLabel();
  }
}
