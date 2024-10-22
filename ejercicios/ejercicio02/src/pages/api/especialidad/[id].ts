import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Validación de datos usando zod
const especialidadUpdateSchema = z.object({
  nombre_especialidad: z.string().max(100).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    // Actualizar una especialidad
    try {
      const validData = especialidadUpdateSchema.parse(req.body);
      const especialidadActualizada = await prisma.especialidad.update({
        where: { id_especialidad: Number(id) },
        data: validData,
      });
      res.status(200).json(especialidadActualizada);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar la especialidad" });
    }
  } else if (req.method === "DELETE") {
    // Eliminar una especialidad
    try {
      await prisma.especialidad.delete({
        where: { id_especialidad: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la especialidad" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
