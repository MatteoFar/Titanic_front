import React, { useEffect, useState } from "react";
import { useUpdateLoginForm } from "../../context/LoginFormContext";

export default function HeaderComponent() {
  const updateLoginForm = useUpdateLoginForm();

  const [login, setLogin] = useState(true);

  useEffect(() => {
    updateLoginForm(login);
  }, [login]);

  return (
    <div className={"flex bg-red space-x-80 justify-between p-5 items-center"}>
      <div className="flex">
        <h1 className="">Titanic</h1>
      </div>
      <div className="flex items-center">
        <h1 className="mr-5" onClick={() => setLogin(true)}>
          Connexion
        </h1>
        <h1 className="" onClick={() => setLogin(false)}>
          Inscription
        </h1>
      </div>
    </div>
  );
}
