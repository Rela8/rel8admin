import { useQuery } from "react-query"
import { getLossOfCert } from "../../utils/api-calls.js"
import { LossOFCertTable } from "../ActionComponents/ActionComponents1"
import Loading from "../Loading/Loading"



const LossOFCert = ()=>{

    const  {data,isLoading} = useQuery('LossOFCert',getLossOfCert,{refetchOnWindowFocus: false,})
    return (
        <div>
            <Loading loading={isLoading}/>
            {
                data?
                <LossOFCertTable data={data?data:[ ]} />
                :''
            }
        </div>
    )
}
export default LossOFCert