import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

function derivedActivePlayer(turns) {
  let currentPlayerSymbol = 'X';
  if (turns.length > 0 && turns[0].playerSymbol === "X") {
    currentPlayerSymbol = "O";
  }
  return currentPlayerSymbol;
}

function derivedWinner(gameBoard, playersName) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstCellSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondCellSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdCellSymbol = gameBoard[combination[2].row][combination[2].column];

    // console.log(`combination[0].row: ${combination[0].row}`);
    // console.log(`combination[0].column: ${combination[0].column}`);
    // console.log(firstCellSymbol);
    // console.log(secondCellSymbol);
    // console.log(thirdCellSymbol);


    if (firstCellSymbol &&
      firstCellSymbol === secondCellSymbol &&
      firstCellSymbol === thirdCellSymbol
    ) winner = playersName[firstCellSymbol];
  }

  return winner;
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS_NAME = {
  X: "Player 1",
  O: "Player 2"
}

function derivedGameBoard(gameTurns) {
  // let gameBoard = initialGameBoard; // Boggus, because gameBoard is a
  // reference on initialGameBoard, thus any modification on gameBoard
  // also affects initialGameBoard.

  // solution: make a copy instead of setting a refernce
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
  for (const turn of gameTurns) {
    const { cell, playerSymbol } = turn;
    const { rowIndex, colIndex } = cell;
    gameBoard[rowIndex][colIndex] = playerSymbol;
  }

  return gameBoard;
}

function App() {
  const [playersName, setPlayersName] = useState(PLAYERS_NAME);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, playersName);
  const hasDraw = gameTurns.length == 9 && !winner;

  function handleSelectCell(rowIndex, colIndex) {
    // setActivePlayer((currentPlayer) => currentPlayer === "X" ? "O" : "X");
    setGameTurns((prevTurns) => {
      // let currentPlayerSymbol = 'X';
      // if (prevTurns.length > 0 && prevTurns[0].playerSymbol === "X") {
      //   currentPlayerSymbol = "O";
      // }
      const currentPlayerSymbol = derivedActivePlayer(gameTurns);
      const updatedTurns = [
        {
          cell: { rowIndex: rowIndex, colIndex: colIndex },
          playerSymbol: currentPlayerSymbol
        },
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handleChangePlayerName(symbol, newPlayerName) {
    setPlayersName(previousPlayersName => {
      return {
        ...previousPlayersName,
        [symbol]: newPlayerName
      }
    });
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialPlayerName={PLAYERS_NAME.X}
            symbol="X"
            onChangeName={handleChangePlayerName}
            isActivePlayer={activePlayer === "X"}
          />
          <Player initialPlayerName={PLAYERS_NAME.O}
            symbol="O"
            onChangeName={handleChangePlayerName}
            isActivePlayer={activePlayer === "O"}
          />
        </ol>
        {/* {console.log(`winner: ${winner}`)}
        {console.log(`hasDraw: ${hasDraw}`)} */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestartGame} />}
        {/* <GameBoard onSelectCell={handleSelectCell} activePlayerSymbol={activePlayer} /> */}
        <GameBoard onSelectCell={handleSelectCell} gameBoard={gameBoard} />
        {/* Test commit */}
      </div>

      {/* Logs section */}
      <Logs gameTurns={gameTurns} />
    </main>
  )
}

export default App
