import { createContext } from "react";

// React context are one solution to managing the state of
//  data in react,
// it is similar to the Consumer provider in flutter
// here, it is export in order to be used as wraper component 
// around fragments or components that need where the state of 
// the data transmitted between different components needs 
// to be managed 

export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    updateItemQuantity: () => { },
});