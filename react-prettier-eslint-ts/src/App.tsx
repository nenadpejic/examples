import { useEffect } from 'react';

function App() {
  const x = 1;

  useEffect(() => {
    console.log(x);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
