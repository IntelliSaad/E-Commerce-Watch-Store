import { jsxs, jsx } from "react/jsx-runtime";
import { useParams, useLocation, Link } from "react-router-dom";
import { CheckCircle, MessageCircle, Banknote, ArrowRight, Smartphone } from "lucide-react";
const OrderConfirmation = () => {
  const { method } = useParams();
  const location = useLocation();
  const state = location.state;
  const { total, orderNumber, customerPhone, customerName } = state || { total: 0, orderNumber: "N/A", customerPhone: "", customerName: "" };
  const paymentMethod = method == null ? void 0 : method.toUpperCase();
  const paymentDetails = {
    EASYPAYSA: [
      { name: "Easypaisa Account", value: "Aisha Bibi" },
      { name: "Easypaisa Number", value: "0345-XXX-XXXX" },
      { name: "JazzCash Account", value: "Muhammad Ali" },
      { name: "JazzCash Number", value: "0300-XXX-XXXX" },
      { name: "Bank Name", value: "Bank AlFalah" },
      { name: "Account No", value: "0025-XXXX-XXXXXX" }
    ]
  };
  const whatsappPaymentMessage = `Assalam-o-Alaikum! I have placed Order #${orderNumber}. Here is my payment screenshot.`;
  const verifyLink = `https://wa.me/923155308406?text=${encodeURIComponent(whatsappPaymentMessage)}`;
  const whatsappCODMessage = `Assalam-o-Alaikum! I just placed Order #${orderNumber} (Cash on Delivery).

Name: ${customerName}
Phone: ${customerPhone}
Total: Rs. ${total.toLocaleString()}

Please confirm my order. JazakAllah!`;
  const codConfirmLink = `https://wa.me/923155308406?text=${encodeURIComponent(whatsappCODMessage)}`;
  const InstructionCard = ({ children, title, icon }) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center", children: [
      icon,
      /* @__PURE__ */ jsx("span", { className: "ml-2", children: title })
    ] }),
    children
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "py-12 max-w-3xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex p-4 bg-green-900/30 rounded-full mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { size: 64, className: "text-green-500" }) }),
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl md:text-4xl font-extrabold text-white", children: [
        "Order #",
        orderNumber,
        " Placed!"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 mt-2", children: "Thank you for shopping with WristHub." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg mb-8 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Total Amount" }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-green-400", children: [
          "Rs. ",
          total.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Method" }),
        /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: paymentMethod === "COD" ? "Cash On Delivery" : "Bank Transfer" })
      ] })
    ] }),
    paymentMethod === "COD" && /* @__PURE__ */ jsxs(InstructionCard, { title: "What Happens Next?", icon: /* @__PURE__ */ jsx(Banknote, { size: 24, className: "text-yellow-500" }), children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Your order has been received. Our team will call you shortly to confirm your address." }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-gray-400 mt-4 space-y-2 text-sm bg-gray-900/50 p-4 rounded-lg", children: [
        /* @__PURE__ */ jsx("li", { children: "Please keep your phone switched on." }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Prepare the exact cash amount: ",
          /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
            "Rs. ",
            total.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsx("li", { children: "Delivery time: 3-5 working days." })
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: codConfirmLink,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "mt-6 w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg font-bold text-lg transition-transform transform hover:scale-[1.02] shadow-lg flex items-center justify-center",
          children: [
            /* @__PURE__ */ jsx(MessageCircle, { size: 24, className: "mr-2" }),
            /* @__PURE__ */ jsx("span", { children: "Confirm Order via WhatsApp" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mt-2", children: "Get faster confirmation by contacting us directly!" })
    ] }),
    paymentMethod === "EASYPAYSA" && /* @__PURE__ */ jsxs(InstructionCard, { title: "Complete Your Payment", icon: /* @__PURE__ */ jsx(Smartphone, { size: 24, className: "text-blue-500" }), children: [
      /* @__PURE__ */ jsxs("p", { className: "text-yellow-500 font-semibold mb-4 border-l-4 border-yellow-500 pl-3", children: [
        "Your order is ",
        /* @__PURE__ */ jsx("strong", { children: "Pending" }),
        ". Please transfer ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "Rs. ",
          total.toLocaleString()
        ] }),
        " to proceed."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-6", children: paymentDetails.EASYPAYSA.map((detail, index) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between bg-gray-700 p-3 rounded-md text-sm border border-gray-600", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: detail.name }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-white font-bold select-all", children: detail.value })
      ] }, index)) }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: verifyLink,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg font-bold text-lg transition-transform transform hover:scale-[1.02] shadow-lg flex items-center justify-center",
          children: [
            /* @__PURE__ */ jsx("span", { className: "mr-2", children: "Share Screenshot on WhatsApp" }),
            /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mt-2", children: "We will confirm your order immediately after verification." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: `https://wa.me/923155308406?text=${encodeURIComponent(`Assalam-o-Alaikum! I have a question about my Order #${orderNumber}.`)}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg font-bold text-lg transition-transform transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2",
        children: [
          /* @__PURE__ */ jsx(MessageCircle, { size: 24 }),
          /* @__PURE__ */ jsx("span", { children: "Need Help? Contact Us on WhatsApp" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-gray-400 hover:text-white underline transition", children: "Return to Store" }) })
  ] });
};
export {
  OrderConfirmation as default
};
