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

export default function ByClassePage() {
  const [passengersData, setPassengersData] = useState([]);
  const [anverage, setAnverage] = useState(false);
  const [derivation, setDerivation] = useState(false);
  const [labels, setLabels] = useState(["Classe"]);
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

  const getAverageAgeByClass = (classe) => {
    let b = [];

    passengersData
      .filter((e) => e.Age !== null)
      .map((e) => {
        if (classe == "A" && e.Pclass == 1) {
          b.push(e.Age);
        } else if (classe == "B" && e.Pclass == 2) {
          b.push(e.Age);
        } else if (classe == "C" && e.Pclass == 3) {
          b.push(e.Age);
        }
      });

    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
    return average(b);
  };

  function standardDeviation(classe) {
    let b = [];

    passengersData
      .filter((e) => e.Age !== null)
      .map((e) => {
        if (classe == "A" && e.Pclass == 1) {
          b.push(e.Age);
        } else if (classe == "B" && e.Pclass == 2) {
          b.push(e.Age);
        } else if (classe == "C" && e.Pclass == 3) {
          b.push(e.Age);
        }
      });

    let mean =
      b.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / b.length;

    b = b.map((el) => {
      return (el - mean) ** 2;
    });

    let total = b.reduce((acc, curr) => acc + curr, 0);

    return Math.sqrt(total / b.length);
  }

  console.log(standardDeviation("C"));

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
    },
  };

  const dataDerivation = {
    labels,
    datasets: [
      {
        label: "Ecart type classe A",
        data: labels.map(() => standardDeviation("A")),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Ecart type classe B",
        data: labels.map(() => standardDeviation("B")),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Ecart type classe C",
        data: labels.map(() => standardDeviation("C")),
        backgroundColor: "rgba(50, 160, 200, 0.5)",
      },
    ],
  };

  const data = {
    labels,
    datasets: [
      {
        label: anverage ? "Moyenne d'age des passagers de classe A" : "A",
        data: labels.map(() =>
          anverage
            ? Math.round(getAverageAgeByClass("A"))
            : passengersData.filter((e) => e.Pclass == 1).length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: anverage ? "Moyenne d'age des passagers de classe B" : "B",
        data: labels.map(() =>
          anverage
            ? Math.round(getAverageAgeByClass("B"))
            : passengersData.filter((e) => e.Pclass == 2).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: anverage ? "Moyenne d'age des passagers de classe C" : "C",
        data: labels.map(() =>
          anverage
            ? Math.round(getAverageAgeByClass("C"))
            : passengersData.filter((e) => e.Pclass == 3).length
        ),
        backgroundColor: "rgba(50, 160, 200, 0.5)",
      },
    ],
  };

  const dataSurvived = {
    labels,
    datasets: [
      {
        label: "SURVIE CLASSE A",
        data: labels.map(
          () =>
            passengersData.filter((e) => e.Pclass == 1 && e.Survived == 1)
              .length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "SURVIE CLASSE B",
        data: labels.map(
          () =>
            passengersData.filter((e) => e.Pclass == 2 && e.Survived == 1)
              .length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "SURVIE CLASSE C",
        data: labels.map(
          () =>
            passengersData.filter((e) => e.Pclass == 3 && e.Survived == 1)
              .length
        ),
        backgroundColor: "rgba(50, 160, 200, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="flex-col justify-center text-center">
        <h1 className="text-6xl">Données retranscrie</h1>
        <form className="flex m-auto w-5/12 justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label>Moyenne d'age par classe</label>
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
        {survived ? (
          <Bar options={options} data={dataSurvived} />
        ) : (
          <Bar options={options} data={derivation ? dataDerivation : data} />
        )}

        <MainButtonComponent
          title={"Remove"}
          onClick={() => navigate("/search")}
        />
      </div>
    </div>
  );
}
