import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { SearchIcon } from "../../assets/SideBar/svgs";
import { getAllGalleries } from "../../utils/api-calls.js";
import Loading from "../Loading/Loading";
import {
  AddNewBtn,
  MembersSearch,
  MembersSearchBtn,
  MembersSearchCompCon,
  MembersSearchInput,
} from "../Members/Members.styles";
import AddGallery from "../Modals/AddGallery";
import {
  GalleryContainer,
  GalleryHeader,
  GalleryImageCard,
  GalleryImageCardTextLine,
  GalleryImagesHolder,
} from "./Gallery.styles";
import SingleGallery from "./SingleGallery";

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [addGallery, setAddGallery] = useState(false);
  const [showSingle, setShowSingle] = useState(false);
  const [itemId, setItemId] = useState(null);

  const displayAddGallery = () => {
    setAddGallery(!addGallery);
  };
  const displaySingleModal = () => {
    setShowSingle(!showSingle);
  };

  const { isLoading, isFetching, isError, data } = useQuery(
    "all-galleries",
    getAllGalleries,
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data.data,
    }
  );

  const searchHandler = () => {
    const searchPattern = new RegExp(searchValue, "i");
    const result = data?.filter((item) => item.name.search(searchPattern) >= 0);
    return result;
  };

  const searchResult = searchHandler();

  return (
    <>
      {addGallery && <AddGallery close={displayAddGallery} />}
      {showSingle && <SingleGallery close={displaySingleModal} id={itemId} />}
      <GalleryContainer>
        <GalleryHeader>Gallery</GalleryHeader>

        <MembersSearch>
          <MembersSearchCompCon>
            <MembersSearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name"
            />
            <MembersSearchBtn onClick={searchHandler}>
              <SearchIcon style={{ width: "15px", height: "15x" }} />
            </MembersSearchBtn>
          </MembersSearchCompCon>

          <AddNewBtn onClick={displayAddGallery}>Add New</AddNewBtn>
        </MembersSearch>

        {isLoading || isFetching ? (
          <Loading loading={isLoading || isFetching} />
        ) : !isError ? (
          <GalleryImagesHolder>
            {searchResult.length <= 0
              ? data.map((item) => (
                  <GalleryImageCard
                    key={item.id}
                    onClick={() => {
                      setItemId(item.id);
                      displaySingleModal();
                    }}
                  >
                    <GalleryImageCardTextLine size="bigger">
                      {item.name}
                    </GalleryImageCardTextLine>
                    <GalleryImageCardTextLine>
                      {item.date_taken}
                    </GalleryImageCardTextLine>
                  </GalleryImageCard>
                ))
              : searchResult.map((item) => (
                  <GalleryImageCard
                    key={item.id}
                    onClick={() => {
                      setItemId(item.id);
                      displaySingleModal();
                    }}
                  >
                    <GalleryImageCardTextLine size="bigger">
                      {item.name}
                    </GalleryImageCardTextLine>
                    <GalleryImageCardTextLine>
                      {item.date_taken}
                    </GalleryImageCardTextLine>
                  </GalleryImageCard>
                ))}
          </GalleryImagesHolder>
        ) : (
          <small>Can't All Galleries.</small>
        )}
      </GalleryContainer>
    </>
  );
};

export default Gallery;
