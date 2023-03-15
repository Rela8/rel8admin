
import { useQuery } from "react-query"
import { getDeactivationOfMembership, getProductManufacturingUpdate,  } from "../../utils/api-calls"
import { ProductManufacturingUpdateTable } from "../ActionComponents/ActionComponents1"
import Loading from "../Loading/Loading"







const ProductManufacturingUpdate = ()=>{
    const  {data,isLoading} = useQuery('manufacturing_update',getProductManufacturingUpdate,{refetchOnWindowFocus: false,})

    return (
        <div>
            <Loading loading={isLoading}/>
            {
                data?
                <ProductManufacturingUpdateTable data={data.results}/>
                :''
            }
        </div>
    )
}

export default ProductManufacturingUpdate