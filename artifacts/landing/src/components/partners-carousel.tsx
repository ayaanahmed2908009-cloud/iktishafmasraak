import partner1 from "@/assets/partners/partner-1.jpg";
import partner2 from "@/assets/partners/partner-2.jpg";
import partner3 from "@/assets/partners/partner-3.jpg";
import partner4 from "@/assets/partners/partner-4.jpg";
import partner5 from "@/assets/partners/partner-5.jpg";
import partner6 from "@/assets/partners/partner-6.png";
import partner7 from "@/assets/partners/partner-7.png";

const partners = [
  { src: partner1, alt: "مؤسسة الملك فيصل الخيرية" },
  { src: partner2, alt: "معارف" },
  { src: partner3, alt: "جامعة الأمير سلطان" },
  { src: partner4, alt: "مرسول" },
  { src: partner5, alt: "رعاية الطبية" },
  { src: partner6, alt: "نجم" },
  { src: partner7, alt: "صندوق الاستثمارات العامة" },
];

export function PartnersCarousel() {
  return (
    <section
      dir="rtl"
      aria-label="شركاؤنا"
      className="w-full bg-[#E8DCC8] py-14 sm:py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1f3a5f]">
          شركاؤنا
        </h2>
        <p className="mt-2 text-base sm:text-lg text-[#7a6f5a]">
          نفخر بالتعاون مع نخبة من الجهات الرائدة الداعمة لرسالتنا
        </p>
      </div>

      <div className="relative" dir="ltr">
        <div className="flex w-max animate-partners-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[0, 1].map((groupIdx) => (
            <div
              key={groupIdx}
              className="flex shrink-0 items-center gap-10 sm:gap-12 pr-10 sm:pr-12"
              aria-hidden={groupIdx === 1}
            >
              {partners.map((partner, i) => (
                <div
                  key={`${groupIdx}-${i}`}
                  className="group flex h-24 w-44 sm:h-32 sm:w-60 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white px-5 py-4 shadow-sm"
                >
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#E8DCC8] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#E8DCC8] to-transparent z-10" />
      </div>
    </section>
  );
}
