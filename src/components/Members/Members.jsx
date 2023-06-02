import React, { useEffect, useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { SearchIcon } from "../../assets/SideBar/svgs";
import { getAllMembers, uploadAndCreateMembers } from "../../utils/api-calls.js";
import { MemberDashTable } from "../ActionComponents/ActionComponents1";
import DeleteMember from "../DashBoard/DeleteMember";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import {
  MembersContainer,
  MembersPersonList,
  MembersPersons,
  MembersPersonTab,
  MembersSearch,
  MembersSearchBtn,
  MembersSearchCompCon,
  MembersSearchInput,
} from "./Members.styles";
import { exportExcelFile } from "../../utils/extrafunction";
import { DeleteButton } from "../Modals/AddNews";
import { StyledLabel, SubConBtn } from "../Buton";
import {HiDocumentDownload} from 'react-icons/hi'
import { toast } from "react-toastify";
// HiDocumentDownload
const Members = () => {
  const client = useQueryClient()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showModal, setModal] = useState(false);
  const [options, setOptions] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const displayModal = () => {
    setModal(!showModal);
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    "all-members",
    getAllMembers,
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );

  const {mutate,isLoading:uploaidng} = useMutation(uploadAndCreateMembers,{
    'onSuccess':()=>{
      client.invalidateQueries('all-members')
      toast.success("Member Created!", {
        progressClassName: "toastProgress",
        icon: false,
      });
      
    },
    'onError':(err)=>{
      // if(err)
      console.log(err)
      try{
        
        toast.error(err.response.data.message.error, {
          progressClassName: "toastProgress",
          icon: false,
        });
      }
      catch(err){
        toast.success("Please check your network", {
          progressClassName: "toastProgress",
          icon: false,
        });
      }
    }
  })
  const searchHandler = () => {
    const searchPattern = new RegExp(searchValue, "i");
    const result = data?.filter(
      (item) => item.email.search(searchPattern) >= 0
    );
    return result;
  };

  const searchResult = searchHandler();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const paginatedData = searchResult?.slice(firstPostIndex, lastPostIndex);

  const generateExcel = ()=>{
    let clean_data =data?.map((d,index)=>{
      let newdata= []
      newdata.push({title:'S/N',value:index+1,})
      newdata.push({title:'Company Name',value:d.full_name,})
      newdata.push({title: 'Amount Owing',value:d.amount_owing,})
      newdata.push({ title:'Sector',value:d.member_info.find(b=>b.name==='SECTOR')?.value,})
      newdata.push({title: 'Sub Sector',value:d.member_info.find(b=>b.name==='SUB-SECTOR')?.value,})
      newdata.push({title:'MembershipID',value:d.member_info.find(b=>b.name==='MEMBERSHIP_NO')?.value,})
      return newdata
  })
  exportExcelFile({
    'headers':['S/N	','Company Name',
    'Amount Owing','Sector','Sub Sector',
    'MembershipID'],
    'rows':clean_data
    })
  }
  return (
    <>
      {showModal && <DeleteMember close={displayModal} />}
    <Loading loading={uploaidng} />
      <MembersContainer>
        <MembersPersonTab typex="dues">
          <MembersPersons
            typex="dues"
            filled={options === "all" ? "show" : ""}
            onClick={() => setOptions("all")}
          >
            All Members
          </MembersPersons>
        </MembersPersonTab>

        <MembersSearch>
          <MembersSearchCompCon>
            <MembersSearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
            />
            <MembersSearchBtn onClick={searchHandler}>
              <SearchIcon style={{ width: "15px", height: "15x" }} />
            </MembersSearchBtn>
          </MembersSearchCompCon>
        </MembersSearch>
        {
          isLoading===false?
        <SubConBtn
            style={{
              // 'width':'80%','margin':'10px auto','display':'block'
            }}
            typex='filled'
            onClick={e=>{
              generateExcel()
            }}
            >Download Data
            <HiDocumentDownload style={{'color':'white','margin':'2px 0'}}/>
            </SubConBtn>:''
        }
        
        <input type="file" id="upload-new-users"
        onChange={e=>{
          console.log(e.target.files[0])
          mutate(e.target.files[0])
        }} 
        style={{'display':'none'}}
        />
        <StyledLabel
        htmlFor='upload-new-users'
        style={{'display':'inline-block','margin':'0 30px'}}          
            onClick={e=>{
            }}
            >Create Member
            {/* <HiDocumentDownload style={{'color':'white','margin':'2px 0'}}/> */}
            </StyledLabel>
        <MembersPersonList>
          {searchResult?.length <= 0 ? (
            isLoading || isFetching ? (
              <Loading loading={isLoading || isFetching} />
            ) : !isError ? (
              <MemberDashTable
                show={showModal}
                deleteFn={displayModal}
                data={paginatedData}
              />
            ) : (
              <small>can't fetch members</small>
            )
          ) : isLoading ||uploaidng|| isFetching ? (
            <Loading loading={isLoading || uploaidng||isFetching} />
          ) : !isError ? (
            <MemberDashTable
              show={showModal}
              deleteFn={displayModal}
              data={searchResult}
            />
          ) : (
            <small>can't fetch members</small>
          )}
        </MembersPersonList>

        <Pagination
          totalPosts={data?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </MembersContainer>
    </>
  );
};

export default Members;
