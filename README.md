# 🎵 Smart Audio Diff

- A tiny toolkit to compute and inspect differences between audio files.
- Built in TypeScript, located in `src/`.

## 🔧 What it does

- Computes diffs between audio representations (waveforms / features).
- Provides utilities to read audio files and produce human-friendly reports.

## 🚀 Quick start

- Clone or open the project in your editor.
- Install dependencies:

```bash
npm install
```

- Build / typecheck:

```bash
npm run build
```

- Run tests (if present):

```bash
npm test
```

## 🧭 Project layout

- `src/audio` - audio processing logic (e.g. `audioProcessor.ts`)
- `src/types` - type definitions
- `src/utils` - helper utilities (file IO, etc.)

## 🛠 Usage

- Import the audio processor from `src/audio/audioProcessor.ts` and call the exposed functions to compute diffs.

- Example (pseudo):

```ts
import { compareAudio } from './src/audio/audioProcessor'
const diff = await compareAudio(fileA, fileB)
console.log(diff)
```

## 🤝 Contributing

- Fork the repo - make small, focused PRs.
- Use hyphen-style bullets for new README entries.
- Add tests for new behavior.

## ✉️ Contact

- Open an issue or PR on the repo for questions or contributions.

---