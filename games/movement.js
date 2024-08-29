let player = Kopal8.Kopaxel.GetKopaxel(3, 7)

player.color = 'RED'

Kopal8.Input.Button.onClick(Kopal8.Input.Button.W, () => {
    if (player.y -1 >= 0) {
        Kopal8.Kopaxel.MoveKopaxel(player.x, player.y, player.x, player.y -1)
        player = Kopal8.Kopaxel.GetKopaxel(player.x, player.y-1)
    }
})

Kopal8.Input.Button.onClick(Kopal8.Input.Button.S, () => {
    if (player.y +1 <= 35) {
        Kopal8.Kopaxel.MoveKopaxel(player.x, player.y, player.x, player.y +1)
        player = Kopal8.Kopaxel.GetKopaxel(player.x, player.y+1)
    }
})

Kopal8.Input.Button.onClick(Kopal8.Input.Button.A, () => {
    if (player.x -1 >= 0) {
        Kopal8.Kopaxel.MoveKopaxel(player.x, player.y, player.x-1, player.y)
        player = Kopal8.Kopaxel.GetKopaxel(player.x-1, player.y)
    }
})

Kopal8.Input.Button.onClick(Kopal8.Input.Button.D, () => {
    if (player.x +1 <= 50) {
        Kopal8.Kopaxel.MoveKopaxel(player.x, player.y, player.x+1, player.y )
        player = Kopal8.Kopaxel.GetKopaxel(player.x+1, player.y)
    }
})
