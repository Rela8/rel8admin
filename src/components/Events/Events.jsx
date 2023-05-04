import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SearchIcon } from "../../assets/SideBar/svgs";
import { getAllEvents } from "../../utils/api-calls.js";
import { EventsTable } from "../ActionComponents/ActionComponents1";
import Loading from "../Loading/Loading";
import {
  AddNewBtn,
  MembersSearch,
  MembersSearchBtn,
  MembersSearchCompCon,
  MembersSearchInput,
} from "../Members/Members.styles";
import AddEvent from "../Modals/AddEvent";
import Pagination from "../Pagination/Pagination";
import { EventsContainer, EventsHeader, EventsList } from "./Events.styles";

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showModal, setModal] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const displayModal = () => {
    setModal(!showModal);
  };
  const displayAddEvent = () => {
    setAddEvent(!addEvent);
  };

  const { isLoading, isFetching, isError, data } = useQuery(
    "all-events",
    getAllEvents,
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
      {addEvent && <AddEvent close={displayAddEvent} />}
      <EventsContainer>
        <EventsHeader>Events</EventsHeader>

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

          <AddNewBtn onClick={displayAddEvent}>Add New</AddNewBtn>
        </MembersSearch>

        <EventsList>
          {isLoading || isFetching ? (
            <Loading loading={isLoading || isFetching} />
          ) : !isError ? (
            <EventsTable
              show={showModal}
              deleteFn={displayModal}
              data={paginatedData}
            />
          ) : (
            <small>can't fetch events</small>
          )}
        </EventsList>

        <Pagination
          totalPosts={data?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </EventsContainer>
    </>
  );
};

export default Events;
