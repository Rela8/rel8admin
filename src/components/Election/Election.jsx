import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { SearchIcon } from "../../assets/SideBar/svgs";
import { getAllElections } from "../../utils/api-calls.js";
import {
  ElectionResultTable,
  ElectionTable,
} from "../ActionComponents/ActionComponents1";
import { EventsList } from "../Events/Events.styles";
import Loading from "../Loading/Loading";
import {
  AddNewBtn,
  MembersSearch,
  MembersSearchBtn,
  MembersSearchCompCon,
  MembersSearchInput,
} from "../Members/Members.styles";
import AddElection from "../Modals/AddElection";
import Pagination from "../Pagination/Pagination";
import {
  ElectionContainer,
  ElectionOptions,
  ElectionOptionsItem,
} from "./Election.styles";

const Election = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [options, setOptions] = useState("election-setup");
  const [searchValue, setSearchValue] = useState("");
  const [setupModal, setHideSetupModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const {
    isLoading: electionLoading,
    isFetching: electionFetching,
    isError: electionError,
    data: electionData,
  } = useQuery("all-elections", getAllElections, {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  const searchHandler = () => {
    const searchPattern = new RegExp(searchValue, "i");
    const result = electionData?.filter(
      (item) => item.name.search(searchPattern) >= 0
    );
    return result;
  };

  const searchResult = searchHandler();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const paginatedData = searchResult?.slice(firstPostIndex, lastPostIndex);

  const displayModal = () => {
    setHideSetupModal(!setupModal);
  };

  return (
    <>
      {setupModal && <AddElection close={displayModal} />}
      <ElectionContainer>
        <ElectionOptions>
          <ElectionOptionsItem
            onClick={() => setOptions("election-setup")}
            filled={options === "election-setup" ? "yes" : ""}
          >
            SETUP ELECTION
          </ElectionOptionsItem>
          <ElectionOptionsItem
            onClick={() => setOptions("election-result")}
            filled={options === "election-result" ? "yes" : ""}
          >
            SEE ELECTION RESULTS
          </ElectionOptionsItem>
        </ElectionOptions>

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

          <AddNewBtn onClick={displayModal}>Setup Election</AddNewBtn>
        </MembersSearch>

        {options === "election-setup" && (
          <EventsList>
            {electionLoading || electionFetching ? (
              <Loading loading={electionLoading || electionFetching} />
            ) : !electionError ? (
              <ElectionTable data={paginatedData} />
            ) : (
              <small>Can't fetch elections</small>
            )}
          </EventsList>
        )}

        {options === "election-result" && (
          <>
            {/* <ElectionUploadReportHolder>
              <ElectionUploadReport>
                Upload Election Report
              </ElectionUploadReport>
            </ElectionUploadReportHolder> */}

            <EventsList>
              <ElectionResultTable data={paginatedData} />
            </EventsList>
          </>
        )}

        <Pagination
          totalPosts={electionData?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </ElectionContainer>
    </>
  );
};

export default Election;
