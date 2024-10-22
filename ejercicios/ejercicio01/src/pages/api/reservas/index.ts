import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const reservas = await prisma.reserva.findMany();
    res.status(200).json(reservas);
  } else if (req.method === 'POST') {
    const { id_pasajero, id_vuelo, precio_final, categoria_pasajero } = req.body;
    const nuevaReserva = await prisma.reserva.create({
      data: {
        id_pasajero,
        id_vuelo,
        precio_final,
        categoria_pasajero,
      },
    });
    res.status(201).json(nuevaReserva);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
