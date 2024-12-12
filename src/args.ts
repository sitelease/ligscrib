import yargs from 'yargs';
import pkg from '../package.json';

export const ALLOWED_TYPES = new Set(['svg', 'ttf', 'woff', 'woff2']);

export async function getArgs(argv = process.argv) : Promise<{ inputs: string[], outDir: string, name: string, prefix: string[], verbose?: boolean, css: boolean, scss: boolean, example?: boolean, faIconClasses?: boolean, faUtilityClasses?: boolean, types: Set<string> }> {
    const args = await yargs
        .version(pkg.version)
        
        .alias('outDir', [ 'out-dir', 'o' ])
        .describe('outDir', 'Output directory')
        .default('outDir', '.')
        
        .alias('name', 'n')
        .describe('name', 'Font file name (w/o file extension)')
        .default('name', 'icons')
        
        .alias('types', 't')
        .describe('types', 'Created font file types')
        .default('types', 'svg,ttf,woff,woff2')
        
        .boolean('css')
        .describe('css', 'Create a CSS file (--no-css)')
        .default('css', true)
        
        .boolean('scss')
        .describe('scss', 'Create a SCSS file')
        .default('scss', false)
        
        .alias('example', 'e')
        .boolean('example')
        .describe('example', 'Create a HTML example file')
                
        .alias('faIconClasses', ['fa-icon-classes', 'f'])
        .boolean('faIconClasses')
        .describe('faIconClasses', 'Creates a "fa-" css class for each icon and adds base font awesome classes')

        .alias('faUtilityClasses', ['fa-utility-classes', 'u'])
        .boolean('faUtilityClasses')
        .describe('faUtilityClasses', 'Adds font awesome utility classes to output stylsheet. Pair with "-f"')
        
        .alias('prefix', 'p')
        .describe('prefix', 'An optional "fa-" like prefix to add to each icon class. Pair with "-f"')
        .default('prefix', '.')
        
        .alias('verbose', 'v')
        .boolean('verbose')
        .describe('verbose', 'Verbose output')
        
        .usage('\n  Usage: ligscrib [options] <globs...>')
        .demandCommand(1)
        .wrap(Math.min(100, yargs.terminalWidth()))
        
        .parse(argv.slice(2));
    
    const types = new Set<string>(args.types.split(/,/));
    
    types.forEach(type => {
        if(!ALLOWED_TYPES.has(type)) {
            types.delete(type);
        }
    });
    
    return {
        inputs: args._.map(String),
        outDir: args.outDir,
        name: args.name,
        css: args.css,
        scss: args.scss,
        example: args.example,
        faIconClasses: args.faIconClasses,
        faUtilityClasses: args.faUtilityClasses,
        prefix: args.prefix,
        verbose: args.verbose,
        types
    };
}
