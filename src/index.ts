// import globals
import 'colors';

// import platform
import * as path from 'path';

// import packages
import SvgIcons2SvgFont from 'svgicons2svgfont';
import { WritableStreamBuffer } from 'stream-buffers';
import fs from 'node:fs';
import fsp from 'node:fs/promises';

// import sources
import { getArgs } from './args';
import { css } from './templates/css';
import { scss } from './templates/scss';
import { html } from './templates/html';
import { convertSvgToTtf, convertTtf2Woff, convertTtf2Woff2 } from './converter';
import { normalizeName, resolveInputGlobs } from './utils';

// re-export
export * from './args';
export * from './templates/css';
export * from './templates/html';
export * from './converter';
export * from './utils';

export async function main(argv = process.argv) {
    try {
        const args = await getArgs(argv);
        const log = args.verbose ? (...logs : any[]) => console.log(...logs) : () => {};
        const rlog = args.verbose ? (str : string) => process.stdout.write(str) : (_s : string) => {};
        
        if(0 === args.types.size) {
            throw new Error('No valid types provided'.red);
        }
        
        const files = await resolveInputGlobs(args.inputs);
        
        log('input files', files);
        
        const fontStream = new SvgIcons2SvgFont({
            fontName: args.name,
            normalize: true,
            fontHeight: 1000,
            log
        });
        
        const svgStream = new WritableStreamBuffer();
        
        fontStream.pipe(svgStream);
        
        const done = new Promise((resolve, reject) => {
            svgStream.on('finish', resolve).on('error', reject);
        });
        
        const icons = new Set<string>();
        
        for(const file of files) {
            const ext = path.extname(file);
            const filename = path.basename(file, ext);
            const name = normalizeName(filename);
            if(!/^\.svg$/i.test(ext)) {
                throw new Error(`Only SVG allowed, "${file}" given`.red);
            }
            
            if(name === filename) {
                console.log('\u2714'.green, ` added ${name.cyan}`)
            } else {
                console.log('\u2714'.yellow, ` added ${filename.yellow} as ${name.cyan}`)
            }
    
            const stream = fs.createReadStream(file);
            (stream as any).metadata = {
                unicode: [ name ],
                name
            };
    
            icons.add(name);
            fontStream.write(stream);
        }
    
        if(0 === icons.size) {
            throw new Error('No valid files provided'.red);
        }
        
        fontStream.end();
        
        await done;
        log('SVG Font created');
        
        await fsp.mkdir(args.outDir, { recursive: true });
        const svg = svgStream.getContents();

        if(!svg) {
            throw new Error('Could not generate SVG'.red);
        }

        const ttf = convertSvgToTtf(svg);
        
        if(args.types.has('svg')) {
            rlog('Write svg... ');
            await fsp.writeFile(path.join(args.outDir, `${args.name}.svg`), svg);
            rlog('\u2714\n'.green);
        }
        
        if(args.types.has('ttf')) {
            rlog('Write ttf... ');
            await fsp.writeFile(path.join(args.outDir, `${args.name}.ttf`), Buffer.from(ttf));
            rlog('\u2714\n'.green);
        }
        if(args.types.has('woff')) {
            rlog('Write woff... ');
            await fsp.writeFile(path.join(args.outDir, `${args.name}.woff`), convertTtf2Woff(ttf));
            rlog('\u2714\n'.green);
        }
    
        if(args.types.has('woff2')) {
            rlog('Write woff2... ');
            await fsp.writeFile(path.join(args.outDir, `${args.name}.woff2`), convertTtf2Woff2(Buffer.from(ttf)));
            rlog('\u2714\n'.green);
        }
        
        if(args.css || args.example) {
            rlog('Write css... ');
            await fsp.writeFile(path.join(args.outDir, `${args.name}.css`), css(args.name, args.types, icons, args.prefix, args.faIconClasses, args.faUtilityClasses));
            rlog('\u2714\n'.green);
        }
        
        if(args.scss) {
            rlog('Write scss... ');
            await fsp.writeFile(path.join(args.outDir, `${args.name}.scss`), scss(args.name));
            rlog('\u2714\n'.green);
        }
    
        if(args.example) {
            rlog('Write html... ');
            await fsp.writeFile(path.join(args.outDir, `demo.html`), html(args.name, icons, args.prefix, args.faIconClasses, args.faUtilityClasses));
            rlog('\u2714\n'.green);
        }
        
        console.log();
        console.log('\u2714  Done'.green);
        
    } catch(e: any) {
        console.error(e.message || e);
        process.exit(1);
    }
}
