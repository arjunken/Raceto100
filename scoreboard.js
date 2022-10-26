//Declarations and DOM handles
const playagainBtn = document.querySelector("#playagain-btn");

let playersData = [];

//Get the Players Data from local storage
if (localStorage.getItem("playersDataRaceto100")) {
  const storedPlayersData = JSON.parse(
    localStorage.getItem("playersDataRaceto100")
  );
  playersData = storedPlayersData.playersData;
} else {
  playersData = [];
}

//create Tabulator on DOM element with id "score-board"
var table = new Tabulator("#score-board", {
  data: playersData, //assign data to table
  layout: "fitColumns", //fit columns to width of table (optional)
  columns: [
    //Define Table Columns
    { title: "Player", field: "name", width: 150 },
    { title: "Games Played", field: "gamesPlayed" },
    { title: "Games Won", field: "gamesWon" },
    { title: "Total Score", field: "totalScore" },
  ],
});

playagainBtn.addEventListener("click", () => {
  location.assign("/game.html");
});
