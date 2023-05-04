
import axios, { AxiosError } from "axios"
import { privateRequest, URLnAME } from "../axios-utils"




export const deleteSingleGalleryImage = async(id:number):Promise<any>=>{
    const form =new FormData()
    form.append('id',id.toString())
    const res = await privateRequest.post(`/tenant/extras/admin_gallery_version2/delete_single_image/`,form)
    return res.data
}

export const addMoreImages =async (form:any)=>{
    const res = await privateRequest.post(`/tenant/extras/admin_gallery_version2/1/add_more_to_gallery/`,form)
    return res.data
}