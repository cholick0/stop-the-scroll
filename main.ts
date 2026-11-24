// One Line to Stop the Scroll — entry program.
// Writes a single scroll-stopping line to /output/entry.txt.
// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of 1 to
// 200 characters, not only whitespace, one line.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

const ENTRY =
  "You just stopped scrolling for a stranger's one line, and somewhere an algorithm quietly lost a bet.";

// Self-check gate: 1-200 characters (code points), exactly one line,
// not blank, no trailing newline.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification, byte-for-byte.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`wrote ${chars} characters to /output/entry.txt (verified)`);
