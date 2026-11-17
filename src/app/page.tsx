// import Hero from "@/app/section/hero";
// import Story from "./section/story";
// import Signatures from "./section/signatures";
// import Review from "./section/review";
// import Film  from "./section/film";
// import Anatomy from "./section/anatomy";
// import Footer from "@/component/Footer";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-[#12100E] text-[#F5EFE6] overflow-x-hidden">
//       {/* Exact Figma Clean Luxury Hero Experience */}
//       <Hero/>
//       <Story/>
//       <Anatomy/>
//       <Film/>
//             <Signatures/>
//       <Review/>
//       <Footer/>
//     </main>
//   );
// }
import Navbar from "@/component/Navbar";
import Hero from "@/app/section/hero";
import Story from "./section/story";
import Signatures from "./section/signatures";
import Review from "./section/review";
import Film from "./section/film";
import Anatomy from "./section/anatomy";
import Footer from "@/component/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#12100E] text-[#F5EFE6] overflow-x-hidden">
    
      <Navbar />

      <Hero />
      <Story />
      <Anatomy />
      <Film />
      <Signatures />
      <Review />
      <Footer />
    </main>
  );
}