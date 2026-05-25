import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { motion } from "framer-motion";

import { useSubmitSurvey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import coverImage from "@/assets/cover.png"; // Use as subtle background if needed, but going with a solid clean theme

const surveySchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب (على الأقل حرفين)" }),
  phone: z.string().min(5, { message: "رقم الجوال مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  grade: z.string().min(1, { message: "الصف مطلوب" }),
  city: z.string().min(1, { message: "المدينة مطلوبة" }),
  school: z.string().min(1, { message: "المدرسة مطلوبة" }),
});

type SurveyFormValues = z.infer<typeof surveySchema>;

export default function SurveyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitSurvey = useSubmitSurvey();

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      grade: "",
      city: "",
      school: "",
    },
  });

  function onSubmit(data: SurveyFormValues) {
    submitSurvey.mutate(
      { data },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },
        onError: (err: any) => {
          toast.error("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
          console.error(err);
        },
      }
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#18110B] text-[#FEF7EB] p-4" dir="rtl" style={{ fontFamily: "Tajawal, sans-serif" }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6 bg-[#261B12] p-8 rounded-2xl shadow-xl border border-[#3A2A1A]"
        >
          <div className="w-20 h-20 bg-yellow-400/10 text-yellow-400 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">شكراً لتسجيلك!</h1>
          <p className="text-[#A89886] text-lg">لقد تم استلام بياناتك بنجاح.</p>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-yellow-400 px-8 text-lg font-semibold text-black transition-colors hover:bg-yellow-300 w-full mt-4"
          >
            العودة للصفحة الرئيسية
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center bg-[#18110B] p-4 md:p-8" dir="rtl" style={{ fontFamily: "Tajawal, sans-serif" }}>
      <div className="w-full max-w-xl bg-[#261B12] rounded-2xl shadow-2xl border border-[#3A2A1A] mt-8 mb-12 overflow-hidden">
        
        {/* Header / Header Strip */}
        <div className="h-3 w-full bg-yellow-400" />
        
        <div className="p-6 md:p-10">
          <h1 className="text-3xl font-bold text-[#FEF7EB] mb-2">نموذج التسجيل</h1>
          <p className="text-[#A89886] mb-8">يرجى تعبئة البيانات التالية للتسجيل.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#E6D5C3] text-base">الاسم</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسمك الكامل" {...field} className="bg-[#18110B] border-[#3A2A1A] text-[#FEF7EB] h-12 placeholder:text-[#A89886]/50 focus-visible:ring-yellow-400" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#E6D5C3] text-base">رقم الجوال</FormLabel>
                    <FormControl>
                      <Input placeholder="05XXXXXXXX" dir="ltr" className="text-right bg-[#18110B] border-[#3A2A1A] text-[#FEF7EB] h-12 placeholder:text-[#A89886]/50 focus-visible:ring-yellow-400" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#E6D5C3] text-base">البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" dir="ltr" className="text-right bg-[#18110B] border-[#3A2A1A] text-[#FEF7EB] h-12 placeholder:text-[#A89886]/50 focus-visible:ring-yellow-400" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#E6D5C3] text-base">الصف</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل صفك الدراسي" {...field} className="bg-[#18110B] border-[#3A2A1A] text-[#FEF7EB] h-12 placeholder:text-[#A89886]/50 focus-visible:ring-yellow-400" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#E6D5C3] text-base">المدينة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل مدينتك" {...field} className="bg-[#18110B] border-[#3A2A1A] text-[#FEF7EB] h-12 placeholder:text-[#A89886]/50 focus-visible:ring-yellow-400" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#E6D5C3] text-base">المدرسة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم مدرستك" {...field} className="bg-[#18110B] border-[#3A2A1A] text-[#FEF7EB] h-12 placeholder:text-[#A89886]/50 focus-visible:ring-yellow-400" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-14 bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-bold rounded-xl mt-4"
                disabled={submitSurvey.isPending}
              >
                {submitSurvey.isPending ? "جاري الإرسال..." : "إرسال التسجيل"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}