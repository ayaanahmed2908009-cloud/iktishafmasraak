import { Link } from "wouter";
import coverImage from "@/assets/cover.png";
import logosStrip from "@/assets/logos-strip.png";
import titleStrip from "@/assets/title-strip.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center bg-black overflow-hidden">
      {/* Background cover image (cropped to fill) */}
      <img
        src={coverImage}
        alt="Cover"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-95"
      />

      {/* Dark gradient overlay for CTA contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 md:bg-none" />

      {/* Mobile-only: program name strip at the top */}
      <img
        src={titleStrip}
        alt="اكتشف مسارك"
        className="md:hidden absolute inset-x-0 top-0 w-full h-auto z-20 pointer-events-none"
      />

      {/* CTA — centered on mobile, near bottom on desktop */}
      <div className="relative z-30 flex flex-1 items-center md:items-end justify-center min-h-[100dvh] w-full pb-0 md:pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center w-full"
        >
          <Link
            href="/survey"
            className="inline-flex h-14 sm:h-14 items-center justify-center rounded-full bg-yellow-400 px-12 sm:px-12 text-xl sm:text-xl font-bold text-black shadow-[0_0_40px_-10px_rgba(250,204,21,0.5)] transition-all hover:bg-yellow-300 hover:scale-105 hover:shadow-[0_0_50px_-5px_rgba(250,204,21,0.6)] focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
            style={{ fontFamily: "Tajawal, sans-serif" }}
          >
            سجّل الآن
          </Link>
        </motion.div>
      </div>

      {/* Mobile-only: logos strip pinned at the bottom */}
      <img
        src={logosStrip}
        alt="Sponsors"
        className="md:hidden absolute inset-x-0 bottom-0 w-full h-auto z-20 pointer-events-none"
      />
    </div>
  );
}
