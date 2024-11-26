import { Field, Formik } from "formik";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import validator from "validator";

import { setUser } from "../../redux/auth/actions";
import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";

export default function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(true);

  // Cleanup effect
  useEffect(() => {
    dispatch(setUser(null));
    api.setToken(null);
    return () => {
      setIsMounted(false);
    };
  }, [dispatch]);

  const handleSubmit = async (values, actions) => {
    if (!isMounted) return;

    try {
      const response = await api.post(`/user/signup`, values);

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

      let errorMessage = "Une erreur est survenue";

      switch (e.code) {
        case "USER_ALREADY_REGISTERED":
          errorMessage = "Ce nom d'utilisateur est déjà pris";
          break;
        case "PASSWORD_NOT_VALIDATED":
          errorMessage = "Le mot de passe n'est pas valide";
          break;
        case "NETWORK_ERROR":
          errorMessage = "Erreur de connexion au serveur";
          break;
        default:
          errorMessage = "Une erreur est survenue lors de l'inscription";
      }

      toast.error(errorMessage);

      if (isMounted) {
        actions.setSubmitting(false);
        // Réinitialiser le mot de passe en cas d'erreur
        actions.setFieldValue("password", "", false);
      }
    }
  };

  return (
    <div className="authWrapper font-myfont">
      <div className="font-[Helvetica] text-center text-[32px] font-semibold	mb-[15px]">Account team</div>

      <Formik initialValues={{ username: "", organisation: "", password: "" }} onSubmit={handleSubmit}>
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => {
          return (
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
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.username}</p>
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field
                    className="peer signInInputs "
                    validate={(v) => validator.isEmpty(v) && "This field is Required"}
                    name="organisation"
                    type="text"
                    id="organisation"
                    value={values.organisation}
                    onChange={handleChange}
                  />
                  <label className="peer-focus:text-[#116eee]" htmlFor="organisation">
                    Organisation name
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.organisation}</p>
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
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.password}</p>
              </div>
              {/* SignIn Button */}
              <LoadingButton
                className="font-[Helvetica] w-[220px] bg-[#007bff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                loading={isSubmitting}
                type="submit"
                color="primary">
                Signup
              </LoadingButton>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
