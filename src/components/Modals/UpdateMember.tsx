import React, { useEffect } from "react"
import InputWithLabel from "../InputWithLabel"
import { SubConBtn } from "../Buton"
import { useForm ,useFieldArray} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation, useQuery } from "react-query";
import { adminGetMemberInfo, updateMemberInfo } from "../../utils/api/member.api";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";



const schema = yup.object({
    user_info:yup.array().of(yup.object({
        name:yup.string().required(),
        value:yup.string().required(),
        id:yup.number().required(),
    }))
})
export type UpdateMemberInfoSchema = yup.InferType<typeof schema>

const UpdateMemberModal = ({memberid}:{memberid:string|number}):React.ReactElement=>{
    const { register, handleSubmit, setValue,control,formState: { errors } } = useForm<UpdateMemberInfoSchema>({
        resolver: yupResolver(schema)
      });

    const { fields, append, remove } = useFieldArray({
        name: "user_info",
        control,
      });
      const {mutate,isLoading} = useMutation(adminGetMemberInfo,{
        'onSuccess':(data)=>{
            console.log({'submitted':data})
            setValue('user_info',data)
        }
      })
      const { isLoading:updating,mutate:updateInfor} = useMutation(updateMemberInfo,{
        'onSuccess':(data)=>{
            //some toast like that
            toast.success('Updated')
        }
      })

      const onSubmit = (data: UpdateMemberInfoSchema)=>{
        console.log("wanna nsubmit",data)
        updateInfor({'memberId':memberid ,data})
      }

    useEffect(()=>{
        console.log({memberid})
        if(memberid){
            mutate({'memberId':memberid})
        }
    },[memberid])
    return (
        <form
        onSubmit={handleSubmit(onSubmit)}

        >
            <Loading  loading={isLoading ||updating}/>
            <div 
            style={{'display':'grid',
'gridTemplateColumns':'1fr 1fr',
            'gap':'10px','justifyContent':'space-between','alignItems':'center'}}
            >
{
                fields.map((field,index)=>(
                    <InputWithLabel 
                    label={field.name}
                    placeholder={field.name}
                    key={index}
                    register={register(`user_info.${index}.value`)}
                    />
                ))
            }
            </div>
            <SubConBtn
            style={{'width':'80%','margin':'10px auto','display':'block'}}
            typex='filled'
            >Submit Me</SubConBtn>
        </form>
    )
}

export default UpdateMemberModal