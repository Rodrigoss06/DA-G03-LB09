// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

type response = {
  created: boolean;
  message: string;
  id:number
};

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<response>,
) {
  console.log(req.body)
    if (req.method === "POST" && req.body.userName && req.body.email && req.body.password) {
      console.log(req.body)
        const new_user = await prisma.usuario.create({
          data:{
            nombre_usuario:req.body.userName,
            email_usuario:req.body.email,
            contrasena_usuario:req.body.password
          }
        });

        if (new_user) {
            res.status(200).json({
                created: true,
                message: "Registro exitoso.",
                id:new_user.id_usuario
            });
        } else {
            res.status(404).json({
                created: false,
                message: "No se pudo crear el usuario.",
                id:0
            });
        }
    } else {
        res.status(400).json({
            created: false,
            message: "Datos incompletos. Debe enviar el nombre de usuario, email y la contraseña.",
            id:0
        });
    }
}
