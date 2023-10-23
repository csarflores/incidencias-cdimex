import Footer from "@/components/Footer";
import IncidenciasForm from "@/components/IncidenciasForm";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <main className="flex flex-col items-center bg-pink-50 dark:bg-gray-800">
      <Navbar />
      <div className="container mx-auto space-y-16">
        <section className="flex center p-6 dark:bg-gray-800 dark:text-gray-50">
          <IncidenciasForm />
        </section>
      </div>
      <Footer />
    </main>
  )
}
