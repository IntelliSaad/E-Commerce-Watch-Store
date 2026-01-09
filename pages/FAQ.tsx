// src/pages/FAQ.tsx
import React from 'react';

// 1. Define Interface to fix TS Error
interface FAQItemProps {
  question: string;
  answer: string;
}

// 2. Use Interface in Component
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <details className="group p-4 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer transition-all duration-200 open:bg-gray-800/80 open:ring-1 open:ring-yellow-500/50">
    <summary className="font-bold text-white text-lg list-none flex justify-between items-center">
        {question}
        <span className="ml-2 text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
    </summary>
    <p className="mt-3 text-gray-300 leading-relaxed pl-2 border-l-2 border-yellow-500">
      {answer}
    </p>
  </details>
);

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Are all your watches authentic?",
      answer: "Yes, absolutely. We ensure every watch is 100% authentic, brand new, and comes with the original packaging. We perform strict quality checks before dispatching."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept several payment methods including Cash on Delivery (COD), Easypaisa, JazzCash, and Direct Bank Transfer."
    },
    {
      question: "Do you ship all over Pakistan?",
      answer: "Yes, we offer shipping to all major cities across Pakistan. Delivery typically takes 3-5 working days depending on your location."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day checking warranty. If the product is defective upon arrival, we will replace it. Please ensure the watch is unworn and tags are intact."
    },
    {
      question: "How can I track my order?",
      answer: "Once you place an order, you can log in to your account and visit the 'My Orders' page to see the live status of your shipment."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
            // key is passed here, which resolves the error
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;