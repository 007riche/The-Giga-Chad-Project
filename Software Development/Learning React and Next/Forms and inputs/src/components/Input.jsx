export default function Input({ label, id, error, ...props }) {
    return (
        <div className="control no-margin">
            <label htmlFor={id}>{label}</label>
            <input id={id}
                {...props}
            // value={enteredValues.email}
            // onChange={(event) => { handleInputChange("email", event.target.value) }}
            // onBlur={() => { handleInputBlur("email") }}
            />
            <div className="control-error">
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}