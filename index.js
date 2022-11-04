//Declarations and DOM handles
const submit = document.getElementById("btnDataFromUser");
const form = document.getElementById("userInputs");
const inputsWindow = document.getElementById("players-name-input");
const formValidation = document.querySelector(".formvalidation");
const choosePlayerP1 = document.querySelector("#choose-player-p1");
const choosePlayerP2 = document.querySelector("#choose-player-p2");
const p1InputNew = document.querySelector(".p1inputnew");
const p2InputNew = document.querySelector(".p2inputnew");
const playerAvailabilityCheck = document.querySelector(".player-availability-check");
const inputValidCheck = document.querySelector(".input-valid-check");
const testInput = /^[a-zA-Z0-9]{3,}$/;
let player1 = null;
let player2 = null;
let playersDataExists = false;

//Display recent players names in input fields
let storedPlayersData = JSON.parse(localStorage.getItem("playersDataRaceto100"));

//display existing players if they exist in the system
if (storedPlayersData) {
  if (storedPlayersData.players.length > 0) {
    for (let i = 0; i < storedPlayersData.players.length; i++) {
      const optionTag = document.createElement("option");
      optionTag.setAttribute("value", i);
      optionTag.textContent = storedPlayersData.players[i];
      if (storedPlayersData.recentPlayers[0] === storedPlayersData.players[i]) {
        optionTag.selected = true;
      }
      choosePlayerP1.insertBefore(optionTag, choosePlayerP1.lastChild);
    }
    for (let i = 0; i < storedPlayersData.players.length; i++) {
      const optionTag = document.createElement("option");
      optionTag.setAttribute("value", i);
      optionTag.textContent = storedPlayersData.players[i];
      if (storedPlayersData.recentPlayers[1] === storedPlayersData.players[i]) {
        optionTag.selected = true;
      }
      choosePlayerP2.insertBefore(optionTag, choosePlayerP2.lastChild);
    }
    playersDataExists = true;
  }
}

if (choosePlayerP1.options[choosePlayerP1.selectedIndex].value >= 0) {
  player1 = choosePlayerP1.options[choosePlayerP1.selectedIndex].text;
}
if (choosePlayerP2.options[choosePlayerP2.selectedIndex].value >= 0) {
  player2 = choosePlayerP2.options[choosePlayerP2.selectedIndex].text;
}

if (player1 && player2) {
  submit.disabled = false;
} else {
  submit.disabled = true;
}

//Handle new player option selection
choosePlayerP1.addEventListener("change", (e) => {
  if (e.target.value == -1) {
    p1InputNew.value = "";
    p1InputNew.classList.remove("d-none");
    player1 = null;
  } else if (e.target.value == -2) {
    p1InputNew.classList.add("d-none");
    player1 = null;
  } else {
    p1InputNew.classList.add("d-none");
    player1 = choosePlayerP1.options[choosePlayerP1.selectedIndex].text;
    playerAvailabilityCheck.classList.add("d-none");
    inputValidCheck.classList.add("d-none");
  }
  if (player1 && player2) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
});

choosePlayerP2.addEventListener("change", (e) => {
  if (e.target.value == -1) {
    p2InputNew.value = "";
    p2InputNew.classList.remove("d-none");
    player2 = null;
  } else if (e.target.value == -2) {
    player2 = null;
    p2InputNew.classList.add("d-none");
  } else {
    submit.disabled = false;
    p2InputNew.classList.add("d-none");
    player2 = choosePlayerP2.options[choosePlayerP2.selectedIndex].text;
    playerAvailabilityCheck.classList.add("d-none");
    inputValidCheck.classList.add("d-none");
  }
  if (player1 && player2) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
});

