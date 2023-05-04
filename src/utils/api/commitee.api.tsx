import { privateRequest } from "../axios-utils"



export const getCommiteeMembers =async (commiteeid:number|string):Promise<any>=>{
    const res = await privateRequest.get(`/tenant/auth/manage-commitee-member/view_members_in_commitee/?pk=${commiteeid}`)
    return res.data.data
}