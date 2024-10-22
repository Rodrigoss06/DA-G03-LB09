import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const usuarioUpdateSchema = z.object({
  nombre_usuario: z.string().max(100).optional(),
  email_usuario: z.string().email().optional(),
  contrasena_usuario: z.string().min(6).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const validData = usuarioUpdateSchema.parse(req.body);
      const usuarioActualizado = await prisma.usuario.update({
        where: { id_usuario: Number(id) },
        data: validData,
      });
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar el usuario" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.usuario.delete({
        where: { id_usuario: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
