export type SearchEntry = {
  label: string;          // النص الظاهر في القائمة
  url: string;            // مثال: "/project/tasks" أو "/project#team"
  keywords?: string[];    // كلمات مفتاحية إضافية (اختياري)
  section?: string;       // مجموعة/تصنيف (اختياري)
};
