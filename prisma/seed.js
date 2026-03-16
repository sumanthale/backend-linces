import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  const adminEmail = 'admin@lincesckf.com';
  const adminPassword = 'admin123456';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        accountType: 'admin',
      },
    });

    console.log('Admin user created:', admin.email);
  }

  const productCount = await prisma.product.count();

  if (productCount === 0) {
    console.log('Creating sample products...');

    const products = [
      {
        name_en: 'Premium Chicken Fillet',
        name_es: 'Filete de Pollo Premium',
        description_en: 'High-quality chicken breast fillet, perfect for grilling',
        description_es: 'Filete de pechuga de pollo de alta calidad, perfecto para asar',
        category: 'chicken',
        price: 8.99,
        imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
      },
      {
        name_en: 'Organic Chicken Wings',
        name_es: 'Alitas de Pollo Orgánicas',
        description_en: 'Delicious organic chicken wings, great for any occasion',
        description_es: 'Deliciosas alitas de pollo orgánicas, ideales para cualquier ocasión',
        category: 'chicken',
        price: 6.49,
        imageUrl: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg',
      },
      {
        name_en: 'Fresh Chicken Drumsticks',
        name_es: 'Muslos de Pollo Frescos',
        description_en: 'Fresh and tender chicken drumsticks',
        description_es: 'Muslos de pollo frescos y tiernos',
        category: 'chicken',
        price: 5.99,
        imageUrl: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg',
      },
      {
        name_en: 'Whole Chicken',
        name_es: 'Pollo Entero',
        description_en: 'Fresh whole chicken, ready for roasting',
        description_es: 'Pollo entero fresco, listo para asar',
        category: 'chicken',
        price: 12.99,
        imageUrl: 'https://images.pexels.com/photos/1268551/pexels-photo-1268551.jpeg',
      },
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
    }

    console.log('Sample products created');
  } else {
    console.log('Products already exist');
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
