import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "../../../../lib/prisma";

// Validación de datos para la actualización
const archivoUsuarioUpdateSchema = z.object({
  id_usuario: z.number().optional(),
  id_archivo: z.number().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id_usuario, id_archivo } = req.query;

  if (req.method === "PUT") {
    // Actualizar un registro de archivo_usuario
    try {
      const validData = archivoUsuarioUpdateSchema.parse(req.body);
      const archivoUsuarioActualizado = await prisma.archivo_usuario.update({
        where: {
          id_usuario_id_archivo: {
            id_usuario: Number(id_usuario),
            id_archivo: Number(id_archivo),
          },
        },
        data: validData,
      });
      res.status(200).json(archivoUsuarioActualizado);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar el registro de archivo_usuario" });
    }
  } else if (req.method === "DELETE") {
    // Eliminar un registro de archivo_usuario
    try {
      await prisma.archivo_usuario.delete({
        where: {
          id_usuario_id_archivo: {
            id_usuario: Number(id_usuario),
            id_archivo: Number(id_archivo),
          },
        },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el registro de archivo_usuario" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
