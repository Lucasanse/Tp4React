const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "Favorite" RESTART IDENTITY CASCADE;`,
  );
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`,
  );
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`,
  );

  // 2. Array de 20 juguetes inclusivos para IUPI
  const productos = [
    {
      name: "PALITOS DE COLORES",
      avatar: "https://i.imgur.com/RkckMld.jpeg",
      description:
        "Copia la figura que aparece en la tarjeta usando palitos de colores",
      price: 15000,
      stock: 10,
    },
    {
      name: "EL AHORCADO",
      avatar: "https://i.imgur.com/ki79d1d.jpeg",
      description:
        " Ya no más papeles, Jugás en el tablero con lapizón de pizarra, borrás y volvés a jugar",
      price: 8500,
      stock: 15,
    },
    {
      name: "PANEL SILÁBICO",
      avatar: "https://i.imgur.com/Vf90VCW.jpeg",
      description:
        "Imagen-palabra-sílabas-letras. Armo, escribo, borro y vuelvo a empezar",
      price: 6000,
      stock: 20,
    },
    {
      name: "CUENTOS",
      avatar: "https://i.imgur.com/1skoInY.jpeg",
      description:
        "para que la seño lea a sus niños. Plastificados. cada parte del cuento ilustrado de un lado y narrado del otro",
      price: 12000,
      stock: 8,
    },
    {
      name: "SILABARIO",
      avatar: "https://i.imgur.com/KFhZt7h.jpeg",
      description:
        "CARTELES PARA COLGAR EN EL AULA. En tamaño a4 y plastificados para más durabilidad. Con simpáticas ilustraciones",
      price: 9000,
      stock: 12,
    },
    {
      name: "ARMAPALABRAS ILUSTRADO",
      avatar: "https://i.imgur.com/iTp6eRD.jpeg",
      description:
        "Para armar palabras con fichas ilustradas. Los dibujos ayudan a identificar las sílabas de cada palabra. Sólo deberán ordenarlas para armarlas correctamente",
      price: 5500,
      stock: 25,
    },
    {
      name: "¿CUANTOS HAY?",
      avatar: "https://i.imgur.com/FnbkyaS.jpeg",
      description: "Cuento y elijo el numerito",
      price: 4000,
      stock: 30,
    },
    {
      name: "LAS VOCALES",
      avatar: "https://i.imgur.com/fuarz30.jpeg",
      description:
        "Cada dibujo con su vocal. Totalmente plastificado para que dure, dure y dure pero también limpiarlo facilmente.",
      price: 25000,
      stock: 5,
    },
    {
      name: "ARMAPALABRAS MOVIL",
      avatar: "https://i.imgur.com/Fi52aNx.jpeg",
      description: "Para aprender palabras jugando.",
      price: 11000,
      stock: 14,
    },
    {
      name: "ABECEDARIO en madera",
      avatar: "https://i.imgur.com/6cjtLoI.jpeg",
      description:
        "Para armar palabras una y mil veces. En letra imprenta mayúscula",
      price: 4500,
      stock: 40,
    },
    {
      name: "Llavero TRAZOS",
      avatar: "https://i.imgur.com/XFzkTSZ.jpeg",
      description:
        "Para practicar grafismos. Para escribir, borrar y volver a escribir.",
      price: 18000,
      stock: 7,
    },
  ];

  await prisma.product.createMany({
    data: productos,
  });

  // 3. Crear 4 usuarios con las contraseñas en texto plano
  await prisma.user.createMany({
    data: [
      { email: "lucas@ejemplo.com", password: "secreto123" },
      { email: "mathias@ejemplo.com", password: "secreto123" },
      { email: "ayelen@ejemplo.com", password: "secreto123" },
      { email: "brian@ejemplo.com", password: "secreto123" },
    ],
  });

  // 4. Obtener usuarios y productos para asignarles favoritos
  const users = await prisma.user.findMany();
  const products = await prisma.product.findMany({ take: 5 }); // Traemos los primeros 5 productos

  if (users.length === 4 && products.length >= 5) {
    await prisma.favorite.createMany({
      data: [
        // Lucas tiene 2 favoritos
        { userId: users[0].id, productId: products[0].id },
        { userId: users[0].id, productId: products[1].id },

        // Mathias tiene 1 favorito
        { userId: users[1].id, productId: products[2].id },

        // Ayelén tiene 1 favorito
        { userId: users[2].id, productId: products[3].id },

        // Brian tiene 1 favorito
        { userId: users[3].id, productId: products[4].id },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
