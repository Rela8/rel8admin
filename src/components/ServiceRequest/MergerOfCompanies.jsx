import { useQuery } from "react-query"
import Loading from "../Loading/Loading"
import { getFactoryLocationUpdateAPi, getMergerOfCompaniesUpdateAPi } from "../../utils/api-calls"
import { MergerOfCompaniesTable } from "../ActionComponents/ActionComponents1"





const MergerOfCompanies =()=>{
    const  {data,isLoading} = useQuery('mergercompaines_update',getMergerOfCompaniesUpdateAPi,{refetchOnWindowFocus: false,})

    return <div>
<Loading loading={isLoading}/>
        <MergerOfCompaniesTable  data={data?data:[]}/>
    </div>
}

export default MergerOfCompanies