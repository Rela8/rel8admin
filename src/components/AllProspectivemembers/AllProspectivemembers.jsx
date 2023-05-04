import React from "react"
import { ViewAllProspectiveMembersTable } from "../ActionComponents/ActionComponents1"
import { GalleryContainer } from "../Gallery/Gallery.styles"
import { useQuery } from "react-query"
import { getProspectiveMemberSubmmsionApi } from "../../utils/api-calls.js"


const AllProspectivemembers = ()=>{
    const { isLoading,data}= useQuery('getProspectiveMemberSubmmsionApi',getProspectiveMemberSubmmsionApi,{
        refetchOnWindowFocus:false
    })
    console.log({data})
    return (
        <GalleryContainer>
            <ViewAllProspectiveMembersTable data={data} close={false}/>
        </GalleryContainer>
    )
}

export default AllProspectivemembers