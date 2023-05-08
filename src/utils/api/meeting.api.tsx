import { privateRequest } from "../axios-utils"




export const get_meeting_attendiesapi = async ({meeting_id}:{meeting_id:string}):Promise<any>=>{
    const form = new FormData()
    form.append('meeting_id',meeting_id)
    const res = await privateRequest.post(`/tenant/meeting/admin_manage_meeting/get_register_members/`,form)
    return res.data.data
}