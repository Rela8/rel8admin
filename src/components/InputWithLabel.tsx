import React from "react";
import { FormDataComp, FormLabel } from "./Modals/AddNews";


type Prop = {
    errorMessage?:string,
    label?:string,
    placeholder?:string;
    register?:any;
    type?:'password'|'text'|'date'
}


const  InputWithLabel = ({label,placeholder='',errorMessage,type='text',register={},}:Prop):React.ReactElement=>{

    return (
        <div>
                    <FormLabel>
              {label}:
              <FormDataComp
              placeholder={placeholder}
                type={type}
                {...register}
              />
            </FormLabel>
            <small>
                {errorMessage}
            </small>
        </div>
    )
}

export default InputWithLabel