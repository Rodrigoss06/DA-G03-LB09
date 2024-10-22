import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import axios from "axios";
import { userStore } from "../../store/userStore";
import { useRouter } from "next/router"; // Importa useRouter

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface registerDto {
  userName: string;
  email: string;
  password: string;
}

interface loginDto {
  email: string;
  password: string;
}

enum typeForm {
  REGISTER = "register",
  LOGIN = "login",
}

export default function Home() {
  const [modal, setModal] = useState(false);
  const [formType, setFormType] = useState("");
  const [registerData, setRegisterData] = useState<registerDto>({
    userName: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState<loginDto>({ email: "", password: "" });
  const [error, setError] = useState("");
  const { validate, setValidate,id,setId} = userStore();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axios.post("api/auth/register", registerData);
      if (response.status === 200) {
        setValidate(true);
        setId(response.data.id)
      router.push(`/dashboard/${response.data.id}`); // Redirigir cuando validate sea true

      }
    } catch (error) {
      setError("Error al registrar");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("api/auth/login", loginData);
      if (response.status === 200) {
        setValidate(true);
        setId(response.data.id)
      router.push(`/dashboard/${response.data.id}`); // Redirigir cuando validate sea true
        
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    }
  };

  // useEffect(() => {
  //   if (validate) {
  //     router.push(`/dashboard/${id}`); // Redirigir cuando validate sea true
  //   }
  // }, [validate, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <ul className="flex space-x-4">
          <a href="#Home" className="hover:text-gray-300">Home</a>
          <a href="#Features" className="hover:text-gray-300">Características</a>
          <a href="#About" className="hover:text-gray-300">Sobre nosotros</a>
          <a href="#Contact" className="hover:text-gray-300">Contacto</a>
        </ul>
        <ul className="flex space-x-4">
          <button
            onClick={() => {
              setFormType(typeForm.REGISTER);
              setModal(!modal);
            }}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <button
            onClick={() => {
              setFormType(typeForm.LOGIN);
              setModal(!modal);
            }}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </ul>
      </nav>

      <main className="flex-grow">
        <section id="Home" className="h-screen bg-cover bg-center flex items-center justify-center text-center">
          <h1 className="text-5xl font-bold">Bienvenido a nuestra página</h1>
        </section>

        <section id="Features" className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Características</h2>
          <p className="text-lg">Descubre las funciones que ofrecemos.</p>
        </section>

        <section id="About" className="py-20  text-center">
          <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>
          <p className="text-lg">Somos un equipo comprometido en ofrecer lo mejor.</p>
        </section>

        {modal && (
          <Modal>
            {formType === "register" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
                className=" p-8 rounded shadow-md space-y-4 text-black"
              >
                <h2 className="text-2xl font-bold">Regístrate</h2>
                <input
                  type="text"
                  placeholder="UserName"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    setRegisterData({ ...registerData, userName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    setRegisterData({ ...registerData, password: e.target.value })
                  }
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                  Register
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className=" p-8 rounded shadow-md space-y-4 text-black"
              >
                <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
                  Login
                </button>
              </form>
            )}
          </Modal>
        )}
      </main>

      <footer id="Contact" className="bg-gray-800 text-white p-4 text-center">
        <p>Contactanos en: contacto@empresa.com</p>
      </footer>
    </div>
  );
}
