let canv = document.getElementById('game')
let ctx = canv.getContext('2d')

this.Game = {}
for (let x = 0; x <= 35; x++) {
    this.Game[x] = {}
    for (let y = 0; y <= 20; y++) {
        this.Game[x][y] = {
            color: 'RESET',
            x: x,
            y: y,
            ChangeColor: function(color) {
                this.color = color
            }
        }
    }
}

let Keybinds = {}
let UpdateFuncs = []

function kopalkeypress(event) {
    if (event.key in Keybinds) {
        Keybinds[event.key]()
    }
}

function OnKeyPress(key, func) {
    Keybinds[key.toLowerCase()] = func
}

function OnUpdate(func) {
    UpdateFuncs.push(func)
}

function Color(color) {
    let Colors = {
        RED: '#ff0000',
        BLUE: '#0000ff',
        GREEN: '#00ff00',
        CYAN: '#00ffff',
        YELLOW: '#ffff00',
        MAGENTA: '#ff00ff',
        ORANGE: '#ffa500',
        PURPLE: '#800080',
        PINK: '#ffc0cb',
        BROWN: '#a52a2a',
        GRAY: '#808080',
        WHITE: '#ffffff',
        RESET: '#000000'
    }
    if (color in Colors) {
        return Colors[color]
    } else {
        return Colors.RESET
    }
}

function Update() {
    ctx.clearRect(0, 0, canv.width, canv.height)
    UpdateFuncs.forEach(func => {
        func()
    })
    for (let x in Game) {
        for (let y in Game[x]) {
            ctx.fillStyle = Color(Game[x][y].color)
            ctx.fillRect(x*10, y*10, 10, 10)
        }
    }
}

function GetPixel(x, y) {
    if (x in Game && y in Game[x]) {
        return Game[x][y]
    }
}

function MovePixel(x1, y1, x2, y2) {
    if (x1 in Game && y1 in Game && x2 in Game && y2 in Game) {
        Game[x2][y2].ChangeColor(Game[x1][y1].color)
        Game[x1][y1].ChangeColor('RESET')
    }
}

setInterval(Update, 1)