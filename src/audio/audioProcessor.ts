import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import { WaveFile } from "wavefile";
import { validateFile, deleteFile } from "../utils/fileUtils.js";


//normalize audio to WAV, mono, 44.1kHz

export const normalizeAudio = async (inputPath: string): Promise<string> => {
    validateFile(inputPath);

    const outputPath = path.join(
        path.dirname(inputPath),
        `${path.basename(inputPath, path.extname(inputPath))}_normalized.wav`
    );

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .audioChannels(1)
            .audioFrequency(44100)
            .toFormat("wav")
            .on("end", () => resolve(outputPath))
            .on("error", (err: any) => reject(err))
    })
}


//Waveform samples normalized between -1 and 1

export const getWaveForm = (filePath: string): number[] => {
    validateFile(filePath);

    const buffer = fs.readFileSync(filePath);
    const wav = new WaveFile(buffer);

    const rawSamples = wav.getSamples(true, Int16Array);
    const samples: number[] = Array.from(rawSamples);
    return samples.map((s) => s / 32768);
}