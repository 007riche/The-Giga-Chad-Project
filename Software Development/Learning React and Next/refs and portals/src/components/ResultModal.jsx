// In Earlier versions of react 
// we should forwoard a ref to a component by using the forwardRef({ComponentDef}, ref) provided 
// by react and still supported by its latest version 

import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

// import { forwardRef } from "react";


// // This syntax of forwarding ref to a component as a prop is supported by lates version of react
// const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
//     return (
//         <dialog ref={ref} className="result-modal" >
//             <h2> You {result} </h2>
//             <p>
//                 The target time was <strong>{targetTime} seconds.</strong>
//             </p>
//             <p>
//                 You stopped the timer with <strong> X seconds left.</strong>
//             </p>
//             <form action="dialog">
//                 <button>Close</button>
//             </form>
//         </dialog>
//     );
// });

// export default ResultModal;

// For more reusability, component can expose their API on how the work.
// Exposing this API can be done by using the UseImperativeHandle(ref, callBack) 
// provided by react


// This syntax of forwarding ref to a component as a prop is supported by lates version of react
export default function ResultModal({ ref, targetTime, remaingTime, onReset }) {
    const dialog = useRef();

    const userLost = remaingTime <= 0;
    const formattedRemaingTime = (remaingTime / 1000).toFixed(2);
    const score = Math.round((1 - remaingTime / (targetTime * 1000)) * 100);


    useImperativeHandle(ref, () => {
        // to return an object of Exposed resources and methods 
        // of the component to oustide world
        return {
            show() {
                dialog.current.showModal();
            }
        };
    });

    // Portals allow us to render component at a specific target place in 
    // the rendered DOM tree, using the createPortal from the react-dom
    // package.  createPortal( FragmentToBeRendered , destination)

    return createPortal(
        // the fragment
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2> You lost </h2>}
            {!userLost && <h2> Your score is: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong> {formattedRemaingTime} seconds left.</strong>
            </p>
            <form action="dialog" onSubmit={onReset}>
                <button >Close</button>
            </form>
        </dialog>
        // end of fragment
        ,
        // Destination
        document.getElementById("modal")
    );
}