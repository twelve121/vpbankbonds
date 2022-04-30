import React from 'react'
import './App.css';

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column

  return (
    <input 
      className='filter-input' 
      onClick={(e)=>e.stopPropagation()}
      value={filterValue || ''} 
      onChange={
        (e) => { 
          setFilter(e.target.value);
          return false; 
        }
      } />
  )
}

export default ColumnFilter