//Check input field validation for new player 1
p1InputNew.addEventListener("focusout", (e) => {
  let validInput = true;
  if (choosePlayerP1.options[choosePlayerP1.selectedIndex].value == -1) {
    if (playersDataExists && storedPlayersData.players.includes(e.target.value)) {
      playerAvailabilityCheck.classList.remove("d-none");
      validInput = false;
    } else {
      playerAvailabilityCheck.classList.add("d-none");
    }

    if (!testInput.test(e.target.value)) {
      inputValidCheck.classList.remove("d-none");
      validInput = false;
    } else {
      inputValidCheck.classList.add("d-none");
    }

    if (e.target.value === p2InputNew.value) {
      validInput = false;
      formValidation.classList.remove("d-none");
    } else {
      formValidation.classList.add("d-none");
    }

    if (validInput) {
      player1 = e.target.value;
    }

    if (player1 && player2 && validInput) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  }
});

//Check input field validation for new player 2
p2InputNew.addEventListener("focusout", (e) => {
  let validInput = true;
  if (choosePlayerP2.options[choosePlayerP2.selectedIndex].value == -1) {
    if (playersDataExists && storedPlayersData.players.includes(e.target.value)) {
      playerAvailabilityCheck.classList.remove("d-none");
      validInput = false;
    } else {
      playerAvailabilityCheck.classList.add("d-none");
    }

    if (!testInput.test(e.target.value)) {
      inputValidCheck.classList.remove("d-none");
      validInput = false;
    } else {
      inputValidCheck.classList.add("d-none");
    }
    if (e.target.value === p1InputNew.value) {
      validInput = false;
      formValidation.classList.remove("d-none");
    } else {
      formValidation.classList.add("d-none");
    }
    if (validInput) {
      player2 = e.target.value;
    }
    if (player1 && player2 && validInput) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  }
});

//Handle the user inputs window submit button
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const selectOptionP1 = choosePlayerP1.options[choosePlayerP1.selectedIndex].value;
  const selectOptionP2 = choosePlayerP2.options[choosePlayerP2.selectedIndex].value;
  const typedPlayerP1 = p1InputNew.value;
  const typedPlayerP2 = p2InputNew.value;

  if (!playersDataExists) {
    const newPlayer = {
      recentPlayers: [player1, player2],
      players: [player1, player2],
      playersData: [
        {
          id: 0,
          name: player1,
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
          gold: 0,
          diamond: 0,
          avatar: "avatars/avatar0.jpg",
        },
        {
          id: 1,
          name: player2,
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
          gold: 0,
          diamond: 0,
          avatar: "avatars/avatar0.jpg",
        },
      ],
    };
    localStorage.setItem("playersDataRaceto100", JSON.stringify(newPlayer));
    storedPlayersData = JSON.parse(localStorage.getItem("playersDataRaceto100"));
    //Take Users to Game Page
    location.assign("game.html");
  } else {
    //Update the first player
    if (selectOptionP1 == -1) {
      const newPlayer = {
        id: storedPlayersData.players.length,
        name: typedPlayerP1,
        gamesPlayed: 0,
        gamesWon: 0,
        totalScore: 0,
        gold: 0,
        diamond: 0,
        avatar: "/avatars/avatar0.jpg",
      };
      storedPlayersData.recentPlayers[0] = typedPlayerP1;
      storedPlayersData.players.push(typedPlayerP1);
      storedPlayersData.playersData.push(newPlayer);
    } else {
      storedPlayersData.recentPlayers[0] = player1;
    }

    //Update the second player
    if (selectOptionP2 == -1) {
      const newPlayer = {
        id: storedPlayersData.players.length,
        name: typedPlayerP2,
        gamesPlayed: 0,
        gamesWon: 0,
        totalScore: 0,
        gold: 0,
        diamond: 0,
        avatar: "avatars/avatar0.jpg",
      };
      storedPlayersData.recentPlayers[1] = typedPlayerP2;
      storedPlayersData.players.push(typedPlayerP2);
      storedPlayersData.playersData.push(newPlayer);
    } else {
      storedPlayersData.recentPlayers[1] = player2;
    }

    localStorage.setItem("playersDataRaceto100", JSON.stringify(storedPlayersData));
    //Take Users to Game Page
    console.log(window.location.href);
    location.assign("game.html");
  }
});
