import React, { useState } from 'react';

import { Square } from './Squares';

export const Board = () => {
	let [player, setPlayer] = useState(1);
	let [gameStatus, setGameStatus] = useState([]);

	let status = `Winner: ${checkForWinner(gameStatus)}`;

	let playerTurn = `Next turn: ${player === '0' ? 'Player O' : 'Player X'}`;

	console.log(`${status}`);

	const takeTurn = (id) => {
		setGameStatus([...gameStatus, { id: id, player: player }]);
		setPlayer((player + 1) % 2); // get next player
		return player;
	};
	function renderSquare(i) {
		return <Square takeTurn={takeTurn} id={i}></Square>;
	}

	return (
		<>
			<div className='game-board'>
				<div className='grid-row'>
					{renderSquare(0)}
					{renderSquare(1)}
					{renderSquare(2)}
				</div>
				<div className='grid-row'>
					{renderSquare(3)}
					{renderSquare(4)}
					{renderSquare(5)}
				</div>
				<div className='grid-row'>
					{renderSquare(6)}
					{renderSquare(7)}
					{renderSquare(8)}
				</div>
				<div id='info'>
					<h1 id='turn'>{playerTurn}</h1>
					<h1>{status}</h1>
				</div>
			</div>
		</>
	);
};

const win = [
	// rows
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	// cols
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// diagonal
	[0, 4, 8],
	[2, 4, 6],
];

const checkPlayerTurn = (gameState) => {
	return gameState.player;
};

const checkForWinner = (gameState) => {
	// get array of box id's
	// can't be a winner in less than 5 turns
	if (gameState.length < 5) return 'No Winner Yet';
	let p0 = gameState.filter((item) => {
		if (item.player == 0) return item;
	});
	p0 = p0.map((item) => item.id);
	let px = gameState.filter((item) => {
		if (item.player == 1) return item;
	});
	px = px.map((item) => item.id);
	if (p0 != null && px != null) {
		var win0 = win.filter((item) => {
			return isSuperset(new Set(p0), new Set(item));
		});
		var winX = win.filter((item) => {
			return isSuperset(new Set(px), new Set(item));
		});
	}
	if (win0.length > 0) return 'Player O ';
	else if (winX.length > 0) return 'Player X ';
	return 'No Winner Yet';
};
// check if subset is in the set
function isSuperset(set, subset) {
	for (let elem of subset) {
		if (!set.has(elem)) {
			return false;
		}
	}
	return true;
}
