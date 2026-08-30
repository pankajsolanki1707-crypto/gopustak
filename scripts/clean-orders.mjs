import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning all dummy/test purchase, order, and token records...');

  const deletedTokens = await prisma.downloadToken.deleteMany({});
  console.log(`✓ Deleted ${deletedTokens.count} test download tokens.`);

  const deletedEntitlements = await prisma.purchaseEntitlement.deleteMany({});
  console.log(`✓ Deleted ${deletedEntitlements.count} test purchase entitlements.`);

  const deletedOrders = await prisma.order.deleteMany({});
  console.log(`✓ Deleted ${deletedOrders.count} test orders.`);

  const deletedWebhooks = await prisma.webhookEvent.deleteMany({});
  console.log(`✓ Deleted ${deletedWebhooks.count} test webhook events.`);

  console.log('Database cleaned! Ready for real Razorpay live customer purchases.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
