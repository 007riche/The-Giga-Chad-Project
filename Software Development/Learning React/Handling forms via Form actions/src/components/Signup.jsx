import { useActionState } from "react";
import { hasMinLength, isEmail, isEqualToOtherValue, isNotEmpty } from "../util/validation"


// We can also handle form validation by using a hook provided by react
// starting at the version 19, useActionState
export default function Signup() {
  // the hanlder function of the form using action for 
  // handling the submission receives a form's data object 
  // instead of event set on that form
  // Also name attribute has to be set on each form's
  //  element to be part of that form

  // Note: action is just a default support from the browser
  // function handleSubmit(formData) {
  // Edited to be use as input to useActionState argument, 
  // which handles validation functions passed as argument 
  // differently as classic function call, 
  // take into account the previous state, just as other hooks
  function handleSubmit(prevFormData, formData) {
    // event.preventDefault();
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const terms = formData.get("terms");
    const acquisitionChannel = formData.getAll("acquistion");

    let errors = [];
    if (!isEmail(email)) {
      errors.push('Invalid email address');
    }

    if (!isNotEmpty(password) && !hasMinLength(password, 6)) {
      errors.push('You must provide a password with at least six characters.');
    }

    if (!isEqualToOtherValue(password, confirmPassword)) {
      errors.push('Passwords do not match');
    }

    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push('Please provide both your first and last name');
    }

    if (!isNotEmpty(role)) {
      errors.push('Please select a role');
    }

    if (!terms) {
      errors.push('You must agrre to the terms and conditions.');
    }

    if (acquisitionChannel.length === 0) {
      errors.push('Please select at least one acquitsition channel');
    }

    if (errors.length > 0) {
      return { errors };
    }
    return { errors: null }
  }

  const [formState, formAction] = useActionState(handleSubmit, { errors: null });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {
        formState.errors &&
        <ul className="error">
          {formState.errors.map((error) => (<li key={error}>{error}</li>))}
        </ul>
      }

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
