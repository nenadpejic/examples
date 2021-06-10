import React, { useState } from 'react'
import styles from './Counter.module.css'

const Counter = () => {
  const [counter, setCounter] = useState(0)
  const [inputValue, setInputValue] = useState(1)

  const handleChangeInput = (e) => {
    const { value } = e.target
    setInputValue(parseInt(value))
  }

  const handleCounter = (type) => {
    let _counter = 0
    if (type === '-') {
      _counter = counter - inputValue
    } else {
      _counter = counter + inputValue
    }
    setCounter(_counter)
  }

  return (
    <div>
      <h1 data-testid='header'>Counter</h1>
      <p className={counter >= 100 ? styles.green : counter <= -100 ? styles.red : ''} data-testid='counter'>{counter}</p>
      <button data-testid='subtract-btn' onClick={() => handleCounter('-')}>-</button>
      <input type="number" data-testid='input' className={styles.input} value={inputValue} onChange={handleChangeInput} />
      <button data-testid='add-btn' onClick={() => handleCounter('+')}>+</button>
    </div>
  )
}

export default Counter
