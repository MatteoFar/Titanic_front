import React from "react";

export default function HeaderComponent() {
  return (
    <div className={"flex bg-red space-x-80 justify-between p-5 items-center"}>
      <div className="flex">
        <h1 className="">Titanic</h1>
      </div>
      <div className="flex items-center">
        <h1 className="mr-5">Connexion</h1>
        <h1 className="">Inscription</h1>
      </div>
    </div>
  );
}
