import { BrowserRouter as Router } from 'react-router-dom'
// import BasicTable from './components/table/BasicTable'
// import WithPagination from './components/table/WithPagination'
// import WithSorting from './components/table/WithSorting'
// import WithSelecting from './components/table/WithSelecting'
// import AlertDialog from './components/dialog/AlertDialog'
// import SimpleMenu from './components/menu/SimpleMenu'
// import SimpleDrawer from './components/drawer/SimpleDrawer'
// import SimpleAccordion from './components/accordion/SimpleAccordion'
// import ControlledAccordion from './components/accordion/ControlledAccordion'
import MouseOverPopover from './components/popover/MouseOverPopover'

function App() {
  return (
    <div className="app">
      <Router>
        {/* <BasicTable /> */}
        {/* <WithPagination /> */}
        {/* <WithSorting /> */}
        {/* <WithSelecting /> */}
        {/* <AlertDialog /> */}
        {/* <SimpleMenu /> */}
        {/* <SimpleDrawer /> */}
        {/* <SimpleAccordion /> */}
        {/* <ControlledAccordion /> */}
        <MouseOverPopover />
      </Router>
    </div>
  );
}

export default App
