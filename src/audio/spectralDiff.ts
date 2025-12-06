import fft from 'fft-js';

export const getSpectogram = (audioData: number[], sampleRate: number): number[][] => {
    const fftSize = 2048;
    const magnitudes: number[][] = [];
    const step = fftSize / 2;

    for (let i = 0; i < audioData.length - fftSize; i += step) {
        const frame = audioData.slice(i, i + fftSize);

        // Apply Hann Window
        const windowed = frame.map((val, idx) =>
            val * (0.5 * (1 - Math.cos((2 * Math.PI * idx) / (fftSize - 1))))
        );

        // fft-js uses a direct function call, not a class
        const phasors = fft.fft(windowed);
        const freqs = fft.util.fftMag(phasors);

        magnitudes.push(freqs);
    }
    return magnitudes;
}

export const compareSpectra = (specA: number[][], specB: number[][]): number[] => {
    let diffs: number[] = [];
    let minLen = Math.min(specA.length, specB.length);

    for (let i = 0; i < minLen; i++) {
        let frameA = specA[i];
        let frameB = specB[i];

        //Calculate Euclidean distance between frames
        let sumSq = 0;
        for (let j = 0; j < frameA.length; j++) {
            let diff = frameA[j] - frameB[j];
            sumSq += diff * diff;
        }
        diffs.push(Math.sqrt(sumSq));
    }
    return diffs;
}