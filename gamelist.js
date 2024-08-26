function add() {
    let games = []
    if (localStorage.getItem('games')) {
        games = JSON.parse(localStorage.getItem('games'))
    }

    let game = document.getElementById('ginp').value
    if (!games.includes(game) && game.trim() !== '') {
        games.push(game)
        localStorage.setItem('games', JSON.stringify(games))
        agtt(game)
    }
    document.getElementById('ginp').value = ''
}

function agtt(game) {
    let table = document.querySelector('table')
    let newRow = table.insertRow(-1)

    let cell = newRow.insertCell(0)
    cell.textContent = game + ' '

    let removeSpan = document.createElement('span')
    removeSpan.textContent = 'x'
    removeSpan.style.cursor = 'pointer'
    removeSpan.style.color = 'red'
    removeSpan.style.fontWeight = 'bold'
    removeSpan.style.marginLeft = '10px'
    removeSpan.onclick = function() {
        removegame(game, newRow)
    }

    cell.appendChild(removeSpan)
}

function removegame(game, row) {
    let games = JSON.parse(localStorage.getItem('games') || '[]')
    games = games.filter(g => g !== game)
    localStorage.setItem('games', JSON.stringify(games))
    row.remove()
}

function display() {
    let games = JSON.parse(localStorage.getItem('games') || '[]')
    games.forEach(game => {
        agtt(game)
    })
}

window.onload = display