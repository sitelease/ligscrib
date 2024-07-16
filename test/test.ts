import { execSync } from 'node:child_process';
import path from 'node:path';
import fontkit from 'fontkit';
import fs from 'node:fs';

const BIN = path.resolve(__dirname, '../bin/ligscrib.js');

describe('ligscribe CLI', () => {
    let output: string;

    beforeAll(() => {
        fs.rmSync(`${__dirname}/output`, { recursive: true });
        output = stripAnsi(
            execSync(`${BIN} --out-dir output --example source/*.svg`, {
            cwd: __dirname,
            }).toString('utf-8')
        );
    });

    it('should rename icons', () => {
        expect(output).toContain('✔  added arrow-left as arrow_left');
        expect(output).toContain('✔  added www');
    });

    it('should create files matching snapshots', () => {
        expect(
            fs.readFileSync(`${__dirname}/output/example.html`, { encoding: 'utf-8' })
        ).toMatchSnapshot();
        expect(
            fs.readFileSync(`${__dirname}/output/icons.css`, { encoding: 'utf-8' })
        ).toMatchSnapshot();
        expect(
            fs.readFileSync(`${__dirname}/output/icons.svg`, { encoding: 'utf-8' })
        ).toMatchSnapshot();

        // TTF/WOFF/WOFF2 has non-deterministic content and cannot be snapshot tested
        // expect(fs.readFileSync(`${__dirname}/output/icons.ttf`)).toMatchSnapshot();
        // expect(fs.readFileSync(`${__dirname}/output/icons.woff`)).toMatchSnapshot();
        // expect(fs.readFileSync(`${__dirname}/output/icons.woff2`)).toMatchSnapshot();
    });

    it('should contain given icon ligatures in svg', () => {
        const svg = fs.readFileSync(`${__dirname}/output/icons.svg`, { encoding: 'utf-8' });

        expect(svg).toContain('glyph-name="arrow_left"');
        expect(svg).toContain('glyph-name="www"');
    })

    it.each([['ttf'], ['woff'], ['woff2']])('should contain given icon ligatures in %s', (format) => {
        const font = fontkit.openSync(
            `${__dirname}/output/icons.${format}`
        ) as fontkit.Font;

        expect(font.layout('www').glyphs).toHaveLength(1);
        expect(font.layout('www').glyphs[0].isLigature).toBeTruthy();
        expect(font.layout('arrow_left').glyphs).toHaveLength(1);
        expect(font.layout('arrow_left').glyphs[0].isLigature).toBeTruthy();

        expect(font.layout('foobar').glyphs.every(g => !g.isLigature)).toBeTruthy();
    });
});

const ANSI_REGEXP = new RegExp(
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
    'g'
);

export default function stripAnsi(string: string) {
    return string.replace(ANSI_REGEXP, '');
}
