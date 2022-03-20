import { Player } from './player';
import { Ship } from './ship';

export class Board {
    public static INITIAL_MARGIN = 100;

    public width: number = 0;
    public height: number = 0;
    public players: Player[] = [];
    public cnv: HTMLCanvasElement | null = null;
    public ctx: CanvasRenderingContext2D | null = null;

    init(width: number, height: number, players: Player[]) {
        this.width = width;
        this.height = height;
        this.players = players;
        const halfShip = Ship.SHIP_SIZE / 2;
        players[0].ship.init(Board.INITIAL_MARGIN + halfShip, Board.INITIAL_MARGIN + halfShip, Ship.V_INC_STEP / 2, Ship.V_INC_STEP / 2, 0, Ship.VA_STEP / 2);
        players[1].ship.init(width - Board.INITIAL_MARGIN - halfShip, height - Board.INITIAL_MARGIN - halfShip, -Ship.V_INC_STEP / 2, -Ship.V_INC_STEP / 2, 180, Ship.VA_STEP / 2);
        this.cnv = document.getElementById('canvas') as HTMLCanvasElement;
        if (!this.cnv) return;
        this.cnv.width = width;
        this.cnv.height = height;
        this.ctx = this.cnv.getContext('2d') as CanvasRenderingContext2D;
        this.clear();
        this.draw();
    }

    clear() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    draw() {
        this.players.forEach((p) => {
            if (!this.ctx) return;
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, p.ship.x, p.ship.y);
            this.ctx.rotate((((p.ship.a + 90) % 360) * Math.PI) / 180);
            this.ctx.drawImage(p.ship.img as CanvasImageSource, -p.ship.size / 2, -p.ship.size / 2);
            this.ctx.restore();
        });
    }

    move() {
        this.players.forEach((p) => {
            const s = p.ship;
            const halfShip = s.size / 2;
            s.move();
            if (s.x + halfShip < 0) {
                console.log('*');
                s.x = this.width + halfShip;
            } else if (s.x - halfShip > this.width) {
                console.log('*');
                s.x = -halfShip;
            }
            if (s.y + halfShip < 0) {
                s.y = this.height + halfShip;
            } else if (s.y - halfShip > this.height) {
                s.y = -halfShip;
            }
        });
    }
}
