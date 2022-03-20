import { Player } from './player';

export class Ship {
    public static SHIP_SIZE = 100;
    public static VA_STEP = 0.4;
    public static MAX_VA = 4 - Ship.VA_STEP / 2;
    public static V_INC_STEP = 0.2;
    public static V_DEC_STEP = 0.2;

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

    init(x: number, y: number, vx: number, vy: number, a: number, va: number) {
        this.size = Ship.SHIP_SIZE;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.a = a;
        this.va = va;
    }

    move() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
        this.a = (this.a + this.va + 360) % 360;
    }

    speedInc() {
        this.vx = this.vx + Math.cos((this.a * Math.PI) / 180) * Ship.V_INC_STEP;
        this.vy = this.vy + Math.sin((this.a * Math.PI) / 180) * Ship.V_INC_STEP;
    }

    speedDec() {
        this.vx = this.vx - Math.cos((this.a * Math.PI) / 180) * Ship.V_DEC_STEP;
        this.vy = this.vy - Math.sin((this.a * Math.PI) / 180) * Ship.V_DEC_STEP;
    }

    turnInc() {
        this.va = Math.min(this.va + Ship.VA_STEP, Ship.MAX_VA);
    }

    turnDec() {
        this.va = Math.max(this.va - Ship.VA_STEP, -Ship.MAX_VA);
    }
}
