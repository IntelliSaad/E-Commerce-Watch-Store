// src/pages/OrderConfirmation.tsx
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Smartphone, Banknote, ArrowRight, MessageCircle } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { method } = useParams<{ method: string }>();
  const location = useLocation();
  const state = location.state as { total: number, orderNumber: number, customerPhone?: string, customerName?: string } | null;
  const { total, orderNumber, customerPhone, customerName } = state || { total: 0, orderNumber: 'N/A', customerPhone: '', customerName: '' };

  const paymentMethod = method?.toUpperCase();

  const paymentDetails = {
    EASYPAYSA: [
      { name: "Easypaisa Account", value: "Aisha Bibi" },
      { name: "Easypaisa Number", value: "0345-XXX-XXXX" },
      { name: "JazzCash Account", value: "Muhammad Ali" },
      { name: "JazzCash Number", value: "0300-XXX-XXXX" },
      { name: "Bank Name", value: "Bank AlFalah" },
      { name: "Account No", value: "0025-XXXX-XXXXXX" },
    ],
  };

  // WhatsApp message for payment screenshot
  const whatsappPaymentMessage = `Assalam-o-Alaikum! I have placed Order #${orderNumber}. Here is my payment screenshot.`;
  const verifyLink = `https://wa.me/923155308406?text=${encodeURIComponent(whatsappPaymentMessage)}`;

  // WhatsApp message for COD order confirmation
  const whatsappCODMessage = `Assalam-o-Alaikum! I just placed Order #${orderNumber} (Cash on Delivery).\n\nName: ${customerName}\nPhone: ${customerPhone}\nTotal: Rs. ${total.toLocaleString()}\n\nPlease confirm my order. JazakAllah!`;
  const codConfirmLink = `https://wa.me/923155308406?text=${encodeURIComponent(whatsappCODMessage)}`;

  const InstructionCard: React.FC<{ children: React.ReactNode, title: string, icon: React.ReactElement }> = ({ children, title, icon }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      {children}
    </div>
  );

  return (
    <div className="py-12 max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex p-4 bg-green-900/30 rounded-full mb-4">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Order #{orderNumber} Placed!</h1>
        <p className="text-lg text-gray-400 mt-2">Thank you for shopping with WristHub.</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg mb-8 flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">Total Amount</p>
          <p className="text-2xl font-bold text-green-400">Rs. {total.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Method</p>
          <p className="text-white font-bold">{paymentMethod === 'COD' ? 'Cash On Delivery' : 'Bank Transfer'}</p>
        </div>
      </div>

      {paymentMethod === 'COD' && (
        <InstructionCard title="What Happens Next?" icon={<Banknote size={24} className="text-yellow-500" />}>
          <p className="text-gray-300">Your order has been received. Our team will call you shortly to confirm your address.</p>
          <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2 text-sm bg-gray-900/50 p-4 rounded-lg">
            <li>Please keep your phone switched on.</li>
            <li>Prepare the exact cash amount: <span className="text-white font-bold">Rs. {total.toLocaleString()}</span></li>
            <li>Delivery time: 3-5 working days.</li>
          </ul>

          {/* WhatsApp Confirmation Button for COD */}
          <a
            href={codConfirmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg font-bold text-lg transition-transform transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
          >
            <MessageCircle size={24} className="mr-2" />
            <span>Confirm Order via WhatsApp</span>
          </a>
          <p className="text-xs text-gray-500 text-center mt-2">Get faster confirmation by contacting us directly!</p>
        </InstructionCard>
      )}

      {paymentMethod === 'EASYPAYSA' && (
        <InstructionCard title="Complete Your Payment" icon={<Smartphone size={24} className="text-blue-500" />}>
          <p className="text-yellow-500 font-semibold mb-4 border-l-4 border-yellow-500 pl-3">
            Your order is <strong>Pending</strong>. Please transfer <strong>Rs. {total.toLocaleString()}</strong> to proceed.
          </p>

          <div className="space-y-2 mb-6">
            {paymentDetails.EASYPAYSA.map((detail, index) => (
              <div key={index} className="flex justify-between bg-gray-700 p-3 rounded-md text-sm border border-gray-600">
                <span className="text-gray-300">{detail.name}</span>
                <span className="font-mono text-white font-bold select-all">{detail.value}</span>
              </div>
            ))}
          </div>

          <a
            href={verifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg font-bold text-lg transition-transform transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
          >
            <span className="mr-2">Share Screenshot on WhatsApp</span>
            <ArrowRight size={20} />
          </a>
          <p className="text-xs text-gray-500 text-center mt-2">We will confirm your order immediately after verification.</p>
        </InstructionCard>
      )}

      {/* General WhatsApp Contact Button */}
      <div className="mt-8">
        <a
          href={`https://wa.me/923155308406?text=${encodeURIComponent(`Assalam-o-Alaikum! I have a question about my Order #${orderNumber}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg font-bold text-lg transition-transform transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
        >
          <MessageCircle size={24} />
          <span>Need Help? Contact Us on WhatsApp</span>
        </a>
      </div>

      <div className="text-center mt-6">
        <Link to="/" className="text-gray-400 hover:text-white underline transition">
          Return to Store
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;