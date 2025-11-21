/**
 * Normalizes audio data to a target peak amplitude
 * This ensures that volume differences between files don't
 * affect comparison
 */

export const normalizeAudio = (data: number[], targetLevel: number = 1.0): number[] => {

    // 1: Find the peak amplitude
    let max = 0;
    for (let i = 0; i < data.length; i++) {
        const abs = Math.abs(data[i]);
        if (abs > max) max = abs;
    }

    // 2: Handle silence
    if (max === 0) return data;

    //3: Calculate gain ratio
    const ratio = targetLevel / max;

    //4. Apply gain if ncessary (skip if already normalized)
    if (Math.abs(ratio - 1) < 0.001) return data;

    return data.map(s => s * ratio);

}