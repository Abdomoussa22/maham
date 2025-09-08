
'use client'
import React, { useState } from "react";
import {Button1} from '../../../packages/ui/src/components/buttons/button'
import {Modal} from '../../../packages/ui/src/components/modal'
import {StatsCard} from '../../../packages/ui/src/components/cards/stats-card'

export default function Page() {
    const [isOpen, setIsOpen] = useState(false)

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

        <Modal
        isOpen={isOpen}
        title="تنبيه"
        onClose={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onConfirm={() => {
          alert("تم الضغط على موافق!");
          setIsOpen(false);
        }}
      >
        <p>هذا هو محتوى المودال، يمكنك وضع أي عناصر هنا.</p>
      </Modal>
        </div>
    
    </main>
  );
}
