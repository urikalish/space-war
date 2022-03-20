import { Board } from './board';
import { Player } from './player';
import { Match } from './match';

export class Game {
    public players: Player[] = [];
    public board: Board = new Board();
    public match: Match | null = null;

    start(playerNames: string[]) {
        const wrapperElm = document.getElementById('wrapper');
        if (!wrapperElm) return;
        wrapperElm.requestFullscreen({ navigationUI: 'hide' }).then(() => {
            this.players = [];
            this.players.push(new Player(0, playerNames[0]));
            this.players.push(new Player(1, playerNames[1]));
            this.board.init(wrapperElm.offsetWidth, wrapperElm.offsetHeight, this.players);
            this.match = new Match(this.players);
            const containerElm = document.getElementById('container');
            if (!containerElm) return;
            containerElm.classList.remove('display--none');
        });
    }
}
