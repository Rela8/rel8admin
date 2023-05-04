import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/api-calls.js";
import {
  FormLabel,
  LoginContainer,
  LoginErrorContainer,
  LoginFormInput,
  LoginForms,
  LoginSubConBtn,
  LoginSubConBtnHold,
  LoginSubContainer,
  LoginSubHeader,
} from "./Login.styles";
import { toast } from "react-toastify";
import { userStore } from "../../zustand/stores";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = userStore((state) => state.setUser);
  const userInfo = userStore((state) => state.user);

  const from = location?.state?.from || "/";

  const { mutate, isLoading, isError, error } = useMutation(
    (userData) => loginUser(userData),
    {
      onSuccess: (data, context) => {
        toast.success(`Welcome ${data?.user_type}`, {
          progressClassName: "toastProgress",
          icon: false,
        });
        localStorage.setItem("shortName", JSON.stringify(context.shortName));
        setUser(data);
        navigate(from);
        window.location.reload(true);
      },
    }
  );

  const onSubmit = (userCredentials) => {
    mutate(userCredentials);
  };

  if (userInfo) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <LoginContainer>
        <LoginSubContainer>
          <LoginSubHeader>Login</LoginSubHeader>
          {isError ? (
            <LoginErrorContainer>{error.message}</LoginErrorContainer>
          ) : null}
          <LoginForms onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
              Organisation Name
              <LoginFormInput
                type={"text"}
                {...register("shortName", { required: true })}
                required
              />
            </FormLabel>
            <FormLabel>
              Email
              <LoginFormInput
                type={"email"}
                {...register("email", { required: true })}
                required
              />
            </FormLabel>
            <FormLabel>
              Password
              <LoginFormInput
                type={"password"}
                {...register("password", { required: true })}
                required
              />
            </FormLabel>

            <LoginSubConBtnHold>
              <LoginSubConBtn
                type={"submit"}
                value="Login"
                typex="filled"
                loading={isLoading ? "loading" : ""}
                disabled={isLoading}
              />
            </LoginSubConBtnHold>
          </LoginForms>
        </LoginSubContainer>
      </LoginContainer>
    </>
  );
};

export default Login;
