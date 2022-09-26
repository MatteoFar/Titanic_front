import TextInputComponent from "../../component/textInput";
import React from "react";
import MainButtonComponent from "../../component/mainButton";

export default function LoginFormComponent() {
  return (
    <div className="w-1/4 m-auto p-10">
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
    </div>
  );
}
