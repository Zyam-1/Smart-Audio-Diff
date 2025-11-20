import { getWaveForm } from "./audio/audioProcessor.js";
import { compareWaveforms } from "./audio/waveFormDiff.js";
import { compareTranscripts } from "./audio/transcriptDiff.js";
import { DiffResult } from "./types/diff.js";

//Main Functionality to compare two audio files and their transcripts

export const compareAudio = async (
    fileA: string,
    fileB: string,
    options?: { transcriptA?: string; transcriptB?: string }
): Promise<DiffResult> => {
    try {
        console.log('Reading and processing audio files...');
        
        //Extract WaveForms directly from WAV files (no ffmpeg needed)
        let waveA = await getWaveForm(fileA);
        let waveB = await getWaveForm(fileB);

        let segments = compareWaveforms(waveA, waveB);

        let transcriptDiff: string[] = [];
        
        if (options?.transcriptA && options?.transcriptB) {
            transcriptDiff = compareTranscripts(options.transcriptA, options.transcriptB);
        }

        return {
            segments,
            transcriptDiff,
            waveformDiff: []
        }

    } catch (error) {
        throw new Error(`Error comparing audio: ${error}`);
    }
}