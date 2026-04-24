import { useState } from 'react';
import { styled } from "styled-components";

const ActionClassContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  `;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({ $invalid }) => ($invalid ? "#f73f3f" : "#d1d5db")};
  color: ${({ $invalid }) => ($invalid ? "#ef4444" : "#374151")};
  border: 1px solid ${({ $invalid }) => {
    console.log($invalid)
    console.log($invalid ? "#ef4444" : "#374151");
    if ($invalid) return "#f73f3f";
    else return "transparent";
  }
  // ($invalid ? "#f73f3f" : "transparent")
  };
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  `;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <div className="controls">
        <p>
          {/* 
          Conditional and dynamic styling can be achieved using
          string construction by string interpollation, such that 
          the resulting string (here the value of the CSS property), 
          changes based on embedded conditions  
          eg: list of classes set on email label below

          Side note: in conditional styling, always use the ternary branching
          approach rather than the "&& chaining" to avoid injecting invalid 
          values on CSS properties
          */}
          <label className={`label ${emailNotValid ? 'invalid' : ''}`}>Email</label>
          <StyledInput
            type="email"
            // className={emailNotValid ? 'invalid' : undefined}
            $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <StyledInput
            // <input 
            type="password"
            // the "invalid" prop should the set to be accessible 
            //inside the defintion of the styled component
            // prefix the prop with a '$' symbol to avoid clashing with internal
            // pre-built prop in the basic markup i.e. $invalid

            // any forwarded prop can be accessed by destructuring
            // all the forwarded props in anonymous function style
            // i.e. ${({propName}) =>()} for single line body
            // or
            // ${({propName}) => {
            // processing... 
            // return retVal;
            // }}

            $invalid={passwordNotValid}

            // className={passwordNotValid ? 'invalid' : undefined}
            // vanilla css dynamic styling

            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
          {/* </StyledInput> */}
        </p>
      </div>
      <ActionClassContainer>
        {/* <div className="actions"> */}
        {/* 
        Styled-components feature can be used to inject a style to a 
        part of markup or a component by using the string interpolation concatenated
        with some selected element, storing the result in a JS Object, 
        that can be used as a Tag to be used as classic Component Tag
        
        eg: const ActionClassContainer = styled.div`
                                        display: flex;
                                        justify-content: flex-end;
                                        gap: 1rem;
                                        `
          "styled" is just the alias of the object contained in the 
          @styled-components imported module

          Under the hood, a "div" element is created and replaces the
          ActionClassContainer tag when rendering the final markup 
          because of the styled.<<div>>`` during the definition

          By default, these type of components forward all the props 
          and elements such as HTML elements created under the hood that have 
          been set on them.

          Conditional styling can be done direct by levraging the 
          string interpolation ( AKA string templating), since it is just javascript
          in the end. 
          eg: def@StyledInput (color, border-color, background-color)

         */}
        <button type="button" className="text-button">
          Create a new account
        </button>
        <button className='button' onClick={handleLogin}>Sign In</button>
        {/* </div> */}
      </ActionClassContainer>
    </div>
  );
}
