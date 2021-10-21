import React, { useMemo, useState } from "react";

const factorialOf = (n: number): number => {
  console.log("factorialOf called!");
  let f = 1;
  for (let i = 1; i <= n; i++) {
    f *= i;
  }
  console.log(f);
  return f;
};

const CalculateFactorial = () => {
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0);

  const factorial = useMemo(() => factorialOf(number), [number]);

  return (
    <div>
      {console.log("CalculateFactorial rendered!")}
      Factorial of
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      is {factorial}
      <button onClick={() => setCounter((prev) => prev + 1)}>
        Trigger re-render
      </button>
    </div>
  );
};

function App() {
  return (
    <div>
      <CalculateFactorial />
    </div>
  );
}

export default App;
