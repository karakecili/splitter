import React, { useState, useEffect, useMemo, useRef, forwardRef } from 'react';
import './TopLeft.scss';
import { useTable } from 'react-table';
import { tableActions } from '../redux/slices/tableSlices';
import { useDispatch, useSelector } from 'react-redux';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
});

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Table({ columns }) {
  const [year, setYear] = useState(0);

  const dispatch = useDispatch();

  const selector = useSelector((state) => {
    return year == 0
      ? state.table.tableData
      : state.table.tableData.filter((data) => data.contract == year);
  });
  // const data = useMemo(() => selector, []);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(tableActions.fetchData({ arrLength: 5 }));
    // setData(useSelector((state) => state.table.tableData));
  }, []);

  useEffect(() => {
    setData(selector);
    // setData(useSelector((state) => state.table.tableData));
  }, [selector]);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <>
      <div className="TopLeft__filters">
        <div className="TopLeft__select">
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value={0}>Hepsi</option>
            <option value={2018}>2018</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
          </select>
        </div>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
      <table className="TopLeft__table" {...getTableProps()}>
        <thead className="TopLeft__header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="TopLeft__header--rows"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre className="TopLeft__hiddenCols">
        {JSON.stringify(state, null, 2)}
      </pre>
    </>
  );
}

function TopLeft() {
  const columns = useMemo(
    () => [
      {
        Header: 'Tablo',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Kontrat',
            accessor: 'contract',
          },
          {
            Header: 'Teklif',
            accessor: 'offer',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Data',
            accessor: 'data',
          },
        ],
      },
    ],
    []
  );

  return <Table columns={columns} />;
}

export default TopLeft;
