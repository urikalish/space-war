import { Game } from './game';

function onClickStartGame() {
    const startFormElm = document.getElementById('start-form');
    if (!startFormElm) return;
    startFormElm.classList.add('display--none');
    game.start(['Player0', 'Player1']);
}

const game = new Game();
