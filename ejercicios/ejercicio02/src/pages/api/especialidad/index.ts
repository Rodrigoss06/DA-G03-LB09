import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Validación de datos usando zod
const especialidadSchema = z.object({
  nombre_especialidad: z.string().max(100),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Obtener todas las especialidades
    try {
      const especialidades = await prisma.especialidad.findMany();
      res.status(200).json(especialidades);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las especialidades" });
    }
  } else if (req.method === "POST") {
    // Validar y crear una nueva especialidad
    try {
      const validData = especialidadSchema.parse(req.body);
      const nuevaEspecialidad = await prisma.especialidad.create({
        data: validData,
      });
      res.status(201).json(nuevaEspecialidad);
    } catch (error:any) {
      res.status(400).json({ error: error.errors });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
