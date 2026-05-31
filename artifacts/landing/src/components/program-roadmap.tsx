import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
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
    title: "المرحلة الأولى — اكتشف مسارك",
    items: [
      "التسجيل في المنصة",
      "استكشاف المحتوى التفاعلي",
      "الحصول على شهادة إتمام",
    ],
    icon: Compass,
    x: 72,
    y: 18,
  },
  {
    num: "02",
    title: "المرحلة الثانية — البرنامج التأهيلي",
    items: ["ورش عمل حضورية", "لقاءات مع متخصصين", "تجارب وأنشطة تفاعلية"],
    icon: GraduationCap,
    x: 28,
    y: 50,
  },
  {
    num: "03",
    title: "المرحلة الثالثة — البرنامج التدريبي",
    items: ["تجربة ميدانية واقعية", "العمل في جهات مهنية", "استكشاف بيئة العمل"],
    icon: Briefcase,
    x: 72,
    y: 82,
  },
];

const PATH_D =
  "M 72 6 L 72 18 C 72 34 28 34 28 50 C 28 66 72 66 72 82 L 72 94";

export function ProgramRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="roadmap"
      dir="rtl"
      className="w-full py-20 md:py-28 max-w-6xl mx-auto px-6 bg-[#0d2547]/50 rounded-3xl mb-12 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
          رحلة البرنامج
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-lg text-blue-200/80 mb-16 md:mb-12"
      >
        ثلاث مراحل متكاملة تأخذك من الاكتشاف إلى التطبيق
      </motion.p>

      {/* ===== Desktop: curved serpentine roadmap ===== */}
      <div ref={ref} className="relative hidden md:block min-h-[44rem]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="roadmap-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          {/* base track */}
          <path
            d={PATH_D}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="0.1 4"
          />
          {/* scroll-linked progress */}
          <motion.path
            d={PATH_D}
            stroke="url(#roadmap-fill)"
            strokeWidth={3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduceMotion ? 1 : pathLength }}
          />
        </svg>

        {/* nodes + cards */}
        {PHASES.map((phase, idx) => (
          <DesktopPhase key={phase.num} phase={phase} index={idx} />
        ))}
      </div>

      {/* ===== Mobile: vertical curved rail ===== */}
      <MobileRoadmap />
    </section>
  );
}

function DesktopPhase({ phase, index }: { phase: Phase; index: number }) {
  const Icon = phase.icon;
  const nodeOnRight = phase.x > 50;
  // place the card on the opposite side of the node
  const cardSide = nodeOnRight ? "mr-auto" : "ml-auto";

  return (
    <>
      {/* Node sitting exactly on the path */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${phase.x}%`, top: `${phase.y}%` }}
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-yellow-400/30" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#0d2547] bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#0a1e3a] shadow-[0_0_40px_-6px_rgba(250,204,21,0.8)]">
          <Icon className="h-7 w-7" />
        </span>
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a1e3a] text-[11px] font-black text-yellow-400 ring-2 ring-yellow-400/40">
          {phase.num}
        </span>
      </motion.div>

      {/* Card on the opposite side, vertically centered on the node row */}
      <div
        className="absolute w-full -translate-y-1/2 px-2"
        style={{ top: `${phase.y}%` }}
      >
        <motion.div
          initial={{ opacity: 0, x: nodeOnRight ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          whileHover={{ y: -6 }}
          className={`group relative w-[42%] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors hover:border-yellow-400/40 hover:bg-white/[0.07] ${cardSide}`}
        >
          <span className="pointer-events-none absolute -top-3 left-5 text-7xl font-black leading-none text-white/[0.06] select-none">
            {phase.num}
          </span>
          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-yellow-400/0 blur-2xl transition-colors duration-500 group-hover:bg-yellow-400/10" />
          <h3 className="relative z-10 mb-5 text-2xl font-bold text-white">
            {phase.title}
          </h3>
          <ul className="relative z-10 space-y-3.5">
            {phase.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.1 }}
                className="flex items-start text-blue-100/80"
              >
                <span className="ml-3 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400/15">
                  <Check className="h-3 w-3 text-yellow-400" />
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

function MobileRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative md:hidden">
      {/* rail */}
      <div className="pointer-events-none absolute bottom-4 right-6 top-4 w-1 -translate-x-1/2 rounded-full bg-white/10" />
      <motion.div
        aria-hidden
        style={{ scaleY: reduceMotion ? 1 : fill }}
        className="pointer-events-none absolute bottom-4 right-6 top-4 w-1 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500"
      />

      <div className="flex flex-col gap-10">
        {PHASES.map((phase) => {
          const Icon = phase.icon;
          return (
            <div key={phase.num} className="relative pr-16">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="absolute right-6 top-1 z-10 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full border-4 border-[#0d2547] bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#0a1e3a] shadow-[0_0_30px_-6px_rgba(250,204,21,0.8)]"
              >
                <Icon className="h-6 w-6" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <span className="pointer-events-none absolute -top-2 left-4 text-6xl font-black leading-none text-white/[0.06] select-none">
                  {phase.num}
                </span>
                <h3 className="relative z-10 mb-4 text-xl font-bold text-white">
                  {phase.title}
                </h3>
                <ul className="relative z-10 space-y-3">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-blue-100/80"
                    >
                      <span className="ml-3 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400/15">
                        <Check className="h-3 w-3 text-yellow-400" />
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
