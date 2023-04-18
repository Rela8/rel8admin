import React from "react"
import { GalleryHeader } from "../Gallery/Gallery.styles"
import { GalleryContainer } from "../Gallery/Gallery.styles"
import { Form, FormDataComp, FormLabel } from "../Modals/AddMeeting"
import { SubConBtn } from "../Modals/AddMeeting"
import { DashBoardRightDueButton } from "../DashBoard/DashBoard.styles"
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { DeleteButton } from "../Modals/AddNews"
import { useMutation, useQuery } from "react-query"
import { getProspectivememberRuleApi, setPropectiveMemberRuleApi } from "../../utils/api-calls"
import Loading from "../Loading/Loading"
import { toast } from "react-toastify";
import { useEffect } from "react"

// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import {AiTwotoneDelete} from 'react-icons/ai'

const SetProspectiveMembersRules = ()=>{

    const {data,isLoading}= useQuery('getProspectivememberRule',getProspectivememberRuleApi,{
        refetchOnWindowFocus:false
    })
    const {isLoading:loading,mutate} = useMutation(setPropectiveMemberRuleApi,{
        'onSuccess':()=>{
            toast.success("Success", {
                progressClassName: "toastProgress",
                icon: false,
              });
        }
    })
    const { register, handleSubmit, control, reset,formState: { errors } } = useForm({
        defaultValues:{
            text_fields:[],
            file_fields:[],
            amount:0.00,
        }
    });
    const { fields, append, remove } = useFieldArray({
        'name':'text_fields',control
      })
      const { fields:fileFields, append:appendFields, remove:removeFileFields } = useFieldArray({
        'name':'file_fields',control
      })

      const onSubmit = (data) =>{
        console.log(data)
        const submitData ={
            "propective_members_text_fields":{"text_fields":data.text_fields},
            "propective_members_file_fields":{"file_fields":data.file_fields},
            'amount':data.amount
        }
        console.log(submitData)
        mutate(submitData)
      }


      useEffect(()=>{
        if(data){
            reset({
                'amount':data.amount,
                'text_fields':data.propective_members_text_fields?data.propective_members_text_fields.text_fields:[],
                'file_fields':data.propective_members_file_fields?data.propective_members_file_fields.file_fields:[],
            })
        }
      },[data])

    return (
        <GalleryContainer>
        <GalleryHeader>Form creation for prospective memeber</GalleryHeader>
        <Loading loading={isLoading||loading}/>
        
        <br />
        <Form 
        onSubmit={handleSubmit(onSubmit)}
         style={{'maxWidth':'500px','fontSize':'2rem','margin':'0 auto'}}>
        <FormLabel>
              Amount:
              <FormDataComp
                type={"text"}
                {...register("amount", { required: true })}
              />
              <small>{errors.amount?.message}</small>
            </FormLabel>
            

            <FormLabel>
            Propective Members Text Fields:
             
                {fields.map((field,index)=>(
                    <div style={{'margin':'.5rem 0'}} key={index}>
                         <FormDataComp

                     type={"text"}
                     {...register(`text_fields.${index}`, { required: true })}
                   />
                   <DeleteButton
                    typex="filled"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </DeleteButton>
                    </div>
                )) }
                    <DashBoardRightDueButton onClick={e=>{
                        e.preventDefault()
                        append('First Name')
                    }}>
                        Add More 
                    </DashBoardRightDueButton>
            </FormLabel>

            <FormLabel>
            propective Members File Fields:
             {
               fileFields.map((field,index)=>(
                    <div style={{'margin':'.5rem 0'}}>
                        <FormDataComp
                    type={"text"}
                    {...register(`file_fields.${index}`, { required: true })}
                  />
                  <DeleteButton
                    typex="filled"
                    type="button"
                    onClick={() => removeFileFields(index)}
                  >
                    Delete
                  </DeleteButton>
                    </div>
                ))
             }
            <DashBoardRightDueButton
            onClick={e=>{
                e.preventDefault()
                appendFields('Date Of Birth')
            }}
            >
                Add More 
            </DashBoardRightDueButton>

            </FormLabel>
            <br></br>

            <br></br>
            <SubConBtn
                    type={"submit"}
                    value="Save"
                typex="filled"

                  />
        </Form>
        </GalleryContainer>
    )
}


export default SetProspectiveMembersRules