// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando el sembrado de la base de datos (Seed)...');

  const productos = [
    { name: 'Muñeca en silla de ruedas', avatar: 'https://picsum.photos/seed/iupi1/400/400', description: 'Muñeca articulada con silla de ruedas a escala para fomentar la representación y empatía.', price: 15000, stock: 10 },
    { name: 'Bloques sensoriales con texturas', avatar: 'https://picsum.photos/seed/iupi2/400/400', description: 'Set de bloques de madera con diferentes texturas (rugoso, suave, acanalado) para estimulación táctil.', price: 8500, stock: 15 },
    { name: 'Pelota con cascabel interior', avatar: 'https://picsum.photos/seed/iupi3/400/400', description: 'Pelota de goma eva que emite sonido al rodar, ideal para niños con disminución visual.', price: 6000, stock: 20 },
    { name: 'Oso de peluche con audífonos', avatar: 'https://picsum.photos/seed/iupi4/400/400', description: 'Oso de peluche suave que incluye audífonos removibles.', price: 12000, stock: 8 },
    { name: 'Rompecabezas en Braille', avatar: 'https://picsum.photos/seed/iupi5/400/400', description: 'Rompecabezas de encastre con palabras en alfabeto Braille y relieve.', price: 9000, stock: 12 },
    { name: 'Cuentos de emociones', avatar: 'https://picsum.photos/seed/iupi6/400/400', description: 'Libro con pictogramas claros para ayudar a identificar y expresar emociones.', price: 5500, stock: 25 },
    { name: 'Títeres de dedos inclusivos', avatar: 'https://picsum.photos/seed/iupi7/400/400', description: 'Set de títeres representando diversas discapacidades y características físicas.', price: 4000, stock: 30 },
    { name: 'Manta de peso para regulación', avatar: 'https://picsum.photos/seed/iupi8/400/400', description: 'Manta sensorial de 1.5kg, diseñada para ayudar en la regulación sensorial y reducir la ansiedad.', price: 25000, stock: 5 },
    { name: 'Juego de memoria sonoro', avatar: 'https://picsum.photos/seed/iupi9/400/400', description: 'Cilindros que emiten diferentes sonidos al agitarse. El objetivo es encontrar los pares.', price: 11000, stock: 14 },
    { name: 'Autito con agarre ergonómico', avatar: 'https://picsum.photos/seed/iupi10/400/400', description: 'Vehículo de madera diseñado con un asa especial para niños con dificultades motrices.', price: 4500, stock: 40 },
    { name: 'Teclado musical de teclas gigantes', avatar: 'https://picsum.photos/seed/iupi11/400/400', description: 'Piano de juguete con teclas grandes y colores contrastantes.', price: 18000, stock: 7 },
    { name: 'Muñeco con bastón blanco', avatar: 'https://picsum.photos/seed/iupi12/400/400', description: 'Figura de acción que incluye un bastón blanco y gafas oscuras.', price: 13500, stock: 9 },
    { name: 'Dominó con relieve', avatar: 'https://picsum.photos/seed/iupi13/400/400', description: 'Clásico juego de dominó con puntos en alto relieve, apto para jugar sin depender de la vista.', price: 7000, stock: 18 },
    { name: 'Pizarra mágica táctil', avatar: 'https://picsum.photos/seed/iupi14/400/400', description: 'Pizarra que permite dibujar y sentir el relieve de lo trazado en tiempo real.', price: 16000, stock: 11 },
    { name: 'Abaco gigante adaptado', avatar: 'https://picsum.photos/seed/iupi15/400/400', description: 'Ábaco con cuentas de gran tamaño y colores primarios muy contrastantes.', price: 10500, stock: 6 },
    { name: 'Crayones ergonómicos', avatar: 'https://picsum.photos/seed/iupi16/400/400', description: 'Crayones con forma de esfera y agarre en T para facilitar el dibujo a niños con poca fuerza en las manos.', price: 3500, stock: 50 },
    { name: 'Reloj de juguete táctil', avatar: 'https://picsum.photos/seed/iupi17/400/400', description: 'Reloj para aprender la hora con manecillas robustas y números en relieve.', price: 4800, stock: 22 },
    { name: 'Collar mordillo sensorial', avatar: 'https://picsum.photos/seed/iupi18/400/400', description: 'Collar de silicona de grado alimenticio, seguro para morder y ayudar a la concentración.', price: 2500, stock: 60 },
    { name: 'Juego de encastre de gran tamaño', avatar: 'https://picsum.photos/seed/iupi19/400/400', description: 'Piezas gigantes de goma eva, fáciles de manipular para el desarrollo motriz.', price: 14000, stock: 13 },
    { name: 'Set de vajilla adaptada de juguete', avatar: 'https://picsum.photos/seed/iupi20/400/400', description: 'Platos con reborde alto y cubiertos con mangos engrosados para jugar a la comidita.', price: 6500, stock: 16 }
  ];

  await prisma.product.createMany({
    data: productos,
  });

  console.log('¡Base de datos poblada exitosamente con 20 juguetes inclusivos!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });