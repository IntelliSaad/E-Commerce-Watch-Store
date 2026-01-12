import { jsxs, jsx } from "react/jsx-runtime";
import { Shield, Truck, Handshake, Clock } from "lucide-react";
const About = () => {
  return (
    // FIX: Changed pt-8 to pt-2 to pull content up
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto pt-2 pb-12 px-4", children: [
      /* @__PURE__ */ jsxs("header", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight", children: [
          "The ",
          /* @__PURE__ */ jsx("span", { className: "text-yellow-500", children: "WristHub" }),
          " Legacy"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed", children: "Founded on the principle of precision, WristHub is dedicated to curating Pakistan’s finest collection of luxury timepieces." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full h-64 bg-gray-700 rounded-xl overflow-hidden relative group shadow-lg", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              alt: "Luxury Watch",
              className: "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white", children: "More Than Just Time" }),
          /* @__PURE__ */ jsx("div", { className: "w-16 h-1 bg-yellow-500 rounded" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-base", children: "We believe that every watch tells a unique story. Our commitment is to offer a transparent and secure shopping experience for enthusiasts across Pakistan. We specialize in high-quality, meticulously selected automatic and quartz movements, ensuring every piece you purchase is a legacy in the making." }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-base", children: "Our team of horology enthusiasts meticulously verifies every timepiece, guaranteeing you receive a product of unmatched quality and lasting value." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-2", children: "Why Choose Us?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "We don't just sell watches; we deliver trust." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:-translate-y-1 hover:border-yellow-500/50 transition duration-300 group shadow-lg", children: [
          /* @__PURE__ */ jsx(Shield, { size: 32, className: "text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-lg mb-2", children: "Authentic" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "100% Verified Quality" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:-translate-y-1 hover:border-yellow-500/50 transition duration-300 group shadow-lg", children: [
          /* @__PURE__ */ jsx(Truck, { size: 32, className: "text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-lg mb-2", children: "Fast Shipping" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Nationwide Delivery" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:-translate-y-1 hover:border-yellow-500/50 transition duration-300 group shadow-lg", children: [
          /* @__PURE__ */ jsx(Handshake, { size: 32, className: "text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-lg mb-2", children: "Easy Payment" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "COD & Bank Transfer" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:-translate-y-1 hover:border-yellow-500/50 transition duration-300 group shadow-lg", children: [
          /* @__PURE__ */ jsx(Clock, { size: 32, className: "text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-lg mb-2", children: "Support" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "24/7 Customer Care" })
        ] })
      ] })
    ] })
  );
};
export {
  About as default
};
