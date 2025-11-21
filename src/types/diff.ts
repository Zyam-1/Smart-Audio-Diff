export type DiffType = "unchanged" | "added" | "removed" | "rephrased";

export interface DiffSegment {
    start: number; //start time in seconds
    end: number; //end time in seconds
    type: DiffType; //type of diff
}

export interface DiffResult {
    segments: DiffSegment[];
    waveformDiff: number[]; // raw waveform diff data array
    transcriptDiff: string[]; // transcript diff as a string array
    detectedOffset?: number;
}