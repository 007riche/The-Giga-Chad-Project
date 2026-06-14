import { useState } from "react";

export default function ({ initialPlayerName, symbol, isActivePlayer, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialPlayerName);
    const [isEditing, setIsEditing] = useState(false)

    let buttonText = "Edit";
    let playerNameElemt = <span className="player-name">{name}</span>

    function handleEditing() {
        // setIsEditing(!isEditing); // Wrong, works but wrong,
        // It does not get the latest state available
        // For getting the lastest state, use state should have a function
        // with an argument as the state (previous state)
        setIsEditing(isEditing => !isEditing); // isEditing=true 
        // arg name does matter and is up
        // to the developer get name it
        // setIsEditing(isEditing => !isEditing); // Nothing should change since
        // revaluated to false when react rescheduled the update of isEditing
        onChangeName(symbol, playerName);
    }

    function handleNameChangeOnStroke(
        receivedGeneratedDOMEventPassedToTheElemtEventHandler) {
        setPlayerName(receivedGeneratedDOMEventPassedToTheElemtEventHandler
            .target.value);
    }

    if (isEditing) {
        buttonText = "Save";
        playerNameElemt = <input required
            type="text"
            onChange={handleNameChangeOnStroke}
            name="" id=""
            value={playerName} />
    }
    else {
        buttonText = "Edit";
        playerNameElemt = <span className="player-name">{playerName}</span>
    }

    return (
        <li className={isActivePlayer ? "active" : undefined}>
            <span className="player">
                {playerNameElemt}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => { handleEditing() }}>
                {buttonText}
            </button>
        </li>);
}