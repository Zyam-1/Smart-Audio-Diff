declare module 'fft-js' {
    export function fft(signal: number[]): [number, number][];
    export const util: {
        fftMag: (phasors: [number, number][]) => number[];
    };
}