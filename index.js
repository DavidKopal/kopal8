function loadGame() {
  let fi = document.getElementById('tl');
  let f = fi.files[0];

  if (f) {
    let reader = new FileReader();
    reader.onload = function (event) {
      let content = event.target.result;
      Texts = {}
      msPassed = 0
      secPassed = 0
      Keybinds = {}
      anyKeybinds = []
      UpdateFuncs = []
      anvClicks = []
      for (let x = 0; x <= 50; x++) {
        Game[x] = {}
        for (let y = 0; y <= 35; y++) {
          Game[x][y] = {
            color: 'RESET',
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
            }
          }
        }
      }
      document.getElementById('loaded').innerHTML = content;
    };
    reader.readAsText(f);
  } else {
    console.error('???game loading error???');
  }

  fi.remove()
  document.getElementById('flabel').remove()
}

window.onload = () => {
  if (localStorage.getItem('games')) {
    let games = JSON.parse(localStorage.getItem('games'))
    if (games.length <= 0) return;
    games.forEach(game => {
      let script = document.createElement('script')
      script.src = 'games/' + game + '.js '
      document.body.appendChild(script)
    })
    document.getElementById('tl').remove()
    document.getElementById('flabel').remove()
  }
}