import fs from "fs";
import WaveFileModule from "wavefile";
import { validateFile } from "../utils/fileUtils.js";

const { WaveFile } = WaveFileModule as any;

//Waveform samples normalized between -1 and 1

export const getWaveForm = async (filePath: string): Promise<number[]> => {
    validateFile(filePath);

    const buffer = fs.readFileSync(filePath);
    const wav = new WaveFile(buffer);

    const rawSamples = wav.getSamples(true, Int16Array);
    const samples: number[] = Array.from(rawSamples);
    return samples.map((s) => s / 32768);
}