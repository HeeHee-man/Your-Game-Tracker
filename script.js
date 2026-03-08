let games = [];

const savedGames = localStorage.getItem("games");

if (savedGames) {
    games = JSON.parse(savedGames);
}

function saveGames() {
    localStorage.setItem("games", JSON.stringify(games));
}

const addbutton = document.getElementById("add_game");

addbutton.addEventListener("mouseover", event => {
    const hasText = document.getElementById("game_input").value;
    if(!hasText) event.target.textContent = "ADD!";
    else event.target.textContent = "OH YEAH, DO IT!!";
});

addbutton.addEventListener("mouseout", event => {
    const hasText = document.getElementById("game_input").value;
    if(!hasText) event.target.textContent = "ADD!";
    else event.target.textContent = "NOO, COME BACK HERE!!!";
});

function addGameToTable(title, status="Not started", index) {

    const table = document.getElementById("game_table");

    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");

    const select = document.createElement("select");

    const options = [
        "Not started",
        "Playing",
        "Paused",
        "Completed",
        "Better than you 😎"
    ];

    options.forEach(text => {
        const option = document.createElement("option");
        option.textContent = text;
        if(text === status) option.selected = true;
        select.appendChild(option);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";

    deleteButton.addEventListener("click", () => {
        if(confirm("Are you sure? Like, really, really sure?")) {
            row.remove();
            games.splice(index, 1);
            saveGames();
        }
    });

    select.addEventListener("change", () => {
        games[index].status = select.value;
        saveGames();
    });

    cell1.textContent = title;

    cell2.appendChild(select);
    cell3.appendChild(deleteButton);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    table.appendChild(row);

}

addbutton.addEventListener("click", event => {

    event.target.textContent = "YOU DID IT!";

    const input = document.getElementById("game_input");
    const title = input.value;

    if (!title) {
        alert("Looks like you forgot to write the title of the game");
        return;
    }

    if (title === "Femboy Futa House") {
        alert("I see what you're doing here 😏");
    }

    if (title === "Doki Doki Literature Club" || title === "DDLC") {
        alert("Just Monika Just Monika Just Monika");
    }

    addGameToTable(title);

    const game = {
        title: title,
        status: "Not started"
    };

    games.push(game);

    saveGames();

    input.value = "";

});

function loadGames() {

    games.forEach((game, index) => {
        addGameToTable(game.title, game.status, index);
    });

}

loadGames();

const wasteButton = document.getElementById("waste_button");
let count = 0;

wasteButton.addEventListener("click", event => {
    const clickCount = document.getElementById("clicks_wasted");
    const stopWastingYourTime = document.getElementById("stop_wasting_your_time");
    count++;
    clickCount.textContent = "Clicks wasted: " + count;
    switch(count) {
        case 100:
            stopWastingYourTime.textContent = "Huh...?";
            break;
        case 200:
            stopWastingYourTime.textContent = "What do you think you're doing?";
            break;
        case 500:
            stopWastingYourTime.textContent = "Stop.";
            break;
        case 1000:
            stopWastingYourTime.textContent = "1k clicks? Seriously? I told you to stop 500 clicks ago! You don't have anything better to do?";
            break;
        case 2000:
            stopWastingYourTime.textContent = "Whatever. Do what you want. Just know that you wasted your time.";
            break;
    }
});

