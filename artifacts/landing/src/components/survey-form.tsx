import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Check } from "lucide-react";

const GRADE_OPTIONS = [
  "ثالث متوسط",
  "أول ثانوي",
  "ثاني ثانوي",
  "ثالث ثانوي",
];

const surveySchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب (على الأقل حرفين)" }),
  phone: z.string().min(5, { message: "رقم الجوال مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  grade: z.string().min(1, { message: "الصف مطلوب" }),
  city: z.string().min(1, { message: "المدينة مطلوبة" }),
  school: z.string().min(1, { message: "المدرسة مطلوبة" }),
});

type SurveyFormValues = z.infer<typeof surveySchema>;

interface SurveyFormProps {
  onSuccessAction?: () => void;
  successMessage?: string;
  successButtonLabel?: string;
  theme?: "dark" | "light"; // dark navy for home, light/card for survey page
}

export function SurveyForm({ 
  onSuccessAction, 
  successMessage = "لقد تم استلام بياناتك بنجاح.",
  successButtonLabel = "العودة",
  theme = "light" 
}: SurveyFormProps) {
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
          onSuccessAction?.();
        },
        onError: (err: any) => {
          toast.error("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
          console.error(err);
        },
      }
    );
  }

  const isDark = theme === "dark";

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full text-center space-y-6 p-8 rounded-2xl shadow-xl border border-white/10"
        style={{
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "#261B12",
          borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#3A2A1A",
        }}
      >
        <div className="w-20 h-20 bg-yellow-400/10 text-yellow-400 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white">شكراً لتسجيلك!</h2>
        <p className="text-white text-lg">{successMessage}</p>
        {onSuccessAction && (
          <Button
            onClick={onSuccessAction}
            className="h-12 bg-yellow-400 hover:bg-yellow-300 text-black px-8 text-lg font-semibold w-full mt-4 rounded-xl"
          >
            {successButtonLabel}
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white text-base">الاسم</FormLabel>
              <FormControl>
                <Input 
                  placeholder="أدخل اسمك الكامل" 
                  {...field} 
                  className="bg-black/20 border-white/10 text-white h-12 placeholder:text-white/30 focus-visible:ring-yellow-400" 
                />
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
              <FormLabel className="text-white text-base">رقم الجوال</FormLabel>
              <FormControl>
                <Input 
                  placeholder="05XXXXXXXX" 
                  dir="ltr" 
                  className="text-right bg-black/20 border-white/10 text-white h-12 placeholder:text-white/30 focus-visible:ring-yellow-400" 
                  {...field} 
                />
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
              <FormLabel className="text-white text-base">البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input 
                  placeholder="example@email.com" 
                  dir="ltr" 
                  className="text-right bg-black/20 border-white/10 text-white h-12 placeholder:text-white/30 focus-visible:ring-yellow-400" 
                  {...field} 
                />
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
              <FormLabel className="text-white text-base">الصف</FormLabel>
              <Select
                dir="rtl"
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white h-12 data-[placeholder]:text-white/30 focus:ring-yellow-400">
                    <SelectValue placeholder="اختر صفك الدراسي" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent dir="rtl" className="bg-[#0a1e3a] border-white/10 text-white">
                  {GRADE_OPTIONS.map((grade) => (
                    <SelectItem
                      key={grade}
                      value={grade}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white text-base">المدينة</FormLabel>
              <FormControl>
                <Input 
                  placeholder="أدخل مدينتك" 
                  {...field} 
                  className="bg-black/20 border-white/10 text-white h-12 placeholder:text-white/30 focus-visible:ring-yellow-400" 
                />
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
              <FormLabel className="text-white text-base">المدرسة</FormLabel>
              <FormControl>
                <Input 
                  placeholder="أدخل اسم مدرستك" 
                  {...field} 
                  className="bg-black/20 border-white/10 text-white h-12 placeholder:text-white/30 focus-visible:ring-yellow-400" 
                />
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
  );
}