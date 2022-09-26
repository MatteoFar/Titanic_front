import React from "react";

export default function LoginScreen() {
  return (
    <div>
      <div className="flex-col justify-center text-center">
        <h1 className="text-6xl">Bienvenue sur Titanic</h1>
        <h4 className="text-2xl">
          Connectez-vous ou inscrivez vous afin d'effectuer des recherches
          statistique sur les passagers du titanic.
        </h4>
        <div className="w-1/4 m-auto p-10">
          <h5>Connexion</h5>
          <form>
            <div className="flex flex-col">
              <input type="text" placeholder="email" />
              <input type="text" placeholder="mot de passe" />
            </div>
            <button type="submit">Connexion</button>
          </form>
        </div>
      </div>
    </div>
  );
}
