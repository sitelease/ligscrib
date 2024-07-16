import svg2ttf from 'svg2ttf';
import ttf2woff from 'ttf2woff';
import ttf2woff2 from 'ttf2woff2';

export function convertSvgToTtf(buf : Buffer) : Uint8Array {
    return svg2ttf(buf.toString()).buffer;
}

export function convertTtf2Woff(arr : Uint8Array) : Buffer {
    return ttf2woff(arr);
}

export function convertTtf2Woff2(buf : Buffer) : Buffer {
    return ttf2woff2(buf);
}
