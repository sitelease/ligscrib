export function css(name : string, types : Set<string>, icons : Set<string>, prefix : string, faCompatibility ?: boolean, faUtility ?: boolean) : string {
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
.${prefix}
.${prefix}--before::before,
.${prefix}--after::after,${faCompatibility ? `,
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
.fa-1x {
  font-size: 1em; }

.fa-2x {
  font-size: 2em; }

.fa-3x {
  font-size: 3em; }

.fa-4x {
  font-size: 4em; }

.fa-5x {
  font-size: 5em; }

.fa-6x {
  font-size: 6em; }

.fa-7x {
  font-size: 7em; }

.fa-8x {
  font-size: 8em; }

.fa-9x {
  font-size: 9em; }

.fa-10x {
  font-size: 10em; }

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em; }

.fa-xs {
  font-size: 0.75em;
  line-height: 0.08333em;
  vertical-align: 0.125em; }

.fa-sm {
  font-size: 0.875em;
  line-height: 0.07143em;
  vertical-align: 0.05357em; }

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em; }

.fa-xl {
  font-size: 1.5em;
  line-height: 0.04167em;
  vertical-align: -0.125em; }

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em; }

.fa-fw {
  text-align: center;
  width: 1.25em; }

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0; }
  .fa-ul > li {
    position: relative; }

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit; }

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em); }

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em); }

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em); }

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out); }

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1)); }

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1)); }

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1)); }

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out); }

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear); }

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear); }

.fa-spin-reverse {
  --fa-animation-direction: reverse; }

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8)); }

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s; } }

@keyframes fa-beat {
  0%, 90% {
    transform: scale(1); }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25)); } }

@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0); }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0); }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em)); }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0); }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em)); }
  64% {
    transform: scale(1, 1) translateY(0); }
  100% {
    transform: scale(1, 1) translateY(0); } }

@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4); } }

@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1); }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125)); } }

@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg)); } }

@keyframes fa-shake {
  0% {
    transform: rotate(-15deg); }
  4% {
    transform: rotate(15deg); }
  8%, 24% {
    transform: rotate(-18deg); }
  12%, 28% {
    transform: rotate(18deg); }
  16% {
    transform: rotate(-22deg); }
  20% {
    transform: rotate(22deg); }
  32% {
    transform: rotate(-12deg); }
  36% {
    transform: rotate(12deg); }
  40%, 100% {
    transform: rotate(0deg); } }

@keyframes fa-spin {
  0% {
    transform: rotate(0deg); }
  100% {
    transform: rotate(360deg); } }

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

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1); }

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0)); }

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

.fa-inverse {
  color: var(--fa-inverse, #fff); }
` : ''}
/* Icon Classes */
${faCompatibility ? Array.from(icons).map(icon => `
.fa-${icon.replace(/_/g, "-")}:before, .${prefix}-${icon.replace(/_/g, "-")}:before {
    --i: "${icon}";
}`).join('') : Array.from(icons).map(icon => `
.${prefix}-${icon.replace(/_/g, "-")}:before {
    --i: "${icon}";
}`).join('')}
`
}
