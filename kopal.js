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
let Texts = {}

let msPassed = 0 // Sec passed since start
let secPassed = 0 // Milisec passed since start

let Keybinds = {}
let anyKeybinds = []

let UpdateFuncs = []

let canvClicks = []

const cooldowns = {};

function kopalkeypress(key) { // Don't use.
    if (key.includes('ARROW')) key = key.replace('ARROW', '');
    if (!(key in Kopal8.Input.Button)) return;
    key = Kopal8.Input.Button[key].toUpperCase();

    const now = Date.now();
    if (key in cooldowns && now - cooldowns[key] < 250) return;

    cooldowns[key] = now;

    if (key in Keybinds) {
        Keybinds[key]();
    }
    if (anyKeybinds.length > 0) {
        anyKeybinds.forEach(func => {
            func(key);
        });
    }
}


function Color(color) { // Used to get colors.
    let Colors = { // Colors list, very useful (RESET = black)
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
        K8COLOR: '#c0c0c0',
        WHITE: '#ffffff',
        RESET: '#000000'
    }
    if (color in Colors) {
        return Colors[color]
    } else {
        return Colors.RESET
    }
}

function Update() { // Game update function.
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

function kopalcanvclick(event) { // Don't use.
    const rect = canv.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gx = Math.floor((mouseX - 15) / 10);
    const gy = Math.floor((mouseY - 15) / 10);

    if (gx >= 0 && gx <= 50 && gy >= 0 && gy <= 35) {
        canvClicks.forEach(func => {
            func(gx, gy)
        })
    }
}

const Kopal8 = { // Main engine and functions
    Input: {
        Button: {
            W: 'leftUP', // Pretty self explanatory.
            A: 'leftLEFT',
            S: 'leftDOWN',
            D: 'leftRIGHT',
            UP: 'rightTOP',
            LEFT: 'rightLEFT',
            DOWN: 'rightDOWN',
            RIGHT: 'rightRIGHT',
            onClick: (key, func) => { // Used to run something when an button is clicked. use like Kopal8.Input.Button.W for the key.
                if (key !== 'any') { // Runs if any key is pressed
                    Keybinds[key.toUpperCase()] = func
                } else {
                    anyKeybinds.push(func)
                }
            }
        },
        Mouse: {
            onClick: (func) => { // Runs something when clicked on game, make sure to include 2 args in the func. (x, y)
                canvClicks.push(func)
            }
        }
    },
    Kopaxel: {
        GetKopaxel: (x, y) => { // Returns an Kopaxel
            if (x in Game && y in Game[x]) {
                return Game[x][y]
            }
        },
        MoveKopaxel: (x1, y1, x2, y2) => { // Moves an Kopaxel
            if (x1 in Game && y1 in Game && x2 in Game && y2 in Game) {
                Game[x2][y2].props = { ...Game[x1][y1].props }
                Game[x2][y2].color = Game[x1][y1].color
                Game[x1][y1].color = 'RESET'
                Game[x1][y1].props = {}
            }
        }
    },
    Text: {
        GetText: (id) => { // Gets an text based off an text id
            if (id in Texts) {
                return Texts[id]
            }
        },
        CreateText: (content, color, x, y, id = Object.keys(Texts).length) => { // Creates an text
            if (x in Game && y in Game[x]) {
                Texts[id] = {
                    content: content,
                    color: color,
                    x: x*10,
                    y: (y*10) +10
                }
            }
        },
    },
    Update: {
        OnUpdate: func => { // Runs something every update. (milisecond)
            UpdateFuncs.push(func)
        }
    },
    Random: {
        inRange: (min, max) => { // Returns a random number in range.
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
    }
}

let tindex = 0
let themes = [
    {
        'kopal8': 'K8COLOR',
        'w': 'RED',
        'a': 'CYAN',
        's': 'YELLOW',
        'd': 'GREEN',
        'up': 'WHITE',
        'left': 'WHITE',
        'down': 'WHITE',
        'right': 'WHITE',
    },
    {
        'kopal8': 'RESET',
        'w': 'WHITE',
        'a': 'WHITE',
        's': 'WHITE',
        'd': 'WHITE',
        'up': 'WHITE',
        'left': 'WHITE',
        'down': 'WHITE',
        'right': 'WHITE',
    },
    {
        'kopal8': 'ORANGE',
        'w': 'RED',
        'a': 'MAGENTA',
        's': 'YELLOW',
        'd': 'PINK',
        'up': 'WHITE',
        'left': 'WHITE',
        'down': 'WHITE',
        'right': 'WHITE',
    },
    {
        'kopal8': 'BLUE',
        'w': 'CYAN',
        'a': 'GREEN',
        's': 'PURPLE',
        'd': 'MAGENTA',
        'up': 'WHITE',
        'left': 'WHITE',
        'down': 'WHITE',
        'right': 'WHITE',
    },
    {
        'kopal8': 'BROWN',
        'w': 'GREEN',
        'a': 'ORANGE',
        's': 'YELLOW',
        'd': 'GRAY',
        'up': 'WHITE',
        'left': 'WHITE',
        'down': 'WHITE',
        'right': 'WHITE',
    }        
]
function ForceTheme(props) {
    let ids = ['kopal8', 'w', 'a', 's', 'd', 'up', 'down', 'left', 'right']
    for (let prop in props) {
        if (!ids.includes(prop)) return;
        document.getElementById(prop).style.backgroundColor = Color(props[prop])
    }
}
function AddTheme(props) {
    themes.push(props)
}
function kopalchangetheme() {
    tindex++
    if (tindex == themes.length) tindex = 0;
    ForceTheme(themes[tindex])
}

setInterval(Update, 1)