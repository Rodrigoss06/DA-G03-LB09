import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const archivo = await prisma.archivo.findUnique({
        where: { id_archivo: Number(id) },
      });

      if (!archivo) {
        return res.status(404).json({ error: "Archivo no encontrado" });
      }

      const filePath = path.join(process.cwd(), "public", archivo.ruta_archivo);
    //   const fileContent = fs.readFileSync(filePath, "utf8");

      res.status(200).send(filePath);
    } catch (error) {
      res.status(500).json({ error: "Error al leer el archivo" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
