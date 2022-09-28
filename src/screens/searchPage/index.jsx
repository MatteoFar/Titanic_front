import React, { useEffect } from "react";
import { verifyToken } from "../../tools";
import { useNavigate } from "react-router-dom";
import apiService from "../../services";

export default function SearchPage() {
  let navigate = useNavigate();

  const handleGetPassengers = async () => {
    const d = await apiService.getAllPassengers();
    console.log(d);
  };

  useEffect(() => {
    if (verifyToken() === null) {
      navigate("/");
    }
    handleGetPassengers();
  }, []);

  return (
    <div>
      <div className="flex-col justify-center text-center">
        <h1 className="text-6xl">Bienvenue</h1>
      </div>
    </div>
  );
}
