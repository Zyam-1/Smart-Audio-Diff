import { DiffSegment, DiffType } from "../types/diff";


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

    let currentSegment : DiffSegment | null = null;

    for(let start = 0; start < minLength; start += windowSize) {
        let endIndex = Math.min(start + windowSize, minLength);
        
        let rmsA = Math.sqrt(waveA.slice(start, endIndex).reduce((acc, val) => acc + val ** 2, 0) / (endIndex - start)) || 0;
        let rmsB = Math.sqrt(waveB.slice(start, endIndex).reduce((acc, val) => acc + val ** 2, 0) / (endIndex - start)) || 0;

        let diffType: DiffType = Math.abs(rmsA - rmsB) > threshold ? ("added" as DiffType) : ("unchanged" as DiffType);

        let startSec = start / sampleRate;
        let endSec = endIndex / sampleRate;

        if(!currentSegment) {
            currentSegment = {start: startSec, end: endSec, type: diffType};
        } else if(currentSegment.type === diffType) {
            currentSegment.end = endSec;
        } else {
            segments.push(currentSegment);
            currentSegment = {start: startSec, end: endSec, type: diffType};
        }
    }

    if(currentSegment) {
        segments.push(currentSegment);
    }
    return segments;
}