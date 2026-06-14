import { useRef, useState } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();


  function handleSubmit(event) {
    // intercept the submission of the form
    // for some custom preprocessing before the final 
    // submission to the server or continue the workflow of the app
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    console.log(enteredEmail, enteredPassword); // Test

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
            ref={email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
            ref={password}
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
