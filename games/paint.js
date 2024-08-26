let pcolor = 'RED'

Kopal8.Input.Mouse.onClick((x,y) => {
    let kxl = Kopal8.Kopaxel.GetKopaxel(x, y)
    if (kxl.color !== 'RESET') {
        kxl.color = 'RESET'
    } else {
        kxl.color = pcolor
    }
})

Kopal8.Input.Button.onClick(Kopal8.Input.Button.W, () => {
    pcolor = 'RED'
})

Kopal8.Input.Button.onClick(Kopal8.Input.Button.A, () => {
    pcolor = 'CYAN'
})

Kopal8.Input.Button.onClick(Kopal8.Input.Button.D, () => {
    pcolor = 'GREEN'
})

Kopal8.Input.Button.onClick(Kopal8.Input.Button.S, () => {
    pcolor = 'YELLOW'
})