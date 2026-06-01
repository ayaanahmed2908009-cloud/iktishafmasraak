import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Compass,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

type Phase = {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  /** node position on the winding path, in viewBox % (desktop) */
  x: number;
  y: number;
};

const PHASES: Phase[] = [
  {
    num: "01",
    title: "اكتشف مسارك",
    desc: "ابدأ رحلتك بالتسجيل في المنصة واستكشاف محتوى تفاعلي يقودك لاكتشاف ميولك المهنية، مع شهادة إتمام معتمدة.",
    icon: Compass,
    x: 30,
    y: 15,
  },
  {
    num: "02",
    title: "البرنامج التأهيلي",
    desc: "ورش عمل حضورية ولقاءات مع متخصصين وتجارب تفاعلية تصقل مهاراتك وتجهّزك لدخول سوق العمل بثقة.",
    icon: GraduationCap,
    x: 70,
    y: 50,
  },
  {
    num: "03",
    title: "البرنامج التدريبي",
    desc: "تجربة ميدانية واقعية في جهات مهنية تستكشف من خلالها بيئة العمل عن قرب وتبني شبكتك المهنية.",
    icon: Briefcase,
    x: 30,
    y: 85,
  },
];

const PATH_D = "M 30 5 C 30 26 70 26 70 50 C 70 74 30 74 30 95";
const EASE = [0.22, 1, 0.36, 1] as const;

export function ProgramRoadmap() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="roadmap"
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#0a1e3a] py-24 sm:py-32"
    >
      {/* soft ambient glow, kept airy */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-yellow-400/[0.05] blur-[130px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* header */}
        <header className="mb-16 text-center sm:mb-24">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 inline-block text-sm font-semibold tracking-[0.22em] text-yellow-400/90"
          >
            رحلة من ثلاث مراحل
          </motion.span>
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            رحلة البرنامج
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-blue-200/60"
          >
            كيف نأخذك من الاكتشاف إلى التطبيق العملي في بيئة مهنية حقيقية
          </motion.p>
        </header>

        {/* ===== Winding dotted journey (all screens) ===== */}
        <div className="relative min-h-[42rem] sm:min-h-[46rem] lg:min-h-[46rem]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <motion.path
              d={PATH_D}
              stroke="#facc15"
              strokeOpacity={0.45}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="0.5 13"
              vectorEffect="non-scaling-stroke"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </svg>

          {PHASES.map((phase, idx) => (
            <JourneyStep
              key={phase.num}
              phase={phase}
              index={idx}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyStep({
  phase,
  index,
  reduceMotion,
}: {
  phase: Phase;
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = phase.icon;
  const nodeLeft = phase.x < 50;
  const base = index * 0.18;

  const nodeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 240, damping: 18, delay: base },
    },
  };

  return (
    <>
      {/* icon marker sitting on the path */}
      <motion.div
        variants={reduceMotion ? undefined : nodeVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${phase.x}%`, top: `${phase.y}%` }}
      >
        <span className="absolute -inset-3 -z-10 rounded-full bg-yellow-400/10 blur-md" />
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#0a1e3a] shadow-[0_10px_30px_-8px_rgba(250,204,21,0.55)] ring-1 ring-inset ring-white/25 sm:h-16 sm:w-16 sm:rounded-2xl">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="absolute -bottom-1.5 -left-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a1e3a] text-[11px] font-bold text-yellow-400 ring-1 ring-yellow-400/40">
          {phase.num}
        </span>
      </motion.div>

      {/* text block, on the side opposite the node */}
      <div
        className="absolute w-full -translate-y-1/2"
        style={{ top: `${phase.y}%` }}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: nodeLeft ? 28 : -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -18% 0px" }}
          transition={{ duration: 0.6, ease: EASE, delay: base + 0.12 }}
          className={`w-[50%] text-right sm:w-[44%] lg:w-[40%] ${
            nodeLeft
              ? "ml-auto mr-[4%] sm:mr-[7%]"
              : "mr-auto ml-[4%] sm:ml-[7%]"
          }`}
        >
          <span className="text-[11px] font-semibold tracking-[0.16em] text-yellow-400/70 sm:text-xs sm:tracking-[0.18em]">
            المرحلة {phase.num}
          </span>
          <h3 className="mt-1.5 text-lg font-bold tracking-tight text-white sm:text-2xl">
            {phase.title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-blue-100/65 sm:mt-3 sm:text-[15px]">
            {phase.desc}
          </p>
        </motion.div>
      </div>
    </>
  );
}
