function loadGame() {
    var fi = document.getElementById('tl');
    var f = fi.fs[0];
  
    if (f) {
      var reader = new fReader();
      reader.onload = function(event) {
        var content = event.target.result;
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
        document.getElementById('loaded').innerHTML = content;
      };
      reader.readAsText(f);
    } else {
      console.error('???game loading error???');
    }
  }