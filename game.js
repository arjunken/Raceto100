//Declarations and DOM handles
//common variables
const gameContainer = document.querySelector(".game-container");
const winnerDisplayBox = document.querySelector(".winner-display");
const winnerDisplayName = document.querySelector(".winner-display span");
const winnerScores = document.querySelector(".scores");
const winnerAvatar = document.querySelector("#winner-avatar");
const afterGameNav = document.querySelector(".after-game-nav");
const scoreboardBtn = document.querySelector("#scoreboard-btn");
const playagainBtn = document.querySelector("#playagain-btn");
const newGameBtn = document.querySelector("#newgame-btn");
const editProfileBtn = document.querySelector("#editprofile-btn");
const diceRollAudio = document.getElementById("dice-roll-audio");
const diceResultAudio = document.getElementById("dice-result-audio");
const diceWinnerAudio = document.getElementById("dice-winner-audio");
const goldCollectAudio = document.getElementById("gold-collect-audio");
const goldLostAudio = document.getElementById("gold-lost-audio");
const diamondsCollectAudio = document.getElementById("diamonds-collect-audio");
const pitruAudio = document.getElementById("pitru-audio");
const npcNumbers = document.querySelector(".npc-numbers");
const rapContainer = document.querySelector(".rap-container");
//Player1 variables
const p1Score = document.querySelector("#score-p1");
const p1CardTitle = document.querySelector("#player1-card");
const p1ProfilePic = document.querySelector(".p1-profile-pic");
const chp1 = document.querySelector(".chp1");
const rollBtn1 = document.querySelector("#btn-roll-p1");
const p1pointer = document.querySelector(".player1-pointer");
const diceImageP1 = document.querySelector("#dice-p1");
const diceResultsP1 = document.querySelector(".dice-results-p1");
const emojiP1 = document.querySelector("#p1emoji");
const goldCoinP1 = document.querySelector("#gold-coin-p1");
const diamondCoinP1 = document.querySelector("#diamond-coin-p1");
//Player2 variables
const p2Score = document.querySelector("#score-p2");
const p2CardTitle = document.querySelector("#player2-card");
const p2ProfilePic = document.querySelector(".p2-profile-pic");
const chp2 = document.querySelector(".chp2");
const rollBtn2 = document.querySelector("#btn-roll-p2");
const p2pointer = document.querySelector(".player2-pointer");
const diceImageP2 = document.querySelector("#dice-p2");
const diceResultsP2 = document.querySelector(".dice-results-p2");
const emojiP2 = document.querySelector("#p2emoji");
const goldCoinP2 = document.querySelector("#gold-coin-p2");
const diamondCoinP2 = document.querySelector("#diamond-coin-p2");

//Global variables
const TARGET = 10;
let playerOne = "Player 1";
let playerTwo = "Player 2";
const ROBOT_INTEL = [
  [0, 1, 5, 15, 30, 50],
  [2, 3, 5, 10, 40, 40],
  [2, 3, 10, 15, 25, 45],
  [5, 10, 15, 20, 20, 30],
];
const SHAKUNI_LASTDICE_CHANCE = 70;
const SMARTNESS = ROBOT_INTEL[Math.floor(Math.random() * 4)];

