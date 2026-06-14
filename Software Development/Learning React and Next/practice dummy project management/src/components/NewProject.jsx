import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    const modalRef = useRef();

    function handleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDueDate = dueDateRef.current.value;

        if (enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === '') {
            modalRef.current.open();
            return;
        }

        onAdd({
            titleRef: enteredTitle,
            descriptionRef: enteredDescription,
            dueDateRef: enteredDueDate,
        });
    }


    return (
        <>
            <Modal ref={modalRef} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-500 my-4 ">
                    Invalid input
                </h2>

                <p className="text-stone-600 mb-4">
                    Oops ... Somethign went wrong with the values.
                </p>
                <p className="text-stone-600 mb-4">
                    Please make sure you provide valid values for every input field.
                </p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button onClick={onCancel} className="text-stone-800 hover:text-stone-950">
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button className="px-6 py-2 bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={titleRef} label="Title" />
                    <Input ref={descriptionRef} label="Description" isTextArea />
                    <Input type="date" ref={dueDateRef} label="Due date" />
                </div>
            </div>
        </>
    );
}