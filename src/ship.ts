import { Player } from './player';

export class Ship {
    VA_STEP = 0.2;
    MAX_VA = 4;

    public player: Player;
    public size: number = 0;
    public x: number = 0;
    public y: number = 0;
    public vx: number = 0;
    public vy: number = 0;
    public ax: number = 0;
    public ay: number = 0;
    public a: number = 0;
    public va: number = 0;
    public img: HTMLImageElement | null = null;

    constructor(player: Player) {
        this.player = player;
        this.img = new Image();
        this.img.src = `img/ship${player.id}.png`;
    }

    init(size: number, x: number, y: number, ang: number) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.a = ang;
    }

    move() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
        this.a = (this.a + this.va + 360) % 360;
    }

    speedInc() {
        this.vx -= 0.1;
    }

    speedDec() {
        this.vx += 0.1;
    }

    turnDec() {
        this.va = Math.max(this.va - this.VA_STEP, -this.MAX_VA);
    }

    turnInc() {
        this.va = Math.min(this.va + this.VA_STEP, this.MAX_VA);
    }
}
