import React, { useState } from "react";
import TextInputComponent from "../../component/textInput";
import MainButtonComponent from "../../component/mainButton";
import { useLoginForm } from "../../context/LoginFormContext";
import { validatorsInscriptionFrom, validatorsLoginFrom } from "./validators";
import { useUpdateLoginForm } from "../../context/LoginFormContext";
import { useUpdateIsLogged } from "../../context/isLoggedContext";
import { useNavigate } from "react-router-dom";
import apiService from "../../services";

const Error = (err) => {
  const errorsData = err.err;
  return (
    <div>
      {errorsData && (
        <p className="text-red-500">
          {errorsData.map((e) => {
            return e.message;
          })}
        </p>
      )}
    </div>
  );
};

export default function LoginFormComponent() {
  const loginForm = useLoginForm();
  const updateIslogin = useUpdateIsLogged();
  const updateLoginForm = useUpdateLoginForm();

  const [errors, setErrors] = useState([]);

  const [signUp, setSignUp] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handlePost = (e, type) => {
    try {
      e.preventDefault();
      if (type == "connection") {
        validatorsLoginFrom(signIn);
        apiService.postLogin(signIn).then((e) => {
          console.log(e);
          if (e.status == 200) {
            console.log("TESTLOGIN", e);
            setSignIn({
              email: "",
              password: "",
            });
            navigate("/search");
            window.localStorage.setItem("token", e.data.token);
            updateIslogin(true);
          } else if (e.status === 205) {
            setErrors([{ type: "login", message: "Compte introuvable" }]);
            console.log("compte pas trouvé");
          }
        });
      } else {
        const { firstname, lastname, email, password } = signUp;
        validatorsInscriptionFrom(signUp);
        console.log("handlePostInscritpion");
        apiService
          .postUser({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          })
          .then((e) => {
            if (e.status == 200) {
              console.log("TESTSIGNUP", e);
              setSignUp({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
              updateLoginForm(true);
            }
          });
      }
      setErrors([]);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="w-1/4 m-auto p-10">
      {loginForm ? (
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Error err={errors.filter((e) => e.type == "login")} />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <Error err={errors.filter((e) => e.type == "email")} />
              <TextInputComponent
                id={"username"}
                type={"text"}
                value={signIn.email}
                placeholder={"johnDoe@gmail.com"}
                hasErrors={errors.filter((e) => e.type == "email")}
                onChange={(e) =>
                  setSignIn((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <Error err={errors.filter((e) => e.type == "password")} />
              <TextInputComponent
                id={"password"}
                type={"password"}
                value={signIn.password}
                placeholder={"******************"}
                hasErrors={errors.filter((e) => e.type == "password")}
                onChange={(e) =>
                  setSignIn((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center justify-center">
              <MainButtonComponent
                onClick={(e) => handlePost(e, "connection")}
                type={"submit"}
                title={"Connexion"}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastname"
              >
                Nom
              </label>
              <Error err={errors.filter((e) => e.type == "lastname")} />
              <TextInputComponent
                id={"lastname"}
                type={"text"}
                placeholder={"Doe"}
                value={signUp.lastname}
                hasErrors={errors.filter((e) => e.type == "lastname")}
                onChange={(e) =>
                  setSignUp((prev) => ({ ...prev, lastname: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstname"
              >
                Prénom
              </label>
              <Error err={errors.filter((e) => e.type == "firstname")} />
              <TextInputComponent
                id={"firstname"}
                type={"text"}
                placeholder={"John"}
                value={signUp.firstname}
                hasErrors={errors.filter((e) => e.type == "firstname")}
                onChange={(e) =>
                  setSignUp((prev) => ({ ...prev, firstname: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Error err={errors.filter((e) => e.type == "emailSignUp")} />
              <TextInputComponent
                id={"email"}
                type={"text"}
                value={signUp.email}
                placeholder={"johnDoe@gmail.com"}
                hasErrors={errors.filter((e) => e.type == "emailSignUp")}
                onChange={(e) =>
                  setSignUp((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <Error err={errors.filter((e) => e.type == "passwordSignUp")} />
              <TextInputComponent
                id={"password"}
                type={"password"}
                value={signUp.password}
                placeholder={"******************"}
                hasErrors={errors.filter((e) => e.type == "passwordSignUp")}
                onChange={(e) =>
                  setSignUp((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirmer mot de passe
              </label>
              <Error err={errors.filter((e) => e.type == "passwordSignUp")} />
              <TextInputComponent
                id={"confirmPassword"}
                type={"password"}
                value={signUp.confirmPassword}
                placeholder={"******************"}
                hasErrors={errors.filter((e) => e.type == "passwordSignUp")}
                onChange={(e) =>
                  setSignUp((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-center">
              <MainButtonComponent
                onClick={(e) => handlePost(e, "handlePostInscritpion")}
                type={"submit"}
                title={"Inscription"}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
