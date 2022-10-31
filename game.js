//Declarations and DOM handles
const gameContainer = document.querySelector(".game-container");
const p1Score = document.querySelector("#score-p1");
const p2Score = document.querySelector("#score-p2");
const p1CardTitle = document.querySelector("#player1-card");
const p2CardTitle = document.querySelector("#player2-card");
const p1ProfilePic = document.querySelector(".p1-profile-pic");
const p2ProfilePic = document.querySelector(".p2-profile-pic");
const chp1 = document.querySelector(".chp1");
const chp2 = document.querySelector(".chp2");
const rollBtn1 = document.querySelector("#btn-roll-p1");
const rollBtn2 = document.querySelector("#btn-roll-p2");
const p1pointer = document.querySelector(".player1-pointer");
const p2pointer = document.querySelector(".player2-pointer");
const diceImageP1 = document.querySelector("#dice-p1");
const diceImageP2 = document.querySelector("#dice-p2");
const diceResultsP1 = document.querySelector(".dice-results-p1");
const diceResultsP2 = document.querySelector(".dice-results-p2");
const emojiP1 = document.querySelector("#p1emoji");
const emojiP2 = document.querySelector("#p2emoji");
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
const dancer1 = document.querySelector(".dancer1");
const dancer2 = document.querySelector(".dancer2");
const TARGET = 10;
const DANCEGIFS = 15;
let playerOne = "Player 1";
let playerTwo = "Player 2";

