import styled from 'styled-components'
import { rel8Purple } from '../../globals'




export const TableStyle = styled.table`
  font-family:  Rubik;
  border-collapse: collapse;
  width: 100%;
 td,th{
  border: 1px solid #ddd;
  padding: 8px
}
tr{
  background-color:white
}
 th{
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: ${rel8Purple};
  color: white;
}

`
