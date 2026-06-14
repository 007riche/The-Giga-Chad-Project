import { useState } from "react";
import Input from "./Input";
import { useInput } from "../hooks/useInput";
import { isEmail, hasMinLength, isNotEmpty } from "../util/validation.js";

export default function Login() {
  // REfactored into the custom hook useInput
  // const [enteredValues, setEnteredValues] = useState({
  //   "email": "",
  //   "password": ""
  // });

  // const [didBlured, setDidBlur] = useState({
  //   "email": false,
  //   "password": false
  // });

  // function handleInputChange(idField, value) {
  //   setEnteredValues((prevValues) => ({
  //     ...prevValues,
  //     [idField]: value
  //   }));
  //   setDidBlur((prevBlur) => ({
  //     ...prevBlur,
  //     [idField]: false // on keystrokes
  //   }));
  // }

  // function handleInputBlur(idField) {
  //   setDidBlur((prevBlur) => ({
  //     ...prevBlur,
  //     [idField]: true
  //   }));
  // }
  // const isEmailInvalid = didBlured.email
  //   && !enteredValues.email.includes('@')
  //   && !enteredValues.email.includes('.');

  // const isPasswordValid = didBlured.password
  //   && enteredValues.password.trim().length <= 0;


  const { value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    isNotValid: isEmailInvalid
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value)
  ); // Replacing the old logic for email

  const { value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    isNotValid: isPasswordInvalid
  } = useInput('', (value) => hasMinLength(value, 6)
  ); // Replacing the old logic for email

  function handleSubmit(event) {
    // intercept the submission of the form
    // for some custom preprocessing before the final 
    // submission to the server or continue the workflow of the app
    event.preventDefault();

    if (isEmailInvalid || isPasswordInvalid) { return }
    console.log("Passed validation step"); // Test
  }

  return (
    <form
      onSubmit={handleSubmit} // Solution 2, for handling 
    // events on the overall form
    >
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          // value={enteredValues.email}
          // onChange={(event) => { handleInputChange("email", event.target.value) }}
          // onBlur={() => { handleInputBlur("email") }}
          error={isEmailInvalid && 'Please enter a valid email.'}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={isPasswordInvalid && 'Please enter a valid password.'}
        />
        {/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
            value={enteredValues.password}
            onChange={(event) => { handleInputChange("password", event.target.value) }}
          />
        </div> */}
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
