import styled from "styled-components";

const Label = styled.label`
display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? "#f87171" : "#6b7280")};
  `;



const StyledInput = styled.input`
   width: 100%;
   padding: 0.75rem 1rem;
   line-height: 1.5;
   background-color: ${({ $invalid }) => ($invalid ? '#fed2d2' : '#d1d5db')};
   color: ${({ $invalid }) => ($invalid ? "#ef4444" : "#374151")};
   border: 1px solid ${({ $invalid }) =>
    // ($invalid ? "#f73f3f" : "transparent")
    {
        // console.log($invalid)
        console.log(`Invalid:${$invalid} ==> ${$invalid}`);
        if ($invalid) return "#f73f3f";
        else return "transparent";
    }
    };
   border-radius: 0.25rem;
   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
   `;

export default function Input({ label, invalid, ...props }) {
    return (
        <p>
            <Label $invalid={invalid} >{label}</Label>
            <StyledInput
                {...props}
                // <input 
                // type="password"
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

                // $invalid={passwordNotValid}
                $invalid={invalid}


            // className={passwordNotValid ? 'invalid' : undefined}
            // vanilla css dynamic styling

            // onChange={(event) =>
            //     handleInputChange('password', event.target.value)
            // }
            />
        </p>
    );
}