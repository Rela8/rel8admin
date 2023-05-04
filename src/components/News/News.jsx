import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SearchIcon } from "../../assets/SideBar/svgs";
import { getAllNews } from "../../utils/api-calls.js";
import { NewsTable } from "../ActionComponents/ActionComponents1";
import {
  EventsContainer,
  EventsHeader,
  EventsList,
} from "../Events/Events.styles";
import Loading from "../Loading/Loading";
import {
  AddNewBtn,
  MembersSearch,
  MembersSearchBtn,
  MembersSearchCompCon,
  MembersSearchInput,
} from "../Members/Members.styles";
import AddNews from "../Modals/AddNews";
import Pagination from "../Pagination/Pagination";

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showModal, setModal] = useState(false);
  const [addNews, setAddNews] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const displayModal = () => {
    setModal(!showModal);
  };
  const displayAddNewsModal = () => {
    setAddNews(!addNews);
  };

  const {
    isLoading: newsLoading,
    isFetching: newsFetching,
    isError: newsError,
    data: newsData,
  } = useQuery("all-news", getAllNews, {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  const searchHandler = () => {
    const searchPattern = new RegExp(searchValue, "i");
    const result = newsData?.filter(
      (item) => item.name.search(searchPattern) >= 0
    );
    return result;
  };

  const searchResult = searchHandler();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const paginatedData = searchResult?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {addNews && <AddNews close={displayAddNewsModal} />}
      <EventsContainer>
        <EventsHeader>News</EventsHeader>

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

          <AddNewBtn onClick={displayAddNewsModal}>Add New</AddNewBtn>
        </MembersSearch>

        <EventsList>
          {newsLoading || newsFetching ? (
            <Loading loading={newsLoading || newsFetching} />
          ) : !newsError ? (
            <NewsTable
              show={showModal}
              deleteFn={displayModal}
              data={paginatedData}
            />
          ) : (
            <small>can't fetch news</small>
          )}
        </EventsList>

        <Pagination
          totalPosts={newsData?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </EventsContainer>
    </>
  );
};

export default News;
