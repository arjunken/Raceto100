//Declarations and DOM handles
const submit = document.getElementById("btnDataFromUser");
const form = document.getElementById("userInputs");
const inputsWindow = document.getElementById("players-name-input");
const testInput = /^[a-zA-Z]{3,}$/;

//Display recent players names in input fields
let storedRecentPlayers = JSON.parse(
  localStorage.getItem("recentPlayersRaceto100")
);
if (storedRecentPlayers) {
  form.p1input.value = storedRecentPlayers[0];
  form.p2input.value = storedRecentPlayers[1];
}

//Handle the user inputs window submit button
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValid = testInput.test(form.p1input.value);
  inputValid = testInput.test(form.p2input.value);

  //verify if user inputs proper names
  if (inputValid) {
    //Store Data locally
    //--Check if the players data exists.
    if (localStorage.getItem("playersDataRaceto100")) {
      //Get the players data
      const storedPlayersData = JSON.parse(
        localStorage.getItem("playersDataRaceto100")
      );
      //See if player names entered match with existing players
      const nameCheckP1 = storedPlayersData.players.find((name) => {
        return name === form.p1input.value;
      });
      const nameCheckP2 = storedPlayersData.players.find((name) => {
        return name === form.p2input.value;
      });

      //Update the first player
      if (!nameCheckP1) {
        const newPlayer = {
          name: form.p1input.value,
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
        };
        storedPlayersData.players.push(form.p1input.value);
        storedPlayersData.playersData.push(newPlayer);
        const newPlayersData = {
          players: storedPlayersData.players,
          playersData: storedPlayersData.playersData,
        };
        localStorage.setItem(
          "playersDataRaceto100",
          JSON.stringify(newPlayersData)
        );
      }
      //Update the second player
      if (!nameCheckP2) {
        const newPlayer = {
          name: form.p2input.value,
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
        };
        storedPlayersData.players.push(form.p2input.value);
        storedPlayersData.playersData.push(newPlayer);
        const newPlayersData = {
          players: storedPlayersData.players,
          playersData: storedPlayersData.playersData,
        };
        localStorage.setItem(
          "playersDataRaceto100",
          JSON.stringify(newPlayersData)
        );
      }
    } else {
      // If players data does not exist perform below function
      const playersData = {
        players: [form.p1input.value, form.p2input.value],
        playersData: [
          {
            name: form.p1input.value,
            gamesPlayed: 0,
            gamesWon: 0,
            totalScore: 0,
          },
          {
            name: form.p2input.value,
            gamesPlayed: 0,
            gamesWon: 0,
            totalScore: 0,
          },
        ],
      };
      localStorage.setItem("playersDataRaceto100", JSON.stringify(playersData));
    }

    //Store Recent Players names
    const recentPlayers = [form.p1input.value, form.p2input.value];
    localStorage.setItem(
      "recentPlayersRaceto100",
      JSON.stringify(recentPlayers)
    );
    location.assign("/game.html");
  }
});
