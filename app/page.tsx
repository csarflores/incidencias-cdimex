import Footer from "@/components/Footer";
import IncidenciasForm from "@/components/IncidenciasForm";
import Navbar from "@/components/Navbar";
import Image from "next/image";


export default function Home() {
  return (
    <main className="items-center bg-pink-50 dark:bg-gray-800">

      <Navbar />
      <div className="container min-w-full mx-auto">
        <div className="flex space-y-16">
          <section className="hidden lg:flex lg:w-2/5 center">
            <Image
              src="/bg-diverse.jpg"
              alt="Trabajo en equipo"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={300}
              className="relative"
            />
          </section>
          <section className="block max-w-full p-4 lg:w-3/5 justify-center dark:bg-gray-800 dark:text-gray-50">
            <IncidenciasForm />
            <Footer />
          </section>
        </div>
      </div>

    </main>
  )
}
