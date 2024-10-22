import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const reserva = await prisma.reserva.findUnique({ where: { id_reserva: Number(id) } });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.status(200).json(reserva);
  } else if (req.method === 'PUT') {
    const { id_pasajero, id_vuelo, precio_final, categoria_pasajero } = req.body;
    const reservaActualizada = await prisma.reserva.update({
      where: { id_reserva: Number(id) },
      data: {
        id_pasajero,
        id_vuelo,
        precio_final,
        categoria_pasajero,
      },
    });
    res.status(200).json(reservaActualizada);
  } else if (req.method === 'DELETE') {
    await prisma.reserva.delete({ where: { id_reserva: Number(id) } });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
