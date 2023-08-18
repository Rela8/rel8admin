import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";



// const options = [
//     { label: "Grapes 🍇", value: "grapes"  },
//     { label: "Mango 🥭", value: "mango" },
//     { label: "Strawberry 🍓", value: "strawberry"},
//   ];
type Prop ={
    onChange:(value:{label:string,value:string}[])=>void,
    options:{label:string,value:string}[] ,
    label:string,
}
  

const MultiSelectComp =({onChange,options,label}:Prop)=>{
    const [selected, setSelected] = useState([]);


    useEffect(()=>{
        onChange(selected)
    },[selected])

    
  return (
    <div>
      <h4>Select {label}</h4>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        
      />
    </div>
  );
}

export default MultiSelectComp