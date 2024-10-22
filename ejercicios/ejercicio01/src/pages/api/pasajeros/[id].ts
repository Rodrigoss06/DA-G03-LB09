import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Obtener pasajero por ID
    const pasajero = await prisma.pasajero.findUnique({ where: { id_pasajero: Number(id) } });
    if (!pasajero) return res.status(404).json({ error: "Pasajero no encontrado" });
    res.status(200).json(pasajero);
  } else if (req.method === "PUT") {
    // Actualizar pasajero
    const { nombre, apellido, fecha_nacimiento, email, telefono } = req.body;
    const pasajeroActualizado = await prisma.pasajero.update({
      where: { id_pasajero: Number(id) },
      data: { nombre, apellido, fecha_nacimiento: new Date(fecha_nacimiento), email, telefono },
    });
    res.status(200).json(pasajeroActualizado);
  } else if (req.method === "DELETE") {
    // Eliminar pasajero
    await prisma.pasajero.delete({ where: { id_pasajero: Number(id) } });
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
