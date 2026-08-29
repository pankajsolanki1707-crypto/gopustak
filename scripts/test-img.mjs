import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    return {
      canvas,
      context,
    };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

const data = new Uint8Array(fs.readFileSync('server_storage/ebooks/upsc_epfo_special_subjects_mock_test_hindi.pdf'));
const loadingTask = pdfjsLib.getDocument({ data, canvasFactory: new NodeCanvasFactory() });
const pdfDoc = await loadingTask.promise;
const page = await pdfDoc.getPage(1);
const viewport = page.getViewport({ scale: 1.0 });

const canvasFactory = new NodeCanvasFactory();
const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

await page.render({
  canvasContext: canvasAndContext.context,
  viewport,
  canvasFactory,
}).promise;

const buffer = canvasAndContext.canvas.toBuffer('image/png');
fs.writeFileSync('public/covers/cover-product-1.png', buffer);
console.log('Cover 1 rendered successfully! Size:', buffer.length);
