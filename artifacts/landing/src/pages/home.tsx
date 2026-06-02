import coverImage from "@assets/Screenshot_1447-12-14_at_11.11.45_pm_1780258333952.png";
import photoOnly from "@/assets/photo-only.png";
import partnerMisk from "@assets/misk_1780259646848.png";
import partnerNahj from "@assets/nahj-نهج_1780259659377.png";
import { motion } from "framer-motion";
import { SurveyForm } from "@/components/survey-form";
import { PartnersCarousel } from "@/components/partners-carousel";
import { ProgramRoadmap } from "@/components/program-roadmap";
import { 
  Cpu, 
  Stethoscope, 
  Cog, 
  TrendingUp, 
  Mic, 
  Scale, 
  Trophy, 
  ExternalLink
} from "lucide-react";

const MISK_PORTAL_URL = "https://hub.misk.org.sa/ar/programs/skills/discover-your-path/";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center bg-[#0a1e3a] text-white overflow-hidden font-sans" style={{ fontFamily: "Tajawal, sans-serif" }}>
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[100dvh] w-full flex flex-col items-center bg-white overflow-hidden shrink-0">
        {/* ===== DESKTOP / TABLET (md+) — rounded peninsula surrounded by white ===== */}
        <div className="hidden md:block absolute inset-12 lg:inset-16 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
          {/* Blurred backdrop to extend cover edges */}
          <img
            src={coverImage}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl opacity-90"
          />
          {/* Main cover image */}
          <img
            src={coverImage}
            alt="Cover"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Soft dark overlay for legibility of the centered title */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Centered title + subtitle */}
          <div dir="rtl" className="absolute inset-0 z-20 flex flex-col items-center justify-center pb-28 lg:pb-36 px-8 text-center pointer-events-none">
            <p
              className="text-white/85 text-base lg:text-lg font-medium tracking-wide mb-5"
              style={{ fontFamily: "Tajawal, sans-serif", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              برنامج من نهج بالتعاون مع مؤسسة مسك
            </p>
            <h1
              className="text-white tracking-tight leading-[0.95] text-8xl lg:text-9xl"
              style={{
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <span className="block">اكتشف</span>
              <span className="block -translate-x-8 lg:-translate-x-12">مسارك</span>
            </h1>
            <p
              className="text-white/90 text-xl lg:text-2xl font-bold mt-8 max-w-2xl leading-relaxed"
              style={{ fontFamily: "Tajawal, sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              رحلة لاكتشاف مسارك المهني مبكرًا، من التعلّم إلى التجربة الميدانية
            </p>
          </div>
        </div>

        {/* ===== MOBILE (default) ===== */}
        {/* Photo as the natural background */}
        <img
          src={photoOnly}
          alt="Cover"
          className="md:hidden absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Soft dark overlay for legibility of title + logos */}
        <div className="md:hidden absolute inset-0 bg-black/25" />
        {/* Title in the middle (glowing white text) */}
        <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-6 flex justify-center pointer-events-none">
          <h1
            dir="rtl"
            className="text-white text-6xl font-black tracking-tight text-center leading-[1.1]"
            style={{
              fontFamily: "Tajawal, sans-serif",
              textShadow:
                "0 0 12px rgba(255,255,255,0.85), 0 0 30px rgba(255,255,255,0.55), 0 0 60px rgba(255,255,255,0.35), 0 4px 24px rgba(0,0,0,0.6)",
            }}
          >
            اكتشف مسارك
          </h1>
        </div>

        {/* CTA — centered on mobile (slightly above logos), near bottom on desktop */}
        <div className="relative z-30 flex flex-1 items-end md:items-end justify-center h-[100dvh] w-full pb-32 md:pb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center w-full"
          >
            <a
              href={MISK_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 md:h-20 items-center justify-center rounded-full bg-yellow-400 px-12 md:px-20 text-xl md:text-3xl font-bold text-black shadow-[0_0_40px_-10px_rgba(250,204,21,0.5)] transition-all hover:bg-yellow-300 hover:scale-105 hover:shadow-[0_0_50px_-5px_rgba(250,204,21,0.6)] focus:outline-none focus:ring-4 focus:ring-yellow-400/50 cursor-pointer"
            >
              سجّل الآن
            </a>
          </motion.div>
        </div>
      </div>

      {/* BROUGHT TO YOU BY */}
      <section
        aria-label="مقدّم لكم من"
        className="w-full bg-white py-14 sm:py-20"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          {/* Arabic text on the right */}
          <div dir="rtl" className="text-center md:text-right shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3a] leading-tight">
              مقدّم لكم من
            </h2>
          </div>

          {/* Logos on the right — نهج first, then مسك */}
          <div dir="rtl" className="flex items-center justify-center gap-6 sm:gap-10">
            <div className="flex w-48 sm:w-64 items-center justify-center">
              <img
                src={partnerNahj}
                alt="نهج"
                className="h-24 sm:h-32 w-auto object-contain"
              />
            </div>
            <div className="self-center h-16 sm:h-20 w-px bg-[#0a1e3a]/15" />
            <div className="flex w-40 sm:w-52 items-center justify-center">
              <img
                src={partnerMisk}
                alt="مؤسسة مسك"
                className="h-16 sm:h-24 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS CAROUSEL */}
      <PartnersCarousel />

      {/* 2. PROGRAM SUMMARY SECTION */}
      <section dir="rtl" className="w-full py-20 md:py-28 max-w-6xl mx-auto px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[70ch] text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400">عن البرنامج</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-blue-100">
            برنامج مقدم من نهج بالتعاون مع مؤسسة مسك لتمكين طلاب وطالبات المرحلة الثانوية من استكشاف مساراتهم المهنية مبكرًا عبر رحلة تعليمية وتجريبية متكاملة تساعدهم على اتخاذ قراراتهم المستقبلية بوعي وثقة.
          </p>
        </motion.div>
      </section>

      {/* 3. PROGRAM JOURNEY ROADMAP */}
      <ProgramRoadmap />

      {/* 4. PROFESSION PATHWAYS SECTION */}
      <section dir="rtl" className="w-full bg-[#E8DCC8] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1e3a]">المسارات المهنية</h2>
            <p className="mt-4 text-lg text-[#1f3a5f]">اكتشف المجالات المهنية واختر ما يناسب شغفك وطموحك</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: "التقنية والتحول الرقمي", icon: Cpu },
              { label: "الصحة وعلوم الحياة", icon: Stethoscope },
              { label: "الهندسة والطاقة والصناعة", icon: Cog },
              { label: "المالية وريادة الأعمال", icon: TrendingUp },
              { label: "الإعلام والصحافة", icon: Mic },
              { label: "القانون والعلاقات الدولية", icon: Scale },
              { label: "الرياضة والترفيه", icon: Trophy },
            ].map((pathway, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group flex items-center gap-4 rounded-2xl border border-[#0a1e3a]/10 bg-white py-4 px-5 cursor-pointer shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-yellow-400/25"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-500 ring-1 ring-inset ring-white/30 flex items-center justify-center shrink-0 shadow-[0_6px_18px_-6px_rgba(250,204,21,0.6)] transition-transform duration-300 group-hover:scale-110">
                  <pathway.icon className="w-5 h-5 text-[#0a1e3a]" strokeWidth={2.2} />
                </div>
                <span className="text-base font-bold leading-snug text-[#0a1e3a]">{pathway.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUESTIONARY SECTION */}
      <section id="questionary" dir="rtl" className="w-full py-20 md:py-28 max-w-3xl mx-auto px-6 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">استبيان سريع</h2>
          <p className="text-xl text-blue-200">ساعدنا نتعرف عليك في أقل من دقيقة</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md"
        >
          <SurveyForm 
            theme="dark"
            successMessage="لقد تم استلام بياناتك بنجاح. أكمل رحلتك بالأسفل."
            successButtonLabel="المتابعة للتسجيل"
            onSuccessAction={() => scrollToSection('apply')}
          />
        </motion.div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section id="apply" dir="rtl" className="w-full py-24 md:py-32 max-w-4xl mx-auto px-6 text-center scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/20 rounded-3xl p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-yellow-400/5 blur-3xl pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white relative z-10">جاهز تبدأ رحلتك؟</h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
            ابدأ التسجيل الآن عبر منصة مسك الرسمية، وكن جزءًا من تجربة تساعدك على اكتشاف مستقبلك المهني.
          </p>
          <a
            href={MISK_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-16 items-center justify-center rounded-full bg-yellow-400 px-12 text-xl font-bold text-black shadow-[0_0_40px_-10px_rgba(250,204,21,0.5)] transition-all hover:bg-yellow-300 hover:scale-105 hover:shadow-[0_0_50px_-5px_rgba(250,204,21,0.6)] relative z-10"
          >
            ابدأ التسجيل
            <ExternalLink className="w-5 h-5 mr-3" />
          </a>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer dir="rtl" className="w-full py-12 border-t border-[#0a1e3a]/10 bg-white text-center mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            <img
              src={partnerNahj}
              alt="نهج"
              className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            <span className="h-12 md:h-14 w-px bg-[#0a1e3a]/15" />
            <img
              src={partnerMisk}
              alt="مؤسسة مسك"
              className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <p className="text-[#0a1e3a]/60 text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} برنامج اكتشف مسارك
          </p>
        </div>
      </footer>

    </div>
  );
}