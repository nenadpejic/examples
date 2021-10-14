import { BrowserRouter as Router } from 'react-router-dom';
import BasicAccordion from './components/accordion/BasicAccordion';
import ControlledAccordion from './components/accordion/ControlledAccordion';
import AlertDialog from './components/dialog/AlertDialog';
import MyDrawerWithPopover from './components/drawer/MyDrawerWithPopover';
import TemporaryDrawer from './components/drawer/TemporaryDrawer';
import BasicMenu from './components/menu/BasicMenu';
import MouseOverPopover from './components/popover/MouseOverPopover';
import BasicTable from './components/table/BasicTable';
import TableWithPagination from './components/table/TableWithPagination';
import TableWithSelecting from './components/table/TableWithSelecting';
import TableWithSorting from './components/table/TableWithSorting';

function App() {
  return (
    <div className="app">
      <Router>
        {/* <BasicAccordion /> */}
        {/* <ControlledAccordion /> */}

        {/* <AlertDialog /> */}

        {/* <TemporaryDrawer /> */}
        {/* <MyDrawerWithPopover /> */}

        <BasicMenu />

        {/* <BasicTable /> */}
        {/* <TableWithPagination /> */}
        {/* <TableWithSelecting /> */}
        {/* <TableWithSorting /> */}

        {/* <MouseOverPopover /> */}
      </Router>
    </div>
  );
};

export default App;
