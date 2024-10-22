import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fecha_nacimiento } = req.body;

    const hoy = new Date();
    const fechaNacimiento = new Date(fecha_nacimiento);
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const ajusteEdad =
      hoy.getMonth() < fechaNacimiento.getMonth() ||
      (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())
        ? edad - 1
        : edad;

    let precioBase = 100; // Precio base fijo para el ejemplo
    let precioFinal = precioBase;
    let categoria = 'Adulto';

    if (ajusteEdad < 2) {
      precioFinal = 0; // Infantes no pagan
      categoria = 'Infante';
    } else if (ajusteEdad >= 2 && ajusteEdad < 18) {
      precioFinal = precioBase * 0.75; // Menores pagan 75%
      categoria = 'Menor';
    }

    res.status(200).json({ precio_final: precioFinal, categoria });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
