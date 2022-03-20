import { Board } from './board';
import { Player } from './player';

export class Game {
    public players: Player[] = [];
    public board: Board = new Board();

    start(playerNames: string[]) {
        const wrapperElm = document.getElementById('wrapper');
        if (!wrapperElm) return;
        wrapperElm.requestFullscreen({ navigationUI: 'hide' }).then(() => {
            this.players = [];
            this.players.push(new Player(0, playerNames[0]));
            this.players.push(new Player(1, playerNames[1]));
            this.board.init(wrapperElm.offsetWidth, wrapperElm.offsetHeight, this.players);
            const containerElm = document.getElementById('container');
            if (!containerElm) return;
            containerElm.classList.remove('display--none');
            document.addEventListener('keydown', ({ key }) => {
                this.onKeydown(key);
            });
            this.step();
        });
    }

    onKeydown(key: string) {
        switch (key.toLowerCase()) {
            case 'w':
                this.players[0].ship.speedInc();
                break;
            case 's':
                this.players[0].ship.speedDec();
                break;
            case 'a':
                this.players[0].ship.turnDec();
                break;
            case 'd':
                this.players[0].ship.turnInc();
                break;
            case 'arrowup':
                this.players[1].ship.speedInc();
                break;
            case 'arrowdown':
                this.players[1].ship.speedDec();
                break;
            case 'arrowleft':
                this.players[1].ship.turnDec();
                break;
            case 'arrowright':
                this.players[1].ship.turnInc();
                break;
        }
    }

    step() {
        this.board.clear();
        this.board.draw();
        this.board.move();
        requestAnimationFrame(() => {
            this.step();
        });
    }
}
