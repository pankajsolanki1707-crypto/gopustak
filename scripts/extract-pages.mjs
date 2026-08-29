import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

const getDocument = pdfjsLib.getDocument || pdfjsLib.default.getDocument;

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

const __dirname = path.resolve();

const publicCoversDir = path.join(__dirname, 'public', 'covers');
const publicSamplesDir = path.join(__dirname, 'public', 'samples');

fs.mkdirSync(publicCoversDir, { recursive: true });
fs.mkdirSync(publicSamplesDir, { recursive: true });

async function renderPageToPng(pdfDocument, pageNum, outputPath, scale = 1.6) {
  const page = await pdfDocument.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  
  const canvasFactory = new NodeCanvasFactory();
  const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

  const renderContext = {
    canvasContext: canvasAndContext.context,
    viewport: viewport,
    canvasFactory: canvasFactory,
  };

  await page.render(renderContext).promise;
  const buffer = canvasAndContext.canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  canvasFactory.destroy(canvasAndContext);
  console.log(`Saved: ${outputPath} (Page ${pageNum}, ${viewport.width}x${viewport.height}, ${buffer.length} bytes)`);
}

async function extractAll() {
  const pdfs = [
    {
      id: 'product-1',
      file: path.join(__dirname, 'server_storage', 'ebooks', 'upsc_epfo_special_subjects_mock_test_hindi.pdf'),
      coverOut: path.join(publicCoversDir, 'cover-product-1.png'),
      samplePages: [1, 4, 5, 9, 14, 267], // Cover, ToC, IR, Approaches, Labour Welfare, Mock Test
    },
    {
      id: 'product-2',
      file: path.join(__dirname, 'server_storage', 'ebooks', 'EP_GUIDE_ENG.pdf'),
      coverOut: path.join(publicCoversDir, 'cover-product-2.png'),
      samplePages: [1, 3, 4, 6, 9, 17, 19, 31], // Cover, ToC, Preface, Job details, Subject weights, Study plans, Weekly timetable, 60-day plan
    },
    {
      id: 'product-3',
      file: path.join(__dirname, 'server_storage', 'ebooks', 'UPSC_EPFO_SPECIAL_SUBJECTS_MOCK_TEST2.pdf'),
      coverOut: path.join(publicCoversDir, 'cover-product-3.png'),
      samplePages: [266, 267, 268, 269, 273, 285, 287], // Mock test 1 title page, about book, english Qs, polity Qs, labour law Qs, accountancy Qs
    },
  ];

  for (const item of pdfs) {
    console.log(`\n========================================`);
    console.log(`Processing ${item.id} -> ${item.file}...`);
    const data = new Uint8Array(fs.readFileSync(item.file));
    const loadingTask = getDocument({
      data,
      canvasFactory: new NodeCanvasFactory(),
      cMapUrl: path.join(__dirname, 'node_modules', 'pdfjs-dist', 'cmaps') + '/',
      cMapPacked: true,
      standardFontDataUrl: path.join(__dirname, 'node_modules', 'pdfjs-dist', 'standard_fonts') + '/',
    });
    const pdfDocument = await loadingTask.promise;
    console.log(`${item.id} total pages: ${pdfDocument.numPages}`);

    // Render cover page
    const coverPageNum = item.samplePages[0] || 1;
    await renderPageToPng(pdfDocument, coverPageNum, item.coverOut, 2.0);

    // Render sample pages
    let sampleIdx = 1;
    for (const pageNum of item.samplePages) {
      if (pageNum <= pdfDocument.numPages) {
        const sampleOut = path.join(publicSamplesDir, `${item.id}-sample-${sampleIdx}.png`);
        await renderPageToPng(pdfDocument, pageNum, sampleOut, 1.5);
        sampleIdx++;
      }
    }
  }

  console.log('\nAll cover & sample images extracted successfully!');
}

extractAll().catch(err => {
  console.error('Extraction error:', err);
  process.exit(1);
});