//Get the current player names
let storedPlayersData = JSON.parse(
  localStorage.getItem("playersDataRaceto100")
);

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

  //Display relevant profile pics
  p1ProfilePic.src = storedPlayersData.playersData[p1Index].avatar;
  p2ProfilePic.src = storedPlayersData.playersData[p2Index].avatar;

  //When Player One clicks the roll button

  rollBtn1.addEventListener("click", (e) => {
    diceRollAudio.play();
    //disable the roll button
    rollBtn1.disabled = true;
    //Dice Code
    diceImageP1.setAttribute("src", "./gifs/dice.gif");
    setTimeout(() => {
      diceResultAudio.play();
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      diceImageP1.setAttribute("src", `./images/dice${randomNumber}.png`);
      diceResultsP1.innerHTML = `You got ${randomNumber}`;
      //show emoji
      if (player1Score + randomNumber >= player2Score) {
        emojiP1.setAttribute("src", `./images/happy${randomNumber}.svg`);
      } else {
        emojiP1.setAttribute("src", `./images/sad${randomNumber}.svg`);
      }

      //Add dice results to the player 1 score
      let increment = 0;
      const timer = setInterval(() => {
        p1Score.innerHTML = player1Score + increment;
        if (increment === randomNumber) {
          player1Score + randomNumber > TARGET
            ? (p1Score.innerHTML = player1Score)
            : (player1Score += randomNumber);
          clearInterval(timer);
        } else {
          increment++;
        }
      }, 100);
      if (player1Score + randomNumber == TARGET) {
        //End the game
        rollBtn1.disabled = true;
        rollBtn2.disabled = true;
        rollBtn1.classList.remove("btn-primary");
        rollBtn2.classList.remove("btn-primary");
        rollBtn1.classList.add("btn-light", "text-muted");
        rollBtn2.classList.add("btn-light", "text-muted");
        chp1.classList.replace("bg-opacity-75", "bg-opacity-25");
        chp2.classList.replace("bg-opacity-75", "bg-opacity-25");
        p1pointer.classList.add("d-none");
        p2pointer.classList.add("d-none");
        gameContainer.classList.add("d-none");
        winnerDisplayBox.classList.remove("d-none");
        winnerAvatar.src = storedPlayersData.playersData[p1Index].avatar;
        winnerScores.innerHTML = `Earned ${player1Score + randomNumber} points`;
        const winnerAudioSource = document.createElement("source");
        winnerAudioSource.setAttribute(
          "src",
          `./sounds/celebrate${randomNumber}.wav`
        );
        winnerAudioSource.setAttribute("type", "audio/wav");
        diceWinnerAudio.append(winnerAudioSource);
        diceWinnerAudio.play();
        afterGameNav.classList.remove("d-none");
        winnerDisplayName.innerHTML = `${playerOne} Wins!`;
        // dancer1.setAttribute(
        //   "src",
        //   `./gifs/dance${Math.floor(Math.random() * DANCEGIFS + 1)}.gif`
        // );
        // dancer2.setAttribute(
        //   "src",
        //   `./gifs/dance${Math.floor(Math.random() * DANCEGIFS + 1)}.gif`
        // );

        if (p1Index >= 0 && p2Index >= 0) {
          storedPlayersData.playersData[p1Index].gamesPlayed += 1;
          storedPlayersData.playersData[p2Index].gamesPlayed += 1;
          storedPlayersData.playersData[p1Index].gamesWon += 1;
          storedPlayersData.playersData[p1Index].totalScore +=
            player1Score + randomNumber;
          storedPlayersData.playersData[p2Index].totalScore += player2Score;
          localStorage.setItem(
            "playersDataRaceto100",
            JSON.stringify(storedPlayersData)
          );
        }
      } else {
        diceResultsP1.classList.remove("d-none");
        setTimeout(() => {
          diceResultsP1.classList.add("d-none");
          //Initialize things
          rollBtn2.disabled = false;
          rollBtn1.classList.add("btn-light", "text-muted");
          rollBtn2.classList.remove("btn-light", "text-muted");
          rollBtn2.classList.add("btn-primary");
          chp1.classList.replace("bg-opacity-75", "bg-opacity-25");
          chp2.classList.replace("bg-opacity-25", "bg-opacity-75");
          p1pointer.classList.toggle("d-none");
          p2pointer.classList.toggle("d-none");
        }, 1500);
      }
    }, 1300);
  });

  //When Player Two clicks the roll button
  rollBtn2.addEventListener("click", (e) => {
    diceRollAudio.play();
    //disable the roll button
    rollBtn2.disabled = true;

    //Dice Code
    diceImageP2.setAttribute("src", "./gifs/dice.gif");
    setTimeout(() => {
      diceResultAudio.play();
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      diceImageP2.setAttribute("src", `./images/dice${randomNumber}.png`);
      diceResultsP2.innerHTML = `You got ${randomNumber}`;
      //show emoji
      if (player2Score + randomNumber >= player1Score) {
        emojiP2.setAttribute("src", `./images/happy${randomNumber}.svg`);
      } else {
        emojiP2.setAttribute("src", `./images/sad${randomNumber}.svg`);
      }
      //Add dice results to the player 1 score
      let increment = 0;
      const timer = setInterval(() => {
        p2Score.innerHTML = player2Score + increment;
        if (increment === randomNumber) {
          player2Score + randomNumber > TARGET
            ? (p2Score.innerHTML = player2Score)
            : (player2Score += randomNumber);
          clearInterval(timer);
        } else {
          increment++;
        }
      }, 100);
      if (player2Score + randomNumber == TARGET) {
        //End the game
        rollBtn1.disabled = true;
        rollBtn2.disabled = true;
        rollBtn1.classList.remove("btn-primary");
        rollBtn2.classList.remove("btn-primary");
        rollBtn1.classList.add("btn-light", "text-muted");
        rollBtn2.classList.add("btn-light", "text-muted");
        chp1.classList.replace("bg-opacity-75", "bg-opacity-25");
        chp2.classList.replace("bg-opacity-75", "bg-opacity-25");
        p1pointer.classList.add("d-none");
        p2pointer.classList.add("d-none");
        gameContainer.classList.add("d-none");
        winnerDisplayBox.classList.remove("d-none");
        const winnerAudioSource = document.createElement("source");
        winnerAudioSource.setAttribute(
          "src",
          `./sounds/celebrate${randomNumber}.wav`
        );
        winnerAudioSource.setAttribute("type", "audio/wav");
        diceWinnerAudio.append(winnerAudioSource);
        diceWinnerAudio.play();
        afterGameNav.classList.remove("d-none");
        winnerAvatar.src = storedPlayersData.playersData[p2Index].avatar;
        winnerScores.innerHTML = `Earned ${player2Score + randomNumber} points`;
        winnerDisplayName.innerHTML = `${playerTwo} Wins!`;
        // dancer1.setAttribute(
        //   "src",
        //   `./gifs/dance${Math.floor(Math.random() * DANCEGIFS + 1)}.gif`
        // );
        // dancer2.setAttribute(
        //   "src",
        //   `./gifs/dance${Math.floor(Math.random() * DANCEGIFS + 1)}.gif`
        // );

        if (p1Index >= 0 && p2Index >= 0) {
          storedPlayersData.playersData[p2Index].gamesPlayed += 1;
          storedPlayersData.playersData[p1Index].gamesPlayed += 1;
          storedPlayersData.playersData[p2Index].gamesWon += 1;
          storedPlayersData.playersData[p2Index].totalScore +=
            player2Score + randomNumber;
          storedPlayersData.playersData[p1Index].totalScore += player2Score;
          localStorage.setItem(
            "playersDataRaceto100",
            JSON.stringify(storedPlayersData)
          );
        }
      } else {
        diceResultsP2.classList.remove("d-none");
        setTimeout(() => {
          diceResultsP2.classList.add("d-none");
          //Initialize things
          rollBtn1.disabled = false;
          rollBtn2.classList.add("btn-light", "text-muted");
          rollBtn1.classList.remove("btn-light", "text-muted");
          rollBtn1.classList.add("btn-primary");
          chp2.classList.replace("bg-opacity-75", "bg-opacity-25");
          chp1.classList.replace("bg-opacity-25", "bg-opacity-75");
          p1pointer.classList.toggle("d-none");
          p2pointer.classList.toggle("d-none");
        }, 1500);
      }
    }, 1300);
  });

  playagainBtn.addEventListener("click", () => {
    location.assign("/game.html");
  });

  scoreboardBtn.addEventListener("click", () => {
    location.assign("/scoreboard.html");
  });

  newGameBtn.addEventListener("click", () => {
    location.assign("/index.html");
  });

  editProfileBtn.addEventListener("click", () => {
    location.assign("/playerprofiles.html");
  });
} else {
  location.assign("./index.html");
}
//******END OF GAME SESSION CODE ******
