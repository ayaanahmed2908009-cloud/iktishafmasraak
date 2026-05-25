import { Link } from "wouter";
import coverImage from "@/assets/cover.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <img
        src={coverImage}
        alt="Cover"
        className="block w-full h-auto max-h-[100dvh] object-contain"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-10 md:bottom-14 z-10"
      >
        <Link
          href="/survey"
          className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-yellow-400 px-8 sm:px-12 text-base sm:text-xl font-bold text-black shadow-[0_0_40px_-10px_rgba(250,204,21,0.5)] transition-all hover:bg-yellow-300 hover:scale-105 hover:shadow-[0_0_50px_-5px_rgba(250,204,21,0.6)] focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
          style={{ fontFamily: "Tajawal, sans-serif" }}
        >
          سجّل الآن
        </Link>
      </motion.div>
    </div>
  );
}
