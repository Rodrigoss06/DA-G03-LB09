import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nombre_completo, direccion, correo_electronico, contrasena, fecha_nacimiento, sexo } = req.body;

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        direccion,
        correo_electronico,
        contrasena,
        fecha_nacimiento: new Date(fecha_nacimiento),
        sexo,
      },
    });

    res.status(201).json(nuevoUsuario);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
