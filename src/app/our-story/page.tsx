import Footer from "@/component/Footer";
import Hero from "./section/hero";
import Joinus from "./section/joinus";
import Story from "./section/story";
import Navbar from "@/component/Navbar";



export default function Home() {
  return (
    <main className='relative flex flex-col w-full min-h-screen overflow-x-clip'>
      <div className='relative flex flex-col w-full'>
        <Navbar/>
      <Hero/>
   <Story/>
   <Joinus/>
   <Footer/>
      </div>
    </main>
  );
}