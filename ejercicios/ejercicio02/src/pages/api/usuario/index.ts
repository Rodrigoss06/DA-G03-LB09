import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const usuarioSchema = z.object({
  nombre_usuario: z.string().max(100),
  email_usuario: z.string().email(),
  contrasena_usuario: z.string().min(6), // Requerir al menos 6 caracteres para la contraseña
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  } else if (req.method === "POST") {
    try {
      const validData = usuarioSchema.parse(req.body);
      const nuevoUsuario = await prisma.usuario.create({
        data: validData,
      });
      res.status(201).json(nuevoUsuario);
    } catch (error:any) {
      res.status(400).json({ error: error.errors });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
