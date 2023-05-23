// References to elements in page used in JS
const selectionButtons = document.querySelectorAll('#selection-container div > button');
const startBtn = document.querySelector('#start-btn');
const playAgainBtn = document.querySelector('#play-again-btn');
const scoreContainer = document.querySelector('#score-container');
const choiceContainer = document.querySelector('#choice-container');
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector("#computer-score");
const winnerContainer = document.querySelector('#winner-container');
const resultContainer = document.querySelector('#result-container');
const introContainer = document.querySelector('#intro-container');
const gameContainer = document.querySelector('#game-container');


//
//  Adding Event Listeners
//

startBtn.addEventListener('click', (e) => {
    // Hide intro elements and show game elements.
    gameContainer.classList.remove('hidden');
    introContainer.classList.add('hidden');
});

playAgainBtn.addEventListener('click', (e) => {
    // Re-enable selection buttons and reset containers and score.
    selectionButtons.forEach((button) => {
        button.disabled = false;
    });
    choiceContainer.textContent = "";
    resultContainer.textContent = "";
    winnerContainer.removeChild(winnerContainer.firstElementChild);
    playerScore.textContent = "0";
    computerScore.textContent = "0";
    playAgainBtn.classList.add('hidden');
});

selectionButtons.forEach((button) => {
    // If the button is clicked or the image in the button.
    button.addEventListener('click', (e) => {
        if (e.target.id == 'select-rock' || e.target.parentNode.id == 'select-rock') {
            playRound(0, getComputerChoice());
        }
        else if (e.target.id == 'select-paper' || e.target.parentNode.id == 'select-paper') {
            playRound(1, getComputerChoice());
        }
        else if (e.target.id == 'select-scissors' || e.target.parentNode.id == 'select-scissors') {
            playRound(2, getComputerChoice());
        }
    });
})

function displayPlayerSelection(playerSelection) {
    switch (playerSelection) {
        case 0:
            choiceContainer.textContent = "Player plays Rock! ";
            break;
        case 1:
            choiceContainer.textContent = "Player plays Paper! ";
            break;
        case 2:
            choiceContainer.textContent = "Player plays Scissors! ";
            break;
    }
}

function displayComputerSelection(computerSelection) {
    switch (computerSelection) {
        case 0:
            choiceContainer.textContent += "Computer plays Rock!";
            break;
        case 1:
            choiceContainer.textContent += "Computer plays Paper!";
            break;
        case 2:
            choiceContainer.textContent += "Computer plays Scissors!";
            break;
    }
}

function changeScore(winner) {
    // Add 1 to winner's score by converting to int, incrementing and back to string.
    if (winner == 0) {
        playerScore.textContent = String((parseInt(playerScore.textContent)) + 1);
    } 
    else {
        computerScore.textContent = String((parseInt(computerScore.textContent)) + 1);
    }

    // If there is a winner, display winner text and show play again button. Disable selection buttons as game is over.
    if (playerScore.textContent == "5" || computerScore.textContent == "5") {
        if (playerScore.textContent == "5") {
            winText = document.createElement('p');
            winText.textContent = "Player Wins!"
            winnerContainer.prepend(winText);
        }
        else {
            winText = document.createElement('p');
            winText.textContent = "Computer Wins!"
            winnerContainer.prepend(winText);
        }

        playAgainBtn.classList.remove('hidden');

        selectionButtons.forEach((button) => {
            button.disabled = true;
        });
    } 
}

function displayResult(result) {
    switch (result) {
        case 0:
            resultContainer.textContent = "Round ends in a Loss!";
            break;
        case 1:
            resultContainer.textContent = "Round ends in a Draw!";
            break;
        case 2:
            resultContainer.textContent = "Round ends in a Win!";
            break;
    }
}

function getComputerChoice() {
    // Return random number between 0 and 2.
    return Math.floor(Math.random() * 3);
}

function playRound(playerSelection, computerSelection) {
    choiceContainer.textContent = "";
    resultContainer.textContent = "";

    displayPlayerSelection(playerSelection);
    displayComputerSelection(computerSelection);
    // Display correct result depending on the selected choices of the player and computer.
    if (playerSelection == 0)
    {
        if (computerSelection == 0) {
            displayResult(1);
        }
        else if (computerSelection == 1) {
            displayResult(0);
            changeScore(1);
        }
        else if (computerSelection == 2) {
            displayResult(2)
            changeScore(0);
        }
    }
    else if (playerSelection == 1) {
        if (computerSelection == 0) {
            displayResult(2);
            changeScore(0);
        }
        else if (computerSelection == 1) {
            displayResult(1);
        }
        else if (computerSelection == 2) {
            displayResult(0);
            changeScore(1);
        }
    }
    else if (playerSelection == 2) {
        if (computerSelection == 0) {
            displayResult(0);
            changeScore(1);
        }
        else if (computerSelection == 1) {
            displayResult(2);
            changeScore(0);
        }
        else if (computerSelection == 2) {
            displayResult(1);
        }
    }
    else {
        console.log("Error");
    }
}