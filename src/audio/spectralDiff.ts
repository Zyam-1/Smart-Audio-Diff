import FFT from 'fft-js';


export const getSpectogram = (audioData: number[], sampleRate: number): number[][] => {
    const fftSize = 2048;
    let f = new FFT(fftSize);
    let output = new Array(fftSize);
    let magnitudes: number[][] = [];

    // Step size (overlap of 50%)
    let step = fftSize / 2;

    for (let i = 0; i < audioData.length - fftSize; i += step) {
        let frame = audioData.slice(i, i + fftSize);

        //Applying Hann Window to reduce spectral leakage
        let windowed = frame.map((val, idx) => {
            val * (0.5 * (1 - Math.cos((2 * Math.PI * idx) / (fftSize - 1))));
        })

        f.realTransform(output, windowed);

        let frameMags: number[] = [];

        // We only need to extract first half (Nyquist frequency)
        for (let j = 0; j < fftSize / 2; j++) {
            let real = output[j * 2];
            let imag = output[j * 2 + 1];

            //Calculate magnitude
            frameMags.push(Math.sqrt(real * real + imag * imag));
        }
        magnitudes.push(frameMags);
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