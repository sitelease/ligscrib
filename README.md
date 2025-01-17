# @sitelease/ligscrib

> Tool to create ligature icon fonts from svg images. Enhanced to allow for compatability with font awesome

## Install

Ligscrib requires NodeJS version 20 or later.

```bash
# using yarn
$ yarn global add @sitelease/ligscrib

# using npm
$ npm install -g @sitelease/ligscrib
```

## Usage

```bash
$ ligscrib --help

  Usage: ligscrib [options] <globs...>

Options:
      --help                                    Show help                                  [boolean]
      --version                                 Show version number                        [boolean]
  -o, --outDir, --out-dir                       Output directory                      [default: "."]
  -n, --name                                    Font file name (w/o file extension)
                                                                                  [default: "icons"]
  -t, --types                                   Created font file types
                                                                     [default: "svg,ttf,woff,woff2"]
      --css                                     Create a CSS file (--no-css)
                                                                           [boolean] [default: true]
      --scss                                    Create a SCSS file        [boolean] [default: false]
  -e, --example                                 Create a HTML example file                 [boolean]
  -f, --faIconClasses, --fa-icon-classes        Basic Font Awesome icon class output       [boolean]
  -u, --faUtilityClasses, --fa-utility-classes  Font Awesome utility class output          [boolean]
  -p, --prefix                                  Prefix to add to each icon class     [default: "si"]
  -v, --verbose                                 Verbose output                             [boolean]
```

### Example

```bash
$ ligscrip raw-icons/* --out-dir out --example
✔  added arrow-left as arrow_left
✔  added check
✔  added error
✔  added information
✔  added mail
✔  added phone

✔  Done

```

## References

- [svgicons2svgfont](https://www.npmjs.com/package/svgicons2svgfont)
- [svg2ttf](https://www.npmjs.com/package/svg2ttf)
- [ttf2woff](https://www.npmjs.com/package/ttf2woff)
- [ttf2woff2](https://www.npmjs.com/package/ttf2woff2)

## License

**MIT**

Copyright (c) 2021 Neoskop GmbH  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
