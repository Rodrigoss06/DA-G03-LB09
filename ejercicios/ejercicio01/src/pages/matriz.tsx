import { useState } from 'react';
import axios from 'axios';

export default function Matriz() {
  const [matriz, setMatriz] = useState<any[]>();
  const [esPerfecta, setEsPerfecta] = useState(null);

  const generarMatriz = async () => {
    try {
      const response = await axios.post('/api/matrices');
      setMatriz(response.data.matriz);
      setEsPerfecta(response.data.esPerfecta);
    } catch (error) {
      console.error('Error al generar matriz', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Matriz Perfecta</h1>
      <button onClick={generarMatriz} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
        Generar Matriz
      </button>
      {matriz && (
  <div className="mt-6">
    <h2 className="text-xl mb-4">Matriz Generada:</h2>
    <div className="grid grid-cols-3 gap-4">
      {matriz.map((fila: number[], filaIndex: number) => (
        <div key={filaIndex} className="grid grid-cols-3 gap-2">
          {fila.map((valor, colIndex) => (
            <div
              key={colIndex}
              className="bg-gray-800 text-white p-4 text-center rounded"
            >
              {valor}
            </div>
          ))}
        </div>
      ))}
    </div>
    <h3 className="text-lg mt-6">¿Es Perfecta?: {esPerfecta ? 'Sí' : 'No'}</h3>
  </div>
)}

    </div>
  );
}
