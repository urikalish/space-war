import { Player } from './player';

export class Board {
    public width: number = 0;
    public height: number = 0;
    public players: Player[] = [];
    public cnv: HTMLCanvasElement | null = null;
    public ctx: CanvasRenderingContext2D | null = null;

    init(width: number, height: number, players: Player[]) {
        this.width = width;
        this.height = height;
        const shipSize = 100;
        const initialMargin = 250;
        this.players = players;
        players[0].ship.init(shipSize, initialMargin + shipSize / 2, height / 2 - shipSize / 2, 0);
        players[1].ship.init(shipSize, width - initialMargin - shipSize / 2, height / 2 - shipSize / 2, 180);
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
            this.ctx.setTransform(1, 0, 0, 1, p.ship.x, p.ship.y); // sets scale and origin
            this.ctx.rotate((((p.ship.a + 90) % 360) * Math.PI) / 180);
            this.ctx.drawImage(p.ship.img as CanvasImageSource, -p.ship.size / 2, -p.ship.size / 2);
            this.ctx.restore();
        });
    }

    move() {
        this.players.forEach((p) => {
            const s = p.ship;
            const h = s.size / 2;
            s.move();
            if (s.x + h < 0) {
                console.log('*');
                s.x = this.width + h;
            } else if (s.x - h > this.width) {
                console.log('*');
                s.x = -h;
            }
            if (s.y + h < 0) {
                s.y = this.height + h;
            } else if (s.y - h > this.height) {
                s.y = -h;
            }
        });
    }
}
