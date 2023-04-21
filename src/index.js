const gameList = document.querySelector('.game-list')
const gameDetails = document.querySelector('.game-details')
const detailImage = document.querySelector('#detail-image')
const detailHighScore = document.querySelector('#detail-high-score')
const detailTitle = document.querySelector('#detail-title')
const scoreInput = document.querySelector('#score-input')
const highScoreForm = document.querySelector('#high-score-form')

function pinballGamesList() {
    fetch('http://localhost:3000/games')
    .then(function (res) {
        return res.json()
    })
    .then(function (gamesArray) {
        displayGameInfo(gamesArray[0])
        gamesArray.forEach(function (gameObj) {
            displayGame(gameObj)
        })
    })
}
pinballGamesList()

const displayGame = (game) => {
    const gameBulletPoint = document.createElement('h5')
    gameBulletPoint.textContent = `${game.name} (${game.manufacturer_name})`
    gameBulletPoint.addEventListener('click', function () {
        displayGameInfo(game)
    })
    gameList.appendChild(gameBulletPoint)
}

//! game info on load

const displayGameInfo = (game) => {
    detailImage.src = game.image
    detailImage.alt = `${game.name} (${game.manufacturer_name}) image.`
    detailTitle.textContent = game.name
    detailHighScore.textContent = game.high_score
}

//! create a form that lets someone enter a value for the "high score"

highScoreForm.addEventListener('submit', function (e) {
    changeScore(e)
})

const changeScore = (e) => {
    e.preventDefault()
    const currentScore = parseInt(detailHighScore.textContent)
    const scoreInputTwo = parseInt(scoreInput.value)
    detailHighScore.textContent = currentScore + scoreInputTwo
    highScoreForm.reset()
}
