// made by ArcadeCat1

let pcolor = 'RED'

let size = 0

Kopal8.Input.Mouse.onClick((x,y) => {
    if (size > 0) {
        let sandy = y - size / 2
        let sandx = x - size / 2
        while (sandy +1 <= y + size / 2) {
            if  (sandx +1 <= x + size / 2) {
                if (sandx >= 0 && sandx <= 50 && sandy >= 0 && sandy <= 35) {

                    let kxl = Kopal8.Kopaxel.GetKopaxel(sandx, sandy)
                    if (kxl.color !== 'RESET') {
                        kxl.color = 'RESET'
                    } else {
                        kxl.color = pcolor
                    }
                }

                sandx = sandx + 1

            } else {
                sandy = sandy + 1
                sandx = x - size / 2

            }
        }
    } else {
        let kxl = Kopal8.Kopaxel.GetKopaxel(x, y)
        if (kxl.color !== 'RESET') {
            kxl.color = 'RESET'
        } else {
            kxl.color = pcolor
        }
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

Kopal8.Input.Button.onClick(Kopal8.Input.Button.UP, () => {
    if (size <= 12) {
        size = size + 2
    }
})

Kopal8.Input.Button.onClick(Kopal8.Input.Button.DOWN, () => {
    if (size >= 2) {
        size = size - 2
    }
})


Kopal8.Input.Button.onClick(Kopal8.Input.Button.LEFT, () => { //David Kopalowizc helped with this clear screen function
    for (let x = 0; x <= 50; x++) {
        Game[x] = {}
        for (let y = 0; y <= 35; y++) {
            Game[x][y] = {
                color: 'RESET',
                x: x,
                y: y,
                props: {},
                SetProperty: function (property, value) { // Sets an property.
                    this.props[property] = value
                },
                RemoveProperty: function (property) { // Removes an property.
                    if (property in this.props) {
                        delete this.props[property]
                    }
                },
                GetProperty: function (property) { // Returns an property.
                    if (property in this.props) {
                        return this.props[property]
                    }
                },
                GetCoords: function () { // Returns the coords of the Kopaxel.
                    return [x, y]
                }
            }
        }
    }
})



function UpdateSand(){
    let sandx = 50
    let sandy = 35
    let sand = Kopal8.Kopaxel.GetKopaxel(sandx, sandy)
    while (sandy -1 >= -1) {
        if (sandx -1 >= -1) {

            sand = Kopal8.Kopaxel.GetKopaxel(sandx, sandy)

            if (sand.color !== 'RESET') { 
                
                if (sand.color == 'YELLOW') {  // SAND
                    if (sandy+1 <= 35) {
                        if (Kopal8.Kopaxel.GetKopaxel(sandx, sandy+1).color == 'RESET' || Kopal8.Kopaxel.GetKopaxel(sandx, sandy+1).color == 'CYAN') {
                            if (Kopal8.Kopaxel.GetKopaxel(sandx, sandy+1).color == 'CYAN') {
                                Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx, sandy+1)  
                                Kopal8.Kopaxel.GetKopaxel(sandx, sandy).color = 'CYAN'
                            } else {
                                Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx, sandy+1)  
                            }

                        } else if (Kopal8.Random.inRange(1, 2) == 1 && sandx-1 >= 0 ) {
                            if (Kopal8.Kopaxel.GetKopaxel(sandx-1, sandy+1).color == 'RESET') {
                                Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx-1, sandy+1)
                            }
                        } else if (sandx+1 <= 49) {
                            if (Kopal8.Kopaxel.GetKopaxel(sandx+1, sandy+1).color == 'RESET') {
                                Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx+1, sandy+1)
                            }
                        }
                    }

                } else if (sand.color == 'CYAN') {  //WATER
                    if (sandy+1 <= 35) {
                        if (Kopal8.Kopaxel.GetKopaxel(sandx, sandy+1).color == 'RESET') {
                            Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx, sandy+1)  

                        } else if (Kopal8.Random.inRange(1, 2) == 1 && sandx-1 >= 0 ) {
                            if (Kopal8.Kopaxel.GetKopaxel(sandx-1, sandy+1).color == 'RESET') {
                                Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx-1, sandy+1)
                            } 

                        } else if (sandx+1 <= 50) {
                            if (Kopal8.Kopaxel.GetKopaxel(sandx+1, sandy+1).color == 'RESET') {
                                Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx+1, sandy+1)
                            }

                        }

                    }

                    if (Kopal8.Random.inRange(1, 2) == 1 && sandx-1 >= 0) {
                        if (Kopal8.Kopaxel.GetKopaxel(sandx-1, sandy).color == 'RESET') {
                            Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx-1, sandy)
                        }
                    } else if (sandx+1 <= 50) {
                        if (Kopal8.Kopaxel.GetKopaxel(sandx+1, sandy).color == 'RESET') {
                            Kopal8.Kopaxel.MoveKopaxel(sandx, sandy, sandx+1, sandy)
                        }
                    }
                } else if (sand.color == 'GREEN') {  //PLANT
                    if (sandx-1 >= 0 && sandy-1 >= 0 && Kopal8.Kopaxel.GetKopaxel(sandx-1, sandy-1).color == 'CYAN') {
                        if (Kopal8.Random.inRange(1, 8) == 1) {
                            Kopal8.Kopaxel.GetKopaxel(sandx-1, sandy-1).color = 'PINK'
                        } else {
                            Kopal8.Kopaxel.GetKopaxel(sandx-1, sandy-1).color = 'GREEN'
                        }

                    } else if (sandx+1 <= 50 && sandy+1 <= 35 && Kopal8.Kopaxel.GetKopaxel(sandx+1, sandy-1).color == 'CYAN') {
                        if (Kopal8.Random.inRange(1, 8) == 2) {
                            Kopal8.Kopaxel.GetKopaxel(sandx+1, sandy-1).color = 'PINK'
                        } else {
                            Kopal8.Kopaxel.GetKopaxel(sandx+1, sandy-1).color = 'GREEN'
                        }

                    } else if (sandy+1 <= 35 && Kopal8.Kopaxel.GetKopaxel(sandx, sandy-1).color == 'CYAN') {
                        if (Kopal8.Random.inRange(1, 8) == 2) {
                            Kopal8.Kopaxel.GetKopaxel(sandx, sandy-1).color = 'PINK'
                        } else {
                            Kopal8.Kopaxel.GetKopaxel(sandx, sandy-1).color = 'GREEN'
                        }

                    }

                }

            } 
            sandx = sandx - 1
        } else {
            sandx = 50
            sandy = sandy - 1
        }
    }

}

setInterval(UpdateSand, 50 )