import { BackDrop, FormDataComp, FormLabel, SubCon,Form,SubConHeader, SubConBtn, SubConBtnHold, FormSelection, FormOption } from "./AddMeeting";
import { toast } from "react-toastify";
import { useState } from "react";
import { SubConBtnInput } from "../ActionComponents/ViewMoreInfo";
import { useMutation, useQueryClient } from "react-query";
import { updateActivationOfDeactivatedMembersStatusapi, updateChangeOfNameApi, UpdateDeactivationOfMembershipApi, updateFactoryLocationApi, updateLossOFCertApi, updateMergerOfCompaniesUpdateAPi, updateProductManufacturingUpdateStatusApi } from "../../utils/api-calls.js";
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
    const [note,setNote] = useState('a note to member')
    const {isLoading,mutate:ActivationOfDeactivatedMemberSubmit} = useMutation(updateActivationOfDeactivatedMembersStatusapi,options)
    const {isLoading:loading2,mutate:ProductManufacturingUpdateSubmit} = useMutation(updateProductManufacturingUpdateStatusApi,options)
    const {isLoading:loading3,mutate:DeactivationOfMembershipSubmit} = useMutation(UpdateDeactivationOfMembershipApi,options)
    const {isLoading:loading4,mutate:LossOFCertSubmit} = useMutation(updateLossOFCertApi,options)
    const {isLoading:loading5,mutate:changeOfNameSubmit} = useMutation(updateChangeOfNameApi,options)
    const {isLoading:loading6,mutate:factoryLocationApi} = useMutation(updateFactoryLocationApi,options)
    const {isLoading:loading7,mutate:MergerOfCompaniesApi} = useMutation(updateMergerOfCompaniesUpdateAPi,options)
    
    const onSubmit = ()=>{
        if(selected_status){
          const d ={'status':selected_status,'note':note,'member_id':id}
            
            if(service_type=='ActivationOfDeactivatedMember'){
                ActivationOfDeactivatedMemberSubmit({id,'status':selected_status})
            }
            else if(service_type=='ProductManufacturingUpdate'){
              ProductManufacturingUpdateSubmit(d)
            }
            else if(service_type=='DeactivationOfMembership'){
              DeactivationOfMembershipSubmit(d)

            }
            else if(service_type=='LossOFCert'){
              LossOFCertSubmit(d)

            }
            else if(service_type =='ChangeOfNameService'){
              changeOfNameSubmit(d)
            }
            else if(service_type === 'FactoryLocationUpdate'){
              factoryLocationApi(d)
            }
            else if(service_type == 'mergerofcompany'){
              MergerOfCompaniesApi(d)
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
            <Loading loading={isLoading||loading2||loading3||loading4||loading5}/>
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
                          <FormOption  value={'Pending'} >
                            pending
                          </FormOption>
                          <FormOption  value={'In Review'} >
                          in review
                          </FormOption>

                          <FormOption  value={'Approved'} >
                            approved
                          </FormOption>
                          <FormOption  value={'Disapprove'} >
                            disapprove
                          </FormOption>
                      </FormSelection>
                    </FormLabel>
                    <br />
                    <label htmlFor=""></label>
                    <textarea
                    value={note}
                    onChange={e=> setNote(e.target.value)}
                    ></textarea>
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