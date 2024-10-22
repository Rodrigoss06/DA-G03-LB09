import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const usuario = await prisma.usuario.findUnique({ where: { id_usuario: Number(id) } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } else if (req.method === 'PUT') {
    const { nombre_completo, direccion, correo_electronico, contrasena, fecha_nacimiento, sexo } = req.body;
    const usuarioActualizado = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: {
        nombre_completo,
        direccion,
        correo_electronico,
        contrasena,
        fecha_nacimiento: new Date(fecha_nacimiento),
        sexo,
      },
    });
    res.status(200).json(usuarioActualizado);
  } else if (req.method === 'DELETE') {
    await prisma.usuario.delete({ where: { id_usuario: Number(id) } });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
