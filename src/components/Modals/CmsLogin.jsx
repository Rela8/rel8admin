import React from "react";
import { BackDrop } from "./AddMeeting";
import { CMSButton, CMSLoginModalContainer } from "./ModalStyles";
import InputWithLabel from "../InputWithLabel";
import { useCmsAuthStore } from "../../zustand/cms-store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { cmsLoginApi } from "../../utils/api/cms-endpoints";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useForm } from "react-hook-form";

const CmsLogin = ({ closefn }) => {
  const setUserfn = useCmsAuthStore.getState().setUser;

  const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation(
    (inputData) => cmsLoginApi(inputData),
    {
      onSuccess: (data) => {
        toast.success("CMS login successful");
        setUserfn(data);
        closefn();
      },
      onError: () => {
        toast.error("CMS login failed");
      },
    }
  );

  const onSubmitHandler = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <>
      <BackDrop>
        <CMSLoginModalContainer>
          <h4>We realized you're not logged into the CMS, kindly login</h4>
          <br />
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <InputWithLabel
              register={register("email")}
              label="Email"
              errorMessage={errors.email?.message}
            />
            <InputWithLabel
              register={register("password")}
              label="Password"
              type="password"
              errorMessage={errors.password?.message}
            />
            <div className="align-btn">
              <CMSButton disabled={isLoading}>Login</CMSButton>
              <CMSButton secondary disabled={isLoading} onClick={closefn}>
                Cancel
              </CMSButton>
            </div>
          </form>
        </CMSLoginModalContainer>
      </BackDrop>
    </>
  );
};

export default CmsLogin;
