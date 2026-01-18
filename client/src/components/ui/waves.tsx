import { useEffect, useRef } from "react";

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  xGap?: number;
  yGap?: number;
  className?: string;
}

class Grad {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  dot2(x: number, y: number) {
    return this.x * x + this.y * y;
  }
}

class Noise {
  private grad3: Grad[];
  private p: number[];
  private perm: number[];
  private gradP: Grad[];

  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1),
    ];
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
      59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
      39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
      81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
      222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }

  seed(seed: number) {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (let i = 0; i < 256; i++) {
      let v: number;
      if (i & 1) {
        v = this.p[i] ^ (seed & 255);
      } else {
        v = this.p[i] ^ ((seed >> 8) & 255);
      }
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }

  simplex2(xin: number, yin: number) {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;

    let n0: number, n1: number, n2: number;
    const s = (xin + yin) * F2;
    let i = Math.floor(xin + s);
    let j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - i + t;
    const y0 = yin - j + t;

    let i1: number, j1: number;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    i &= 255;
    j &= 255;
    const gi0 = this.gradP[i + this.perm[j]];
    const gi1 = this.gradP[i + i1 + this.perm[j + j1]];
    const gi2 = this.gradP[i + 1 + this.perm[j + 1]];

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }

    return 70 * (n0 + n1 + n2);
  }
}

export function Waves({
  lineColor = "hsl(var(--primary))",
  backgroundColor = "transparent",
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 120,
  xGap = 12,
  yGap = 36,
  className = "",
}: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width: number;
    let height: number;
    let ctxWidth: number;
    let ctxHeight: number;
    let lines: { x: number; y: number; wave: { x: number; y: number }; cursor: { x: number; y: number; vx: number; vy: number } }[][] = [];

    const noise = new Noise(Math.random());
    let tick = 0;
    const mousePos = { x: -1000, y: -1000 };

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = container.offsetWidth;
      height = container.offsetHeight;
      ctxWidth = width;
      ctxHeight = height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initLines();
    };

    const initLines = () => {
      lines = [];
      const oWidth = ctxWidth + 200;
      const oHeight = ctxHeight + 30;
      const totalLines = Math.ceil(oHeight / yGap);

      for (let i = 0; i <= totalLines; i++) {
        const pts: typeof lines[0] = [];
        const totalPts = Math.ceil(oWidth / xGap);

        for (let j = 0; j <= totalPts; j++) {
          pts.push({
            x: j * xGap - 100,
            y: i * yGap,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }
        lines.push(pts);
      }
    };

    const movePoints = (time: number) => {
      lines.forEach((pts) => {
        pts.forEach((p) => {
          const move =
            noise.simplex2(
              (p.x + time * waveSpeedX) * 0.002,
              (p.y + time * waveSpeedY) * 0.002
            ) * 2;
          p.wave.x = Math.cos(move) * waveAmpX;
          p.wave.y = Math.sin(move) * waveAmpY;

          const dx = p.x - mousePos.x;
          const dy = p.y - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxD = maxCursorMove;

          if (dist < maxD) {
            const angle = Math.atan2(dy, dx);
            const power = ((maxD - dist) / maxD) * 1;
            p.cursor.vx += Math.cos(angle) * power * tension;
            p.cursor.vy += Math.sin(angle) * power * tension;
          }

          p.cursor.vx *= friction;
          p.cursor.vy *= friction;
          p.cursor.x += p.cursor.vx;
          p.cursor.y += p.cursor.vy;

          const maxMove = maxCursorMove * 0.5;
          p.cursor.x = Math.max(-maxMove, Math.min(maxMove, p.cursor.x));
          p.cursor.y = Math.max(-maxMove, Math.min(maxMove, p.cursor.y));
        });
      });
    };

    const drawLines = () => {
      ctx.clearRect(0, 0, ctxWidth, ctxHeight);
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      lines.forEach((pts) => {
        ctx.moveTo(
          pts[0].x + pts[0].wave.x + pts[0].cursor.x,
          pts[0].y + pts[0].wave.y + pts[0].cursor.y
        );

        for (let i = 1; i < pts.length - 1; i++) {
          const curr = pts[i];
          const next = pts[i + 1];
          const xMid = (curr.x + curr.wave.x + curr.cursor.x + next.x + next.wave.x + next.cursor.x) / 2;
          const yMid = (curr.y + curr.wave.y + curr.cursor.y + next.y + next.wave.y + next.cursor.y) / 2;
          ctx.quadraticCurveTo(
            curr.x + curr.wave.x + curr.cursor.x,
            curr.y + curr.wave.y + curr.cursor.y,
            xMid,
            yMid
          );
        }
      });

      ctx.stroke();
    };

    const animate = () => {
      tick++;
      movePoints(tick);
      drawLines();
      animationId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mousePos.x = -1000;
      mousePos.y = -1000;
    };

    setSize();
    animate();

    window.addEventListener("resize", setSize);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
