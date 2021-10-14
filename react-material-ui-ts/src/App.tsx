import { BrowserRouter as Router } from 'react-router-dom'
import BasicTable from './components/table/BasicTable'
import TableWithPagination from './components/table/TableWithPagination'
import TableWithSorting from './components/table/TableWithSorting'
import TableWithSelecting from './components/table/TableWithSelecting'
import AlertDialog from './components/dialog/AlertDialog'
import SimpleMenu from './components/menu/SimpleMenu'
import SimpleDrawer from './components/drawer/SimpleDrawer'
import BasicAccordion from './components/accordion/BasicAccordion'
import ControlledAccordion from './components/accordion/ControlledAccordion'
import MouseOverPopover from './components/popover/MouseOverPopover'

function App() {
  return (
    <div className="app">
      <Router>
        <BasicAccordion />
        {/* <ControlledAccordion /> */}
        {/* <BasicTable /> */}
        {/* <TableWithPagination /> */}
        {/* <TableWithSelecting /> */}
        {/* <TableWithSorting /> */}
        {/* <AlertDialog /> */}
        {/* <SimpleMenu /> */}
        {/* <SimpleDrawer /> */}
        {/* <MouseOverPopover /> */}
      </Router>
    </div>
  );
}

export default App
