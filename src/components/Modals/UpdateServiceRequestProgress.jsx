import { BackDrop, FormDataComp, FormLabel, SubCon,Form,SubConHeader, SubConBtn, SubConBtnHold, FormSelection, FormOption } from "./AddMeeting";
import { toast } from "react-toastify";
import { useState } from "react";
import { SubConBtnInput } from "../ActionComponents/ViewMoreInfo";
import { useMutation, useQueryClient } from "react-query";
import { updateActivationOfDeactivatedMembersStatusapi, UpdateDeactivationOfMembershipApi, updateLossOFCertApi, updateProductManufacturingUpdateStatusApi } from "../../utils/api-calls";
import Loading from "../Loading/Loading";



const UpdateServiceRequestProgress = ({service_type,header,close,id,invalidate_query_string=''})=>{
  const queryClient = useQueryClient();
  const options = {
    onMutate: () => {
      toast.info("Update in progress", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
    onSuccess: () => {
      toast.success("Status Updated", {
        progressClassName: "toastProgress",
        icon: false,
      });
      queryClient.invalidateQueries(invalidate_query_string);
      close();
    },
    onError: (error) => {
      toast.error("Could not update status");
      if (error?.message?.response?.data?.message?.error) {
        toast.error(`Message: ${error.message.response.data.message.error}`, {
          autoClose: 9000,
        });
      }
    },
  }
    const [selected_status,setSelectedStatus] = useState(null)
    const {isLoading,mutate:ActivationOfDeactivatedMemberSubmit} = useMutation(updateActivationOfDeactivatedMembersStatusapi,options)
    const {isLoading:loading2,mutate:ProductManufacturingUpdateSubmit} = useMutation(updateProductManufacturingUpdateStatusApi,options)
    const {isLoading:loading3,mutate:DeactivationOfMembershipSubmit} = useMutation(UpdateDeactivationOfMembershipApi,options)
    const {isLoading:loading4,mutate:LossOFCertSubmit} = useMutation(updateLossOFCertApi,options)
    const onSubmit = ()=>{
        if(selected_status){
            
            if(service_type=='ActivationOfDeactivatedMember'){
                ActivationOfDeactivatedMemberSubmit({id,'status':selected_status})
            }
            else if(service_type=='ProductManufacturingUpdate'){
              ProductManufacturingUpdateSubmit({id,'status':selected_status})
            }
            else if(service_type=='DeactivationOfMembership'){
              DeactivationOfMembershipSubmit({id,'status':selected_status})

            }
            else if(service_type=='LossOFCert'){
              LossOFCertSubmit({id,'status':selected_status})

            }
            // 
            else{
                toast.info('Please pick status', {
                    progressClassName: "toastProgress",
                    icon: false,
                  })
            }

        }
    }
    // close();

    return (
        <BackDrop>
            <Loading loading={isLoading||loading2||loading3}/>
            <SubCon style={{'height':'unset'}}>
                    <SubConHeader>{header}</SubConHeader>

                    <FormLabel>
                    Select Status
                      <FormSelection
                     onChange={e=>setSelectedStatus(e.target.value)}
                      >
                            <FormOption disabled value="">
                    select an option
                  </FormOption>
                          <FormOption  value={'pending'} >
                            pending
                          </FormOption>
                          <FormOption  value={'in_review'} >
                          in review
                          </FormOption>

                          <FormOption  value={'approved'} >
                            approved
                          </FormOption>
                          <FormOption  value={'disapprove'} >
                            disapprove
                          </FormOption>
                      </FormSelection>
                    </FormLabel>
                    
                    <SubConBtnHold>
            <SubConBtn
            onClick={e=>{
                onSubmit()
            }}
              type={"submit"}
            //   disabled={createLoading}
              value="Submit"
              typex="filled"
            />
            <SubConBtn
              type={"submit"}
            //   disabled={createLoading}
              value="Cancel"
              onClick={close}
            />
          </SubConBtnHold>
            </SubCon>
        </BackDrop>
    )
}

export default UpdateServiceRequestProgress