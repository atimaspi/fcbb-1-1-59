
import { useEffect } from "react";
import { motion } from "framer-motion";
import FCBBLayout from "@/components/layout/FCBBLayout";
import FCBBHeroSection from "@/components/sections/FCBBHeroSection";
import FCBBStatsSection from "@/components/sections/FCBBStatsSection";
import FCBBNewsSection from "@/components/sections/FCBBNewsSection";
import FCBBCompetitionsSection from "@/components/sections/FCBBCompetitionsSection";
import FCBBPlayersSection from "@/components/sections/FCBBPlayersSection";
import FCBBClubsSection from "@/components/sections/FCBBClubsSection";
import FCBBPartnersSection from "@/components/sections/FCBBPartnersSection";

const Index = () => {
  useEffect(() => {
    console.log("FCBB website loaded");
  }, []);

  return (
    <FCBBLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <FCBBHeroSection />

        {/* Estatísticas */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FCBBStatsSection />
        </motion.section>

        {/* Notícias */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FCBBNewsSection />
        </motion.section>

        {/* Competições */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FCBBCompetitionsSection />
        </motion.section>

        {/* Jogadores */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FCBBPlayersSection />
        </motion.section>

        {/* Clubes */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FCBBClubsSection />
        </motion.section>

        {/* Parceiros */}
        <FCBBPartnersSection />
      </div>
    </FCBBLayout>
  );
};

export default Index;
