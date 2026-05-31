import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  Compass,
  GraduationCap,
  Briefcase,
  Check,
  type LucideIcon,
} from "lucide-react";

type Phase = {
  num: string;
  title: string;
  items: string[];
  icon: LucideIcon;
  /** node position on the serpentine path, in viewBox % (desktop) */
  x: number;
  y: number;
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
    x: 70,
    y: 16,
  },
  {
    num: "02",
    title: "البرنامج التأهيلي",
    items: ["ورش عمل حضورية", "لقاءات مع متخصصين", "تجارب وأنشطة تفاعلية"],
    icon: GraduationCap,
    x: 30,
    y: 50,
  },
  {
    num: "03",
    title: "البرنامج التدريبي",
    items: ["تجربة ميدانية واقعية", "العمل في جهات مهنية", "استكشاف بيئة العمل"],
    icon: Briefcase,
    x: 70,
    y: 84,
  },
];

const PATH_D =
  "M 70 3 L 70 16 C 70 33 30 33 30 50 C 30 67 70 67 70 84 L 70 97";

export function ProgramRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });
  const drawn: MotionValue<number> | number = reduceMotion ? 1 : progress;

  return (
    <section
      id="roadmap"
      dir="rtl"
      className="relative w-full max-w-6xl mx-auto my-12 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0d2547]/80 to-[#0a1e3a]/40 px-6 py-20 md:px-12 md:py-28"
    >
      {/* ambient depth */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* header */}
      <div className="relative mb-16 text-center md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-1.5 text-sm font-semibold text-yellow-300"
        >
          رحلتك خطوة بخطوة
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl font-bold text-white md:text-5xl"
        >
          رحلة البرنامج
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-lg text-blue-200/70"
        >
          ثلاث مراحل متكاملة تأخذك من الاكتشاف إلى التطبيق العملي في بيئة مهنية
          حقيقية
        </motion.p>
      </div>

      <div ref={ref} className="relative">
        {/* ===== Desktop: curved serpentine roadmap ===== */}
        <div className="relative hidden min-h-[48rem] md:block">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="roadmap-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="55%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            {/* base track */}
            <path
              d={PATH_D}
              stroke="rgba(255,255,255,0.09)"
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* scroll-linked progress */}
            <motion.path
              d={PATH_D}
              stroke="url(#roadmap-fill)"
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: drawn }}
              className="[filter:drop-shadow(0_0_6px_rgba(250,204,21,0.45))]"
            />
          </svg>

          {PHASES.map((phase, idx) => (
            <DesktopPhase key={phase.num} phase={phase} index={idx} />
          ))}
        </div>

        {/* ===== Mobile: vertical rail roadmap ===== */}
        <MobileRoadmap drawn={drawn} />
      </div>
    </section>
  );
}

function DesktopPhase({ phase, index }: { phase: Phase; index: number }) {
  const Icon = phase.icon;
  const reduceMotion = useReducedMotion();
  const nodeOnRight = phase.x > 50;
  const cardSide = nodeOnRight ? "mr-auto" : "ml-auto";
  // a short stem connecting the node to its card
  const stemStyle = nodeOnRight
    ? { left: "46%", width: "24%" }
    : { left: "30%", width: "24%" };

  return (
    <>
      {/* connector stem (node -> card) */}
      <div
        aria-hidden
        className="absolute hidden h-px -translate-y-1/2 lg:block"
        style={{ top: `${phase.y}%`, ...stemStyle }}
      >
        <div
          className={`h-full w-full ${
            nodeOnRight
              ? "bg-gradient-to-l from-yellow-400/50 to-transparent"
              : "bg-gradient-to-r from-yellow-400/50 to-transparent"
          }`}
        />
      </div>

      {/* node sitting exactly on the path */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${phase.x}%`, top: `${phase.y}%` }}
      >
        {!reduceMotion && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-yellow-400/25" />
        )}
        <span className="absolute -inset-2 -z-10 rounded-full bg-yellow-400/10 blur-md" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#0a1e3a] bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#0a1e3a] shadow-[0_8px_30px_-6px_rgba(250,204,21,0.7)]">
          <Icon className="h-7 w-7" strokeWidth={2.2} />
        </span>
        <span className="absolute -bottom-1.5 -left-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#0a1e3a] text-xs font-black text-yellow-400 ring-2 ring-yellow-400/40">
          {phase.num}
        </span>
      </motion.div>

      {/* card on the opposite side, vertically centered on the node */}
      <div
        className="absolute w-full -translate-y-1/2"
        style={{ top: `${phase.y}%` }}
      >
        <motion.div
          initial={{ opacity: 0, x: nodeOnRight ? -48 : 48, y: 8 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className={`group relative w-[44%] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors duration-300 hover:border-yellow-400/30 ${cardSide}`}
        >
          <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-yellow-400/0 blur-2xl transition-colors duration-500 group-hover:bg-yellow-400/10" />

          <div className="relative z-10 mb-5 flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/20 transition-transform duration-300 group-hover:scale-105">
              <Icon className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <div>
              <span className="block text-xs font-bold tracking-[0.18em] text-yellow-400/80">
                المرحلة {phase.num}
              </span>
              <h3 className="mt-0.5 text-xl font-bold text-white">
                {phase.title}
              </h3>
            </div>
          </div>

          <div className="relative z-10 mb-4 h-px bg-white/10" />

          <ul className="relative z-10 space-y-3">
            {phase.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.1 }}
                className="flex items-center gap-3 text-[15px] text-blue-100/80"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400/15">
                  <Check className="h-3 w-3 text-yellow-400" strokeWidth={3} />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  );
}

function MobileRoadmap({ drawn }: { drawn: MotionValue<number> | number }) {
  return (
    <div className="relative md:hidden">
      {/* rail */}
      <div className="pointer-events-none absolute bottom-6 right-6 top-6 w-0.5 -translate-x-1/2 rounded-full bg-white/10" />
      <motion.div
        aria-hidden
        style={{ scaleY: drawn }}
        className="pointer-events-none absolute bottom-6 right-6 top-6 w-0.5 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 [filter:drop-shadow(0_0_5px_rgba(250,204,21,0.5))]"
      />

      <div className="flex flex-col gap-8">
        {PHASES.map((phase) => {
          const Icon = phase.icon;
          return (
            <div key={phase.num} className="relative pr-16">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="absolute right-6 top-1 z-10 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full border-4 border-[#0a1e3a] bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#0a1e3a] shadow-[0_8px_24px_-6px_rgba(250,204,21,0.7)]"
              >
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/20">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold tracking-[0.18em] text-yellow-400/80">
                      المرحلة {phase.num}
                    </span>
                    <h3 className="mt-0.5 text-lg font-bold text-white">
                      {phase.title}
                    </h3>
                  </div>
                </div>
                <div className="mb-3 h-px bg-white/10" />
                <ul className="space-y-2.5">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-blue-100/80"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400/15">
                        <Check
                          className="h-3 w-3 text-yellow-400"
                          strokeWidth={3}
                        />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
