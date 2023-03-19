import { useQuery } from "react-query"
import { getLossOfCert } from "../../utils/api-calls"
import { LossOFCertTable } from "../ActionComponents/ActionComponents1"
import Loading from "../Loading/Loading"



const LossOFCert = ()=>{

    const  {data,isLoading} = useQuery('LossOFCert',getLossOfCert,{refetchOnWindowFocus: false,})
    return (
        <div>
            <Loading loading={isLoading}/>
            {
                data?
                <LossOFCertTable data={data.results} />
                :''
            }
        </div>
    )
}
export default LossOFCert