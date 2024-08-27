// Compatible with Sandbox and Paint

Kopal8.Text.CreateText('COLOR: RED', 'WHITE', 2, 2, 'clr')

if (pcolor) {
    let clrs = ['RED', 'BLUE', 'BROWN', 'MAGENTA', 'GRAY', 'WHITE', 'GREEN', 'YELLOW', 'CYAN']
    Kopal8.Input.Button.onClick(Kopal8.Input.Button.RIGHT, () => {
        pcolor = clrs[clrs.indexOf(pcolor) + 1]
        Kopal8.Text.GetText('clr').content = 'COLOR: ' + pcolor
    })
}