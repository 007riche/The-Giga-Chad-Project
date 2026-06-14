import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

// Refs can also be used to store any king of JS data, pointer to function, 
// objects, arrays etc
// Usefull when we need to use each component instance with their own data,
//  data that do not necessarily need to trigger that instance of the component 
// rebuild 



export default function TimerChallenge({ title, targetTime }) {
    const timerRef = useRef();
    const dialogRef = useRef();

    // just for POC on usage of refs using setTimout
    // const [timerStart, setTimerStart] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);

    const callBackTimePad = 250;
    const totalTargetTime = targetTime * 1000; // Because builtin callBack Functions 

    // take time in milliseconds
    const [timeRemaining, setTimeRemaining] = useState(totalTargetTime);
    // Example of derived state
    const timerIsActive = timeRemaining > 0 && timeRemaining < totalTargetTime;

    // let timer = null; // variable do not mimic the change of state of 
    // internal data, hence not ideal as a solution

    function handleStartChallenge() {
        // just for POC on usage of refs
        // timerRef.current = setTimeout(() => {
        //     setTimerExpired(true);
        //     // dialogRef.current.showModal(); // this higly couples the 
        //     // resultModal component with this component, hence hinders reusability
        //     // without inspecting what each part of the code is doing
        //     dialogRef.current.show(); // BUT, how do other dev know the API 
        //     // of the resource the component exposes ? the Docs?
        // }, targetTime * 1000);
        timerRef.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - callBackTimePad);
        }, callBackTimePad);
        // setTimerStart(true);
    }

    if (timeRemaining <= 0) {
        // This can be boggus and create a loop in conjunction with the state updation
        clearInterval(timerRef.current);
        // setTimeRemaining(totalTargetTime);
        dialogRef.current.show()
    }

    function handleStop() {
        dialogRef.current.show();
        clearInterval(timerRef.current);
    }

    function handleReset() {
        setTimeRemaining(totalTargetTime);
        clearInterval(timerRef.current);
    }

    return (
        <>
            {/* {
                timerExpired &&  */}
            <ResultModal
                ref={dialogRef}
                onReset={handleReset}
                targetTime={targetTime}
                remaingTime={timeRemaining}
            // result="lost"
            />
            {/* // } */}
            <section className="challenge">
                <h2>
                    {title}
                </h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 && 's'}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStartChallenge}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running..." : "Timer inactive"}
                </p>
            </section>
        </>

    );
}