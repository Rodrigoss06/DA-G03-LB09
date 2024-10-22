import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Registro() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/api/usuarios', {
        nombre_completo: nombreCompleto,
        direccion,
        correo_electronico: correo,
        contrasena,
        fecha_nacimiento: fechaNacimiento,
        sexo,
      });
      router.push('/confirmacion');
    } catch (error) {
      console.error('Error en el registro', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Registro de Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre Completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          className="block w-full bg-gray-800 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="block w-full bg-gray-800 p-2 rounded"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="block w-full bg-gray-800 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="block w-full bg-gray-800 p-2 rounded"
        />
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          className="block w-full bg-gray-800 p-2 rounded"
        />
        <select
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          className="block w-full bg-gray-800 p-2 rounded"
        >
          <option value="">Seleccionar Sexo</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Registrarse
        </button>
      </form>
    </div>
  );
}
