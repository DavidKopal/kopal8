function loadGame() {
    var fi = document.getElementById('tl');
    var f = fi.files[0];
  
    if (f) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var content = event.target.result;
        for (let x = 0; x <= 35; x++) {
            Game[x] = {}
            for (let y = 0; y <= 20; y++) {
                Game[x][y] = {
                    color: 'RESET',
                    x: x,
                    y: y,
                    ChangeColor: function(color) {
                        this.color = color
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
  }