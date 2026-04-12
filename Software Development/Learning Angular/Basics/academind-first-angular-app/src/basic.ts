//Typing operator:  ":"

// Primitives:

let age: number; // number

let userName: string; // string

let isUserConnected: boolean ;// boolean

let caught : any //  any (more like object in java)

function noReturn() : void
{}

//  Array of basic elements

//Array of strings
let books: string[];

// Object of basic elements
 let person : {
    name: string;
    wage: number;
 } // By inference, variable person will have the same structure as the one inside braces (implicit typing), 
 // the structure inside the braces is anonymous to the programmer, not the compiler

 // Arrays of objects 
 let cards: {
    name: string;
    cvv: number
 } []; // here a single card is typed by the structure inside te curly braces by inference


 // Union type operator: "|" (the Pipe)
 let amount: number | string;


 // type aliasing (Type definition, Explicit Typing) with the keyword "type" and "=" operator
 // implicit type solved
 type Person = { 
    name: string;
    id: number;
 }


 // Typing funtcion
 function add(firstNumber: number, secondNumber: number): number/*Function type (Return type)*/ {
    return firstNumber+secondNumber;
 }

 // Generics
 function processingRuntimeTypeOfData<Tipe>(usedArrayOfTyopTipe: Tipe[], aValueOfTypeTipe: Tipe) {
    const returnedArray = [...usedArrayOfTyopTipe, aValueOfTypeTipe];

    // return returnedArray; // Is  of type Tipe[]

    return aValueOfTypeTipe; // Is now of type Tipe
 }

 // Classes 
class Student {
    // Properties explicit definition
    name: string;
    private courses: string[]; // private property


    // Constructor with explicitly defined properties
    constructor(name: string, courses: string[]) { 
        this.name = name;
        this.courses =courses;
    }



    // Constructor with embedded properties definition with access modifiers
    // 
    // constructor(
    //     public name: string,
    //     private courses: string[]
    // ){}

    // method of the class 

    processCourses(course: string) {
        this.courses.push(course);
    }
}


// Interfaces : a way of naming implicit Ojbect definition structure contract 
// just like interfaces in other languages like Java
// with no implementation as this is the main advantage of interaction contract between object in a 
// OO world
// Can be implemented by classes, not the case of types or classes 
// Feature usefull for runtime polymorphism of objects

interface Thinking {
    information: string;

    processing: () => string;

}

class GoodStudent implements Thinking {

    information!: string;

    processing() {
        return "my result";
    };
}
