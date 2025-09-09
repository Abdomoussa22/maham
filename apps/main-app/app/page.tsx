
'use client'
import React, { useState } from "react";
import {Button1} from '../../../packages/ui/src/components/buttons/button'
import {Modal} from '../../../packages/ui/src/components/modal'
import {StatsCard} from '../../../packages/ui/src/components/cards/stats-card'
import {FormikModal} from '../../../packages/ui/src/components/modals/formik-modal'
import {TextBoxFormik} from '../../../packages/ui/src/components/inputs/TextBoxFormik'
import * as Yup from "yup";

export default function Page() {
    const [isOpen, setIsOpen] = useState(false)

      const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string().email("صيغة غير صحيحة").required("الإيميل مطلوب"),
  });

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">main-app</h1>
      <div className="flex gap-3 flex-wrap">
<Button1>dfsdf</Button1>

<div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="المستخدمون"
        value={123456}
        percentage={5}
        variant="default"
        duration={2} // الأنيميشن يأخذ ثانيتين بالضبط
      />
    </div>
    
    <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        افتح المودال
      </button>

         <Button1 variant="default" onClick={() => setIsOpen(true)}>
        افتح المودال
      </Button1>

      <FormikModal
        isOpen={isOpen}
        title="تسجيل جديد"
        initialValues={{ name: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log("🚀 Submitted:", values)}
        onClose={() => setIsOpen(false)}
      >
        <TextBoxFormik label="الاسم" name="name" type="text" placeholder="أدخل اسمك" />
        <TextBoxFormik label="الإيميل" name="email" type="email" placeholder="example@mail.com" />
      </FormikModal>
      </div>
    </main>
    
  );
}
