import React, { useMemo } from 'react'
import './App.css';
import axios from 'axios';
import ColumnFilter from './ColumnFilter';
import { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { useTable, useSortBy, useFilters, useBlockLayout, useResizeColumns, useRowSelect } from 'react-table'
import AddBonds from './AddBonds';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function Table(props) {
  const { data, data1, setDataRow, addData, action, setAction, showAdd, setShowAdd, setLoading, alert, setAlert } = props
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetail, setShowDetail] = useState([])
  const [showDetailData, setShowDetailData] = useState({})
  const [listData, setListData] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div style={{ float: 'left' }}>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        accessor: 'checkbox',
        width: 50,
        // Cell: ({ row }) => (
        //   <div style={{ float: 'left', width: '50px' }}>
        //     <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        //       <i
        //         style={{ marginLeft: '4px', fontSize: '10px', marginBottom: '4px', cursor: "pointer" }}
        //         className="fas fa-pencil"
        //         onClick={(e) => { e.stopPropagation(); viewDetail(row.original.AUTOID) }}
        //         ></i>
        //   </div>
        // ),
        Filter: props => null,
        disableSortBy: true
      },
      {
        Header: 'Số hiệu',
        accessor: 'AUTOID',
        width: 84,
      },
      {
        Header: 'Mã Trái phiếu xác định NĐT CN',
        accessor: 'FULLNAMEASSET',
        minWidth: 315,
      },
      {
        Header: 'Mã trái phiếu',
        accessor: 'SYMBOL',
      },
      {
        Header: 'Số tiền tối thiểu để xác định NĐT CN',
        accessor: 'MINAMT',
        minWidth: 315,
      },
      {
        Header: 'Ngày hiệu lực',
        accessor: 'FRDATE',
      },
      {
        Header: 'Ngày hết hạn',
        accessor: 'TODATE',
      },
      {
        Header: 'Trạng thái',
        accessor: 'STATUSDES',
      }
    ],
    []
  )

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
      minWidth: 50,
      width: 180,
      maxWidth: 500,
    }),
    []
  )

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return (
        <>
          <input style={{ float: 'left' }} type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useSortBy,
    useResizeColumns,
    useBlockLayout,
    useRowSelect
  )
  setDataRow(selectedFlatRows)

  const viewDetail = id => {
    setShowAdd(true)
    const data = rows.filter(item => item.original.AUTOID === id)
    const dataRow = data.map(item => item.original);
    setShowDetailData(...dataRow)
  }

  // useEffect(() => {
  //   if (alert) {
  //     toast.success(alert, {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored"
  //     });
  //   }
  // }, [alert])

  setTimeout( () => { setAlert('') }, 6000);

  const newShowDetailData = {
    ...showDetailData,
    SYMBOL: {
      value: showDetailData.SYMBOL,
      label: showDetailData.SYMBOL
    },
    FULLNAMEASSET: {
      value: showDetailData.FULLNAMEASSET,
      label: showDetailData.FULLNAMEASSET
    },
    FRDATE: moment(showDetailData.FRDATE, 'DD/MM/YYYY'),
    TODATE: moment(showDetailData.TODATE, 'DD/MM/YYYY')
  }

  return (
    <>
      <table className="data-table" {...getTableProps()}>
        <thead >
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="table-head"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null} </div>
                  <div onClick={(e) => e.stopPropagation()} {...column.getResizerProps()} className="resizer"></div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onDoubleClick={() => { setAction('view'); viewDetail(row.original.AUTOID) }}>
                <td className="table-row" role="cell">
                  <div style={{ float: 'left' }}>
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                    <i
                      style={{ marginLeft: '4px', fontSize: '10px', marginBottom: '4px', cursor: "pointer" }}
                      className="fas fa-pencil"
                      onClick={(e) => { setAction('edit'); viewDetail(row.original.AUTOID) }}
                    ></i>
                  </div>
                </td>
                {row.cells.map(cell => {
                  return (
                    <td className="table-row" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {showAdd && <AddBonds
        data1={data1}
        setShowAdd={setShowAdd}
        showDetailData={showDetailData}
        setShowDetailData={setShowDetailData}
        newShowDetailData={newShowDetailData}
        setLoading={setLoading}
        action={action}
        alert={alert}
        setAlert={setAlert}
      />}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        // className={'toast'}
      />
      
    </>
  )
}

export default Table