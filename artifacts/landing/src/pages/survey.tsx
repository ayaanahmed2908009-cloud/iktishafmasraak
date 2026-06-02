import { SurveyForm } from "@/components/survey-form";

export default function SurveyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#18110B] p-4 md:p-8" dir="rtl" style={{ fontFamily: "Tajawal, sans-serif" }}>
      <div className="w-full max-w-xl bg-[#261B12] rounded-2xl shadow-2xl border border-[#3A2A1A] overflow-hidden mt-8 mb-12">
        
        {/* Header Strip */}
        <div className="h-3 w-full bg-yellow-400" />
        
        <div className="p-6 md:p-10">
          <h1 className="text-3xl font-bold text-white mb-2">نموذج التسجيل</h1>
          <p className="text-white mb-8">يرجى تعبئة البيانات التالية للتسجيل.</p>

          <SurveyForm
            theme="light"
            onSuccessAction={() => {
              window.location.href = "https://hub.misk.org.sa/ar/programs/skills/discover-your-path/";
            }}
          />
        </div>
      </div>
    </div>
  );
}