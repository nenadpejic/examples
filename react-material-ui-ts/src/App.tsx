import './App.css'
import BasicTable from './components/table/BasicTable'
import WithPagination from './components/table/WithPagination'
import WithSorting from './components/table/WithSorting'
import WithSelecting from './components/table/WithSelecting'
import AlertDialog from './components/dialog/AlertDialog'

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      {/* <WithPagination /> */}
      {/* <WithSorting /> */}
      {/* <WithSelecting /> */}
      <AlertDialog />
    </div>
  );
}

export default App
