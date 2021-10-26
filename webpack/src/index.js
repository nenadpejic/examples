// import validator from "validator";
import isEmail from "validator/lib/isEmail";
import addTwo from "./addTwo";

// console.log(validator.isEmail("foo"));
console.log(isEmail("foo"));

console.log(addTwo(1, 2));

if (module.hot) {
  module.hot.accept();
}
