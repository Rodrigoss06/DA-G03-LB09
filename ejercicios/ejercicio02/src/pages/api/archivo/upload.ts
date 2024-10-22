import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "/public/uploads"),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "Error al subir archivo" });
        return;
      }

      // Verificar si `files.file` es un array
      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file) {
        return res.status(400).json({ error: "No se encontró ningún archivo" });
      }

      const nombre_archivo = file.originalFilename;
      const ruta_archivo = `/uploads/${file.newFilename}`;

      const nuevoArchivo = await prisma.archivo.create({
        data: {
          nombre_archivo: nombre_archivo || "archivo_sin_nombre",
          ruta_archivo,
          id_especialidad: Number(fields.id_especialidad),
        },
      });

      res.status(201).json(nuevoArchivo);
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
