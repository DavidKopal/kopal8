let canv = document.getElementById('game')
let ctx = canv.getContext('2d')

let Game = {}
for (let x = 0; x <= 50; x++) {
    Game[x] = {}
    for (let y = 0; y <= 35; y++) {
        Game[x][y] = {
            color: 'RESET',
            x: x,
            y: y,
            props: {},
            ChangeColor: function (color) {
                this.color = color
            }
        }
    }
}
let Texts = {}

let msPassed = 0
let secPassed = 0

let Keybinds = {}
let anyKeybinds = []

let UpdateFuncs = []

let canvClicks = []

function kopalkeypress(key) {
    key = Kopal8.Input.Button[key].toUpperCase()
    if (key in Keybinds) {
        Keybinds[key]()
    }
    if (anyKeybinds.length > 0) {
        anyKeybinds.forEach(func => {
            func(key)
        })
    }
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
            ctx.fillRect(x * 10, y * 10, 10, 10)
        }
    }
    for (let id in Texts) {
        ctx.fillStyle = Color(Texts[id].color)
        ctx.font = '25px Pixel'
        ctx.fillText(Texts[id].content, Texts[id].x, Texts[id].y)
    }
    msPassed++;
    if (msPassed % 1000 === 0) {
        secPassed++;
    }
}

function kopalcanvclick(event) {
    const rect = canv.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridX = Math.floor(mouseX / 10);
    const gridY = Math.floor(mouseY / 10);

    if (gridX >= 0 && gridX <= 50 && gridY >= 0 && gridY <= 35) {
        canvClicks.forEach(func => {
            func(gridX, gridY)
        })
    }
}

const Kopal8 = {
    Input: {
        Button: {
            W: 'leftUP',
            A: 'leftLEFT',
            S: 'leftDOWN',
            D: 'leftRIGHT',
            UP: 'rightTOP',
            LEFT: 'rightLEFT',
            DOWN: 'rightDOWN',
            RIGHT: 'rightRIGHT',
            onClick: (key, func) => {
                if (key !== 'any') {
                    Keybinds[key.toUpperCase()] = func
                } else {
                    anyKeybinds.push(func)
                }
            }
        },
        Mouse: {
            onClick: (func) => {
                canvClicks.push(func)
            }
        }
    },
    Kopaxel: {
        GetKopalxel: (x, y) => {
            if (x in Game && y in Game[x]) {
                return Game[x][y]
            }
        },
        MoveKopalxel: (x1, y1, x2, y2) => {
            if (x1 in Game && y1 in Game && x2 in Game && y2 in Game) {
                Game[x2][y2].ChangeColor(Game[x1][y1].color)
                Game[x1][y1].ChangeColor('RESET')
            }
        }
    },
    Text: {
        GetText: (id) => {
            if (id in Texts) {
                return Texts[id]
            }
        },
        CreateText: (content, color, x, y, id = Object.keys(Texts).length) => {
            Texts[id] = {
                content: content,
                color: color,
                x: x,
                y: y
            }
        },
        AddProperty: (x, y, property, value) => {
            if (x in Game && y in Game[x]) {
                Game[x][y].props[property] = value
            }
        },
        RemoveProperty: (x, y, property) => {
            if (x in Game && y in Game[x] && property in Game[x][y].props) {
                delete Game[x][y].props[property]
            }
        },
        GetProperty: (x, y, property) => {
            if (x in Game && y in Game[x] && property in Game[x][y].props) {
                return Game[x][y].props[property]
            }
        }
    },
    Update: {
        OnUpdate: func => {
            UpdateFuncs.push(func)
        }
    }
}


setInterval(Update, 1)