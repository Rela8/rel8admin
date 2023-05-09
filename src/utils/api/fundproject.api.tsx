import { privateRequest } from "../axios-utils"



export const getIncashApi =async (id:number|string):Promise<any>=>{
    const res = await privateRequest.get(`/tenant/extras/admin_manage_project/get_intrested_members_for_supportincash/?pk=${id}`)
    return res.data.data
}



export const getInKindcApi =async (id:number|string):Promise<any>=>{
    const res = await privateRequest.get(`/tenant/extras/admin_manage_project/get_intrested_members_for_supportincash/?pk=${id}`)
    return res.data.data
}

