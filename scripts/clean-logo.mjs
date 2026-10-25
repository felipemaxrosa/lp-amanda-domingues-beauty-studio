// Remove franjas vermelhas/amarelas/brancas do recorte automático de um logótipo
// rose-gold em PNG transparente. Uso: node scripts/clean-logo.mjs <in.png> <out.png>
import sharp from "sharp";

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("uso: node scripts/clean-logo.mjs <in.png> <out.png>");
  process.exit(1);
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

let dropped = 0;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
  if (a === 0) continue;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const chroma = (max - min) / 255;
  const light = (max + min) / 2 / 255;

  const vividRed = r - g > 75 && b < 125 && g < 150;         // vermelho saturado (lixo)
  const vividYellow = g > 150 && b < 100 && g - b > 90 && r - g < 70; // amarelo (lixo)
  const tooChroma = chroma > 0.58;                            // qualquer cor saturada demais p/ rose-gold
  const pureWhite = light > 0.95 && chroma < 0.08;            // branco puro (lixo)

  if (vividRed || vividYellow || tooChroma || pureWhite) {
    data[i + 3] = 0;
    dropped++;
  }
}

// erosão leve: zera pixéis cujo vizinhança é maioritariamente transparente (tira speckle do fringe)
const alphaAt = (x, y) => (x < 0 || y < 0 || x >= width || y >= height ? 0 : data[(y * width + x) * channels + 3]);
const out = Buffer.from(data);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * channels + 3;
    if (data[idx] === 0) continue;
    let opaque = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (alphaAt(x + dx, y + dy) > 40) opaque++;
    if (opaque <= 2) out[idx] = 0; // pixel quase isolado => fringe
  }
}

await sharp(out, { raw: { width, height, channels } }).trim({ threshold: 1 }).png().toFile(output);
console.log(`${output}: removidos ~${dropped} pixéis de fringe`);
