import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Validación de datos usando zod
const archivoSchema = z.object({
  nombre_archivo: z.string().max(255),
  ruta_archivo: z.string().max(500),
  id_especialidad: z.number().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Obtener todos los archivos
    try {
      const archivos = await prisma.archivo.findMany();
      res.status(200).json(archivos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los archivos" });
    }
  } else if (req.method === "POST") {
    // Validar y crear un archivo
    try {
      const validData = archivoSchema.parse(req.body);
      const nuevoArchivo = await prisma.archivo.create({
        data: validData,
      });
      res.status(201).json(nuevoArchivo);
    } catch (error:any) {
      res.status(400).json({ error: error.errors });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
