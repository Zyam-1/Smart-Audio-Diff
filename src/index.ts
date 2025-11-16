import { normalizeAudio, getWaveForm } from "./audio/audioProcessor.js";
import { compareWaveforms } from "./audio/waveFormDiff.js";
import { compareTranscripts } from "./audio/transcriptDiff.js";
import { DiffResult } from "./types/diff.js";
import { deleteFile } from "./utils/fileUtils.js";

//Main Functionality to compare two audio files and their transcripts


export const compareAudio = async (
    fileA: string,
    fileB: string,
    options?: { transcriptA?: string; transcriptB?: string }
): Promise<DiffResult> => {
    try {
        //Normalize Audio Files
        let normA = await normalizeAudio(fileA);
        let normB = await normalizeAudio(fileB);

        //Extract WaveForms
        let waveA = await getWaveForm(normA);
        let waveB = await getWaveForm(normB);

        let segments = compareWaveforms(waveA, waveB);

        let transcriptDiff: string[] = [];
        
        if (options?.transcriptA && options?.transcriptB) {
            transcriptDiff = compareTranscripts(options.transcriptA, options.transcriptB);
        }

        deleteFile(normA);
        deleteFile(normB);

        return {
            segments,
            transcriptDiff,
            waveformDiff: []
        }

    } catch (error) {
        throw new Error(`Error comparing audio: ${error}`);
    }
}