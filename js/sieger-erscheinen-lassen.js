/* matches Structure
    matches[0] = {
        gameTag: <div id="spiel1">...</div>,
        player1: "Spieler 1",
        player2: "Spieler 2",
        pointsP1: <input type="number" min="0">,
        pointsP2: <input type="number" min="0">
        winner: "Spieler 1"
        loser: "Spieler 2"
    }
    ..
    
*/

const gamesAndPlayers = (() => {
    // Games 1-8 are the first round, 9-12 the quarter finals, 13-14 the semi finals and 15 the final
    let matches = [];
    let matchCounter = 0;
    for(let i = 0; i < 15; i++) {
        // Create the match
        matches[i] = {};
        matches[i].gameTag = document.querySelector("#spiel" + (i + 1));
        result = document.createElement("form");
        // Add input fields and button
        let input1 = document.createElement("input");
        let input2 = document.createElement("input");
        input1.setAttribute("type", "number");
        input1.setAttribute("min", 0);
        input2.setAttribute("type", "number");
        input2.setAttribute("min", 0);
        result.appendChild(input1);
        result.appendChild(input2);

        matches[i].gameTag.appendChild(result);
    
        let button = document.createElement("button");
        button.setAttribute("id", "button" + (i + 1));
        button.innerHTML = "Ok";
        matches[i].gameTag.appendChild(button);

        // Add the players to the games
        if(i < 8) {
            // Get the players
            let player1 = document.querySelector("#spieler" + (matchCounter + i + 1)).innerHTML;
            let player2 = document.querySelector("#spieler" + (matchCounter + i + 2)).innerHTML;
            matches[i].player1 = player1;
            matches[i].player2 = player2;
            matchCounter = ++matchCounter;
        }
    }
    addEventListeners(matches);
})

const addEventListeners = ((matches) => {
    // Add event listeners to all buttons
    for(let i = 0; i < 15; i++) {
        let button = matches[i].gameTag.querySelector("button");
        button.addEventListener("click", () => {
            // Get the input fields
            matches[i].pointsP1 = matches[i].gameTag.querySelector("input");
            matches[i].pointsP2 = matches[i].gameTag.querySelector("input:nth-child(2)");

            // Check if the input is valid
            if(matches[i].pointsP1.value >= 0 && matches[i].pointsP2.value >= 0) {
                // Check if input is empty
                if(matches[i].pointsP1.value == "" || matches[i].pointsP2.value == "") {
                    console.log("Error: Empty input");
                    return;
                }
                let winner = checkWinner(matches[i], i);
                if(!winner)
                    return;
                addWinnerToNextRound(matches[i], i, matches);

            }
        });
    }
});


// Check winner
const checkWinner = ((match) => {
    if(match.pointsP1.value == match.pointsP2.value) {
        console.log("Error: No winner");
        return false;
    }
    if(match.player1 == undefined || match.player2 == undefined) {
        console.log("Error: No players");
        return false;
    }
    // Set input fields to readonly and text
    match.pointsP1.setAttribute("readonly", true);
    match.pointsP1.setAttribute("type", "text");
    match.pointsP2.setAttribute("readonly", true);
    match.pointsP2.setAttribute("type", "text");

    // Remove the button
    match.gameTag.querySelector("button").remove();

    // Shwo the name of the winner
    if(match.pointsP1.value > match.pointsP2.value) {
        let winner = document.createElement("p");
        winner.innerHTML = match.player1;
        match.gameTag.appendChild(winner);
        match.winner = match.player1;
        match.loser = match.player2;
    }
    else if(match.pointsP1.value < match.pointsP2.value) {
        let winner = document.createElement("p");
        winner.innerHTML = match.player2;
        match.gameTag.appendChild(winner);
        match.winner = match.player2;
        match.loser = match.player1;
    }

    return true;
});


const addWinnerToNextRound = ((match, matchNr, matches) => {
    switch(matchNr) {
        case 0:
            matches[8].player1 = match.winner;
            break;
        case 1:
            matches[8].player2 = match.winner;
            break;
        case 2:
            matches[9].player1 = match.winner;
            break;
        case 3:
            matches[9].player2 = match.winner;
            break;
        case 4:
            matches[10].player1 = match.winner;
            break;
        case 5:
            matches[10].player2 = match.winner;
            break;
        case 6:
            matches[11].player1 = match.winner;
            break;
        case 7:
            matches[11].player2 = match.winner;
            break;
        case 8:
            matches[12].player1 = match.winner;
            break;
        case 9:
            matches[12].player2 = match.winner;
            break;
        case 10:
            matches[13].player1 = match.winner;
            break;
        case 11:
            matches[13].player2 = match.winner;
            break;
        case 12:
            matches[14].player1 = match.winner;
            break;
        case 13:
            matches[14].player2 = match.winner;
            break;
        case 14:
            console.log("Winner: " + match.winner);
            showWinners(matches);
            break;
        default:
            console.log("Error: No match found");
            break;
    }
});

const showWinners = ((matches) => {
    let goldWinner = document.querySelector("#Gold");
    let silverWinner = document.querySelector("#Silber");
    let bronzeWinner = document.querySelector("#Bronze");

    goldWinner.innerHTML = matches[14].winner;
    silverWinner.innerHTML = matches[14].loser;

    // Loser(of Semi Final) with the smallest difference between points gets bronze
    if(Math.abs(matches[12].pointsP1.value - matches[12].pointsP2.value) < Math.abs(matches[13].pointsP1.value - matches[13].pointsP2.value))
        bronzeWinner.innerHTML = matches[12].loser;
    else
        bronzeWinner.innerHTML = matches[13].loser;
});
