import React, { useState } from 'react';
import '../Styles/Squares.css';

export const Square = ({ takeTurn, id }) => {
	const playerMark = ['O', 'X'];
	const [filled, setFilled] = useState(false);
	const [tik, setTik] = useState(2);
	return (
		<>
			<button
				className={tik === '1' ? 'pink' : 'blue'}
				onClick={() => {
					setTik(takeTurn(id));
					setFilled(true);
				}}
			>
				<h2>{playerMark[tik]}</h2>
			</button>
		</>
	);
};
