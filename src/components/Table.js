import { useEffect, useMemo, useState } from 'react';
import {useTable} from 'react-table'
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { SelectListingForLandmark } from '../../redux/ListingForLandmark/ListingForLandmarkSlice';
// import { getUserOr404 } from '../../services/service.helper';
// import Preloader from '../Preloader/Preloder';
//from my expirence react-table does not blend well with typescript that why am using js
// import {TableStyle} from './Table.style'
import PropTypes from 'prop-types';
import { TableBody,Table as Rel8Table, TableRow, TableHead, TableData } from './ActionComponents/ActionComponents1';



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
      <Rel8Table {...getTableProps()} >
        <TableBody>
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
        </TableBody>
      </Rel8Table>
  )
}

Table.propTypes= {
  prop_columns:PropTypes.array,
  custom_data:PropTypes.array,
}


export default Table