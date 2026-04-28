import { useEffect, useState } from "react";
import ProgressBar from "./ProgresBar";

const TIMER = 5000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {


  useEffect(() => {
    // Side Effect block
    const timer = setTimeout(() => {
      const ref1 = onConfirm; // different as JS object in memory
      // from the one set in 
      // the deps arrays each time the block of the side effect is 
      // reconstructed each time this component or 
      // its "parent" component is re-created 
      // even though it both reference have the same logic body
      let seOC = new WeakRef(ref1);
      ref1();
      console.log("Ref#1:" + seOC.deref());
    }, TIMER);

    // UseEffect Clean up function
    // This clean up Fx runs between subsequent executions of 
    // the side effects block
    return () => {
      let ptr = new WeakRef(onConfirm);
      console.log("Ref#2:" + ptr.deref());
      clearTimeout(timer);
    };
  },
    [onConfirm] // Deps array
  ); // This code can be buggy due to the difference of the 'onConfirm' in Deps 
  // and the one used in the side effect block
  // here in this case, this migth lead to infinite loop
  // because the first time the modal is rendrer forces the APP
  // to re-execute for the second time and all of the internal
  // object of its first rendering are now different from the "same"
  // objects rendered the second time the APP components is rendered, in
  // memory per say, even though all this memory have the same body
  // or definition i.e. their References change in memory each rendering
  // cycle of the component, BUT, useEffect seems to use
  // the same references in memory of declared dependencies
  // through out the lifecycle of the side effect.

  // obj@ParentComp#Time-1 = ptr->obj@ChildComp#Time-1  == ptr->obj@ChildComp#Time-1
  // but
  // obj@ParentComp#Time-2 ≠≠ ptr->obj@ChildComp#Time-2 == ptr->obj@ChildComp#Time-1
  // and
  // ptr->obj@ChildComp#Time-N == ptr->obj@ChildComp#Time-(N-1) == ...
  // == ptr->obj@ChildComp#Time-2 == ptr->obj@ChildComp#Time-1

  // The solution to solve this?
  // one approach is the useCallBack on the object that should be used
  //  later as a useEffect dependency wherever its has to be 
  // even to be passed as a ref 
  // useCallback(obj, [useCallBackDepsArray]);
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar TIMER={TIMER} />
    </div>
  );
}
