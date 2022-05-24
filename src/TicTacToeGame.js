import { useState } from 'react';
import { useContext } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { NavBar } from './NavBar';
import { themeCtx } from './App';

//TicTacToe-Game componenet
export function TicTacToeGame() {
  const initialValue = [null, null, null, null, null, null, null, null, null];
  const [gameBoard, setGameBoard] = useState(initialValue);
  const [turn, changeTurn] = useState("");
  const { width, height } = useWindowSize();
  const [theme] = useContext(themeCtx);
  const style1 = (theme) ? "overallBlackGame" : "overallWhiteGame";

  const change = (index) => {
    if (!winner && !gameBoard[index] && turn !== "") {
      const gameBoardCopy = [...gameBoard];
      gameBoardCopy[index] = (turn) ? "X" : "O";
      changeTurn(!turn);
      setGameBoard([...gameBoardCopy]);
    }
  };

  const winningCondition = (gameBoard) => {
    const requirement = [
      [0, 1, 2], [3, 4, 5],
      [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i of requirement) {
      const [a, b, c] = i;
      if (gameBoard[a] !== null && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }
    return null;
  };
  const winner = winningCondition(gameBoard);

  const [hide, setHide] = useState(false);
  const style = { display: (hide) ? "none" : "block" };

  return (
    <>
    <NavBar/>
    <div className={style1}>
      <div>
        <h1 style={{ textAlign: "center" }}><b className="childHood">Lets Bring BACK the CHILDHOOD!!!</b></h1>
      </div>
      <div style={style}>
        <div className="selecting-portion">
          <h2>Select ONE</h2>
          <div>
            <button style={{ color: "#0088f8" }} onClick={() => { changeTurn(true); setHide(true); }}>X</button>
            <button style={{ color: "gold" }} onClick={() => { changeTurn(false); setHide(true); }}>O</button>
          </div>
        </div>
      </div>
      {(turn === true && !winner) ? <h1 className='indicators' style={{ color: "#0088f8" }}>Its X's turn </h1> : (turn === false && !winner) ? <h1 className='indicators' style={{ color: "gold" }}>Its O's turn</h1> : ""}
      <div className="overallWinner">
        {(winner) ? <div className="resultAndReset"><Confetti width={width} height={height} /><h2>Winner ~ <b style={{ color: "red", fontSize: "4rem" }}>{winner}</b></h2><button onClick={() => { setGameBoard(initialValue); setHide(false); changeTurn(""); }}>Play Again</button></div> : ""}
      </div>
      <div className="tictactoe-gameBox">
        <div className="tictactoe-game">
          {gameBoard.map((val, index) => { return <BoxesInGame key={index} val={val} playerChange={() => change(index)} />; })}
        </div>
      </div>
    </div>
    </>
  );
}
function BoxesInGame({ val, playerChange }) {
  const style = { color: (val === "X") ? "#0088f8" : "gold" };

  return (
    <div>
      <button style={style} className="game-buttons" onClick={() => playerChange()}>{val}</button>

    </div>
  );
}
