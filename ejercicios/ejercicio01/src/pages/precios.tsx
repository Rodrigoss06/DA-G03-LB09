import { useState } from 'react';
import axios from 'axios';

export default function Precios() {
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [precio, setPrecio] = useState(null);
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/precios', { fecha_nacimiento: fechaNacimiento });
      setPrecio(response.data.precio_final);
      setCategoria(response.data.categoria);
    } catch (error) {
      console.error('Error al calcular precio', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Calcular Precio de Pasaje</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          className="block w-full bg-gray-800 p-2 rounded"
        />
        <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
          Calcular Precio
        </button>
      </form>
      {precio !== null && (
        <div className="mt-6">
          <h2 className="text-xl">Precio Final: {precio} USD</h2>
          <h3 className="text-lg">Categoría: {categoria}</h3>
        </div>
      )}
    </div>
  );
}
