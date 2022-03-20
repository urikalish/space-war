import { Player } from './player';

export class Match {
    public players: Player[];

    constructor(players: Player[]) {
        this.players = players;
    }
}
