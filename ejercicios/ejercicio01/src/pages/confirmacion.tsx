import Link from 'next/link';

export default function Confirmacion() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">¡Registro Exitoso!</h1>
      <p className="text-lg">Tu registro ha sido completado con éxito.</p>
      <Link href="/" className='mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'>
        Volver al Inicio
      </Link>
    </div>
  );
}
