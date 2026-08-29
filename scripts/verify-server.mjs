async function check() {
  const [homeRes, adminRes, productsRes] = await Promise.all([
    fetch('http://localhost:3000/'),
    fetch('http://localhost:3000/admin'),
    fetch('http://localhost:3000/api/products').then((r) => r.json()),
  ]);

  console.log('Homepage status:', homeRes.status);
  console.log('Admin page status:', adminRes.status);
  console.log('Total Products Loaded in DB:', productsRes.products?.length);

  productsRes.products?.forEach((p, idx) => {
    console.log(`\nProduct ${idx + 1}:`);
    console.log(`- Title: ${p.title}`);
    console.log(`- Category: ${p.category}`);
    console.log(`- Edition: ${p.edition}`);
    console.log(`- Language: ${p.language}`);
    console.log(`- Price: ₹${p.priceInPaise / 100} (MRP: ₹${p.mrpInPaise / 100})`);
    console.log(`- Highlights (${p.highlights.length}): ${p.highlights.slice(0, 3).join(', ')}...`);
    console.log(`- Sample Pages (${p.samplePages.length}): ${p.samplePages.slice(0, 2).join(', ')}...`);
  });
}

check().catch(console.error);
