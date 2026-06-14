import { useState } from 'react';
import { styled } from "styled-components";
import Input from './Input';
import Button from './Button';

const ActionClassContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
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
          {/* <label className={`label ${emailNotValid ? 'invalid' : ''}`}>Email</label> */}
          <Input
            label="Email"
            invalid={emailNotValid}
            type="email"
            // className={emailNotValid ? 'invalid' : undefined}
            // $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          {/* <label>Password</label> */}
          <Input
            label="Password"
            invalid={passwordNotValid}
            type="password"
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
        {/* <Button type="button" className="text-button"> */}
        <button type="button" className="text-button">
          Create a new account
        </button>
        {/* <button className='button' onClick={handleLogin}>Sign In</button> */}
        <Button onClick={handleLogin}>Sign In</Button>
        {/* </div> */}
      </ActionClassContainer>
    </div>
  );
}
