import { useState } from "react";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    "email": "",
    "password": ""
  });

  function handleSubmit(event) {
    // intercept the submission of the form
    // for some custom preprocessing before the final 
    // submission to the server or continue the workflow of the app
    event.preventDefault();
    console.log(enteredValues); // Test

  }

  function handleInputChange(idField, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [idField]: value
    }));
  }



  return (
    <form
      onSubmit={handleSubmit} // Solution 2, for handling 
    // events on the overall form
    >
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"
            value={enteredValues.email}
            onChange={(event) => { handleInputChange("email", event.target.value) }}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
            value={enteredValues.password}
            onChange={(event) => { handleInputChange("password", event.target.value) }}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button"
        // By default, causes the reload of the page
        // solution 1, set type="button" 
        // onClick={handleSubmit}
        >Login</button>
      </p>
    </form>
  );
}
