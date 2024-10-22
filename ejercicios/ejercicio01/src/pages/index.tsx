import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a la Venta de Pasajes Aéreos</h1>
      <div className="flex space-x-6">
        <Link href="/registro" className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'>
          Registrarse
        </Link>
        <Link href="/precios" className='bg-green-600 px-4 py-2 rounded hover:bg-green-700'>
          Calcular Precio de Pasaje
        </Link>
        <Link href="/matriz" className='bg-purple-600 px-4 py-2 rounded hover:bg-purple-700'>
          Matriz Perfecta
        </Link>
      </div>
    </div>
  );
}
