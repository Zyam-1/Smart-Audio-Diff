import { getWaveForm } from "./audio/audioProcessor.js";
import { compareWaveforms } from "./audio/waveFormDiff.js";
import { compareTranscripts } from "./audio/transcriptDiff.js";
import { DiffResult } from "./types/diff.js";
import { findOffset } from "./audio/alignment.js";
import { normalizeAudio } from "./audio/normalizeAudio.js";


//Main Functionality to compare two audio files and their transcripts

export const compareAudio = async (
    fileA: string,
    fileB: string,
    options?: { transcriptA?: string; transcriptB?: string }
): Promise<DiffResult> => {
    try {
        //Extract WaveForms directly from WAV files (no ffmpeg needed)
        let waveA = await getWaveForm(fileA);
        let waveB = await getWaveForm(fileB);


        //Normalize Audio
        waveA = normalizeAudio(waveA);
        waveB = normalizeAudio(waveB);

        // -- Alignment Logic
        const offset = findOffset(waveA, waveB, 44100);

        const sampleRate = 44100;
        const offsetSamples = Math.round(offset * sampleRate);

        let alignedWaveB = waveB;

        if (offsetSamples > 0) {
            // B is late, cut the start
            alignedWaveB = waveB.slice(offsetSamples);
        } else if (offsetSamples < 0) {
            // B is early, pad with silence
            const padding = new Array(Math.abs(offsetSamples)).fill(0);
            alignedWaveB = [...padding, ...waveB];
        }
        // Alignment Logic ends
        let segments = compareWaveforms(waveA, alignedWaveB);
        let transcriptDiff: string[] = [];

        if (options?.transcriptA && options?.transcriptB) {
            transcriptDiff = compareTranscripts(options.transcriptA, options.transcriptB);
        }

        return {
            segments,
            transcriptDiff,
            waveformDiff: [],
            detectedOffset: offset
        }

    } catch (error) {
        throw new Error(`Error comparing audio: ${error}`);
    }
}