import { Prism } from "prism-react-renderer";

// prismjs language grammars register themselves on the global Prism object.
// Expose prism-react-renderer's instance so the grammars imported after this file attach to it.
globalThis.Prism = Prism;
