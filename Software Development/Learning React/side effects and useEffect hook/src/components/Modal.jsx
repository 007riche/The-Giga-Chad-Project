import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// const Modal = forwardRef(
function Modal({ open, children }
  // , ref
) {
  const dialog = useRef();
  useEffect(() => {
    if (open) { dialog.current.showModal(); }
    else { dialog.current.close(); }
  }, [open] // deps are elements that would cause the component function 
    // to re-execute
  );

  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // });


  // first time rendered, no existence
  // if (open) { dialog.current.showModal(); }
  // else { dialog.current.close(); }

  return createPortal(
    <dialog className="modal"
      ref={dialog}
    // open={open}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}
// );

export default Modal;
