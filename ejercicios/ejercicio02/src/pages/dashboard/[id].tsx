import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Dashboard = ({ especialidadesArchivos }: { especialidadesArchivos: any }) => {
  const router = useRouter();
  const { id } = router.query;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  // Función para manejar la carga de archivos
  const handleFileUpload = async (especialidadId: number, e: any) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id_especialidad", String(especialidadId)); // Enviar id de la especialidad

    try {
      const response = await axios.post(`/api/archivo/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        setUploadedFiles([...uploadedFiles, response.data]); // Agregar nuevo archivo a la lista
      }
    } catch (error) {
      console.error("Error al subir archivo", error);
    }
  };

  // Función para redireccionar a la página de la especialidad seleccionada
  const handleEspecialidadClick = (especialidadId: number) => {
    router.push(`/especialidad/${especialidadId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard de Archivos por Especialidad</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {especialidadesArchivos.map((especialidad: any) => (
          <div
            key={especialidad.id_especialidad}
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
            onClick={() => handleEspecialidadClick(especialidad.id_especialidad)}
          >
            <h2 className="text-xl font-semibold">{especialidad.nombre_especialidad}</h2>

            {especialidad.archivos.length > 0 ? (
              <div>
                <h3 className="mt-4 font-semibold">Archivos Subidos:</h3>
                <ul className="mt-2">
                  {especialidad.archivos.map((archivo: any) => (
                    <li key={archivo.id_archivo} className="mt-2">
                      <a
                        href={`/especialidad/${archivo.id_archivo}`}
                        className="text-blue-500 underline"
                      >
                        {archivo.nombre_archivo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No hay archivos para esta especialidad.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Cargar los datos del usuario, especialidades y archivos asociados
export async function getServerSideProps(context: any) {
  const { id } = context.params;

  // Obtener el usuario por id
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: Number(id) },
    include: {
      archivo_usuario: {
        include: {
          archivo: {
            include: {
              especialidad: true, // Obtener la especialidad de cada archivo
            },
          },
        },
      },
    },
  });

  if (!usuario) {
    return {
      notFound: true,
    };
  }

  // Obtener todas las especialidades y sus archivos asociados al usuario
  const especialidades = await prisma.especialidad.findMany({
    include: {
      archivo: true, // Obtener archivos relacionados con cada especialidad
    },
  });

  // Convertir las fechas a cadenas de texto antes de devolverlas
  const especialidadesArchivos = especialidades.map((especialidad) => ({
    id_especialidad: especialidad.id_especialidad,
    nombre_especialidad: especialidad.nombre_especialidad,
    archivos: especialidad.archivo.map((archivo) => ({
      id_archivo: archivo.id_archivo,
      nombre_archivo: archivo.nombre_archivo,
      ruta_archivo: archivo.ruta_archivo,
      fecha_subida: archivo.fecha_subida ? archivo.fecha_subida.toISOString() : null, // Convertir la fecha a ISO string
    })),
  }));

  return {
    props: {
      especialidadesArchivos,
    },
  };
}


export default Dashboard;
