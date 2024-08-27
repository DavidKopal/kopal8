let Bookshelf = {
    Random: {
        FromArray: (array) => {
            if (array.length > 0) {
                return array[Kopal8.Random.inRange(0, array.length - 1)]
            }
        }
    },
    Screen: {
        Clear: (color = 'RESET') => {
            for (let x = 0; x <= 50; x++) {
                Game[x] = {}
                for (let y = 0; y <= 35; y++) {
                    Game[x][y] = {
                        color: color,
                        x: x,
                        y: y,
                        props: {},
                        SetProperty: function (property, value) {
                            this.props[property] = value
                        },
                        RemoveProperty: function (property) {
                            if (property in this.props) {
                                delete this.props[property]
                            }
                        },
                        GetProperty: function (property) {
                            if (property in this.props) {
                                return this.props[property]
                            }
                        },
                        GetCoords: function () {
                            return [x, y]
                        }
                    }
                }
            }
        },
        Button: (content, color, textColor, width, height, x, y, onclick) => {
            let coords = [];
        
            for (let i = 0; i < width; i++) {
                let row = [];
                for (let j = 0; j < height; j++) {
                    row.push([x - Math.floor(width / 2) + i, y - Math.floor(height / 2) + j]);
                }
                coords.push(row);
            }
        
            coords.forEach(coords2 => {
                coords2.forEach(coords3 => {
                    Kopal8.Kopaxel.GetKopaxel(coords3[0], coords3[1]).color = color
                    Kopal8.Input.Mouse.onClick((x2, y2) => {
                        if (x2 == coords3[0] && y2 == coords3[1]) {
                            onclick()
                        }
                    })
                })
            })

            Kopal8.Text.CreateText(content, textColor, x -2, y)
        },
    },
    Kopaxel: {
        GetNeighbors: (x, y) => {
            if (x in Game) {
                if (y in Game) {
                    let ns = []
                    if (x+1 in Game && y in Game[x+1]) ns.push([x+1, y]);
                    if (x-1 in Game && y in Game[x-1]) ns.push([x-1, y]);
                    if (x in Game && y+1 in Game[x]) ns.push([x, y+1]);
                    if (x in Game && y-1 in Game[x]) ns.push([x, y-1])
                    return ns
                }
            }
        }
    }
}