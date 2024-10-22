import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para verificar si una matriz es perfecta
const esMatrizPerfecta = (matriz: number[][]) => {
  const sumDiagonales = matriz.reduce(
    (suma, fila, index) => ({
      diagonalPrincipal: suma.diagonalPrincipal + fila[index],
      diagonalSecundaria: suma.diagonalSecundaria + fila[matriz.length - 1 - index],
    }),
    { diagonalPrincipal: 0, diagonalSecundaria: 0 }
  );

  return sumDiagonales.diagonalPrincipal === sumDiagonales.diagonalSecundaria;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Generar una matriz cuadrada aleatoria (ejemplo 3x3)
    const dimension = 3;
    const matriz = Array.from({ length: dimension }, () =>
      Array.from({ length: dimension }, () => Math.floor(Math.random() * 10))
    );

    // Verificar si la matriz es perfecta
    const esPerfecta = esMatrizPerfecta(matriz);

    // Almacenar la matriz en la base de datos
    const nuevaMatriz = await prisma.matriz.create({
      data: { valores: JSON.stringify(matriz) },
    });

    res.status(201).json({ matriz, esPerfecta });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
