import React, { useState } from "react";

interface Props {
  name: string;
}

// NOTE: Thanks to React.memo() Message does not re-render when App state changes, even tho it is a child of App.
const Message = React.memo<Props>(({ name }) => {
  return (
    <div>
      {console.log("Message rendered!")}

      <p>Hello {name}</p>
    </div>
  );
});

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      {console.log("App rendered!")}

      <p>counter: {counter}</p>
      <button onClick={() => setCounter((prev) => prev + 1)}>Add</button>

      {<Message name={counter % 5 === 0 ? "Joe" : "Smith"} />}
    </div>
  );
}

export default App;
