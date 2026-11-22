"use client";

import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@/components/icons/LandingIcons";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "Apa itu ChatYol AI?",
    answer:
      "ChatYol AI adalah asisten chatbot cerdas yang siap membantu menjawab pertanyaan, mencari informasi, dan menyelesaikan berbagai tugas harian Anda secara cepat.",
  },
  {
    question: "Apakah ChatYol AI gratis digunakan?",
    answer:
      "Ya, ChatYol AI dapat Anda gunakan secara gratis langsung melalui browser web tanpa biaya pendaftaran.",
  },
  {
    question: "Bagaimana cara menggunakannya?",
    answer:
      "Cukup buka aplikasi melalui tombol 'Coba Chatbot', ketik pesan atau pertanyaan Anda di kolom input teks, lalu klik tombol Kirim.",
  },
  {
    question: "Apakah bisa dibuka lewat HP / Smartphone?",
    answer:
      "Tentu saja. Tampilan ChatYol AI sudah dioptimalkan agar responsif dan nyaman digunakan di smartphone, tablet, maupun laptop.",
  },
];

export const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#030712] text-white py-14 sm:py-18 relative scroll-mt-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Tanya Jawab
          </span>
          <h2 className="mt-2 font-bold text-3xl sm:text-4xl text-white">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="mt-8 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left group focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded p-1"
                >
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors pr-3">
                    {item.question}
                  </span>
                  <span className="flex-none text-gray-400 group-hover:text-white">
                    {isOpen ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 text-sm text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
