import React, { useContext, useState } from "react";
import TextInputComponent from "../../component/textInput";
import MainButtonComponent from "../../component/mainButton";
import { useLoginForm } from "../../context/LoginFormContext";

export default function LoginFormComponent() {
  const loginForm = useLoginForm();
  return (
    <div className="w-1/4 m-auto p-10">
      {loginForm ? (
        <div class="w-full max-w-xs">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <TextInputComponent
                id={"username"}
                type={"text"}
                placeholder={"johnDoe@gmail.com"}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Mot de passe
              </label>
              <TextInputComponent
                id={"password"}
                type={"password"}
                placeholder={"******************"}
              />
            </div>
            <div class="flex items-center justify-center">
              <MainButtonComponent type={"submit"} title={"Connexion"} />
            </div>
          </form>
        </div>
      ) : (
        <div class="w-full max-w-xs">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Nom
              </label>
              <TextInputComponent
                id={"username"}
                type={"text"}
                placeholder={"johnDoe@gmail.com"}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Prénom
              </label>
              <TextInputComponent
                id={"username"}
                type={"text"}
                placeholder={"johnDoe@gmail.com"}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <TextInputComponent
                id={"username"}
                type={"text"}
                placeholder={"johnDoe@gmail.com"}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Mot de passe
              </label>
              <TextInputComponent
                id={"password"}
                type={"password"}
                placeholder={"******************"}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Confirmer mot de passe
              </label>
              <TextInputComponent
                id={"password"}
                type={"password"}
                placeholder={"******************"}
              />
            </div>
            <div class="flex items-center justify-center">
              <MainButtonComponent type={"submit"} title={"Inscription"} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
