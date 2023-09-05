import { FormLabel } from "./Login/Login.styles"
import { FormDataComp, FormOption, FormSelection, FormTextArea } from "./Modals/AddMeeting"






type Prop ={
    name:string,
    required?:boolean,
    type?:string,
    register:any,
    is_textarea?:boolean,
    label:string
}
const InputWithLabel = ({label,name,required=false,type='text',register,is_textarea=false}:Prop)=>{
    return (
        <div>
  <FormLabel>
              {label}:
              {
                !is_textarea?
                <FormDataComp
                  type={type}
                  {...register(name, { required })}
                />:
                <FormTextArea 
                {...register(name, { required })}
                />
              }
            </FormLabel>

        </div>
    )
}

export default InputWithLabel


type SelectWithInputProp = {
    register:any,
    name:string,
    required?:boolean,
    options:{name:string,value:string}[],
    label:string,
}
export const SelectWithInput = ({label,register,name,required=false,options}:SelectWithInputProp)=>{

    return (
        <div>
                  <FormLabel>
             {label}
              <FormSelection
                {...register(name, { required })}
              >
                <FormOption disabled value="">
                  select an option
                </FormOption>
                {
                    options.map((d,index)=>(
                        <FormOption value={d.value} key={index}>{d.name}</FormOption>
                    ))
                }
                {/* <FormOption value={'false'}>No</FormOption> */}
              </FormSelection>
            </FormLabel>
        </div>
    )
}