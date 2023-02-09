let playerOne = `<img id="etoile" src="/Asset/img/etoile.png"></img>`
let playerTwo = `<img id="etoile" src="/Asset/img/piranha.png"></img>`
let tour = 1
let scoreOne = 0
let scoreTwo = 0
let scoreDraw = 0
let gridVictory = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8],];
let gameOver = false
let player = "";
let modeCpu = false
let victorySound = new Audio ("./Asset/son/niveau-termine.mp3")
let defeatSound = new Audio ("./Asset/son/Ouhoooohoooohoo.mp3")



document.querySelector("#style").innerHTML = `Start !!`
function play(elem) {
    
    if (elem.innerHTML == "") {
        let cases = document.querySelectorAll('.select')
        
        if (gameOver == false) {
            if (tour % 2 != 0) { //Si lap en le divisant par deux et et qu'il est différent de zero 
                document.querySelector("#style").innerHTML = `C'est au tour du joueur 2`
                elem.innerHTML = playerOne // alors ca viens au joueur 1
                player = "1"

            } else {
                elem.innerHTML = playerTwo // Sinon ca viens au joueur 2
                document.querySelector("#style").innerHTML = `C'est au tour du joueur 1`
                player = "2"
            }

            checkVictory()
            draw()
            tour++
            if (gameOver == false && modeCpu == true) {
                random()
                checkVictory()
                draw()
            }
        }
    }
}


function checkVictory() {
    let cases = document.querySelectorAll('.select') // selectionne moi toutes les cases
    
    for (let i = 0; i < gridVictory.length; i++) {
     // Boucle, i parcours moi la grille de victoire
        if (cases[gridVictory[i][0]].innerHTML != "") { // Si les cases sont toute parcouru est que les cases sont vides ajoute moi l'action du player one ou two
            if (cases[gridVictory[i][0]].innerHTML == cases[gridVictory[i][1]].innerHTML && cases[gridVictory[i][1]].innerHTML == cases[gridVictory[i][2]].innerHTML) {
                
                if (player == 1) {
                    scoreOne++
                    document.querySelector("#score1").innerHTML = scoreOne
                    document.querySelector("#style").innerHTML = `le Joueur ${player} a gagne !!`
                    cases[gridVictory[i][0]].classList.add('animate__flip')
                    cases[gridVictory[i][1]].classList.add('animate__flip')
                    cases[gridVictory[i][2]].classList.add('animate__flip')
                    gameOver = true
                    victorySound.play()
                    break

                } else if (player == 2) {
                    scoreTwo++
                    document.querySelector("#score2").innerHTML = scoreTwo
                    document.querySelector("#style").innerHTML = `le Joueur ${player} a gagne !!`
                    cases[gridVictory[i][0]].classList.add('animate__flip')
                    cases[gridVictory[i][1]].classList.add('animate__flip')
                    cases[gridVictory[i][2]].classList.add('animate__flip')
                    
                    gameOver = true
                    victorySound.play()
                    break

                } else if (player == "Mario") {
                    document.querySelector("#style").innerHTML = `C'est ${player} qui a gagne !!`
                    scoreTwo++
                    document.querySelector("#score2").innerHTML = scoreTwo
                    cases[gridVictory[i][0]].classList.add('animate__hinge')
                    cases[gridVictory[i][1]].classList.add('animate__hinge')
                    cases[gridVictory[i][2]].classList.add('animate__hinge')
                    defeatSound.play()
                    gameOver = true
                    
                    break
                }
                
            }
            
        }
    }
}

function draw() {
    if (gameOver == false) {
        let counter = 0
        let cells = document.querySelectorAll(".select")

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML != "") {
                counter++
            }
        }
        if (counter == 9) {
            scoreDraw++
            document.querySelector("#soreNul").innerHTML = scoreDraw++
            gameOver = true
            document.querySelector("#style").innerHTML = `Match nul`
        }
    }
}

function replay() {

    son() // On rappel la fonction son pour qu'il puisse etre joué en meme temps que la fonction rejou
    let cells = document.querySelectorAll('.select')
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ""
        cells[i].style.backgroundColor = ''
        cells[i].classList.remove("animate__flip","animate__hinge")
    }
    tour = 1
    gameOver = false

}

function random() {
    player = "Mario"
    let cells = document.querySelectorAll('.select')
    let cpu = randomNumber(0, 8)


    while (true) {
        if (cells[cpu].innerHTML == "") {
            cells[cpu].innerHTML = playerTwo
            break
        } else {
            cpu = randomNumber(0, 8)
        }
    }

    tour++
}



function cpuMode() {
    modeCpu = !modeCpu

    if (modeCpu == true) {
        document.getElementById("cube").setAttribute("style", "box-shadow:inset 5em 10em red")
    } else if (modeCpu == false) {
        document.getElementById("cube").removeAttribute("style", "box-shadow")
    }
    replay()

}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function restart() {
    let refresh = document.getElementById("refresh");
    refresh.addEventListener("click", location.reload(), false);
}





// *************Fonction son*****************************/

let trueSon = new Audio("https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Here+We+Go!+Mario+Sound+Effect&filename=23/234450-77f4530c-77ae-4ad2-b495-2c491f58e9f6.mp3")




function son() { //Déclaration de la fonction
    let musique = document.querySelector("#audio") //Création de la variable musique = dans le dom selectionne moi l'id audio
    trueSon.play() // Joue moi le son
}
