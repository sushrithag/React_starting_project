import './Game.css'
import { useState } from 'react'


function Square({ square_color, square_class, square_state, onSquareClick }) {
    return (
        <button
            className={square_class}
            onClick={onSquareClick}
            style={square_color}>
            {square_state}
        </button>
    );
}

function Board({ square_states, move_count, handleClick }) {
    const winner = calculateWinner(square_states);
    let status;
    let status_block;
    let next_player = move_count % 2 === 0 ? 'X' : 'O';
    if (winner) {
        status = 'Winner is: ' + winner[0];
        status_block =
            (<h1 className='status' style={{ backgroundColor: 'cadetblue' }}>
                {status}
            </h1>)
    } else {
        status = 'Next player is: ' + next_player;
        status_block = (<h1 className='status'>{status}</h1>)
    }

    function CreateRow(x) {
        let square_color;
        let square_class;
        if (square_states[x]) {
            square_color = { backgroundColor: 'burlywood' };
            square_class = "square";
            if (winner && (winner[1].indexOf(x) !== -1)) {
                square_color = {};
                square_class = "square blinking"
            }
        } else {
            square_color = { backgroundColor: '#fff' };
            square_class = "square";
        }
        return (
            <Square
                key={x}
                square_color={square_color}
                square_class={square_class}
                square_state={square_states[x]}
                onSquareClick={() => handleClick(x)} />
        )
    }

    const row_one = [0, 1, 2].map(CreateRow);
    const row_two = [3, 4, 5].map(CreateRow);
    const row_three = [6, 7, 8].map(CreateRow);

    const rows = [row_one, row_two, row_three]
    const full_board = rows.map((row, index) =>
        (<div key={index} className="board-row"> {row} </div>))

    return (
        <>
            {status_block}
            {full_board}
        </>
    )
}

export default function Game() {
    const [move_count, setMoveCount] = useState(0);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const current_game_state = history[move_count];

    function onPlay(index) {
        if (calculateWinner(current_game_state) || current_game_state[index]) {
            return;
        }
        const next_square_states = current_game_state.slice();
        next_square_states[index] = move_count % 2 === 0 ? 'X' : 'O';
        setHistory([...history.slice(0, move_count + 1), next_square_states]);
        setMoveCount(move_count + 1);
    }

    function goTo(move_index) {
        setMoveCount(move_index);
    }

    const moves = history.map((squares, index) => {
        let description;
        if (index === history.length - 1) {
            return null;
        }
        if (index > 0) {
            description = "Go to move #" + index
        } else {
            description = "Go to start of the game"
        }
        return (
            <li key={index}>
                <button onClick={() => goTo(index)}>
                    {description}
                </button>
            </li>)
    });

    return (
        <div className='game'>
            <div className='game-board'>
                <Board
                    square_states={current_game_state}
                    move_count={move_count}
                    handleClick={onPlay} />
            </div>
            <div className='game-info'>
                <h1>Game Moves</h1>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}