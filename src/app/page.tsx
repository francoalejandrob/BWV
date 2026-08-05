import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CollectionSection from "@/components/CollectionSection";
import CustomDesignSection from "@/components/CustomDesignSection";
import ShippingTrustSection from "@/components/ShippingTrustSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SizeGuideModal from "@/components/SizeGuideModal";
import CartDrawer from "@/components/CartDrawer";
import { getCollectionsWithProducts } from "@/lib/catalog";

export const revalidate = 60;

export default async function Home() {
  const collections = await getCollectionsWithProducts();
  const originals = collections.find((c) => c.slug === "originals");
  const rebels = collections.find((c) => c.slug === "rebels");

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {originals && (
          <CollectionSection
            id="originals"
            index="01"
            eyebrow="Colección propia"
            title={originals.name}
            description={originals.description}
            products={originals.products}
          />
        )}
        {rebels && (
          <CollectionSection
            id="rebels"
            index="02"
            eyebrow="Segunda línea"
            title={rebels.name}
            description={rebels.description}
            products={rebels.products}
          />
        )}
        <CustomDesignSection />
        <ShippingTrustSection />
        <AboutSection />
      </main>
      <Footer />
      <SizeGuideModal />
      <CartDrawer />
    </>
  );
}
