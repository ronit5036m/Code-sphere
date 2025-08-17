import React, { useState } from "react";

const faqData = [
  {
    question: "Is CodeSphere free?",
    answer:
      "Yes. It’s free and open-source. We focus more on connection than money.",
  },
  {
    question: "Can I update anytime?",
    answer: "Yes, you can upload anytime—unless the API fails 😉.",
  },
  {
    question: "Who can see my profile?",
    answer:
      "Based on your preferences: if public, everyone can see it; if private, only you can.",
  },
  {
    question: "Do I need to know coding?",
    answer: "No, to upload files you don’t need to learn coding.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
        Common Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-700 bg-black/70 overflow-hidden shadow"
          >
            <button
              className="w-full text-left flex justify-between items-center px-5 py-4 focus:outline-none hover:bg-gray-900 transition"
              onClick={() => toggle(idx)}
            >
              <span className="text-lg text-white">{item.question}</span>
              <span className="text-2xl text-blue-400">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === idx
                  ? "max-h-40 py-3 px-5 bg-gray-950 text-gray-300"
                  : "max-h-0"
              }`}
            >
              {openIndex === idx && <div>{item.answer}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default FAQ;
