// Generates professional ME favicons (PNG + ICO) with zero dependencies.
// Run: node scripts/generate-icons.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "icons");
mkdirSync(outDir, { recursive: true });

const BG = [11, 13, 16, 255];
const GOLD = [201, 168, 76, 255];
const LIGHT = [241, 223, 160, 255];
const NONE = [0, 0, 0, 0];
const FONT = {
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
};
const shade = (t) => [Math.round(LIGHT[0] + (GOLD[0] - LIGHT[0]) * t), Math.round(LIGHT[1] + (GOLD[1] - LIGHT[1]) * t), Math.round(LIGHT[2] + (GOLD[2] - LIGHT[2]) * t), 255];
function inside(x, y, s, r) {
  if (x >= r && x < s - r) return true;
  if (y >= r && y < s - r) return true;
  const cx = x < r ? r : s - 1 - r;
  const cy = y < r ? r : s - 1 - r;
  const dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}
function drawIcon(size) {
  const px = Buffer.alloc(size * size * 4);
  const radius = Math.round(size * 0.22);
  const border = Math.max(2, Math.round(size / 40));
  const set = (x, y, c) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2]; px[i + 3] = c[3];
  };
  const s2 = size - border * 2;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if (!inside(x, y, size, radius)) { set(x, y, NONE); continue; }
    const ix = x >= border && y >= border && x < size - border && y < size - border && inside(x - border, y - border, s2, Math.max(1, radius - border));
    set(x, y, ix ? BG : shade((y / size) * 0.7));
  }
  const cell = Math.max(1, Math.floor(size / 22));
  const ox = Math.round((size - 12 * cell) / 2);
  const oy = Math.round((size - 7 * cell) / 2) - Math.round(size * 0.02);
  const glyph = (g, gx) => {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) {
      if (FONT[g][r][c] !== "1") continue;
      const col = shade(r / 6);
      for (let dy = 0; dy < cell; dy++) for (let dx = 0; dx < cell; dx++) set(gx + c * cell + dx, oy + r * cell + dy, col);
    }
  };
  glyph("M", ox); glyph("E", ox + 7 * cell);
  const uw = Math.round(size * 0.32), uh = Math.max(1, Math.round(size / 64));
  const ux = Math.round((size - uw) / 2), uy = oy + 7 * cell + Math.round(size * 0.045);
  for (let y = 0; y < uh; y++) for (let x = 0; x < uw; x++) set(ux + x, uy + y, shade(x / uw));
  return px;
}

// --- minimal PNG encoder (RGBA 8-bit, zero deps) ---
let CRC_TABLE = null;
function crcTable() {
  if (CRC_TABLE) return CRC_TABLE;
  CRC_TABLE = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    CRC_TABLE[n] = c;
  }
  return CRC_TABLE;
}
function crc32(buf) {
  const t = crcTable();
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = t[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function pngChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.from(type, "ascii");
  const cc = Buffer.alloc(4); cc.writeUInt32BE(crc32(Buffer.concat([td, data])));
  return Buffer.concat([len, td, data, cc]);
}
function encodePNG(size, px) {
  const stride = size * 4 + 1;
  const raw = Buffer.alloc(stride * size);
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0;
    px.subarray(y * size * 4, (y + 1) * size * 4).copy(raw, y * stride + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

const jobs = [
  [16, "favicon-16x16.png"], [32, "favicon-32x32.png"], [48, "favicon-48x48.png"],
  [180, "apple-touch-icon.png"], [192, "icon-192x192.png"], [512, "icon-512x512.png"],
];
for (const [s, name] of jobs) {
  writeFileSync(join(outDir, name), encodePNG(s, drawIcon(s)));
  console.log("wrote public/icons/" + name);
}
{
  // favicon.ico with 16/32/48 PNG entries (supported by modern browsers)
  const imgs = [16, 32, 48].map((s) => encodePNG(s, drawIcon(s)));
  const head = Buffer.alloc(6 + 16 * imgs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4);
  let off = head.length;
  imgs.forEach((img, i) => {
    const s = [16, 32, 48][i], o = 6 + i * 16;
    head[o] = s; head[o + 1] = s;
    head.writeUInt16LE(1, o + 4); head.writeUInt16BE(32, o + 6);
    head.writeUInt32LE(img.length, o + 8); head.writeUInt32LE(off, o + 12);
    off += img.length;
  });
  writeFileSync(join(root, "src", "app", "favicon.ico"), Buffer.concat([head, ...imgs]));
  console.log("wrote src/app/favicon.ico");
}
console.log("done");

