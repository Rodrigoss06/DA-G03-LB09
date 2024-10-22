import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Validación de datos usando zod
const archivoUsuarioSchema = z.object({
  id_usuario: z.number(),
  id_archivo: z.number(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Obtener todos los registros de archivo_usuario
    try {
      const archivoUsuarios = await prisma.archivo_usuario.findMany();
      res.status(200).json(archivoUsuarios);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los registros de archivo_usuario" });
    }
  } else if (req.method === "POST") {
    // Validar y crear un registro de archivo_usuario
    try {
      const validData = archivoUsuarioSchema.parse(req.body);
      const nuevoArchivoUsuario = await prisma.archivo_usuario.create({
        data: validData,
      });
      res.status(201).json(nuevoArchivoUsuario);
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
