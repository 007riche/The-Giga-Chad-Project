export default function Input({ ref, label, isTextArea, ...props }) {
    const classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
        <p className="flex flex-col my-4">
            <label htmlFor="" className="text-sm font-bold uppercase text-stone-500">
                {label}
            </label>
            {
                isTextArea ?
                    <textarea ref={ref} {...props} className={classes} /> :
                    <input ref={ref} {...props} className={classes} />
            }
        </p>
    );
}