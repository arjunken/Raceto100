const avatarList = document.querySelector(".avatarList");
const playerInEdit = document.querySelector(".player-in-edit");
const avatarListContainer = document.querySelector(".avatarListContainer");
const saveProfileBtn = document.querySelector("#saveprofile-btn");
const doneBtn = document.querySelector("#done-btn");
const deleteBtn = document.querySelector("#delete-btn");
const playerSelection = document.querySelector("#player-selection");
const playerName = document.getElementById("playerName");
const playerUpdateAlert = document.querySelector(".player-update-alert");
const rewardChangeAlert = document.querySelector(".reward-change-alert");
const deletePlayer = document.querySelector(".deletePlayer");
const deleteCheckBox = document.getElementById("deleteCheckBox");
const profileContainer = document.querySelector(".profile-container");
const playerStats_gamesPlayed = document.getElementById("playerStats_gamesPlayed");
const playerStats_gamesWon = document.getElementById("playerStats_gamesWon");
const playerStats_goldMined = document.getElementById("playerStats_goldMined");
const playerStats_diamondsMined = document.getElementById("playerStats_diamondsMined");
const playerStats_totalScore = document.getElementById("playerStats_totalScore");
let ROBOT_NAME = "Shakuni-The Robot";
const TOTAL_AVATARS = 44;

let newAvatar;
let newPlayerName;
let deletePlayerList = [];
let selectedPlayerIndex = 1;

//Get the Players Data
let storedPlayersData = JSON.parse(localStorage.getItem("playersDataRaceto100"));

if (storedPlayersData) {
  //Get the URL Query string if available
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  for (let i = 1; i < storedPlayersData.players.length; i++) {
    if (storedPlayersData.players[i] === params.player) {
      selectedPlayerIndex = i;
    }
  }
  for (let i = 1; i <= TOTAL_AVATARS; i++) {
    const avatarImgTag = document.createElement("img");
    if (i <= storedPlayersData.playersData[selectedPlayerIndex].earnedAvatars) {
      avatarImgTag.classList.add("avtr-img");
      avatarImgTag.disabled = false;
    } else {
      avatarImgTag.classList.add("avtr-img-locked");
      avatarImgTag.disabled = true;
    }
    avatarImgTag.classList.add("rounded-2");
    avatarImgTag.src = `avatars/avatar${i}.jpg`;
    avatarList.append(avatarImgTag);
  }

  avatarListContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      playerInEdit.src = e.target.src;
      newAvatar = e.path[0].attributes.src.value;
      if (
        storedPlayersData.playersData[selectedPlayerIndex].avatarsOnSale.includes(
          parseInt(newAvatar.replace(/[^0-9]/g, ""))
        )
      ) {
        rewardChangeAlert.classList.remove("d-none");
        console.log("Working");
      } else {
        rewardChangeAlert.classList.add("d-none");
      }
    }
  });

  for (let i = 1; i < storedPlayersData.players.length; i++) {
    const optionTag = document.createElement("option");
    optionTag.value = storedPlayersData.playersData[i].avatar;
    optionTag.textContent = storedPlayersData.players[i];
    if (i === selectedPlayerIndex) {
      optionTag.selected = true;
    }
    playerSelection.append(optionTag);
  }

  playerInEdit.src = storedPlayersData.playersData[selectedPlayerIndex].avatar;
  playerName.value = storedPlayersData.playersData[selectedPlayerIndex].name;
  let curPlayerName = storedPlayersData.playersData[selectedPlayerIndex].name;
  newPlayerName = storedPlayersData.playersData[selectedPlayerIndex].name;
  newAvatar = storedPlayersData.playersData[selectedPlayerIndex].avatar;

  playerSelection.addEventListener("change", (e) => {
    playerInEdit.src = storedPlayersData.playersData[e.target.selectedIndex + 1].avatar;
    playerName.value = storedPlayersData.playersData[e.target.selectedIndex + 1].name;
    selectedPlayerIndex = e.target.selectedIndex + 1;
    newPlayerName = playerName.value;
    if (!deletePlayerList.includes(selectedPlayerIndex)) {
      deletePlayer.classList.add("d-none");
    } else {
      deletePlayer.classList.remove("d-none");
      deleteCheckBox.checked = true;
    }
    avatarList.innerHTML = "";
    for (let i = 1; i <= TOTAL_AVATARS; i++) {
      const avatarImgTag = document.createElement("img");
      if (i <= storedPlayersData.playersData[selectedPlayerIndex].earnedAvatars) {
        avatarImgTag.classList.add("avtr-img");
        avatarImgTag.disabled = false;
      } else {
        avatarImgTag.classList.add("avtr-img-locked");
        avatarImgTag.disabled = true;
      }
      avatarImgTag.classList.add("rounded-2");
      avatarImgTag.src = `avatars/avatar${i}.jpg`;
      avatarList.append(avatarImgTag);
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
    if (
      storedPlayersData.playersData[selectedPlayerIndex].avatarsOnSale.includes(
        parseInt(newAvatar.replace(/[^0-9]/g, ""))
      )
    ) {
      storedPlayersData.playersData[selectedPlayerIndex].gold >= 50
        ? (storedPlayersData.playersData[selectedPlayerIndex].gold -= 50)
        : (storedPlayersData.playersData[selectedPlayerIndex].diamond -= 5);
    }
    localStorage.setItem("playersDataRaceto100", JSON.stringify(storedPlayersData));
    playerUpdateAlert.classList.remove("d-none");
    setTimeout(() => {
      playerUpdateAlert.classList.add("d-none");
    }, 1000);
    location.reload();
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
        if (storedPlayersData.recentPlayers.includes(storedPlayersData.players[deletePlayerList[i]])) {
          storedPlayersData.recentPlayers = [];
        }
        storedPlayersData.players.splice(deletePlayerList[i], 1);
        storedPlayersData.playersData.splice(deletePlayerList[i], 1);
      }
      localStorage.setItem("playersDataRaceto100", JSON.stringify(storedPlayersData));
    }
    location.assign("scoreboard.html");
  });

  //Display Player Statistics
  const playerEarnings = [
    storedPlayersData.playersData[selectedPlayerIndex].gamesPlayed,
    storedPlayersData.playersData[selectedPlayerIndex].gamesWon,
    storedPlayersData.playersData[selectedPlayerIndex].gold,
    storedPlayersData.playersData[selectedPlayerIndex].diamond,
    storedPlayersData.playersData[selectedPlayerIndex].totalScore,
  ];

  const trElements = [
    playerStats_gamesPlayed,
    playerStats_gamesWon,
    playerStats_goldMined,
    playerStats_diamondsMined,
    playerStats_totalScore,
  ];
  for (let i = 0; i < 5; i++) {
    const tdElement = document.createElement("td");
    tdElement.innerHTML = playerEarnings[i];
    trElements[i].append(tdElement);
  }
} else {
  profileContainer.innerHTML = "No Players to Edit. Start a new game.";
  setTimeout(() => {
    location.assign("scoreboard.html");
  }, 2000);
}
