let player = [[24, 34], [25, 34], [26, 34]]
let appleX = 22
let appleY = 0
let score = 0;
player.forEach(coords => {
    Kopal8.Kopaxel.GetKopaxel(coords[0], coords[1]).color = 'BROWN'
})
Kopal8.Kopaxel.GetKopaxel(appleX, appleY).color = 'RED'
Kopal8.Input.Button.onClick(Kopal8.Input.Button.LEFT, () => {
    player.forEach(coords => {
        coords[0] -= 1
        Kopal8.Kopaxel.MoveKopaxel(coords[0] + 1, 34, coords[0], 34)
    })
})
Kopal8.Input.Button.onClick(Kopal8.Input.Button.RIGHT, () => {
    for (let i = player.length - 1; i >= 0; i--) {
        coords = player[i]
        coords[0] += 1
        Kopal8.Kopaxel.MoveKopaxel(coords[0] - 1, 34, coords[0], 34)
    }
})
let scoretext = Kopal8.Text.CreateText(score, 'WHITE', 1, 3, 'score')
Kopal8.Update.OnUpdate(() => {
    if (msPassed % 25 === 0) {
        appleY++;
        Kopal8.Kopaxel.MoveKopaxel(appleX, appleY - 1, appleX, appleY)
        player.forEach(coords => {
            if (appleY == coords[1] && appleX == coords[0]) {
                let nX = Kopal8.Random.inRange(0, 50)
                Kopal8.Kopaxel.MoveKopaxel(appleX, appleY, nX, 0)
                Kopal8.Kopaxel.GetKopaxel(coords[0], coords[1]).color = 'BROWN'
                appleY = 0
                appleX = nX
                score++
            }
        })
        if (appleY > 34) {
            let nX = Kopal8.Random.inRange(0, 50)
            Kopal8.Kopaxel.MoveKopaxel(appleX, appleY, nX, 0)
            appleX = nX
            appleY = 0
        }
        Kopal8.Text.GetText('score').content = score
    }
})