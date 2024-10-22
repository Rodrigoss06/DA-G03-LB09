import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ArchivoDetalle = ({ archivo }: { archivo: any }) => {
  const router = useRouter();
  const { id } = router.query;

  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    // Obtener contenido del archivo
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(`/api/archivo/${archivo.id_archivo}/content`);
        setFileContent(response.data);
      } catch (error) {
        console.error("Error al obtener el contenido del archivo", error);
      }
    };

    fetchFileContent();
  }, [archivo.id_archivo]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Contenido del Archivo: {archivo.nombre_archivo}</h1>

      <div className="mt-6">
        <pre className="text-white p-4 rounded">{fileContent}</pre>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Volver
      </button>
    </div>
  );
};

// Cargar los datos del archivo seleccionado
export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const archivo = await prisma.archivo.findUnique({
    where: { id_archivo: Number(id) },
  });

  // Convertir la fecha a formato ISO antes de enviarla al cliente
  const archivoSerializable = {
    ...archivo,
    fecha_subida: archivo?.fecha_subida ? archivo.fecha_subida.toISOString() : null,
  };

  return {
    props: {
      archivo: archivoSerializable,
    },
  };
}

export default ArchivoDetalle;
