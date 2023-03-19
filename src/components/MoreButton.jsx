import {
    CancelIcon,
    EditIcon,
    EllipsesIcon,
    PlusCircleIcon,
  } from '../assets/SideBar/svgs';
import styled from 'styled-components';
import { useState } from 'react';

const MoreButtonContainer = styled.div`
    border: 1px solid #9934b54c;
    padding: .5rem;
    position: relative;
    border-radius: 5px;
    cursor: pointer;

`
export const FloatingPane = styled.div`
background-color: white;
border-radius: 5px;
padding: 1rem;
min-width: 100px;
p{
    border-bottom: 1px solid rgba(0,0,0,0.23);
    padding: .5rem 0;
    cursor: pointer;
}
position: absolute;
top: 50px;
right: 0;
box-shadow: 10px 10px 48px 0px rgba(0, 0, 0, 0.116);
svg{
    
}
`
const MoreButton = ({list=[]})=>{
    const [show,setShow]= useState(false)

    return (
        <MoreButtonContainer    onClick={e=>setShow(!show)} >
            <EllipsesIcon />
            {
                show?
            <FloatingPane> 
                {
                    list.map(({label,click},index)=>(
                        <p onClick={(e)=>{click()}}>{label}</p>
                    ))
                }
            </FloatingPane>:''
            }
        </MoreButtonContainer>
    )
}

export default MoreButton