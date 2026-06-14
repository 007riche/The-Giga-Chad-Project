import logo from '../assets/logo.png';
import styled from 'styled-components';
// import "./Header.css"; // not scoped
// import HStyle from "./Header.module.css"; // Scoped to Header.jsx


// Styled-component with nested element
// just replace the base element occurence in the same 
// letters postion the nested selection by an '&' sybmol

// Header clashes with the exported component so let choose
// HeaderSC

// Look at Header.css or Header.module.css to see the difference

// same principle applies with css pseudo-classes set on elements
// checkout the styled-Button in AuthInput

const HeaderSC = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;


& img {
  object-fit: contain;
  margin-bottom: 2rem;
  width: 11rem;
  height: 11rem;
}

& h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: 'Pacifico', cursive;
    margin: 0;
}

& p {
    text-align: center;
    color: #a39191;
    margin: 0;
}

@media (min-width: 768px) {
    & {
        margin-bottom: 4rem;
    }

    & h1 {
        font-size: 2.25rem;
    }
}
`;

export default function Header() {

  return (
    <HeaderSC>
      {/* <header> */}
      {/**
      CSS rules scoping can be achieved by adding the "module" litteral
      in the extension of the css file name such that a css file named 
      custom.css becomes custom.module.css. This allows the BTS build process
      to scope this CSS file to the modules or components 
      in which it is imported.
      
      all the style defined in that file is then compacted into a single 
      JS object which can be given any name of choice (eg: HStyle) when importing it.

      applied styles using that object through css properties will result into 
      transform the label of these CSS element names into randomly 
      generated css element names in the end browser 
      eg: the .h1 class can end up being ._h1_9ecvt_18 in the browser 
      when the page is rendered
       */}

      <img src={logo} alt="A canvas" />
      <h1
      // className={HStyle.h1}
      >ReactArt</h1>

      {/**  
      One way to scope a styling to a component is to "inline-style" 
      that component using, the style html property.

      Note that, in react that "style" prop accept a JS object i.e. ({})
       rather than a string just as in basic html file, and also, since in JS hyphen is not 
      allowed in var names, CSS properties name having a hyphen should use 
      a camel-case naming convention instead.
      eg: text-align => textAlign 
       */}


      <p
      // style={{
      //   color: 'red',
      //   textAlign: 'right',
      // }}
      >A community of artists and art-lovers.</p>
      {/* </header> */}
    </HeaderSC>
  );
}
