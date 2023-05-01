import React, { useState, useEffect } from "react";
// import assetsImages from './assets/player-images/*.jpg';
import images from "./assets/player-images/images";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// console.log(images);
const App = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.playerList);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedPlayers = players
    .filter((player) => {
      const search = searchTerm.toLowerCase();
      return (
        player.TName.toLowerCase().includes(search) ||
        player.PFName.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Value - b.Value;
      } else {
        return b.Value - a.Value;
      }
    });

  const playerCards = sortedPlayers.map((player) => {
    const matchTime = new Date(player.UpComingMatchesList[0].MDate);
    const matchDate = matchTime.toLocaleDateString();
    const matchTimeStr = matchTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div key={player.Id} className="col-md-4">
        <div className="card mb-3">
          <img
            className="card-img-top"
            src={images[`./${player.Id}.jpg`]}
            alt={player.PFName}
          />
          <div className="card-body">
            <h5 className="card-title">{player.PFName}</h5>
            {/* <p className="card-text">{player.Id}</p> */}
            <p className="card-text">{player.SkillDesc}</p>
            <p className="card-text">Value: {player.Value}M$</p>
            <p className="card-text">
              Upcoming Match: {player.UpComingMatchesList[0].CCode} vs.{" "}
              {player.UpComingMatchesList[0].VsCCode}
            </p>
            <p className="card-text">
              Next Match Time: {matchDate == "Invalid Date" ? "" : matchDate}{" "}
              {matchTimeStr == "Invalid Date" ? "" : matchTimeStr}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mb-3">
      <h1 className="display-1 fw-bold text-center">Football Players</h1>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or team"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleSort}>
            {sortOrder === "asc" ? "Sort Desc" : "Sort Asc"}
          </button>
        </div>
      </div>
      <div className="row">{playerCards}</div>
    </div>
  );
};

export default App;
