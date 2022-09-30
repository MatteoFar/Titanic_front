import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function ByGenderPage() {
  const [passengersData, setPassengersData] = useState([]);
  const [anverage, setAnverage] = useState(false);
  const [derivation, setDerivation] = useState(false);
  const [survived, setSurvived] = useState(false);
  const [labels] = useState(["Genre"]);
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

  const getAverageAgeByGender = (gender) => {
    let b = [];

    passengersData
      .filter((e) => e.Age !== null)
      .map((e) => {
        if (gender == "homme" && e.Sex == "male") {
          b.push(e.Age);
        } else if (gender == "femme" && e.Sex == "female") {
          b.push(e.Age);
        }
      });

    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
    return average(b);
  };

  function standardDeviation(gender) {
    let b = [];

    passengersData
      .filter((e) => e.Age !== null)
      .map((e) => {
        if (gender == "homme" && e.Sex == "male") {
          b.push(e.Age);
        } else if (gender == "femme" && e.Sex == "female") {
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

  const data = {
    labels,
    datasets: [
      {
        label: anverage ? "moyenne d'age des femmes" : "Nombre de Femmes",
        data: anverage
          ? labels.map(() => Math.round(getAverageAgeByGender("femme")))
          : labels.map(
              () => passengersData.filter((e) => e.Sex == "female").length
            ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: anverage ? "moyenne d'age des hommes" : "Nombre d'hommes",
        data: anverage
          ? labels.map(() => Math.round(getAverageAgeByGender("homme")))
          : labels.map(
              () => passengersData.filter((e) => e.Sex == "male").length
            ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataSurvived = {
    labels,
    datasets: [
      {
        label: "nombre de femmes qui ont survécue",
        data: labels.map(
          () =>
            passengersData.filter((e) => e.Sex == "female" && e.Survived == 1)
              .length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "nombre d'homme qui ont survécue",
        data: labels.map(
          () =>
            passengersData.filter((e) => e.Sex == "male" && e.Survived == 1)
              .length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataDerivation = {
    labels,
    datasets: [
      {
        label: "Ecart type chez les femmes",
        data: labels.map(() => standardDeviation("femme")),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Ecart type chez les hommes",
        data: labels.map(() => standardDeviation("homme")),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="flex-col justify-center text-center">
        <h1 className="text-6xl">Données retranscrie</h1>
        <form className="flex m-auto w-5/12 justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label>Moyenne d'age</label>
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
          <Bar options={options} data={survived ? dataSurvived : data} />
        )}
        <MainButtonComponent
          title={"Remove"}
          onClick={() => navigate("/search")}
        />
      </div>
    </div>
  );
}
