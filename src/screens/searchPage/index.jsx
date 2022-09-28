import React, { useEffect } from "react";
import { verifyToken } from "../../tools";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  let navigate = useNavigate();

  useEffect(() => {
    if (verifyToken() === null) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>PAGE D'ACEUILLE</h1>
    </div>
  );
}
