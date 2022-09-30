import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import _ from "lodash";
import { verifyToken } from "../../tools";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import apiService from "../../services";
import MainButtonComponent from "../../component/mainButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ByAgePage() {
  const [passengersData, setPassengersData] = useState([]);
  const [anverage, setAnverage] = useState(false);
  const [derivation, setDerivation] = useState(false);
  const [labels, setLabels] = useState(["Age"]);
  const [survived, setSurvived] = useState(false);
  let navigate = useNavigate();

  const handleGetPassengers = async () => {
    const d = await apiService.getAllPassengers();
    setPassengersData(d.data.value);
  };

  useEffect(() => {
    if (verifyToken() === null) {
      navigate("/");
    }
    handleGetPassengers();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Titanic Data",
      },
      maintainAspectRatio: true,
    },
  };
  const getAverageAge = () => {
    let b = [];
    passengersData.filter((e) => e.Age !== null).map((e) => b.push(e.Age));
    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
    return average(b);
  };

  function standardDeviation(ageMin, ageMax) {
    let b = [];

    passengersData.filter((e) => e.Age !== null).map((e) => b.push(e.Age));
    let mean =
      b
        .filter((e) => e >= ageMin && e <= ageMax)
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0) / b.length;

    b = b.map((el) => {
      return (el - mean) ** 2;
    });

    let total = b.reduce((acc, curr) => acc + curr, 0);

    return Math.sqrt(total / b.length);
  }

  const dataAverage = {
    labels,
    datasets: [
      {
        label: "Moyenne d'age global",
        data: labels.map(() => Math.round(getAverageAge())),
        backgroundColor: "red",
      },
    ],
  };

  const data = {
    labels,
    datasets: [
      {
        label: survived ? "SURVIE DES 0-10 ans " : "0-10 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              survived
                ? e.Survived == 1 && e.Age >= 0 && e.Age <= 10
                : e.Age >= 0 && e.Age <= 10
            ).length
        ),
        backgroundColor: "rgba(50, 99, 132, 0.5)",
      },
      {
        label: survived ? "SURVIE DES 10-20 ans " : "10-20 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              survived
                ? e.Survived == 1 && e.Age >= 10 && e.Age <= 20
                : e.Age >= 10 && e.Age <= 20
            ).length
        ),
        backgroundColor: "rgba(55, 162, 235, 0.5)",
      },
      {
        label: survived ? "SURVIE DES 20-30 ans " : "20-30 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              survived
                ? e.Survived == 1 && e.Age >= 20 && e.Age <= 30
                : e.Age >= 20 && e.Age <= 30
            ).length
        ),
        backgroundColor: "rgba(60, 162, 235, 0.5)",
      },
      {
        label: survived ? "SURVIE DES 30-40 ans " : "30-40 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              survived
                ? e.Survived == 1 && e.Age >= 30 && e.Age <= 40
                : e.Age >= 30 && e.Age <= 40
            ).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: survived ? "SURVIE DES 40-50 ans " : "40-50 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              survived
                ? e.Survived == 1 && e.Age >= 40 && e.Age <= 50
                : e.Age >= 40 && e.Age <= 50
            ).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: survived ? "SURVIE DES 50+ ans " : "50+ ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              survived ? e.Survived == 1 && e.Age >= 50 : e.Age >= 50
            ).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: survived ? "" : "50+ ans",
        data: labels.map(
          () =>
            passengersData.filter((e) => (survived ? null : e.Age === null))
              .length
        ),
        backgroundColor: "black",
      },
    ],
  };

  const dataDerivation = {
    labels: ["Ecart type"],
    datasets: [
      {
        label: "0-10",
        data: labels.map(() => standardDeviation(0, 10)),
        backgroundColor: "rgba(50, 99, 132, 0.5)",
      },
      {
        label: "10-20",
        data: labels.map(() => standardDeviation(10, 20)),
        backgroundColor: "rgba(55, 162, 235, 0.5)",
      },
      {
        label: "20-30",
        data: labels.map(() => standardDeviation(20, 30)),
        backgroundColor: "rgba(60, 162, 235, 0.5)",
      },
      {
        label: "30-40",
        data: labels.map(() => standardDeviation(30, 40)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "40-50",
        data: labels.map(() => standardDeviation(40, 50)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "50+",
        data: labels.map(() => standardDeviation(50, 100)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="flex-col justify-center text-center">
        <h1 className="text-6xl">Données retranscrie</h1>
        <form className="flex m-auto w-5/12 justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label>Moyenne</label>
          <input
            type={"checkbox"}
            checked={anverage}
            onChange={() => setAnverage(!anverage)}
          ></input>
          <label>Ecart type</label>
          <input
            type={"checkbox"}
            checked={derivation}
            onChange={() => setDerivation(!derivation)}
          ></input>
          <label>Survecue</label>
          <input
            type={"checkbox"}
            checked={survived}
            onChange={() => setSurvived(!survived)}
          ></input>
        </form>
        {derivation ? (
          <Bar options={options} data={dataDerivation} />
        ) : (
          <Bar options={options} data={anverage ? dataAverage : data} />
        )}
        <MainButtonComponent
          title={"Remove"}
          onClick={() => navigate("/search")}
        />
      </div>
    </div>
  );
}
