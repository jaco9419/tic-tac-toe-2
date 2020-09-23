import React, { useState } from 'react';
import { calculateWinner } from '../helpers';
import Board from './Board';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);

    const handleClick = i => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current];

        if (winner || squares[i]) {
          return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...timeInHistory, squares]);
        setStepNumber(timeInHistory.length);
        setXIsNext(!xIsNext);
        // this.setState({
        //   history: history.concat([{
        //     squares: squares
        //   }]),
        //   stepNumber: history.length,
        //   xIsNext: !this.state.xIsNext,
        // });
      }

      let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const jumpTo = step => {
      setStepNumber(step);
      setXIsNext(step % 2 === 0);
  }

  const moves = history.map((_step, move) => {
    const desc = move ?
          'Go to move #' + move :
          'Go to Game Start';
    return(
    <li key={move}>
      <button className="moves" onClick={() => jumpTo(move)}>{desc}</button>  
    </li>
    )
  })

    return (
        <div className='game'>
            <h1>Tic Tac Toe</h1>
            <div className='game-board'>
                <Board squares={history[stepNumber]} onClick={handleClick} />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default Game;