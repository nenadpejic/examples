import './App.css'
import BasicTable from './components/tables/BasicTable'
import WithPagination from './components/tables/WithPagination'
import WithSorting from './components/tables/WithSorting'

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
