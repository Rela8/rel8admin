import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { rel8Pink, rel8Purple, rel8White } from "../../globals";
import { mobile } from "../../responsive";
import { createGallery, updateProspecticememberStatusApi } from "../../utils/api-calls.js";
import { BackDrop, FormLabel, FormOption, FormSelection, SubCon } from "./AddMeeting";
import MoreButton from "../MoreButton";
import { DeleteButton } from "./AddNews";
import Loading from "../Loading/Loading";






const ViewProspectivememberModal  = ({ form_one,form_two, setClose,id })=>{
  const queryClient = useQueryClient();

    const {mutate,isLoading} = useMutation(updateProspecticememberStatusApi,{
        'onSuccess':()=>{
            queryClient.invalidateQueries("getProspectiveMemberSubmmsionApi");
            toast.success("Updated Successfully", {
                progressClassName: "toastProgress",
                icon: false,
              });
        }
    })
    return (
        <BackDrop>
   <SubCon>
        <p style={{
              'fontWeight': '700',
              'textAlign': 'center'
        }}>View Prospective Member details</p>
<br />
<Loading loading={isLoading}/>
        <div style={{}}>
            
            {
                form_one.map((d,index)=>(
                    <div key={index} style={{'padding':'.7rem'}}>
                        <p><strong>{d?.name}</strong>: {d?.value}</p>
                    </div>
                ))
            }
        </div>
        <br />
        {
            form_two?.map((data,index)=>(
                <div key={index} >
                <p><strong>Name of file{' '}</strong>:{data.name}</p>
                <a
                style={{'color':'purple','textAlign':'center','cursor':'pointer'}}
                onClick={e=>{
                    e.preventDefault()
                    window.open(data.file,'_blank')
                }}>view</a>
                </div>
            ))
        }

        <br />
        <FormLabel>
        Change member status
            <FormSelection name="" id="" onChange={e=>{
                console.log(e.target.value)
                if(window.confirm('Are you sure you want to change this status')){
                    mutate({
                        id,
                        'status':e.target.value
                    })
                }
            }}>
                <FormOption disabled value="">
                    select an option
                </FormOption>
                <FormOption  value="approval_in_progress">
                Approval in progress
                </FormOption>
                <FormOption  value="approval_in_principle_granted">
                Approval in principle granted
                </FormOption>
                <FormOption  value="final_approval">
                Final approval
                </FormOption>
            </FormSelection>
        </FormLabel>
        <div>

        </div>
        <br /><br /><br />
        <DeleteButton
            onClick={e=>{
                setClose(false)
            }}
        >
            Close
        </DeleteButton>
      </SubCon>

        </BackDrop>
    )
}

export default ViewProspectivememberModal