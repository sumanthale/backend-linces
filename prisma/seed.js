import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // USERS
const users = [
  {
    email: "admin@lincesckf.com",
    password: "admin123",
    accountType: "admin",
    name: "Admin User",
  },
  {
    email: "customer@test.com",
    password: "password123",
    accountType: "customer",
    name: "Customer User",
  },
  {
    email: "brand@test.com",
    password: "password123",
    accountType: "brand",
    name: "Brand User",
  },
];

// Hash all passwords first
const usersWithHashedPasswords = await Promise.all(
  users.map(async (user) => ({
    ...user,
    password: await bcrypt.hash(user.password, 10),
  }))
);

// Insert into DB
await prisma.user.createMany({
  data: usersWithHashedPasswords,
});

  const products = [
    {
      name_en: "Aurora Silk Evening Dress",
      name_es: "Vestido de Seda Aurora",
      description_en:
        "Elegant floor-length evening dress made from premium mulberry silk with a flowing silhouette designed for formal events.",
      description_es:
        "Vestido elegante de seda premium con diseño fluido ideal para eventos formales.",
      category: "Silk Dresses",
      price: 320,
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },

    {
      name_en: "Luna Satin Silk Dress",
      name_es: "Vestido de Seda Luna",
      description_en:
        "Minimalist satin silk dress with a soft drape and modern neckline perfect for elegant evening gatherings.",
      description_es:
        "Vestido minimalista de seda satinado ideal para eventos elegantes.",
      category: "Silk Dresses",
      price: 280,
      imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    },

    {
      name_en: "Celeste Silk Maxi Dress",
      name_es: "Vestido Maxi Celeste",
      description_en:
        "Graceful silk maxi dress crafted for comfort and luxury with breathable premium silk fabric.",
      description_es:
        "Vestido largo de seda con tela transpirable y diseño elegante.",
      category: "Silk Dresses",
      price: 340,
      imageUrl: "https://images.unsplash.com/photo-1520975922323-5c0b45b8f1f1",
    },

    {
      name_en: "Florence Silk Wrap Dress",
      name_es: "Vestido Florence",
      description_en:
        "Sophisticated wrap style silk dress that combines elegance with modern tailoring.",
      description_es: "Vestido de seda tipo wrap con estilo sofisticado.",
      category: "Silk Dresses",
      price: 295,
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },

    {
      name_en: "Verona Silk Midi Dress",
      name_es: "Vestido Verona",
      description_en:
        "Classic silk midi dress designed for luxury fashion occasions.",
      description_es: "Vestido midi clásico de seda para ocasiones elegantes.",
      category: "Silk Dresses",
      price: 300,
      imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },

    {
      name_en: "Ophelia Silk A-Line Dress",
      name_es: "Vestido Ophelia",
      description_en:
        "A-line silk dress designed with timeless elegance and comfort.",
      description_es: "Vestido de seda con corte A elegante y cómodo.",
      category: "Silk Dresses",
      price: 310,
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },

    {
      name_en: "Sienna Silk Pleated Dress",
      name_es: "Vestido Sienna",
      description_en:
        "Pleated silk dress crafted with delicate folds and elegant movement.",
      description_es: "Vestido plisado de seda con diseño elegante.",
      category: "Silk Dresses",
      price: 290,
      imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    },

    {
      name_en: "Celina Silk Summer Dress",
      name_es: "Vestido Celina",
      description_en:
        "Lightweight silk summer dress ideal for warm climates and stylish comfort.",
      description_es: "Vestido ligero de seda ideal para verano.",
      category: "Silk Dresses",
      price: 220,
      imageUrl: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
    },

    {
      name_en: "Amara Silk Gala Dress",
      name_es: "Vestido Amara",
      description_en:
        "Luxury gala silk dress designed for red-carpet style elegance.",
      description_es:
        "Vestido de gala de seda diseñado para eventos elegantes.",
      category: "Silk Dresses",
      price: 350,
      imageUrl: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93",
    },

    {
      name_en: "Elara Silk Resort Dress",
      name_es: "Vestido Elara",
      description_en:
        "Resort style silk dress combining comfort and tropical elegance.",
      description_es: "Vestido de seda estilo resort cómodo y elegante.",
      category: "Silk Dresses",
      price: 240,
      imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
    },

    {
      name_en: "Aurora Silk Blouse",
      name_es: "Blusa Aurora",
      description_en:
        "Premium silk blouse tailored for professional elegance and comfort.",
      description_es: "Blusa de seda premium para uso profesional elegante.",
      category: "Silk Blouses",
      price: 180,
      imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },

    {
      name_en: "Isabella Silk Blouse",
      name_es: "Blusa Isabella",
      description_en:
        "Luxury silk blouse designed for formal occasions and office wear.",
      description_es: "Blusa de seda elegante para oficina o eventos formales.",
      category: "Silk Blouses",
      price: 190,
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },

    {
      name_en: "Lucia Silk Blouse",
      name_es: "Blusa Lucia",
      description_en:
        "Modern silk blouse featuring a soft texture and elegant tailoring.",
      description_es: "Blusa moderna de seda con diseño elegante.",
      category: "Silk Blouses",
      price: 170,
      imageUrl: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
    },

    {
      name_en: "Camille Silk Blouse",
      name_es: "Blusa Camille",
      description_en: "Classic silk blouse designed for timeless fashion.",
      description_es: "Blusa clásica de seda con diseño atemporal.",
      category: "Silk Blouses",
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },

    {
      name_en: "Bianca Silk Blouse",
      name_es: "Blusa Bianca",
      description_en:
        "Soft silk blouse with luxurious fabric and elegant structure.",
      description_es: "Blusa suave de seda con estructura elegante.",
      category: "Silk Blouses",
      price: 175,
      imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    },

    {
      name_en: "Elena Silk Blouse",
      name_es: "Blusa Elena",
      description_en: "Elegant silk blouse crafted for luxury fashion styling.",
      description_es: "Blusa de seda elegante diseñada para moda de lujo.",
      category: "Silk Blouses",
      price: 185,
      imageUrl: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
    },

    {
      name_en: "Milan Silk Shirt",
      name_es: "Camisa Milan",
      description_en: "Premium silk shirt tailored for refined elegance.",
      description_es: "Camisa de seda premium con diseño elegante.",
      category: "Silk Shirts",
      price: 210,
      imageUrl: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
    },

    {
      name_en: "Monaco Silk Shirt",
      name_es: "Camisa Monaco",
      description_en:
        "Luxury silk shirt offering breathable comfort and timeless style.",
      description_es: "Camisa de seda elegante y cómoda.",
      category: "Silk Shirts",
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },

    {
      name_en: "Capri Silk Shirt",
      name_es: "Camisa Capri",
      description_en:
        "Resort style silk shirt perfect for luxury travel fashion.",
      description_es: "Camisa de seda estilo resort para viajes.",
      category: "Silk Shirts",
      price: 190,
      imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    },

    {
      name_en: "Venice Silk Shirt",
      name_es: "Camisa Venice",
      description_en:
        "Tailored silk shirt inspired by classic European fashion.",
      description_es: "Camisa de seda inspirada en moda europea.",
      category: "Silk Shirts",
      price: 230,
      imageUrl: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
    },

    {
      name_en: "Aurora Silk Scarf",
      name_es: "Bufanda Aurora",
      description_en:
        "Luxury silk scarf designed to complement elegant outfits.",
      description_es: "Bufanda de seda elegante para complementar atuendos.",
      category: "Silk Scarves",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1520975922323-5c0b45b8f1f1",
    },

    {
      name_en: "Riviera Silk Scarf",
      name_es: "Bufanda Riviera",
      description_en:
        "Premium patterned silk scarf inspired by Mediterranean fashion.",
      description_es: "Bufanda de seda inspirada en moda mediterránea.",
      category: "Silk Scarves",
      price: 110,
      imageUrl: "https://images.unsplash.com/photo-1514996937319-344454492b37",
    },

    {
      name_en: "Florence Silk Scarf",
      name_es: "Bufanda Florence",
      description_en:
        "Elegant silk scarf with luxurious texture and timeless design.",
      description_es: "Bufanda elegante de seda con textura lujosa.",
      category: "Silk Scarves",
      price: 100,
      imageUrl: "https://images.unsplash.com/photo-1520975922323-5c0b45b8f1f1",
    },

    {
      name_en: "Aurora Silk Lounge Set",
      name_es: "Conjunto Aurora",
      description_en: "Premium silk lounge set combining luxury and comfort.",
      description_es: "Conjunto de seda premium cómodo y elegante.",
      category: "Luxury Silk Sets",
      price: 420,
      imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    },

    {
      name_en: "Monaco Silk Resort Set",
      name_es: "Conjunto Monaco",
      description_en:
        "Luxury silk resort wear set designed for comfort and elegance.",
      description_es: "Conjunto de seda elegante para resort.",
      category: "Luxury Silk Sets",
      price: 450,
      imageUrl: "https://images.unsplash.com/photo-1520975922323-5c0b45b8f1f1",
    },
  ];

  // let expanded = [];

  // for (let i = 0; i < 3; i++) {
  //   products.forEach((p) => {
  //     expanded.push({
  //       ...p,
  //       name_en: p.name_en + " " + (i + 1),
  //       name_es: p.name_es + " " + (i + 1),
  //     });
  //   });
  // }

  await prisma.product.createMany({
    data: products,
  });

  console.log("✅ Products inserted");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
