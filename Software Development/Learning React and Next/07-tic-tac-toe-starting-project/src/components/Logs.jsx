export default function Logs({ gameTurns }) {
    return (<ol id="log">
        {gameTurns.map((turn) => (
            <li key={`${turn.cell.rowIndex}${turn.cell.colIndex}`}>
                {turn.playerSymbol} selected {turn.cell.rowIndex}, {turn.cell.colIndex}
            </li>
        ))}
    </ol>);
}