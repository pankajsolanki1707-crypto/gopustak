import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProducts = [
  {
    slug: 'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi',
    title: 'UPSC EPFO/APFC 2026 – विशेष विषय एवं 10 मॉक टेस्ट',
    subtitle: 'विशेष विषयों सहित 10 पूर्ण लंबाई मॉक टेस्ट',
    shortDescription: 'UPSC EPFO/APFC की तैयारी के लिए विशेष विषयों पर केंद्रित अध्ययन सामग्री और 10 पूर्ण-लंबाई मॉक टेस्ट। इसमें GAAP, Auditing, Insurance, Industrial Relations, Labour Laws और Social Security को सरल व व्यवस्थित रूप में कवर किया गया है.',
    shortDescriptionEn: 'Special-subject preparation and 10 full-length mock tests covering GAAP, Auditing, Insurance, Industrial Relations, Labour Laws and Social Security for UPSC EPFO/APFC aspirants.',
    longDescription: `यह पुस्तक UPSC EPFO / APFC 2026 परीक्षा की संपूर्ण तैयारी के लिए विशेष रूप से तैयार की गई है। इसमें परीक्षा के सबसे महत्वपूर्ण और अंकदायी विशेष विषयों (GAAP, Auditing, Insurance, Industrial Relations, Labour Laws, Social Security) को संक्षिप्त और व्यवस्थित नोट्स के रूप में कवर किया गया है। साथ ही परीक्षा स्तर के 10 पूर्ण-लंबाई मॉक टेस्ट (उत्तर एवं विस्तृत व्याख्या सहित) दिए गए हैं जो आपकी वैचारिक स्पष्टता और परीक्षा हॉल में गति व सटीकता को कई गुना बढ़ा देंगे.`,
    coverImage: '/covers/cover-product-1.png',
    pdfFileName: 'upsc_epfo_special_subjects_mock_test_hindi.pdf',
    language: 'Hindi (हिंदी)',
    format: 'PDF (Digital Ebook)',
    pageCount: '586+ Pages',
    edition: '2026 Edition',
    publicationDate: '2026',
    priceInPaise: 9900, // ₹99 (Welcome Offer)
    mrpInPaise: 29900,   // ₹299
    category: 'UPSC EPFO / APFC',
    displayOrder: 1,
    published: true,
    highlights: JSON.stringify([
      'Special Subject Notes',
      'GAAP',
      'Auditing',
      'Insurance',
      'Industrial Relations',
      'Labour Laws',
      'Social Security',
      '10 Full-Length Mock Tests',
      'Exam-oriented revision',
      'MCQs with explanations'
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
    subtitle: 'A Complete Preparation Blueprint',
    shortDescription: 'A practical preparation blueprint for UPSC EPFO/APFC aspirants covering exam understanding, study plans, resource selection, revision, current affairs, mock-test strategy, final 60-day preparation and exam-day planning.',
    shortDescriptionEn: 'A practical preparation blueprint for UPSC EPFO/APFC aspirants covering exam understanding, study plans, resource selection, revision, current affairs, mock-test strategy, final 60-day preparation and exam-day planning.',
    longDescription: `Designed as a practical preparation system for serious EPFO/APFC aspirants. This blueprint removes guesswork and avoids costly preparation mistakes. It lays out a step-by-step framework including exam pattern breakdown, subject-wise weightage, curated book lists, smart note-making, current affairs system, mock-test error log framework, 12/9/6/4/3 month study plans, last 60-day master plan, and printable study planners.`,
    coverImage: '/covers/cover-product-2.png',
    pdfFileName: 'EP_GUIDE_ENG.pdf',
    language: 'English',
    format: 'PDF (Digital Ebook)',
    pageCount: '47 Pages',
    edition: '2026 Edition',
    publicationDate: '2026',
    priceInPaise: 14900, // ₹149 (Welcome Offer)
    mrpInPaise: 29900,   // ₹299
    category: 'UPSC EPFO / APFC',
    displayOrder: 2,
    published: true,
    highlights: JSON.stringify([
      'Complete Preparation Blueprint',
      '12/9/6/4/3 Month Study Plans',
      'Study & Revision Strategy',
      'Current Affairs Strategy',
      'Mock Test Mastery',
      'Error Log System',
      'Last 60-Day Plan',
      'Exam Day Blueprint',
      'Printable Study Planners & Trackers'
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
    title: 'UPSC EPFO/APFC 2026 Special Subject Notes + 10 Full-Length Mock Tests | Complete Study Guide for First Attempt',
    subtitle: 'Special Subject Notes + 10 Full-Length Mock Tests',
    shortDescription: 'Practice-focused UPSC EPFO/APFC ebook featuring full mock tests with exam-style MCQs, section-wise organization, verified answers and detailed explanations across English, Polity, Economy, History, Science, Labour Laws, Social Security, Accountancy and Auditing.',
    shortDescriptionEn: 'Practice-focused UPSC EPFO/APFC ebook featuring full mock tests with exam-style MCQs, section-wise organization, verified answers and detailed explanations across English, Polity, Economy, History, Science, Labour Laws, Social Security, Accountancy and Auditing.',
    longDescription: `Comprehensive study guide and high-yield practice resource for UPSC EPFO and APFC aspirants. Contains complete special subject notes and 10 full-length mock tests featuring 120 exam-style MCQs per test. Each test provides section-wise practice covering English, Indian Polity & Constitution, Economics, Modern History, Science, Labour Laws & Social Security, and Accountancy & Auditing. Verified answer keys and step-by-step explanations are included for thorough evaluation.`,
    coverImage: '/covers/cover-product-3.png',
    pdfFileName: 'UPSC_EPFO_SPECIAL_SUBJECTS_MOCK_TEST2.pdf',
    language: 'Hindi & English (Bilingual)',
    format: 'PDF (Digital Ebook)',
    pageCount: '584 Pages',
    edition: '2026 Edition',
    publicationDate: '2026',
    priceInPaise: 9900,  // ₹99 (Welcome Offer)
    mrpInPaise: 29900,  // ₹299
    category: 'UPSC EPFO / APFC',
    displayOrder: 3,
    published: true,
    highlights: JSON.stringify([
      'Special Subject Notes',
      '10 Full-Length Mock Tests',
      '120 Exam-Style MCQs per Test',
      'Detailed Explanations & Verified Answers',
      'GAAP & Accounting Principles',
      'Auditing & Insurance',
      'Industrial Relations & Labour Laws',
      'Social Security in India',
      'Indian Polity & Constitution',
      'Economics, History & Science'
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
  console.log('Seeding products with updated Welcome Offer prices...');
  for (const prod of initialProducts) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
    console.log(`Upserted: ${prod.title} -> ₹${prod.priceInPaise / 100} (MRP: ₹${prod.mrpInPaise / 100})`);
  }
  console.log('Seeding complete! Exactly 3 products loaded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
