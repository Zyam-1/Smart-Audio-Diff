import { DiffSegment, DiffType } from "../types/diff.js";
import { getSpectogram, compareSpectra } from "./spectralDiff.js";


// compare two waveform using RMS over sliding windows

export const compareWaveforms = (
    waveA: number[],
    waveB: number[],
    sampleRate: number = 44100,
    windowSizeMs: number = 50,
    threshold: number = 0.01
): DiffSegment[] => {
    let windowSize = Math.floor((windowSizeMs / 100) * sampleRate);
    let minLength = Math.min(waveA.length, waveB.length);
    let segments: DiffSegment[] = [];

    let currentSegment: DiffSegment | null = null;

    for (let start = 0; start < minLength; start += windowSize) {
        let endIndex = Math.min(start + windowSize, minLength);

        let rmsA = Math.sqrt(waveA.slice(start, endIndex).reduce((acc, val) => acc + val ** 2, 0) / (endIndex - start)) || 0;
        let rmsB = Math.sqrt(waveB.slice(start, endIndex).reduce((acc, val) => acc + val ** 2, 0) / (endIndex - start)) || 0;

        let diffType: DiffType = Math.abs(rmsA - rmsB) > threshold ? ("added" as DiffType) : ("unchanged" as DiffType);

        // if RMS says unchanged, Do specteral comparison
        if (diffType === "unchanged") {
            //Extract small chunk for FFT
            let chunkA = waveA.slice(start, endIndex);
            let chunkB = waveB.slice(start, endIndex);

            // Quick spectral check (simplified for performance)
            let specA = getSpectogram(chunkA, sampleRate);
            let specB = getSpectogram(chunkB, sampleRate);
            let spectralDiffs = compareSpectra(specA, specB);

            //Average diff across frames in chunks

            let avgSpectralDiff = spectralDiffs.reduce((a, b) => a + b, 0) / (spectralDiffs.length || 1);

            //Threshold for spectral difference (tune this value)
            if (avgSpectralDiff > 5.0) {
                diffType = "rephrased";
            }
        }
        let startSec = start / sampleRate;
        let endSec = endIndex / sampleRate;

        if (!currentSegment) {
            currentSegment = { start: startSec, end: endSec, type: diffType };
        } else if (currentSegment.type === diffType) {
            currentSegment.end = endSec;
        } else {
            segments.push(currentSegment);
            currentSegment = { start: startSec, end: endSec, type: diffType };
        }
    }

    if (currentSegment) {
        segments.push(currentSegment);
    }
    return segments;
}