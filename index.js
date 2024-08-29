let games = []
let loaded = false

window.onload = () => {
    if (localStorage.getItem('games')) {
        games = JSON.parse(localStorage.getItem('games'))
        if (games.length <= 0) return;
        games.forEach(game => {
            let script = document.createElement('script')
            script.src = 'games/' + game + '.js '
            document.body.appendChild(script)
        })
    }
}

function Dependencies(dependencies, modName) {
    dependencies.forEach(dependency => {
        console.log(dependency)
        if (!games.includes(dependency)) {
            loaded = false
            games = JSON.parse(localStorage.getItem('games'))
            let i = games.indexOf(modName)
            if (i !== -1) {
                games.splice(i, 0, dependency);
            }
            localStorage.setItem('games', JSON.stringify(games))
        } else {
            loaded = true
        }
    })
    if (!loaded) {
        alert('One of your mods required dependencies, they have been automatically installed. Reload the page or click on the button below.')
        location.reload()
    }
}