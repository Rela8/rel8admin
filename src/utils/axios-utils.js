import axios from "axios";

export const adminDetails = JSON.parse( localStorage.getItem("admin-user"))?.state?.user

const TOKEN = adminDetails?.token

let SHORT_NAME = localStorage.getItem("shortName")

if(SHORT_NAME){
    SHORT_NAME=JSON.parse(SHORT_NAME)
}

export const URLnAME = 'rel8.watchdoglogisticsng.com'
export const BASE_URL = `https://rel8.watchdoglogisticsng.com/tenant/${SHORT_NAME}/`

export const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers: {Authorization: `Token ${TOKEN}`}
})