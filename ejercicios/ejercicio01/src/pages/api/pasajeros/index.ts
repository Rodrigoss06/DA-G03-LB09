import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Obtener todos los pasajeros
    const pasajeros = await prisma.pasajero.findMany();
    res.status(200).json(pasajeros);
  } else if (req.method === "POST") {
    // Crear un nuevo pasajero
    const { nombre, apellido, fecha_nacimiento, email, telefono } = req.body;
    const nuevoPasajero = await prisma.pasajero.create({
      data: { nombre, apellido, fecha_nacimiento: new Date(fecha_nacimiento), email, telefono },
    });
    res.status(201).json(nuevoPasajero);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
