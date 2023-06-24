import axios, { AxiosError } from "axios";
import { privateRequest, URLnAME } from "./axios-utils";

//LOGIN
export const loginUser = async (user) => {
  try {
    const { shortName, ...payload } = user;
    // const loginURL = `https://${URLnAME}/tenant/${shortName}/tenant/auth/login/`;
    const loginURL = `http://${URLnAME}/tenant/${shortName}/tenant/auth/login/`
    const res = await axios.post(loginURL, payload);
    return res.data;
  } catch (error) {
    if (!error?.response) {
      throw new Error("No Server Response");
    } else if (error?.response.status === 400) {
      throw new Error("Invalid Credentials");
    } else if (error?.response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Login Failed");
    }
  }
};

//DASHBOARD
export const getAdminDashBoardDetails = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/user/AdminRelatedViews/dashboard_info/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//DUES
export const getAllDues = async () => {
  try {
    const res = await privateRequest.get("/tenant/dues/AdminManageDue/");
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const createDues = async (dueData) => {
  try {
    const res = await privateRequest.post(
      "/tenant/dues/AdminManageDue/",
      dueData
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const createGeneralDueApi = async (dueData) => {
  const res = await privateRequest.post(
    "/tenant/dues/AdminManageDue/create_general_due/",
    dueData
  );
  return res.data;
};

export const createExcoDueApi = async (dueData) => {
  const res = await privateRequest.post(
    "/tenant/dues/AdminManageDue/create_exco_due/",
    dueData
  );
  return res.data.data;
};

export const createMembershipGradeDueApi = async (dueData) => {
  const res = await privateRequest.post(
    "/tenant/dues/AdminManageDue/create_membership_grade_due/",
    dueData
  );
  return res.data;
};

export const get_membershipgrades = async () => {
  const res = await privateRequest.get("/tenant/user/get_membershipgrade/");
  return res.data.data;
};

export const dueSummary = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/dues/memberdue/get_due_detail/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//IS THIS THE SAME ONE I WILL USE TO DELETE MEMBERS OWING
export const deleteDue = async (dueID) => {
  try {
    const res = await privateRequest.delete(
      `/tenant/dues/AdminManageDue/${dueID}/`
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const getMemberDues = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/dues/AdminManageDue/owning_members/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//EXCOS

//REMEMBER TO CHANGE THIS ENDPOINT TO THE GET ALL EXCOS ENDPOINT
export const getAllExcos = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/user/memberlist-info/get_all_exco/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const getListOfExcos = async () => {
  try {
    const res = await privateRequest.get("/tenant/user/ManageAssigningExos/");
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//MEMBERS
export const getAllMembers = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/user/memberlist-info/get_all_members/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const uploadAndCreateMembers = async (file)=>{
  const form = new FormData()
  form.append('file',file)
  const res = await privateRequest.patch(
    "/tenant/auth/upload_database/",form
  );
  return res.data;
}
//SETTINGS
export const UploadDataBase = async (file) => {
  try {
    const res = await privateRequest.post(
      "/tenant/auth/upload_database/",
      file
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//EVENTS
export const getAllEvents = async () => {
  try {
    const res = await privateRequest.get("/tenant/event/eventview/");
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const deleteEvents = async (id) => {
  try {
    const res = await privateRequest.delete(`/tenant/event/eventview/${id}/`);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const createEvents = async (data) => {
  try {
    const res = await privateRequest.post("/tenant/event/eventview/", data);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const updateEvent = async (data) => {
  try {
    const res = await privateRequest.post(
      "/tenant/event/eventview/activate_event/",
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//NEWS
export const createNews = async (payload) => {
  try {
    const res = await privateRequest.post("/tenant/news/newsview/", payload);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const deleteNews = async (id) => {
  try {
    const res = await privateRequest.delete(`/tenant/news/newsview/${id}/`);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getAllNews = async () => {
  try {
    const res = await privateRequest.get("/tenant/news/newsview/");
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//PUBLICATIONS
export const createPublication = async (payload) => {
  try {
    const res = await privateRequest.post(
      "/tenant/publication/publicationview/",
      payload
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const deletePublication = async (id) => {
  try {
    const res = await privateRequest.delete(
      `/tenant/publication/publicationview/${id}`
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getAllPublications = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/publication/publicationview/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//GALLERY
export const getAllGalleries = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/extras/admin_gallery_version2/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const createGallery = async (data) => {
  try {
    const res = await privateRequest.post(
      "/tenant/extras/admin_gallery_version2/",
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const deleteGallery = async (id) => {
  try {
    const res = await privateRequest.delete(
      `/tenant/extras/admin_gallery_version2/${id}/`
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getSingleGallery = async (id) => {
  try {
    const res = await privateRequest.get(
      `/tenant/extras/admin_gallery_version2/${id}/`
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//COMMITTEE
export const getAllCommittee = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/auth/manage-commitee-member/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const createCommittee = async (data) => {
  try {
    const res = await privateRequest.post(
      "/tenant/auth/manage-commitee-member/",
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const updateCommittee = async (payload) => {
  try {
    const [id, formData] = payload;
    const res = await privateRequest.patch(
      `/tenant/auth/manage-commitee-member/${id}/`,
      formData
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const addMoreMembtoCommittee = async (data) => {
  try {
    const res = await privateRequest.post(
      "/tenant/auth/manage-commitee-member/add_members/",
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//CHAPTERS
export const getAllChapters = async () => {
  try {
    const res = await privateRequest.get("/tenant/auth/manage-chapter/");
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const createChapter = async (data) => {
  try {
    const res = await privateRequest.post("/tenant/auth/manage-chapter/", data);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const registerUserToChapter = async (data) => {
  try {
    const res = await privateRequest.post(
      "/tenant/user/RegisterUserToChapter/",
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//MEETINGS
export const createMeeting = async (data) => {
  const form = new FormData();
  form.append("name", data.name);
  form.append("details", data.details);
  form.append("organiserName", data.organiserName);
  form.append("organiserDetails", data.organiserDetails);
  if (data.exo) {
    form.append("exco", data.exco);
  }
  if (data.chapter) {
    form.append("chapter", data.chapter);
  }
  if (data.commitee) {
    form.append("commitee", data.commitee);
  }
  form.append("date_for", data.date_for);
  form.append("event_date", data.event_date);
  form.append("addresse", data.addresse);
  form.append("meeting_docs", data.meeting_docs[0]);
  try {
    const res = await privateRequest.post(
      "/tenant/meeting/admin_manage_meeting/",
      form
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const updateMeetingApi = async (data) => {
  const form = new FormData();
  if (data?.name) {
    form.append("name", data.name);
  }
  form.append("details", data.details);
  form.append("organiserName", data.organiserName);
  form.append("organiserDetails", data.organiserDetails);
  if (data?.exco) {
    form.append("exco", data.exco);
  }
  if (data?.chapter) {
    form.append("chapter", data.chapter);
  }
  if (data?.commitee) {
    form.append("commitee", data.commitee);
  }
  if (data?.date_for) {
    form.append("date_for", data.date_for);
  }
  if (data?.event_date) {
    form.append("event_date", data.event_date);
  }
  if (data?.addresse) {
    form.append("addresse", data.addresse);
  }
  if (data?.meeting_docs) {
    form.append("meeting_docs", data.meeting_docs[0]);
  }
  try {
    const res = await privateRequest.patch(
      "/tenant/meeting/admin_manage_meeting/" + data.id + "/",
      form
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const createFundProjectApi = async (data) => {
  try {
    const res = await privateRequest.post(
      "/tenant/extras/admin_manage_project/",
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const deleteFundProjectApi = async (id) => {
  try {
    const res = await privateRequest.delete(
      "/tenant/extras/admin_manage_project/" + id + "/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getFundAProjects = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/extras/admin_manage_project/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getAllMeetings = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/meeting/admin_manage_meeting/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const deleteMeeting = async (id) => {
  try {
    const res = await privateRequest.delete(
      `/tenant/meeting/admin_manage_meeting/${id}/`
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//ELECTIONS
export const createElection = async (data) => {
  try {
    const res = await privateRequest.post(
      `/tenant/election/adminmanageballotbox/`,
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const createContestant = async (data) => {
  try {
    const res = await privateRequest.post(
      `/tenant/election/adminmanageballotbox/create_contestant/`,
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const createPosition = async (data) => {
  try {
    const res = await privateRequest.post(
      `/tenant/election/postion_manager/`,
      data
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const deletePosition = async (id) => {
  try {
    const res = await privateRequest.delete(
      `/tenant/election/postion_manager/${id}/`
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
//returns a list of positions and all their elections
export const getAllPositions = async () => {
  try {
    const res = await privateRequest.get(`/tenant/election/postion_manager/`);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getAllPositionsForElection = async (id) => {
  try {
    const res = await privateRequest.get(
      "/tenant/election/postion_manager/get_postions",
      { params: { election_id: id } }
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getContestantForPosition = async (id) => {
  try {
    const res = await privateRequest.get(
      `/tenant/election/adminmanageballotbox/list_of_contestant`,
      { params: { postion_id: id } }
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getAllElections = async () => {
  try {
    const res = await privateRequest.get(
      "/tenant/election/adminmanageballotbox/list_of_elections/"
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

//COUNCIL
export const getAllCouncils = async () => {
  try {
    const res = await privateRequest.get(`/tenant/user/ManageAssigningExos/`);
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getMemOfCouncil = async (id) => {
  try {
    const res = await privateRequest.post(
      `/tenant/user/council_members/${id}/`
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const getChangeOfName = async () => {
  try {
    const res = await privateRequest.get(
      `/tenant/membershipservice/change-of-name/1/admin_get/`
    );
    return res.data.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getLossOfCert = async () => {
  try {
    const res = await privateRequest.get(
      `/tenant/membershipservice/loss-of-cert/1/admin_get/`
    );
    return res.data.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const getDeactivationOfMembership = async () => {
  try {
    const res = await privateRequest.get(
      `/tenant/membershipservice/deactivation-activation-service/1/admin_get/`
    );
    return res.data.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const getProductManufacturingUpdate = async () => {
  try {
    const res = await privateRequest.get(
      `/tenant/membershipservice/update-product-manufactured/1/admin_get/`
    );
    return res.data.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const getFactoryLocationUpdateAPi = async ()=>{
  try {
    const res = await privateRequest.get(
      `/tenant/membershipservice/update-factory-location/1/admin_get/`
    );
    return res.data.data;
  } catch (e) {
    throw new AxiosError(e);
  }
}

export const getMergerOfCompaniesUpdateAPi = async ()=>{
  try {
    const res = await privateRequest.get(
      `/tenant/membershipservice/merger-of-company/1/admin_get/`
    );
    return res.data.data;
  } catch (e) {
    throw new AxiosError(e);
  }
}

export const getActivationOfDeactivatedMember = async () => {
  try {
    const res = await privateRequest.get(
      `/tenant/services_request/admin_activation_of_deactivated_member/`
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const updateActivationOfDeactivatedMembersStatusapi = async ({
  id,
  status,
}) => {
  try {
    const res = await privateRequest.post(
      `/tenant/services_request/admin_activation_of_deactivated_member/update_status/`,
      { id, status }
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const updateProductManufacturingUpdateStatusApi = async ({
  note,
  status,
  member_id
}) => {
  try {
    const form = new FormData()
    form.append('status',status)
    form.append('note',note)
    const res = await privateRequest.post(
      `/tenant/membershipservice/update-product-manufactured/${member_id}/admin_update/`,
      form
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const UpdateDeactivationOfMembershipApi = async ({note, status,member_id }) => {
  try {
    const form = new FormData()
    form.append('status',status)
    form.append('note',note)
    const res = await privateRequest.post(
      `/tenant/membershipservice/deactivation-activation-service/${member_id}/admin_update/`,
      form
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const updateLossOFCertApi = async ({ member_id, status,note='' }) => {
  try {
    const form = new FormData()
    form.append('status',status)
    form.append('note',note)
    const res = await privateRequest.post(
      `tenant/membershipservice/loss-of-cert/${member_id}/admin_update/`,
    form
    );
    return res.data.data 
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const updateChangeOfNameApi = async ({ member_id, status ,note='a note to member'}) => {
  try {
    const form = new FormData()
    form.append('status',status)
    form.append('note',note)
    const res = await privateRequest.post(
      `/tenant/membershipservice/change-of-name/${member_id}/admin_update/`,
      form
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

export const updateFactoryLocationApi = async ({ member_id, status ,note='a note to member'}) => {
  try {
    const form = new FormData()
    form.append('status',status)
    form.append('note',note)
    const res = await privateRequest.post(
      `/tenant/membershipservice/update-factory-location/${member_id}/admin_update/`,
      form
    );
    return res.data;
  } catch (e) {
    throw new AxiosError(e);
  }
};
export const updateMergerOfCompaniesUpdateAPi = async ({ member_id, status ,note='a note to member'})=>{
  try {
    const form = new FormData()
    form.append('status',status)
    form.append('note',note)
    const res = await privateRequest.post(
      `/tenant/membershipservice/merger-of-company/${member_id}/admin_update/`,form
    );
    return res.data.data;
  } catch (e) {
    throw new AxiosError(e);
  }
}


export const getProspectivememberRuleApi = async () => {
  const resp = await privateRequest.get(
    "/tenant/prospectivemember/adminManage_prospective_rule/"
  );
  return resp.data.data;
};

export const setPropectiveMemberRuleApi = async (data) => {
  const resp = await privateRequest.post(
    "/tenant/prospectivemember/adminManage_prospective_rule/",
    data
  );
  return resp.data.data;
};
export const getProspectiveMemberSubmmsionApi = async () => {
  const resp = await privateRequest.get(
    "/tenant/prospectivemember/adminManage_prospective_rule/get_submissions/"
  );
  return resp.data.data;
};

export const updateProspecticememberStatusApi = async (data) => {
  const resp = await privateRequest.post(
    "/tenant/prospectivemember/adminManage_prospective_rule/update_prospective_member_status/",
    data
  );
  return resp.data;
};

export const updateGalleryImageApi = async ({
  id,
  image = null,
  caption = null,
}) => {
  const form = new FormData();
  form.append("id", JSON.stringify(id));
  if (image) {
    form.append("image", image);
  }
  if (caption) {
    form.append("caption", caption);
  }
  const resp = await privateRequest.post(
    "/tenant/extras/admin_gallery_version2/update_gallery_image/",
    form
  );
  return resp.data;
};

export const updateGalleryTitleApi = async ({ id, name }) => {
  const resp = await privateRequest.put(
    `/tenant/extras/admin_gallery_version2/${id}/`,
    { name }
  );
  return resp.data;
};
