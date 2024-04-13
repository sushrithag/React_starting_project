import './Game.css'
import { useState } from 'react'


function Square({ move_count, setMoveCount }) {
    const [square_symobol, setSquareSymbol] = useState(null);

    function handleClick() {
        console.log('clicked!');
        if (square_symobol != null) {
            return
        }
        if (move_count % 2 === 0) {
            setSquareSymbol('X');
        } else {
            setSquareSymbol('O');
        }
        setMoveCount(move_count + 1)
    }

    return (
        <button 
        className="square" 
        onClick={handleClick}>
            {square_symobol}
        </button>
    );
}

function Board() {
    const [move_count, setMoveCount] = useState(0);
    return (
        <>
            <div className="board-row">
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
            </div>
            <div className="board-row">
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
            </div>
            <div className="board-row">
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
                <Square move_count={move_count} setMoveCount={setMoveCount}/>
            </div>
        </>
    )
}

export default function Game() {
    return (<div><Board /></div>)
}