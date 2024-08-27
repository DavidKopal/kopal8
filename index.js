let games = []
let loadedGames = []

window.onload = () => {
    if (localStorage.getItem('games')) {
        games = JSON.parse(localStorage.getItem('games'))
        if (games.length <= 0) return;
        games.forEach(game => {
            loadedGames.push(game)
            let script = document.createElement('script')
            script.src = 'games/' + game + '.js '
            document.body.appendChild(script)
        })
    }
}

function Dependency(game) {
    if (game in loadedGames) return;
    loadedGames.push(game)
    localStorage.setItem('games', JSON.stringify(games))
    let script = document.createElement('script')
    script.src = 'games/' + game + '.js '
    document.body.appendChild(script)
}