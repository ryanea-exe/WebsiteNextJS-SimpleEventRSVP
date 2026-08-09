import { prisma } from '../src/lib/prisma'

async function main() {
  const count = await prisma.eventSetting.count();
  
  if (count === 0) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await prisma.eventSetting.create({
      data: {
        title: 'Acara Tahunan',
        description: 'Mari bergabung di acara tahunan kami yang penuh dengan kegiatan menarik dan bermanfaat.',
        eventDate: tomorrow,
        location: 'Gedung Serbaguna, Jakarta',
        themeColor: '#000000',
      }
    });
    console.log('Default EventSetting created successfully.');
  } else {
    console.log('EventSetting already exists, skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
