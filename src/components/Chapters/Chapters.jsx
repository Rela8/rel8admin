import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllChapters } from "../../utils/api-calls.js";
import { userStore } from "../../zustand/stores";
import { ChaptersTable } from "../ActionComponents/ActionComponents1";
import { EventsList } from "../Events/Events.styles";
import Loading from "../Loading/Loading";
import AddChapter from "../Modals/AddChapter";
import RegisterUserToChapter from "../Modals/RegisterUserToChapter";
import {
  ChaptersButton,
  ChaptersButtonCon,
  ChaptersContainer,
  ChaptersHeader,
} from "./Chapters.styles";

const Chapters = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [createModal, showCreateModal] = useState(false);
  const [registerModal, showRegisterModal] = useState(false);

  const displayCreate = () => {
    showCreateModal(!createModal);
  };

  const displayRegister = () => {
    showRegisterModal(!registerModal);
  };

  const { isLoading, isFetching, isError, data } = useQuery(
    "all-chapters",
    getAllChapters,
    {
      refetchOnWindowFocus: false,
      select: (data) => data.results,
    }
  );
  const userInfo = userStore((state) => state.user);

  if (!userInfo?.user_type === "super_admin") {
    return (
      <ChaptersContainer>
        <ChaptersHeader>Unauthorized Admin</ChaptersHeader>
      </ChaptersContainer>
    );
  }

  return (
    <>
      {createModal && <AddChapter close={displayCreate} />}
      {registerModal && <RegisterUserToChapter close={displayRegister} />}

      <ChaptersContainer>
        <ChaptersHeader>Chapters</ChaptersHeader>

        <ChaptersButtonCon>
          <ChaptersButton onClick={displayCreate}>
            Create New Chapter
          </ChaptersButton>
          <ChaptersButton
            isUsable={isLoading ? "no" : "yes"}
            onClick={displayRegister}
          >
            Register User to Chapter
          </ChaptersButton>
        </ChaptersButtonCon>

        <EventsList>
          {isLoading || isFetching ? (
            <Loading loading={isLoading || isFetching} />
          ) : !isError ? (
            <ChaptersTable data={data} />
          ) : (
            <small>can't fetch chapters</small>
          )}
        </EventsList>
      </ChaptersContainer>
    </>
  );
};

export default Chapters;
