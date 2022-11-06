//Declarations and DOM handles
const playagainBtn = document.querySelector("#playagain-btn");
const newGameBtn = document.querySelector("#newgame-btn");
const editProfileBtn = document.querySelector("#editprofile-btn");
let ROBOT_NAME = "Shakuni-The Robot";

let playersData = [];

//Get the Players Data from local storage
if (localStorage.getItem("playersDataRaceto100")) {
  const storedPlayersData = JSON.parse(localStorage.getItem("playersDataRaceto100"));
  playersData = storedPlayersData.playersData;
} else {
  playersData = [];
}

//create Tabulator on DOM element with id "score-board"
var table = new Tabulator("#score-board", {
  data: playersData, //assign data to table
  layout: "fitDataFill", //fit columns to width of table (optional)
  responsiveLayout: true,
  pagination: "local",
  paginationSize: 6,
  paginationSizeSelector: [3, 6, 8, 10],
  movableColumns: true,
  paginationCounter: "rows",
  initialSort: [
    { column: "totalScore", dir: "desc" }, //sort by this first
    { column: "gamesWon", dir: "desc" }, //then sort by this second
  ],
  columns: [
    //Define Table Columns
    {
      title: "Avatar",
      field: "avatar",
      formatter: "image",
      headerSort: false,
      formatterParams: {
        height: "50px",
        width: "50px",
        urlPrefix: "",
        urlSuffix: "",
      },
    },
    { title: "Player", field: "name", width: 150, headerSort: false },
    { title: "Games Played", field: "gamesPlayed" },
    { title: "Games Won", field: "gamesWon" },
    { title: "Gold Coins", field: "gold" },
    { title: "Diamond Coins", field: "diamond" },
    { title: "Total Score", field: "totalScore" },
  ],
});

playagainBtn.addEventListener("click", () => {
  location.assign("game.html");
});

newGameBtn.addEventListener("click", () => {
  location.assign("index.html");
});

editProfileBtn.addEventListener("click", () => {
  location.assign("playerprofiles.html");
});
