import { useEffect, useState } from "react";



export default function ProgressBar({ TIMER }) {
    const [remainingTime, setRemainingTime] = useState(TIMER);

    useEffect(() => {
        const CALLBACK_INTERVAL = TIMER / 100;
        const intervalCallBack = setInterval(() => {
            setRemainingTime(prevRemTime => prevRemTime - CALLBACK_INTERVAL);
        }, CALLBACK_INTERVAL);

        // Clean up function
        return () => {
            clearInterval(intervalCallBack);
        };
    },
        []
    );

    return <progress value={remainingTime} max={TIMER} />;
}