//Get the current player names
let storedPlayersData = JSON.parse(localStorage.getItem("playersDataRaceto100"));
//Check Recent Players and get the index
if (storedPlayersData.recentPlayers.length > 0) {
  playerOne = storedPlayersData.recentPlayers[0];
  playerTwo = storedPlayersData.recentPlayers[1];
  let p1Index = storedPlayersData.players.findIndex((name) => {
    return name === playerOne;
  });
  let p2Index = storedPlayersData.players.findIndex((name) => {
    return name === playerTwo;
  });

  //******GAME SESSION CODE ******
  //Display game container
  gameContainer.classList.remove("d-none");
  p1CardTitle.innerHTML = playerOne;
  p2CardTitle.innerHTML = playerTwo;
  let player1Score = 0;
  let player2Score = 0;
  let goldEarnedP1 = storedPlayersData.playersData[p1Index].gold;
  let diamondsEarnedP1 = storedPlayersData.playersData[p1Index].diamond;
  let goldEarnedP2 = storedPlayersData.playersData[p2Index].gold;
  let diamondsEarnedP2 = storedPlayersData.playersData[p2Index].diamond;

  //Display relevant profile pics
  p1ProfilePic.src = storedPlayersData.playersData[p1Index].avatar;
  p2ProfilePic.src = storedPlayersData.playersData[p2Index].avatar;

  //Displayed Earned Coins
  goldCoinP1.innerHTML = goldEarnedP1;
  goldCoinP2.innerHTML = goldEarnedP2;
  diamondCoinP1.innerHTML = diamondsEarnedP1;
  diamondCoinP2.innerHTML = diamondsEarnedP2;

  //Generate and Display rewards and penalty numbers
  //Generate unique random numbers
  rapContainer.classList.remove("d-none");
  let randomNumberArray = [];
  let randomNumberMax = Math.floor(TARGET * 0.15);
  do {
    let temp = Math.floor(Math.random() * (TARGET - Math.floor(TARGET * 0.1)) + Math.floor(TARGET * 0.1));
    if (!randomNumberArray.includes(temp)) {
      randomNumberArray.push(temp);
    }
  } while (randomNumberArray.length < randomNumberMax);

  randomNumberArray.sort(function (a, b) {
    return a - b;
  });

  //Generate Reward and Penalty numbers
  let npcArray = [];
  const rap = [0, 1, 2];
  const rapChance = [52, 40, 8];
  do {
    npcArray.push(chance.weighted(rap, rapChance));
    // if (npcArray.length == randomNumberMax - 1 && !npcArray.includes(2)) {
    // //   npcArray = [];
    // // }
  } while (npcArray.length < randomNumberMax);

  for (let i = 0; i < randomNumberMax; i++) {
    const npcNumberTag = document.createElement("span");
    switch (npcArray[i]) {
      case 0:
        npcNumberTag.classList.add("card-text", "gold");
        break;
      case 1:
        npcNumberTag.classList.add("card-text", "penalty");
        break;
      case 2:
        npcNumberTag.classList.add("card-text", "diamond");
        break;
    }
    npcNumberTag.textContent = randomNumberArray[i];
    npcNumbers.append(npcNumberTag);
  }
  //When Player One clicks the roll button

  rollBtn1.addEventListener("click", (e) => {
    const result = playDice(
      diceRollAudio,
      rollBtn1,
      rollBtn2,
      chp1,
      chp2,
      p1pointer,
      p2pointer,
      diceImageP1,
      p1Index,
      p2Index,
      diceResultAudio,
      diceResultsP1,
      player1Score,
      player2Score,
      goldEarnedP1,
      goldEarnedP2,
      diamondsEarnedP1,
      diamondsEarnedP2,
      emojiP1,
      playerOne,
      npcArray,
      p1Score,
      goldCoinP1,
      diamondCoinP1,
      goldCollectAudio,
      goldLostAudio,
      randomNumberArray,
      diamondsCollectAudio,
      gameContainer,
      winnerDisplayBox,
      winnerAvatar,
      diceWinnerAudio,
      afterGameNav,
      winnerDisplayName,
      storedPlayersData,
      winnerScores,
      pitruAudio
    );

    result
      .then((data) => {
        player1Score = data[0];
        goldEarnedP1 = data[1];
        diamondsEarnedP1 = data[2];
      })
      .then(() => {
        if (playerTwo === "Shakuni-The ROBOT") {
          const result = playDice(
            diceRollAudio,
            rollBtn2,
            rollBtn1,
            chp2,
            chp1,
            p2pointer,
            p1pointer,
            diceImageP2,
            p2Index,
            p1Index,
            diceResultAudio,
            diceResultsP2,
            player2Score,
            player1Score,
            goldEarnedP2,
            goldEarnedP1,
            diamondsEarnedP2,
            diamondsEarnedP1,
            emojiP2,
            playerTwo,
            npcArray,
            p2Score,
            goldCoinP2,
            diamondCoinP2,
            goldCollectAudio,
            goldLostAudio,
            randomNumberArray,
            diamondsCollectAudio,
            gameContainer,
            winnerDisplayBox,
            winnerAvatar,
            diceWinnerAudio,
            afterGameNav,
            winnerDisplayName,
            storedPlayersData,
            winnerScores,
            pitruAudio
          );

          result
            .then((data) => {
              player2Score = data[0];
              goldEarnedP2 = data[1];
              diamondsEarnedP2 = data[2];
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  //When Player Two clicks the roll button
  rollBtn2.addEventListener("click", (e) => {
    const result = playDice(
      diceRollAudio,
      rollBtn2,
      rollBtn1,
      chp2,
      chp1,
      p2pointer,
      p1pointer,
      diceImageP2,
      p2Index,
      p1Index,
      diceResultAudio,
      diceResultsP2,
      player2Score,
      player1Score,
      goldEarnedP2,
      goldEarnedP1,
      diamondsEarnedP2,
      diamondsEarnedP1,
      emojiP2,
      playerTwo,
      npcArray,
      p2Score,
      goldCoinP2,
      diamondCoinP2,
      goldCollectAudio,
      goldLostAudio,
      randomNumberArray,
      diamondsCollectAudio,
      gameContainer,
      winnerDisplayBox,
      winnerAvatar,
      diceWinnerAudio,
      afterGameNav,
      winnerDisplayName,
      storedPlayersData,
      winnerScores,
      pitruAudio
    );

    result
      .then((data) => {
        player2Score = data[0];
        goldEarnedP2 = data[1];
        diamondsEarnedP2 = data[2];
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  playagainBtn.addEventListener("click", () => {
    location.assign("game.html");
  });
  scoreboardBtn.addEventListener("click", () => {
    location.assign("scoreboard.html");
  });
  newGameBtn.addEventListener("click", () => {
    location.assign("index.html");
  });
  editProfileBtn.addEventListener("click", () => {
    location.assign("playerprofiles.html");
  });
} else {
  location.assign("index.html");
}
//******END OF GAME SESSION CODE ******
