import React, { useEffect } from "react";
import {
  SettingsContainer,
  SettingsHeader,
  SettingsSubHeader,
  SettingsUpload,
  SettingsUploadCon,
  SettingsUploadImg,
  SettingsUploadInput,
  SettingsUploadLabel,
} from "./Settings.styles";
import UploadImage from "../../assets/UploadImage.png";
import { useMutation } from "react-query";
import { UploadDataBase } from "../../utils/api-calls.js";
import { toast } from "react-toastify";

const Settings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, mutate } = useMutation((file) => UploadDataBase(file), {
    onMutate: () => {
      toast.info("Database uploading...", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
    onSuccess: () => {
      toast.success("Database upload successful", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
    onError: () => {
      toast.error("Database upload unsuccessful", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
  });

  const uploadFile = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    mutate(formData);
  };

  return (
    <SettingsContainer>
      <SettingsHeader>Upload Database</SettingsHeader>
      <SettingsSubHeader>Upload First Level Database</SettingsSubHeader>

      <SettingsUploadCon>
        <SettingsUpload>
          <SettingsUploadLabel htmlFor="uploadImg">
            <SettingsUploadImg alt="" src={UploadImage} />
          </SettingsUploadLabel>
          <SettingsUploadInput
            disabled={isLoading}
            id="uploadImg"
            type={"file"}
            onChange={(e) => uploadFile(e)}
          />
        </SettingsUpload>
      </SettingsUploadCon>
    </SettingsContainer>
  );
};

export default Settings;
