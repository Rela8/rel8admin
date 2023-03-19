import { EventsHeader, EventsList } from "../Events/Events.styles"
import { MeetingsContainer } from "../Meetings/Meetings.styles"
import React, { useState } from "react"
import { deleteFundProjectApi, getFundAProjects } from "../../utils/api-calls"
import { useQuery } from "react-query"
import Loading from "../Loading/Loading"
import { FundAProjectTable } from "../ActionComponents/ActionComponents1"
import { AddNewBtn, MembersSearch, MembersSearchBtn, MembersSearchCompCon, MembersSearchInput } from "../Members/Members.styles"
import { SearchIcon } from "../../assets/SideBar/svgs"
import AddFundAProject from "../Modals/AddFundAProject"
import AddFundAProjectForm from "../Modals/AddFundAProject"
import { useMutation, useQueryClient } from "react-query";

import { toast } from "react-toastify";



const FundAProject = ()=>{
    const [searchValue, setSearchValue] = useState("");
    const [addMeeting, setAddMeeting] = useState(false);
    const [addViewMoreModal, setAddViewMoreModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

  const   queryClient = useQueryClient();
    const displayAddMeeting = () => {
        setAddMeeting(!addMeeting);
      };
    
      const displayViewMoreModal = (id) => {
       console.log('me')
      //  deleteFundProjectApi
      mutate(id)
      };


    const { isLoading, isError, isFetching, data } = useQuery(
        "all-fundprojects",
        getFundAProjects,
        {
          refetchOnWindowFocus: false,
        //   select: (data) => data.data,
        }
      );

      const { isLoading: createLoading, mutate } = useMutation(deleteFundProjectApi, {
        onMutate: () => {
          toast.info("Project Delete in progress", {
            progressClassName: "toastProgress",
            icon: false,
          });
        },
        onSuccess: () => {
          toast.success("Deleted", {
            progressClassName: "toastProgress",
            icon: false,
          });
          queryClient.invalidateQueries("all-fundprojects");
        },
        onError: (error) => {
          toast.error("Could not create meeting");
          if (error?.message?.response?.data?.message?.error) {
            toast.error(`Message: ${error.message.response.data.message.error}`, {
              autoClose: 9000,
            });
          }
        },
      });
    return (

      <div>
      {addMeeting && <AddFundAProjectForm close={displayAddMeeting} />}

          <MeetingsContainer>
            <EventsHeader>Fund A Project</EventsHeader>
            <MembersSearch>
          <MembersSearchCompCon>
            <MembersSearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
            />
            <MembersSearchBtn>
              <SearchIcon style={{ width: "15px", height: "15x" }} />
            </MembersSearchBtn>
          </MembersSearchCompCon>

          <AddNewBtn onClick={displayAddMeeting}>Add New Project</AddNewBtn>
        </MembersSearch>

            <EventsList>
           
            {isLoading || isFetching ? (
            <Loading loading={isLoading || isFetching} />
          ) : !isError ? (
            <FundAProjectTable
              deleteFn={displayViewMoreModal}
              data={data.results}
              show={addViewMoreModal}
            />
          ) : (
            <small>can't fetch committees</small>
          )}


            </EventsList>
        </MeetingsContainer>
      </div>
    )
}

export default FundAProject