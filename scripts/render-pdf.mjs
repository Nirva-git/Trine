import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath = path.resolve(__dirname, '../../Trine Web 02.pdf');
const outDir = path.resolve(__dirname, '../public/design-ref');

fs.mkdirSync(outDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;

for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const scale = 2;
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  const out = path.join(outDir, `page-${i}.png`);
  fs.writeFileSync(out, canvas.toBuffer('image/png'));
  console.log('Wrote', out, viewport.width, 'x', viewport.height);
}
