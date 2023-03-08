import axios, { AxiosError } from "axios"
import { privateRequest, URLnAME } from "./axios-utils"

//LOGIN
export const loginUser = async (user) => {
    try{
        const { shortName, ...payload } = user
        const loginURL = `https://${URLnAME}/tenant/${shortName}/tenant/auth/login/`
        const res = await axios.post(loginURL, payload)
        return res.data
    }catch(error){
        if(!error?.response) {
            throw new Error("No Server Response")
        }
        else if(error?.response.status === 400) {
            throw new Error("Invalid Credentials")
        }
        else if(error?.response.status === 401) {
            throw new Error("Unauthorized")
        }
        else {
            throw new Error("Login Failed")
        }
    }
}

//DASHBOARD
export const getAdminDashBoardDetails = async () => {
    try{
        const res = await privateRequest.get('/tenant/user/AdminRelatedViews/dashboard_info/')
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//DUES
export const getAllDues = async () => {
    try{
        const res = await privateRequest.get('/tenant/dues/AdminManageDue/')
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

export const createDues = async (dueData) => {
    try{
        const res = await privateRequest.post('/tenant/dues/AdminManageDue/', dueData)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

export const dueSummary = async () => {
    try{
        const res = await privateRequest.get('/tenant/dues/memberdue/get_due_detail/')
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//IS THIS THE SAME ONE I WILL USE TO DELETE MEMBERS OWING
export const deleteDue = async (dueID) => {
    try{
        const res = await privateRequest.delete(`/tenant/dues/AdminManageDue/${dueID}/`)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

export const getMemberDues = async () => {
    try{
        const res = await privateRequest.get('/tenant/dues/AdminManageDue/owning_members/')
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//EXCOS

//REMEMBER TO CHANGE THIS ENDPOINT TO THE GET ALL EXCOS ENDPOINT
export const getAllExcos = async () => {
    try{
        const res = await privateRequest.get('/tenant/user/memberlist-info/get_all_exco/')
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

export const getListOfExcos = async () => {
    try{
        const res = await privateRequest.get('/tenant/user/ManageAssigningExos/')
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//MEMBERS
export const getAllMembers = async () => {
    try{
        const res = await privateRequest.get('/tenant/user/memberlist-info/get_all_members/')
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//SETTINGS
export const UploadDataBase = async (file) => {
    try{
        const res = await privateRequest.post('/tenant/auth/upload_database/',file)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//EVENTS
export const getAllEvents = async () => {
    try{
        const res = await privateRequest.get('/tenant/event/eventview/') 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const deleteEvents = async (id) => {
    try{
        const res = await privateRequest.delete(`/tenant/event/eventview/${id}/`) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const createEvents = async (data) => {
    try{
        const res = await privateRequest.post('/tenant/event/eventview/',data) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const updateEvent = async (data) => {
    try{
        const res = await privateRequest.post('/tenant/event/eventview/activate_event/',data) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}


//NEWS
export const createNews = async (payload) => {
    try{
        const res = await privateRequest.post('/tenant/news/newsview/',payload) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const deleteNews = async (id) => {
    try{
        const res = await privateRequest.delete(`/tenant/news/newsview/${id}/`) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const getAllNews = async () => {
    try{
        const res = await privateRequest.get('/tenant/news/newsview/') 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//PUBLICATIONS
export const createPublication = async (payload) => {
    try{
        const res = await privateRequest.post('/tenant/publication/publicationview/',payload) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const deletePublication = async (id) => {
    try{
        const res = await privateRequest.delete(`/tenant/publication/publicationview/${id}`) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const getAllPublications = async () => {
    try{
        const res = await privateRequest.get('/tenant/publication/publicationview/') 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//GALLERY
export const getAllGalleries = async () => {
    try{
        const res = await privateRequest.get("/tenant/extras/admin_gallery_version2/") 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const createGallery = async (data) => {
    try{
        const res = await privateRequest.post("/tenant/extras/admin_gallery_version2/",data) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const deleteGallery = async (id) => {
    try{
        const res = await privateRequest.delete(`/tenant/extras/admin_gallery_version2/${id}/`) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const getSingleGallery = async (id) => {
    try{
        const res = await privateRequest.get(`/tenant/extras/admin_gallery_version2/${id}/`) 
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}


//COMMITTEE
export const getAllCommittee = async () => {
    try{
        const res = await privateRequest.get("/tenant/auth/manage-commitee-member/")
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const createCommittee = async (data) => {
    try{
        const res = await privateRequest.post("/tenant/auth/manage-commitee-member/", data)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const updateCommittee = async (payload) => {
    try{
        const [id, formData] = payload
        const res = await privateRequest.patch(`/tenant/auth/manage-commitee-member/${id}/`, formData)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const addMoreMembtoCommittee = async (data) => {
    try{
        const res = await privateRequest.post("/tenant/auth/manage-commitee-member/add_members/",data)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//CHAPTERS
export const getAllChapters = async () => {
    try{
        const res = await privateRequest.get("/tenant/auth/manage-chapter/")
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const createChapter = async (data) => {
    try{
        const res = await privateRequest.post("/tenant/auth/manage-chapter/", data)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const registerUserToChapter = async (data) => {
    try{
        const res = await privateRequest.post("/tenant/user/RegisterUserToChapter/",data)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//MEETINGS
export const createMeeting = async (data) => {
    try{
        const res = await privateRequest.post("/tenant/meeting/admin_manage_meeting/",data)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

export const getAllMeetings = async () => {
    try{
        const res = await privateRequest.get("/tenant/meeting/admin_manage_meeting/")
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

export const deleteMeeting = async (id) => {
    try{
        const res = await privateRequest.delete(`/tenant/meeting/admin_manage_meeting/${id}/`)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//ELECTIONS
export const createElection = async (data) => {
    try{
        const res = await privateRequest.post(`/tenant/election/adminmanageballotbox/`, data)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const createContestant = async (data) => {
    try{
        const res = await privateRequest.post(`/tenant/election/adminmanageballotbox/create_contestant/`, data)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const createPosition = async (data) => {
    try{
        const res = await privateRequest.post(`/tenant/election/postion_manager/`, data)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const deletePosition = async (id) => {
    try{
        const res = await privateRequest.delete(`/tenant/election/postion_manager/${id}/`)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
//returns a list of positions and all their elections
export const getAllPositions = async () => {
    try{
        const res = await privateRequest.get(`/tenant/election/postion_manager/`)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const getAllPositionsForElection = async (id) => {
    try{
        const res = await privateRequest.get("/tenant/election/postion_manager/get_postions", {params: {election_id: id}})
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const getContestantForPosition = async (id) => {
    try{
        const res = await privateRequest.get(`/tenant/election/adminmanageballotbox/list_of_contestant`, {params: {postion_id: id}})
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}
export const getAllElections = async () => {
    try{
        const res = await privateRequest.get("/tenant/election/adminmanageballotbox/list_of_elections/")
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }
}

//COUNCIL
export const getAllCouncils = async () => {
    try{
        const res = await privateRequest.get(`/tenant/user/ManageAssigningExos/`)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }   
}
export const getMemOfCouncil = async (id) => {
    try{
        const res = await privateRequest.post(`/tenant/user/council_members/${id}/`)
        return res.data
    }catch(e){
        throw new AxiosError(e)
    }   
}