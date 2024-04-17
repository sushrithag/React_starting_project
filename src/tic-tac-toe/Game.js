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
        if (move_count === 9) {
            status = 'Game is Drawn.'
        }
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
    // Toggle button to reverse order the moves
    const [is_checked, setIsChecked] = useState(false);
    const game_over = calculateWinner(current_game_state) || move_count === 9;
    const [move_loc_history, setMoveLocHistory] = useState(Array(9).fill(null));

    const move_loc_map = [
        "(row,col): (0,0)",
        "(row,col): (0,1)",
        "(row,col): (0,2)",
        "(row,col): (1,0)",
        "(row,col): (1,1)",
        "(row,col): (1,2)",
        "(row,col): (2,0)",
        "(row,col): (2,1)",
        "(row,col): (2,2)", 
    ]; 

    function onPlay(index) {
        if (calculateWinner(current_game_state) || current_game_state[index]) {
            return;
        }
        const next_square_states = current_game_state.slice();
        next_square_states[index] = move_count % 2 === 0 ? 'X' : 'O';
        setHistory([...history.slice(0, move_count + 1), next_square_states]);
        const new_move_loc_history = move_loc_history.slice();
        new_move_loc_history[move_count] = index; 
        setMoveLocHistory(new_move_loc_history);
        setMoveCount(move_count + 1);
    }

    function goTo(move_index) {
        setMoveCount(move_index);
    }

    function playAgain() {
        setMoveCount(0);
        setHistory([Array(9).fill(null)])
    }

    let moves = history.map((squares, index) => {
        let description;
        if (index > 0) {
            description = "Go to move #" + index + 
            " Loc: " + move_loc_map[move_loc_history[index-1]];
        } else if (index === 0) {
            description = "Go to start of the game"
        } else if (index === history.length - 1) {
            
        }
        return (
            <li key={index}>
                <button onClick={() => goTo(index)}>
                    {description}
                </button>
            </li>)
    });

    if (is_checked){
        moves.reverse();
    }

    function reOrderMoves(is_button_checked) {
        if (is_button_checked) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }

    let play_again_button = (game_over) ?
        (<div>
            Game Over <br/><br/> 
            <button onClick={() => playAgain()}>Play Again</button>
        </div>) :
        (<div>You are at move # {move_count+1} </div>);

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
                <span>Reverse-order Moves: </span>
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={is_checked}
                    onChange={(e) => reOrderMoves(e.target.checked)}/>
                  <span class="slider round"></span> 
                </label>
                <ol>
                    {moves}
                </ol>
                {play_again_button}
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