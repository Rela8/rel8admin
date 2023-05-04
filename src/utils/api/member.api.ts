import axios, { AxiosError } from "axios"
import { privateRequest, URLnAME } from "../axios-utils"
import { UpdateMemberInfoSchema } from "../../components/Modals/UpdateMember"


// Admin Handles Member 
export const adminGetMemberInfo = async({memberId}:{memberId:number|string} ):Promise<UpdateMemberInfoSchema['user_info']>=>{
    const res = await privateRequest.get(`/tenant/user/admin-update-member-info/?member_id=${memberId}`)
    return res.data.results
}


export const updateMemberInfo = async({memberId,data}:{memberId:number|string,data:UpdateMemberInfoSchema} ):Promise<any>=>{
    const res = await privateRequest.put(`/tenant/user/admin-update-member-info/1/?member_id=${memberId}`,data)
    return res.data
}