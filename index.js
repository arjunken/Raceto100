//Declarations and DOM handles
const submit = document.getElementById("btnDataFromUser");
const form = document.getElementById("userInputs");
const inputsWindow = document.getElementById("players-name-input");
const testInput = /^[a-zA-Z0-9]{3,}$/;

//Display recent players names in input fields
let storedPlayersData = JSON.parse(
  localStorage.getItem("playersDataRaceto100")
);
if (storedPlayersData) {
  if (storedPlayersData.recentPlayers.length == 2) {
    form.p1input.value = storedPlayersData.recentPlayers[0];
    form.p2input.value = storedPlayersData.recentPlayers[1];
  }
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
    if (storedPlayersData) {
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
          id: storedPlayersData.players.length,
          name: form.p1input.value,
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
          avatar: "./avatars/avatar0.jpg",
        };
        storedPlayersData.players.push(form.p1input.value);
        storedPlayersData.playersData.push(newPlayer);
      }
      //Update the second player
      if (!nameCheckP2) {
        const newPlayer = {
          id: storedPlayersData.players.length,
          name: form.p2input.value,
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
          avatar: "./avatars/avatar0.jpg",
        };
        storedPlayersData.players.push(form.p2input.value);
        storedPlayersData.playersData.push(newPlayer);
      }
      storedPlayersData.recentPlayers[0] = form.p1input.value;
      storedPlayersData.recentPlayers[1] = form.p2input.value;
      localStorage.setItem(
        "playersDataRaceto100",
        JSON.stringify(storedPlayersData)
      );
    } else {
      // If players data does not exist perform below function
      const playersData = {
        recentPlayers: [form.p1input.value, form.p2input.value],
        players: [form.p1input.value, form.p2input.value],
        playersData: [
          {
            id: 0,
            name: form.p1input.value,
            gamesPlayed: 0,
            gamesWon: 0,
            totalScore: 0,
            avatar: "./avatars/avatar0.jpg",
          },
          {
            id: 1,
            name: form.p2input.value,
            gamesPlayed: 0,
            gamesWon: 0,
            totalScore: 0,
            avatar: "./avatars/avatar0.jpg",
          },
        ],
      };
      localStorage.setItem("playersDataRaceto100", JSON.stringify(playersData));
    }

    //Take Users to Game Page
    location.assign("/game.html");
  }
});
