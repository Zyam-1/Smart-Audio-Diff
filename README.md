# Smart Audio Diff

A TypeScript audio diffing library for comparing WAV audio files and their transcripts. Computes differences between audio waveforms and text transcripts with detailed segment analysis.

**Features:**
- 🔊 **Compare Audio Waveforms**: Detects differences between two WAV files.
- 🎚️ **Volume Normalization**: Automatically normalizes audio levels before comparison to handle volume differences.
- ⏱️ **Audio Alignment**: Automatically aligns audio files to account for timing offsets.
- 📝 **Transcript Comparison**: Compare text transcripts using diff-match-patch.
- 📊 **Detailed Analysis**: Get segment information with precise timing (start/end in seconds).
- 🚀 **Pure TypeScript**: Full type safety and lightweight.
- 📦 **ESM-first**: Modern module structure.

## Installation

```bash
npm install smart-audio-diff
```

## Prerequisites

This package works with **WAV** audio files. Ensure your audio files are in WAV format before using this library.

## Usage

### Basic Comparison

Compare two WAV audio files. The library will automatically normalize volume and align the audio tracks before comparing.

```javascript
import { compareAudio } from 'smart-audio-diff';

async function compareSongs() {
  try {
    const diff = await compareAudio('./song_original.wav', './song_modified.wav');
    
    console.log('Detected Offset:', diff.detectedOffset);
    console.log('Waveform Segments:', diff.segments);
    // Output: [
    //   { start: 0, end: 2.5, type: 'unchanged' },
    //   { start: 2.5, end: 5.1, type: 'added' },
    //   { start: 5.1, end: 10.0, type: 'unchanged' }
    // ]
  } catch (error) {
    console.error('Error comparing audio:', error.message);
  }
}

compareSongs();
```

### With Transcripts

Compare audio files along with their text transcripts:

```javascript
import { compareAudio } from 'smart-audio-diff';

async function compareWithText() {
  const diff = await compareAudio(
    './audio1.wav',
    './audio2.wav',
    {
      transcriptA: 'The quick brown fox jumps over the lazy dog',
      transcriptB: 'The quick brown fox jumps over the lazy cat'
    }
  );

  console.log('Audio Diff:', diff.segments);
  console.log('Transcript Diff:', diff.transcriptDiff);
  // Output: [
  //   'UNCHANGED: The quick brown fox jumps over the lazy ',
  //   'REMOVED: dog',
  //   'ADDED: cat'
  // ]
}

compareWithText();
```

### Return Value

The `compareAudio` function returns a `DiffResult` object:

```typescript
interface DiffResult {
  segments: DiffSegment[];        // Waveform diff segments with timing
  transcriptDiff: string[];       // Transcript differences as strings
  waveformDiff: number[];         // Raw waveform diff data
  detectedOffset: number;         // Time offset in seconds detected between files
}

interface DiffSegment {
  start: number;                  // Start time in seconds
  end: number;                    // End time in seconds
  type: 'unchanged' | 'added' | 'removed' | 'rephrased';
}
```

## API Reference

### `compareAudio(fileA, fileB, options?)`

Compares two audio files and optionally their transcripts.

**Parameters:**
- `fileA` (string) - Path to the first WAV audio file
- `fileB` (string) - Path to the second WAV audio file
- `options` (optional object)
  - `transcriptA` (string) - Transcript of first audio
  - `transcriptB` (string) - Transcript of second audio

**Returns:** `Promise<DiffResult>` - Comparison results with segments, transcript diffs, and detected offset.

**Throws:** Error if files don't exist or are invalid formats.

**Example:**
```javascript
const result = await compareAudio('./before.wav', './after.wav', {
  transcriptA: 'Original text',
  transcriptB: 'Modified text'
});
```

---

## Contributing

We welcome contributions! Here's how to set up the project for development:

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zyam-1/Smart-Audio-Diff.git
   cd Smart-Audio-Diff
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the TypeScript:**
   ```bash
   npm run build
   ```

### Development Workflow

**Running TypeScript compiler in watch mode:**
```bash
npm run build -- --watch
```

**Linting:**
```bash
npm run lint
```

**Formatting:**
```bash
npm run format
```

**Testing:**
```bash
npm test
```

### Project Structure

```
src/
├── index.ts                 # Main entry point, exports compareAudio
├── audio/
│   ├── audioProcessor.ts    # WAV file reading and waveform extraction
│   ├── waveFormDiff.ts      # Waveform comparison logic
│   ├── transcriptDiff.ts    # Transcript comparison using diff-match-patch
│   ├── alignment.ts         # Audio alignment logic
│   └── normalizeAudio.ts    # Volume normalization logic
├── types/
│   └── diff.ts              # TypeScript type definitions
└── utils/
    └── fileUtils.ts         # File validation utilities
```

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Keep commits focused and descriptive
   - Follow the existing code style
   - Ensure TypeScript compiles without errors

3. **Test your changes:**
   ```bash
   npm run build
   npm run lint
   npm test
   ```

4. **Push and create a pull request:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Guidelines

- Use **TypeScript** for all code (no plain JavaScript in src/)
- Add **JSDoc comments** for public APIs
- Keep functions **single-responsibility**
- Use **hyphens** in file names
- Test your changes with real WAV files if modifying audio processing
- Update README if adding new features or APIs

### Common Issues

**Issue: "Cannot find module" errors**
```bash
# Rebuild the project
npm run build
```

**Issue: Type errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**Issue: ESLint errors**
```bash
# Format and fix auto-fixable issues
npm run format
npm run lint -- --fix
```

---

## License

MIT © Zyam

## Contact & Support

- **Issues:** [GitHub Issues](https://github.com/Zyam-1/Smart-Audio-Diff/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Zyam-1/Smart-Audio-Diff/discussions)
- **Author:** Zyam

---

**Happy diffing! 🎵**
