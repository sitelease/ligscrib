import { glob } from 'glob';

export async function resolveInputGlobs(inputs : string[]) : Promise<string[]> {
    const nlist : string[][] = await Promise.all(
        inputs.map(input => {
            return glob(input);
        })
    );
    
    const list = nlist.reduce((t, c) => t.concat(c), []).filter((c, i, a) => i === a.indexOf(c));
    
    return list;
}

export function normalizeName(name : string) {
    return name.toLowerCase().split("_")[0].replace(/-/g, '_').replace(/[^a-z0-9_]/g, '');
}

export function generateIconSelectors(filename : string, prefix : string, faCompatibility: boolean) {   
    let selectors = filename.toLowerCase().split("_");
    if (faCompatibility) {
        // This was the old version. We changed this due to the file size
        // selectors = selectors.map(selector => `.fa-${selector}:before, .${prefix}-${selector}:before`);
        selectors = selectors.map(selector => `.fa-${selector}:before`);
    } else {
        selectors = selectors.map(selector => `.${prefix}-${selector}:before`);
    }
    return selectors.join(", ");
}
