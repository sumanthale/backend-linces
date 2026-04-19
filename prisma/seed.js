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
    })),
  );

  // Insert into DB
  await prisma.user.createMany({
    data: usersWithHashedPasswords,
  });

  // ─── Shared option pools ───────────────────────────────────────────────────────

  const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

  const ALL_COLORS = {
    ivory: { name: "Ivory", hex: "#f5f0e8" },
    blush: { name: "Blush", hex: "#e8b4a0" },
    midnight: { name: "Midnight", hex: "#1a1a2e" },
    sage: { name: "Sage", hex: "#87a878" },
    burgundy: { name: "Burgundy", hex: "#6d1f2e" },
    champagne: { name: "Champagne", hex: "#f0d9a0" },
    dustyRose: { name: "Dusty Rose", hex: "#c9907a" },
    cobalt: { name: "Cobalt", hex: "#1b3a6b" },
    emerald: { name: "Emerald", hex: "#2d6a4f" },
    obsidian: { name: "Obsidian", hex: "#1c1c1c" },
    pearl: { name: "Pearl", hex: "#f8f4ef" },
    mocha: { name: "Mocha", hex: "#7b5c4e" },
    slate: { name: "Slate", hex: "#5a6475" },
    gold: { name: "Gold", hex: "#c9a84c" },
    mauve: { name: "Mauve", hex: "#a3788a" },
  };

  // ─── Helper ────────────────────────────────────────────────────────────────────
  const c = (...keys) => keys.map((k) => ALL_COLORS[k]);

  // ─── Products ──────────────────────────────────────────────────────────────────
  const products = [
    // ══════════════════════════════════════════════════════
    //  SILK DRESSES  (20 products)
    // ══════════════════════════════════════════════════════

    {
      id: 1,
      name_en: "Aurora Mulberry Evening Gown",
      name_es: "Vestido de Noche Aurora",
      description_en:
        "Floor-length evening gown woven from Grade 6A mulberry silk. The draped bodice and subtle cowl neckline create an effortlessly fluid silhouette made for grand occasions.",
      description_es:
        "Vestido de noche largo confeccionado en seda de morera grado 6A con escote draped y silueta fluida.",
      category: "Silk Dresses",
      price: 320,
      sizes: ALL_SIZES,
      colors: c("ivory", "midnight", "burgundy", "champagne"),
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    },

    {
      id: 2,
      name_en: "Luna Charmeuse Slip Dress",
      name_es: "Vestido Deslizante Luna",
      description_en:
        "Minimalist bias-cut charmeuse slip dress. The liquid drape of 22-momme silk follows the body's natural curves with barely-there elegance.",
      description_es:
        "Vestido minimalista de charmeuse cortado en sesgo, con caída sedosa y elegancia natural.",
      category: "Silk Dresses",
      price: 280,
      sizes: ALL_SIZES,
      colors: c("blush", "ivory", "midnight", "obsidian"),
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    },

    {
      id: 3,
      name_en: "Celeste Maxi Silk Dress",
      name_es: "Vestido Maxi Celeste",
      description_en:
        "Graceful maxi dress in breathable sandwashed silk. Adjustable spaghetti straps and a flowy A-line skirt make it perfect from beach sunset to candlelit dinner.",
      description_es:
        "Vestido maxi de seda lavada con tirantes ajustables y falda evasé, ideal para cualquier ocasión.",
      category: "Silk Dresses",
      price: 340,
      sizes: ALL_SIZES,
      colors: c("sage", "champagne", "dustyRose", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    },

    {
      id: 4,
      name_en: "Florence Silk Wrap Dress",
      name_es: "Vestido Cruzado Florence",
      description_en:
        "Sophisticated wrap-style dress in printed silk crepe. Adjustable tie waist flatters every silhouette; the bold botanical print makes a statement without effort.",
      description_es:
        "Vestido cruzado de seda con estampado botánico y cintura ajustable.",
      category: "Silk Dresses",
      price: 295,
      sizes: ALL_SIZES,
      colors: c("emerald", "burgundy", "cobalt", "mauve"),
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    },

    {
      id: 5,
      name_en: "Verona Midi Silk Dress",
      name_es: "Vestido Midi Verona",
      description_en:
        "Classic midi silhouette in duchess silk satin. Structured boning at the bodice and a full skirt give this piece an editorial quality suited for cocktail events.",
      description_es:
        "Vestido midi de seda satinada con cuerpo estructurado y falda amplia.",
      category: "Silk Dresses",
      price: 300,
      sizes: ALL_SIZES,
      colors: c("pearl", "midnight", "gold", "slate"),
      images: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    },

    {
      id: 6,
      name_en: "Ophelia A-Line Silk Dress",
      name_es: "Vestido Evasé Ophelia",
      description_en:
        "Timeless A-line dress in lightweight habotai silk. A gentle scoop neck and invisible back zip create a clean, unfussy silhouette that dresses up or down with ease.",
      description_es:
        "Vestido evasé de seda habotai con cuello redondo y cierre invisible.",
      category: "Silk Dresses",
      price: 310,
      sizes: ALL_SIZES,
      colors: c("ivory", "blush", "sage", "mocha"),
      images: [
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    },

    {
      id: 7,
      name_en: "Sienna Pleated Silk Dress",
      name_es: "Vestido Plisado Sienna",
      description_en:
        "Permanently pleated silk georgette dress. The micro-pleats catch light as you move, giving this piece an almost luminescent quality at every angle.",
      description_es:
        "Vestido de georgette de seda con plisado permanente que refleja la luz al moverse.",
      category: "Silk Dresses",
      price: 290,
      sizes: ALL_SIZES,
      colors: c("champagne", "dustyRose", "emerald", "obsidian"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    {
      id: 8,
      name_en: "Celina Summer Silk Dress",
      name_es: "Vestido de Verano Celina",
      description_en:
        "Lightweight silk cotton-blend summer dress with broderie anglaise trim. Relaxed fit, deep pockets, and a flowy hem make this the ultimate warm-weather companion.",
      description_es:
        "Vestido ligero de verano en mezcla seda-algodón con bordado inglés.",
      category: "Silk Dresses",
      price: 220,
      sizes: ALL_SIZES,
      colors: c("ivory", "sage", "blush", "gold"),
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    },

    {
      id: 9,
      name_en: "Amara Silk Gala Dress",
      name_es: "Vestido de Gala Amara",
      description_en:
        "Red-carpet worthy gala gown in heavy duchess silk. Dramatic one-shoulder neckline, corseted waist, and a cathedral-length train make this the ultimate statement piece.",
      description_es:
        "Vestido de gala con escote asimétrico, corsé y cola catedral.",
      category: "Silk Dresses",
      price: 580,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: c("midnight", "burgundy", "obsidian", "gold"),
      images: [
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
    },

    {
      id: 10,
      name_en: "Elara Resort Silk Dress",
      name_es: "Vestido Resort Elara",
      description_en:
        "Resort-ready silk dress with a tropical hand-painted print and tie-front detail. Generous fit, open back, and breathable 18-momme silk make it a holiday essential.",
      description_es:
        "Vestido resort de seda con estampado tropical y espalda abierta.",
      category: "Silk Dresses",
      price: 240,
      sizes: ALL_SIZES,
      colors: c("sage", "cobalt", "champagne", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    },

    {
      id: 11,
      name_en: "Vivienne Ruffled Silk Dress",
      name_es: "Vestido con Volantes Vivienne",
      description_en:
        "Romantically ruffled silk organza dress with a fitted bodice and cascading tiers. The voluminous skirt and delicate ruffles create a dreamy, feminine aesthetic.",
      description_es:
        "Vestido de organza de seda con volantes en cascada y cuerpo ajustado.",
      category: "Silk Dresses",
      price: 365,
      sizes: ALL_SIZES,
      colors: c("blush", "ivory", "mauve", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    },

    {
      id: 12,
      name_en: "Margot Off-Shoulder Silk Dress",
      name_es: "Vestido Hombros Descubiertos Margot",
      description_en:
        "Effortlessly alluring off-shoulder dress in silk taffeta. A ruched bodice, structured skirt, and hidden boning offer both glamour and support.",
      description_es:
        "Vestido de seda tafetán con hombros descubiertos, cuerpo fruncido y soporte estructurado.",
      category: "Silk Dresses",
      price: 330,
      sizes: ALL_SIZES,
      colors: c("midnight", "burgundy", "cobalt", "emerald"),
      images: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    },

    {
      id: 13,
      name_en: "Stella Backless Silk Gown",
      name_es: "Vestido Espalda Descubierta Stella",
      description_en:
        "Dramatically backless halterneck gown in liquid silk satin. The plunging open back is framed by delicate criss-cross straps in the same silk, adding architectural interest.",
      description_es:
        "Vestido largo de seda satinada con escote halter y espalda abierta enmarcada por tirantes cruzados.",
      category: "Silk Dresses",
      price: 480,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: c("obsidian", "midnight", "burgundy", "champagne"),
      images: [
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    },

    {
      id: 14,
      name_en: "Cleo Draped Silk Mini Dress",
      name_es: "Mini Vestido Drapeado Cleo",
      description_en:
        "Sculptural draped mini dress in silk jersey. An asymmetric hemline and single shoulder strap give this piece a Grecian, avant-garde edge.",
      description_es:
        "Mini vestido de seda jersey con drapeado escultural y un solo hombro.",
      category: "Silk Dresses",
      price: 260,
      sizes: ALL_SIZES,
      colors: c("ivory", "gold", "slate", "blush"),
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    },

    {
      id: 15,
      name_en: "Nadia High-Neck Silk Dress",
      name_es: "Vestido Cuello Alto Nadia",
      description_en:
        "Sophisticated high-neck dress in double-faced silk crepe. Clean seaming, long sleeves with subtle flare, and a midi length project understated authority.",
      description_es:
        "Vestido midi de seda crepé de cuello alto y mangas largas con sutiles acampanados.",
      category: "Silk Dresses",
      price: 315,
      sizes: ALL_SIZES,
      colors: c("obsidian", "slate", "mocha", "burgundy"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    {
      id: 16,
      name_en: "Rosalie Strapless Silk Dress",
      name_es: "Vestido Sin Tirantes Rosalie",
      description_en:
        "Strapless silk faille cocktail dress with a sweetheart neckline and knee-length tulip skirt. Boning and inner corsetry ensure a secure, flattering fit all evening.",
      description_es:
        "Vestido cóctel sin tirantes de seda faille con escote corazón y falda tulipán.",
      category: "Silk Dresses",
      price: 345,
      sizes: ALL_SIZES,
      colors: c("dustyRose", "ivory", "midnight", "gold"),
      images: [
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
    },

    {
      id: 17,
      name_en: "Isabeau Kimono Silk Dress",
      name_es: "Vestido Kimono Isabeau",
      description_en:
        "East-meets-West kimono-style dress in hand-painted silk habutai. Obi-inspired sash waist, wide sleeves, and an asymmetric wrap front make this a collector's piece.",
      description_es:
        "Vestido estilo kimono en seda habutai pintada a mano con faja inspirada en obi.",
      category: "Silk Dresses",
      price: 395,
      sizes: ALL_SIZES,
      colors: c("ivory", "sage", "cobalt", "champagne"),
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    },

    {
      id: 18,
      name_en: "Portia Lace-Trim Silk Dress",
      name_es: "Vestido con Encaje Portia",
      description_en:
        "Romantic midi dress pairing sandwashed silk with Chantilly lace trim at the cuffs and hem. A relaxed fit and empire waistline balance romance with ease.",
      description_es:
        "Vestido midi de seda lavada con encaje Chantilly en puños y bajo.",
      category: "Silk Dresses",
      price: 360,
      sizes: ALL_SIZES,
      colors: c("pearl", "blush", "ivory", "mauve"),
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    },

    {
      id: 19,
      name_en: "Genevieve Cowl-Neck Silk Dress",
      name_es: "Vestido Cuello Cowl Genevieve",
      description_en:
        "Deeply cowled neckline dress in heavy crepe-back satin. The cowl pools at both front and back creating a dramatic waterfall of fabric that's impossibly chic.",
      description_es:
        "Vestido de satén crepé con profundo escote cowl en el frente y la espalda.",
      category: "Silk Dresses",
      price: 355,
      sizes: ALL_SIZES,
      colors: c("midnight", "champagne", "slate", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    },

    {
      id: 20,
      name_en: "Tatiana Column Silk Dress",
      name_es: "Vestido Columna Tatiana",
      description_en:
        "Sleek floor-length column gown in ribbed silk jersey. Minimal seaming and zero embellishment let the exceptional quality of the fabric speak for itself.",
      description_es:
        "Vestido columna largo en seda jersey acanalada con mínimos detalles y máxima elegancia.",
      category: "Silk Dresses",
      price: 420,
      sizes: ALL_SIZES,
      colors: c("obsidian", "ivory", "burgundy", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    // ══════════════════════════════════════════════════════
    //  SILK BLOUSES  (10 products)
    // ══════════════════════════════════════════════════════

    {
      id: 21,
      name_en: "Aurora Pussy-Bow Silk Blouse",
      name_es: "Blusa Lazo Aurora",
      description_en:
        "The quintessential wardrobe staple: a pussy-bow blouse in 18-momme sandwashed silk. Relaxed fit, mother-of-pearl buttons, and French seams for impeccable construction.",
      description_es:
        "Blusa de seda con lazo al cuello, botones nacar y costuras francesas.",
      category: "Silk Blouses",
      price: 180,
      sizes: ALL_SIZES,
      colors: c("ivory", "blush", "sage", "midnight"),
      images: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    },

    {
      id: 22,
      name_en: "Isabella Floral Silk Blouse",
      name_es: "Blusa Floral Isabella",
      description_en:
        "Delicate floral-printed silk georgette blouse. Semi-sheer fabric is layered over a silk cami underlining; wear the two together or the underlining alone.",
      description_es:
        "Blusa de georgette de seda con estampado floral semi-transparente y forro cami incluido.",
      category: "Silk Blouses",
      price: 190,
      sizes: ALL_SIZES,
      colors: c("dustyRose", "champagne", "sage", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    },

    {
      id: 23,
      name_en: "Lucia Pintucked Silk Blouse",
      name_es: "Blusa con Pinzas Lucia",
      description_en:
        "Refined pintucked blouse in crisp silk habotai. Vertical tucks from shoulder to hem create subtle texture and a streamlined silhouette perfect for boardroom or brunch.",
      description_es:
        "Blusa de seda habotai con finas pinzas verticales y silueta refinada.",
      category: "Silk Blouses",
      price: 170,
      sizes: ALL_SIZES,
      colors: c("pearl", "ivory", "slate", "mocha"),
      images: [
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
    },

    {
      id: 24,
      name_en: "Camille Wrap Silk Blouse",
      name_es: "Blusa Cruzada Camille",
      description_en:
        "A wrap-front blouse in fluid silk crepe with a deep V-neckline and long ties. Easily adjustable for fit, it layers beautifully under tailored blazers.",
      description_es:
        "Blusa de seda crepé con cruce frontal profundo y lazos largos, ideal para usar bajo blazers.",
      category: "Silk Blouses",
      price: 200,
      sizes: ALL_SIZES,
      colors: c("burgundy", "emerald", "midnight", "ivory"),
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    },

    {
      id: 25,
      name_en: "Bianca Ruffled Silk Blouse",
      name_es: "Blusa con Volantes Bianca",
      description_en:
        "Cascading ruffle blouse in ultra-lightweight silk chiffon. A single waterfall ruffle runs from neckline to hem, adding movement and dimension to any outfit.",
      description_es:
        "Blusa de seda chiffon ultraligera con volante en cascada del escote al bajo.",
      category: "Silk Blouses",
      price: 175,
      sizes: ALL_SIZES,
      colors: c("blush", "champagne", "ivory", "mauve"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    {
      id: 26,
      name_en: "Elena Jacquard Silk Blouse",
      name_es: "Blusa Jacquard Elena",
      description_en:
        "Woven jacquard silk blouse with a tone-on-tone damask pattern. Slightly boxy cut with dropped shoulders for a contemporary take on heritage silk weaving.",
      description_es:
        "Blusa de seda jacquard con patrón damasco y corte caja de hombros caídos.",
      category: "Silk Blouses",
      price: 215,
      sizes: ALL_SIZES,
      colors: c("gold", "cobalt", "midnight", "champagne"),
      images: [
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    },

    {
      id: 27,
      name_en: "Mirella Cropped Silk Blouse",
      name_es: "Blusa Corta Mirella",
      description_en:
        "Chic cropped blouse in satin-finish mulberry silk. Hits just above the natural waist; pairs perfectly with high-waisted trousers or silk midi skirts.",
      description_es:
        "Blusa corta de seda con acabado satinado, ideal con pantalones de talle alto.",
      category: "Silk Blouses",
      price: 155,
      sizes: ALL_SIZES,
      colors: c("obsidian", "ivory", "dustyRose", "sage"),
      images: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    },

    {
      id: 28,
      name_en: "Sophia Silk Peplum Blouse",
      name_es: "Blusa Peplum Sophia",
      description_en:
        "Structured peplum blouse in double-faced silk crepe. The fitted body and flared peplum hem define the waist while maintaining effortless elegance.",
      description_es:
        "Blusa con peplum de seda crepé doble cara que define la cintura con elegancia.",
      category: "Silk Blouses",
      price: 195,
      sizes: ALL_SIZES,
      colors: c("midnight", "burgundy", "ivory", "emerald"),
      images: [
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
    },

    {
      id: 29,
      name_en: "Adriana Silk Tank Blouse",
      name_es: "Top de Seda Adriana",
      description_en:
        "Luxurious silk tank blouse with a relaxed, slightly oversized cut. Finished with narrow straps, a square neckline, and a side slit for relaxed elegance.",
      description_es:
        "Top de seda de corte amplio con cuello cuadrado y abertura lateral.",
      category: "Silk Blouses",
      price: 135,
      sizes: ALL_SIZES,
      colors: c("ivory", "blush", "cobalt", "sage", "obsidian"),
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    },

    {
      id: 30,
      name_en: "Valentina Long-Sleeve Silk Blouse",
      name_es: "Blusa Manga Larga Valentina",
      description_en:
        "Classic long-sleeve blouse in fluid sandwashed silk. Relaxed collar, single-button cuffs, and a hem shaped to be worn tucked or out — the most versatile piece in your wardrobe.",
      description_es:
        "Blusa clásica de manga larga en seda lavada con cuello relajado y bajo redondeado.",
      category: "Silk Blouses",
      price: 185,
      sizes: ALL_SIZES,
      colors: c("ivory", "pearl", "mocha", "slate", "midnight"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    // ══════════════════════════════════════════════════════
    //  SILK SHIRTS  (8 products)
    // ══════════════════════════════════════════════════════

    {
      id: 31,
      name_en: "Milan Classic Silk Shirt",
      name_es: "Camisa Clásica Milan",
      description_en:
        "Timeless relaxed-fit shirt in 22-momme mulberry silk. Spread collar, mother-of-pearl buttons, and a long-line hem make this the cornerstone of any luxury wardrobe.",
      description_es:
        "Camisa clásica de seda de morera con cuello abierto y botones nácar.",
      category: "Silk Shirts",
      price: 210,
      sizes: ALL_SIZES,
      colors: c("ivory", "obsidian", "cobalt", "slate", "champagne"),
      images: [
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
    },

    {
      id: 32,
      name_en: "Monaco Oversized Silk Shirt",
      name_es: "Camisa Oversize Monaco",
      description_en:
        "Deliberately oversized silk shirt in a brushed charmeuse weave. Wear belted as a dress, open over a cami, or tucked into wide-leg trousers — endlessly versatile.",
      description_es:
        "Camisa de seda oversize en charmeuse cepillado, versátil en múltiples looks.",
      category: "Silk Shirts",
      price: 200,
      sizes: ALL_SIZES,
      colors: c("ivory", "sage", "mocha", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    },

    {
      id: 33,
      name_en: "Capri Print Silk Shirt",
      name_es: "Camisa Estampada Capri",
      description_en:
        "Vibrant printed silk twill shirt inspired by Capri's sun-drenched landscape. Relaxed Cuban collar, chest pocket, and a boxy silhouette perfect for resort or city.",
      description_es:
        "Camisa de seda twill con estampado vibrante y cuello cubano.",
      category: "Silk Shirts",
      price: 190,
      sizes: ALL_SIZES,
      colors: c("cobalt", "emerald", "gold", "champagne"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    {
      id: 34,
      name_en: "Venice Tailored Silk Shirt",
      name_es: "Camisa Sastre Venice",
      description_en:
        "European-tailored silk shirt in refined silk-wool blend. Sharper structure than a traditional silk shirt; built-in dart shaping provides a polished, fitted silhouette.",
      description_es:
        "Camisa de mezcla seda-lana con estructura europea y forma de dardos.",
      category: "Silk Shirts",
      price: 230,
      sizes: ALL_SIZES,
      colors: c("midnight", "slate", "burgundy", "obsidian"),
      images: [
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    },

    {
      id: 35,
      name_en: "Amalfi Striped Silk Shirt",
      name_es: "Camisa de Rayas Amalfi",
      description_en:
        "Coastal-inspired striped silk shirt in a heavyweight crepe-de-chine. Tonal self-stripe print, chest patch pocket, and a relaxed fit capture Italian riviera elegance.",
      description_es:
        "Camisa de seda a rayas inspirada en la riviera italiana.",
      category: "Silk Shirts",
      price: 220,
      sizes: ALL_SIZES,
      colors: c("cobalt", "ivory", "midnight", "sage"),
      images: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    },

    {
      id: 36,
      name_en: "Portofino Short Silk Shirt",
      name_es: "Camisa Corta Portofino",
      description_en:
        "Short-sleeved silk shirt with a camp collar and floral lining detail. The easy relaxed shape translates seamlessly from beach bar to boutique restaurant.",
      description_es:
        "Camisa de seda de manga corta con cuello camp y forro floral.",
      category: "Silk Shirts",
      price: 175,
      sizes: ALL_SIZES,
      colors: c("ivory", "champagne", "sage", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    },

    {
      id: 37,
      name_en: "Sorrento Embroidered Silk Shirt",
      name_es: "Camisa Bordada Sorrento",
      description_en:
        "Silk shirt with hand-embroidered botanical motifs along the cuffs and placket. Traditional craft meets modern minimalism in this limited-edition piece.",
      description_es:
        "Camisa de seda con bordado botánico artesanal en puños y tapeta.",
      category: "Silk Shirts",
      price: 265,
      sizes: ALL_SIZES,
      colors: c("ivory", "pearl", "sage", "blush"),
      images: [
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
    },

    {
      id: 38,
      name_en: "Positano Sheer Silk Shirt",
      name_es: "Camisa Transparente Positano",
      description_en:
        "Sheer silk organza overshirt designed to be layered. The near-transparent fabric and floating silhouette add effortless drama when worn over silk camisoles or bodysuits.",
      description_es:
        "Camisa de seda organza semi-transparente ideal para llevar sobre otros looks.",
      category: "Silk Shirts",
      price: 195,
      sizes: ALL_SIZES,
      colors: c("ivory", "blush", "champagne", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    },

    {
      id: 40,
      name_en: "Aurora Heritage Silk Scarf",
      name_es: "Pañuelo Heritage Aurora",
      description_en:
        "90×90cm hand-rolled twill scarf in the brand's archive print. 100% mulberry silk with hand-stitched rolled edges finished by artisans in Como, Italy.",
      description_es:
        "Pañuelo de seda twill 90×90cm con estampado archivo y bordes enrollados a mano.",
      category: "Silk Scarves",
      price: 120,
      sizes: ["One Size"],
      colors: c("ivory", "midnight", "champagne", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
    },

    {
      id: 41,
      name_en: "Riviera Printed Silk Scarf",
      name_es: "Pañuelo Estampado Riviera",
      description_en:
        "Panoramic Mediterranean landscape print on lightweight silk chiffon. A larger 140×140cm format allows endless styling: shawl, wrap, or hair accessory.",
      description_es:
        "Pañuelo de seda chiffon 140×140cm con paisaje mediterráneo, versátil como chal o tocado.",
      category: "Silk Scarves",
      price: 110,
      sizes: ["One Size"],
      colors: c("cobalt", "sage", "champagne", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
    },

    {
      id: 42,
      name_en: "Florence Botanical Silk Scarf",
      name_es: "Pañuelo Botánico Florence",
      description_en:
        "Oversized botanical print scarf in hand-painted silk. No two pieces are exactly alike — each subtle variation in the hand-painting makes every scarf unique.",
      description_es:
        "Pañuelo de seda pintado a mano con estampado botánico. Cada pieza es única.",
      category: "Silk Scarves",
      price: 145,
      sizes: ["One Size"],
      colors: c("sage", "ivory", "gold", "blush"),
      images: [
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
    },

    {
      id: 43,
      name_en: "Capri Narrow Silk Scarf",
      name_es: "Pañuelo Estrecho Capri",
      description_en:
        "A 180×20cm elongated silk scarf in a diagonal stripe weave. Styled as a neckerchief, belt, bag charm, or hair ribbon — its narrow format gives maximum flexibility.",
      description_es:
        "Pañuelo de seda 180×20cm en tela a rayas diagonales, ideal como cinturón o tocado.",
      category: "Silk Scarves",
      price: 85,
      sizes: ["One Size"],
      colors: c("midnight", "ivory", "burgundy", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
    },

    {
      id: 44,
      name_en: "Sorrento Geometric Silk Scarf",
      name_es: "Pañuelo Geométrico Sorrento",
      description_en:
        "Bold geometric colour-block print on a 70×70cm twill scarf. Inspired by Art Deco architecture; worn as a pocket square, neck scarf, or lapel decoration.",
      description_es:
        "Pañuelo twill 70×70cm con estampado geométrico art déco en bloque de colores.",
      category: "Silk Scarves",
      price: 90,
      sizes: ["One Size"],
      colors: c("gold", "midnight", "burgundy", "emerald"),
      images: [
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
    },

    {
      id: 45,
      name_en: "Elba Sheer Silk Wrap",
      name_es: "Chal de Seda Elba",
      description_en:
        "Generous 200×80cm wrap in barely-there silk organza. A classic animal print is screen-printed in soft tones; the sheer fabric layers beautifully over any outfit.",
      description_es:
        "Chal 200×80cm de organza de seda semi-transparente con estampado animal suave.",
      category: "Silk Scarves",
      price: 130,
      sizes: ["One Size"],
      colors: c("champagne", "ivory", "mocha", "slate"),
      images: [
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
    },

    {
      id: 46,
      name_en: "Portofino Silk Bandana",
      name_es: "Bandana de Seda Portofino",
      description_en:
        "Compact 55×55cm bandana in heavyweight silk twill. Iconic chain-link border print; ideal as a hair wrap, choker, or accent piece.",
      description_es:
        "Bandana de seda twill 55×55cm con borde de cadenas. Ideal para cabello o cuello.",
      category: "Silk Scarves",
      price: 75,
      sizes: ["One Size"],
      colors: c("midnight", "ivory", "dustyRose", "gold"),
      images: [
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80",
    },

    // ══════════════════════════════════════════════════════
    //  LUXURY SILK SETS  (8 products)
    // ══════════════════════════════════════════════════════

    {
      id: 47,
      name_en: "Aurora Silk Lounge Set",
      name_es: "Conjunto Lounge Aurora",
      description_en:
        "Two-piece relaxed lounge set in 25-momme sandwashed silk: wide-leg trousers with elasticated waist and a matching piped blouse. The most luxurious way to unwind.",
      description_es:
        "Conjunto de dos piezas de seda lavada con pantalón amplio y blusa a juego.",
      category: "Luxury Silk Sets",
      price: 420,
      sizes: ALL_SIZES,
      colors: c("ivory", "champagne", "sage", "midnight"),
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    },

    {
      id: 48,
      name_en: "Monaco Resort Silk Set",
      name_es: "Conjunto Resort Monaco",
      description_en:
        "Resort co-ord set comprising a wide-sleeved kimono jacket and matching palazzo trousers. The all-over printed silk makes this the statement holiday set.",
      description_es:
        "Conjunto resort de seda con kimono de mangas anchas y pantalón palazzo a juego.",
      category: "Luxury Silk Sets",
      price: 450,
      sizes: ALL_SIZES,
      colors: c("cobalt", "champagne", "sage", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    },

    {
      id: 49,
      name_en: "Celeste Silk Pyjama Set",
      name_es: "Pijama de Seda Celeste",
      description_en:
        "Sumptuous pyjama set in 22-momme charmeuse silk. Long-sleeve piped shirt with notch collar and full-length trousers with a wide elastic waist — sleep like royalty.",
      description_es:
        "Pijama de seda charmeuse con camisa de cuello entallado y pantalón largo.",
      category: "Luxury Silk Sets",
      price: 380,
      sizes: ALL_SIZES,
      colors: c("ivory", "midnight", "blush", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    },

    {
      id: 50,
      name_en: "Riviera Silk Skirt & Top Set",
      name_es: "Conjunto Falda y Top Riviera",
      description_en:
        "Matching bias-cut midi skirt and spaghetti-strap cami in printed silk georgette. The coordinated print creates a seamless head-to-toe look with effortless polish.",
      description_es:
        "Conjunto de falda midi en sesgo y cami con tirantes en georgette de seda estampado.",
      category: "Luxury Silk Sets",
      price: 395,
      sizes: ALL_SIZES,
      colors: c("dustyRose", "sage", "ivory", "champagne"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    {
      id: 51,
      name_en: "Elara Silk Blazer & Trouser Set",
      name_es: "Conjunto Blazer y Pantalón Elara",
      description_en:
        "Tailored power set in structured silk-linen blend: notch-lapel blazer with welt pockets and matching straight-leg trousers. Boardroom elegance, silk comfort.",
      description_es:
        "Conjunto sastre de mezcla seda-lino con blazer de solapas y pantalón recto.",
      category: "Luxury Silk Sets",
      price: 520,
      sizes: ALL_SIZES,
      colors: c("midnight", "obsidian", "ivory", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    },

    {
      id: 52,
      name_en: "Sienna Silk Shorts Set",
      name_es: "Conjunto con Shorts Sienna",
      description_en:
        "Two-piece summer set with tailored high-rise shorts and a relaxed oversized shirt in matching printed silk crepe. Easy coordinates for a polished yet playful look.",
      description_es:
        "Conjunto de verano con shorts de talle alto y camisa oversize en seda crepé estampada.",
      category: "Luxury Silk Sets",
      price: 340,
      sizes: ALL_SIZES,
      colors: c("champagne", "sage", "blush", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    },

    {
      id: 53,
      name_en: "Valentina Silk Cami & Shorts Set",
      name_es: "Conjunto Cami y Shorts Valentina",
      description_en:
        "Lingerie-inspired cami and shorts set in delicate 16-momme charmeuse. Lace inset trim and satin-covered buttons elevate this from sleepwear to luxurious loungewear.",
      description_es:
        "Conjunto de cami y shorts de seda charmeuse con encaje y botones forrados.",
      category: "Luxury Silk Sets",
      price: 290,
      sizes: ALL_SIZES,
      colors: c("ivory", "blush", "midnight", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    },

    {
      id: 54,
      name_en: "Genevieve Silk Wrap & Skirt Set",
      name_es: "Conjunto Wrap y Falda Genevieve",
      description_en:
        "Elegant two-piece with a draped wrap top and coordinating high-waist maxi skirt in fluid silk satin. Individually versatile, incomparably chic when worn together.",
      description_es:
        "Conjunto de dos piezas con top drapeado y falda maxi de satén de seda coordinados.",
      category: "Luxury Silk Sets",
      price: 460,
      sizes: ALL_SIZES,
      colors: c("midnight", "champagne", "emerald", "ivory"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    // ══════════════════════════════════════════════════════
    //  SILK SKIRTS  (7 products)
    // ══════════════════════════════════════════════════════

    {
      id: 55,
      name_en: "Maison Bias-Cut Silk Skirt",
      name_es: "Falda en Sesgo Maison",
      description_en:
        "The bias-cut midi skirt in crepe-back satin that anchors the collection. Cut on the true cross-grain for maximum drape, with a side-slit hem and invisible zip.",
      description_es:
        "Falda midi en sesgo de satén crepé con abertura lateral y cremallera invisible.",
      category: "Silk Skirts",
      price: 195,
      sizes: ALL_SIZES,
      colors: c("ivory", "midnight", "champagne", "burgundy"),
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    },

    {
      id: 56,
      name_en: "Adriana Pleated Silk Midi Skirt",
      name_es: "Falda Midi Plisada Adriana",
      description_en:
        "Permanently pleated midi skirt in silk georgette. The micro-pleats from waistband to hem create a kaleidoscopic shimmer with every step.",
      description_es:
        "Falda midi de georgette de seda con plisado permanente y brillo caleidoscópico.",
      category: "Silk Skirts",
      price: 215,
      sizes: ALL_SIZES,
      colors: c("champagne", "dustyRose", "emerald", "cobalt"),
      images: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },

    {
      id: 57,
      name_en: "Chloe Tiered Silk Maxi Skirt",
      name_es: "Falda Maxi por Niveles Chloe",
      description_en:
        "Three-tiered maxi skirt in lightweight silk voile. Each tier is subtly gathered for a voluminous, romantic silhouette that catches the breeze.",
      description_es:
        "Falda maxi de seda voile en tres niveles con fruncido sutil.",
      category: "Silk Skirts",
      price: 235,
      sizes: ALL_SIZES,
      colors: c("ivory", "blush", "sage", "gold"),
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    },

    {
      id: 58,
      name_en: "Elise Pencil Silk Skirt",
      name_es: "Falda Lápiz Elise",
      description_en:
        "Precision-cut pencil skirt in structured silk faille. A back kick-pleat allows confident strides; waistband with silk-covered buttons adds a couture finishing detail.",
      description_es:
        "Falda lápiz de seda faille con pliegue trasero y botones forrados.",
      category: "Silk Skirts",
      price: 185,
      sizes: ALL_SIZES,
      colors: c("obsidian", "midnight", "ivory", "slate"),
      images: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    },

    {
      id: 59,
      name_en: "Simone Wrap Silk Skirt",
      name_es: "Falda Cruzada Simone",
      description_en:
        "Adjustable wrap-style skirt in fluid silk habotai. The generous front flap and tie belt allow infinite adjustments of both fit and length.",
      description_es:
        "Falda cruzada de seda habotai con solapa generosa y cinturón de lazo.",
      category: "Silk Skirts",
      price: 175,
      sizes: ALL_SIZES,
      colors: c("burgundy", "cobalt", "ivory", "dustyRose"),
      images: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    },

    {
      id: 60,
      name_en: "Hortense Mini Silk Skirt",
      name_es: "Minifalda Hortense",
      description_en:
        "Structured A-line mini skirt in heavyweight silk taffeta with a self-covered button fly. A back box pleat adds movement to the clean, architectural shape.",
      description_es:
        "Minifalda evasé de seda tafetán con tapeta de botones forrados y pliegue trasero.",
      category: "Silk Skirts",
      price: 165,
      sizes: ALL_SIZES,
      colors: c("midnight", "gold", "ivory", "emerald"),
      images: [
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    },

    {
      id: 61,
      name_en: "Odette Slit Silk Maxi Skirt",
      name_es: "Falda Maxi con Abertura Odette",
      description_en:
        "Floor-length maxi skirt in crepe-back satin with a front thigh-high slit. The high waist and liquid-smooth satin create a body-skimming silhouette with dramatic movement.",
      description_es:
        "Falda maxi de satén crepé con abertura hasta el muslo y cintura alta.",
      category: "Silk Skirts",
      price: 225,
      sizes: ALL_SIZES,
      colors: c("midnight", "obsidian", "ivory", "burgundy"),
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    },
  ];

  function serializeProduct(product) {
    const out = { ...product };
    if (Array.isArray(out.images)) out.images = JSON.stringify(out.images);
    if (Array.isArray(out.sizes)) out.sizes = JSON.stringify(out.sizes);
    if (Array.isArray(out.colors)) out.colors = JSON.stringify(out.colors);
    return out;
  }

  await prisma.product.createMany({
    data: products.map(serializeProduct),
  });

  console.log("✅ Products inserted");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
