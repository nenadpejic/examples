import './App.css'
import BasicTable from './components/table/BasicTable'
import WithPagination from './components/table/WithPagination'
import WithSorting from './components/table/WithSorting'

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      {/* <WithPagination /> */}
      <WithSorting />
    </div>
  );
}

export default App
