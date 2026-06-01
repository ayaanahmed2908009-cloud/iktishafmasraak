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

        {/* ===== Desktop: winding dotted journey ===== */}
        <div className="relative hidden min-h-[46rem] lg:block">
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
            <DesktopStep
              key={phase.num}
              phase={phase}
              index={idx}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>

        {/* ===== Mobile: dotted vertical journey ===== */}
        <MobileJourney reduceMotion={!!reduceMotion} />
      </div>
    </section>
  );
}

function DesktopStep({
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
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${phase.x}%`, top: `${phase.y}%` }}
      >
        <span className="absolute -inset-3 -z-10 rounded-full bg-yellow-400/10 blur-md" />
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#0a1e3a] shadow-[0_10px_30px_-8px_rgba(250,204,21,0.55)] ring-1 ring-inset ring-white/25">
          <Icon className="h-7 w-7" strokeWidth={2.2} aria-hidden />
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
          initial={reduceMotion ? false : { opacity: 0, x: nodeLeft ? 36 : -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -18% 0px" }}
          transition={{ duration: 0.6, ease: EASE, delay: base + 0.12 }}
          className={`w-[40%] ${
            nodeLeft ? "ml-auto mr-[7%] text-right" : "mr-auto ml-[7%] text-right"
          }`}
        >
          <span className="text-xs font-semibold tracking-[0.18em] text-yellow-400/70">
            المرحلة {phase.num}
          </span>
          <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-white">
            {phase.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-blue-100/65">
            {phase.desc}
          </p>
        </motion.div>
      </div>
    </>
  );
}

function MobileJourney({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <ol className="relative lg:hidden">
      {PHASES.map((phase, idx) => {
        const Icon = phase.icon;
        const isLast = idx === PHASES.length - 1;
        const base = idx * 0.12;
        return (
          <li
            key={phase.num}
            className="relative grid grid-cols-[4rem_1fr] gap-x-4 pb-12 last:pb-0"
          >
            {/* dotted connector to next node */}
            {!isLast && (
              <span
                aria-hidden
                className="absolute right-8 top-16 -bottom-0 w-0.5 -translate-x-1/2 [background-image:repeating-linear-gradient(to_bottom,rgba(250,204,21,0.5)_0_3px,transparent_3px_11px)]"
              />
            )}

            {/* icon marker */}
            <motion.div
              initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 18,
                delay: base,
              }}
              className="relative z-10 flex h-16 w-16 items-center justify-center justify-self-center rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#0a1e3a] shadow-[0_10px_30px_-8px_rgba(250,204,21,0.55)] ring-1 ring-inset ring-white/25"
            >
              <Icon className="h-7 w-7" strokeWidth={2.2} aria-hidden />
              <span className="absolute -bottom-1.5 -left-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a1e3a] text-[11px] font-bold text-yellow-400 ring-1 ring-yellow-400/40">
                {phase.num}
              </span>
            </motion.div>

            {/* text */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.55, ease: EASE, delay: base + 0.1 }}
              className="pt-1.5"
            >
              <span className="text-xs font-semibold tracking-[0.16em] text-yellow-400/70">
                المرحلة {phase.num}
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-white">
                {phase.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-blue-100/65">
                {phase.desc}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
