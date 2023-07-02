// import isEmail from "validator/lib/isEmail";
import addTwo from './addTwo'
import './style/main.scss'
import laughing from './assets/laughing.svg'

// console.log(isEmail("foo"));

console.log(addTwo(1, 2))

if (module.hot) {
  module.hot.accept()
}

const laughingEmoji = document.getElementById('laughing-emoji')
laughingEmoji.src = laughing

console.log('test 1234')
