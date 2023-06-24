
import { useQuery } from "react-query"
import { getDeactivationOfMembership, getLossOfCert } from "../../utils/api-calls.js"
import { DeactivationOfMembershipTable, LossOFCertTable } from "../ActionComponents/ActionComponents1"
import Loading from "../Loading/Loading"




const DeactivationOfMembership = ()=>{
    const  {data,isLoading} = useQuery('DeactivationOfMembership',getDeactivationOfMembership,{refetchOnWindowFocus: false,})


    return (
        <div>
            <Loading loading={isLoading}/>

            {
                data?
                <DeactivationOfMembershipTable data={data?data:[]}/>
                :''
            }   
        </div>
    )
}

export default DeactivationOfMembership