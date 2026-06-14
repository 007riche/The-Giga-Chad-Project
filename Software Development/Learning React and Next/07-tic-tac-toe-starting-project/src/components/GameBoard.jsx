import { useState } from "react";



export default function GameBoard({ onSelectCell, gameBoard }) {

    // export default function GameBoard({ onSelectCell, activePlayerSymbol }) {
    //     const [gameBoard, setGameBoard] = useState(initialGameBoard);

    //     function handleSelectCell(rowIndex, colIndex) {
    //         setGameBoard((previousGameBoard) => {
    //             const updatedBoard = [...previousGameBoard.map(innerRow => [...innerRow])];
    //             updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //             // console.log(updatedBoard);
    //             return updatedBoard;
    //         });
    //         onSelectCell();
    //     }
    return (
        <ol id="game-board">
            {
                gameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => (
                                <li key={colIndex}>
                                    {/* <button onClick={() => handleSelectCell(rowIndex, colIndex)}> */}
                                    <button onClick={() => onSelectCell(rowIndex, colIndex)}
                                        disabled={playerSymbol !== null}
                                    >
                                        {playerSymbol}

                                    </button>
                                </li>
                            ))}
                        </ol>
                    </li>
                )
                )
            }
        </ol>
    );
}
