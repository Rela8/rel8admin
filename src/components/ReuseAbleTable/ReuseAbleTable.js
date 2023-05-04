
import { useEffect, useMemo, useState } from 'react';
import {useTable} from 'react-table'
// import {TableStyle} from './Table.style'
import PropTypes from 'prop-types';
import { TableHead, TableRow,Table  as TBle,TableData } from '../ActionComponents/ActionComponents1';





const Table = ({ prop_columns=[],custom_data=[]}) =>{
  // const user = getUserOr404()
  // const dispatch = useAppDispatch()
  // const { listings ,status} = useAppSelector(SelectListingForLandmark)
  // const [listings,setListings] = useState([])
  const columns = useMemo(()=>prop_columns,[])
  const data = useMemo(()=>custom_data,[custom_data])

  const  {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,data
  })

  const handleRowRoute = (id)=>{
    //this would send the page to a detail page
  }
  return(
    <TBle {...getTableProps()}>
      {/* <Preloader loading={status==='pending'}/> */}
      {/* <TableStyle {...getTableProps()} > */}
        <thead >
          {
            headerGroups.map((headerGroup,index)=>(
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {
                  headerGroup.headers.map((column,columnIndex)=>{
                    return (
                      <TableHead {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</TableHead>  
                    )
                  })
                }
              </TableRow>

            ))
          }
        </thead>

        <tbody {...getTableProps()}>
          {
            rows.map((row,index)=>{
              let id = row.original.id

              prepareRow(row)
              return <TableRow {...row.getRowProps()} key={index} onClick={(e)=>handleRowRoute(id)}>
                {
                  row.cells.map((cell,cellIndex)=><TableData {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</TableData>)
                }
              </TableRow>
            })
          }                
        </tbody>
      {/* </TableStyle> */}
    </TBle>
  )
}

Table.propTypes= {
  prop_columns:PropTypes.array,
  custom_data:PropTypes.array,
}


export default Table