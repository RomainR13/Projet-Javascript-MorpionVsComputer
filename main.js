let gameContainer = document.querySelector("#gameContainer");
let map = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
isplayable = true
let joueurs, joueur;
let gameOver = false

function Initialisating() {
    // On cache le bouton "Rejouer"
    document.querySelector("#rejouer").style.visibility = "hidden";
    // On définit les joueurs
    joueurs = ['X', 'O'];
    // Et le joueur qui commence
    joueur = joueurs[0];
    // On réinitialise la carte
    resetMap();
    // On réaffiche la carte
    displayMap();
}

function resetMap() {
    map = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    gameOver = false;
}

function play(row, col) {
    if (gameOver == false && isplayable == true) {
        if (map[row][col] === 0) {
            map[row][col] = joueur;
            displayMap();
            if (checking()) {
                document.querySelector('#rejouer p').innerHTML = `Félicitations ! Le  ${joueur == "X" ? "Joueur 1" : "I-Robot"} Gagne !`
                document.querySelector("#rejouer").style.visibility = "visible";
                gameOver = true;
            } else if (isGridFull()) {
                document.querySelector('#rejouer p').innerHTML = 'Match nul !'
                document.querySelector("#rejouer").style.visibility = "visible";
                gameOver = true
            } else {
                joueur = (joueur === joueurs[0]) ? joueurs[1] : joueurs[0];
            }
            document.querySelector('#error').innerHTML = ''

        } else {
            document.querySelector('#error').innerHTML = 'clique ailleurs !'
            return
        }
        if ( joueur == joueurs[1]) {
            cpu()
        }
    }
    
}

function cpu() {
    let board = document.querySelectorAll('.cell')
    let random = randomize(0, board.length - 1)
    while(board[random].innerHTML != ""){
        random = randomize(0, board.length - 1)
    }
    isplayable = false
    setTimeout(() => {
        isplayable = true
        board[random].click()
    }, 1000)
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checking() {
    for (let i = 0; i < 3; i++) {
        // Vérification des lignes et des colonnes
        if (map[i][0] !== 0 && map[i][0] === map[i][1] && map[i][0] === map[i][2]) {
            return true; // Victoire dans la ligne
        }
        if (map[0][i] !== 0 && map[0][i] === map[1][i] && map[0][i] === map[2][i]) {
            return true; // Victoire dans la colonne
        }
    }

    // Vérification des diagonales
    if (map[0][0] !== 0 && map[0][0] === map[1][1] && map[0][0] === map[2][2]) {
        return true; // Victoire dans la diagonale principale
    }
    if (map[0][2] !== 0 && map[0][2] === map[1][1] && map[0][2] === map[2][0]) {
        return true; // Victoire dans l'autre diagonale
    }

    return false; // Aucune victoire détectée
}

function isGridFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (map[i][j] === 0) {
                return false; // La grille n'est pas encore pleine
            }
        }
    }
    return true; // La grille est pleine
}

function displayMap() {
    gameContainer.innerHTML = "";
    map.forEach((row, rowIndex) => {
        let rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        gameContainer.appendChild(rowContainer);

        row.forEach((cell, colIndex) => {
            let cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.innerHTML = (cell === 'X' || cell === "O") ? `<img class="pion" src ='./assets/images/pion${cell}.png'>` : '';
            cellElement.addEventListener('click', () => {
                play(rowIndex, colIndex);
            });

            rowContainer.appendChild(cellElement);
        });
    });
}

Initialisating();
