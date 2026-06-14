// importing singled out elements from a module
import { elemAvaivableOutSideThisCurrentFile, apiKey } from "./util.js";

// Here the extension of the module is timportant to be mentioned since there is no build process 
// handling its loading and management!

// import of all elem from a module is also allowed, aliased or not (using as keyword to rename 
// them in the module they have been imported)

// naming the default exported elemt from the module
import modDefault from "./util.js";
