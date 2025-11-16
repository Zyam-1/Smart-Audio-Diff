import { describe, it } from "node:test";
import {compareWaveforms} from "../src/audio/waveFormDiff.js";


describe("Waveform Comparison Tests", () => {
    it("should identify unchanged waveforms", () => {
        let waveA = [0, 0.1, 0.2, 0.3];
        let waveB = [0, 0.1, 0.25, 0.3];
        let segments = compareWaveforms(waveA, waveB, 1, 1, 0.01);
        console.log(segments);

    })
})