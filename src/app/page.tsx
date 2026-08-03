import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CollectionSection from "@/components/CollectionSection";
import CustomDesignSection from "@/components/CustomDesignSection";
import WhatsAppSection from "@/components/WhatsAppSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SizeGuideModal from "@/components/SizeGuideModal";
import CartDrawer from "@/components/CartDrawer";
import { productsByCollection } from "@/data/products";

export default function Home() {
  const originals = productsByCollection("originals");
  const rebels = productsByCollection("rebels");

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CollectionSection
          id="originals"
          index="01"
          eyebrow="Colección propia"
          title="Originals"
          description="Diseños propios, ya listos. Lo que ves es lo que hay — cada pieza está disponible para pedir ahora."
          products={originals}
        />
        <CollectionSection
          id="rebels"
          index="02"
          eyebrow="Segunda línea"
          title="Rebels"
          description="Back-prints con más carácter. La cara opuesta de BWV, en la espalda de cada prenda."
          products={rebels}
        />
        <CustomDesignSection />
        <WhatsAppSection />
        <AboutSection />
      </main>
      <Footer />
      <SizeGuideModal />
      <CartDrawer />
    </>
  );
}
