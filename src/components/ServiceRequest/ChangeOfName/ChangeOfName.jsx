import { useQuery } from "react-query"
import { getChangeOfName } from "../../../utils/api-calls"
import { ChangeOfNameServiceTable } from "../../ActionComponents/ActionComponents1"
import Loading from "../../Loading/Loading"





const ChangeOfName = ()=>{
    const  {data,isLoading} = useQuery('changeOfName',getChangeOfName,{refetchOnWindowFocus: false,})
   

    return (
        <div>
            <Loading loading={isLoading}/>
            {
                data?
             <ChangeOfNameServiceTable data={data.results}/> :''
            }
        </div>
    )
}

export default ChangeOfName