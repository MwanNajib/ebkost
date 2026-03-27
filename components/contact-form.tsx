"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/lib/actions/contact.action";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form upon success
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();

      // Auto-hide success message after 5 seconds
      const timer = setTimeout(() => {
        // We can't clear state directly with useActionState easily
        // without a separate state, but CSS fading can be done if needed.
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="bg-white p-8 sm:p-12 rounded-lg shadow-sm border border-gray-100 mt-8 lg:mt-0"
    >
      {state?.success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          {state.success}
        </div>
      )}

      {state?.error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap*"
            required
            className="w-full bg-gray-50 border border-gray-100 rounded-md px-4 py-3 outline-none focus:border-orange-400 focus:bg-white transition-all text-sm placeholder:text-gray-400"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Anda*"
            required
            className="w-full bg-gray-50 border border-gray-100 rounded-md px-4 py-3 outline-none focus:border-orange-400 focus:bg-white transition-all text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          name="subject"
          placeholder="Subjek / Perihal*"
          required
          className="w-full bg-gray-50 border border-gray-100 rounded-md px-4 py-3 outline-none focus:border-orange-400 focus:bg-white transition-all text-sm placeholder:text-gray-400"
        />
      </div>

      <div className="mb-6">
        <textarea
          name="message"
          placeholder="Tuliskan pesan atau pertanyaan Anda di sini...*"
          required
          rows={5}
          className="w-full bg-gray-50 border border-gray-100 rounded-md px-4 py-3 outline-none focus:border-orange-400 focus:bg-white transition-all text-sm resize-none placeholder:text-gray-400"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#f08519] hover:bg-[#d67212] text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-100 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? "Sedang Mengirim..." : "Kirim Pesan Sekarang"}
      </button>
    </form>
  );
}
