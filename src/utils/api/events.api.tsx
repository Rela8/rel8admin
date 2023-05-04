import axios, { AxiosError } from "axios"
import { privateRequest, URLnAME } from "../axios-utils"



export const getEventAttendies = async(data:{event_id:number} ):Promise<any>=>{
    const form = new FormData()
    form.append('event_id',data.event_id.toString())
    const res = await privateRequest.post(`/tenant/event/eventview/list_of_register_members/`,form)
    return res.data.data
}