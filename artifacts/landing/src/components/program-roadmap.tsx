import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Compass,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

type Phase = {
  num: string;
  title: string;
  items: string[];
  icon: LucideIcon;
};

const PHASES: Phase[] = [
  {
    num: "01",
    title: "اكتشف مسارك",
    items: [
      "التسجيل في المنصة",
      "استكشاف المحتوى التفاعلي",
      "الحصول على شهادة إتمام",
    ],
    icon: Compass,
  },
  {
    num: "02",
    title: "البرنامج التأهيلي",
    items: ["ورش عمل حضورية", "لقاءات مع متخصصين", "تجارب وأنشطة تفاعلية"],
    icon: GraduationCap,
  },
  {
    num: "03",
    title: "البرنامج التدريبي",
    items: ["تجربة ميدانية واقعية", "العمل في جهات مهنية", "استكشاف بيئة العمل"],
    icon: Briefcase,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProgramRoadmap() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="roadmap"
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#0a1e3a] py-24 sm:py-32"
    >
      {/* a single, restrained ambient wash */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-yellow-400/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-2xl px-6">
        {/* header */}
        <header className="mb-16 text-center sm:mb-20">
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
            className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-blue-200/60"
          >
            خطوات متكاملة تأخذك من الاكتشاف إلى التطبيق العملي في بيئة مهنية
            حقيقية
          </motion.p>
        </header>

        {/* timeline */}
        <ol className="relative">
          {PHASES.map((phase, idx) => (
            <PhaseRow
              key={phase.num}
              phase={phase}
              index={idx}
              isLast={idx === PHASES.length - 1}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function PhaseRow({
  phase,
  index,
  isLast,
  reduceMotion,
}: {
  phase: Phase;
  index: number;
  isLast: boolean;
  reduceMotion: boolean;
}) {
  const Icon = phase.icon;
  const base = index * 0.12;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay: base + 0.08 },
    },
  };

  const nodeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 18, delay: base },
    },
  };

  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-12 last:pb-0 sm:gap-x-7">
      {/* spine column (node + connector) */}
      <div className="relative flex justify-center">
        {/* connector to next node */}
        {!isLast && (
          <>
            <span className="absolute left-1/2 top-10 -bottom-12 w-px -translate-x-1/2 bg-white/10" />
            <motion.span
              aria-hidden
              initial={reduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: base + 0.18 }}
              className="absolute left-1/2 top-10 -bottom-12 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-yellow-400 to-yellow-400/40"
            />
          </>
        )}

        {/* node */}
        <motion.span
          variants={reduceMotion ? undefined : nodeVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -25% 0px" }}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 text-sm font-bold text-[#0a1e3a] shadow-[0_6px_20px_-6px_rgba(250,204,21,0.6)] ring-1 ring-inset ring-white/20"
        >
          {phase.num}
        </motion.span>
      </div>

      {/* content card */}
      <motion.div
        variants={reduceMotion ? undefined : cardVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        className="group -mt-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] sm:p-7"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 ring-1 ring-inset ring-yellow-400/20">
            <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          <div>
            <span className="block text-xs font-semibold tracking-[0.16em] text-yellow-400/70">
              المرحلة {phase.num}
            </span>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-white">
              {phase.title}
            </h3>
          </div>
        </div>

        <div className="my-5 h-px bg-white/[0.08]" />

        <ul className="space-y-3">
          {phase.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-[15px] leading-relaxed text-blue-100/75"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}
