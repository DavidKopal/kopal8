// Compatible with Sandbox and Paint

Kopal8.Text.CreateText('COLOR: RED', 'WHITE', 2, 2, 'clr')

let clrs = ['RED', 'BLUE', 'BROWN', 'MAGENTA', 'GRAY', 'WHITE', 'GREEN', 'YELLOW', 'CYAN']
Kopal8.Input.Button.onClick(Kopal8.Input.Button.RIGHT, () => {
    if (games.includes('sandbox') || games.includes('paint')) {
        pcolor = clrs[clrs.indexOf(pcolor) + 1]
        if (!pcolor) pcolor = clrs[0];
        Kopal8.Text.GetText('clr').content = 'COLOR: ' + pcolor
    }
})