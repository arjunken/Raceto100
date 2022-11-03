//Sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Increase the Players Scores
const scoreIncreaser = (htmlScoreHandle, currentScore, target) => {
  let change = 0;
  const timer = setInterval(() => {
    htmlScoreHandle.innerHTML = currentScore + change;
    change === target ? clearInterval(timer) : change++;
  }, 100);
};

//Handle display of Dice Results
const displayDiceResults = (
  thisDiceResults,
  thisRollBtn,
  otherRollBtn,
  thisChp,
  otherChp,
  thisPointer,
  otherPointer
) => {
  thisDiceResults.classList.remove("d-none");
  setTimeout(() => {
    thisDiceResults.classList.add("d-none");
    //Initialize things
    otherRollBtn.disabled = false;
    thisRollBtn.classList.add("btn-light", "text-muted");
    otherRollBtn.classList.remove("btn-light", "text-muted");
    thisChp.classList.replace("bg-opacity-75", "bg-opacity-25");
    otherChp.classList.replace("bg-opacity-25", "bg-opacity-75");
    thisPointer.classList.toggle("d-none");
    otherPointer.classList.toggle("d-none");
  }, 1500);
};

//Function to end the game
const endTheGame = (
  thisRollBtn,
  otherRollBtn,
  thisChp,
  otherChp,
  thisPointer,
  otherPointer,
  gameContainer,
  winnerDisplayBox,
  thisIndex,
  otherIndex,
  thisPlayerScore,
  loserScore,
  winningPlayer,
  winnerGoldEarned,
  loserGoldEarned,
  winnerDiamondsEarned,
  loserDiamondsEarned,
  winnerAvatar,
  diceWinnerAudio,
  afterGameNav,
  winnerDisplayName,
  storedPlayersData,
  randomNumber,
  winnerScores
) => {
  thisRollBtn.disabled = true;
  otherRollBtn.disabled = true;
  thisRollBtn.classList.add("btn-light", "text-muted");
  otherRollBtn.classList.add("btn-light", "text-muted");
  thisChp.classList.replace("bg-opacity-75", "bg-opacity-25");
  otherChp.classList.replace("bg-opacity-75", "bg-opacity-25");
  thisPointer.classList.add("d-none");
  otherPointer.classList.add("d-none");
  gameContainer.classList.add("d-none");
  winnerDisplayBox.classList.remove("d-none");
  rapContainer.classList.add("d-none");
  winnerAvatar.src = storedPlayersData.playersData[thisIndex].avatar;
  winnerScores.innerHTML = `Earned ${thisPlayerScore} points`;
  const winnerAudioSource = document.createElement("source");
  winnerAudioSource.setAttribute("src", `./sounds/celebrate${randomNumber}.wav`);
  winnerAudioSource.setAttribute("type", "audio/wav");
  diceWinnerAudio.append(winnerAudioSource);
  diceWinnerAudio.play();
  afterGameNav.classList.remove("d-none");
  winnerDisplayName.innerHTML = `${winningPlayer} Wins!`;

  if (thisIndex >= 0 && otherIndex >= 0) {
    storedPlayersData.playersData[thisIndex].gamesPlayed += 1;
    storedPlayersData.playersData[otherIndex].gamesPlayed += 1;
    storedPlayersData.playersData[thisIndex].gamesWon += 1;
    storedPlayersData.playersData[thisIndex].totalScore += thisPlayerScore;
    storedPlayersData.playersData[otherIndex].totalScore += loserScore;
    storedPlayersData.playersData[thisIndex].gold = winnerGoldEarned;
    storedPlayersData.playersData[thisIndex].diamond = winnerDiamondsEarned;
    storedPlayersData.playersData[otherIndex].gold = loserGoldEarned;
    storedPlayersData.playersData[otherIndex].diamond = loserDiamondsEarned;
    localStorage.setItem("playersDataRaceto100", JSON.stringify(storedPlayersData));
  }
};

//Function to play dice
const playDice = async (
  diceRollAudio,
  thisRollBtn,
  otherRollBtn,
  thisChp,
  otherChp,
  thisPointer,
  otherPointer,
  thisDiceImage,
  thisIndex,
  otherIndex,
  diceResultAudio,
  thisDiceResults,
  thisPlayerScore,
  otherPlayerScore,
  thisGoldEarned,
  otherGoldEarned,
  thisDiamondsEarned,
  otherDiamondsEarned,
  thisEmoji,
  playerX,
  npcArray,
  thisScore,
  thisGoldCoin,
  thisDiamondCoin,
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
  winnerScores
) => {
  diceRollAudio.play();
  //disable the roll button
  thisRollBtn.disabled = true;

  //Dice Code
  thisDiceImage.setAttribute("src", "./gifs/dice.gif");
  await sleep(1300);

  diceResultAudio.play();
  let randomNumber = Math.floor(Math.random() * 6 + 1);
  thisDiceImage.setAttribute("src", `./images/dice${randomNumber}.png`);
  thisDiceResults.innerHTML = `You got ${randomNumber}`;
  thisPlayerScore += randomNumber;

  if (thisPlayerScore > TARGET) {
    displayDiceResults(thisDiceResults, thisRollBtn, otherRollBtn, thisChp, otherChp, thisPointer, otherPointer);
    return [thisPlayerScore - randomNumber, thisGoldEarned, thisDiamondsEarned];
  }

  //show emoji
  if (thisPlayerScore >= otherPlayerScore) {
    thisEmoji.setAttribute("src", `./images/happy${randomNumber}.svg`);
  } else {
    thisEmoji.setAttribute("src", `./images/sad${randomNumber}.svg`);
  }

  //Add or reduce rewards for the player 1

  if (randomNumberArray.includes(thisPlayerScore)) {
    let idx = randomNumberArray.indexOf(thisPlayerScore);
    switch (npcArray[idx]) {
      case 0:
        scoreIncreaser(thisScore, thisPlayerScore - randomNumber, randomNumber);
        thisGoldEarned += 2;
        thisGoldCoin.innerHTML = thisGoldEarned;
        goldCollectAudio.play();
        break;
      case 1:
        scoreIncreaser(thisScore, thisPlayerScore - randomNumber, randomNumber);
        thisGoldEarned -= 1;
        thisGoldCoin.innerHTML = thisGoldEarned;
        goldLostAudio.play();
        break;
      case 2:
        scoreIncreaser(thisScore, thisPlayerScore - randomNumber, randomNumber);
        thisDiamondsEarned += 1;
        thisDiamondCoin.innerHTML = thisDiamondsEarned;
        diamondsCollectAudio.play();
        break;
    }
  } else {
    scoreIncreaser(thisScore, thisPlayerScore - randomNumber, randomNumber);
  }

  if (thisPlayerScore == TARGET) {
    //End the game
    endTheGame(
      thisRollBtn,
      otherRollBtn,
      thisChp,
      otherChp,
      thisPointer,
      otherPointer,
      gameContainer,
      winnerDisplayBox,
      thisIndex,
      otherIndex,
      thisPlayerScore,
      otherPlayerScore,
      playerX,
      thisGoldEarned,
      otherGoldEarned,
      thisDiamondsEarned,
      otherDiamondsEarned,
      winnerAvatar,
      diceWinnerAudio,
      afterGameNav,
      winnerDisplayName,
      storedPlayersData,
      randomNumber,
      winnerScores
    );
  } else {
    displayDiceResults(thisDiceResults, thisRollBtn, otherRollBtn, thisChp, otherChp, thisPointer, otherPointer);
  }
  return [thisPlayerScore, thisGoldEarned, thisDiamondsEarned];
};
