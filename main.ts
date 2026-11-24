// Time Machine Warning Label entry: one line of safety-notice comedy, at most 120 characters.
// The program writes the label to $MAKEFUN_OUTPUT_DIR/entry.txt with no
// trailing newline, so the gate reads exactly the label and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LABEL =
  "NOTICE: The past lacks customer service. If stranded, remain calm and become your own ancestor.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LABEL, "utf8");

// Read-back self-check: the gate requires UTF-8 text of 1-120 characters,
// not only whitespace, with no trailing newline. Fail loudly if violated.
// The gate counts characters, so check the string length; also confirm the
// file is valid UTF-8 by round-tripping through a Buffer.
const written = readFileSync(outPath, "utf8");
if (Buffer.from(written, "utf8").toString("utf8") !== written) {
  throw new Error("entry.txt is not valid UTF-8");
}
if (written !== LABEL) throw new Error("entry.txt content mismatch");
if (written.length < 1 || written.length > 120) {
  throw new Error(`entry.txt length ${written.length} outside 1-120 chars`);
}
if (written.trim().length === 0) throw new Error("entry.txt is only whitespace");
if (written.endsWith("\n")) throw new Error("entry.txt has a trailing newline");
