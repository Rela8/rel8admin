import React from "react"
import { useQuery } from "react-query"
import { getActivationOfDeactivatedMember, getDeactivationOfMembership, getLossOfCert } from "../../utils/api-calls"
import { ActivationOfDeactivatedMemberTable, } from "../ActionComponents/ActionComponents1"
import Loading from "../Loading/Loading"




const ActivationOfDeactivatedMember = ()=>{
    const  {data,isLoading} = useQuery('activate_deactivated_members',getActivationOfDeactivatedMember,{refetchOnWindowFocus: false,})

    return (
        <div>
   <Loading loading={isLoading}/>

{
    data?
    <ActivationOfDeactivatedMemberTable data={data.results}/>
    :''
}   
        </div>
    )
}

export default ActivationOfDeactivatedMember