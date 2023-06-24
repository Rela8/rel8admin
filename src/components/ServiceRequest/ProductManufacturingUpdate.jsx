
import { useQuery } from "react-query"
import { getDeactivationOfMembership, getFactoryLocationUpdateAPi, getProductManufacturingUpdate,  } from "../../utils/api-calls.js"
import { FactoryLocationTable, ProductManufacturingUpdateTable } from "../ActionComponents/ActionComponents1"
import Loading from "../Loading/Loading"




export const FactoryLocationTableUpdate =()=>{
    const  {data,isLoading} = useQuery('factorylocation_update',getFactoryLocationUpdateAPi,{refetchOnWindowFocus: false,})

    return (
        <div>
<Loading loading={isLoading}/>
            <FactoryLocationTable data={data?data:[]} />
        </div>
    )
}


const ProductManufacturingUpdate = ()=>{
    const  {data,isLoading} = useQuery('manufacturing_update',getProductManufacturingUpdate,{refetchOnWindowFocus: false,})

    return (
        <div>
            <Loading loading={isLoading}/>
            {
                data?
                <ProductManufacturingUpdateTable data={data}/>
                :''
            }
        </div>
    )
}

export default ProductManufacturingUpdate