import { Field, Formik } from "formik";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import validator from "validator";

import { setUser } from "../../redux/auth/actions";

import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";

export default function Signin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSubmit = async (values, actions) => {
    if (!isMounted) return;

    try {
      const response = await api.post(`/user/signin`, values);

      if (!isMounted) return;

      const { user, token } = response;
      if (token) api.setToken(token);
      if (user) {
        actions.setSubmitting(false);
        dispatch(setUser(user));
        history.replace("/");
      }
    } catch (e) {
      if (!isMounted) return;

      let errorMessage = "An error occurred";

      switch (e.code) {
        case "INVALID_CREDENTIALS":
          errorMessage = "Invalid credentials";
          break;
        case "NETWORK_ERROR":
          errorMessage = "Server connection error";
          break;
        default:
          errorMessage = "An error occurred";
      }

      toast.error(errorMessage);

      if (isMounted) {
        actions.setSubmitting(false);
        actions.setFieldValue("password", "", false);
      }
    }
  };

  return (
    <div className="authWrapper font-myfont">
      <div className="font-[Helvetica] text-center text-[32px] font-semibold	mb-[15px]">Account team</div>

      <Formik initialValues={{ username: "", password: "" }} onSubmit={handleSubmit}>
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-[25px]">
              <div className="flex flex-col-reverse">
                <Field
                  className="peer signInInputs "
                  validate={(v) => validator.isEmpty(v) && "This field is Required"}
                  name="username"
                  type="text"
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                />
                <label className="peer-focus:text-[#116eee]" htmlFor="username">
                  Username
                </label>
              </div>
              <p className="text-[12px] text-[#FD3131]">{errors.username}</p>
            </div>
            <div className="mb-[25px]">
              <div className="flex flex-col-reverse">
                <Field
                  className="peer signInInputs"
                  validate={(v) => validator.isEmpty(v) && "This field is Required"}
                  name="password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <label className="peer-focus:text-[#116eee]" htmlFor="password">
                  Password
                </label>
              </div>
              <p className="text-[12px] text-[#FD3131]">{errors.password}</p>
            </div>
            <div className="flex gap-3">
              <LoadingButton
                className="font-[Helvetica] w-[220px] bg-[#007bff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                loading={isSubmitting}
                type="submit"
                color="primary">
                Signin
              </LoadingButton>
              <LoadingButton
                className="font-[Helvetica] w-[220px] bg-[#009dff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                onClick={() => history.push("/auth/signup")}
                color="primary">
                Signup
              </LoadingButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
