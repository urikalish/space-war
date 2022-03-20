import { Ship } from './ship';

export class Player {
    public id: number;
    public name: string;
    public ship: Ship;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.ship = new Ship(this);
    }
}
