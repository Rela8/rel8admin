import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { SearchIcon } from "../../assets/SideBar/svgs";
import { getAllEvents } from "../../utils/api-calls";
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
  const [events, setEvents] = useState([]);

  const queryClient = useQueryClient();

  const displayModal = () => {
    setModal(!showModal);
  };
  const displayAddEvent = () => {
    setAddEvent(!addEvent);
  };

  const { isLoading, isFetching, isError } = useQuery("all-events", getAllEvents, {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
    onSuccess: (data) => {
      setEvents(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    },
  });

  const handleAddOrUpdate = (event) => {
    setEvents((prevEvents) => {
      const existingEventIndex = prevEvents.findIndex((e) => e.id === event.id);
      if (existingEventIndex > -1) {
        // Update the existing event
        const updatedEvents = [...prevEvents];
        updatedEvents[existingEventIndex] = event;
        return [event, ...updatedEvents.filter((_, i) => i !== existingEventIndex)];
      } else {
        // Add the new event
        return [event, ...prevEvents];
      }
    });
  };

  const searchHandler = () => {
    const searchPattern = new RegExp(searchValue, "i");
    const result = events?.filter((item) => item.name.search(searchPattern) >= 0);
    return result;
  };

  const searchResult = searchHandler();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const paginatedData = searchResult?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {addEvent && <AddEvent close={displayAddEvent} onSubmit={handleAddOrUpdate} />}
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

          <AddNewBtn onClick={displayAddEvent} >Add New</AddNewBtn>
        </MembersSearch>

        <EventsList>
          {isLoading || isFetching ? (
            <Loading loading={isLoading || isFetching} />
          ) : !isError ? (
            <EventsTable
              show={showModal}
              deleteFn={displayModal}
              data={paginatedData}
              onUpdate={handleAddOrUpdate}
            />
          ) : (
            <small>can't fetch events</small>
          )}
        </EventsList>

        <Pagination
          totalPosts={events?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </EventsContainer>
    </>
  );
};

export default Events;
