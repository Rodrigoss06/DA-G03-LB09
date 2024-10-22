import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const archivoUpdateSchema = z.object({
  nombre_archivo: z.string().max(255).optional(),
  ruta_archivo: z.string().max(500).optional(),
  id_especialidad: z.number().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    // Actualizar un archivo
    try {
      const validData = archivoUpdateSchema.parse(req.body);
      const archivoActualizado = await prisma.archivo.update({
        where: { id_archivo: Number(id) },
        data: validData,
      });
      res.status(200).json(archivoActualizado);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar el archivo" });
    }
  } else if (req.method === "DELETE") {
    // Eliminar un archivo
    try {
      await prisma.archivo.delete({
        where: { id_archivo: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el archivo" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
