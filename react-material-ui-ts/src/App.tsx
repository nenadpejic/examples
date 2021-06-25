import './App.css'
import BasicTable from './components/table/BasicTable'
import WithPagination from './components/table/WithPagination'
import WithSorting from './components/table/WithSorting'
import WithSelecting from './components/table/WithSelecting'

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      {/* <WithPagination /> */}
      {/* <WithSorting /> */}
      <WithSelecting />
    </div>
  );
}

export default App
