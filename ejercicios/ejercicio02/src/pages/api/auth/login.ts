// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

type response = {
  validate: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<response>,
) {
  console.log(req.body)
    if (req.method === "POST" && req.body.email && req.body.password) {
        const verifier = await prisma.usuario.findFirst({
          where: {
            email_usuario: req.body.email, 
            contrasena_usuario: req.body.password
          }
        });

        if (verifier) {
            res.status(200).json({
                validate: true,
                message: "Login exitoso."
            });
        } else {
            res.status(404).json({
                validate: false,
                message: "Usuario o contraseña incorrectos."
            });
        }
    } else {
        res.status(400).json({
            validate: false,
            message: "Datos incompletos. Debe enviar el nombre de usuario y la contraseña."
        });
    }
}
