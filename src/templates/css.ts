export function css(name : string, types : Set<string>, icons : Map<string, string>, prefix : string, faCompatibility ?: boolean, faUtility ?: boolean) : string {
    const src : string[] = [];
    
    if(types.has('woff2')) {
        src.push(`url('${name}.woff2') format('woff2')`);
    }
    
    if(types.has('woff')) {
        src.push(`url('${name}.woff') format('woff')`);
    }
    
    if(types.has('ttf')) {
        src.push(`url('${name}.ttf') format('truetype')`);
    }
    
    if(types.has('svg')) {
        src.push(`url('${name}.svg#${name}') format('svg')`);
    }
    
    return `@font-face {
    font-family: '${name}';
    src: ${src.join(',\n         ')};
    font-weight: normal;
    font-style: normal;
    font-display: block;
}
.${prefix},
.${prefix}--before::before,
.${prefix}--after::after${faCompatibility ? `,
.fas,
.far,
.fab,
.fa-solid,
.fa-regular,
.fa-brands,
.fa` : ''} {
  /* use !important to prevent issues with browser extensions that change fonts */
	font-family: '${name}' !important;
	display: inline-block;
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
  vertical-align: middle;
  white-space: nowrap;
  text-wrap: nowrap;

	/* Enable Ligatures ================ */
	letter-spacing: 0;
	font-feature-settings: "liga";
	font-variant-ligatures: discretionary-ligatures;
	/* Better Font Rendering =========== */
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.${prefix}::before${faCompatibility ? `,
.fas::before,
.far::before,
.fab::before,
.fa-solid::before,
.fa-regular::before,
.fa-brands::before,
.fa::before` : ''} {
  content: var(--i);
}

${faUtility ? `
/* FA Utility Classes */
.fa-fw {
  text-align: center;
  width: 1.25em; }

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear); }

.fa-spin-reverse {
  --fa-animation-direction: reverse; }

@media (prefers-reduced-motion: reduce) {
  .fa-spin {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s; 
  } 
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg); }
  100% {
    transform: rotate(360deg); } 
}

.fa-rotate-90 {
  transform: rotate(90deg); }

.fa-rotate-180 {
  transform: rotate(180deg); }

.fa-rotate-270 {
  transform: rotate(270deg); }

.fa-flip-horizontal {
  transform: scale(-1, 1); }

.fa-flip-vertical {
  transform: scale(1, -1); }

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em; }

.fa-stack-1x,
.fa-stack-2x {
  left: 0;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: var(--fa-stack-z-index, auto); }

.fa-stack-1x {
  line-height: inherit; }

.fa-stack-2x {
  font-size: 2em; }
` : ''}
/* Icon Classes */
${Array.from(icons).map(icon => `
${icon[1]} {
    --i: "${icon[0]}";
}`).join('')}
`
}
