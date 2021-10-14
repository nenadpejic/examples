import { BrowserRouter as Router } from 'react-router-dom';
import BasicAccordion from './components/accordion/BasicAccordion';
import ControlledAccordion from './components/accordion/ControlledAccordion';
import AlertDialog from './components/dialog/AlertDialog';
import MyDrawerWithPopover from './components/drawer/MyDrawerWithPopover';
import TemporaryDrawer from './components/drawer/TemporaryDrawer';
import BasicMenu from './components/menu/BasicMenu';
import MouseOverPopover from './components/popover/MouseOverPopover';
import BasicTable from './components/table/BasicTable';
import MyTable from './components/table/MyTable';
import { Columns, HandleInteract, MenuOptions } from './components/table/MyTable/MyTable.types';
import TableWithPagination from './components/table/TableWithPagination';
import TableWithSelecting from './components/table/TableWithSelecting';
import TableWithSorting from './components/table/TableWithSorting';

interface Desert {
  id: string
  name: string
  calories: number
  fat: number
}

function App() {
  const createData = (id: string, name: string, calories: number, fat: number): Desert => {
    return { id, name, calories, fat };
  }

  const rows = [
    createData('1', 'Cupcake', 305, 3.7),
    createData('2', 'Donut', 452, 25.0),
    createData('3', 'Eclair', 262, 16.0),
    createData('4', 'Frozen yoghurt', 159, 6.0),
    createData('5', 'Gingerbread', 356, 16.0),
    createData('6', 'Honeycomb', 408, 3.2),
    createData('7', 'Ice cream sandwich', 237, 9.0),
    createData('8', 'Jelly Bean', 375, 0.0),
    createData('9', 'KitKat', 518, 26.0),
    createData('10', 'Lollipop', 392, 0.2),
    createData('11', 'Marshmallow', 318, 0),
    createData('12', 'Nougat', 360, 19.0),
    createData('13', 'Oreo', 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const total = rows.length;

  const isLoading = false;

  const columns: Columns<Desert> = [
    {
      key: 'id', label: 'Id', align: 'left', getValue: (row) => row.id,
    },
    {
      key: 'name', label: 'Name', align: 'left', getValue: (row) => row.name,
    },
    {
      key: 'calories', label: 'Calories', align: 'left', getValue: (row) => row.calories,
    },
    {
      key: 'fat', label: 'Fat', align: 'left', getValue: (row) => row.fat,
    },
  ];

  const menuOptions: MenuOptions = [
    {
      key: 'toggle-active-status',
      label: 'Toggle Active Status',
      onClick: (row) => {
        console.log(`Toggle Active Status`);
      },
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: (row) => {
        console.log(`Edit`);
      },
    },
    {
      key: 'show-updates',
      label: 'Show Updates',
      onClick: (row) => {
        console.log(`Show Updates`);
      },
    },
  ];

  const handleInteract: HandleInteract = ({
    page, rowsPerPage, order, orderBy,
  }) => {
    console.log(`handleInteract`);
  };

  return (
    <div className="app">
      <Router>

        {/* <BasicAccordion /> */}
        {/* <ControlledAccordion /> */}

        {/* <AlertDialog /> */}

        {/* <TemporaryDrawer /> */}
        {/* <MyDrawerWithPopover /> */}

        {/* <BasicMenu /> */}

        {/* <MouseOverPopover /> */}

        {/* <BasicTable /> */}
        {/* <TableWithPagination /> */}
        {/* <TableWithSelecting /> */}
        {/* <TableWithSorting /> */}
        <MyTable
          rows={rows}
          total={total}
          isLoading={isLoading}
          columns={columns}
          initialState={{ orderBy: 'id' }}
          menuOptions={menuOptions}
          onInteract={handleInteract}
        />

      </Router>
    </div>
  );
};

export default App;
