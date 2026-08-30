import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProducts = [
  {
    slug: 'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi',
    title: 'UPSC EPFO/APFC 2026 – विशेष विषय एवं 10 मॉक टेस्ट',
    subtitle: 'विशेष विषयों सहित 10 पूर्ण लंबाई मॉक टेस्ट',
    shortDescription: 'UPSC EPFO/APFC की तैयारी के लिए विशेष विषयों पर केंद्रित अध्ययन सामग्री और 10 पूर्ण-लंबाई मॉक टेस्ट, जिसमें GAAP, Auditing, Insurance, Industrial Relations, Labour Laws और Social Security शामिल हैं.',
    shortDescriptionEn: 'Focused UPSC EPFO/APFC preparation material covering GAAP, Auditing, Insurance, Industrial Relations, Labour Laws and Social Security, along with 10 full-length mock tests.',
    longDescription: `UPSC EPFO/APFC 2026 परीक्षा की तैयारी के लिए विशेष विषयों पर केंद्रित संपूर्ण अध्ययन सामग्री और 10 पूर्ण-लंबाई मॉक टेस्ट। इसमें GAAP (सामान्य स्वीकृत लेखा सिद्धांत), Auditing (अंकेक्षण), Insurance in India (भारत में बीमा), Industrial Relations (औद्योगिक संबंध), Labour Laws (श्रम कानून) और Social Security in India (भारत में सामाजिक सुरक्षा) को परीक्षा-उन्मुख रूप में संकलित किया गया है।`,
    coverImage: '/covers/cover-product-1.png',
    pdfFileName: 'upsc_epfo_special_subjects_mock_test_hindi.pdf',
    language: 'Hindi (हिंदी)',
    format: 'PDF (Digital Ebook)',
    pageCount: '558 Pages (PDF)',
    edition: '2026 Edition',
    publicationDate: '2026',
    priceInPaise: 9900, // ₹99 (Welcome Offer)
    mrpInPaise: 29900,   // ₹299
    category: 'UPSC EPFO / APFC',
    displayOrder: 2,
    published: true,
    highlights: JSON.stringify([
      'Special Subject Notes',
      'GAAP & Accounting Principles',
      'Auditing & Insurance in India',
      'Industrial Relations & Labour Laws',
      'Social Security in India',
      '10 Full-Length Mock Tests'
    ]),
    samplePages: JSON.stringify([
      '/samples/product-1-sample-1.png',
      '/samples/product-1-sample-2.png',
      '/samples/product-1-sample-3.png',
      '/samples/product-1-sample-4.png',
      '/samples/product-1-sample-5.png',
      '/samples/product-1-sample-6.png'
    ]),
  },
  {
    slug: 'crack-upsc-epfo-apfc-2026-blueprint',
    title: 'Crack UPSC EPFO/APFC 2026',
    subtitle: 'The Complete Preparation Blueprint',
    shortDescription: 'A practical preparation blueprint covering exam strategy, study plans, resource selection, revision, current affairs, mock-test mastery, final 60-day preparation and exam-day strategy.',
    shortDescriptionEn: 'A practical preparation blueprint covering exam strategy, study plans, resource selection, revision, current affairs, mock-test mastery, final 60-day preparation and exam-day strategy.',
    longDescription: `A practical preparation blueprint covering exam understanding, selection process, syllabus breakdown, resource selection, 12/9/6/4/3 month study plans, note-making, revision system, current affairs strategy, mock-test error logs, final 60-day master plan, exam-day strategy, and printable study trackers.`,
    coverImage: '/covers/cover-product-2.png',
    pdfFileName: 'EP_GUIDE_ENG.pdf',
    language: 'English',
    format: 'PDF (Digital Ebook)',
    pageCount: '47 Pages (PDF)',
    edition: '2026 Edition',
    publicationDate: '2026',
    priceInPaise: 14900, // ₹149 (Welcome Offer)
    mrpInPaise: 29900,   // ₹299
    category: 'UPSC EPFO / APFC',
    displayOrder: 1,
    published: true,
    highlights: JSON.stringify([
      'Complete Preparation Blueprint',
      '12/9/6/4/3 Month Study Plans',
      'Revision System & Current Affairs Strategy',
      'Mock Test Mastery & Error Log System',
      'Last 60-Day Plan & Exam Day Blueprint',
      'Printable Study Trackers & Planners'
    ]),
    samplePages: JSON.stringify([
      '/samples/product-2-sample-1.png',
      '/samples/product-2-sample-2.png',
      '/samples/product-2-sample-3.png',
      '/samples/product-2-sample-4.png',
      '/samples/product-2-sample-5.png',
      '/samples/product-2-sample-6.png',
      '/samples/product-2-sample-7.png',
      '/samples/product-2-sample-8.png'
    ]),
  },
  {
    slug: 'upsc-epfo-apfc-practice-ebook-full-mock-tests',
    title: 'UPSC EPFO/APFC Practice eBook – Full Mock Tests',
    subtitle: '120 Exam-Style MCQs & Detailed Explanations',
    shortDescription: 'Practice-focused UPSC EPFO/APFC material with full mock tests, exam-style MCQs, detailed explanations and section-wise practice across core subjects.',
    shortDescriptionEn: 'Practice-focused UPSC EPFO/APFC material with full mock tests, exam-style MCQs, detailed explanations and section-wise practice across core subjects.',
    longDescription: `Practice-focused UPSC EPFO/APFC material containing full mock tests with 120 exam-style MCQs each, detailed explanations and section-wise practice across English, Indian Polity, Economy, History, Science, Labour Laws, Social Security, and Accountancy & Auditing.`,
    coverImage: '/covers/cover-product-3.png',
    pdfFileName: 'UPSC_EPFO_SPECIAL_SUBJECTS_MOCK_TEST2.pdf',
    language: 'English',
    format: 'PDF (Digital Ebook)',
    pageCount: '120 Pages (PDF)',
    edition: '2025 Edition', // Strictly 2025 Edition as per source content
    publicationDate: '2025',
    priceInPaise: 9900,  // ₹99 (Welcome Offer)
    mrpInPaise: 29900,  // ₹299
    category: 'UPSC EPFO / APFC',
    displayOrder: 3,
    published: true,
    highlights: JSON.stringify([
      'Full Mock Tests',
      '120 Exam-Style MCQs per Test',
      'Detailed Step-by-Step Explanations',
      'Section-wise Core Subject Practice',
      'English, Polity, Economy, History & Science',
      'Labour Laws, Social Security & Accountancy'
    ]),
    samplePages: JSON.stringify([
      '/samples/product-3-sample-1.png',
      '/samples/product-3-sample-2.png',
      '/samples/product-3-sample-3.png',
      '/samples/product-3-sample-4.png',
      '/samples/product-3-sample-5.png',
      '/samples/product-3-sample-6.png',
      '/samples/product-3-sample-7.png'
    ]),
  },
];

async function main() {
  console.log('Seeding exact authoritative 3 products...');
  for (const prod of initialProducts) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
    console.log(`Upserted: [${prod.edition}] ${prod.title} -> ₹${prod.priceInPaise / 100} (MRP: ₹${prod.mrpInPaise / 100})`);
  }
  console.log('Seeding complete! Exactly 3 products verified in database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
