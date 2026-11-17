import Footer from "@/component/Footer";
import Contact from "./section/contact";
import Navbar from "@/component/Navbar";



export default function ContactPage() {
  return (
    <main className='relative flex flex-col w-full min-h-screen overflow-x-clip'>
      <Navbar/>
      <Contact />
      <Footer/>
    </main>
  );
}