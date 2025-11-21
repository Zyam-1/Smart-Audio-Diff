// Calculate the time offset betwen two waveforms using cross-correlation
// Returns the offset in seconds that waveB should be shifted to match waveA
// Positive offset means waveB starts later than waveA


export const findOffset = (
    waveA: number[],
    waveB: number[],
    sampleRate: number,
    downsampleRate: number = 1000
): number => {

    // 1: Downsample to reduce computational processing load
    const step = Math.floor(sampleRate / downsampleRate);
    const smallA = downsample(waveA, step);
    const smallB = downsample(waveB, step);

    // 2: Cross-correlation
    // We search for the best overlap
    let bestOffset = 0;
    let maxCorrelation = -Infinity;

    const lenA = smallA.length;
    const lenB = smallB.length;

    // Optimization: Only calculate if we have atleast 10%
    // overlap or 1 seconds
    const minOverlap = Math.min(100, Math.min(lenA, lenB));

    //Slide B across A
    for (let lag = -lenB + minOverlap; lag < lenA - minOverlap; lag++) {

        let sum = 0;
        let count = 0;

        const startA = Math.max(0, lag);
        const endA = Math.min(lenA, lenB + lag);

        for (let i = startA; i < endA; i++) {
            sum += smallA[i] * smallB[i - lag];
            count++;
        }

        //Normalize;

        const correlation = count > 0 ? sum / count : 0;

        if (correlation > maxCorrelation) {
            maxCorrelation = correlation;
            bestOffset = lag;
        }
    }
    //Convert downsampled index offset back to seconds
    return (bestOffset * step) / sampleRate;
};

const downsample = (data: number[], step: number): number[] => {
    const result: number[] = [];
    for (let i = 0; i < data.length; i += step) {
        result.push(data[i]);
    }
    return result
}