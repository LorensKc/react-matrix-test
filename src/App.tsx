import React, { Fragment } from 'react';
import { TableProvider } from './context/TableContext';
import Table from './components/Table';

const App: React.FC = () => {
    const [rows, setRows] = React.useState(5);
    const [cols, setCols] = React.useState(5);
    return (
      <Fragment>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: 10 }}>
            <span style={{ marginRight: 10 }}>Rows count</span>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              placeholder="Rows count"
            />
          </label>

          <label>
            <span style={{ marginRight: 10 }}>Cols count</span>
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              placeholder="Cols count"
            />
          </label>
        </div>
        <TableProvider M={rows} N={cols}>
          <div>
            <h1>Martix Table</h1>
            <Table />
          </div>
        </TableProvider>
      </Fragment>
    );
};

export default App;