import { Player } from './player';

export class Ship {
    public player: Player;
    public size: number = 0;
    public x: number = 0;
    public y: number = 0;
    public vx: number = 0;
    public vy: number = 0;
    public ax: number = 0;
    public ay: number = 0;
    public ang: number = 0;
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
        this.ang = ang;
    }
}
