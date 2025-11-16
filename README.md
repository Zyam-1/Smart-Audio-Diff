# Smart Audio Diff

- A tiny toolkit to compute and inspect differences between audio files.
- Built in TypeScript, located in `src/`.

## What it does

- Computes diffs between audio representations (waveforms / features).
- Provides utilities to read audio files and produce human-friendly reports.

## Quick start

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

## Project layout

- `src/audio` - audio processing logic (e.g. `audioProcessor.ts`)
- `src/types` - type definitions
- `src/utils` - helper utilities (file IO, etc.)

## 🛠 Usage

- The package exports a top-level named function `compareAudio` which you can import in ESM-compatible Node apps:

```js
import { compareAudio } from 'smart-audio-diff';

const diff = await compareAudio('path/to/a.wav', 'path/to/b.wav', {
	transcriptA: 'text a',
	transcriptB: 'text b'
});
console.log(diff);
```

Important notes before installing:

- Build: make sure the package is built (JS + types) before installing from a local folder or publishing. From this repo run:

```bash
npm install
npm run build
```

Installation options for testing in another project

- 1) Quick local install (recommended for testing)

```bash
# from the other project's root
npm install /absolute/or/relative/path/to/smart-audio-diff
```

- 2) Pack and install (mirrors publish)

```bash
# in this package
npm pack
# in the other project
npm install /path/to/smart-audio-diff-1.0.0.tgz
```

- 3) Link for live development (updates require rebuild)

```bash
# in this package
npm link
# in the other project
npm link smart-audio-diff
```

Troubleshooting

- If you see "does not provide an export named 'compareAudio'" when using `import { compareAudio } ...`, ensure the package was built as ESM and installed so your consumer resolves the ESM entry (`dist/esm`). If you can't rebuild immediately, you can use a namespace import as a temporary workaround:

```js
import * as pkg from 'smart-audio-diff';
const { compareAudio } = pkg;
```

Publishing to npm

- Bump the version, build, and publish:

```bash
npm run build
npm version patch   # or minor/major
npm publish --access public
```

The package includes both ESM and CommonJS builds and an `exports` field so `import { compareAudio } from 'smart-audio-diff'` works in ESM consumers and `require('smart-audio-diff')` works in CommonJS consumers.

If you want, I can add a short `examples/demo.js` file to this repo that shows exact usage and can be run after `npm install` in a test project.

## Contributing

- Fork the repo - make small, focused PRs.
- Use hyphen-style bullets for new README entries.
- Add tests for new behavior.

## Contact

- Open an issue or PR on the repo for questions or contributions.

---