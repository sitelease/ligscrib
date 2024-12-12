export function html(name : string, icons : Set<string>, prefix : string, faCompatibility ?: boolean, faUtility ?: boolean) {
    return `<!DOCTYPE html>
<html>
	<head>
		<title>${name}</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style>
			@import url('${name}.css');
			
			html, body { margin: 0; padding: 0; font-size: 12px; }
			body { background: #efefef; padding: 2em; font-family: Helvetica, Arial, sans-serif; }
			h1 { border-bottom: 2px solid #2980b9; color: #2980b9; font-weight: normal; font-size: 2em; }
			.container {display: grid; gap: 1em; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); }
			.box { text-align: center; border: 2px solid #2980b9; box-shadow: .2em .2em 5px rgba(0,0,0,.4) }
			.box__glyph { overflow: hidden; font-size: 60px; line-height: 100px; text-align: center; }
			.box__label { background: #2980b9; padding: .4em; text-align: center; color: white; overflow: scroll; text-wrap: nowrap; }
		</style>
	</head>
	<body>
	
	<h1>${name}</h1>

	<div class="container">
    ${Array.from(icons).map(icon => `<div class="box">
        <div class="box__glyph ${prefix}">
			<i class="${prefix} ${prefix}-${icon.replace(/_/g, "-")}"></i>
		</div>
        <div class="box__label">${prefix} ${prefix}-${icon.replace(/_/g, "-")}</div>
    </div>`).join('')}
	</div>
	
	${faCompatibility ? `<h1>${name} - Using Font Awesome Classes</h1>` : ''}
	
	${faCompatibility ? '<div class="container">' : ''}
    ${faCompatibility ? Array.from(icons).map(icon => `<div class="box">
        <div class="box__glyph">
			<i class="fa fa-${icon.replace(/_/g, "-")}"></i>
		</div>
        <div class="box__label">fa-${icon.replace(/_/g, "-")}</div>
    </div>`).join('') : ''}
	${faCompatibility ? '</div>' : ''}

	${faUtility ? `<h1>${name} - Rotate Utility Classes</h1>` : ''}
	${faUtility ? '<div class="container">' : ''}
	${faUtility ? ['rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'flip-both', ].map(util => `<div class="box">
        <div class="box__glyph">
			<i class="fa fa-bullhorn fa-${util}"></i>
		</div>
        <div class="box__label">fa-${util}</div>
    </div>`).join('') : ''}
	${faUtility ? '</div>' : ''}
	
	${faUtility ? `<h1>${name} - Animate Utility Classes</h1>` : ''}
	${faUtility ? '<div class="container">' : ''}
	${faUtility ? ['beat', 'bounce', 'fade', 'beat-fade', 'flip', 'spin', 'shake',].map(util => `<div class="box">
        <div class="box__glyph">
			<i class="fa fa-bullhorn fa-${util}"></i>
		</div>
        <div class="box__label">fa-${util}</div>
    </div>`).join('') : ''}
	${faCompatibility ? '</div>' : ''}

	</body>
</html>
`;
}
