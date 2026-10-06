export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import HowIWork from "@/components/HowIWork";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Research from "@/components/Research";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <HowIWork />
      <Services />
      <TechStack />
      <Research />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
