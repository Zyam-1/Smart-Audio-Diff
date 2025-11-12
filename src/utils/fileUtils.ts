import fs from "fs";
import path from "path";



//check if files exists and is readable
export const validateFile = (filePath : string): void => {
    if(!fs.existsSync(filePath)) {
        throw new Error(`File at path ${filePath} does not exist.`);
    }
    const ext = path.extname(filePath).toLowerCase();
    const allowedExtensions = [".txt", ".md", ".json", ".wav", ".mp3"];
    if(!allowedExtensions.includes(ext)) {
        throw new Error("File Extension not supported. Supported extensions are: " + allowedExtensions.join(", "));
    }   
}

// delete temp files safely
export const deleteFile = (filePath : string): void => {
    if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}