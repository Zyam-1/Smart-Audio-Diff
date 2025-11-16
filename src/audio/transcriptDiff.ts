import { DiffSegment, DiffResult } from "../types/diff";
import {diff_match_patch} from "diff-match-patch";

//compare two transcripts using diff-match-patch

export const compareTranscripts = (
    textA: string ,
    textB: string
): DiffResult["transcriptDiff"] => {
    let dmp = new diff_match_patch();
    let diffs = dmp.diff_main(textA, textB);
    dmp.diff_cleanupSemantic(diffs);

    return diffs.map(([op, text]) => {
        switch(op) {
            case 0:
                return `UNCHANGED: ${text}`;
            case 1: 
                return `ADDED: ${text}`;
            case -1:
                return `REMOVED: ${text}`;
            default:
                return text;
        }
    })
}