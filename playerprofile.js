const avatarList = document.querySelector(".avatarList");
const playerInEdit = document.querySelector(".player-in-edit");
const avatarListContainer = document.querySelector(".avatarListContainer");
const saveProfileBtn = document.querySelector("#saveprofile-btn");
const doneBtn = document.querySelector("#done-btn");
const deleteBtn = document.querySelector("#delete-btn");
const playerSelection = document.querySelector("#player-selection");
const playerName = document.getElementById("playerName");
const playerUpdateAlert = document.querySelector(".player-update-alert");
const deletePlayer = document.querySelector(".deletePlayer");
const deleteCheckBox = document.getElementById("deleteCheckBox");

const numberOfAvatars = 28;
let newAvatar;
let newPlayerName;
let selectedPlayerIndex = 0;
let deletePlayerList = [];

for (let i = 1; i <= numberOfAvatars; i++) {
  const avatarImgTag = document.createElement("img");
  avatarImgTag.classList.add("avtr-img");
  avatarImgTag.classList.add("rounded-2");
  avatarImgTag.src = `./avatars/avatar${i}.jpg`;
  avatarList.append(avatarImgTag);
}

avatarListContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    playerInEdit.src = e.target.src;
  }
  newAvatar = e.path[0].attributes.src.value;
  console.log(newAvatar);
});

//Get the Players Data
let storedPlayersData = JSON.parse(
  localStorage.getItem("playersDataRaceto100")
);

for (let i = 0; i < storedPlayersData.players.length; i++) {
  const optionTag = document.createElement("option");
  optionTag.value = storedPlayersData.playersData[i].avatar;
  optionTag.textContent = storedPlayersData.players[i];
  playerSelection.append(optionTag);
}

playerInEdit.src = storedPlayersData.playersData[0].avatar;
playerName.value = storedPlayersData.playersData[0].name;
let curPlayerName = storedPlayersData.playersData[0].name;
newPlayerName = storedPlayersData.playersData[0].name;
newAvatar = storedPlayersData.playersData[0].avatar;

playerSelection.addEventListener("change", (e) => {
  playerInEdit.src =
    storedPlayersData.playersData[e.target.selectedIndex].avatar;
  playerName.value = storedPlayersData.playersData[e.target.selectedIndex].name;
  selectedPlayerIndex = e.target.selectedIndex;
  newPlayerName = playerName.value;
  if (!deletePlayerList.includes(selectedPlayerIndex)) {
    deletePlayer.classList.add("d-none");
  } else {
    deletePlayer.classList.remove("d-none");
    deleteCheckBox.checked = true;
  }
});

playerName.addEventListener("change", (e) => {
  newPlayerName = e.target.value;
  if (storedPlayersData.recentPlayers.includes(curPlayerName)) {
    storedPlayersData.recentPlayers[i] = e.target.value;
  }
});

saveProfileBtn.addEventListener("click", () => {
  storedPlayersData.players[selectedPlayerIndex] = newPlayerName;
  storedPlayersData.playersData[selectedPlayerIndex].name = newPlayerName;
  storedPlayersData.playersData[selectedPlayerIndex].avatar = newAvatar;
  localStorage.setItem(
    "playersDataRaceto100",
    JSON.stringify(storedPlayersData)
  );
  playerUpdateAlert.classList.remove("d-none");
  setTimeout(() => {
    playerUpdateAlert.classList.add("d-none");
  }, 1000);
});

deleteBtn.addEventListener("click", () => {
  if (!deletePlayerList.includes(selectedPlayerIndex)) {
    deletePlayerList.push(selectedPlayerIndex);
    deletePlayer.classList.remove("d-none");
    deleteCheckBox.setAttribute("checked", "");
  }
});

deleteCheckBox.addEventListener("change", () => {
  if (!deleteCheckBox.checked) {
    if (deletePlayerList.includes(selectedPlayerIndex)) {
      deletePlayerList = deletePlayerList.filter((x) => {
        return x !== selectedPlayerIndex;
      });
      deleteCheckBox.setAttribute("checked", "");
      deletePlayer.classList.add("d-none");
    }
  }
});

doneBtn.addEventListener("click", () => {
  if (deletePlayerList.length) {
    for (let i = 0; i < deletePlayerList.length; i++) {
      if (
        storedPlayersData.recentPlayers.includes(
          storedPlayersData.players[deletePlayerList[i]]
        )
      ) {
        storedPlayersData.recentPlayers = [];
      }
      storedPlayersData.players.splice(deletePlayerList[i], 1);
      storedPlayersData.playersData.splice(deletePlayerList[i], 1);
    }
    localStorage.setItem(
      "playersDataRaceto100",
      JSON.stringify(storedPlayersData)
    );
  }
  location.assign("/scoreboard.html");
});
