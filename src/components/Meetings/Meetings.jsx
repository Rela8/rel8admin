import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { SearchIcon } from "../../assets/SideBar/svgs";
import { getAllMeetings } from "../../utils/api-calls.js";
import { MeetingsTable } from "../ActionComponents/ActionComponents1";
import { EventsHeader, EventsList } from "../Events/Events.styles";
import Loading from "../Loading/Loading";
import {
  AddNewBtn,
  MembersSearch,
  MembersSearchBtn,
  MembersSearchCompCon,
  MembersSearchInput,
} from "../Members/Members.styles";
import AddMeeting from "../Modals/AddMeeting";
import Pagination from "../Pagination/Pagination";
import { MeetingsContainer } from "./Meetings.styles";

const Meetings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [addMeeting, setAddMeeting] = useState(false);
  const [addViewMoreModal, setAddViewMoreModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const displayAddMeeting = () => {
    setAddMeeting(!addMeeting);
  };

  const displayViewMoreModal = () => {
    setAddViewMoreModal(!addViewMoreModal);
  };

  const { isLoading, isError, isFetching, data } = useQuery(
    "all-meetings",
    getAllMeetings,
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );

  const searchHandler = () => {
    const searchPattern = new RegExp(searchValue, "i");
    const result = data?.filter((item) => item.name.search(searchPattern) >= 0);
    return result;
  };

  const searchResult = searchHandler();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const paginatedData = searchResult?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {addMeeting && <AddMeeting close={displayAddMeeting} />}
      <MeetingsContainer>
        <EventsHeader>Meetings</EventsHeader>

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

          <AddNewBtn onClick={displayAddMeeting}>Add New</AddNewBtn>
        </MembersSearch>

        <EventsList>
          {isLoading || isFetching ? (
            <Loading loading={isLoading || isFetching} />
          ) : !isError ? (
            <MeetingsTable
              deleteFn={displayViewMoreModal}
              data={paginatedData}
              show={addViewMoreModal}
            />
          ) : (
            <small>can't fetch committees</small>
          )}
        </EventsList>

        <Pagination
          totalPosts={data?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </MeetingsContainer>
    </>
  );
};

export default Meetings;
